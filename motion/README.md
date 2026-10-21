# ClinicianFile — A Record, Woven

Selected third film direction. A 14-second, 30fps Remotion composition, connected to the homepage through @remotion/player. This is an animated still-image camera study, not live-action footage or a cloth simulation. No MP4 export was requested or produced.

## Preview
- Website: http://127.0.0.1:4174/?intro=replay
- Remotion Studio: http://localhost:4180/WovenIntro
- Mobile composition: WovenIntroMobile

## Run
`npm ci` then `npm run preview`

`npm run check` checks TypeScript. `npm run build:player` copies local assets and bundles the player into the adjacent clinicianfile-homepage directory. The website runs using its existing Python server. All runtime assets are local.

## Motion
0–7s: slow pullback and lateral camera travel across the woven landscape.
5.5–11.5s: dissolve into the unfinished cross-thread; measured overhead rotation and pullback.
10–14s: reveal actual hero bookcloth, settle scale by 12.5s, hold matched surface.
10.8–14s: one frame clock fades the film while the real dossier, headline and details emerge.
14–14.9s: navbar appears after playback; player is removed only after hero visibility has reached 100%.

Source Serif 4 captions remain small and refined. Silent preview. No logos, navigation, dashboards or simulated clinical approvals in the film.

## Website behavior
Autoplay on first homepage visit per tab. `?intro=replay` forces playback; `?intro=off`, hash links and capture mode bypass it. Reduced-motion preference bypasses animation. Pause/Play, Skip, Escape and Replay supported. During playback, background content is inert and focus stays in the intro controls. Hero remains available if JavaScript is disabled; a boot timeout prevents an unavailable player bundle from blocking the page indefinitely.

## Seam
The composition receives the live hero's computed background image and vertical origin. The final cloth uses the same 620px repeat and #26392366 overlay. The live hero emerges during the concluding surface shot; player removal does not trigger a second transition. Background beneath the hidden header also carries the same texture. No scrolling or layout change occurs.

## Assets
Two original generated images based on the selected direction; exact approved bookcloth copied unchanged from the brand kit. Original selected board in qa/. No third-party footage. Built-in Image Generation used.
