# AI Prompt Log

## [timestamp/step]
Prompt: "..."
Tool: Claude (Antigravity)
Result: brief note on what it produced
---

Follow the rules in CLAUDE.md for everything below.

This is a fresh Vite React project. Right now it still has the default 
boilerplate (React/Vite logos, the counter button, default App.css styles). 
I want a clean slate before we build anything real.

Do the following:

1. Remove all default boilerplate content from App.jsx — no logos, no 
   counter, no default styling. App.jsx should just be a minimal shell 
   that renders a placeholder <h1>Airbnb Clone</h1> for now, so I can 
   confirm the dev server still runs cleanly.

2. Delete unused default assets (react.svg, vite.svg, App.css contents 
   — you can keep the file but empty it out, index.css should just have 
   a basic reset: margin/padding 0, box-sizing border-box, a sensible 
   default font-family stack like -apple-system, "Segoe UI", Roboto, 
   sans-serif as a placeholder until I confirm the final font).

3. Set up this folder structure under src/:
   src/
     components/
       ListingPage/
       PhotoTour/
       Lightbox/
     data/
       listing.json   (just create an empty {} for now)
     App.jsx
     main.jsx

4. Install these dependencies:
   - eslint-plugin-jsx-a11y (dev dependency, for accessibility linting)

5. Add jsx-a11y's recommended config to the existing ESLint setup.

6. Confirm no console errors/warnings after these changes, and that 
   `npm run dev` still runs cleanly.

Don't build any real UI yet — this is just cleanup and scaffolding. 
List out every file you changed or created when done.



-----------

Follow CLAUDE.md.

Populate src/data/listing.json with realistic sample data for an Airbnb-style 
listing, matching this shape:

{
  "title": "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  "propertyType": "Entire serviced apartment in Candolim, India",
  "capacity": { "guests": 3, "bedrooms": 1, "beds": 1, "bathrooms": 1 },
  "price": { "amount": 28499, "currency": "₹", "nights": 5 },
  "rating": { "score": 4.95, "reviewCount": 19 },
  "guestFavourite": true,
  "host": {
    "name": "Mirashya Homes",
    "yearsHosting": 2,
    "reviewCount": 1463,
    "rating": 4.68,
    "responseRate": "100%",
    "responseTime": "Responds within an hour",
    "bornDecade": "80s",
    "school": "NICMAR GOA"
  },
  "coHosts": ["Sharath", "Aman Dev Pahwa", "Maria Karen Priyanka", "Simran", "Pallavi", "Sanyukta", "Shruti", "Amisha"],
  "highlights": [
    { "icon": "outdoor", "title": "Outdoor entertainment", "description": "The pool and alfresco dining are great for summer trips." },
    { "icon": "cooling", "title": "Designed for staying cool", "description": "Beat the heat with the A/C and ceiling fan." },
    { "icon": "selfCheckIn", "title": "Self check-in", "description": "You can check in with the building staff." }
  ],
  "description": "Write a 3-4 sentence placeholder description for a cozy 1BHK apartment with a private jacuzzi in Candolim, Goa, mentioning wifi, smart TV, pet-friendly, and proximity to the beach.",
  "amenitiesPreview": [
    "Kitchen", "Wifi", "Dedicated workspace", "Free parking on premises",
    "Pool", "Hot tub", "Pets allowed", "Exterior security cameras on property"
  ],
  "amenitiesFull": {
    "Kitchen": ["Kitchen", "Fridge", "Freezer", "Microwave", "Cooking basics", "Crockery and cutlery", "Kettle", "Coffee", "Wine glasses", "Toaster", "Blender", "Cooker"],
    "Bathroom": ["Hairdryer", "Cleaning products", "Shampoo", "Hot water", "Shower gel"],
    "Bedroom and laundry": ["Washing machine", "Hangers", "Bed linen", "Room-darkening blinds", "Iron", "Clothes storage"],
    "Outdoor": ["Patio or balcony", "Outdoor dining area"],
    "Parking and facilities": ["Free parking on premises", "Pool", "Hot tub", "Gym"],
    "Services": ["Pets allowed", "Cleaning available during stay", "Long-term stays allowed", "Self check-in"],
    "Entertainment": ["TV"],
    "Family": ["Cot"],
    "Heating and cooling": ["Air conditioning", "Ceiling fan"],
    "Home safety": ["Exterior security cameras on property"],
    "Internet and office": ["Wifi", "Dedicated workspace"]
  },
  "reviewCategories": {
    "cleanliness": 5.0, "accuracy": 5.0, "checkIn": 5.0,
    "communication": 5.0, "location": 4.8, "value": 4.8
  },
  "reviews": [
    { "name": "Amit", "tenure": "2 months on Airbnb", "rating": 5, "timeAgo": "1 week ago", "text": "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property." },
    { "name": "Aheesh", "tenure": "3 years on Airbnb", "rating": 5, "timeAgo": "2 weeks ago", "text": "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos." }
  ],
  "location": {
    "area": "Candolim, Goa, India",
    "neighbourhoodHighlight": "Located in the heart of Candolim, offering easy access to beaches, cafés, and popular attractions."
  },
  "cancellationPolicy": "Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.",
  "houseRules": ["Check-in after 2:00 pm", "Checkout before 11:00 am", "3 guests maximum"],
  "safety": ["Carbon monoxide alarm not reported", "Smoke alarm not reported", "Exterior security cameras on property"],
  "photos": [
    // create 8-10 placeholder entries with structure:
    // { "id": "1001", "category": "Living room 1", "url": "PLACEHOLDER", "tags": ["Sofa","Air conditioning","Ceiling fan","TV"] }
    // categories to cover: Living room 1, Living room 2, Full kitchen, Bedroom, Full bathroom, Gym, Exterior, Pool
  ]
}

Use "PLACEHOLDER" as the url value for every photo for now — I'll swap in 
real image URLs or local assets afterward. Don't invent real image URLs.

This is just data — don't touch any component files in this step.
--------------------------
Follow CLAUDE.md. Build ONLY the sections listed below. Do not build any 
other sections of the page yet.

Reference material is a visual/behavioral description. Write all markup 
and CSS yourself from scratch.

## Global
- Load "Inter" from Google Fonts (weights 400, 500, 600) and use it as 
  the base font-family with the system stack as fallback.
- Base text color #222222, page background #ffffff.
- Main content column: centered, max-width [WIDTH]px, horizontal padding 
  so it never touches the viewport edge.
- Define colors, spacing and radii as CSS variables in index.css.

## 1. Top nav (ListingPage/Header)
- Full-width bar with a thin bottom border (#ebebeb), height ~80px.
- Left: Airbnb-style wordmark in pink (#FF385C). Use a simple text/SVG 
  placeholder I can swap later.
- Center: a pill-shaped search bar with a subtle border and soft shadow, 
  containing three segments: a small house image + "Anywhere", "Anytime", 
  "Add guests" (lighter grey), and a circular pink search button with a 
  white magnifier icon on the right. Segments separated by thin vertical 
  dividers.
- Right: "Become a host" text link, a circular globe icon button, and a 
  circular hamburger-menu icon button (both with a light hover background).

## 2. Title row (ListingPage/TitleRow)
- Listing title from listing.json, ~26px, weight 600.
- Right-aligned "Share" and "Save" actions, each an icon + underlined 
  text, underline hover state, cursor pointer.

## 3. Hero photo grid (ListingPage/HeroGrid)
- CSS grid: one large image on the left taking 50% of the width, and a 
  2x2 grid of four images on the right. Gap of about 8px.
- Overall aspect ratio about 2.27:1. All images object-fit: cover.
- Outer corners rounded (12px): top-left and bottom-left on the big 
  image, top-right on the upper-right image, bottom-right on the 
  lower-right image. Inner corners square.
- A "Show all photos" button pinned bottom-right of the grid: white 
  background, thin dark border, rounded 8px, small 3x3 dots icon on the 
  left of the label, weight 500.
- Hover behavior: each image gets a subtle dark overlay (~rgba(0,0,0,.15)) 
  fading in over ~200ms, with cursor pointer. The button gets a light 
  grey background on hover.
- Every image and the button are real <button> elements (or have 
  role="button" and tabIndex 0) with descriptive aria-labels, a visible 
  focus ring, and Enter/Space activation.
- Clicking any image or the button should call an onOpenPhotoTour(photoId) 
  prop. For now App.jsx just logs it. Do not build the Photo Tour yet.

## 4. Property summary line (ListingPage/Summary)
- "Entire serviced apartment in Candolim, India" as a ~22px heading, with 
  "3 guests · 1 bedroom · 1 bed · 1 bathroom" underneath in regular 
  weight. Both read from listing.json.

Wire these four components together in ListingPage/index.jsx and render 
it from App.jsx.

When done: confirm lint passes with no jsx-a11y warnings, and list every 
file created or changed.
---------------------
Follow CLAUDE.md. Fix ONLY the issues below. Do not add new sections.

1. Header: make it full-width (not inside the content column). Height 
   88px, horizontal padding 80px, bottom border 1px #ebebeb. Logo left, 
   right group right-aligned. The search pill must be centered on the 
   viewport regardless of the left/right content widths (use a 
   three-column grid: 1fr auto 1fr). Pill about 400px wide and 46px 
   tall, with more horizontal padding per segment; search button a 32px 
   circle. Globe and hamburger buttons are 40px circles with a light 
   grey background (#f7f7f7) and a slightly darker grey on hover.

2. Content column: width 1120px centered, with side padding applied 
   OUTSIDE it (for example width: min(1120px, calc(100% - 80px))), so 
   the inner content is exactly 1120px wide on a desktop viewport.

3. Typography: keep Inter, but add letter-spacing of about -0.01em to 
   body text and the headings so text widths are closer to the 
   reference. Title stays 26px / 600. Check the title fits on one line 
   at 1120px.

4. Share icon: replace it with a "box with an up arrow" icon (outline, 
   about 16px). Keep the heart for Save.

5. "Show all photos" button: reduce it to about 30px tall (padding about 
   7px 15px, 14px font, weight 500), 24px from the bottom and right 
   edges of the grid.

6. Vertical spacing: about 8px more space between the header and the 
   title row, and about 4px more between the title row and the hero.

7. Photos: add a "heroPhotoIds" array to listing.json with 5 ids in 
   this order: big image, top-middle, top-right, bottom-middle, 
   bottom-right. HeroGrid must render from heroPhotoIds, not from the 
   first five photos. Keep the grey placeholder-with-label fallback for 
   any photo whose url is still "PLACEHOLDER". For now, ids may repeat 
   while I only have 3 real images.

Lint must pass with no jsx-a11y warnings. List the files changed.

Follow CLAUDE.md. Build ONLY the Photo Tour overlay. Do not build the 
Lightbox yet; opening it is a stub.

Reference material is a description of appearance and behavior. Write all 
markup and CSS yourself. All measurements below are estimates, so define 
them as CSS variables so I can tune them.

## Behavior
- Opens when the user clicks "Show all photos" OR any hero image. 
  ListingPage receives an onOpenPhotoTour(photoId?) prop from App. If a 
  photoId is passed, the tour opens with that photo's section in view.
- Full-screen white overlay above the page. Lock background scroll while 
  it is open and make the page behind it inert.
- Open animation: fade in plus a slight slide up (16px to 0), 250ms 
  ease-out. Close: reverse it, 200ms. Respect prefers-reduced-motion 
  (no movement, opacity only).
- Sync state with the URL query string so the browser Back button closes 
  the overlay and a reload keeps it open. Use params ?photoTour=1 and 
  &photo=<id>. Use history.pushState directly, with no router library.
- Close: back chevron button top-left, or the Escape key.

## Accessibility (graded, so be strict)
- role="dialog", aria-modal="true", aria-label="Photo tour".
- On open, move focus to the back button. Trap Tab and Shift+Tab inside 
  the dialog. On close, return focus to the element that opened it.
- All controls are real <button> elements with aria-labels and a visible 
  focus ring.
- Category thumbnails are buttons. Photos are buttons with 
  aria-label "Open photo N of 43: <room name>".

## Layout (desktop)
- Fixed header, about 88px tall, white, with horizontal padding of about 
  32px: back chevron button on the left, centered title "Photo tour" 
  (16px, weight 600), share and heart icon buttons on the right. Content 
  scrolls beneath it inside the overlay.
- Content column about 976px wide, centered.
- Category thumbnail nav at the top of the column: an 8-column grid, gap 
  about 12px. Each thumbnail is about 111x105px with 8px rounded corners, 
  the category name below it in grey (#6a6a6a, about 15px). A 9th item 
  wraps to a second row and its label wraps onto two lines. Clicking a 
  thumbnail smooth-scrolls to that category's section (instant if reduced 
  motion is on).
- About 48px of space below the nav, then one row per category from 
  listing.json "categories" in order.
- Each row is a two-column grid. Left column: category name (about 32px, 
  weight 600, letter-spacing about -0.02em) with the tags line under it in 
  grey (about 16px, "A · B · C"). This block is position: sticky, sitting 
  just below the header, so it stays pinned while that section's photos 
  scroll and is pushed away by the next section. Omit the tags line if 
  the category has no tags.
- Right column, about 458px wide, is the photo stack: photos come in 
  groups of one full-width image (3:2 aspect, about 458x305) followed by 
  two half-width images side by side (about 222x149). A single leftover 
  photo is full-width and two leftovers are two halves. Gap about 12px in 
  both directions. Corners rounded about 10px, object-fit: cover, and 
  lazy-load images below the fold.
- About 48px of vertical space between category rows.
- Hover: photos get a subtle dark overlay (rgba(0,0,0,.1)) fading in over 
  200ms, and cursor pointer. Header icon buttons get a light grey circle 
  on hover.
- Clicking a photo calls onOpenLightbox(photoId) (a prop). For now App 
  logs it to the console.

Data comes only from listing.json (photos, categories). Keep the 
components small: PhotoTour/index.jsx, TourHeader, CategoryNav, 
CategorySection, PhotoStack, plus a small useFocusTrap hook and a 
useBodyScrollLock hook in src/hooks/.

Lint must pass with no jsx-a11y warnings. List every file created or 
changed.