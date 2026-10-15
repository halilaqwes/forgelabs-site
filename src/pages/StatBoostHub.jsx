import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Pause,
  Play,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { AppScreen, Eyebrow, StoreLink, TextLink } from "../ui";
import SiteLink from "../SiteLink";
import { EMAIL, STORE } from "../site-data";
import { useMotionSettings } from "../motion-settings";
import { cardNumber, defaultCardRows, workoutCardData } from "../workout-card";
import "../statboost-hub.css";

const chapters = [
  { id: "tur", name: "Ürün turu" },
  { id: "kart", name: "Kart oluştur" },
  { id: "yardim", name: "Yardım" },
  { id: "atlas", name: "Kayıt atlası" },
  { id: "notlar", name: "Forge Notes" },
  { id: "hikayen", name: "Senin deneyimin" },
];
const steps = [
  {
    name: "Başla",
    title: "Önce bir başlangıç noktası.",
    screen: "workout",
    body: "Stat Boost antrenmana başlama ekranıyla kaydını bir düzene koymanı sağlar. Aynı egzersiz için tutarlı bir isim ve ağırlık birimi kullanmak, geçmişe döndüğünde işini kolaylaştırır.",
    note: "Kayıt önerisi: hareket adını ve ekipmanını net yaz.",
  },
  {
    name: "Kaydet",
    title: "Hedefini değil, yaptığını kaydet.",
    screen: "dashboard",
    body: "Ağırlık, set ve tekrarlarını kaydet; istersen RPE ve dinlenme bilgisiyle bağlam ekle. Bir sette hedefinden farklı tekrar yaptıysan tamamladığın sayıyı yaz. Mağaza görseli antrenman özetini gösterir; bu bölüm canlı uygulama değildir.",
    note: "Örnek: 60 kg × 10, 60 kg × 9, 60 kg × 8.",
  },
  {
    name: "Karşılaştır",
    title: "Rakamların arasındaki hikâyeyi gör.",
    screen: "analysis",
    body: "Geçmiş antrenman referansı, hacim analizi ve kişisel rekorlar kayıtlarını okumaya yardımcı olur. Benzer hareketleri benzer koşullarda karşılaştır. Daha yüksek tonajı otomatik olarak daha fazla kas kazanımı sayma.",
    note: "Bir sonraki adım: hacim hesaplayıcıda iki kaydı karşılaştır.",
  },
];
const help = [
  {
    category: "Başlangıç",
    question: "İlk antrenmanımı kaydederken neleri yazmalıyım?",
    answer:
      "Egzersiz adını, ağırlık birimini ve her sette tamamladığın tekrarları kaydet. Isınma ve çalışma setlerini ayır. Aynı ekipman ve varyasyon için tutarlı isim kullan. Düğme konumları sürüme göre değişebileceğinden bu rehber bir arayüz adımı listesi değil, kayıt düzeni önerisidir.",
    href: "/fitness/antrenman-gunlugu/",
    link: "Örnek günlüğü incele",
  },
  {
    category: "Başlangıç",
    question: "RPE yazmak zorunda mıyım?",
    answer:
      "Bu web deneyimi RPE girmeyi gerektirmez. Stat Boost mağaza açıklamasında RPE kaydı bulunur; uygulamadaki alanın kullanımını mevcut sürümünden kontrol et. Efor puanını kullanıyorsan ölçeğini tutarlı tut; puan, kişisel bir sağlık ölçümü değildir.",
  },
  {
    category: "Kayıt",
    question: "Çevrimdışı kayıt ve senkronizasyon nasıl çalışır?",
    answer:
      "Resmî mağaza açıklaması çevrimdışı kayıt ve bağlantı geri geldiğinde bulut senkronizasyonunu belirtir. Kayıtların görünmüyorsa uygulama sürümünü ve sorunun oluştuğu adımları destek ekibine ilet. Sorun çözülmeden uygulamayı silmeni veya verilerini temizlemeni önermiyoruz.",
  },
  {
    category: "Kayıt",
    question: "Tonaj hesabım neden farklı görünüyor?",
    answer:
      "Hareket başına tamamlanan setleri kontrol et. Barı dahil etme biçimi, dambılın tekini veya çiftini sayman ve farklı setlerde değişen tekrarlar sonucu etkileyebilir. Web hesaplayıcısı yalnız girilen kilogram × tekrar toplamını hesaplar; uygulama hesabına bağlanmaz.",
    href: "/fitness/hacim-hesaplayici/",
    link: "Hacmi ayrı ayrı hesapla",
  },
  {
    category: "Hesap ve destek",
    question: "Ücretler ve özellik kapsamını nereden öğrenebilirim?",
    answer:
      "Uygulama içi satın alma seçenekleri bulunur. Güncel fiyatları, cihaz uyumluluğunu ve özellik kapsamını Google Play sayfasında ve uygulama içinde kontrol et. Burada doğrulanmamış fiyat veya abonelik paketi yayımlamıyoruz.",
    href: STORE,
    link: "Google Play’i aç",
  },
  {
    category: "Hesap ve destek",
    question: "Hesap veya kişisel verilerim için kime ulaşmalıyım?",
    answer: `Gizlilik politikasını inceleyebilir, veri ve hesap taleplerini ${EMAIL} adresine iletebilirsin. Şifreni, doğrulama kodlarını veya gereksiz sağlık bilgilerini paylaşma. Bu sayfa hesap bilgilerini görüntülemez ve bir hesap silme işlemi yapmaz.`,
    href: "/privacy.html",
    link: "Gizlilik politikasını oku",
  },
  {
    category: "Hesap ve destek",
    question: "Bir hatayı en faydalı şekilde nasıl bildirebilirim?",
    answer:
      "Cihaz modeli, Android sürümü, Stat Boost sürümü, beklediğin sonuç ve sorunu tekrar oluşturduğun adımlar yeterli bir başlangıçtır. Ekran görüntüsünde kişisel bilgileri kapat. E-posta taslağını göndermeden önce eklerini ve alıcıyı kontrol et.",
    href: "/iletisim/",
    link: "Destek iletişimine geç",
  },
];
const exercises = [
  {
    name: "Bench press",
    equipment: "Bar",
    note: "Bar ve plakaların toplamını mı kullandığını belirt. Düz, eğimli ve farklı ekipmanlı varyasyonları ayrı isimlerle kaydet.",
  },
  {
    name: "Squat",
    equipment: "Bar",
    note: "Varyasyonu ve kullanılan ekipmanı isme ekle. Barla, makinede ve vücut ağırlığıyla yapılan kayıtları aynı seri olarak toplama.",
  },
  {
    name: "Dambıl curl",
    equipment: "Dambıl",
    note: "Yazdığın kilogram tek dambıl mı, iki dambılın toplamı mı? İki tarafı ayrı kaydediyorsan tekrar sayımını da belirt.",
  },
  {
    name: "Dambıl press",
    equipment: "Dambıl",
    note: "Oturarak veya yatarak yapılan varyasyonu ayır. Tek ve çift dambıl ağırlık tanımını kayıtlar arasında değiştirme.",
  },
  {
    name: "Lat pulldown",
    equipment: "Makine",
    note: "Aynı makine ve tutuş için tutarlı isim kullan. Farklı makinelerde aynı etiket kilogramı eşdeğer performans sayma.",
  },
  {
    name: "Leg press",
    equipment: "Makine",
    note: "Makineyi ve yükü sayma biçimini not et. Farklı makineleri veya yalnız eklenen plakalarla toplam yükü birbirine karıştırma.",
  },
  {
    name: "Şınav",
    equipment: "Vücut ağırlığı",
    note: "Tekrarı ve varyasyonu kaydet. Kendi vücut ağırlığını doğrudan kilogram alanına yazıp basit tonaj hesabına dönüştürme.",
  },
  {
    name: "Barfiks",
    equipment: "Vücut ağırlığı",
    note: "Tekrar, destek kullanımı ve varsa ek ağırlığı ayrı belirt. Destekli ve desteksiz kayıtları aynı yük tanımıyla yorumlama.",
  },
];

function ProductTour() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { paused, reduced } = useMotionSettings();
  const running = playing && !paused && !reduced;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      if (active === steps.length - 1) setPlaying(false);
      else setActive(active + 1);
    }, 15000);
    return () => window.clearTimeout(timer);
  }, [active, running]);
  const select = (index) => {
    setPlaying(false);
    setActive(index);
  };
  const step = steps[active];
  return (
    <section
      id="tur"
      className="sb-section wrap"
      aria-labelledby="tour-heading"
    >
      <div className="sb-heading">
        <Eyebrow>01 / ÜRÜN TURU</Eyebrow>
        <h2 id="tour-heading">
          Üç adımda tanış.
          <br />
          <em>Kendi hızında keşfet.</em>
        </h2>
        <p>
          Gerçek Google Play görselleriyle açıklamalı bir tur. Video veya canlı
          uygulama değil; ekranlar mağaza tanıtım görselleridir ve mevcut
          sürümden farklı görünebilir.
        </p>
      </div>
      <div className="sb-tour">
        <div className="sb-tour-art">
          <span className="mono">STAT BOOST / GERÇEK MAĞAZA GÖRSELİ</span>
          <div className="sb-tour-phone" key={step.screen}>
            <AppScreen kind={step.screen} eager={active === 0} />
          </div>
          <span className="sb-tour-count">
            0{active + 1}
            <small>/ 03</small>
          </span>
        </div>
        <div className="sb-tour-story">
          <div
            className="sb-tour-tabs"
            role="tablist"
            aria-label="Ürün turu adımları"
          >
            {steps.map((item, index) => (
              <button
                key={item.name}
                id={`tour-tab-${index}`}
                role="tab"
                aria-selected={index === active}
                aria-controls="tour-panel"
                tabIndex={index === active ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => {
                  if (
                    ["ArrowRight", "ArrowLeft", "Home", "End"].includes(
                      event.key,
                    )
                  ) {
                    event.preventDefault();
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : (active +
                              (event.key === "ArrowRight" ? 1 : -1) +
                              3) %
                            3;
                    select(next);
                    document.getElementById(`tour-tab-${next}`).focus();
                  }
                }}
              >
                0{index + 1} {item.name}
              </button>
            ))}
          </div>
          <div
            id="tour-panel"
            role="tabpanel"
            aria-labelledby={`tour-tab-${active}`}
          >
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <div className="sb-tour-note">{step.note}</div>
          </div>
          <div className="sb-tour-controls">
            <button
              onClick={() => select(Math.max(active - 1, 0))}
              disabled={active === 0}
              aria-label="Önceki adım"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => select(Math.min(active + 1, 2))}
              disabled={active === 2}
              aria-label="Sonraki adım"
            >
              <ArrowRight size={18} />
            </button>
            <button
              className="sb-play"
              disabled={paused || reduced}
              aria-pressed={running}
              onClick={() => {
                if (running) setPlaying(false);
                else {
                  setActive(0);
                  setPlaying(true);
                }
              }}
            >
              {running ? <Pause size={16} /> : <Play size={16} />}
              {running ? "Turu duraklat" : "45 saniyelik turu başlat"}
            </button>
          </div>
          <p className="sb-fine">
            {paused || reduced
              ? "Hareket azaltma açık: adımları elle gezebilirsin."
              : "Otomatik tur yalnız sen başlatırsan çalışır; her adım 15 saniyedir."}
          </p>
          <TextLink href="/urunler/stat-boost/">Tüm ürün özellikleri</TextLink>
        </div>
      </div>
    </section>
  );
}

function WorkoutCard() {
  const [title, setTitle] = useState("Bugünkü antrenmanım");
  const [rows, setRows] = useState(defaultCardRows);
  const [theme, setTheme] = useState("lime");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const data = workoutCardData(title, rows);
  const update = (index, key, value) => {
    setMessage("");
    setRows((items) =>
      items.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );
  };
  const download = async () => {
    if (!data || busy) return;
    setBusy(true);
    setMessage("");
    try {
      const { downloadWorkoutCard } = await import("../card-export.js");
      await downloadWorkoutCard(data, theme);
      setMessage("PNG hazır; indirme isteği tarayıcına iletildi.");
    } catch {
      setMessage(
        "Görsel oluşturulamadı. Desteklenen güncel bir tarayıcıyla tekrar deneyebilirsin.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <section
      id="kart"
      className="sb-section sb-card-section wrap"
      aria-labelledby="card-heading"
    >
      <div className="sb-heading">
        <Eyebrow>02 / SENİN KAYDIN, SENİN KARTIN</Eyebrow>
        <h2 id="card-heading">Emeğini bir karta dönüştür.</h2>
        <p>
          Kendi girdiğin tek bir egzersizin setlerinden 1080 × 1350 PNG oluştur.
          Örnek değerleri değiştir; adın, fotoğrafın ve hesabın istenmez.
          Bilgiler sunucuya gönderilmez, kaydedilmez.
        </p>
      </div>
      <div className="sb-card-builder">
        <div className="sb-card-form">
          <label htmlFor="card-title">
            Kart başlığı <span>En fazla 36 karakter</span>
          </label>
          <input
            id="card-title"
            maxLength={36}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setMessage("");
            }}
          />
          <fieldset className="sb-theme">
            <legend>Vurgu rengi</legend>
            {[
              ["lime", "Forge yeşili"],
              ["ice", "Buz mavisi"],
            ].map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="card-theme"
                  value={value}
                  checked={theme === value}
                  onChange={() => setTheme(value)}
                />
                <span className={`sb-swatch ${value}`} />
                {label}
              </label>
            ))}
          </fieldset>
          <div className="sb-row-labels" aria-hidden="true">
            <span>SET</span>
            <span>AĞIRLIK · KG</span>
            <span>TEKRAR</span>
          </div>
          {rows.map((row, index) => (
            <div className="sb-set-row" key={index}>
              <span className="mono">{String(index + 1).padStart(2, "0")}</span>
              <label>
                <span className="sr-only">
                  Kart set {index + 1} ağırlık kilogram
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="1000"
                  step="any"
                  value={row.weight}
                  onChange={(event) =>
                    update(index, "weight", event.target.value)
                  }
                />
              </label>
              <label>
                <span className="sr-only">Kart set {index + 1} tekrar</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="200"
                  step="1"
                  value={row.reps}
                  onChange={(event) =>
                    update(index, "reps", event.target.value)
                  }
                />
              </label>
            </div>
          ))}
          <div className="sb-row-actions">
            <button
              disabled={rows.length >= 8}
              onClick={() =>
                setRows((items) => [...items, { weight: "", reps: "" }])
              }
            >
              + Set ekle
            </button>
            <button
              disabled={rows.length <= 1}
              onClick={() => setRows((items) => items.slice(0, -1))}
            >
              Son seti kaldır
            </button>
            <button
              onClick={() => {
                setRows(defaultCardRows());
                setTitle("Bugünkü antrenmanım");
                setTheme("lime");
                setMessage("");
              }}
            >
              Sıfırla
            </button>
          </div>
          {!data && (
            <p className="sb-form-error" role="status">
              Başlık boş olamaz. Her set için 0–1.000 kg ve 1–200 arasında tam
              sayı tekrar gir.
            </p>
          )}
          <p className="sb-fine">
            Kilogram tanımını aynı tut: örneğin tek dambıl veya toplam ağırlık.
            Tonaj, kas kazanımı veya kalori ölçümü değildir. Kart doğrulanmış
            bir uygulama kaydı ya da başarı belgesi sayılmaz.
          </p>
          <button
            className="button button-lime sb-download"
            disabled={!data || busy}
            onClick={download}
          >
            <Download size={18} />
            {busy ? "PNG hazırlanıyor…" : "Kartı PNG olarak indir"}
          </button>
          <p className="sb-download-status" role="status">
            {message}
          </p>
          <noscript>
            Görsel oluşturmak için JavaScript gerekir. Kayıt rehberlerini
            JavaScript olmadan okuyabilirsin.
          </noscript>
        </div>
        <div
          className={`sb-share-card ${theme === "ice" ? "sb-ice" : ""}`}
          aria-label="Antrenman kartı önizlemesi"
        >
          <span className="mono">■ FORGELABS / ANTRENMAN KARTI</span>
          <h3>
            EMEĞİNİN
            <br />
            <em>BİR KAYDI VAR.</em>
          </h3>
          <h4>{data?.title || "Kaydını tamamla"}</h4>
          <p className="mono">
            {data
              ? `${data.sets} SET / ${data.reps} TEKRAR`
              : "GEÇERLİ KAYIT BEKLENİYOR"}
          </p>
          <div className="sb-preview-sets">
            {data?.rows.map((row, index) => (
              <div key={index}>
                <span>0{index + 1}</span>
                <strong>
                  {cardNumber(row.weight)} kg × {row.reps}
                </strong>
                <i
                  style={{
                    width: `${Math.max(2, ((row.weight * row.reps) / Math.max(...data.rows.map((set) => set.weight * set.reps), 1)) * 100)}%`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="sb-card-total">
            <span>HACİM YÜKÜ</span>
            <strong>
              {data ? cardNumber(data.volume) : "—"} <small>kg</small>
            </strong>
          </div>
          <p className="sb-card-disclaimer">
            Kullanıcının girdiği kayıt · Doğrulanmış başarı belgesi değildir.
          </p>
          <span className="mono">forgelabs.site / Stat Boost’u keşfet</span>
        </div>
      </div>
    </section>
  );
}

function HelpCentre() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");
  const filtered = help.filter(
    (item) =>
      (category === "Tümü" || item.category === category) &&
      `${item.question} ${item.answer}`
        .toLocaleLowerCase("tr-TR")
        .includes(query.trim().toLocaleLowerCase("tr-TR")),
  );
  return (
    <section
      id="yardim"
      className="sb-section wrap"
      aria-labelledby="help-heading"
    >
      <div className="sb-heading">
        <Eyebrow>03 / YARDIM MERKEZİ</Eyebrow>
        <h2 id="help-heading">Bir soruda takılı kalma.</h2>
        <p>
          İlk kayıttan veri taleplerine kadar pratik cevaplar. Ürün bilgileri
          resmî mağaza açıklamasına dayanır; menüler sürüme göre değişebilir.
        </p>
      </div>
      <div className="sb-help-tools">
        <label className="sb-search">
          <Search size={18} />
          <span className="sr-only">Yardım içeriklerinde ara</span>
          <input
            type="search"
            placeholder="Örn. çevrimdışı, hesap, RPE…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="sb-help-category">
          Konu
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {["Tümü", "Başlangıç", "Kayıt", "Hesap ve destek"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="sb-fine" role="status">
        {filtered.length} yardım içeriği
      </p>
      <div className="sb-help-list">
        {filtered.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span aria-hidden="true">+</span>
            </summary>
            <div>
              <p>{item.answer}</p>
              {item.href &&
                (item.href.startsWith("http") || item.href.endsWith(".html") ? (
                  <a className="text-link" href={item.href}>
                    {item.link} <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <TextLink href={item.href}>{item.link}</TextLink>
                ))}
            </div>
          </details>
        ))}
      </div>
      {!filtered.length && (
        <div className="sb-empty">
          <h3>Bu aramada sonuç yok.</h3>
          <p>Farklı bir kelime dene veya tüm konuları göster.</p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("Tümü");
            }}
          >
            Filtreleri temizle
          </button>
        </div>
      )}
      <TextLink href="/iletisim/">Yanıtını bulamadın mı? Bize yaz</TextLink>
    </section>
  );
}

function ExerciseAtlas() {
  const [equipment, setEquipment] = useState("Tümü");
  const list = exercises.filter(
    (item) => equipment === "Tümü" || item.equipment === equipment,
  );
  return (
    <section
      id="atlas"
      className="sb-section sb-atlas-section wrap"
      aria-labelledby="atlas-heading"
    >
      <div className="sb-heading">
        <Eyebrow>04 / EGZERSİZ KAYIT ATLASI</Eyebrow>
        <h2 id="atlas-heading">
          Aynı hareket.
          <br />
          <em>Tutarlı bir kayıt.</em>
        </h2>
        <p>
          Sekiz hareket için isimlendirme ve birim notları. Bu bir hareket
          tekniği kılavuzu veya antrenman programı değildir. Hareket uygulaması
          ve kişisel program için nitelikli bir antrenörden destek al.
        </p>
      </div>
      <div
        className="sb-filters"
        role="group"
        aria-label="Atlas ekipman filtresi"
      >
        {["Tümü", "Bar", "Dambıl", "Makine", "Vücut ağırlığı"].map((item) => (
          <button
            key={item}
            aria-pressed={item === equipment}
            onClick={() => setEquipment(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="sb-fine" role="status">
        {list.length} kayıt notu gösteriliyor
      </p>
      <div className="sb-atlas-grid">
        {list.map((item, index) => (
          <div className="sb-atlas-card" key={item.name}>
            <span className="mono">
              0{index + 1} / {item.equipment.toLocaleUpperCase("tr-TR")}
            </span>
            <h3>{item.name}</h3>
            <p>{item.note}</p>
          </div>
        ))}
      </div>
      <TextLink href="/fitness/antrenman-gunlugu/">
        Bu notları günlüğüne nasıl uygularsın?
      </TextLink>
    </section>
  );
}

function ForgeNotes() {
  return (
    <section
      id="notlar"
      className="sb-section wrap"
      aria-labelledby="notes-heading"
    >
      <div className="sb-heading">
        <Eyebrow>05 / FORGE NOTES</Eyebrow>
        <h2 id="notes-heading">
          Ürünün çevresinde
          <br />
          <em>neler inşa ediyoruz?</em>
        </h2>
        <p>
          Bu günlük web sitesindeki gerçek değişiklikleri anlatır. Stat Boost
          uygulamasının sürüm notları değildir; güncel uygulama değişiklikleri
          Google Play’de bulunur.
        </p>
      </div>
      <div className="sb-notes">
        <article>
          <time dateTime="2026-10-16">16 EKİM 2026</time>
          <span className="sb-note-label">WEB / DENEYİM</span>
          <h3>Stat Boost’a kendi alanını açtık.</h3>
          <p>
            Ana sayfayı genişletmek yerine ürün turunu, kart oluşturucuyu ve
            yardımı bu merkezde topladık. Kartlar cihazda oluşturulur; hesap
            bağlantısı veya veri yüklemesi gerekmez.
          </p>
        </article>
        <article>
          <time dateTime="2026-10-16">16 EKİM 2026</time>
          <span className="sb-note-label">WEB / REHBERLER</span>
          <h3>Sadece sayılar değil, nasıl okunduğu da önemli.</h3>
          <p>
            Fitness rehberleri ve hacim hesaplayıcı yayımlandı. Formüllerin
            yanında sınırlarını da yazdık: tonaj farkı, kas gelişimi iddiası
            değildir.
          </p>
          <TextLink href="/fitness/">Rehber merkezini aç</TextLink>
        </article>
      </div>
    </section>
  );
}

function ExperienceInvite() {
  const [message, setMessage] = useState("");
  const [permission, setPermission] = useState(false);
  const [error, setError] = useState("");
  const [opened, setOpened] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    if (message.trim().length < 20) {
      setError("Lütfen deneyimini en az 20 karakterle anlat.");
      return;
    }
    const body = `Stat Boost deneyimim:\n\n${message.trim()}\n\nSitede paylaşım için benimle iletişime geçilmesine izin: ${permission ? "Evet" : "Hayır"}.\nBu mesaj tek başına herkese açık yayın izni değildir.`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Stat Boost / Kullanıcı deneyimi")}&body=${encodeURIComponent(body)}`;
    setError("");
    setOpened(true);
  };
  return (
    <section
      id="hikayen"
      className="sb-section sb-invite wrap"
      aria-labelledby="invite-heading"
    >
      <div className="sb-heading">
        <Eyebrow>06 / SENİN DENEYİMİN</Eyebrow>
        <h2 id="invite-heading">
          Burada bir sonraki
          <br />
          <em>gerçek hikâye seninki olabilir.</em>
        </h2>
        <p>
          Stat Boost günlük rutininde nerede işini kolaylaştırdı, nerede eksik
          kaldı? İlk kullanıcı hikâyelerini topluyoruz. Deneyimin, hem ürünü
          hem onu anlatma biçimimizi geliştirmemize yardımcı olabilir.
        </p>
        <p className="sb-fine">
          Görüşün otomatik yayımlanmaz. Herkese açık bir alıntı için metin ve
          gösterilecek isim ayrıca seninle netleştirilir. Şifre, doğrulama kodu
          veya sağlık bilgisi gönderme.
        </p>
      </div>
      <form onSubmit={submit} className="sb-story-form">
        <label htmlFor="experience-message">Stat Boost deneyimini anlat</label>
        <textarea
          id="experience-message"
          minLength={20}
          maxLength={2000}
          required
          rows={6}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setOpened(false);
          }}
          placeholder="Hangi özelliği kullanıyorsun? Ne daha iyi olabilir?"
        />
        <label className="sb-consent">
          <input
            type="checkbox"
            checked={permission}
            onChange={(event) => setPermission(event.target.checked)}
          />
          Hikâyemi paylaşma olasılığı için benimle iletişime geçebilirsiniz.
          (İsteğe bağlı)
        </label>
        <button className="button button-lime" type="submit">
          E-posta taslağı oluştur <ArrowUpRight size={17} />
        </button>
        <p className="sb-fine">
          Bu form mesaj göndermez; e-posta uygulamanda bir taslak açar.
          Göndermeden önce kontrol et. E-posta uygulaman yoksa doğrudan{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> adresine yazabilirsin.
        </p>
        <p role="status">
          {error ||
            (opened
              ? "Taslak açma isteği iletildi. Gönderim için e-posta uygulamanı kontrol et."
              : "")}
        </p>
      </form>
    </section>
  );
}

export default function StatBoostHub() {
  return (
    <>
      <section className="sb-hub-hero wrap">
        <nav className="breadcrumbs" aria-label="İçerik yolu">
          <SiteLink href="/">ForgeLabs</SiteLink>
          <span>/</span>
          <SiteLink href="/urunler/">Ürünler</SiteLink>
          <span>/</span>
          <SiteLink href="/urunler/stat-boost/">Stat Boost</SiteLink>
          <span>/</span>
          <span>Deneyim merkezi</span>
        </nav>
        <div className="sb-hub-hero-grid">
          <div>
            <Eyebrow>STAT BOOST / DENEYİM MERKEZİ</Eyebrow>
            <h1 tabIndex={-1}>
              Bir uygulamadan
              <br />
              <em>bir alışkanlığa.</em>
            </h1>
            <p>
              Tanış, dene, kendi kaydını oluştur. Ürün turu, pratik araçlar ve
              aradığın cevaplarla Stat Boost dünyasına tek bir yerden adım at.
            </p>
            <a className="button button-lime" href="#tur">
              Ürün turuyla başla <ArrowRight size={18} />
            </a>
            <span className="sb-hero-note mono">
              HESAP GEREKMEZ / WEB DENEYİMİ
            </span>
          </div>
          <div className="sb-hub-hero-art" aria-hidden="true">
            <div className="sb-bit-orbit">
              {Array.from({ length: 25 }, (_, i) => (
                <span key={i} style={{ "--i": i }} />
              ))}
            </div>
            <span className="sb-hero-word">
              SB<span>+</span>
            </span>
            <div className="sb-hero-stamp">
              KAYDET.
              <br />
              ANLAMLA.
              <br />
              <em>DEVAM ET.</em>
            </div>
          </div>
        </div>
      </section>
      <nav
        className="sb-chapter-nav wrap"
        aria-label="Deneyim merkezi bölümleri"
      >
        {chapters.map((chapter, i) => (
          <a key={chapter.id} href={`#${chapter.id}`}>
            <span>0{i + 1}</span>
            {chapter.name}
          </a>
        ))}
      </nav>
      <ProductTour />
      <WorkoutCard />
      <HelpCentre />
      <ExerciseAtlas />
      <ForgeNotes />
      <ExperienceInvite />
      <section className="sb-hub-end wrap">
        <img
          src="/images/statboost-icon.webp"
          width="56"
          height="56"
          alt="Stat Boost simgesi"
          loading="lazy"
        />
        <h2>Kaydın cebinde devam etsin.</h2>
        <p>
          Bu web deneyimi uygulama hesabına bağlanmaz. Gerçek antrenman kaydı ve
          güncel özellikler için Stat Boost’u keşfet.
        </p>
        <StoreLink />
        <TextLink href="/urunler/stat-boost/">Ürün sayfasına dön</TextLink>
      </section>
    </>
  );
}
