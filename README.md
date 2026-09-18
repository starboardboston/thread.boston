# thread.boston

Landing site for **Thresholds — A Golden Thread Initiative** in East Boston: a home page ([index.html](index.html)) plus one page per threshold ([threshold1.html](threshold1.html)–[threshold4.html](threshold4.html) and [bremen.html](bremen.html) for Threshold 5). Static, no build step.

## Layout

- `index.html`, `threshold1.html`–`threshold4.html`, `bremen.html` — the six pages. Threshold 5 lives at `bremen.html` so its URL is `thread.boston/bremen`, matching the printed QR code (GitHub Pages serves `/bremen` from `bremen.html`); `threshold5.html` is a client-side redirect stub to `/bremen`
- `site.css` — shared styles (brand `@font-face` rules, dialog backdrops, scroll-reveal, focus rings, skip link)
- `site.js` — shared behavior (menu/citations/lightbox dialogs, scroll reveal, hero parallax); every block feature-detects its elements, so all six pages load the same file
- `images/`, `images_v2/`, `images_v3/` — photography; `grfx/` — logos and UI graphics; `fonts/` — self-hosted webfonts
- `grfx/og/` — 1200×630 social-sharing cards (Open Graph / Twitter), one per page, generated from each page's hero image
- `sitemap.xml`, `robots.txt`, `site.webmanifest` — crawler and PWA metadata (canonical host: `https://thread.boston`)

## External libraries

- **[Tailwind CSS](https://tailwindcss.com/) 3.4.16** — loaded via the Play CDN (`cdn.tailwindcss.com`), pinned to 3.4.16 for stability. Brand tokens (the `ink`/`gold` colors, `site` max-width, and font families) are configured in an inline `tailwind.config` block in each page's `<head>`.
- **[Google Fonts](https://fonts.google.com/specimen/GFS+Didot)** — serves *GFS Didot*, the running-text serif.
- **Self-hosted fonts** (in `fonts/`, declared via `@font-face` in `site.css`) — *Lulo Clean One Bold* (display headings) and *Sackers Gothic* light/medium/heavy (wordmark and letterspaced caps).

There are no other dependencies: interactivity (menu/citation dialogs, image lightbox, scroll reveal, hero parallax) is vanilla JavaScript in `site.js` using native browser APIs (`<dialog>`, `IntersectionObserver`).

## Running the dev server (Windows)

The site is static, so any local HTTP server works — serving over HTTP (rather than opening `index.html` directly) makes fonts and CDN requests behave like production. With Python installed, from Windows Terminal in the project root:

```bash
python -m http.server 8741 --bind 127.0.0.1
```

Then open <http://localhost:8741> in your browser. Stop the server with `Ctrl+C`.

Alternative if you prefer Node:

```bash
npx serve .
```
