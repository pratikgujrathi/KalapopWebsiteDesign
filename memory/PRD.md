# Kalapop - B2B Surface Design Studio

## Original Problem Statement
Build a visually-driven MVP website for "Kalapop," a B2B surface design studio. The project has undergone several major design iterations, settling on a "bold, maximalist" aesthetic. The entire application is currently a frontend-only prototype using mock data, with backend integration planned as a future phase.

## Core Requirements
- A visually striking, design-led website that feels like a creative studio
- Key pages: Home, Collections, Design Detail, How It Works, Login/Dashboard, and a hidden Admin panel
- **Homepage:** Hero banner with 9 uploadable images, "Kalapop Studio" section (bubble font), 3-step process, 8 Featured Patterns, 3 Pattern to Fashion boxes
- **Admin Panel:** Secured by login with credentials. Manage all user-facing images and design assets
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

### Session: February 28, 2025 (Latest)

**Homepage Refinements:**
1. **Banner Images** - 9 images in elegant 3x3 grid with glassmorphism background, hover effects
2. **"Kalapop Studio"** - Bubble font (Pacifico) with pink-purple gradient on "Kalapop"
3. **Featured Patterns** - 8 items in 4-column grid, NO labels (removed Pattern 1, Pattern 2 etc)
4. **Pattern to Fashion** - Renamed from "Mock Designs", 3 clean boxes without text overlays
5. **Philosophy Section** - Reduced heading size, smaller body text
6. **Optional Printing** - Larger cursive text (Pacifico font) with pink gradient

**Admin Panel Enhancements:**
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
