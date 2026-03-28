# Kalapop - B2B Surface Design Studio

## Original Problem Statement
Build a visually-driven MVP website for "Kalapop," a B2B surface design studio. The project has undergone several major design iterations, settling on a "bold, maximalist" aesthetic. A FastAPI backend with MongoDB has been implemented for image management and API endpoints.

## Core Requirements
- A visually striking, design-led website that feels like a creative studio
- Key pages: Home, Collections, Design Detail, How It Works, Login/Dashboard, and a hidden Admin panel
- **Homepage:** Hero banner with 9 uploadable images, "Kalapop Studio" section (bubble font), 3-step process, 8 Featured Patterns, 3 Pattern to Fashion boxes
- **Admin Panel:** Secured by login with credentials. Manage all user-facing images and design assets with DELETE functionality
- **Design Detail Page:** CSS-based fashion mockups showing patterns on garments (Coord Set, Sun Dress, Shirt, Tote Bag)
- **Design Protection:** Public-facing design previews must be watermarked

## User Personas
1. **Fashion Brand Designers** - Access patterns for commercial collections
2. **Boutique Owners** - Looking for unique surface patterns
3. **Admin Users** - Manage designs, fabrics, and banner content

## Tech Stack
- **Frontend:** React, React Router, Tailwind CSS, Shadcn UI
- **Backend (Planned):** FastAPI + MongoDB
- **Authentication (Current):** Client-side with hardcoded credentials (to be moved to backend)

## Admin Credentials
- **URL:** `/admin-login`
- **Username:** `kalapop_admin`
- **Password:** `Kalapop@2025!Secure`

---

## What's Been Implemented

### Session: March 28, 2026 (Latest)

**Complete UI Redesign:**
1. **Homepage - New Color Scheme:**
   - Hero banner: Pink background (#FF4A8A)
   - Kalapop Studio section: Yellow-green/lime (#DAFF7A)
   - How It Works: Beige background with colored icons (pink #FF99AF, red #FF6B6B, green #79D48A)
   - From Pattern to Product: Green background (#2E704B)
   - CTA section: Coral/terracotta gradient (#E57C63)

2. **Pattern Detail Page - New Layout:**
   - Large pattern image with "NEW COLLECTION" badge
   - Info panel: Title, Premium License badge (pink), Vector + Raster badge (yellow)
   - Download Pattern button (pink), Save to Library button (yellow)
   - Pattern specs (Dimensions, File Format, Color Profile)
   - "Pattern in Application" section with yellow-green background
   - Related Patterns section at bottom

3. **Admin Panel - Delete Functionality:**
   - Red trash button on each image card (Banner, Featured sections)
   - Backend DELETE endpoint `/api/site-images/{category}/{slot}` working
   - Instructions updated to show "Click the red button to delete"

4. **Mobile Responsive Layout:**
   - All sections stack vertically on mobile
   - Optimized touch targets and spacing

### Session: March 14, 2026

**CSS-Based Fashion Mockups:**
1. **Pattern Visualization** - CSS clip-path garment shapes showing patterns on: Modern Coord Set, Sun Dress, Smart Shirt, Tote Bag
2. **No API Cost** - Instant mockup generation using CSS (free alternative to AI image generation)
3. **Responsive Design** - Mockups grid adapts to mobile/tablet

**Design Detail Page Improvements:**
1. **Smaller Title** - Pattern name now uses heading-3 instead of heading-1
2. **Fabric Section Moved** - "Recommended Fabrics" now appears below the mockups section

**Admin Panel Enhancements:**
1. **Delete Pattern Button** - Red trash button on each image card for Banner and Featured sections
2. **Delete API Endpoint** - Backend `/api/site-images/{category}/{slot}` DELETE endpoint

### Session: February 28, 2025

**Homepage Refinements:**
1. **Banner Images** - 9 images in elegant 3x3 grid with glassmorphism background, hover effects
2. **"Kalapop Studio"** - Bubble font (Pacifico) with pink-purple gradient on "Kalapop"
3. **Featured Patterns** - 8 items in 4-column grid, NO labels (removed Pattern 1, Pattern 2 etc)
4. **Pattern to Fashion** - Renamed from "Mock Designs", 3 clean boxes without text overlays
5. **Philosophy Section** - Reduced heading size, smaller body text
6. **Optional Printing** - Larger cursive text (Pacifico font) with pink gradient

**Admin Panel (Base):**
1. **Banner Images (9)** - Upload slots for all 9 hero banner images
2. **Featured Patterns (8)** - Upload slots for 8 featured pattern images
3. **Pattern to Fashion (3)** - Upload slots for 3 lifestyle/fashion images
4. **Process Steps (3)** - Upload slots for Discover, Subscribe, Download step images
5. **Sign Out button** - Pink styled button that clears auth and redirects

### Previous Session Work
- Multiple design iterations (Pixel Pushers dark theme -> minimalist white -> bold maximalist)
- Complete frontend scaffolding with multi-page React application
- Admin panel with mocked functionality
- SEO implementation (meta tags, Open Graph)
- File backups in `/app/backup/`

---

## Prioritized Backlog

### P0 - Critical (Next Phase)
1. **Full Backend Integration**
   - FastAPI endpoints for designs, admin users, fabrics
   - MongoDB models and database connection
   - Server-side image uploads with watermarking
   - Replace all mock data with live API calls

2. **Secure Admin Authentication**
   - Move credentials from frontend to backend `.env`
   - Implement proper server-side authentication flow
   - Session management with JWT tokens

### P1 - Important
1. **Subscription Tiers** - Backend logic for license types (Free, Premium, Pro)
2. **Image Upload Functionality** - Real file uploads for admin banner images and designs
3. **Watermark Generation** - Server-side watermarking for design previews

### P2 - Future Enhancements
1. **"Request Order" Flow** - User inquiry submission system
2. **Google Social Login** - Integration mentioned by user
3. **Design Search/Filter** - Advanced browsing capabilities
4. **User Dashboard** - Saved designs, download history

---

## Architecture

```
/app
├── backend/
│   ├── .env
│   ├── requirements.txt
│   └── server.py
└── frontend/
    ├── backup/
    ├── public/
    │   └── index.html (SEO meta tags)
    └── src/
        ├── components/
        │   ├── ui/ (Shadcn components)
        │   ├── Footer.jsx
        │   └── Header.jsx
        ├── pages/
        │   ├── Admin.jsx (6 section tabs, image upload cards)
        │   ├── AdminLogin.jsx
        │   ├── Home.jsx (9 banner images, bubble font, clean sections)
        │   └── ... (other pages)
        ├── App.css (Pacifico font added)
        ├── App.js
        └── mockData.js
```

## Known Issues
- Admin authentication is client-side only (security vulnerability - P0 fix)
- All data is mocked (P0 - backend integration needed)

## Notes for Future Development
- User prefers fewer iterations - implement thoroughly first time
- Maintain bold maximalist aesthetic with vibrant colors
- Keep process boxes small, purple background (#D397F8) for banner
- Use Pacifico/cursive fonts for decorative text elements
