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

