# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project shape

Single-page static site for **Şelale Design Studio**, a Turkish handmade-goods storefront. Deploys as static files on **Netlify** (the `_headers` file is Netlify's security-header convention). There is no build system, package manager, test suite, or framework — just HTML/CSS/JS served as-is. Pushes to `main` trigger a deploy.

To preview: open `index.html` in a browser, or serve the repo root with any static file server. There are no commands to run, lint, or test.

UI strings and code comments are in Turkish. Preserve Turkish when editing user-visible text.

## Architecture

- **`index.html`** is the entire public site (~1440 lines). All CSS lives in one `<style>` block and all JS in one `<script>` block at the bottom — there are no external script files. The site CSP (both in `_headers` and the `<meta http-equiv="Content-Security-Policy">` tag) sets `script-src 'self' 'unsafe-inline'`, so adding remote scripts to the public site will require updating **both** locations.
- **`admin/`** is a [Sveltia CMS](https://github.com/sveltia/sveltia-cms) panel loaded from unpkg. It has its own, more permissive CSP (in both `_headers` under `/admin/*` and `admin/index.html`'s meta tag). `admin/config.yml` defines a `products` collection that writes markdown files (YAML frontmatter) into a `products/` folder, with media in `images/products/`.
- **CMS auth** uses a Cloudflare Worker at `https://sveltia-cms-auth.aiakliselim.workers.dev` (OAuth proxy to GitHub). The CMS commits directly to `aiakliselim-AI/selale-design-studio` on `main`. The Worker source lives outside this repo.

### Critical wiring gap

The live site does **not** read from the CMS. Products are a hardcoded `const products = [...]` array around `index.html:896`, and `renderProducts(products)` runs on load. The Sveltia CMS at `/admin/` writes markdown to `products/`, but nothing reads that folder. Editing a product via the CMS will NOT change the site until a fetch/render bridge is added. If asked to "edit a product," edit the JS array unless the user explicitly wants to wire up the CMS pipeline.

### Key client-side concerns

- **WhatsApp is the only checkout.** The number `905330944969` is the `WA_NUMBER` constant and also appears as several hardcoded `https://wa.me/905330944969` links. If the number changes, search for both forms.
- **Favorites** persist to `localStorage` under the key `atelyeFavs`. The reader (around `index.html:929`) intentionally validates that the stored value is an integer array with `id < 10000` — preserve this validation when touching favorites code.
- **AI assistant** (the chat panel) is pure local keyword matching over the `products` array — no API calls. `aiNormalize()` strips Turkish diacritics so user input like "küpe" matches `kupe`. `AI_COLORS` maps user color synonyms to the canonical color values used in `products[*].colors`. Both must be kept in sync with the category/color values in `admin/config.yml` and the product array.
- **XSS:** all dynamic strings rendered into HTML go through `aiEscape()`. Keep using it for any new user/data-driven HTML insertion — the inline-script CSP does not mitigate injected markup.

## Conventions

- Don't introduce a build step, bundler, or framework without being asked — the project is intentionally a single static file.
- When changing security headers, update **both** `_headers` and the `<meta http-equiv="Content-Security-Policy">` tag in the affected HTML file (`index.html` for the public site, `admin/index.html` for the CMS).
- New product categories or colors must be added in three places to stay consistent: the `products` array (`cat`/`colors` fields), the category/color filter buttons in the markup, and the matching `select` options in `admin/config.yml`. The AI assistant's `AI_COLORS` map and intent parser may also need updates.
