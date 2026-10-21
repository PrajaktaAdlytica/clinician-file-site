# Intro preview QA — 21 October 2026

final result: passed

## Source and evidence
Source: qa/selected-direction.png (1536 × 1024 treatment board); actual full-bleed asset public/film/landscape.png (1672 × 941).
Implementation: ../clinicianfile-homepage/qa/intro-desktop.png at 1280 × 720 CSS pixels, and intro-mobile.png at 390 × 844. Browser screenshots use 1× density.
Comparison: qa/visual-comparison.jpg combines the selected board main-frame crop and the opening browser frame. Their aspect ratios differ intentionally: the board uses a cinematic crop, while playback fills the viewport; source images retain proportions with object-fit cover. Mobile is separately composed with a central focus and smaller captions.
Additional evidence: intro-hero-handoff-desktop.png, intro-hero-handoff-mobile.png, intro-remotion-studio.png in website qa/.

## Required fidelity checks
- Typography: Source Serif 4 supplied locally; small 26–38px captions; Inter controls. No large headings or navbar in film.
- Spacing: full-bleed viewport, controls inside 20px mobile / 4vw desktop safe margin. No horizontal overflow at 390px.
- Color: olive, ivory and brass retained. Final frame uses exact approved bookcloth, 620px repeat, same computed hero overlay and origin.
- Imagery: original generated photographic assets derived from approved third direction, no UI placeholders. Camera movement is an animated-still treatment; no physical cloth simulation or live action claimed.
- Copy: Individual sources / One accountable record. No product efficacy, clinical, compliance or live-system claims.
Focused inspection: mobile controls and caption sizing, desktop image detail, hero handoff; same captures show these clearly.

## Fix history
1. P1 loading pseudo-element obscured film because body establishes an isolated stacking context. Limited it to pending-before-player state. Post-fix desktop/mobile screenshots show actual film.
2. P2 replay control overflowed fixed-height mobile hero footer. Grouped it with motion control and made footer height intrinsic. Pointer and keyboard replay tested after fix.
3. P2 programmatic focus outlined hero heading after completion. Kept focus transfer for accessibility, removed noninteractive heading outline. Updated handoff captures.
4. Studio font import initially failed; corrected bundled font path. Studio now displays and plays composition. Earlier console entries are retained in browser logs; website final checks report no errors.

## Behavior checked
- Autoplay, Pause, Play, automatic completion and live hero restoration.
- No header while film active; header inert and opacity zero.
- Skip and replay by keyboard and pointer. Background inert state cleared after finish.
- Mobile full-screen dimensions 390 × 844, scrollWidth 390.
- Product dropdown navigation works after film completion on mobile.
- TypeScript passes; website link checker: 19 pages, 2,040 references, zero issues.

## Limits
Reduced-motion bypass and preference-change logic reviewed in source; browser emulation unavailable in current tools. Physical devices and other browser engines not tested. Preview uses two raster scenes and camera moves, not simulated weaving. No MP4 export or deployment performed.


## Continuous handoff revision
User reported the old ending felt abrupt. Replaced the independent post-ended overlay fade with a single Remotion frame clock driving film opacity and staged live hero opacity. Dossier begins at frame 338, headline at 350, details at 372; all finish by 419. Navbar begins after ended and finishes before player removal. Shortened texture settling; removed empty end hold before page reveal.
Evidence: website qa/handoff-v2-mid-desktop.png, handoff-v2-late-desktop.png, handoff-v2-complete-desktop.png, handoff-v2-mid-mobile.png and handoff-v2-sequence.jpg. Continuous screenshot sampling captured actual intermediate frames, not artificially set DOM states. Desktop mid capture film opacity .626, art .292, copy .096; mobile film .374, viewport/scrollWidth 390. Completed desktop player absent, film 0, header 1. Typography and artwork preserved. TypeScript and local references pass.
final result: passed


## Final accessibility fixes
Replay respects page Reduce motion plus system preference. Focus return preserves interactive button tabindex. Browser tested page toggle, hidden replay, keyboard replay/pause/skip and restored background interactivity. TypeScript passed.
final result: passed
