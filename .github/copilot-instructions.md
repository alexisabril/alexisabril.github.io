# Copilot Instructions

## Change Management

All code changes must be submitted via pull request. Do not commit directly to the `master` branch.

When making changes:

1. Create a new branch from `master` with a descriptive name (e.g., `feature/particle-system`, `fix/og-image`)
2. Commit changes to the branch
3. Open a pull request targeting `master`
4. Include a clear description of what changed and why

## Project Context

- This is an Astro static site with Tailwind CSS, deployed to GitHub Pages
- The site lives at alexisabril.com
- Build with `npm run build` (runs `astro check && astro build`)
- Dev server with `npm run dev`
