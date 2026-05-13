# PLAN.md — ŞELALE DESIGN STUDIO — MASTER PLAN (v5)

> **Bu dosya Claude Code'un yol haritasıdır.**
> Yeni oturumda **`CLAUDE.md` ile birlikte** bu dosya da okunur.
> `CLAUDE.md` teknik mimariyi anlatır; bu dosya **sıradaki işleri** ve
> **alınan tasarım kararlarını** anlatır.
>
> **Son güncelleme:** 2026-05-13.
> **v5 farkı:** Aşama 1, 2, 3 tamamlandı ve üretimde canlı. v4'teki tasarım
> kararları (Mockup 1-A, 2-C, admin URL değişimi) UI'a yansıdı. Geriye
> sadece **Aşama 4** (foto yükleme — kullanıcı işi) ve **Aşama 5**
> (SEO + sitemap + OG — düşük öncelik) kaldı.
> Yeni karar yok; v5 sadece durum + sıralama güncellemesi.

---

## 0. İÇİNDEKİLER

1. Tamamlanmış İşler (Geçmiş Özet)
2. Mevcut Durum
3. Proje Bilgileri
4. Tasarım Kararları (Kesin — Değişmedi)
5. Yapılacak Aşamalar (Kalan)
   - Aşama 4 — Foto Yükleme Süreci (Kullanıcı işi)
   - Aşama 5 — SEO + Sitemap + OG (Düşük öncelik)
6. Claude Code Çalışma Kuralları
7. Güvenlik & Dokunulmayacak Yerler
8. Karar Tablosu
9. Sıradaki Claude Code Oturumu — İlk Prompt
10. Notlar

---

## 1. TAMAMLANMIŞ İŞLER (GEÇMİŞ — ÖZET)

Bu aşamalar **bitti, canlıda çalışıyor.** Tekrar yapma:

### Tasarım yenileme ve altyapı (v4 öncesi)

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

### Plan v4 aşamaları (Mayıs 2026)

| Aşama | İçerik | Commit |
|-------|--------|--------|
| **Aşama 1** | Admin URL `/admin/` → `/miyukitakilaranahtarlik/` (klasör rename + `_worker.js` + `_headers` + CLAUDE.md güncelle) | `4e2d90e` |
| **Aşama 2** | Özel gün konseptleri — emoji ikon kaldır, numaralı tipografi (Mockup 1-A) | `a6bd23a` |
| **Aşama 3** | 3D Baskı iki bölüm — Hazır Ürünler + Kişiye Özel Tasarım (Mockup 2-C) | `41af915` |

---

## 2. MEVCUT DURUM

- **Site canlı:** https://selale-design-studio.com
- **Admin paneli:** https://selale-design-studio.com/miyukitakilaranahtarlik/
- **Repo:** `aiakliselim-AI/selale-design-studio` (**public**)
- **CMS:** Sveltia (`/miyukitakilaranahtarlik/`), PAT ile giriş çalışıyor
- **Deploy:** Cloudflare Pages, otomatik push-deploy
- **Worker:** `sveltia-cms-auth.aiakliselim.workers.dev` (OAuth proxy, dokunulmuyor)
- **Yedek branch:** `backup-before-cms-rewrite` (lokal + origin'de, Aşama 1 öncesi snapshot)

**Çalışan altyapı:**
- 7 CMS collection dosya-bazlı (products, categories, events, reviews, gift-bags, gift-bag-items + workflow'lar)
- 7 CMS singleton (settings, drawer, hero, about, printer, footer, ai)
- 1 master worker (CSP path-bazlı, `/miyukitakilaranahtarlik/*` admin path)

**Plan v4 UI değişiklikleri canlıda:**
- Etkinlik kartları emoji-suz, numaralı (01-05) tipografi
- 3D Baskı iki bölümlü (Hazır Ürünler 4 kart + Kişiye Özel 4 numaralı kart + tek WA CTA)
- Admin paneli yeni URL'de, eski `/admin/` 404 dönüyor

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

## 4. TASARIM KARARLARI (KESİN — DEĞİŞMEDİ)

v4'te netleşen ve uygulanan kararlar. v5'te ek karar yok.

### 4.1 — Özel Gün Konseptleri (Mockup 1, Seçenek A) ✅ Uygulandı
Emoji ikon kutusu kaldırıldı, numaralı (01-05) Cormorant Garamond italik tipografi, 40px ince çizgi divider, italik küçük emphasis.

### 4.2 — 3D Baskı (Mockup 2, Seçenek C) ✅ Uygulandı
İki ayrı bölüm: üst HAZIR ÜRÜNLER (products.json ID referansı ile 4 kart), alt KİŞİYE ÖZEL TASARIM HİZMETİ (numaralı 01-04 kart), tek WhatsApp CTA.

### 4.3 — Çekmece (Yarı-statik)
Çekmecenin **iskelet kodda sabit** kalır; içerik panelden (kategori CMS) gelir. Aksiyon türü seçimi YOK.

### 4.4 — Çoklu WhatsApp
Sadece **Favoriler sayfasında** kalır (Adım K'da uygulandı).

### 4.5 — Tema Renkleri
❌ Panelden değiştirilebilir tema rengi **YOK**. Renkler kodda kalır.

### 4.6 — Foto Stratejisi
Foto yokken **düz placeholder SVG** (mevcut). Emoji ikon YOK. Foto yükleme **kullanıcının işi** (Sveltia panelinden) — **Aşama 4**.

### 4.7 — Admin URL ✅ Uygulandı
`/admin/` → `/miyukitakilaranahtarlik/`

### 4.8 — Mobil
Responsive web. Etkinlik kartları 5 → 3 → 2 → 1 sütun, 3D Baskı grid 4 → 2 → 1 sütun.

### 4.9 — Newsletter
Kaldırıldı. WhatsApp grubu açılırsa drawer/footer'a link eklenebilir.

---

## 5. YAPILACAK AŞAMALAR (KALAN)

> v5'te sadece iki aşama kaldı.
> **Aşama 4** Claude Code işi değil — kullanıcı Sveltia panelinden foto yükleyecek.
> **Aşama 5** düşük öncelik — istenildiğinde başlatılır.

---

### 📷 AŞAMA 4 — Foto Yükleme Süreci (Kullanıcı İşi — DOKÜMANTASYON)

**Amaç:** Şu an çoğu üründe foto yok. Kullanıcının Sveltia panelinden foto yüklemesi için **yazılı rehber**.

**Bu Claude Code işi DEĞİL.** Kullanıcının yapacağı iş.

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

**Öncelikli ürünler (3D bölümünde görünenler):**
- ID 16: Özel 3D Anahtarlık
- ID 17: 3D Figür & Oyuncak
- ID 19: 3D Dekoratif Obje
- ID 20: 3D Faydalı Alet

**Çıktı:** Hiç commit yok. Sveltia panelinden GitHub'a otomatik commit gider.

---

### 🌐 AŞAMA 5 — SEO + Sitemap + Open Graph (DÜŞÜK ÖNCELİK)

**Amaç:** Google ve sosyal medyada görünürlük.

**Etkilenen dosyalar:**
- Yeni: `sitemap.xml`
- `index.html` (Open Graph meta tagları)
- `_worker.js` (sitemap CSP'sini gerektirmiyor)
- `robots.txt` (sitemap referansı + admin Disallow)

**Adımlar:**

**Adım 5a — sitemap.xml oluştur**

Statik XML:
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

Site tek sayfa olduğu için sadece ana URL. Ürünler ayrı route alırsa genişletilir — şu an gerek yok.

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

OG banner için 1200×630 px görsel oluşturulmalı — kullanıcı Sveltia'dan yükleyebilir (yeni "OG Banner" alanı eklenir `settings.yml`'e).

**Adım 5c — robots.txt sitemap referansı**

Mevcut `robots.txt`'e ekle:
```
Sitemap: https://selale-design-studio.com/sitemap.xml
```

Ayrıca, admin paneline noindex direktifi için `Disallow: /miyukitakilaranahtarlik/` satırı eklenebilir (zaten `<meta name="robots" content="noindex">` admin sayfasında var, ama tutarlılık için).

**Adım 5d — JSON-LD (opsiyonel)**

Product schema mark-up `index.html` veya ayrı dosyada. Şu an erken — site büyüyünce ekle.

**Risk:** Düşük. Sadece okuma için ekleme; kullanıcı deneyimini etkilemez.

**Test (deploy sonrası):**
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
4. **Test → commit → push → kullanıcı onayı → main'e merge** sırası
5. **Merge edilen branch silinir** (lokal + origin)
6. **`backup-before-cms-rewrite` branch'i korunur** — silinmez, değiştirilmez
7. **`_worker.js`, `_headers`, Worker URL'i** kontrolsüz değişmez
8. **PAT, secret, token** asla ekrana yazılmaz, kod yorumuna konmaz
9. **Her commit Türkçe + anlamlı** mesajla atılır
10. **`[skip ci]` ASLA kullanılmaz** — Cloudflare Pages "skip deploy" olarak okur
11. **Plan.md dışına çıkılmaz** — yeni özellik isteği gelirse önce plan.md güncellenir

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

### Sadece planlı değişecek (Aşama 5'te):
- ✅ `index.html` (OG meta tagları)
- ✅ Yeni: `sitemap.xml`
- ✅ `robots.txt` (sitemap + admin Disallow)
- ✅ Yeni: `images/og-banner.jpg` (kullanıcı yüklemesi)
- ✅ `miyukitakilaranahtarlik/config.yml` settings şeması (opsiyonel — OG banner alanı)

### Repo public — hassas bilgi kontrolü
Repo public olduğu için:
- ✅ Frontend kodu zaten herkese açık — sorun değil
- ⚠️ `miyukitakilaranahtarlik/config.yml`'de `base_url` Worker URL'i var — bu OK, public bilgi
- ⚠️ Hiçbir dosyada PAT, GitHub secret, API key bulunmamalı — periodic audit yapılır

---

## 8. KARAR TABLOSU

| Konu | Karar | Durum |
|------|-------|-------|
| Tema renkleri panelden | ❌ Yok, kodda kalır | Karar kesin |
| Çekmece esnekliği | Yarı-statik (iskelet kod, içerik panel) | Mevcut |
| Çoklu WhatsApp | Sadece favoriler | Adım K'da tamam |
| Admin URL | `/miyukitakilaranahtarlik/` | ✅ Aşama 1 — Canlı |
| Özel gün ikonları | Kaldırıldı, numaralı | ✅ Aşama 2 — Canlı |
| 3D Baskı yapısı | İki bölüm (hazır + özel) | ✅ Aşama 3 — Canlı |
| Foto stratejisi | Düz placeholder, kullanıcı yükler | Aşama 4 (kullanıcı işi) |
| SEO/Sitemap | Plan'da, düşük öncelik | Aşama 5 (sırada) |
| Newsletter | Yok | Tamam |
| Mobil destek | Responsive, native app yok | Her aşamada test |
| Plan formatı | Tek dosya (bu plan.md) | — |

---

## 9. SIRADAKİ CLAUDE CODE OTURUMU — İLK PROMPT

Aşama 4 kullanıcı işidir; Claude'a iş düşmüyor. Sıradaki Claude oturumunda **Aşama 5** çalışılır.

Kullanıcı Claude Code'u açıp şu prompt'u verecek:

> **Prompt:**
> "Plan.md (v5) ve CLAUDE.md'yi oku. **Aşama 5 — SEO + Sitemap + OG** ile başlayalım.
>
> Şunu yap:
> 1. Yeni branch aç: `feat/seo-sitemap-og`
> 2. `sitemap.xml` oluştur (plan.md'de şablon var — tek URL: ana sayfa)
> 3. `index.html` `<head>` içine Open Graph + Twitter Card meta tagları ekle
> 4. `robots.txt`'e `Sitemap:` satırı + opsiyonel `Disallow: /miyukitakilaranahtarlik/` ekle
> 5. `miyukitakilaranahtarlik/config.yml` settings şemasına opsiyonel "OG Banner" foto alanı ekle (kullanıcı sonra yükler)
> 6. JSON-LD product schema ekleme — şu an atla, sonra gelecek
> 7. Test özetini bana ver, push etme. Onayımı bekle.
>
> Sadece bu adım. Başka dosyaya dokunma."

Kullanıcı test ettikten sonra commit + push komutunu verecek, sonra main'e merge.

---

## 10. NOTLAR

- **Aşama 4 (Foto Yükleme):** Tamamen kullanıcının işi. Claude Code prompt'una gerek yok. Sveltia panelinden yapılır.
- **Aşama 5 sonrası:** Plan v6 yazılır (ya da plan kapatılır eğer yeni özellik isteği yoksa).
- Her aşama sonrası **canlı siteyi gez** — şüpheli bir şey görürsen "geri al" demekten çekinme.
- Plan.md herhangi bir aşamada güncellenebilir — örn. Aşama 5'i yaparken "şu da olsun" dersen plan ek aşama ile genişletilir.
- Bu plan v5 olarak **kullanıcının onayıyla** yazıldı (2026-05-13, Aşama 1-3 tamamlandıktan sonra). Sonraki kararlar için plan v6 yazılır.

---

**Hazır.** Aşama 4 (foto) — kullanıcı işi. Aşama 5 (SEO) — istenildiğinde başlatılır. 🌸
