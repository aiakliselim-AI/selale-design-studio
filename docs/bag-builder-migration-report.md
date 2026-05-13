# Çanta Builder v2 — Migration Raporu

**Branch:** `feat/bag-builder-rewrite`
**Tarih:** 2026-05-13

Eski `gift-bag-items` koleksiyonu yerine artık `products` koleksiyonundaki
ürünler kullanılıyor. Aşağıda eski item'ların yeni ürünlere otomatik
eşleştirme tablosu var.

## 1) Otomatik eşleştirme yapılanlar (8 ürün)

| Eski Item (gift-bag-items) | Eşleşen Ürün (products) | giftBagPrice |
|---|---|---|
| Miyuki Bileklik (+₺120) | ID 1 — Pastel Miyuki Bileklik | 120 |
| Miyuki Bileklik (+₺120) | ID 3 — Gökkuşağı Bileklik | 120 |
| Mini Anahtarlık (yeni) | ID 8 — Miyuki İsim Anahtarlık | 60 |
| Mini Mum (+₺85) | ID 9 — Çiçek Şekilli Mum | 85 |
| Mini Mum (+₺85) | ID 10 — Taş Dokulu Mum | 85 |
| Mini Mum (+₺85) | ID 12 — Koku Mumu | 85 |
| Mini Parfüm (+₺75) | ID 14 — Parfüm Dekor Şişesi | 75 |
| Şişe Dekor (+₺50) | ID 13 — Süslü Cam Şişe | 50 |

Bu ürünler artık `Çantanızı siz doldurun` builder'ında otomatik görünür.

## 2) Manuel atama gereken ürünler

Bu ürünler şu an `giftBagEligible:false` (varsayılan). Eğer çanta setine
uygunsa CMS panelinden açabilirsin:

- ID 2 — Çift Kişilik Bileklik Set (büyük set, isteğe bağlı)
- ID 4 — İnce Miyuki Kolye
- ID 5 — Çiçek Desenli Kolye
- ID 6 — Miyuki Sallantı Küpe
- ID 7 — Miyuki Mercan Yüzük
- ID 11 — Kabartmalı Mum Seti (3'lü) — set olarak büyük olabilir
- ID 15 — Karma Dekor Seti — zaten bir set
- ID 16–20 — 3D Baskı ürünleri

Atamak için:
1. `/miyukitakilaranahtarlik/` paneline gir
2. **Ürünler** koleksiyonunu aç, ürünü düzenle
3. `Çanta Setine Uygun mu?` → TRUE
4. `Çantaya Eklenince Ek Fiyat (₺)` → bir rakam (örn 100)
5. Kaydet

## 3) Eski içeriklerden eşleşmeyen kalemler

Bunlar `gift-bag-items/` koleksiyonunda vardı, mevcut ürünlerde karşılığı yok:

- **Koku / Kolonya** — Ürünler arasında yok. Yeni ürün olarak eklenirse `giftBagEligible:true` yapılabilir.
- **İnci Çanta Süsü** — Ürünler arasında yok. Çanta aksesuarı olarak yeni ürün açılabilir.
- **Özel Etiket** — Artık builder'ın sağ altındaki "Özel Etiket" textarea'sına taşındı (her sipariş için ücretsiz, isteğe bağlı kişisel mesaj).
- **Kuru Çiçek** — Ürünler arasında yok. Yeni ürün olarak açılabilir.

## 4) Eski koleksiyonların durumu

- `gift-bags/` (Çanta Setleri — eski) → **Korundu.** Events koleksiyonundaki
  `gift_bag_preset` relation'ı buna bağlı, bu yüzden silinmiyor.
- `gift-bag-items/` (eski içerikler) → **Korundu** (aynı sebeple).
- `data/gift-bags.json` ve `data/gift-bag-items.json` → **Korundu** ama
  yeni builder bunlardan veri okumuyor.

İleride eski sistemi tamamen kaldırmak istenirse:
1. `events/*.md` içindeki `gift_bag_preset` ve `gift_bag_preset_items` alanlarını temizle
2. `config.yml`'den 12 ve 13 numaralı koleksiyonları (`gift_bags`, `gift_bag_items`) sil
3. `gift-bags/`, `gift-bag-items/` klasörlerini sil
4. `.github/workflows/build-gift-bags-manifest.yml`'yi sil
5. `scripts/build-gift-bags-manifest.mjs`'yi sil
6. `data/gift-bags.json` ve `data/gift-bag-items.json`'u sil

## 5) Yeni veri akışı

```
products/<slug>.md       → data/products.json  (mevcut workflow)
data/bags/<slug>.json    → data/bags.json      (yeni workflow)
                                ↓
                       index.html builder
```

Builder, çanta ekleyince `data/bags/<slug>.json` dosyasını CMS panelinden
ekler. Yeni workflow `data/bags.json` manifestini oluşturur, site bunu
fetch eder.

## 6) Bilinen eksikler

- [ ] Çanta fotoğrafı yüklenmedi (Bordo Klasik için). Panel'den
      `Çantalar (Yeni Builder)` → Bordo Klasik → "Çanta Fotoğrafı" yükle.
- [ ] Ürün fotoğrafları büyük çoğunlukla yok — fallback (renkli daire +
      ilk harf) gösteriliyor.
- [ ] Şu an tek çanta var (Bordo Klasik). İkincisi panelden eklenince
      otomatik seçim kartı gözükür.
