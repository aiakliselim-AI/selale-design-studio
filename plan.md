# PLAN.md — ŞELALE DESIGN STUDIO — MASTER PLAN (v6)

> **Bu dosya Claude Code'un yol haritasıdır.**
> Yeni oturumda **`CLAUDE.md` ile birlikte** bu dosya da okunur.
> `CLAUDE.md` teknik mimariyi anlatır; bu dosya **sıradaki işleri** ve
> **alınan tasarım kararlarını** anlatır.
>
> **Son güncelleme:** 2026-05-13.
> **v6 farkı:** v5'te planlanan tüm Claude Code aşamaları (1, 2, 3, 5)
> tamamlandı ve üretimde canlı. Geriye sadece **Aşama 4** (kullanıcı işi:
> foto yükleme) kaldı. Yeni özellik veya iyileştirme istendiğinde
> bu plan **v7** olarak güncellenir.

---

## 0. İÇİNDEKİLER

1. Tamamlanmış İşler (Geçmiş Özet)
2. Mevcut Durum
3. Proje Bilgileri
4. Tasarım Kararları (Kesin — Değişmedi)
5. Kalan İş — Aşama 4 (Kullanıcı: Foto Yükleme)
6. Olası Sıradaki İşler (Henüz Planlanmadı)
7. Claude Code Çalışma Kuralları
8. Güvenlik & Dokunulmayacak Yerler
9. Karar Tablosu
10. Notlar

---

## 1. TAMAMLANMIŞ İŞLER (GEÇMİŞ — ÖZET)

Bu aşamalar **bitti, canlıda çalışıyor.** Tekrar yapma:

### Tasarım yenileme ve altyapı (Plan v4 öncesi)

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
| Adım N | Çekmece 2-kademe + çanta seti rename | `8dfffda` |
| Adım O | Görsel çanta builder (Yol B — resim tabanlı, bags collection + products.giftBagEligible migration) | `f71c98f`, `e7a184f`, `e0d1c76`, `6d5fa3c` |

### Plan v4-v5 aşamaları (Mayıs 2026)

| Aşama | İçerik | Commit |
|-------|--------|--------|
| **Aşama 1** | Admin URL `/admin/` → `/miyukitakilaranahtarlik/` (klasör rename + `_worker.js` + `_headers` + CLAUDE.md güncelle) | `4e2d90e` |
| **Aşama 2** | Özel gün konseptleri — emoji ikon kaldır, numaralı tipografi (Mockup 1-A) | `a6bd23a` |
| **Aşama 3** | 3D Baskı iki bölüm — Hazır Ürünler + Kişiye Özel Tasarım (Mockup 2-C) | `41af915` |
| **Aşama 5** | SEO + sitemap.xml + Open Graph + Twitter Card + robots.txt + OG banner şeması | `f4d0f44` |

---

## 2. MEVCUT DURUM

- **Site canlı:** https://selale-design-studio.com
- **Admin paneli:** https://selale-design-studio.com/miyukitakilaranahtarlik/
- **Sitemap:** https://selale-design-studio.com/sitemap.xml
- **Repo:** `aiakliselim-AI/selale-design-studio` (**public**)
- **CMS:** Sveltia (`/miyukitakilaranahtarlik/`), PAT ile giriş çalışıyor
- **Deploy:** Cloudflare Pages, otomatik push-deploy
- **Worker:** `sveltia-cms-auth.aiakliselim.workers.dev` (OAuth proxy, dokunulmuyor)
- **Yedek branch:** `backup-before-cms-rewrite` (lokal + origin'de, Aşama 1 öncesi snapshot)

**Çalışan altyapı:**
- 7 CMS collection dosya-bazlı (products, categories, events, reviews, gift-bags, gift-bag-items + workflow'lar)
- 7 CMS singleton (settings, drawer, hero, about, printer, footer, ai)
- 1 master worker (CSP path-bazlı, `/miyukitakilaranahtarlik/*` admin path)
- Sitemap + Open Graph + Twitter Card meta'lar
- Settings şemasında `og_banner` alanı (kullanıcı yüklemesi bekliyor)

**Plan v4-v5 UI/SEO değişiklikleri canlıda:**
- Admin paneli `/miyukitakilaranahtarlik/`'de, eski `/admin/` 404 dönüyor
- Etkinlik kartları emoji-suz, numaralı (01-05) tipografi
- 3D Baskı iki bölümlü (Hazır Ürünler 4 kart + Kişiye Özel 4 numaralı kart + tek WA CTA)
- sitemap.xml ve OG/Twitter meta'lar canlı (og:image dosyası kullanıcı yüklemesi bekliyor)
- robots.txt'te admin paneli Disallow + Sitemap referansı

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

v4'te netleşen ve uygulanan kararlar. v5'te ek karar olmadı; v6'da da yok.

| # | Karar | Durum |
|---|-------|-------|
| 4.1 | Özel Gün — emoji-suz, numaralı (Mockup 1-A) | ✅ Aşama 2 |
| 4.2 | 3D Baskı — iki bölüm (Mockup 2-C) | ✅ Aşama 3 |
| 4.3 | Çekmece — yarı-statik (iskelet kodda, içerik panelden) | Mevcut |
| 4.4 | Çoklu WhatsApp — sadece favoriler | ✅ Adım K |
| 4.5 | Panelden tema rengi YOK | Karar kesin |
| 4.6 | Foto stratejisi — düz placeholder, kullanıcı yükler | Aşama 4 |
| 4.7 | Admin URL `/miyukitakilaranahtarlik/` | ✅ Aşama 1 |
| 4.8 | Mobil responsive (5→3→2→1 grid) | Her bölümde |
| 4.9 | Newsletter — yok | Karar kesin |

---

## 5. KALAN İŞ — AŞAMA 4 (KULLANICI: FOTO YÜKLEME)

**Bu Claude Code işi DEĞİL.** Kullanıcının Sveltia panelinden yapacağı iş.

### Kullanıcı için adımlar
1. Admin URL'e git: `https://selale-design-studio.com/miyukitakilaranahtarlik/`
2. PAT ile giriş yap
3. İlgili koleksiyona gir, ürünü/etkinliği aç, foto alanına yükle, kaydet
4. Sveltia otomatik commit atar → GitHub Actions manifest'i günceller → Cloudflare deploy eder

### Öncelikli yükleme listesi

**Settings (Genel Ayarlar) — 1 foto, en yüksek öncelik:**
- `og_banner` → 1200×630 px, dosya adı **`og-banner.jpg`** (sabit, index.html bu adı bekliyor)
- Etki: WhatsApp/Facebook/Twitter paylaşımlarında görsel önizleme

**Ürünler (özellikle 3D bölümünde görünenler):**
- ID 16 — Özel 3D Anahtarlık
- ID 17 — 3D Figür & Oyuncak
- ID 19 — 3D Dekoratif Obje
- ID 20 — 3D Faydalı Alet

**Diğer alanlar (zaman buldukça):**
- `products/*.md` — tüm ürünler
- `categories/*.md` — kategori kartları
- `events/*.md` — özel gün konseptleri
- `gift-bags/*.md`, `gift-bag-items/*.md` — şeffaf çanta sistemi
- `reviews/*.md` — müşteri yorumları
- `data/hero.yml` — açılış bölümü görselleri

### Foto kalite önerileri
- Ürün: 1200×1200 px (kare), JPG/WebP, beyaz veya yumuşak gri arka plan
- Hero: 1920×823 px (21:9), JPG/WebP, max 2MB
- OG Banner: 1200×630 px (1.91:1), JPG, max 1MB
- Mobil dostu aspect ratio: 1:1 veya 4:3

**Çıktı:** Hiç manuel commit yok. Sveltia panelinden GitHub'a otomatik gider.

---

## 6. OLASI SIRADAKİ İŞLER (HENÜZ PLANLANMADI)

Bunlar **karar verilmedi** — sadece olası yönler. Kullanıcı bir tanesini seçerse plan v7 yazılır:

- **JSON-LD Product Schema:** Google rich result için ürün şemaları (`Product`, `Offer`, `AggregateRating`). Site büyüyünce.
- **Sayfa içi ürün sayfaları:** Şu an tek sayfa. Her ürün için `/urun/<slug>` route + sitemap genişlemesi.
- **WhatsApp grup link entegrasyonu:** Newsletter yerine WA grup linki (drawer/footer'da).
- **Çok dilli (TR + EN):** Sveltia i18n + dil seçici.
- **Analytics:** GA4 veya Plausible (CSP güncellemesi gerekir).
- **Ürün stoku / "tükendi" rozeti:** Schema'ya `stock` alanı + UI durumu.
- **Filtre genişletme:** Fiyat aralığı, renk kombinasyonu, ürün boyutu.
- **Performans:** Image lazy-load, font subsetting, CSS critical-path.
- **Test altyapısı:** Playwright veya Cypress smoke test'leri.

Kullanıcı bunlardan birini seçtiğinde Claude Code'a verilecek prompt için plan v7 yazılır.

---

## 7. CLAUDE CODE ÇALIŞMA KURALLARI

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

## 8. GÜVENLİK & DOKUNULMAYACAK YERLER

### Asla dokunulmayacak:
- ❌ Cloudflare Worker (`sveltia-cms-auth.aiakliselim.workers.dev`)
- ❌ GitHub OAuth App ayarları
- ❌ Authorization Callback URL (Worker URL'i sabit)
- ❌ Cloudflare Pages deployment ayarları
- ❌ DNS / Domain
- ❌ `backup-before-cms-rewrite` branch
- ❌ PAT (Personal Access Token) — kullanıcı tarayıcısında saklı
- ❌ `data/products.json` (manuel) — workflow otomatik üretir

### Repo public — hassas bilgi kontrolü
Repo public olduğu için:
- ✅ Frontend kodu zaten herkese açık — sorun değil
- ⚠️ `miyukitakilaranahtarlik/config.yml`'de `base_url` Worker URL'i var — bu OK, public bilgi
- ⚠️ Hiçbir dosyada PAT, GitHub secret, API key bulunmamalı — periodic audit yapılır

---

## 9. KARAR TABLOSU

| Konu | Karar | Durum |
|------|-------|-------|
| Tema renkleri panelden | ❌ Yok, kodda kalır | Karar kesin |
| Çekmece esnekliği | Yarı-statik | Mevcut |
| Çoklu WhatsApp | Sadece favoriler | ✅ Canlı |
| Admin URL | `/miyukitakilaranahtarlik/` | ✅ Canlı |
| Özel gün ikonları | Kaldırıldı, numaralı | ✅ Canlı |
| 3D Baskı yapısı | İki bölüm (hazır + özel) | ✅ Canlı |
| Foto stratejisi | Düz placeholder, kullanıcı yükler | Aşama 4 (kullanıcı) |
| SEO/Sitemap | sitemap.xml + OG + Twitter | ✅ Canlı |
| OG görseli | Sveltia'dan kullanıcı yükler | Aşama 4 (kullanıcı) |
| JSON-LD product schema | Şimdilik atlandı | v7 ile gündeme gelebilir |
| Newsletter | Yok | Karar kesin |
| Mobil destek | Responsive | Her bölümde test |
| Plan formatı | Tek dosya (bu plan.md) | — |

---

## 10. NOTLAR

- **Aşama 4 (Foto Yükleme):** Tamamen kullanıcının işi. Sveltia panelinden yapılır.
- **JSON-LD ve ürün route'ları:** Site büyüyünce gündem. Şu an gerek yok.
- **Plan v7 ne zaman yazılır?** Kullanıcı yeni özellik veya iyileştirme istediğinde
  (Bölüm 6'daki listeden veya yeni bir fikirden). Plan v7 başında v6'nın
  "Tamamlanmış İşler"ine bu konu eklenir, "Yapılacak"a yeni aşamalar yazılır.
- Her aşama sonrası **canlı siteyi gez** — şüpheli bir şey görürsen "geri al" demekten çekinme.
- Bu plan v6 olarak **kullanıcının onayıyla** yazıldı (2026-05-13, tüm Claude Code aşamaları tamamlandıktan sonra).

---

**Durum:** Plan kapsamındaki tüm Claude Code aşamaları tamamlandı.
Kalan iş: kullanıcının Sveltia'dan foto yüklemesi. Yeni iş gelirse plan v7. 🌸
