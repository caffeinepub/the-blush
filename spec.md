# Specification

## Summary
**Goal:** Professionally redesign The Blush salon app with a refined, high-end visual identity using a sophisticated color palette, elegant typography, and updated imagery across all pages and the admin dashboard.

**Planned changes:**
- Update CSS custom properties in `index.css` files to a new sophisticated palette: deep charcoal/near-black, warm off-white/cream, and a champagne gold or dusty rose accent — for both light and dark modes
- Update Tailwind config with new color tokens matching the CSS custom properties; set Cormorant Garamond as default serif and Jost as default sans-serif
- Restyle the navigation header in `Layout.tsx`: elegant sticky header, Cormorant Garamond brand name, Jost uppercase tracked nav links, subtle border/shadow
- Restyle the Home page hero section with full-viewport layout, new hero background image (`hero-blush.dim_1920x1080.jpg`), large serif headline, and accent-colored CTA buttons; update feature grid cards
- Apply new design system to Services, Team, Book, and Gallery pages: consistent color tokens, typography hierarchy, card styles, badge styles, and booking form
- Add a full-width banner image (`book-banner.dim_1920x600.jpg`) to the Book page
- Update Admin dashboard (`Admin.tsx`), `AppointmentTable.tsx`, and `CustomerPhotoManager.tsx` with new palette for stat cards, status badges, tables, and action buttons

**User-visible outcome:** The entire Blush app — from the public-facing pages to the admin dashboard — displays a cohesive, upscale editorial aesthetic with refined typography, a sophisticated neutral-and-gold color scheme, and new hero/banner imagery.
