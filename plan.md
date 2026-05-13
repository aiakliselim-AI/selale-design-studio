# PLAN.md — ŞELALE DESIGN STUDIO — MASTER PLAN (v4)

> **Bu dosya Claude Code'un yol haritasıdır.**
> Yeni oturumda **`CLAUDE.md` ile birlikte** bu dosya da okunur.
> `CLAUDE.md` teknik mimariyi anlatır; bu dosya **sıradaki işleri** ve
> **alınan tasarım kararlarını** anlatır.
>
> **Son güncelleme:** 2026-05-13.
> **v4 farkı:** v3 stale kalmıştı (tamamlanan aşamalar "yapılacak"
> tonunda yazılmıştı). v4 sıfırdan, net, sıralı yazıldı. Yeni UI
> kararları (Mockup 1-A, 2-C), admin URL değişimi ve
> Bölüm 4-11'in detayları eklendi.

---

## 0. İÇİNDEKİLER

1. Tamamlanmış İşler (Geçmiş Özet)
2. Mevcut Durum
3. Proje Bilgileri
4. Tasarım Kararları (Kesin)
5. Yapılacak Aşamalar (Sıralı)
   - Aşama 1 — Admin URL Değişimi
   - Aşama 2 — Özel Gün Konseptleri (İkonsuz, Numaralı)
   - Aşama 3 — 3D Baskı (İki Bölüm)
   - Aşama 4 — Foto Yükleme Süreci (Kullanıcı işi)
   - Aşama 5 — SEO + Sitemap + OG (Düşük öncelik)
6. Claude Code Çalışma Kuralları
7. Güvenlik & Dokunulmayacak Yerler
8. Karar Tablosu
9. Sıradaki Claude Code Oturumu — İlk Prompt

---

## 1. TAMAMLANMIŞ İŞLER (GEÇMİŞ — ÖZET)

Bu aşamalar **bitti, canlıda çalışıyor.** Tekrar yapma:

| Aşama | İçerik | Commit |
|-------|--------|--------|
| 1, 2, 3 (Mayıs 2026) | CMS schema, palet, foto placeholder altyapısı | — |
| 4 Adım A | Drawer 3-seviye accordion | `643fc75` |
| 5.1 → 5.7 | Tasarım yenileme (saf siyah-beyaz, Cormorant Garamond, sağdan drawer, hero video, modal galeri, dark footer, newsletter kaldırma) | `1d6e171`, `9f17cb1`, `56c00d8`, `060920e`, `947c997`, `964d458`, `ae2c9c4`, `bdab43a`, `0e5d792` |
| Adım B | `sisedeko` → `seffaf-canta` + `canta-icerik` göçü | `ac6d0dd` |
| Adım C | Manifest workflow altyapısı | `8bb7e8e` |
| Adım D | Kategori kartları CMS'e bağlandı | `f51bf48` |
| Adım E | Müşteri yorumları CMS'e bağlandı | `6a14509` |
| Adım F | Özel gün konseptleri CMS'e bağlandı | `9643ed0` |
| Adım G | Şeffaf çanta sistemi (builder + 2 collection) | `0ee2900` |
| Adım H | Event → şeffaf çanta preset yönlendirme | `237f755` |
| Adım I | Hero foto modu polish + overlay intensity | `25664dd` |
| Adım J | Ürün kategori genişletme (7 yeni cat) | `684a7e4` |
| Adım K | Dinamik WhatsApp mesajı (favoriler) | `0e89a9d` |
| Adım L | AI intent'leri (anneler günü, sevgili, gift bag) | `18b9c00` |
| Adım M | Newsletter izlerinin doğrulanması | `84ef176` |

---

## 2. MEVCUT DURUM

- **Site canlı:** https://selale-design-studio.com
- **Repo:** `aiakliselim-AI/selale-design-studio` (**public**)
- **CMS:** Sveltia (`/admin/`), PAT ile giriş çalışıyor
- **Deploy:** Cloudflare Pages, otomatik push-deploy
- **Worker:** `sveltia-cms-auth.aiakliselim.workers.dev` (OAuth proxy, dokunulmuyor)
- **Yedek branch:** `backup-before-cms-rewrite` (korunuyor)

**Çalışan altyapı:**
- 7 CMS collection dosya-bazlı (products, categories, events, reviews, gift-bags, gift-bag-items + workflow'lar)
- 7 CMS singleton (settings, drawer, hero, about, printer, footer, ai)
- 1 master worker (CSP path-bazlı)

---

## 3. PROJE BİLGİLERİ

| Bilgi | Değer |
|-------|-------|
| İşletme adı | Şelale Design Studio |
| Konum | **Ankara** |
| WhatsApp | `905330944969` (sabit, görünür) |
| Instagram | `@selale_miyuki` (aktif) |
| Dil | Türkçe (UI + tüm metinler) |
| Ana satış kanalı | WhatsApp |
| Kullanıcı tarzı | Adım adım rehberlik ister, mockup sever, güvenlik öncelikli |

---

## 4. TASARIM KARARLARI (KESİN)

Aşağıdaki kararlar **kullanıcı tarafından onaylandı**. Plan.md v3'te belirsizdi, v4'te kesin.

### 4.1 — Özel Gün Konseptleri (Mockup 1, Seçenek A)
**Değişim:** Emoji ikon kutusu (visual_icon) → **kaldırılacak**, yerine **numaralı tipografi**.
**Yeni yapı:**
- "01" italik Cormorant Garamond, açık gri
- 40px ince çizgi (divider)
- Büyük başlık + altında italik küçük başlık (örn: "NİŞAN / Konsepti")
- Açıklama + fiyat + "WhatsApp'tan Sor" butonu

### 4.2 — 3D Baskı (Mockup 2, Seçenek C)
**Değişim:** Tek bloklu yazıcı ikonu + chip'ler → **iki ayrı bölüm**.
**Yeni yapı:**
- **Üst:** "── HAZIR ÜRÜNLER ──" + 4 kart (foto + net fiyat + "Sipariş Ver")
- **Alt:** "── KİŞİYE ÖZEL TASARIM HİZMETİ ──" + 4 numaralı kart (01-04, ikon yok, "Fiyat Sor")
- Aralarında çizgili divider
- Altta tek WhatsApp CTA butonu

### 4.3 — Çekmece (Yarı-statik)
**Karar:** Çekmecenin **iskelet kodda sabit** kalır:
- 4 ana grup başlığı: MİYUKİ TAKI, EV & DEKOR, 3D BASKI, ÖZEL GÜNLER
- Her grup altındaki ürün/kategori başlıkları **panelden gelir** (zaten kategori CMS'i var)
- Çekmecede aksiyon türü seçimi YOK (admin/config.yml'de var ama kullanılmıyor — sabit davranış)

### 4.4 — Çoklu WhatsApp
**Karar:** Sadece **Favoriler sayfasında** kalır. Plan.md'deki Adım K'da uygulandı, yeni iş yok.

### 4.5 — Tema Renkleri
**Karar:** ❌ Panelden değiştirilebilir tema rengi **YOK**. Renkler kodda kalır. Sezonluk değişiklik gerekirse Claude Code'a sorulur.

### 4.6 — Foto Stratejisi
**Karar:** Foto yokken **düz gradient + ürün adı yazısı** (mevcut placeholder). Emoji ikon **YOK**. Foto yükleme **kullanıcının işi** (Sveltia panelinden).

### 4.7 — Admin URL Değişimi
**Karar:** `/admin/` → **`/miyukitakilaranahtarlik/`**
**Amaç:** Tahmin edilemez yol, bot tarama azalır.

### 4.8 — Mobil
**Karar:** Responsive web (mobil uygulama değil). Mockup'lar mobilde alt alta sıkışmadan görünmeli:
- Çekmece mobilde geniş (88-90vw)
- Etkinlik kartları mobilde 2 sütun, çok küçükte 1 sütun
- 3D Baskı iki bölümü alt alta

### 4.9 — Newsletter
**Karar:** Kalktı. WhatsApp grubu açılırsa drawer/footer'a link eklenebilir.

---

## 5. YAPILACAK AŞAMALAR (SIRALI)

> Sıralama **bağımlılık** prensibine göre:
> En izole iş önce, sayfa içi UI sonra, geri plan SEO en sona.
> Her aşama **ayrı commit + push + kullanıcı onayı** ile ilerler.

---

### 🔐 AŞAMA 1 — Admin URL Değişimi (`/admin/` → `/miyukitakilaranahtarlik/`)

**Amaç:** Admin paneline erişim yolunu tahmin edilemez hale getir.

**Etkilenen dosyalar:**
- `admin/` klasörü → `miyukitakilaranahtarlik/` olarak rename
- `_worker.js` → `isAdmin = url.pathname === "/admin"...` satırı güncellenecek
- `_headers` → `/admin/*` blok başlığı `/miyukitakilaranahtarlik/*` olarak değişecek
- `robots.txt` → varsa `/admin/` satırı güncellenecek (ya da `/miyukitakilaranahtarlik/` Disallow eklenecek)
- `admin/config.yml` içindeki `base_url` değişmez (Worker URL'i)

**Adımlar:**
1. Yedek branch'i kontrol et (`backup-before-cms-rewrite` var mı?)
2. Yeni branch aç: `git checkout -b feat/admin-url-rename`
3. Klasörü rename et: `git mv admin miyukitakilaranahtarlik`
4. `_worker.js`'de iki yeri güncelle:
   ```javascript
   // Eski:
   const isAdmin = url.pathname === "/admin" || url.pathname.startsWith("/admin/");
   // Yeni:
   const isAdmin = url.pathname === "/miyukitakilaranahtarlik" || url.pathname.startsWith("/miyukitakilaranahtarlik/");
   ```
5. `_headers`'ta path bloğunu güncelle:
   ```
   /miyukitakilaranahtarlik/*
     X-Frame-Options: DENY
     ...
   ```
6. `robots.txt`'i kontrol et — `Disallow: /admin/` varsa kaldır, yerine `Disallow: /miyukitakilaranahtarlik/` ekle (opsiyonel — `<meta name="robots" content="noindex">` zaten var)
7. Test (lokal değil, branch deploy'da)

**Risk:**
- ⚠️ Cloudflare Worker'da `auth_endpoint` Worker URL'inde — Worker URL'i değişmez, sorun yok
- ⚠️ Sveltia kullanıcısı yer imini eski URL'e koymuş olabilir — kullanıcıya yeni URL bildirilir

**Test (deploy sonrası):**
- [ ] `https://selale-design-studio.com/miyukitakilaranahtarlik/` açılıyor mu?
- [ ] Sveltia panel yükleniyor mu?
- [ ] PAT ile giriş çalışıyor mu?
- [ ] CSP hatası yok mu? (Tarayıcı console'da)
- [ ] Eski `/admin/` 404 dönüyor mu? (Olması beklenir)

**Commit mesajı:** `feat(admin): /admin/ → /miyukitakilaranahtarlik/ rename + worker + _headers güncelle`

---

### 🎨 AŞAMA 2 — Özel Gün Konseptleri (İkonsuz, Numaralı Tipografi)

**Amaç:** `event-card`'ları emoji ikonsuz, numaralı tipografi tasarımına dönüştür (Mockup 1-A).

**Etkilenen dosyalar:**
- `index.html` (style + renderEvents JS fonksiyonu)
- `events/*.md` dosyalarındaki `visual_icon` field'ı **silinmeyecek** ama UI'da gösterilmeyecek
- `miyukitakilaranahtarlik/config.yml` events şemasında `visual_icon` "kullanılmaz" hint'i eklenir (opsiyonel)

**Adımlar:**
1. Yeni branch: `git checkout -b feat/events-no-icons`
2. `index.html` CSS'inde `.event-card .ev-visual` bloğunu kaldır
3. Yeni CSS ekle (mockup-preview.html'den):
   ```css
   .event-card .ev-num{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.1rem;color:rgba(255,255,255,.4);letter-spacing:1px;margin-bottom:1.2rem;}
   .event-card .ev-divider{width:40px;height:1px;background:rgba(255,255,255,.25);margin-bottom:1.2rem;}
   .event-card h3{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:500;color:#fff;line-height:1.15;letter-spacing:1px;margin-bottom:.5rem;}
   .event-card h3 em{font-style:italic;font-weight:400;display:block;font-size:1.05rem;color:rgba(255,255,255,.7);margin-top:.3rem;}
   ```
4. `renderEvents(list)` fonksiyonunda `.ev-visual` div'ini kaldır:
   ```javascript
   // Eski:
   <div class="ev-visual">${aiEscape(e.visual_icon||'')}</div>
   // Yeni:
   // (bu satır tamamen silinir, yerine sadece div ile divider eklenir)
   <div class="ev-divider"></div>
   ```
5. Başlık formatını koru ama em altta tek satır olarak göster (zaten öyle).

**Risk:**
- ⚠️ Mevcut events.json manifest'i `visual_icon` field'ı içeriyor — kaldırmaya gerek yok, sadece render etmiyoruz
- ⚠️ `setEventTab(slug)` fonksiyonu hâlâ çalışmalı — sadece görsel değişiyor

**Test:**
- [ ] 5 etkinlik kartı görünüyor mu?
- [ ] Emoji ikon kutusu kalktı mı?
- [ ] Numaralı (01-05) tipografi düzgün hizalı mı?
- [ ] Mobilde 2 sütun, küçükte 1 sütun düzgün mü?
- [ ] Çekmeceden "Düğün Konsepti" tıklanınca ilgili karta scroll oluyor mu?
- [ ] `setEventTab('nishan')` flash efekti çalışıyor mu?

**Commit mesajı:** `feat(events): emoji ikon kaldırıldı, numaralı tipografi (Mockup 1-A)`

---

### 🎨 AŞAMA 3 — 3D Baskı (İki Bölüm: Hazır Ürünler + Kişiye Özel)

**Amaç:** Tek bloklu yazıcı emojisi + chip'ler → iki ayrı bölüm (Mockup 2-C).

**Etkilenen dosyalar:**
- `index.html` (HTML + CSS + renderPrinter JS fonksiyonu)
- `data/printer.yml` (yeni alanlar eklenecek)
- `miyukitakilaranahtarlik/config.yml` printer schema'sı genişletilecek

**Adımlar:**

**Adım 3a — printer.yml + config.yml genişletme**

`data/printer.yml`'e yeni alanlar:
```yaml
ready_label: "Hazır Ürünler"
custom_label: "Kişiye Özel Tasarım Hizmeti"
custom_intro: "Aklınızdaki tasarımı bize anlatın, biz basalım. PLA, PETG ve TPU malzeme seçenekleriyle profesyonel 3D baskı hizmeti."
ready_products:
  - id: 16  # 3D Anahtarlık ürünü (products'tan referans)
  - id: 19  # 3D Dekoratif Obje
  - id: 20  # 3D Faydalı Alet
custom_categories:
  - title: "Anahtarlık"
    description: "İsim, logo veya özel tasarım"
    filter: "3d-anahtarlik"
  - title: "Araba Parçası"
    description: "Yedek klips, tutucu, kapak"
    filter: "3d-alet"
  - title: "Oyuncak & Figür"
    description: "İstediğiniz karakter veya figür"
    filter: "3d-oyuncak"
  - title: "Ev Eşyası Parçası"
    description: "Kapı takozu, telefon standı, organizer"
    filter: "3d-deko"
wa_cta_label: "WhatsApp'tan Detay Sor"
```

`miyukitakilaranahtarlik/config.yml`'de printer schema'sına bu alanlar eklenir:
- `ready_label` (string)
- `custom_label` (string)
- `custom_intro` (text)
- `ready_products` (list, relation to products by id)
- `custom_categories` (list with title/description/filter)
- `wa_cta_label` (string)

**Adım 3b — index.html HTML değişimi**

`printer-section`'ı tamamen yeniden yaz:
```html
<section class="printer-section" id="printer-section">
  <div class="section-title reveal">
    <div class="tag">✦ 3D Baskı</div>
    <h2>Hayal ettiğinizi <em>basıyoruz</em></h2>
  </div>

  <div class="printer-divider"><div class="line"></div><div class="label" id="printerReadyLabel">Hazır Ürünler</div><div class="line"></div></div>
  <div class="printer-ready" id="printerReady">
    <div class="printer-ready-grid" id="printerReadyGrid"></div>
  </div>

  <div class="printer-divider"><div class="line"></div><div class="label" id="printerCustomLabel">Kişiye Özel Tasarım Hizmeti</div><div class="line"></div></div>
  <div class="printer-custom">
    <p class="printer-custom-intro" id="printerCustomIntro"></p>
    <div class="printer-custom-grid" id="printerCustomGrid"></div>
    <div class="printer-cta-wrap">
      <a class="btn-wa-printer wa-dynamic" id="printerWaCta" href="#">...</a>
    </div>
  </div>
</section>
```

**Adım 3c — CSS ekleme**

Mockup'taki tüm `.printer-divider`, `.printer-ready-*`, `.printer-custom-*` stilleri eklenir.

**Adım 3d — renderPrinter() JS güncellemesi**

`renderPrinter(d)` fonksiyonu yeniden yazılır:
- Eski `.printer-grid`, `.printer-visual`, `.printer-icon`, `.printer-samples`, `.printer-cats` mantığı silinir
- Yeni: `printerReadyGrid` ürünleri `data/products.json`'dan id'lere göre çeker
- `printerCustomGrid` `custom_categories` listesini numaralı kart olarak render eder

**Risk:**
- ⚠️ `data/printer.yml` mevcut yapısıyla geriye uyumlu olmalı (eski alanlar yok sayılır)
- ⚠️ `products.json` ile relation kuruyoruz — eğer ürün silinirse fallback gerekir

**Test:**
- [ ] Üst bölümde "Hazır Ürünler" başlığı + 4 kart görünüyor mu?
- [ ] Kartlar foto/placeholder ile dolu mu?
- [ ] Alt bölümde "Kişiye Özel Tasarım" başlığı + 4 numaralı kart görünüyor mu?
- [ ] Numara (01-04) italik mi?
- [ ] "Fiyat Sor" butonu çalışıyor mu? (WhatsApp'a yönlendirme)
- [ ] Mobilde alt alta düzgün mü?
- [ ] CMS panelinden printer.yml düzenlemek çalışıyor mu?

**Commit mesajı:** `feat(printer): iki bölüm — hazır ürünler + kişiye özel (Mockup 2-C)`

---

### 📷 AŞAMA 4 — Foto Yükleme Süreci (Kullanıcı İşi — DOKÜMANTASYON)

**Amaç:** Şu an 20 üründe foto yok. Kullanıcının Sveltia panelinden foto yüklemesi için **yazılı rehber** + onay.

**Bu Claude Code işi DEĞİL.** Bu kullanıcının yapacağı iş. Plan.md'ye sadece **adımlar olarak** yazılıyor ki unutulmasın.

**Kullanıcı için adımlar:**
1. Yeni admin URL'e git: `https://selale-design-studio.com/miyukitakilaranahtarlik/`
2. PAT ile giriş yap
3. "6. Ürünler" koleksiyonuna gir
4. Her ürün için:
   - Ürünü aç
   - "Ürün Fotoğrafları (çoklu)" alanına bir veya daha fazla foto yükle (1200x1200 kare önerilir)
   - Kaydet
5. Aynı işlem `categories/`, `events/`, `gift-bags/`, `reviews/`, `hero` için de yapılır

**Foto kalite önerileri:**
- Ürün fotoları: 1200×1200 px, JPG/WebP, beyaz veya yumuşak gri arka plan
- Hero foto: 1920×823 px (21:9), JPG/WebP, max 2MB
- Mobil dostu: aspect-ratio 1:1 veya 4:3

**Çıktı:** Hiç commit yok. Sveltia panelinden GitHub'a otomatik commit gider.

---

### 🌐 AŞAMA 5 — SEO + Sitemap + Open Graph (DÜŞÜK ÖNCELİK)

**Amaç:** Google ve sosyal medyada görünürlük.

**Etkilenen dosyalar:**
- Yeni: `sitemap.xml`
- `index.html` (Open Graph meta tagları)
- `_worker.js` (sitemap CSP'sini gerektirmiyor, sadece routing)
- `robots.txt` (sitemap referansı)

**Adımlar:**

**Adım 5a — sitemap.xml oluştur**

Statik XML olarak:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://selale-design-studio.com/</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

(Site tek sayfa olduğu için sadece ana URL. Eğer her ürün ayrı route alırsa genişletilir — şu an gerek yok.)

**Adım 5b — Open Graph meta tagları**

`index.html` `<head>` içine:
```html
<meta property="og:title" content="Şelale Design Studio — Kişiye Özel Tasarım">
<meta property="og:description" content="El emeği Miyuki bileklik, mum, şeffaf çanta hediye setleri ve 3D baskı.">
<meta property="og:image" content="https://selale-design-studio.com/images/og-banner.jpg">
<meta property="og:url" content="https://selale-design-studio.com/">
<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta name="twitter:card" content="summary_large_image">
```

OG banner için 1200×630 px görsel oluşturulmalı — kullanıcı Sveltia'dan yükleyebilir (yeni "OG Banner" alanı eklenir settings'e).

**Adım 5c — robots.txt sitemap referansı**

```
Sitemap: https://selale-design-studio.com/sitemap.xml
User-agent: *
Allow: /
Disallow: /miyukitakilaranahtarlik/
```

**Adım 5d — JSON-LD (opsiyonel)**

Product schema mark-up `index.html` veya ayrı dosyada. Şu an erken — site büyüyünce ekle.

**Risk:** Düşük. Sadece okuma — kullanıcı deneyimini etkilemez.

**Test:**
- [ ] `https://selale-design-studio.com/sitemap.xml` erişilebilir mi?
- [ ] Facebook Debugger ile OG önizleme doğru mu? (https://developers.facebook.com/tools/debug/)
- [ ] WhatsApp paylaşım önizlemesinde foto + başlık görünüyor mu?

**Commit mesajı:** `feat(seo): sitemap.xml + open graph meta + JSON-LD altyapı`

---

## 6. CLAUDE CODE ÇALIŞMA KURALLARI

Claude Code yeni oturumda bu kuralları izler:

1. **Plan.md ve CLAUDE.md birlikte okunur** — her oturumun başında
2. **Her aşama önce kullanıcıya önerilir** — onay alınmadan push yapılmaz
3. **Her aşama ayrı branch'te yapılır** — `feat/<aşama-adı>`
4. **Test → commit → push → kullanıcı onayı** sırası
5. **`backup-before-cms-rewrite` branch'i korunur** — silinmez, değiştirilmez
6. **`_worker.js`, `_headers`, Worker URL'i** kontrolsüz değişmez (sadece Aşama 1'de planlı değişir)
7. **PAT, secret, token** asla ekrana yazılmaz, kod yorumuna konmaz
8. **Her commit Türkçe + anlamlı** mesajla atılır (örn: `feat(events): emoji ikon kaldırıldı`)
9. **`[skip ci]` ASLA kullanılmaz** — Cloudflare Pages "skip deploy" olarak okur
10. **Plan.md dışına çıkılmaz** — yeni özellik isteği gelirse önce plan.md güncellenir

---

## 7. GÜVENLİK & DOKUNULMAYACAK YERLER

### Asla dokunulmayacak:
- ❌ Cloudflare Worker (`sveltia-cms-auth.aiakliselim.workers.dev`)
- ❌ GitHub OAuth App ayarları
- ❌ Authorization Callback URL (Worker URL'i sabit)
- ❌ Cloudflare Pages deployment ayarları
- ❌ DNS / Domain
- ❌ `backup-before-cms-rewrite` branch
- ❌ PAT (Personal Access Token) — kullanıcı tarayıcısında saklı
- ❌ `data/products.json` (manuel) — workflow otomatik üretir

### Sadece planlı değişecek:
- ✅ `admin/` → `miyukitakilaranahtarlik/` (Aşama 1)
- ✅ `_worker.js` (Aşama 1: isAdmin path)
- ✅ `_headers` (Aşama 1: path bloğu)
- ✅ `index.html` (Aşama 2 + 3: UI)
- ✅ `data/printer.yml` (Aşama 3: yeni alanlar)
- ✅ `miyukitakilaranahtarlik/config.yml` (Aşama 3: printer schema)

### Repo public — hassas bilgi kontrolü
Repo public olduğu için:
- ✅ Frontend kodu zaten herkese açık — sorun değil
- ⚠️ `miyukitakilaranahtarlik/config.yml`'de `base_url` Worker URL'i var — bu OK, public bilgi
- ⚠️ Hiçbir dosyada PAT, GitHub secret, API key bulunmamalı — periodic audit yapılır

---

## 8. KARAR TABLOSU

| Konu | Karar | Aşama |
|------|-------|-------|
| Tema renkleri panelden | ❌ Yok, kodda kalır | — |
| Çekmece esnekliği | Yarı-statik (iskelet kod, içerik panel) | — |
| Çoklu WhatsApp | Sadece favoriler | Adım K'da tamam |
| Admin URL | `/miyukitakilaranahtarlik/` | Aşama 1 |
| Özel gün ikonları | Kaldırılacak, numaralı | Aşama 2 |
| 3D Baskı yapısı | İki bölüm (hazır + özel) | Aşama 3 |
| Foto stratejisi | Düz placeholder, kullanıcı yükler | Aşama 4 |
| SEO/Sitemap | Plan'da, düşük öncelik | Aşama 5 |
| Newsletter | Yok | Tamam |
| Mobil destek | Responsive, native app yok | Her aşamada test |
| Plan formatı | Tek dosya (bu plan.md) | — |

---

## 9. SIRADAKİ CLAUDE CODE OTURUMU — İLK PROMPT

Kullanıcı Claude Code'u açıp şu prompt'u verecek:

> **Prompt:**
> "Plan.md (v4) ve CLAUDE.md'yi oku. **Aşama 1 — Admin URL Değişimi** ile başlayalım.
>
> Şunu yap:
> 1. Yedek branch'i kontrol et: `backup-before-cms-rewrite` var mı?
> 2. Yeni branch aç: `feat/admin-url-rename`
> 3. `admin/` klasörünü `miyukitakilaranahtarlik/` olarak rename et (git mv)
> 4. `_worker.js`'de `isAdmin` kontrolünü güncelle (plan.md'de tam kod var)
> 5. `_headers`'taki `/admin/*` blok başlığını `/miyukitakilaranahtarlik/*` yap
> 6. `robots.txt`'i kontrol et — `/admin/` referansı varsa kaldır
> 7. Test çıktılarını bana özetle, push etme. Onayımı bekle.
>
> Sadece bu adım. Başka dosyaya dokunma."

Kullanıcı test ettikten sonra push komutunu verecek, sonra Aşama 2'ye geçilecek.

---

## 10. AŞAMA 2 İÇİN PROMPT (Aşama 1 onaylanınca)

> "Plan.md Aşama 2 — Özel Gün Konseptleri (İkonsuz). Yeni branch aç: `feat/events-no-icons`.
>
> 1. `index.html`'deki `.event-card .ev-visual` CSS bloğunu kaldır
> 2. Plan.md'deki yeni CSS bloklarını ekle (`.ev-num`, `.ev-divider`, başlık güncellemesi)
> 3. `renderEvents(list)` fonksiyonunda `<div class="ev-visual">${aiEscape(e.visual_icon||'')}</div>` satırını sil, yerine `<div class="ev-divider"></div>` ekle
> 4. Test çıktılarını özetle, push etme. Onayımı bekle.
>
> Sadece bu adım. events/*.md dosyalarına dokunma — visual_icon field'ı orada kalsın (sadece render etmiyoruz)."

---

## 11. AŞAMA 3 İÇİN PROMPT (Aşama 2 onaylanınca)

> "Plan.md Aşama 3 — 3D Baskı İki Bölüm. Yeni branch aç: `feat/printer-two-sections`.
>
> 1. `data/printer.yml`'e yeni alanlar ekle (plan.md'de YAML var)
> 2. `miyukitakilaranahtarlik/config.yml`'de printer schema'sına bu alanları ekle
> 3. `index.html`'deki `.printer-section` HTML'ini plan.md'deki yeni yapıyla değiştir
> 4. CSS bloklarını ekle (`.printer-divider`, `.printer-ready-*`, `.printer-custom-*`)
> 5. `renderPrinter(d)` fonksiyonunu plan.md'deki yeni mantığa göre yeniden yaz
> 6. Test: panelde printer.yml düzenleyip canlıda görünmesini bekle
> 7. Push etme, onayımı bekle."

---

## 12. AŞAMA 5 İÇİN PROMPT (UI işleri bittikten sonra)

> "Plan.md Aşama 5 — SEO + Sitemap + OG. Yeni branch: `feat/seo-sitemap-og`.
>
> 1. `sitemap.xml` oluştur (plan.md'de şablon var)
> 2. `index.html` `<head>` içine Open Graph meta tagları ekle
> 3. `robots.txt`'e Sitemap satırı + `/miyukitakilaranahtarlik/` Disallow ekle
> 4. `settings.yml`'e OG banner foto alanı ekle (admin/config.yml schema güncelle)
> 5. Test: Facebook Debugger ve WhatsApp paylaşım önizlemesi
> 6. Push etme, onayımı bekle."

---

## 13. NOTLAR

- Aşama 4 (Foto Yükleme) **kullanıcı işi**. Claude Code prompt'una gerek yok.
- Her aşama sonrası **canlı siteyi gez** — şüpheli bir şey görürsen "geri al" demekten çekinme.
- Plan.md herhangi bir aşamada güncellenebilir — örn. Aşama 2 yaparken "şu da olsun" dersen plan.md ek aşama ile genişletilir.
- Bu plan **kullanıcının onayıyla** yazıldı (2026-05-13). Sonraki aşamalarda yeni kararlar ortaya çıkarsa plan v5 yazılır.

---

**Hazır.** Aşama 1'den başla. 🌸