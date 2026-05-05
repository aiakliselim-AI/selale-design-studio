---
name: selale-urun
description: Şelale sitesinde ürün ekleme, düzenleme veya silme. Ürün dizisinin şeması, kategoriler ve renklerin senkron tutulması gereken yerler. Ürün veya kategori değişikliği gerektiren tüm işlerde kullan.
---

# Şelale — Ürün Yönetimi

## Tek doğru kaynak

Canlı sitede gösterilen ürünler `index.html:896` civarındaki `const products = [...]` JS dizisidir. **Sveltia CMS henüz siteye bağlı değil** — `/admin/` üzerinden ürün eklemek `products/` klasörüne markdown yazar fakat site bunu okumaz. Bu durum kullanıcı tarafından açıkça belirtilmedikçe ürün düzenlemeleri JS dizisi üzerinden yapılmalıdır.

## Ürün şeması

```js
{
  id: 1,                          // Tamsayı, benzersiz, 0–9999 (favori validation buna güvenir)
  name: 'Pastel Miyuki Bileklik', // Türkçe ürün adı
  desc: 'El yapımı pastel ...',   // Türkçe açıklama
  price: '₺190',                  // String, ₺ sembolü dahil
  oldPrice: '₺240',               // Boş string '' veya indirim öncesi fiyat
  icon: '📿',                     // Emoji — image yoksa fallback
  bg: 'p1',                       // Arka plan gradient class'ı: p1–p8
  badge: 'Çok Satan',             // Boş '' veya 'Yeni' / 'Çok Satan' / 'Popüler'
  cat: ['miyuki','bileklik'],     // Kategori dizisi — birden fazla olabilir
  colors: ['pembe','mavi',...],   // Renk dizisi — AI eşleştirme buradan yapılır
  isNew: false,                   // Boolean — 'Yeni' rozeti için
  image: ''                       // Boş ise icon fallback gösterilir
}
```

## Üç yerde senkron tutulması gereken alanlar

### Kategoriler
Yeni bir kategori eklerken aşağıdaki üç yer aynı anda güncellenmelidir:

1. **`index.html:896`** — `products` dizisindeki `cat` alanı (kullanılacak slug değeri).
2. **Filtre butonları** — Sayfa içindeki `filter-btn` butonları ve drawer/footer içindeki `filterProducts(...)` çağrıları (yaklaşık satır 407–426, 458–459, 521–556, 715–732, 812–816). Mevcut bir kategoriyi tara, aynı kalıbı izle.
3. **`admin/config.yml`** — `cat` alanı altındaki `select` widget'ının `options` listesi (satır 36–51).

Mevcut kategori slug'ları: `miyuki`, `bileklik`, `kolye`, `kupe`, `yuzuk`, `anahtarlik`, `mum`, `sisedeko`, `3d`, `3d-anahtarlik`, `3d-oyuncak`, `3d-alet`, `3d-deko`. Slug Türkçe karakter İÇERMEZ (`küpe` → `kupe`).

### Renkler
Yeni renk eklerken dört yer:

1. **`products[*].colors`** içinde slug değer.
2. **`admin/config.yml`** satır 53–72 — `colors` widget'ının `options` listesi.
3. **`AI_COLORS` haritası** (`index.html:1120` civarı) — kullanıcının yazabileceği eş anlamlıları slug'a eşler.
4. AI asistanının kategori parser'ı renk için filtreliyorsa `aiParseIntent()` (satır 1158) tarafına da bak.

## ID kuralı

- `id` sıralı verilmek zorunda değil ama **benzersiz** olmalı.
- 0–9999 aralığında tut — `index.html:934` favori validation'ı bu sınıra güveniyor.
- Mevcut en yüksek ID'yi kontrol et, bir sonrakini ver.

## Görsel ekleme

- `image` alanı boşsa ürün kartında `icon` (emoji) gösterilir. Bu kasıtlı bir fallback.
- Görsel eklenecekse:
  - CMS yolu: `/admin/` üzerinden (henüz canlı siteye bağlı değil — yukarıdaki not).
  - Manuel yol: `images/products/` klasörüne dosyayı koy, `image: '/images/products/dosya.jpg'` olarak referans ver. CSP `img-src` zaten `https:` ve `data:`'ya izin veriyor.

## Render kontrolü

Ürün listesi `renderProducts(products)` ile başlangıçta render edilir (`index.html:1436`). Filtre butonu `filterProducts(cat, btn)` çağırır ve grid'i yeniden render eder.

## Güvenlik

Ürün alanlarındaki tüm string'ler render anında `aiEscape()`'ten geçer. Yeni alan eklersen render içinde `${aiEscape(p.yeniAlan)}` kullan — XSS koruması bunun üzerinde duruyor.
