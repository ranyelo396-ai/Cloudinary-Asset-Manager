# INSTALUVI

Corporate website for INSTALUVI — a Salvadoran PVC windows and doors company — with a public-facing landing page and a Firebase-backed admin panel for full content management.

## Run & Operate

- `pnpm --filter @workspace/instaluvi run dev` — run the frontend (Vite, reads PORT env var)
- `pnpm run typecheck` — full typecheck across all packages
- Navigate to `/admin` to access the CMS (requires Firebase Auth login)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite + Tailwind CSS v4 + Shadcn/ui + Framer Motion + Wouter (routing)
- CMS/Auth: Firebase Auth + Firestore (project: instaluvi-3ef4c)
- Images: Cloudinary (cloud: dkfmnxxet, preset: Instal)
- Icons: Lucide + react-icons (SiWhatsapp)

## Where things live

- `artifacts/instaluvi/src/pages/home.tsx` — main landing page (split hero, nosotros, products, gallery, branches, news)
- `artifacts/instaluvi/src/pages/admin/AdminLayout.tsx` — admin sidebar shell + auth guard (redirects to /login if unauthenticated)
- `artifacts/instaluvi/src/pages/admin/` — one page per section: Dashboard, ProductsAdmin, GalleryAdmin, BranchesAdmin, NewsAdmin, PromotionsAdmin, SettingsAdmin
- `artifacts/instaluvi/src/components/admin/` — shared admin components: ImageUpload, AdminModal, ConfirmDialog
- `artifacts/instaluvi/src/hooks/` — use-products, use-gallery, use-branches, use-news, use-promotions, use-settings, use-auth (all Firestore-backed with full CRUD)
- `artifacts/instaluvi/src/lib/firebaseConfig.ts` — Firebase init
- `artifacts/instaluvi/src/lib/cloudinary.ts` — Cloudinary upload helper
- `artifacts/instaluvi/src/index.css` — Tailwind theme + INSTALUVI utility classes (hero-title, section-title, btn-primary, etc.)

## Architecture decisions

- All content (products, gallery, branches, news, promotions) is stored in Firestore and fetched live — no static data files.
- Firebase Auth protects every `/admin/*` route via `AdminLayout` which uses `useEffect` to redirect to `/login` when unauthenticated.
- Cloudinary handles all image uploads from the admin panel via a dedicated `uploadToCloudinary` helper; no images are stored in Firebase.
- React Router replaced by Wouter for lightweight SPA routing; base path injected from `import.meta.env.BASE_URL`.
- Custom CSS utility classes (hero-title, btn-primary, instaluvi-container, etc.) defined in `@layer components` so Tailwind purges them correctly.

## Product

- **Home page**: Split hero (text left / image right), 4-item benefits bar, "Nosotros" dark section with animated counters, product cards grid, photo gallery with category filter + lightbox, projects stats overlay, branches grid, news cards, WhatsApp FAB, mobile bottom nav.
- **Admin panel** (`/admin`): Full CRUD for Products, Gallery, Branches, News, Promotions, and site Settings. Protected by Firebase Auth. All image uploads go to Cloudinary.

## User preferences

- Keep React + Vite stack — do NOT migrate to HTML/vanilla JS or GitHub Pages regardless of any future requests.
- WhatsApp: 50360707582
- Facebook: https://www.facebook.com/share/1CLdnaFaV9/
- Instagram: https://www.instagram.com/instaluvi_elsalvador

## Gotchas

- Always restart the `artifacts/instaluvi: web` workflow after writing new files, or HMR may serve cached versions.
- The `hero-title`, `section-title`, `btn-primary`, and `instaluvi-container` CSS classes must stay in `index.css @layer components` — they are not Tailwind classes.
- Firebase env vars (VITE_FIREBASE_*) and Cloudinary vars (VITE_CLOUDINARY_*) are stored as Replit secrets.
- Admin pages return `null` (not an error) when the auth check is still loading — the `useEffect` redirect fires after Firebase resolves the auth state.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
