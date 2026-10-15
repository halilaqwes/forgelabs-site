# ForgeLabs

Turkish, six-page product-studio website for ForgeLabs and the published **Stat Boost** Android app. Pages are statically rendered at build time and hydrated in the browser.

- Production: https://www.forgelabs.site/
- Google Play: https://play.google.com/store/apps/details?id=stat.boost
- Support: forgelabss.dev@gmail.com

## Local development

Use Node.js compatible with Vite 8 (22.12+ recommended) and npm.

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

Vercel settings: **Vite**, repository root `./`, build `npm run build`, output `dist`. No environment variables are required. A push to the connected production branch triggers deployment. Check the actual production project/domain mapping before changing domains; more than one Vercel project may watch this repository.

## Experience

- Home `/`: editorial studio introduction, a custom live voxel monogram, product feature, light manifesto and Lab preview.
- Products `/urunler/`: honest catalog with the one published product, its purpose and the studio's product principles.
- Product `/urunler/stat-boost/`: dedicated Stat Boost story, real screenshots, features, Play links and product FAQ.
- Studio `/studio/`: product philosophy, four-stage process and a layered perspective monogram.
- Lab `/lab/`: Forge/wave/orbit particle forms, spring-driven scattering and the illustrative workout demo.
- Contact `/iletisim/`: verified support address, copy control, support guidance and an explicit email-draft composer (no backend submission).
- Keyboard-operable product tabs update the screenshot and feature description.
- Browser-only workout demo: choose 20–120 kg in 2.5 kg increments and complete four sets of ten repetitions. Volume is `sets × weight × 10`. Weight locks after the first set; reset restores 60 kg and zero sets. This is illustrative, not training advice or a connection to an app account.
- Studio story, native HTML FAQ, direct Google Play links and verified support email.
- Reduced-motion support and an explicit animation-pause control in the footer.
- Static `/privacy.html` retained for the existing Play listing. Its existing policy text is not rewritten; only palette and return navigation changed.

## Source and assets

`src/App.jsx` owns the layout, navigation effects and motion settings. `src/pages` contains route content; `src/components` holds reusable experiences. `src/ui.jsx` contains visual primitives. `src/index.css` retains base tokens and the original product/demo layouts; `src/pages.css` describes the new pages and effects. `src/site-data.js` is the route/metadata source of truth.

The build generates static HTML for every route via `src/entry-server.jsx` and `scripts/prerender.mjs`. `scripts/verify-build.mjs` checks rendered content, titles, descriptions, canonical URLs, local links, image files, sitemap and the noindex 404. `dist/sitemap.xml` is generated from the route definitions, replacing the public fallback sitemap. Directory index files provide direct deep links without a catch-all rewrite. All production navigation uses real links with history-aware client transitions. `/privacy.html` stays at its original URL.

`ForgeField.jsx` uses deterministic Canvas 2D 3D projection and per-particle damped springs. The animation pauses offscreen or in hidden tabs, caps DPR at 1.5 and drawing at roughly 30 fps, supports reduced motion and disposes all observers/listeners/frames. See `DESIGN-SOURCES.md` for the 21st.dev visual references and original-implementation notes.

The WebP files in `public/images` are the icon and screenshots from the owner's Google Play listing, retrieved on 2026-10-15. Screenshots are cropped with CSS only. Names describe their original download order; see `AppScreen` for their semantic mapping. Interface typography uses Google Fonts (DM Sans and Manrope) with system fallbacks. The ForgeLabs monogram is code-native SVG. Original unused brand assets remain available in the repository.

The old Spline/GSAP demo, preset-answer assistant and unused page components have been replaced. They remain recoverable in Git history. Existing unrelated `.next/` and `next-env.d.ts` files are not part of this Vite app and are left untouched.

## Verification checklist

- Build and lint pass.
- At 320, 390, 768 and desktop widths, no content overflow.
- Four demo sets complete; volume updates; weights lock; reset works.
- Product tabs work by pointer and arrow keys.
- Mobile menu supports Escape and focus wrapping, then restores body scrolling.
- FAQ opens, all hash anchors resolve, all images load and all download links target `stat.boost`.
- Direct loading, refresh, client navigation and browser back preserve one header/main per page.
- Every route has server-rendered content and distinct SEO metadata before JavaScript runs.
- `/privacy.html`, `/robots.txt`, `/sitemap.xml` and the custom 404 remain accessible.
