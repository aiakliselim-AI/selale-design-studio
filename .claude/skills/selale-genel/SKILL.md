---
name: selale-genel
description: Şelale Design Studio projesinin genel mimarisi, dosya yapısı ve çalışma kuralları hakkında bağlam sağlar. Repo üzerinde herhangi bir göreve başlarken veya projeyle ilgili genel sorular sorulduğunda kullan.
---

# Şelale Design Studio — Genel Rehber

Şelale Design Studio, el yapımı Miyuki takı, mum, süslü şişe ve 3D baskı ürünleri satan Türkçe bir vitrin sitesidir. Tek dosyalık statik site mimarisiyle çalışır, sipariş tek kanaldan (WhatsApp) alınır.

## Mimari özet

- **`index.html`** — Sitenin tamamı. Tüm CSS tek bir `<style>` bloğunda, tüm JS tek bir `<script>` bloğunda satır içidir (~1440 satır). Build adımı, paket yöneticisi, framework veya test altyapısı YOKTUR.
- **`admin/`** — Sveltia CMS yönetici paneli. unpkg üzerinden yüklenir. `admin/config.yml` ile yapılandırılır.
- **`_headers`** — Netlify hosting tarafından okunan güvenlik başlıkları dosyası. `/` ve `/admin/*` için ayrı CSP politikaları içerir.
- **`robots.txt`, `security.txt`** — SEO ve güvenlik bildirim dosyaları.

## Çalışma kuralları

- Önizleme için herhangi bir statik dosya sunucusu yeterlidir; çalıştırılacak komut, lint veya test yoktur.
- Kullanıcıya görünen tüm metinler Türkçedir (`<html lang="tr">`). Mevcut metinleri düzenlerken Türkçeyi koru.
- Build sistemi, bundler veya framework önermeden önce kullanıcıya sor — proje kasıtlı olarak tek dosyalık tutuluyor.
- Sipariş kanalı sadece WhatsApp: `905330944969` numarası `WA_NUMBER` sabiti olarak ve `https://wa.me/905330944969` linki olarak birden fazla yerde sabit yazılıdır. Numara değişirse her iki formatı da ara.

## Önemli mimari boşluk

Sveltia CMS (`/admin/`) `products/` klasörüne markdown dosyaları yazacak şekilde yapılandırılmıştır, fakat canlı site **bu klasörü hiç okumaz**. Ürünler `index.html:896` civarında sabit yazılı bir `const products = [...]` JS dizisinden render edilir. Kullanıcı "ürün düzenle" derse, aksi belirtilmedikçe JS dizisini düzenle — CMS düzenlemesi siteye yansımaz.

## Hosting

Netlify üzerinde statik site olarak yayınlanır. `_headers` dosyası Netlify konvansiyonudur. `main` branch'e push deploy tetikler.

## İlgili kaynak dosyalar

- `CLAUDE.md` — Bu dosyanın daha kısa bir özeti, her oturumda otomatik yüklenir.
- `admin/config.yml` — CMS koleksiyon şeması.
- `index.html:893` `WA_NUMBER` sabiti.
- `index.html:896` `products` dizisi.
- `index.html:1101` `aiEscape()` (XSS koruması).
- `index.html:1120` `AI_COLORS` (renk eş anlamlıları).
