# Beauty Training Demo Landing Page

- Local URL: `http://127.0.0.1:4190/`
- App demo URL for the current built preview: `http://127.0.0.1:4182/`.
- Start from the project root with `START_LANDING_PAGE.bat`.
- Local review downloads `../Beauty_Training_Demo_2.7.0_Test.apk` (226,762,810 bytes, approximately 216 MiB / 227 MB), served directly from the project root. The old `2.6.0` download route remains available. Neither APK is copied into this website folder.
- Current visual direction (CJ approved, 2026-09-09): pale pink `#FFF6F7`, vivid pink `#FF367A`, berry `#B21E56`, violet `#6942C6`. This replaces the earlier beige direction.
- Public repository: `CJchan09/beauty-training-demo`.
- GitHub Pages publishes this folder. The web demo is stored under `demo/`.
- Build the web prototype first, then run `node prepare-demo.mjs` to create a path-safe GitHub Pages copy.
- The public APK button points to the latest GitHub Release asset; the APK is not committed to Git.

CJ approved GitHub publication and public testing on 2026-08-31.

## September 2026 redesign: local review build

- The current redesign has not been published. CJ review is required before releasing it.
- `app.js` selects candidate 2.7.0 / the port 4182 built Demo only on localhost or 127.0.0.1. Public hosts keep the existing 2.6.0 release URL, size label and `./demo/`. Before publication, build and prepare the approved Demo copy, publish the corresponding APK asset, then update the public version/size labels together; local readiness does not mean the photo feature has passed generalized-photo or device acceptance.
- The local server binds to `127.0.0.1` by default. `BEAUTY_LANDING_HOST` can explicitly override the binding when needed.
- Hero still uses the real app screenshot with the first three product pictures: lipstick, pink blush compact, and brush. The beauty table now extends to eight product/texture assets. Their white RGB backgrounds use CSS multiply blending; they are not transparent cutouts.
- Web images are 700 × 700 optimized PNGs under `assets/v2/`. Unchanged originals, source paths, processing details and SHA-256 records are under `../art-sources/landing-v2/`.
- This build contains eight product/texture pictures and six before/after practice-face images. New source records and compressed display derivatives are listed in `../art-sources/landing-v2/source-manifest-p1.json`.
- Desktop uses a pinned horizontal beauty table only with a fine pointer and sufficient viewport height. Touch devices use native horizontal scrolling. Reduced-motion mode displays all eight scenes without entrance/scroll motion.
- The motion toggle pauses the enhancements; floating products also pause when the hero is offscreen or the tab is hidden.
- GSAP and ScrollTrigger are bundled locally at version 3.13.0. Official package provenance, integrity and license link are in `vendor/gsap-source.json`.
- Static checks passed (JavaScript syntax, anchor targets, image references); actual browser/device interaction remains a separate review.
