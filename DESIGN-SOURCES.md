# ForgeLabs motion direction

The second iteration expands the studio into six real, statically rendered pages. It combines editorial typography, product photography from the owner's Play listing, quiet light paths, tactile perspective and a small pixel-art language.

Visual references inspected on 2026-10-16:

- Kokonut UI, Beams Background: https://21st.dev/@kokonutd/components/beams-background (listed MIT).
- Kokonut UI, Background Paths: https://21st.dev/@kokonutd/components/background-paths (listed MIT).
- Neon Dither: https://21st.dev/@moazamtrade/components/neon-dither (visual reference only).

No third-party component implementation was copied. `AmbientPaths.jsx` uses original SVG curves; `ForgeField.jsx` is a bespoke Canvas 2D perspective projection of a deterministic voxel monogram, with damping, a scatter impulse and alternate wave/orbit forms. No paid component or shader dependency is required.

Canvas rendering is capped at roughly 30 fps and 1.5 device-pixel ratio, stops offscreen or when the document is hidden, and respects both system reduced motion and the site motion switch. Pointer tilt is disabled for touch and reduced motion. All effect observers, listeners and frames are disposed on route changes.

The product descriptions are based on the published Stat Boost Google Play listing. No clients, testimonials, team sizes, awards, downloads, ratings or financial results are invented. Contact opens a visitor-controlled email draft; it does not claim a backend submission.
