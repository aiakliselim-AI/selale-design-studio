# PLAN.md — ŞELALE DESIGN STUDIO — MASTER PLAN (v3)

> Bu dosya projenin yol haritasıdır. Claude Code yeni oturumda
> CLAUDE.md ile birlikte bu dosyayı da okur. CLAUDE.md teknik
> mimariyi anlatır, plan.md ise sıradaki işleri ve tasarım
> kararlarını anlatır.
>
> **Son güncelleme:** 2026-05-12. **Bölüm 9'daki Adım A-M
> dizisi tamamlandı.** H-L: özel günden şeffaf çanta builder'a
> preset yönlendirme; hero foto modu polish; ürün kategorileri
> + AI sözlüğü genişletildi; favorilere göre dinamik WhatsApp;
> AI asistan "anneler günü / sevgilim / şeffaf çanta seti"
> intent'leri. M: newsletter zaten 5.7'de silinmişti, doğrulandı.
> Önceki büyük güncelleme 2026-05-08 (Aşama 5 tasarım kararları,
> sağdan drawer, hero YouTube vb.).

---

## 1. PROJE ÖZETI

Şelale Design Studio — Türkçe el emeği ürünler satan tek-sayfa
statik site. Cloudflare Pages'te canlı:
https://selale-design-studio.com

- **Sahibi:** Konum Ankara. Türkçe iletişim.
- **Ana satış kanalı:** WhatsApp (`905330944969` / `selale_miyuki`).
- **CMS:** Sveltia (`/admin/`), GitHub'a doğrudan commit eder.

---

## 2. TAMAMLANANLAR

✅ **Aşama 1 — 2026-05-06:** CMS schema, emoji kaldırma, test temizliği.

✅ **Aşama 2 — 2026-05-07:** Swarovski CSS paleti, drawer emojisiz, kategori kartları düz gri. Commit'ler: `3545e1b`, `209e5e9`, `3c8f445`.

✅ **Aşama 3 — 2026-05-07:** Fotoğraf placeholder + SVG kamera ikonu. 20 ürünün hiçbirinde foto yok, hepsi `#f5f5f5` placeholder gösteriyor. `imgFallback` fonksiyonu eklendi. Commit: `d27aee2`.

✅ **Aşama 4 KISMEN TAMAMLANMIŞ — keşfedildi 2026-05-07:**
Claude Code repo analizinde `index.html` `loadCMSData()` fonksiyonunun zaten paralel olarak şu YAML'ları çektiği görüldü:
- `data/settings.yml` + `applySettings()` ✅
- `data/drawer.yml` + `renderDrawer()` ✅ (eski hiyerarşi, güncelleme gerek)
- `data/hero.yml` + `renderHero()` ✅ (arka plan foto eksik)
- `data/about.yml` + `renderAbout()` ✅
- `data/footer.yml` + `renderFooter()` ✅
- `data/printer.yml` (3D baskı) ✅
- `data/ai.yml` (AI asistan) ✅

✅ **Aşama 4 Adım A — 2026-05-08:** 3-seviyeli drawer hiyerarşisi.
`data/drawer.yml` yeniden yazıldı (`top_links`, `categories`, `bottom_links`).
`renderDrawer()` 3-seviye accordion desteği. Favorilerim "Tüm Ürünler"in
altına alındı. Commit: `643fc75`.

✅ **Aşama 5.1 — 2026-05-08:** Renk paleti + Cormorant Garamond font.
Commit: `1d6e171`.

✅ **Aşama 5.2 — 2026-05-08:** Sağdan drawer + 2-satır nav + floating temizlik.
Commit: `9f17cb1`, `56c00d8`.

✅ **Aşama 5.3 — 2026-05-08:** Site içi arama + AI asistan entegrasyonu +
asistan otomatik küçültme fix. Commit: `060920e`, `947c997`.

✅ **Aşama 5.4 — 2026-05-08:** Hero 21:9 cinematic banner + YouTube video
desteği + foto/gradient fallback. `admin/config.yml`: `background_mode` +
`video_youtube_url` eklendi. Commit: `964d458`.

✅ **Aşama 5.5 — 2026-05-08:** Modal galeri + çoklu foto desteği.
`admin/config.yml`: `images` list widget eklendi (geriye uyumlu).
Commit: `ae2c9c4`.

✅ **Aşama 5.6 — 2026-05-08:** Şeffaf çanta tam siyah banner + 5 dikey
etkinlik kartı (01-05 italik numara) + border-radius keskinleştirme.
Commit: `bdab43a`.

✅ **Aşama 5.7 — 2026-05-08:** Hakkımızda sade + Instagram grid + footer
`#1a1a1a` 4 sütun + newsletter kaldırıldı. Commit: `0e5d792`.

✅ **Adım B — 2026-05-08:** `sisedeko` → `seffaf-canta` + `canta-icerik`
göçü. 3 ürün dosyası migrate edildi. `admin/config.yml`'den `sisedeko`
seçeneği kaldırıldı. Commit: `ac6d0dd`.

---

## 3. AŞAMA 4 — CMS BOŞLUKLARINI KAPAT + YENİ İÇERİK TİPLERİ

Bu aşama "her şey hardcoded'dan CMS'e geçecek" değil — **çoğu geçmiş.**
Eksikleri kapatma + yeni özellikler ekleme aşamasıdır.

### 4.1 Drawer hiyerarşi güncellemesi ✅ TAMAMLANDI (commit `643fc75`, 2026-05-07)

**Mevcut durum:** `data/drawer.yml` + `renderDrawer()` çalışıyor ama:
- Eski hiyerarşide (kategoriler farklı sıralanmış)
- Sadece 2 seviye render ediyor (alt-alt menü desteği yok)

**Yapılacak:**
- `renderDrawer()` 3-seviye render edecek şekilde güncellenecek
- `data/drawer.yml` yeni hiyerarşiye göre yeniden yazılacak (bkz. § 5.1)
- Anahtarlık → 5 alt-alt etiket (hayvan, karakter, spor takımı, araç, isimli)
- Favorilerim "Tüm Ürünler"in hemen altına alınacak

### 4.2 Kategori kartları CMS'e bağlanacak (YENİ — eksik)

**Mevcut durum:** `index.html:513-548` arası 8 adet kategori kartı **hardcoded.** `admin/config.yml`'de `categories` koleksiyonu tanımlı ama `categories/` klasörü ve `data/categories.json` YOK.

**Yapılacak:**
- `categories/` klasörü oluşturulacak (her kategori bir `.md`)
- `scripts/build-categories-manifest.mjs` yazılacak
- `.github/workflows/build-categories-manifest.yml` yazılacak
- `index.html` hardcoded kart bloğu silinecek, `renderCategories()` eklenecek
- `loadCMSData()` içine `data/categories.json` fetch'i eklenecek

### 4.3 Hero arka plan foto seçeneği ✅ TAMAMLANDI (Aşama 5.4 + Adım I, 2026-05-12)

- `admin/config.yml` hero schema: `background_mode` (gradient/foto/video), `background_image`, `video_youtube_url`, `overlay_intensity` (none/light/medium/strong) ✅
- `renderHero()` → `applyHeroBackground()` 3 modu da destekliyor; kırık görselde `onerror` → gradient fallback ✅
- `data/hero.yml` tüm alanları içeriyor; varsayılan `gradient` + `overlay_intensity: medium` ✅

### 4.4 Müşteri yorumları sistemi (YENİ — eksik)

**Mevcut durum:** `admin/config.yml` `reviews` koleksiyonu tanımlı ama klasör/manifest YOK.

**Yapılacak:**
- `reviews/` klasörü oluşturulacak
- `scripts/build-reviews-manifest.mjs` yazılacak
- `.github/workflows/build-reviews-manifest.yml` yazılacak
- `index.html` hardcoded yorum bloğu silinecek, `renderReviews()` eklenecek

### 4.5 Özel gün konseptleri sistemi (YENİ — eksik)

**Mevcut durum:** `admin/config.yml` `events` koleksiyonu tanımlı ama klasör/manifest YOK. `index.html:585+` hardcoded event-tab'lar var.

**Yapılacak:**
- `events/` klasörü oluşturulacak (5 konsept: nişan, düğün, doğum günü, baby shower, mezuniyet)
- `scripts/build-events-manifest.mjs` yazılacak
- `.github/workflows/build-events-manifest.yml` yazılacak
- `index.html` hardcoded event blokları silinecek, `renderEvents()` eklenecek
- Her event'in altına "Şeffaf Çanta'ya yönlendiren küçük banner" eklenecek (bkz. § 4.7)

### 4.6 Şeffaf Çanta Setleri sistemi (YENİ ÖZELLİK — yok)

**Mantık:** Müşteri çanta seçer → içine eklenecek kalemleri tikler → WhatsApp'a otomatik mesaj.

**Yapılacak:**
- `admin/config.yml`'e iki yeni koleksiyon: `gift_bags` (çanta tipleri) ve `gift_bag_items` (içerik seçenekleri)
- `gift-bags/` ve `gift-bag-items/` klasörleri
- `scripts/build-gift-bags-manifest.mjs` + workflow
- Yeni sayfa bölümü: "Şeffaf Çanta Setleri" (filtre+seçim akışı)
- WhatsApp mesaj formatı:
  > "Merhaba! Şu çantayı hazırlamak istiyorum: [çanta tipi] + [seçilen ürünler] + etiket: '[mesaj]'"

**Çanta içerik seçenekleri:** koku/kolonya, mini parfüm, mini mum, miyuki bileklik, inci çanta, etiket, kuru çiçek.

**ÖNEMLİ:** "Karma Setler" ve "Süslü Şişe & Dekor" buraya dahildir — ayrı kategori değil.

### 4.7 Özel gün → Şeffaf Çanta yönlendirmesi (4.5 ve 4.6'ya bağlı)

Her özel gün konseptinin altında küçük banner:
> 🎁 "Bu güne özel hediye paketi hazırlamak ister misiniz? → Şeffaf Çanta'ya git"

Tıklayınca → Şeffaf Çanta akışına gider, **uygun filtre uygulanmış** halde.

### 4.8 "Süslü Şişe & Dekor" göç işlemi

**Mevcut durum:** 3 ürün (`karma-dekor-seti.md`, `parfum-dekor-sisesi.md`, `suslu-cam-sise.md`) hâlâ `cat: sisedeko` etiketli. `admin/config.yml`'de `sisedeko` seçeneği duruyor. Drawer'da link var.

**Yapılacak:**
- 3 ürünün `cat:` etiketi `sisedeko` yerine uygun yeni kategoriye taşınacak (büyük ihtimalle Şeffaf Çanta içerik seçeneği veya ayrı bir karma kategori)
- `admin/config.yml`'den `sisedeko` seçeneği kaldırılacak
- `data/drawer.yml`'den ilgili link silinecek
- AI asistanın `AI_CATS` sözlüğünden çıkarılacak

### 4.9 Ürün kategori yapısı genişletme ✅ TAMAMLANDI (Adım J, 2026-05-12)

- `admin/config.yml` `cat` seçeneklerine 7 yeni değer eklendi: `koku`, `parfum`, `anahtarlik-hayvan`, `anahtarlik-karakter`, `anahtarlik-spor`, `anahtarlik-arac`, `anahtarlik-isimli` (`seffaf-canta` ve `canta-icerik` Adım B'de zaten eklenmişti)
- `AI_CATS` sözlüğüne 7 yeni anahtar + eş anlamlılar (penguen/vosvos/isimli/spor takım adları vs.) — `canta-icerik`'ten `parfum`/`koku`/`kolonya` çıkarıldı (artık kendi cat'leri var)
- `AI_SECTIONS` ve `AI_CAT_LABEL` 7 yeni anahtarla senkronlandı
- Filter butonları markup'ta değişmedi (3D sub-label'ler de filter bar'da değil; AI asistan + drawer üzerinden erişiliyor)
- Henüz bu cat'lerle etiketlenmiş ürün yok — Sveltia panelinden yeni ürün eklenince çalışacak

### 4.10 WhatsApp dinamik mesaj davranışı ✅ TAMAMLANDI (Adım K, 2026-05-12)

- `buildWAMessage()` favorilere göre metin döner:
  - Boş → "Merhaba! Ürünleriniz hakkında bilgi alabilir miyim?"
  - Dolu → "Merhabalar, [Ürün 1], [Ürün 2], … hakkında bilgi alabilir miyim?"
- `refreshDynamicWALinks()` `.wa-dynamic` marker'lı tüm linklerin href'ini yeniler (text + numara birlikte)
- 4 generic WA noktası `.wa-dynamic` ile işaretlendi: drawer footer, nav icon, hakkımızda CTA, footer iletişim
- Trigger'lar: `saveFavs()`, `applyWANumber()`, `loadProducts()` sonu, başlangıçta `updateFavCounts()` yanı sıra
- Ürün detay butonları (modal + fav-card) yeni metinle: "Merhaba! [Ürün adı] hakkında bilgi alabilir miyim?"

### 4.11 AI asistan sözlüğü güncelleme ✅ TAMAMLANDI (Adım L, 2026-05-12)

- `aiParseIntent` 3 yeni special ile genişletildi:
  - `annelergunu` → bordo klasik + mini parfüm + miyuki bileklik + etiket + kuru çiçek preset
  - `sevgili` → kırmızı romantik + mini parfüm + miyuki bileklik + etiket + kuru çiçek preset
  - `giftbagset` → direkt `#giftbag-builder`'a yönlendirir
- `aiHandle` özel cevap akışları: `aiAskConfirm` ile öneriyi gösterir, onay alınca `aiApplyGiftbagPreset()` çağırır ve panel kapanır
- "isimli anahtarlık" ve "spor takımı anahtarlık" Adım J'de zaten `AI_CATS`'e eklenmişti (cat tarafı)
- `aiApplyGiftbagPreset(bagSlug, itemSlugs)` yeni ortak helper — `openGiftbagFromEvent` artık bunu kullanıyor (DRY)
- `data/ai.yml` `quick_chips` yenilendi: "Anneler günü hediyesi", "Sevgilim için hediye", "Şeffaf çanta seti" eklendi

### 4.12 Newsletter kaldırılır ✅ TAMAMLANDI (Aşama 5.7 + Adım M doğrulaması, 2026-05-12)

E-posta abone kutusu Aşama 5.7'de (commit `0e5d792`) sayfa yenilemesi sırasında zaten silinmişti. Adım M repoda iz kalıp kalmadığını doğruladı: HTML/CSS/JS/CMS schema/data — hiçbir yerde `newsletter` veya `abone` referansı yok. WhatsApp grubu açılırsa drawer/footer'a link eklenebilir.

---

## 4. SİTE AYARLARI (data/settings.yml için kesin değerler)

| Ayar | Değer |
|------|-------|
| Marka adı | "Şelale" + "Design Studio" (mevcut, aynen) |
| Konum | Ankara (footer'da gösterilir) |
| WhatsApp numarası | `905330944969` (zorunlu, görünür) |
| WhatsApp varsayılan mesajı | Favorilere göre dinamik |
| Sabit telefon | Toggle (varsayılan KAPALI) |
| E-posta | Toggle (varsayılan KAPALI) |
| Atölye adresi | Toggle (varsayılan KAPALI) |
| Çalışma saatleri | Toggle (varsayılan KAPALI) |
| Google Maps | Toggle (varsayılan KAPALI) |
| Instagram | AÇIK · `https://www.instagram.com/selale_miyuki` |
| YouTube | Toggle (varsayılan KAPALI, hesap henüz açılmadı) |
| TikTok | Toggle (varsayılan KAPALI, hesap henüz açılmadı) |
| Facebook / X / Pinterest / Telegram | Toggle (varsayılan KAPALI) |
| Marquee bant | AÇIK, mevcut içerik kalır, yeni renge uyumlu |
| Newsletter | KALDIRILIR |
| AI Asistan adı | "Şelale Asistan" (aynen kalır) |
| SEO başlığı | "Şelale Design Studio — Kişiye Özel Tasarım" |
| SEO meta | "Şelale Design Studio — El emeği Miyuki bileklik, mum, şeffaf çanta hediye setleri ve 3D baskı." |

---

## 5. KESİN MENÜ YAPILARI

### 5.1 Çekmece menüsü hiyerarşisi

```
ANA
├─ Ana Sayfa
├─ Tüm Ürünler
└─ Favorilerim (sayaçlı)

KATEGORİLER
├─ Miyuki Takılar ▾
│   ├─ Bileklik
│   ├─ Kolye
│   ├─ Küpe
│   ├─ Yüzük
│   └─ Anahtarlık ▸ (alt-alt: hayvan, karakter, spor takımı, araç, isimli)
├─ El Yapımı Mumlar ▾
│   ├─ Şekilli Mumlar
│   ├─ Kokulu Mumlar
│   ├─ Mum Setleri
│   └─ Dekoratif / Özel
├─ Koku & Parfüm ▾
│   ├─ Çiçekli Kart Sunum
│   └─ Tek Şişe Süsleme
├─ Şeffaf Çanta Setleri (YENİ etiketli)
├─ Özel Gün Konseptleri ▾
│   ├─ Nişan
│   ├─ Düğün
│   ├─ Doğum Günü
│   ├─ Baby Shower
│   └─ Mezuniyet
└─ 3D Baskı Ürünler

ALT
└─ Hakkımızda

EN ALT (sabit)
└─ WhatsApp Sipariş butonu (şeffaf, ince siyah çerçeve, telefon numarası YOK)
```

**ÖNEMLI:** Favorilerim "Tüm Ürünler"in HEMEN ALTINDA. En altta DEĞİL.

### 5.2 Üst nav bar

- Logo (sol)
- Ana Sayfa · Tüm Ürünler · Favoriler · Hakkımızda
- WhatsApp ikonu (sadece ikon, şeffaf, telefon numarası YOK)

---

## 6. ÜRÜN KATEGORİLERİ (referans, panele eklenecek)

**Miyuki Takılar:** Bileklik, Kolye, Küpe, Yüzük, Anahtarlık.

- Bileklik motifleri: geometrik, çiçek, hayvan, etnik, ince şerit, geniş manşet, püsküllü, incili, çift kişilik, yıldızlı, tila, çapa, kalp, harf/isimli, şeritli, şarmlı, nazar.
- Kolye motifleri: kelebek, çiçek, hayvan, geometrik, kalp, yıldız, çapa, yaprak, nazar, meyve, etnik, aşk, göz, damla, çoklu zincir, şarmlı, deniz kabuğu.
- Küpe motifleri: sallantı, yıldız, çiçek, kelebek, üçgen, halka, meyve, deniz kabuğu, hayvan.
- Yüzük motifleri: çiçek, geometrik, tek motif.
- Anahtarlık alt etiketleri:
  - Hayvan: penguen, tavşan, sincap, köpek, kedi, fil, panda, yunus
  - Karakter: Toothless, Spider-Man, Batman
  - Spor takımı: GS, FB, BJK, Trabzon, Barcelona
  - Araç: pembe vosvos, tekne / yelkenli
  - İsimli: harf bazlı kişiselleştirme

**El Yapımı Mumlar:** Şekilli, Kokulu, Setler, Dekoratif/Özel.

**Koku & Parfüm:** Çiçekli kart sunum, Tek şişe süslemeleri.

**Şeffaf Çanta Setleri:** Çanta tipleri (bordo klasik, kırmızı romantik, minimalist) + içerik seçenekleri (koku, mini parfüm, mini mum, miyuki bileklik, inci çanta, etiket, kuru çiçek).

**Özel Gün Konseptleri:** Nişan, Düğün, Doğum Günü, Baby Shower, Mezuniyet.

**3D Baskı:** Şu an alt kategorisiz. Ürün arttıkça Sveltia panelinden alt etiket eklenecek.

---

## 7. AŞAMA 5 — TASARIM YENİLEMESİ (Wolf & Badger / Monica Vinader esinli)

**Sıra:** Adım A (drawer hiyerarşi) bitti. Bu aşama Adım B'den ÖNCE yapılır.
**Referans:** monicavinader.com, wolfandbadger.com, bottegaveneta.com — saf siyah-beyaz, minimal, lüks butik.

### Renk paleti (REVİZE — 2026-05-08)

- Zemin `#ffffff`, yazı `#1a1a1a`, ince çizgi `#e8e8e8`, muted `#888888`, placeholder `#f5f5f5`
- **TEK TEMA: sadece açık tema. Koyu tema YOK. Toggle YOK.** (Eski plan iptal.)
- Vurgu rengi YOK. Karamel `#c8956c`, blush `#e8c4a8`, krem `#faf6f0` KALDIRILACAK
- Tüm sabit hex'ler `:root` CSS variable'ına çevrilecek

### Font (REVİZE — 2026-05-08)

- **Başlık:** Cormorant Garamond (Google Fonts) — italik serif, lüks butik tarzı
- **Gövde:** Inter (Aşama 2'de eklendi, ağırlıklar 300/400/500)
- **Playfair Display KALDIRILACAK** (eski plan iptal)
- Logo, ürün adları, başlıklar = serif (Cormorant)
- Etiketler, butonlar, gövde = sans-serif (Inter)

### Üst nav (yeni düzen)

- **Sol:** "Şelale Design Studio" italik serif logo
- **Sağ üst (1. satır):** ❤️ favori sayacı + 📞 WhatsApp ikonu + ☰ menü
- **Sağ alt (2. satır):** 🔍 site içi arama kutusu
- Floating WhatsApp ve floating AI asistan ikonları KALDIRILACAK
- Tema toggle YOK (tek tema)

### Drawer (sağdan açılır — yön değişti)

- Eskiden soldan açılıyordu, şimdi **SAĞDAN** açılır
- 3-seviyeli yapı korunur (`data/drawer.yml` dokunulmaz)
- Tüm ikonlar/emojiler `display:none` — sadece düz metin
- Genişlik: 360px (mobilde 90vw)
- En altta WhatsApp outline buton (çerçeveli, dolgu yok)

### Site içi arama (YENİ)

- Üst nav alt satırda arama kutusu
- Yazıldığında MEVCUT AI asistan paneli açılır (yeni panel açma)
- AI panel: konu chip'leri (pembe bileklik, kokulu mum, hediye seti vs.)
- Mevcut `AI_CATS` ve `AI_COLORS` sözlüğüne entegre çalışır
- ESC ve outside click ile kapanır

### Hero (YouTube reklam videosu — YENİ)

- 21:9 cinematic banner, full-width
- YouTube Unlisted embed: autoplay, muted, playsinline
- Sağ alt: ses aç/kapa + duraklat butonları
- Video yüklenmezse: fotoğraf veya gradient fallback
- Alt orta: koleksiyon etiketi + 2 buton (Koleksiyon / Hediye Setleri)
- Hero üzerinde "REKLAM FİLMİ" yazısı YOK
- Marquee bant hero altında kalır

### Kategori kartları + Ürün kartları

- Kategori: 4 dikey kart, aspect 3/4, düz `#f5f5f5` zemin, outline ikon (opacity 0.25)
- Ürün: 4 sütun grid (mobil 2), kare placeholder + kamera ikonu
- Ürün kart altı: kategori (uppercase) + isim (serif) + fiyat
- Sol üst rozet: siyah dolgu beyaz yazı (ÇOK SATAN, YENİ)
- Sağ üst: yuvarlak beyaz favori butonu
- Border-radius 22px → 0-4px (keskin köşe)
- Tüm `.c1-.c8` ve `.p1-.p8` gradient'leri KALDIRILACAK

### Modal galeri (çoklu foto — YENİ)

- Sol büyük resim (aspect 1) + sağ ürün bilgisi
- Alt thumbnail strip (3-10 foto)
- Sol-sağ ok butonları, klavye: ESC, ←, →
- 1 foto varsa thumb ve oklar gizlenir
- `admin/config.yml`: `images` list widget eklenir, eski tek `image` alanı geriye uyumlu okunur
- WhatsApp + Favori butonları altta

### Diğer bölümler

- **Şeffaf çanta banner:** tam genişlik siyah arka plan, beyaz italik başlık, "Keşfet" beyaz buton, hero ile ürünler arasına
- **Özel günler:** 5 dikey kart, "01 → 05" italik numara üstte
- **Hakkımızda:** 2 sütun, blob/emoji kalkar, placeholder foto, 3 istatistik
- **Yorumlar:** 3 kart, açık gri zemin (`#fafafa`), italik serif metin
- **Instagram grid:** 6 kare placeholder (gerçek embed sonra), @selale_miyuki link
- **Footer:** siyah zemin (`#1a1a1a`), 4 sütun
- **Newsletter KALDIRILIR** (§ 4.12 zaten diyor)

### Alt adımlar (sırayla, her biri ayrı commit + push + onay bekleme)

- **5.1** Renk paleti + font + temel altyapı
  - Cormorant Garamond import, `:root` yeniden yaz, Playfair kaldır
  - Karamel/krem/blush → siyah/beyaz/gri (CSS variable)
  - CMS etkisi: yok | Risk: orta

- **5.2** Üst nav + drawer ikonları + floating temizlik
  - Üst nav 3 ikon + arama kutusu
  - Drawer ikon span'ları gizlenir, SAĞDAN açılır
  - Floating WhatsApp + AI ikonları HTML'den kaldırılır
  - Drawer altı WhatsApp butonu outlined yapılır
  - CMS etkisi: drawer.yml korunur (sadece render değişir) | Risk: düşük

- **5.3** Site içi arama + AI asistan entegrasyonu
  - Üst nav arama input → mevcut AI panel'e bağlanır
  - AI panel sağ üstten açılır (380px), chip'ler eklenir
  - ESC + outside click ile kapanır
  - CMS etkisi: yok | Risk: orta

- **5.4** Hero reklam videosu + foto fallback
  - `data/hero.yml`'e: `background_mode` (gradient/foto/video), `background_image`, `video_youtube_url`
  - `admin/config.yml` hero schema güncellenir
  - `renderHero()` mode'a göre uygun gösterim
  - CSP'ye YouTube domain eklenir: `_worker.js` PUBLIC_CSP + `index.html` meta CSP
    - `frame-src https://www.youtube.com https://www.youtube-nocookie.com`
  - CMS etkisi: hero.yml + admin/config.yml + 2 yerde CSP | Risk: orta-yüksek

- **5.5** Modal galeri + çoklu foto
  - `admin/config.yml`'de `images` list widget (geriye uyumlu)
  - Modal HTML: grid sol resim + sağ bilgi + alt thumb
  - Sol-sağ ok + klavye kısayolları
  - `imgFallback` korunur (placeholder kamera)
  - CMS etkisi: admin/config.yml + products schema | Risk: orta

- **5.6** Hero altı bölümler (kategoriler, ürünler, banner, özel günler)
  - Marquee siyah/beyaz, kategori gradient'leri kalkar
  - Şeffaf çanta banner eklenir
  - Özel günler 5 dikey kart
  - Border-radius keskinleşir
  - CMS etkisi: yok | Risk: orta

- **5.7** Hakkımızda + yorumlar + Instagram + footer
  - Hakkımızda 2 sütun + 3 istatistik
  - Yorumlar açık gri zemin
  - Instagram 6 kare placeholder
  - Footer siyah 4 sütun
  - Newsletter KALDIRILIR
  - CMS etkisi: yok | Risk: düşük

### Korunacak

- ✅ Sveltia panelinde ürün ekle/sil/düzenle çalışmaya devam etsin
- ✅ `data/drawer.yml` yapısı korunsun
- ✅ `admin/config.yml`'e `images` array eklensin (eski `image` geriye uyumlu)
- ✅ `loadCMSData()` ve `loadProducts()` bozulmasın
- ✅ `atelyeFavs` localStorage validation korunsun
- ✅ `aiEscape()` XSS koruması korunsun

### Dokunulmayacak (Aşama 5.4 hariç — CSP'ye YouTube ekleme)

- ❌ `_worker.js` (Aşama 5.4 dışında)
- ❌ `_headers`
- ❌ `admin/index.html`
- ❌ Cloudflare Worker
- ❌ GitHub OAuth ayarları
- ❌ Cloudflare Pages deployment
- ❌ DNS / Domain
- ❌ `data/drawer.yml` yapısı
- ❌ `data/products.json`

---

## 9. ÇALIŞMA SIRASI (CLAUDE CODE'A VERİLECEK)

### Sıralı yol haritası:

**Adım A — Drawer hiyerarşi güncellemesi (§ 4.1)** ✅ TAMAMLANDI (commit `643fc75`, 2026-05-07)

🎨 **AŞAMA 5 — TASARIM YENİLEMESİ (§ 7) — ✅ TAMAMLANDI**
- 7 alt adım (5.1 → 5.7) bitti
- Commit'ler: `1d6e171`, `9f17cb1`, `56c00d8`, `060920e`, `947c997`,
  `964d458`, `ae2c9c4`, `bdab43a`, `0e5d792`

**Adım B ✅ TAMAMLANDI (commit `ac6d0dd`) — "Süslü Şişe & Dekor" göçü (§ 4.8)**
- 3 ürünün etiketi `seffaf-canta` / `canta-icerik`'e taşındı
- `admin/config.yml`'den `sisedeko` seçeneği kaldırıldı

🎯 **Adım C — Manifest workflow altyapısı (§ 4.2, 4.4, 4.5 için ÖN GEREKLİLİK) — SIRADAKİ**
- `scripts/build-categories-manifest.mjs`
- `scripts/build-events-manifest.mjs`
- `scripts/build-reviews-manifest.mjs`
- Üç adet GitHub Actions workflow
- Henüz `categories/`, `events/`, `reviews/` klasörlerini doldurmuyor — sadece altyapı kuruyor

**Adım D — Kategori kartları CMS'e bağlama (§ 4.2)**
- `categories/` klasörü 8 `.md` ile dolar
- `index.html` hardcoded blok silinir, `renderCategories()` eklenir

**Adım E — Müşteri yorumları CMS'e bağlama (§ 4.4)**
- `reviews/` klasörü doldurulur
- `index.html` hardcoded blok silinir, `renderReviews()` eklenir

**Adım F — Özel gün konseptleri (§ 4.5)**
- `events/` klasörü 5 konsept ile dolar
- `index.html` hardcoded event-tab'lar silinir, `renderEvents()` eklenir

**Adım G — Şeffaf Çanta sistemi (§ 4.6)**
- `gift_bags` ve `gift_bag_items` koleksiyonları
- Yeni sayfa bölümü
- WhatsApp mesaj akışı

✅ **Adım H — 2026-05-12 — Özel gün → Şeffaf Çanta yönlendirme (§ 4.7) TAMAMLANDI**
- `admin/config.yml` events koleksiyonuna `gift_bag_preset` (relation→gift_bags) + `gift_bag_preset_items` (relation→gift_bag_items, multiple) eklendi
- 5 event MD dosyasına uygun çanta+içerik önerileri yazıldı
- `index.html` `renderEvents()` her karta "🎁 Bu güne özel hediye paketi hazırla →" banner ekler (sadece preset varsa)
- Yeni JS: `openGiftbagFromEvent(slug)` — `giftbagState`'i ön doldurup `#giftbag-builder`'a smooth-scroll yapar
- Etkinlik manifesti yeniden üretildi (`data/events.json`)

✅ **Adım I — 2026-05-12 — Hero arka plan foto (§ 4.3) TAMAMLANDI**
- CMS/JS altyapısı zaten Aşama 5.4'te yapılmıştı (`background_mode`, `background_image`, `video_youtube_url`, `renderHero` 3 mod desteği)
- Polish: `img.onerror` → kırık URL'de otomatik gradient fallback (`applyGradientFallback`)
- Yeni CMS alanı: `overlay_intensity` (none/light/medium/strong) — foto/video modunda metnin okunabilirliği için arka plan koyu katman yoğunluğu
- `.hero-shade.intensity-{none,light,strong}` CSS modifier'ları eklendi (medium = mevcut davranış)
- `admin/config.yml` hero hint'leri netleştirildi (boyut, fallback davranışı)
- `data/hero.yml` default `overlay_intensity: medium` ile güncellendi

✅ **Adım J — 2026-05-12 — Ürün kategori genişletme (§ 4.9) TAMAMLANDI**
- `admin/config.yml`'e 7 yeni cat değeri (koku, parfum, 5 anahtarlık alt etiketi)
- `AI_CATS` + `AI_SECTIONS` + `AI_CAT_LABEL` üçlüsü 7 yeni anahtarla senkron
- `canta-icerik` AI synonyms'inden `parfum`/`koku`/`kolonya` çıkarıldı (artık dedicated cat)
- Filter butonları değişmedi (3D sub-label pattern'iyle tutarlı)

✅ **Adım K — 2026-05-12 — WhatsApp dinamik mesaj (§ 4.10) TAMAMLANDI**
- `buildWAMessage()` + `refreshDynamicWALinks()` helper'ları eklendi
- 4 generic WA linki (`.wa-dynamic`): drawer / nav / hakkımızda CTA / footer iletişim
- `saveFavs`, `applyWANumber`, `loadProducts` sonu ve boot'ta refresh tetikleniyor
- `applyWANumber` `.wa-dynamic` linklerini skip ediyor (yoksa `?text=`'i siliyordu)
- Modal + fav-card mesajları "[Ürün adı] hakkında bilgi alabilir miyim?" şekline alındı

✅ **Adım L — 2026-05-12 — AI asistan sözlüğü (§ 4.11) TAMAMLANDI**
- 3 yeni AI special: `annelergunu`, `sevgili`, `giftbagset`
- Her biri için `aiAskConfirm` akışı + onay → `aiApplyGiftbagPreset()`
  ya da `giftbag-builder`'a smooth scroll
- Yeni ortak helper: `aiApplyGiftbagPreset(bagSlug, itemSlugs)`
  — `openGiftbagFromEvent` artık bunu çağırıyor (DRY)
- `data/ai.yml` quick_chips güncellendi: yeni intent örnekleri görünür

✅ **Adım M — 2026-05-12 — Newsletter kaldırma (§ 4.12) TAMAMLANDI**
- E-posta abone kutusu Aşama 5.7'de (commit `0e5d792`) zaten kaldırılmıştı
- Adım M, repo-wide arama ile newsletter / abone izlerinin kalmadığını doğruladı
- Kod değişikliği gerekmedi; sadece plan.md güncellendi
- WhatsApp grubu açılırsa drawer/footer'a link eklenebilir

---

## 10. ÖNEMLİ TEKNİK NOTLAR (CLAUDE CODE'A)

- `data/drawer.yml` (json değil **yml**!)
- `data/products.json` için workflow var; diğer manifest'ler için yazılması gerekiyor
- Workflow loop guard: `paths` filter `<klasör>/**` ile sınırlı, `data/<dosya>.json` commit'i kendini tetiklemez
- `[skip ci]` veya benzer marker İLAVE EDİLMEYECEK (Cloudflare Pages bunu "skip deploy" olarak okur)
- CSP iki yerde: `_worker.js`'deki `PUBLIC_CSP` + `index.html`'in meta tag'i
- Yeni kategori/renk eklenince `admin/config.yml`'de `select` listesi + `index.html`'deki filtre butonları + AI asistan sözlüğü senkronize edilmeli
- `aiEscape()` her dinamik HTML insertion'unda kullanılmalı (XSS koruması)
- `localStorage` favoriler `atelyeFavs` key'i, integer array, `id < 10000` validasyonu korunmalı

---

## 11. KARAR — Bir sonraki Claude Code oturumunda

Kullanıcı yeni oturumda Claude Code'a şu prompt'u verecek:

> "Plan.md ve CLAUDE.md'yi okudun. Aşama 5.1 ile başlayalım — Renk paleti + tema toggle altyapısı. index.html'in :root CSS variable bloğunu yeniden yaz, [data-theme='dark'] selector ekle, sabit hex'leri variable'a çevir, üst nav'a ☀/🌙 toggle butonu ekle, toggleTheme() JS fonksiyonu yaz, localStorage 'selale-theme' key'e kaydet. Sadece bu adım — başka dosyaya dokunma. Bitince commit et 'feat(theme): saf siyah-beyaz tema + açık/koyu toggle' mesajıyla, push'u ben söyleyeceğim."

Bu yaklaşım:
- ✅ Küçük, kontrollü adımlar
- ✅ Her adım ayrı commit
- ✅ Hata durumunda kolay geri alınır
- ✅ Kullanıcı her adımı canlıda doğrulayabilir