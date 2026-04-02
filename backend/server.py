from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone
import shutil
import base64
from emergentintegrations.llm.gemeni.image_generation import GeminiImageGeneration


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create uploads directory
UPLOADS_DIR = ROOT_DIR / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ImageUploadResponse(BaseModel):
    success: bool
    image_url: str
    category: str
    slot: str

class SiteImagesResponse(BaseModel):
    banner_images: Dict[str, Optional[str]] = {}
    featured_patterns: Dict[str, Optional[str]] = {}
    fashion_images: Dict[str, Optional[str]] = {}
    process_images: Dict[str, Optional[str]] = {}

class FashionMockupRequest(BaseModel):
    pattern_name: str
    pattern_description: str
    pattern_colors: List[str] = []

class FashionMockupResponse(BaseModel):
    success: bool
    mockups: Dict[str, str]  # garment_type -> base64 image

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Image Upload Endpoints
@api_router.post("/upload-image/{category}/{slot}")
async def upload_image(category: str, slot: str, file: UploadFile = File(...)):
    """Upload an image for a specific category and slot"""
    
    valid_categories = ['banner', 'featured', 'fashion', 'process']
    if category not in valid_categories:
        raise HTTPException(status_code=400, detail=f"Invalid category. Must be one of: {valid_categories}")
    
    # Create category subdirectory
    category_dir = UPLOADS_DIR / category
    category_dir.mkdir(exist_ok=True)
    
    # Generate unique filename
    file_ext = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
    filename = f"{slot}.{file_ext}"
    file_path = category_dir / filename
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Store reference in MongoDB
    await db.site_images.update_one(
        {"category": category, "slot": slot},
        {"$set": {
            "category": category,
            "slot": slot,
            "filename": filename,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }},
        upsert=True
    )
    
    image_url = f"/api/images/{category}/{filename}"
    
    return {"success": True, "image_url": image_url, "category": category, "slot": slot}

@api_router.get("/images/{category}/{filename}")
async def get_image(category: str, filename: str):
    """Serve an uploaded image"""
    file_path = UPLOADS_DIR / category / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Image not found")
    
    return FileResponse(file_path)

@api_router.get("/site-images", response_model=SiteImagesResponse)
async def get_all_site_images():
    """Get all uploaded site images"""
    images = await db.site_images.find({}, {"_id": 0}).to_list(100)
    
    response = {
        "banner_images": {},
        "featured_patterns": {},
        "fashion_images": {},
        "process_images": {}
    }
    
    for img in images:
        category = img.get("category")
        slot = img.get("slot")
        filename = img.get("filename")
        
        if category and slot and filename:
            image_url = f"/api/images/{category}/{filename}"
            
            if category == "banner":
                response["banner_images"][slot] = image_url
            elif category == "featured":
                response["featured_patterns"][slot] = image_url
            elif category == "fashion":
                response["fashion_images"][slot] = image_url
            elif category == "process":
                response["process_images"][slot] = image_url
    
    return response

@api_router.delete("/site-images/{category}/{slot}")
async def delete_site_image(category: str, slot: str):
    """Delete a site image"""
    # Find and delete from MongoDB
    result = await db.site_images.find_one_and_delete({"category": category, "slot": slot})
    
    if result:
        # Delete file
        filename = result.get("filename")
        if filename:
            file_path = UPLOADS_DIR / category / filename
            if file_path.exists():
                file_path.unlink()
    
    return {"success": True, "message": "Image deleted"}

# Design Management Models
class DesignCreate(BaseModel):
    name: str
    collection: str
    category: str
    description: str
    keywords: List[str] = []

class DesignResponse(BaseModel):
    id: str
    name: str
    collection: str
    category: str
    description: str
    keywords: List[str] = []
    thumbnail: Optional[str] = None
    image_url: Optional[str] = None
    created_at: str

def add_watermark(image_path: Path, watermark_text: str = "KALAPOP") -> None:
    """Add watermark to an image"""
    from PIL import Image, ImageDraw, ImageFont
    
    try:
        img = Image.open(image_path)
        
        # Convert to RGBA if necessary
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Create a transparent overlay
        overlay = Image.new('RGBA', img.size, (255, 255, 255, 0))
        draw = ImageDraw.Draw(overlay)
        
        # Calculate font size based on image width
        font_size = max(int(img.width / 8), 40)
        
        # Try to use a bold font, fallback to default
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
        except (OSError, IOError):
            font = ImageFont.load_default()
        
        # Get text bounding box
        bbox = draw.textbbox((0, 0), watermark_text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # Position text in center
        x = (img.width - text_width) // 2
        y = (img.height - text_height) // 2
        
        # Draw semi-transparent watermark
        draw.text((x, y), watermark_text, font=font, fill=(255, 255, 255, 100))
        
        # Composite the overlay onto the image
        watermarked = Image.alpha_composite(img, overlay)
        
        # Convert back to RGB for saving as JPEG
        if image_path.suffix.lower() in ['.jpg', '.jpeg']:
            watermarked = watermarked.convert('RGB')
        
        watermarked.save(image_path)
        logger.info(f"Watermark added to {image_path}")
    except Exception as e:
        logger.error(f"Error adding watermark: {e}")

# Design Management Endpoints
@api_router.get("/designs")
async def get_designs():
    """Get all designs from database"""
    designs = await db.designs.find({}, {"_id": 0}).to_list(100)
    return {"success": True, "designs": designs}

@api_router.post("/designs")
async def create_design(
    name: str, 
    collection: str, 
    category: str, 
    description: str = "",
    keywords: str = "",  # Comma-separated keywords
    file: UploadFile = File(...)
):
    """Create a new design with image upload and watermark"""
    design_id = str(uuid.uuid4())[:8]
    
    # Create designs directory
    designs_dir = UPLOADS_DIR / "designs"
    designs_dir.mkdir(exist_ok=True)
    
    # Save file
    file_ext = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
    filename = f"{design_id}.{file_ext}"
    file_path = designs_dir / filename
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Add watermark to the saved image
    add_watermark(file_path)
    
    image_url = f"/api/images/designs/{filename}"
    
    # Parse keywords from comma-separated string
    keywords_list = [k.strip() for k in keywords.split(',') if k.strip()] if keywords else []
    
    design = {
        "id": design_id,
        "name": name,
        "collection": collection,
        "category": category,
        "description": description,
        "keywords": keywords_list,
        "thumbnail": f"design-{design_id}",
        "image_url": image_url,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.designs.insert_one(design)
    
    return {"success": True, "design": {k: v for k, v in design.items() if k != "_id"}}

@api_router.delete("/designs/{design_id}")
async def delete_design(design_id: str):
    """Delete a design"""
    # Find the design first
    design = await db.designs.find_one({"id": design_id})
    
    if design:
        # Delete the image file if it exists
        image_url = design.get("image_url", "")
        if image_url:
            filename = image_url.split("/")[-1]
            file_path = UPLOADS_DIR / "designs" / filename
            if file_path.exists():
                file_path.unlink()
        
        # Delete from database
        await db.designs.delete_one({"id": design_id})
        return {"success": True, "message": f"Design '{design.get('name', design_id)}' deleted successfully"}
    
    return {"success": False, "message": "Design not found"}

# Fashion Mockup Generation Endpoint - Using Google Gemini (Imagen)
@api_router.post("/generate-fashion-mockups", response_model=FashionMockupResponse)
async def generate_fashion_mockups(request: FashionMockupRequest):
    """Generate AI fashion mockups for a pattern using Google Gemini Imagen"""
    
    api_key = os.environ.get('GOOGLE_GEMINI_API_KEY')
    if not api_key:
        raise HTTPException(status_code=500, detail="Google Gemini API key not configured")
    
    garment_types = {
        "coord_set": "Modern Coord Set - matching top and bottom set",
        "sun_dress": "Sun Dress - flowy summer dress",
        "smart_shirt": "Smart Shirt - formal button-up shirt",
        "tote_bag": "Tote Bag - large fabric tote bag"
    }
    
    mockups = {}
    image_gen = GeminiImageGeneration(api_key=api_key)
    
    color_description = ", ".join(request.pattern_colors) if request.pattern_colors else "vibrant colors"
    
    for garment_key, garment_desc in garment_types.items():
        try:
            prompt = f"Professional fashion product photography of a {garment_desc} featuring a {request.pattern_name} textile pattern. The pattern has {request.pattern_description}. Colors: {color_description}. Clean white background, studio lighting, high-end fashion catalog style, no model, just the garment displayed flat or on invisible mannequin."
            
            images = await image_gen.generate_images(
                prompt=prompt,
                model="imagen-4.0-fast-generate-001",
                number_of_images=1
            )
            
            if images and len(images) > 0:
                image_base64 = base64.b64encode(images[0]).decode('utf-8')
                mockups[garment_key] = image_base64
            else:
                mockups[garment_key] = ""
                
        except Exception as e:
            logger.error(f"Error generating {garment_key} mockup: {str(e)}")
            mockups[garment_key] = ""
    
    return {"success": True, "mockups": mockups}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()