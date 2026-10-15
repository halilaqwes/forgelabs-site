# ForgeLabs fitness SEO planı

Plan tarihi: 16 Ekim 2026. Uygulama kapsamı: mevcut GitHub/Vercel sitesi; alan adı, hesap ve DNS değişmez.

## Konumlandırma ve denetim

ForgeLabs bir ürün stüdyosu; spor salonu veya sağlık kliniği değil. Fitness bağlantısı gerçek, yayındaki Android ürünü Stat Boost üzerinden kurulacak. Geniş “spor” sorgusunda garanti yerine, antrenmanını kaydeden Türkçe konuşan kullanıcıların belirli sorunlarına cevap verilecek.

Başlangıç: altı gerçek sayfa, prerender edilmiş HTML, canonical, robots.txt, sitemap ve 404 zaten var. Eksikler: fitness konu merkezi yok, ürün başlığı arama niyetini açık anlatmıyor, sayfalara özel yapılandırılmış veri yok, rehber/araç bağlantı ağı yok. Font CSS @import zinciri gereksiz gecikme yaratıyor. Search Console erişimi olmadığı için mevcut tıklama, gösterim, indeks kapsamı, sorgu hacmi ve gerçek kullanıcı Core Web Vitals verileri bilinmiyor. Arama sonucunda görünmeme, tek başına indekslenmeme kanıtı sayılmayacak.

## Arama niyeti → tek bir ana sayfa

| Niyet / örnek sorgu | Ana URL | Kullanıcıya somut fayda |
| --- | --- | --- |
| ForgeLabs, Forge Labs Stat Boost | / | Marka ve gerçek ürün ilişkisi |
| antrenman takip uygulaması, fitness takip uygulaması Android | /urunler/stat-boost/ | Gerçek ekranlar, özellikler, mağaza bağlantısı |
| fitness antrenman takibi rehberi | /fitness/ | Başlangıç yolu, kaynaklı rehberler, araç |
| antrenman günlüğü nasıl tutulur, set tekrar kaydı | /fitness/antrenman-gunlugu/ | Doldurulmuş kayıt örneği, indirilebilir CSV şablonu |
| progressive overload nedir, gelişim nasıl takip edilir | /fitness/progressive-overload/ | Aynı egzersiz için örnek karşılaştırma ve sınırlar |
| antrenman hacmi nedir, tonaj nasıl hesaplanır | /fitness/antrenman-hacmi/ | Değişken setleri toplama, yaygın hesap hataları |
| antrenman hacmi hesaplama, set tekrar kilo hesaplayıcı | /fitness/hacim-hesaplayici/ | İki kaydı set bazında karşılaştıran tarayıcı aracı |

Bunlar doğrulanmış arama hacimleri değil, araştırılmış sorgu/niyet hipotezleridir. Aynı kelime için birbirinin kopyası sayfalar açılmayacak. “En iyi”, “garantili kas gelişimi” ve sahte değerlendirme kullanılmayacak.

## Uygulama sırası ve kabul koşulları

1. İçerik: üç farklı sorunu çözen rehber, özgün kayıt örnekleri, kaynaklar, yayın tarihi, dürüst yayıncı bilgisi. Kişisel antrenman/sağlık reçetesi verilmez. Sağlık alanındaki iddialar uzman incelemesi olmadan genişletilmez.
2. Araç: değişken ağırlık ve tekrar için her setin yükünü topla; boş, negatif ve sınır dışı girdilerde sonuç verme. Yüzde değişimi yalnız önceki hacim pozitifse hesapla. CSV şablonu kişisel veri toplamadan indirilebilir.
3. Bağlantı ağı: ana sayfa → merkez → rehber/araç → Stat Boost; ilgili rehberler birbirine; görünür breadcrumb. Ana menüye tüm yazıları değil yalnız merkezi ekle.
4. Teknik: benzersiz title/description/H1; self canonical; ilk HTML'de tam içerik; Organization/WebSite/WebPage/Article/BreadcrumbList grafı. Uygulama semantik SoftwareApplication olarak anlatılır; güncel fiyat/değerlendirme olmadan Google uygulama rich result uygunluğu iddia edilmez.
5. Performans: font @import kaldırılıp head üzerinden erken keşif; yeni izleme, reklam veya animasyon bağımlılığı eklenmez. Mevcut reduced-motion/animasyon durdurma davranışı korunur.
6. Test: her route için prerender, tek H1, canonical, description, geçerli JSON-LD, doğru breadcrumb ve sitemap; kırık iç bağlantı/görsel testi; matematik sınır testleri; mobil görünüm ve gerçek etkileşim kontrolü. Yayın sonrası HTTP ve HTML kontrolü. Rich Results Test/Google indekslemesi ayrı dış doğrulamadır, yerel test bunların yerine geçmez.

## Yayın sonrası ölçüm ve iş listesi

- Site sahibi Search Console'da alan adı mülkünü doğrulayıp https://www.forgelabs.site/sitemap.xml adresini göndermeli. Gerekirse DNS TXT değeri ancak Google'ın verdiği gerçek değerle eklenir; uydurma doğrulama kodu eklenmez.
- Başlangıç gününde son 28 gün sorgu/sayfa/ülke/cihaz dışa aktarımı alınır. Marka sorguları (ForgeLabs, Forge Labs, Stat Boost) ile marka dışı takip sorguları ayrılır. Mevcut sayfa performansı yeni içerikten ayrı değerlendirilir.
- İlk 7 gün: canlı URL incelemesi, seçilen canonical, sitemap keşfi, tarama/404 hataları. Dizin isteği indeks garantisi değildir.
- 28 ve 56 gün: marka dışı gösterim, tıklama, CTR, sorgu → sayfa eşleşmesi; yeterli veri varsa mobil LCP ≤2.5 s, INP <200 ms, CLS <0.1, 75. yüzdelik hedefleri. Bunlar ölçülmüş sonuç değil hedeflerdir.
- 90 gün: gösterim alıp düşük CTR alan gerçek sorgular için başlık testi; rehberlerde eksik kalan kullanıcı sorularını tamamla. Trafik oluşmadan sayfa sayısını yapay şekilde artırma.
- Dönüşüm: mağazaya giden ziyaretin ölçümü için ayrı onaylı, gizlilik politikasına uygun analiz kurulumu gerekir. Bu sürüm izleme eklemez; tıklama/dönüşüm artışı ölçüldü denmez.
- Güven: ileride gerçek bir antrenörün adı ve onayıyla uzman incelemesi; gerçek kullanıcı izniyle özgün deneyimler. Satın alınmış bağlantı ve otomatik backlink paketleri yok.

## Temel kaynaklar

- Google insan odaklı içerik: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google uygulama işaretleme koşulları: https://developers.google.com/search/docs/appearance/structured-data/software-app
- Google Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- Ürün bilgisi: https://play.google.com/store/apps/details?id=stat.boost
- Hacim ölçümü, Hornsby ve ark. (2018): https://pubmed.ncbi.nlm.nih.gov/30400302/
- İlerleyen hacim üzerine araştırma (2024): https://pubmed.ncbi.nlm.nih.gov/39178897/

Sıralamalar, Google'ın indeks kararı, dış bağlantılar ve rekabet kod değişikliğiyle garanti edilemez. Teknik tamamlanma ile organik sonuç ayrı raporlanır.
