---
name: selale-cms
description: Sveltia CMS yönetici panelinin yapılandırması, GitHub backend kimlik doğrulama akışı, ve canlı site bağlantı boşluğu. CMS yapılandırmasını düzenlerken, yeni alan/koleksiyon eklerken veya CMS-site entegrasyon işlerinde kullan.
---

# Şelale — Sveltia CMS Rehberi

## Mevcut durum

`admin/index.html` Sveltia CMS'i unpkg üzerinden yükler:
```html
<script type="module" src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
```

`admin/config.yml` koleksiyonları tanımlar. Şu an sadece `products` koleksiyonu var.

## Backend ve kimlik doğrulama

```yaml
backend:
  name: github
  repo: aiakliselim-AI/selale-design-studio
  branch: main
  base_url: https://sveltia-cms-auth.aiakliselim.workers.dev
  auth_endpoint: auth
  auth_scope: repo
```

- **GitHub backend:** CMS, panelden yapılan düzenlemeleri doğrudan `aiakliselim-AI/selale-design-studio` deposunun `main` branch'ine commit eder.
- **Auth proxy:** `sveltia-cms-auth.aiakliselim.workers.dev` adresindeki Cloudflare Worker, GitHub OAuth akışını yürütür. Worker kaynağı **bu repoda DEĞİL** — dış sistem.
- **Scope:** `repo` (tam okuma/yazma).

## CSP konfigürasyonu

`/admin/*` yolu için iki yerde CSP tanımlıdır ve **her ikisi de güncellenmeli**:
1. **`_headers`** dosyası (Netlify) — `/admin/*` bloğu, satır 12–17.
2. **`admin/index.html`** içindeki `<meta http-equiv="Content-Security-Policy">` etiketi.

Mevcut izinli kaynaklar: `unpkg.com` (CMS scripti), `api.github.com` ve `*.githubusercontent.com` (backend), `*.workers.dev` (auth).

## Koleksiyon şeması (`admin/config.yml`)

```yaml
collections:
  - name: products
    folder: products            # Markdown dosyaları buraya yazılır
    extension: md
    format: yaml-frontmatter    # Üst kısım YAML, altı boş
    slug: '{{slug}}'            # Otomatik slug
    sortable_fields: ['name', 'price', 'order']
```

Alanlar `index.html` içindeki `products` dizisi şemasıyla **birebir aynı** olmalıdır:
`name, price, oldPrice, desc, icon, cat, colors, badge, isNew, image, order`

**Farklılık:** JS dizisinde `bg` (gradient class) ve `id` alanları vardır, CMS şemasında YOKTUR. Eğer wiring kurulursa bu alanlar üretilmeli (id otomatik atanmalı, bg tur olarak dönüşüm yapılmalı).

## Medya yapılandırması

```yaml
media_folder: images/products   # Yüklenen dosyalar buraya gider
public_folder: /images/products # Public URL prefix'i
```

CMS'ten yüklenen görseller GitHub'a `images/products/` altına commit edilir.

## ⚠️ Kritik bağlantı boşluğu

**CMS canlı siteye BAĞLI DEĞİL.** Yönetici paneli `products/` klasörüne markdown dosyaları yazar fakat `index.html` bu klasörü hiç okumaz; bunun yerine satır 896'daki sabit yazılı `const products = [...]` dizisini kullanır.

CMS'i siteye bağlamak için yapılacaklar (henüz yapılmadı):

1. `products/*.md` dosyalarını fetch et (build-time veya client-side).
2. YAML frontmatter parser'ı ekle (örn. `js-yaml` küçük bir CDN'den veya manuel parse).
3. Frontmatter'ı `products` dizisi şekline dönüştür (eksik `id` ve `bg` alanlarını üret).
4. `renderProducts(products)` çağrısını async hâle getir.

Bu değişikliği kullanıcı açıkça istemediyse YAPMA — `selale-genel` skill'inde de belirtildiği gibi proje şu an kasıtlı olarak tek dosyalık tutuluyor.

## Yeni alan eklemek

`admin/config.yml`'e yeni bir alan eklersen:
- `index.html` ürün dizisi şemasını da eşleştir (gerçi şu an okunmuyor, ama tutarlılık için).
- `widget` tipini doğru seç: `string`, `text`, `boolean`, `number`, `select` (multiple opsiyonu için), `image`.
- Türkçe `label` ve gerekirse `hint` ekle — paneli kullanan kişi Türkçe görüyor.
