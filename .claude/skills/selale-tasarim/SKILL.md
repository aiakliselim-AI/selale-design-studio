---
name: selale-tasarim
description: Şelale Design Studio sitesinin görsel tasarım sistemi — renk paleti, tipografi, bileşen stilleri ve animasyon konvansiyonları. CSS düzenlerken, yeni bileşen eklerken veya görsel tutarlılık gerektiren işlerde kullan.
---

# Şelale — Tasarım Sistemi

Tüm CSS `index.html` içindeki tek bir `<style>` bloğunda yaşar. Yeni stiller eklerken aynı dosyaya, ilgili bölüm yorumunun (`/* ═══ ... ═══ */`) altına ekle.

## Renk paleti (CSS değişkenleri, `:root`)

| Değişken | Hex | Kullanım |
|---|---|---|
| `--cream` | `#faf6f0` | Sayfa arka planı |
| `--warm` | `#f5ede0` | İkincil arka planlar, drawer, butonlar |
| `--caramel` | `#c8956c` | Ana vurgu rengi (CTA, link hover, fiyat) |
| `--dark` | `#2c2118` | Birincil metin |
| `--muted` | `#8a7060` | İkincil metin |
| `--blush` | `#e8c4a8` | Yumuşak vurgu, hover state |
| `--sage` | `#a8b89a` | Doğal yeşil aksanı |
| `--rose` | `#d4857a` | Bildirim / favori rozetleri |
| `--wa` | `#25d366` | WhatsApp butonu (DEĞİŞTİRME — marka rengi) |
| `--gold`, `--lavender`, `--mint` | — | İkincil aksan tonları |

Yeni renk eklerken `--gold` ile `--mint` arasındaki konvansiyonu izle (kısa anlamlı isim, hex). Hardcoded hex yerine değişken kullan.

## Tipografi

- **Başlıklar:** `'Playfair Display', serif` — `h1`, `h2`, `h3`, logo, kart başlıkları. Sıklıkla `<em>` içinde italik ve `--caramel` rengiyle.
- **Gövde:** `'Jost', sans-serif` — paragraf, buton, form. Ağırlıklar: 300, 400, 500.
- Google Fonts üzerinden tek `<link>` ile yüklenir; CSP `font-src` zaten izinli.

## Bileşen konvansiyonları

- **Buton köşe yuvarlaklığı:** Pill butonlar `border-radius: 50px`. Kart benzeri butonlar `12px`–`14px`.
- **Kart köşe yuvarlaklığı:** Ürün kartları `22px`, favori kartları `20px`, mini kartlar `18px`.
- **Gölge:** Hover'da `0 20px 50px rgba(44,33,24,.12)` veya benzer warm-tone gölge. Soğuk siyah gölge kullanma.
- **Geçiş süresi:** `.2s`–`.35s` arası. Hover dönüşümleri `.25s` standart.
- **`backdrop-filter: blur(...)`** — Nav, drawer, modal başlıklarında kullanılır. Saydam katmanlar için bu konvansiyonu sürdür.

## Animasyon konvansiyonları

- `fadeUp` — Hero girişlerinde gecikme zincirli kullanılır (`.15s`, `.3s`, `.45s`).
- `float` — Hero canvas için 6sn döngü.
- `spin` — Hero rozeti için 20sn döngü.
- `marquee` — Üst banner için 20sn döngü.
- `reveal` class'ı — Scroll ile beliren bölümler (kategoriler, ürünler).

## Layout düzeni

- Mobil-öncelikli; geniş ekranlar için `grid-template-columns: 1fr 1fr` (hero) ve `repeat(auto-fill, minmax(...))` (kart grid'leri).
- Yatay padding standardı: `5%`.
- Bölüm dikey boşluğu: `padding: 5rem 5%`.

## Kurallar

- Yeni renk hex'i ekleme — önce `--cream`/`--warm`/... değişkenlerinden uygun olanı kullan; yoksa `:root`'a yeni değişken ekle.
- Inline `style="..."` kullanma — class oluştur ve `<style>` bloğuna ekle.
- WhatsApp yeşili `--wa` haricinde marka renklerine sadık kal — bu palet özenle seçilmiş.
