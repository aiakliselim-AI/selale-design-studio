# PLAN.md — ŞELALE DESIGN STUDIO — MASTER PLAN (v3)

> Bu dosya projenin yol haritasıdır. Claude Code yeni oturumda
> CLAUDE.md ile birlikte bu dosyayı da okur. CLAUDE.md teknik
> mimariyi anlatır, plan.md ise sıradaki işleri ve tasarım
> kararlarını anlatır.
>
> **Son güncelleme:** 2026-05-07. Adım A (drawer hiyerarşi) tamamlandı;
> Aşama 5 (tasarım yenilemesi) öne alındı ve 5 alt adıma bölündü;
> Aşama 6 → Aşama 5'e dahil edildi.

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

### 4.3 Hero arka plan foto seçeneği (yarı tamam, devam)

`data/hero.yml` + `renderHero()` çalışıyor ama "gradient / foto" mod seçeneği eksik.

**Yapılacak:** `admin/config.yml` hero schema'sına `background_mode` (gradient/foto) ve `background_image` alanları eklenecek. `renderHero()` bu modu desteklemeli.

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

### 4.9 Ürün kategori yapısı genişletme

`admin/config.yml` içindeki `cat` seçeneklerine eklenecekler:
- `koku` (Koku & Parfüm)
- `parfum`
- `seffaf-canta` (ana kategori)
- `canta-icerik` (çanta içine eklenebilen kalemler)
- Anahtarlık alt etiketleri: `anahtarlik-hayvan`, `anahtarlik-karakter`, `anahtarlik-spor`, `anahtarlik-arac`, `anahtarlik-isimli`

AI asistanın `AI_COLORS` ve niyet ayrıştırıcısı bu yeni kategorilerle senkron tutulacak.

### 4.10 WhatsApp dinamik mesaj davranışı

WhatsApp butonu mesajı favorilere göre değişir:
- Favoriler boşsa → `"Merhaba! Ürünleriniz hakkında bilgi alabilir miyim?"`
- Favoriler doluysa → `"Merhabalar, [Ürün 1], [Ürün 2], [Ürün 3] hakkında bilgi alabilir miyim?"`
- Ürün detay butonu → `"Merhaba! [Ürün adı] hakkında bilgi alabilir miyim?"`

Genel WhatsApp butonuna entegre olur — ayrı buton koyulmaz.

### 4.11 AI asistan sözlüğü güncelleme

`AI_CATS` ve `AI_COLORS`'e yeni kategoriler ve komutlar eklenecek:
- "anneler günü hediyesi"
- "sevgilime ne alabilirim"
- "şeffaf çanta seti"
- "isimli anahtarlık"
- "spor takımı anahtarlık"

### 4.12 Newsletter kaldırılır

Mevcut e-posta abone kutusu kaldırılır. WhatsApp grubu henüz yok; ileride açılırsa link eklenecek.

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

## 7. AŞAMA 5 — TASARIM YENİLEMESİ (ÖNCELİKLİ — Adım B'den ÖNCE yapılır)

**Sıra değişikliği:** Bu aşama plan.md'de Aşama 4'ün kalan adımlarından (B, C, D, E…) ÖNCE yapılacak. Sebep: kullanıcı görsel motivasyon istiyor; CMS göçleri sonra. Adım A (drawer hiyerarşi) zaten tamamlandı.

**Referans:** [monicavinader.com](https://www.monicavinader.com/), [wolfandbadger.com](https://www.wolfandbadger.com/) — saf siyah-beyaz, minimal, lüks butik.

### Renk paleti

- **Açık tema (default):** zemin `#ffffff`, yazı `#1a1a1a`, ince çizgi `#e8e8e8`, muted `#888888`
- **Koyu tema:** zemin `#0f0f0f`, yazı `#ffffff`, ince çizgi `#2a2a2a`, muted `#888888`
- Vurgu rengi YOK (saf nötr). Karamel `#c8956c`, blush `#e8c4a8`, krem `#faf6f0`, sage `#a8b89a`, rose `#d4857a` → KALDIRILACAK
- Logo "Şelale Design Studio": Playfair Display italik serif font, renk siyah/beyaz (font vurgu, renk vurgu değil)

### Tema sistemi

- Default: HER ZAMAN açık tema ile başlar
- Toggle: üst nav sağda ☀/🌙 ikonu (tek tık)
- Tercih `localStorage`'a kaydedilir, geri ziyarette hatırlanır
- Sistem temasını ALGILAMA (kullanıcı tercih ettiyse onu kullan)
- CSS: `:root` altında açık tema variable'lar, `[data-theme="dark"]` altında koyu tema değerleri

### Üst nav (yazılı linkler kaldırıldı, sadece ikonlar)

- Sol: ☰ hamburger ikon (sadece ikon, "MENU" yazısı YOK)
- Orta: "Şelale Design Studio" italik serif logo
- Sağ: ❤️ favori sayacı + ☀/🌙 tema toggle
- WhatsApp butonu üstten kaldırılacak

### Drawer (3-seviyeli yapı korunacak — `data/drawer.yml` dokunulmayacak)

- Drawer içindeki tüm ikonlar gizlenecek (`display: none`)
- Sadece düz metin isimler gösterilecek
- En altta WhatsApp butonu KALIR ama outlined (çerçeveli, içi boş, siyah ince çizgi) yapılacak
- Drawer içinde tema toggle YOK (sadece üst nav'da)

### Floating ikonlar

- Sol alt: WhatsApp outline SVG amblem (içi boş, ince çizgi, daire YOK, transparent zemin) — `currentColor` kullanır
- Sağ alt: Mesaj balonu outline SVG (içi boş, ince çizgi, 3 nokta içeride) — `currentColor` kullanır
- Hover: `scale(1.1)`, `0.2s` transition
- Eski emoji 📱 ve 💬 kaldırılacak

### Hero + Kategori + Ürün kartları

- Hero gradient/blob arka plan kaldırılır
- Hero mini-card'lar ve dönen badge kaldırılır
- Hero sağ tarafına placeholder fotoğraf alanı (gerçek foto gelene kadar kamera outline ikon)
- Kategori kart gradient'leri (`.c1`-`.c8`) kaldırılır → düz tema uyumlu açık gri zemin
- Kategori kart büyük emoji'leri kaldırılır → küçük foto alanı
- Ürün kart gradient'leri (`.p1`-`.p8`) kaldırılır → düz tema uyumlu zemin
- Border-radius'lar 22px → 8-12px (lüks, minimal)
- Buton stilleri: birincil = siyah dolgu beyaz yazı (koyu temada beyaz dolgu siyah yazı). İkincil = transparent + 1px border

### Modal galeri (yeni özellik — yöneticiden çoklu foto eklenebilir)

- Mevcut modal yenilenir: sol tarafa BÜYÜK resim alanı (300x300+ minimum), sağ tarafa bilgi (isim, açıklama, fiyat)
- Çoklu fotoğraf desteği: ana resim + altta thumbnail strip
- Resim üzerine tıklayınca tam ekran lightbox (ok tuşları ile galeri gezinme, ESC ile kapatma)
- Resim yokken kamera outline ikon placeholder
- `admin/config.yml`: tek `image` alanı yerine `images` liste alanı (geriye uyumlu — eski tek `image` alanı varsa onu da okur, yöneticiden eski ürünler bozulmadan yeni çoklu foto formatına geçilebilir)
- `products/*.md` şeması: `image` (eski) VEYA `images` (yeni) alanı

### AI panel + Footer + Son temizlik

- AI asistan paneli renkleri tema uyumlu (gradient/karamel kalkar)
- Modal renkleri tema uyumlu
- Footer: koyu zemin tema uyumlu (`#1a1a1a` / `#0f0f0f`)
- Newsletter gradient kalkar
- Toast renkleri tema uyumlu
- Reviews/yorumlar warm krem zemin kalkar
- About bölümü büyük emoji blob kalkar → placeholder foto alanı
- Tüm kalan karamel/krem hex'ler CSS variable'a çevrilir

### Çalışma şekli — 5 alt adım, her adımda ayrı commit + onay bekle

- **Adım 5.1:** Renk paleti + tema toggle altyapısı (CSS variable'lar, ☀/🌙 toggle, `localStorage`)
- **Adım 5.2:** Üst nav + drawer ikon kaldırma + floating SVG ikonlar (üst WhatsApp kalkar, drawer ikonları gizlenir, alt floating SVG outline'a döner)
- **Adım 5.3:** Hero + kategoriler + ürün kartları (gradient kaldır, minimal görünüm, placeholder foto alanları)
- **Adım 5.4:** Modal galeri (büyük resim, çoklu foto, lightbox, `admin/config.yml` `images` array desteği, `products/*.md` geriye uyumluluk)
- **Adım 5.5:** AI panel + footer + son temizlik + plan.md işaretle

Her adım sonunda commit + push, sonra DUR ve kullanıcıya **"Adım 5.X tamamlandı, push edildi. Canlı sitede test edip devam etmemi söyler misiniz?"** diye sor. Kullanıcı onayı olmadan bir sonraki adıma geçme.

### Korunacak (yönetici paneli bozulmasın)

- ✅ Sveltia panelinde ürün ekle/sil/düzenle çalışmaya devam etsin
- ✅ `data/drawer.yml` yapısı korunsun (sadece `index.html`'de ikon span'ları gizlenecek)
- ✅ `admin/config.yml` yeni `images` array desteği eklensin (eski `image` tek alan geriye uyumlu okunacak)
- ✅ `loadCMSData()` ve `loadProducts()` fonksiyonları bozulmasın
- ✅ `atelyeFavs` localStorage validation korunsun (integer array, `id < 10000`)
- ✅ `aiEscape()` XSS koruması her dinamik string'de korunsun
- ✅ Yeni kategori/renk eklendiğinde `admin/config.yml` + `index.html` filter butonları + `AI_COLORS` senkron tutulsun

### Dokunulmayacak

- ❌ `_worker.js` (CSP, header'lar)
- ❌ `_headers`
- ❌ `admin/index.html` (Sveltia loader, CSP)
- ❌ Cloudflare Worker (`sveltia-cms-auth.aiakliselim.workers.dev`)
- ❌ GitHub OAuth ayarları
- ❌ Cloudflare Pages deployment ayarları
- ❌ DNS / Domain ayarları
- ❌ `data/drawer.yml` yapısı
- ❌ `data/products.json` (workflow regenerates)

---

## 9. ÇALIŞMA SIRASI (CLAUDE CODE'A VERİLECEK)

### Sıralı yol haritası:

**Adım A — Drawer hiyerarşi güncellemesi (§ 4.1)** ✅ TAMAMLANDI (commit `643fc75`, 2026-05-07)

🎨 **AŞAMA 5 — TASARIM YENİLEMESİ (§ 7) — SIRADAKİ**
- 5 alt adım: 5.1 → 5.5
- Her adım sonunda ayrı commit + push + onay bekleme
- Adım B'den ÖNCE bitirilecek

**Adım B — "Süslü Şişe & Dekor" göçü (§ 4.8)** — Aşama 5 BİTTİKTEN sonra
- 3 ürünün etiketi düzeltilir
- `sisedeko` her yerden silinir

**Adım C — Manifest workflow altyapısı (§ 4.2, 4.4, 4.5 için ÖN GEREKLİLİK)**
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

**Adım H — Özel gün → Şeffaf Çanta yönlendirme (§ 4.7)**
- Adım F + G'ye bağlı

**Adım I — Hero arka plan foto (§ 4.3)**

**Adım J — Ürün kategori genişletme (§ 4.9)**

**Adım K — WhatsApp dinamik mesaj (§ 4.10)**

**Adım L — AI asistan sözlüğü (§ 4.11)**

**Adım M — Newsletter kaldırma (§ 4.12)**

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

> "Plan.md ve CLAUDE.md'yi okudun. Bölüm 9'daki sırayla başlayalım — Adım A (Drawer hiyerarşi güncellemesi). data/drawer.yml'i § 5.1'deki hiyerarşiye göre yeniden yaz, renderDrawer() fonksiyonunu 3-seviye render edecek şekilde güncelle, Favorilerim yerini değiştir. Sadece bu adım — başka dosyaya dokunma. Bitince commit et ve göster, push'u ben söyleyeceğim."

Bu yaklaşım:
- ✅ Küçük, kontrollü adımlar
- ✅ Her adım ayrı commit
- ✅ Hata durumunda kolay geri alınır
- ✅ Kullanıcı her adımı canlıda doğrulayabilir