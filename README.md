# Webinar Presentation — agorum x onprem.ai

Single-file HTML presentation for the joint webinar "Lokale KI fur unabhangige & souverane Unternehmen" (19.05.2026, 10:00-11:00 via Zoom).

## Architecture

The final `presentation.html` is assembled from separate source files by `build.sh`:

```
template.html          Shell with <head>, progress bar, script tags
├── styles.css         All slide styles (injected at <!-- STYLES -->)
├── slides/01..18.html Slide markup (injected at <!-- SLIDES -->)
└── js/slide-01..18.js Per-slide animation + engine.js (injected at <!-- SCRIPTS -->)
```

Run `bash build.sh` after any change to regenerate `presentation.html`.

## Dependencies (loaded via CDN)

- **GSAP 3.12** — all animations (clip reveals, fade-ins, line-draws, counters)
- **MapLibre GL 3.6** — interactive maps on slides 2 and 6
- **DM Sans / DM Mono** — typography via Google Fonts

## Navigation

- **Arrow Right / Space** — advance (next sub-state or next slide)
- **Arrow Left** — go back (previous sub-state or previous slide)
- **Progress dots** — click to jump to any slide

Many slides have internal sub-states (click-through steps) before advancing to the next slide. This is handled by `s[N]Advance()` / `s[N]GoBack()` functions registered in `engine.js`.

## Slides

| # | Title | Sub-states | Animation |
|---|-------|------------|-----------|
| 01 | Title | — | Clip reveal, image slide-in |
| 02 | Switzerland Map | 3 steps | MapLibre zoom, marker fade |
| 03 | Encryption Paradigms | 7 clicks | Card focus/dim, diagram reveals |
| 04 | Die richtige Frage | 1 click | Text reveal |
| 05 | Key Statement | 1 click | Text reveal |
| 06 | CLOUD Act | 1 click | MapLibre, jurisdiction reveal |
| 07 | Data Value | 2 clicks | Diamond scale, conflict diagram |
| 08 | Semantics | 1 click | Redacted word reveal, semantic diagram |
| 09 | Sicherheit | 3 clicks | Card entrance, SVG line-draw (grey→green) |
| 10 | Was macht onprem.ai? | 5 clicks | Pipeline steps, SVG line-draw (grey→green), badges |
| 11 | Full AI Vertical | — | Side-by-side compare, cycling app names, annotations |
| 12 | Inference | — | Arrow animations |
| 13 | Models | — | Pill entrance |
| 14 | Trend | — | Line-draw on |
| 15 | Speed | — | Counter animation |
| 16 | Hardware Tiers | — | Card entrance |
| 17 | Costs | — | Chart line-draw |
| 18 | Summary | — | Staggered text reveal |

## Design System

- **Background**: `#0a0a0a` with subtle grid lines and radial glows
- **Accent**: `#47FFD7` (green)
- **Red**: `#FF4444` (warnings, conflicts)
- **Cards**: `#141414` with `rgba(255,255,255,0.08)` borders
- **Typography**: DM Sans (headings, body), DM Mono (labels, code, badges)
- **Viewport**: fixed at 1920px width, vw/vh units throughout

## Animation Patterns

- **Clip reveal**: headline text revealed left-to-right via `clipPath`
- **SVG line-draw**: `strokeDasharray` / `strokeDashoffset` for drawing paths
- **Grey-to-green**: SVG elements start with dim stroke/fill in CSS, GSAP animates to accent color on reveal
- **Cards start hidden**: `opacity: 0; visibility: hidden; transform: translateY()` in CSS to prevent flash-on-load

## LinkedIn Post

`linkedin-post.html` is a standalone 1000x525 card designed for LinkedIn sharing. Generate the PNG:

```bash
cd ../pitchdeck && node -e "
const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 566, deviceScaleFactor: 3 });
  await page.goto('file://' + path.resolve('../webinar/linkedin-post.html'), { waitUntil: 'networkidle0' });
  const card = await page.\$('.card');
  await card.screenshot({ path: path.resolve('../webinar/linkedin-post.png'), type: 'png' });
  await browser.close();
})();
"
```

## File Overview

```
webinar/
├── build.sh                  Build script
├── template.html             HTML shell
├── styles.css                All CSS
├── slides/01..18.html        Slide markup
├── js/engine.js              Navigation engine
├── js/slide-01..18.js        Per-slide animations
├── presentation.html         Built output (do not edit directly)
├── linkedin-post.html        LinkedIn card (standalone)
├── linkedin-post.md          LinkedIn post text
├── linkedin-post.png         Generated card image
├── webinar.md                Speaker notes (Tino's parts)
├── webinar-agorum.md         Speaker notes (final version)
└── webinar2.md               Speaker notes (extended)
```
