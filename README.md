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
- **Georgia** — system serif for running text and the home page hero introduction; no external font download.
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

## Location suggestions — added October 23, 2026

`suggest/index.html` serves **https://thread.boston/suggest/**. Visiting
`https://thread.boston/suggest` redirects to the directory URL automatically.
Upload the whole `suggest` folder, including its `thanks` subfolder, to the
repository root alongside `index.html`. There is no build step or new package.
The home-page sixth tile and the menus on the home and threshold pages link here.

The page uses the existing logo, self-hosted fonts, navy (`#0B1E26`), and gold
(`#ccb283`). Its small `suggest/suggest.css` stylesheet does not need Tailwind or
JavaScript. Only **Place name** and **Story** are required. Address/location,
submitter contact, and funding ideas are optional; the funding section expands
on demand. Suggestions do not require a funding commitment.

### Enable email delivery (one-time step)

The form posts to **https://formsubmit.co/david@starboard.boston**. FormSubmit
provides the email backend for this static GitHub Pages site without an API key
or account signup. Its default CAPTCHA remains enabled, with an additional
hidden honeypot. Every visible field is named so it is included in the email.

1. Publish these files to the existing GitHub Pages repository.
2. Visit **https://thread.boston/suggest/** and submit a clearly marked setup
   test, such as place name **SETUP TEST — please ignore** and story
   **Testing Golden Thread suggestion email delivery.** Leave optional fields
   blank to verify anonymous suggestions work.
3. Open the activation message sent to **david@starboard.boston** and click its
   confirmation link. Check the spam folder if necessary. The form is not
   activated just by uploading these files.
4. Submit one more clearly marked test and confirm the email arrives with
   subject **New Golden Thread location suggestion**. After any CAPTCHA,
   successful submissions return to **https://thread.boston/suggest/thanks/**.

Activation and live inbox delivery were **not** performed or verified when
preparing this update. Complete the above steps before promoting the form.
The page also offers a direct email link as a fallback. Contact information is
one optional text field, allowing a name, phone, email, or a combination; a
submitter email address is not required and automatic Reply-To is not configured.

Provider documentation: https://formsubmit.co/documentation
Activation and troubleshooting: https://formsubmit.co/help
