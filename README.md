# ForgeLabs

Turkish product-studio website for ForgeLabs and the published **Stat Boost** Android app.

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

- Responsive product hero with CSS orbit animation and a real app screenshot.
- Keyboard-operable product tabs update the screenshot and feature description.
- Browser-only workout demo: choose 20–120 kg in 2.5 kg increments and complete four sets of ten repetitions. Volume is `sets × weight × 10`. Weight locks after the first set; reset restores 60 kg and zero sets. This is illustrative, not training advice or a connection to an app account.
- Studio story, native HTML FAQ, direct Google Play links and verified support email.
- Reduced-motion support and an explicit animation-pause control in the footer.
- Static `/privacy.html` retained for the existing Play listing. Its existing policy text is not rewritten; only palette and return navigation changed.

## Source and assets

`src/App.jsx` contains the page sections and local interaction state; `src/index.css` contains the shared design tokens and responsive layouts. `public/robots.txt` and `public/sitemap.xml` describe public pages. Metadata lives in `index.html`.

The WebP files in `public/images` are the icon and screenshots from the owner's Google Play listing, retrieved on 2026-10-15. Screenshots are cropped with CSS only. Names describe their original download order; see `AppScreen` for their semantic mapping. Interface typography uses Google Fonts (DM Sans and Manrope) with system fallbacks. The ForgeLabs monogram is code-native SVG. Original unused brand assets remain available in the repository.

The old Spline/GSAP demo, preset-answer assistant and unused page components have been replaced. They remain recoverable in Git history. Existing unrelated `.next/` and `next-env.d.ts` files are not part of this Vite app and are left untouched.

## Verification checklist

- Build and lint pass.
- At 320, 390, 768 and desktop widths, no content overflow.
- Four demo sets complete; volume updates; weights lock; reset works.
- Product tabs work by pointer and arrow keys.
- Mobile menu supports Escape and focus wrapping, then restores body scrolling.
- FAQ opens, all hash anchors resolve, all images load and all download links target `stat.boost`.
- `/privacy.html`, `/robots.txt`, `/sitemap.xml` remain accessible.
