export const FITNESS_DATE = "2026-10-16";
export const journalCSV = "Tarih,Egzersiz,Set,Agirlik_kg,Tekrar,RPE,Dinlenme_sn,Not\n2026-10-16,Ornek hareket,1,60,10,,120,Ornek kayit - kendi verinle degistir\n";
export const fitnessArticles = [
  {
    path: "/fitness/antrenman-gunlugu",
    label: "Antrenman günlüğü",
    title: "Antrenman Günlüğü Nasıl Tutulur? Set ve Tekrar Kaydı | ForgeLabs",
    heading: "Antrenman günlüğü nasıl tutulur?",
    description: "Ağırlık, set, tekrar ve efor notlarını tutarlı kaydetmeyi öğren. Doldurulmuş antrenman günlüğü örneği ve indirilebilir CSV şablonu.",
    summary: "Hafızana değil, karşılaştırabildiğin bir kayda güven. İyi bir günlük uzun değil; bir sonraki antrenmanda anlaşılır olandır.",
    answer: "Her egzersiz için tarih, hareket adı, set başına ağırlık ve tamamlanan tekrarları kaydet. Gerekirse efor, dinlenme ve teknik not ekle. Sonraki kayıtta aynı hareketi, aynı ölçüm yöntemiyle karşılaştır.",
    sections: [
      { id: "kayit", title: "1. Önce küçük ama tutarlı bir kayıt düzeni kur", paragraphs: [
        "Telefon notu, kâğıt veya bir uygulama kullanabilirsin. Araçtan önce önemli olan, satırların aynı anlamı taşıması. ‘Bench 60’ birkaç gün sonra belirsizdir: 60 kilogram mı, toplam tekrar mı, tek bir set mi? Hareket adını ve birimini baştan yazmak bu belirsizliği kaldırır.",
        "Her seti ayrı kaydet. Üç sette 10, 9 ve 8 tekrar yaptıysan bunu ‘3 × 10’ diye yuvarlamak, bir sonraki karşılaştırmanın başlangıcını değiştirir. Isınma setlerini çalışma setlerinden ayrı işaretle. Hareketin varyasyonu, kullanılan makine veya oturma ayarı değiştiğinde kısa bir not düş."
      ], bullets: ["Tarih ve egzersizin tam adı", "Set numarası, kilogram ve gerçekten tamamlanan tekrar", "İsteğe bağlı efor ve dinlenme süresi", "Karşılaştırmayı etkileyen ekipman veya teknik değişikliği"] },
      { id: "ornek", title: "2. Doldurulmuş bir satırı nasıl okursun?", paragraphs: [
        "Örnek kayıt: ‘16 Ekim / aynı makinede göğüs press / set 1: 40 kg × 10 / set 2: 40 kg × 9 / set 3: 40 kg × 8’. Bu egzersiz için 27 tekrar ve 1.080 kg hacim yükü kaydedilmiş olur. Sayılar yalnız kayıt örneğidir; sana önerilen bir antrenman değildir.",
        "Dambıl hareketinde ‘20 kg’ yazıyorsan bunun tek dambıl mı yoksa iki dambıl toplamı mı olduğunu belirt. Makinedeki plaka sayısını kilogram sanma. Vücut ağırlığı hareketleri için aynı tonaj hesabını zorla kullanmak yerine tekrar, kullanılan destek ve hareket varyasyonunu ayrı yaz."
      ] },
      { id: "yorum", title: "3. Günlüğü bir karar notuna dönüştür", paragraphs: [
        "Antrenman öncesinde son karşılaştırılabilir kaydını aç. Aynı yükte kaç tekrar tamamlandığını, dinlenmenin benzer olup olmadığını ve notlarını birlikte oku. Kayıt, ne olduğunu gösterir; bir sonraki antrenmanda ne kadar ağırlık kaldırman gerektiğini tek başına söylemez.",
        "Tek bir düşük günü gelişimin bittiği şeklinde yorumlama. Ölçüm koşulları değişebilir. Haftalık değerlendirmede önce kayıt eksik mi, hareket aynı mı, setler aynı şekilde sayılmış mı diye kontrol et. Toplam tekrar, hacim ve öznel efor farklı sorulara cevap verir; tek bir puanı başarı ölçütü yapma."
      ] },
      { id: "hatalar", title: "4. En sık karşılaşılan kayıt hataları", paragraphs: [
        "Bir gün bar ağırlığını dahil edip başka gün etmemek, tamamlanmayan tekrarları hedef tekrar gibi yazmak ve hareket isimlerini her seferinde değiştirmek kayıtları zorlaştırır. Kendi adlandırma kuralını belirle; sonradan düzelttiğin eski kayda nedenini not et.",
        "Efor puanı kullanıyorsan hangi ölçeği kullandığını da yaz. Farklı ölçeklerdeki aynı sayı aynı şey değildir. Günlük tutmak için önce her alanı doldurmak zorunda değilsin: düzenli bir set–ağırlık–tekrar kaydı, yarıda bırakılan karmaşık bir tablodan daha kullanışlıdır."
      ] },
      { id: "basla", title: "5. Şablonla veya Stat Boost ile başla", paragraphs: [
        "Aşağıdaki CSV şablonu boş düzenini kurman için başlangıçtır. Dosyayı elektronik tablo uygulamanda açabilir, örnek satırı silebilir ve kendi kaydını girebilirsin. CSV içindeki RPE alanı isteğe bağlıdır. Dosya bir antrenman programı içermez.",
        "Telefonda kayıt tutmayı tercih ediyorsan Stat Boost ağırlık, set, tekrar ve RPE kaydını önceki antrenman referansıyla birleştirir. Uygulamanın gerçek ekranlarını ürün sayfasında görebilirsin. Buradaki şablon bir içe aktarma özelliği vaadi değildir; bağımsız bir kayıt dosyasıdır."
      ] }
    ],
    sources: [{ title: "Stat Boost — resmî Google Play açıklaması (ürün özellikleri)", url: "https://play.google.com/store/apps/details?id=stat.boost" }],
  },
  {
    path: "/fitness/progressive-overload",
    label: "Progressive overload",
    title: "Progressive Overload Nedir? Gelişimi Kaydetme Rehberi | ForgeLabs",
    heading: "Progressive overload: önce ne değiştiğini gör.",
    description: "Progressive overload kavramını, ağırlık ve tekrar kayıtlarıyla gelişimi karşılaştırmayı ve tonajın neden tek başına yeterli olmadığını öğren.",
    summary: "Daha büyük sayı her zaman daha iyi karşılaştırma değildir. İlerlemeyi görebilmek için önce benzer şeyleri ölçmek gerekir.",
    answer: "Progressive overload, antrenmandaki talebin zaman içinde kademeli artışını anlatır. Takip ederken yük, tekrar, set ve uygulama koşullarını birlikte kaydet; her seans ağırlık artırmak zorundaymışsın gibi yorumlama.",
    sections: [
      { id: "anlam", title: "Kavram neyi anlatıyor, neyi anlatmıyor?", paragraphs: [
        "Progressive overload bir uygulama özelliğinin adı değil, antrenmandaki talebin zaman içindeki değişimini anlatan genel bir ilkedir. Araştırmalarda bu değişim farklı ölçülerle incelenir. Buradaki amacımız kişiye bir yük artış takvimi vermek değil, tuttuğu kayıtların ne söylediğini daha açık hale getirmektir.",
        "Bir gün daha yüksek tonaj görmek, kas gelişiminin o oranda arttığını kanıtlamaz. Benzer şekilde her antrenmanda bir rekor gelmemesi de tek başına başarısızlık değildir. Hedeflerin ve koşulların, sayılara verdiğin anlamı etkiler. Kişisel program kararı için antrenör değerlendirmesi gerekebilir."
      ] },
      { id: "karsilastir", title: "Karşılaştırma için aynı zemini kur", paragraphs: [
        "Önce aynı hareketi ve varyasyonu bul. İki farklı makinedeki kilogramları, hatta farklı makara düzenlerini birbirinin yerine kullanma. Hareket açıklığı, destek, kullanılan ekipman ve dinlenme önemli ölçüde değiştiyse bunu kayıt üzerinde görünür kıl.",
        "Ardından set başına yük ve tekrarları yan yana koy. ‘Geçen hafta daha iyiydim’ yerine ‘aynı egzersizde aynı yükle ilk sette bir tekrar fazla kaydettim’ demek daha sınanabilir bir ifadedir. Bu gözlemden otomatik bir yük artırma kararı çıkarmak gerekmez."
      ], bullets: ["Aynı egzersiz ve aynı yük tanımı", "Hedef değil, tamamlanan tekrarlar", "Karşılaştırılabilir teknik ve ekipman notu", "Varsa aynı ölçekle yazılmış efor bilgisi"] },
      { id: "sayilar", title: "İki kayıt, iki ayrı soru", paragraphs: [
        "Kayıt A: 3 setin her biri 60 kg × 10 tekrar; toplam 1.800 kg hacim yükü. Kayıt B: 60 kg ile sırasıyla 11, 10 ve 10 tekrar; toplam 1.860 kg. Burada kayıtlı tekrar sayısı bir artmış, hacim yükü yaklaşık %3,3 yükselmiştir. Bu yalnız aritmetik bir karşılaştırmadır; önerilen set sayısı veya gelişim oranı değildir.",
        "Başka bir kayıtta yük artıp tekrar azalırsa toplam tonaj düşebilir. Bu yüzden hem set düzeyini hem toplamı okumak gerekir. Hangi hedefte hangi ölçünün anlamlı olduğu ayrı bir değerlendirmedir. Hesaplayıcımız sonucu verir; ‘iyi’, ‘kötü’ veya ‘sonraki ağırlığın şu olmalı’ diye sınıflandırmaz."
      ] },
      { id: "uygula", title: "Günlükte kullanabileceğin karşılaştırma akışı", paragraphs: [
        "Her egzersiz için son benzer kaydı seç. Yük, tamamlanan tekrar ve toplam seti kontrol et. Ekipman veya teknik değişikliği varsa önce notu oku. Sonra sayısal farkı hesapla ve tek bir seans yerine zaman içindeki kayıtlarına geri dön.",
        "Stat Boost’taki antrenman kayıtlarını ve geçmiş antrenman referansını bu düzeni kurmak için kullanabilirsin. Kayıtlar eksikse önce veri düzenini iyileştirmek, belirsiz bir grafikten sonuç çıkarmaya çalışmaktan daha açıklayıcı olabilir. Uygulama kişisel sağlık değerlendirmesinin yerini almaz."
      ] },
      { id: "sinirlar", title: "Sayıların sınırını bil", paragraphs: [
        "Aynı tonaj; aynı hareket kalitesi, aynı efor veya aynı kas gelişimi demek değildir. Ağrı ya da sakatlık belirtisini bir hedefi yakalamak için görmezden gelme; böyle bir durumda kayıt aracından öneri almak yerine nitelikli bir sağlık uzmanına başvur.",
        "Buradaki açıklama genel eğitim ve kayıt okuryazarlığı içindir. Yeni başlayanlara tek tip ağırlık artışı, herkes için haftalık yüzde veya zorunlu tükeniş hedefi vermiyoruz. Kendi verini dürüstçe tutman, bir uygulamanın senin yerine program yazdığı anlamına gelmez."
      ] }
    ],
    sources: [{ title: "Progression of total training volume… (2024), PubMed — kavramsal çerçeve", url: "https://pubmed.ncbi.nlm.nih.gov/39178897/" }],
  },
  {
    path: "/fitness/antrenman-hacmi",
    label: "Antrenman hacmi",
    title: "Antrenman Hacmi Nedir? Set × Tekrar × Kilo Hesabı | ForgeLabs",
    heading: "Antrenman hacmi: tek sayı, bütün hikâye değil.",
    description: "Hacim yükünü set × tekrar × ağırlık ile hesapla. Değişken set örneği, dambıl ve makine kayıt kuralları, tonaj karşılaştırmasının sınırları.",
    summary: "Tonajı doğru hesapla, ne anlama gelmediğini de bil. Daha anlamlı bir günlük, daha büyük bir toplamdan önce gelir.",
    answer: "Hacim yükü, her set için ağırlık × tamamlanan tekrar hesaplanıp bu sonuçların toplanmasıdır. Tüm setler aynıysa set × tekrar × ağırlık kullanılabilir. Bu ölçü toplam işi özetlemeye yarar; kas gelişimini veya harcanan kaloriyi ölçmez.",
    sections: [
      { id: "formul", title: "Formül: setlerin yükünü ayrı ayrı topla", paragraphs: [
        "Antrenman hacmi farklı bağlamlarda set sayısı, tekrar sayısı veya hacim yükü ile ifade edilebilir. Bu sayfada ve hesaplayıcıda yalnız hacim yükünden, yani kilogram × tekrar toplamından söz ediyoruz. Sonucu pratikte ‘kg tonaj’ olarak göstermek, bunun bir enerji veya mekanik iş ölçümü olduğu anlamına gelmez.",
        "Üç setin hepsi 50 kg ve 10 tekrar ise hesap 3 × 10 × 50 = 1.500 kg olur. Setlerde yük veya tekrar değiştiğinde tek bir ortalama seçmek yerine her seti ayrı çarpıp toplamak daha açık ve denetlenebilir bir kayıttır."
      ] },
      { id: "degisken", title: "Değişken set örneği: aynı egzersiz, farklı tekrarlar", paragraphs: [
        "Örnek: ilk set 50 kg × 10 = 500; ikinci set 50 kg × 9 = 450; üçüncü set 45 kg × 10 = 450. Toplam hacim yükü 1.400 kg. Bu kaydı ‘3 × 10 × 50’ diye yazmak 100 kg fazla sonuç verir. Örnek yükler bir antrenman önerisi değil, hesap yöntemini göstermek içindir.",
        "Önceki kaydın 1.500 kg ise değişim (1.400 − 1.500) / 1.500 × 100, yaklaşık −%6,7 olur. Eksi işareti yalnız kayıtlı tonajın azaldığını söyler. Daha az veya çok kas geliştirdiğin sonucunu bu farktan çıkaramazsın. Önceki değer sıfırsa yüzde değişimi tanımlı değildir."
      ] },
      { id: "birim", title: "Birim kuralını değiştirme", paragraphs: [
        "Dambıl çiftinde tek dambıl ağırlığını mı, iki dambılın toplamını mı kullandığını kayda yaz. İkisi arasında geçiş yaparsan grafikte gerçek olmayan bir sıçrama oluşur. Barı hesaba katma biçimini de sabit tut. Tek taraflı hareketlerde iki tarafın tekrarlarını nasıl saydığını ayrıca belirt.",
        "Farklı makinelerin etiket yükleri eşdeğer olmayabilir. Vücut ağırlığı ve destekli hareketlerde de yalnız görünen kilogramdan anlamlı bir toplam üretmek her zaman mümkün değildir. Hesaplayıcıya girilen ağırlığın neyi ifade ettiğini sen belirliyorsun; araç ekipmanı veya hareket tekniğini doğrulamaz."
      ] },
      { id: "yorumla", title: "Tonaj hangi soruya cevap verir?", paragraphs: [
        "Bu toplam, belirli kayıtlarda ne kadar ağırlık ve tekrar yazdığını özetler. Benzer egzersizleri benzer koşullarda karşılaştırmak için kullanışlıdır. Fakat hareket mesafesi, teknik, efor ve hedef kas gibi bağlamları tek sayıda taşımaz.",
        "Örneğin bir press ve bir squat için aynı tonajı görmek, bu iki hareketin eşit antrenman etkisi oluşturduğunu göstermez. Hacim hesabını bir yarış puanına çevirmek yerine egzersiz düzeyindeki kayıtlarına geri dönebileceğin bir özet olarak kullan. Kalori, sağlık puanı veya kas kazanımı hesaplaması olarak sunma."
      ] },
      { id: "arac", title: "Kendi kayıtlarınla kontrol et", paragraphs: [
        "Hacim hesaplayıcısına iki karşılaştırılabilir kaydını set set gir. Aracın başlangıç değerleri yalnız örnektir; ağırlık veya tekrar hedefi önermez. Yükü düşen ya da tekrarı değişen seti ayrı girmek formülün doğru uygulanmasını sağlar.",
        "Sonucu günlüğüne not ederken hareket adını ve tarihini de ekle. Böylece ileride aynı toplamın hangi setlerden geldiğini görebilirsin. Daha fazla kayıt biriktirmek istiyorsan Stat Boost ürün sayfasındaki antrenman kaydı ve gelişim analizi özelliklerini inceleyebilirsin."
      ] }
    ],
    sources: [{ title: "Hornsby ve ark. (2018) — Resistance Training Volume Load with and without Exercise Displacement", url: "https://pubmed.ncbi.nlm.nih.gov/30400302/" }],
  },
];
