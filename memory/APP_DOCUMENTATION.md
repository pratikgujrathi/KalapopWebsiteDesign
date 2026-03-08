# Kalapop Studio - App Documentation

## Overview
Kalapop is a B2B surface design studio website offering commercially licensed textile patterns for fashion brands, interior designers, and modern design labels.

## Tech Stack
- **Frontend:** React 18, React Router, Tailwind CSS, Shadcn UI
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Image Storage:** Server filesystem
- **Icons:** Lucide React
- **Fonts:** Google Fonts

## Admin Access
- **URL:** `/admin-login`
- **Username:** `kalapop_admin`
- **Password:** `Kalapop@2025!Secure`

## API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/site-images` | GET | Get all uploaded images |
| `/api/upload-image/{category}/{slot}` | POST | Upload image |
| `/api/images/{category}/{filename}` | GET | Serve image |

## Available Fonts

### Serif Fonts (Elegant/Luxury)
```css
font-family: 'Cinzel', serif;           /* Luxury, uppercase */
font-family: 'Playfair Display', serif; /* Editorial, classic */
font-family: 'Bodoni Moda', serif;      /* High fashion */
font-family: 'Cormorant Garamond', serif; /* Light, elegant */
font-family: 'Libre Baskerville', serif;  /* Traditional */
font-family: 'Marcellus', serif;          /* Roman classic */
```

### Sans-Serif Fonts (Modern/Clean)
```css
font-family: 'Archivo Black', sans-serif; /* Bold impact */
font-family: 'Space Grotesk', sans-serif; /* Geometric modern */
font-family: 'DM Sans', sans-serif;       /* Clean UI */
```

### Script/Decorative Fonts
```css
font-family: 'Pacifico', cursive;  /* Playful script */
font-family: 'Lobster', cursive;   /* Bold decorative */
```

## Font Usage Examples

### Luxury Headlines
```css
.luxury-headline {
  font-family: 'Cinzel', serif;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

### Body Text
```css
.body-text {
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  line-height: 1.7;
}
```

### Accent Text
```css
.accent-text {
  font-family: 'Pacifico', cursive;
  color: #FA328E;
}
```

## Color Palette
| Element | Color |
|---------|-------|
| Kalapop Studio BG | #F2FC6F |
| Kalapop Text | #FA328E |
| Featured Patterns BG | #ED77C2 |
| Pattern to Fashion BG | #60DBAA |

## Collections
1. **Starter** - 50 patterns, non-exclusive
2. **Exclusive** - 200+ patterns, commissioned work

## Responsive Breakpoints
- Desktop: 1920px+
- Tablet: 1024px
- Mobile: 767px
- Small Mobile: 480px
