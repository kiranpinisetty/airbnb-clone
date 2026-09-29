# Airbnb Clone — Playpower Labs Take-Home

A pixel-faithful, fully responsive, keyboard-accessible recreation of the Airbnb listing page built with React 19, Vite, and plain CSS.

---

## 🛠 Tech Stack & Constraints
- **Framework**: React 19 + Vite (JavaScript / JSX)
- **Styling**: Vanilla CSS with CSS custom properties (design tokens)
- **Icons**: Lucide React + Authentic Airbnb SVG brand assets
- **Data**: Static JSON (`src/data/listing.json`) — strictly zero backend
- **Linting & a11y**: ESLint with `eslint-plugin-jsx-a11y` enabled and passing with 0 warnings/errors

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build

# 4. Run linter
npm run lint
```

---

## 📁 Repository Structure
```text
playpower-airbnb-clone/
├── code/
│   ├── src/
│   │   ├── assets/              # Authentic logos, chips, badges, reviewer avatars
│   │   ├── components/
│   │   │   ├── ListingPage/     # Main page sections (Header, HeroGrid, StickyBar, Reviews, Calendar, etc.)
│   │   │   ├── PhotoTour/       # Full-screen categorized room tour overlay (CategoryNav, PhotoStack)
│   │   │   └── Lightbox/        # Modal photo viewer with arrow navigation & crossfade
│   │   ├── hooks/               # useFocusTrap, useBodyScrollLock
│   │   ├── data/
│   │   │   └── listing.json     # Single source of truth (42 photos, room taxonomy, amenities, host, reviews)
│   │   ├── App.jsx              # Top-level state, URL query synchronization & focus restoration
│   │   ├── main.jsx             # React entrypoint
│   │   └── index.css            # Global CSS variables & resets
│   ├── public/                  # Public static assets & favicon
│   ├── CLAUDE.md                # AI coding instructions, constraints & a11y guidelines
│   ├── PROMPTS.md               # Complete AI prompt & iteration log
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── README.md
├── architecture-diagram.png     # Rendered high-resolution application architecture diagram
├── architecture-diagram.pdf     # Vector PDF format of architecture diagram
└── README.md                    # Top-level overview
```

---

## 🏗 Architecture & Key Features

### 1. Three Core Views
- **Listing Page (`ListingPage/`)**:
  - **Static Header**: Normal-flow site header with authentic Airbnb Bélo vector logo, search pill with house icon, host CTA, and globe/profile controls.
  - **Hero Photo Grid**: 5-photo responsive layout. Clicking any hero image opens the Photo Tour scrolled directly to that photo's room category. Clicking the "Show all photos" button opens the Photo Tour starting at the top category navigation grid.
  - **Sticky Bar (`StickyBar`)**: Uses `IntersectionObserver` on the property summary sentinel to seamlessly slide in after the header scrolls out of view. Includes smooth scroll-spy navigation for Photos, Amenities, Reviews, and Location, plus dynamic pricing and date summary.
  - **Property Breakdown**: Summary heading, Superhost highlights, Host profile row, Guest Favourite badge with rating laurels, room sleeping arrangements, Amenities preview + full modal, interactive Calendar, 7-column review breakdown with category bars, Where You'll Be map section, Meet Your Host card, and Things to Know.
  - **Sticky Booking Sidebar**: Sticky reserve widget calculating nights, cleaning fees, service fees, and total pricing based on selected dates.
- **Photo Tour (`PhotoTour/`)**:
  - Full-screen modal with smooth slide/fade entrance.
  - Fixed header strip with back chevron button, title, and action buttons.
  - **CategoryNav**: 8-column thumbnail navigation grid showing previews for all room categories (Living room 1 & 2, Kitchen, Bedroom, Full bathroom, Gym, Exterior, Pool, etc.). Clicking any thumbnail smooth-scrolls directly to that room's section.
  - **Sticky Room Headers**: Each category section features a sticky header pinned under the top navigation bar while its respective photo stack (3:2 and 1:1 responsive layout) scrolls underneath.
- **Lightbox Viewer (`Lightbox/`)**:
  - Full-screen dark viewer displaying photos with smooth crossfade transitions.
  - Full keyboard control (`←` / `→` arrows to cycle photos, `Escape` to close).
  - Header photo index (`X / 42`) and close button.

### 2. Deep Linking & URL Synchronization
- All modal states are synced to URL query parameters via `window.history.pushState` and `window.history.replaceState`:
  - `?photoTour=1`: Photo Tour open.
  - `?photoTour=1&photo=<id>`: Photo Tour open with scrolled category target.
  - `?photoTour=1&lightbox=<id>`: Lightbox open showing photo `<id>`.
- Full browser Back and Forward button support via `popstate` event listeners — pressing Back closes the active modal or returns from the Lightbox back to the Photo Tour.

### 3. Strict Accessibility (WCAG 2.1 AA)
- **Focus Management**:
  - `useFocusTrap`: Enforces focus trapping inside open dialogs (`role="dialog"`, `aria-modal="true"`). Tabbing cycles exclusively through active interactive controls.
  - **Focus Restoration**: Automatically restores keyboard focus to the exact triggering element (e.g. hero photo, "Show all photos" button, or amenities trigger) upon modal closure.
  - **Background Isolation**: Sets `inert` and `aria-hidden="true"` on the underlying page while overlays are active.
- **Scroll Lock**:
  - `useBodyScrollLock`: Implements ref-counted body locking (`overflow: hidden`) to prevent page background scrolling while overlays are open, eliminating scroll-freeze bugs when stacking modals.
- **Semantic HTML & Screen Readers**:
  - Real `<button>` and `<nav>` elements throughout, descriptive `aria-label` tags on every control, and visible `:focus-visible` outlines.

---

## 📝 Design Decisions & Trade-offs
1. **Zero External Component Libraries**: Built from scratch using native React and plain CSS to adhere strictly to the take-home requirements and ensure complete control over styling, DOM footprint, and a11y.
2. **Vanilla CSS Custom Properties**: All typography scales, colors, spacing tokens, and modal dimensions are centralized in `:root` variables, preventing hardcoded styling drift.
3. **IntersectionObserver over Scroll Events**: Scroll-spy and sticky bar visibility use `IntersectionObserver` rather than scroll-event listeners, eliminating jank and maintaining 60fps scrolling.
4. **Authentic Assets**: Real Bélo brand SVG from official sources, real listing imagery (42 photos), and local Lucide outline icons.