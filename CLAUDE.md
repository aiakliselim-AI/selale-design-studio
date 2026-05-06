# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project shape

Single-page static site for **Şelale Design Studio**, a Turkish handmade-goods storefront. Deploys as static files on **Cloudflare Pages** in **Advanced Mode**: `_worker.js` at the repo root intercepts every request, fetches the underlying asset via `env.ASSETS.fetch()`, and overlays response headers (CSP + other security headers). `.assetsignore` excludes `_worker.js` itself from being served as a static file. `_headers` is still read by the asset server and supplies non-CSP security headers; CSP is set exclusively by the worker. There is no build system, package manager, test suite, or framework — just HTML/CSS/JS served as-is. Pushes to `main` trigger a deploy.

To preview: open `index.html` in a browser, or serve the repo root with any static file server. There are no commands to run, lint, or test.

UI strings and code comments are in Turkish. Preserve Turkish when editing user-visible text.

## Architecture

- **`index.html`** is the entire public site (~1440 lines). All CSS lives in one `<style>` block and all JS in one `<script>` block at the bottom — there are no external script files. The site CSP lives in **two** places: the `PUBLIC_CSP` constant in `_worker.js` (HTTP header) and the `<meta http-equiv="Content-Security-Policy">` tag in `index.html` (browser-enforced alongside the HTTP CSP — both must allow a source for it to load). Both sit at `script-src 'self' 'unsafe-inline'`, so adding any remote script requires updating **both** locations.
- **`admin/`** is a [Sveltia CMS](https://github.com/sveltia/sveltia-cms) panel loaded from unpkg. It has its own, more permissive CSP in two places: the `ADMIN_CSP` constant in `_worker.js` (path-matched on `/admin` and `/admin/*`) and `admin/index.html`'s meta tag. `admin/config.yml` defines a `products` collection that writes markdown files (YAML frontmatter) into a `products/` folder, with media in `images/products/`.
- **CMS auth** uses a Cloudflare Worker at `https://sveltia-cms-auth.aiakliselim.workers.dev` (OAuth proxy to GitHub). The CMS commits directly to `aiakliselim-AI/selale-design-studio` on `main`. The Worker source lives outside this repo.

### Product data flow

Products live in `products/<slug>.md` (Sveltia CMS frontmatter — schema in `admin/config.yml`). On push to `main`, `.github/workflows/build-products-manifest.yml` runs `scripts/build-products-manifest.mjs` to compile `products/*.md` into `data/products.json` and commits the result with `[skip ci]` so the action doesn't loop. The live site's `loadProducts()` (around `index.html:1421`) fetches that JSON on load and feeds the result into `renderProducts()`.

When asked to "edit a product," edit the markdown in `products/` (or use Sveltia at `/admin/`). **Don't hand-edit `data/products.json`** — the manifest action regenerates it on every push.

### Key client-side concerns

- **WhatsApp is the only checkout.** The number `905330944969` is the `WA_NUMBER` constant and also appears as several hardcoded `https://wa.me/905330944969` links. If the number changes, search for both forms.
- **Favorites** persist to `localStorage` under the key `atelyeFavs`. The reader (around `index.html:929`) intentionally validates that the stored value is an integer array with `id < 10000` — preserve this validation when touching favorites code.
- **AI assistant** (the chat panel) is pure local keyword matching over the `products` array — no API calls. `aiNormalize()` strips Turkish diacritics so user input like "küpe" matches `kupe`. `AI_COLORS` maps user color synonyms to the canonical color values used in `products[*].colors`. Both must be kept in sync with the category/color values in `admin/config.yml` and the product array.
- **XSS:** all dynamic strings rendered into HTML go through `aiEscape()`. Keep using it for any new user/data-driven HTML insertion — the inline-script CSP does not mitigate injected markup.

## Conventions

- Don't introduce a build step, bundler, or framework without being asked — the project is intentionally a single static file.
- When changing **CSP**, update both the relevant constant in `_worker.js` (`PUBLIC_CSP` for the site, `ADMIN_CSP` for `/admin/*`) **and** the `<meta http-equiv="Content-Security-Policy">` tag in the affected HTML file (`index.html` or `admin/index.html`). Do **not** add a `Content-Security-Policy` line back to `_headers` — `_worker.js` actively deletes any upstream CSP to prevent a second, more restrictive policy from being merged in by the browser. Other security headers (HSTS, X-Frame-Options, etc.) live in `_worker.js` and `_headers` is for non-CSP additions only.
- New product categories or colors must be added in three places to stay consistent: the `products` array (`cat`/`colors` fields), the category/color filter buttons in the markup, and the matching `select` options in `admin/config.yml`. The AI assistant's `AI_COLORS` map and intent parser may also need updates.
