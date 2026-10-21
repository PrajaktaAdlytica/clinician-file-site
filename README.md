# ClinicianFile

Static, responsive concept website with the approved Source Stitch identity, synthetic credential-passport workbench, and Remotion intro with a continuous hero handoff.

## Run locally

```sh
python3 serve.py
```

Open http://127.0.0.1:4174/. No build or Node server is required for hosting. Browser-ready assets, local fonts, and the bundled intro player are committed at the repository root.

## Checks

```sh
npm test
npm run check
```

## Edit the cinematic intro

The editable Remotion project is in `motion/`. From that directory:

```sh
npm ci
npm run check
npm run build:player
```

This rebuilds the root `intro-player.js` and copies the film assets to `assets/intro/`. The intro is a browser-rendered composition; no MP4 export is required for the website.

## Hostinger

Follow `DEPLOYMENT.txt`. Upload the contents of the static website to `public_html`, with `index.html` directly inside it. The included `.htaccess` selects the homepage and custom 404 page on supported hosting. No environment variables or server-side runtime are required.

## Product status

This is a research-stage concept preview. The workbench contains synthetic data only. Sign-in opens demo access and is not an authentication service. Inquiry forms validate and download a local draft; they do not send leads. No live integrations, payments, provider data, or outbound messages are enabled. Search indexing remains disabled. Hosting the website does not make these backend capabilities live.

## Design and licenses

Approved Suspended Record direction with olive bookcloth, vellum and brass. Assets and tokens are preserved. Font and icon license notices are in `licenses/`. `storyboard.html`, `brief-coverage.html`, and `qa/` preserve the design and QA handoff. No deployment to Hostinger has yet been verified.
