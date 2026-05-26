# Sessions & Lessons

The working diary of a non-traditional coder — sessions, notes, and experiments from building with AI as a creative partner, not a replacement. A [Lupo Studios](https://github.com/localwolfpackai) project.

> Learning to build with AI, *in public.*

## Design direction

Thin clean linework, a real grid, monochrome restraint — referencing Rauno's Devouring Details, Pentagram, Brad Woods' garden, and IBM Design. Depth comes from hairlines, grids, and layering, never glow.

## Structure

```
.
├── index.html        Home — hero · 3-unit overview · before/after SEO · about · AI modal
├── notes.html        The garden — digital field notes
├── assets/
│   ├── css/app.css   Design tokens + components (oklch, light-first)
│   ├── js/app.js     Theme toggle · scroll reveal · modal · deep-links
│   └── img/          Brand marks + monochrome illustrations
├── docs/             The original design brief (design-card.md, tokens.json)
└── archive/v1/       An earlier, retired direction — kept for reference only
```

## Run it locally

No build step. Serve the folder and open it:

```bash
python3 -m http.server 4321
# Home  → http://localhost:4321/
# Notes → http://localhost:4321/notes.html
# add #ask to any URL to open the AI modal
```

## Stack

- Static HTML / CSS / vanilla JS — zero dependencies
- **Type:** Newsreader (display) · Geist (UI) · Geist Mono (labels), via Google Fonts
- **Color:** `oklch()` throughout, light-mode default with a persisted dark toggle
- Accessible by default: reduced-motion support, focus rings, semantic landmarks, alt text

## Credits

Design & writing by **Lupo** — [@humanlup](https://x.com/humanlup) · [@_lupo](https://instagram.com/_lupo)

— Lupo
