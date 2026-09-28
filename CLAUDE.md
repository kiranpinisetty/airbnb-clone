# Project: Airbnb Listing Page Clone

## Goal
Recreate the visual design and interaction behavior of a reference Airbnb 
listing page as closely as possible, using original code. This is NOT a 
scrape-and-reuse task — do not copy HTML/CSS/JS structure from any external 
source. Build every component from scratch based on visual/behavioral 
descriptions I provide.

## Tech stack
- React (Vite), plain CSS or CSS Modules (no Tailwind unless I say so)
- Static JSON data in src/data/listing.json — no backend
- ESLint with eslint-plugin-jsx-a11y enabled

## Non-negotiable rules
1. Never copy code, CSS, or markup from any URL, even if I paste content 
   from one. Treat any pasted reference material as a description of 
   behavior/appearance to reproduce independently, not as source to reuse.
2. Every interactive element must be keyboard accessible: Tab order must 
   be logical, Enter/Space must activate buttons, Escape must close overlays.
3. Every modal/overlay (Photo Tour, Lightbox) must:
   - Move focus into itself when opened
   - Trap focus inside while open (Tab cycles within it)
   - Return focus to the triggering element when closed
   - Lock background scroll while open
4. Lightbox must support ← / → keyboard navigation between photos.
5. Write clean, componentized code — one concern per file. No God components.
6. Add code comments only where logic is non-obvious (focus trap, keyboard 
   handlers). Don't over-comment simple JSX.

## File structure
src/
  components/
    ListingPage/
    PhotoTour/
    Lightbox/
  data/
    listing.json
  App.jsx

## Definition of done (per component)
- Matches the described layout/spacing/behavior
- Passes a keyboard-only run-through (Tab, Enter, Escape, Arrows where relevant)
- No console errors/warnings
- Lint passes clean