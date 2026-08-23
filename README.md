# RobiChip official website

Static, route-complete migration of the RobiChip Google Site to GitHub Pages-compatible HTML, CSS, and JavaScript.

## What is included

- Homepage and all primary Google Sites navigation pages.
- RobiSoC, RobiDev, RobiThrust, RobiTorque, RobiAgent, and RobiLab platform pages.
- Technology Insights index plus four article routes.
- News & Events index plus six event/detail routes.
- Partnership, Join Us, and Privacy Policy routes.
- Shared responsive navigation, footer, metadata, canonical URLs, structured data, sitemap, and robots file.
- Existing RobiChip logo and three platform images retained from this repository.
- Google Analytics ID `G-JMMFPY6RMQ` retained.
- Elfsight AI chatbot app `81f17c2c-1f14-4548-a7c3-64076eb9e933` loaded globally on every page.

## Architecture

This migration intentionally has no build step or package dependencies. Each public route contains a small HTML entry point; shared presentation and page data live in:

- `assets/styles.css`
- `assets/site.js`

Serve the repository root with any static server. For example:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

## GitHub Pages

The repository is prepared for GitHub Pages with `CNAME` and `.nojekyll`. Do not switch production DNS from Google Sites until the media placeholders, privacy copy, links, analytics, and responsive pages have been reviewed.

See [MIGRATION.md](MIGRATION.md) for the route inventory and remaining media work.
