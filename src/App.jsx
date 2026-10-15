import { useEffect, useRef, useState } from "react";
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Dumbbell,
  Droplets,
  Flame,
  Menu,
  Minus,
  Plus,
  RotateCcw,
  TrendingUp,
  Utensils,
  WifiOff,
  X,
} from "lucide-react";

const STORE = "https://play.google.com/store/apps/details?id=stat.boost";
const EMAIL = "forgelabss.dev@gmail.com";
const number = new Intl.NumberFormat("tr-TR");

function ForgeMark({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 27V5h23l-5 6H11v5h11l-5 6h-6v5H5Z" fill="currentColor" />
      <path d="m22 27 6-7v7h-6Z" fill="currentColor" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 26" fill="currentColor" aria-hidden="true">
      <path d="m2 1 14 12L2 25V1Zm16 10 4 2-4 2-2-2 2-2ZM4 0l13 8-3 3L4 0Zm0 26 10-11 3 3L4 26Z" />
    </svg>
  );
}

function StoreLink({ className = "", light = false }) {
  return (
    <a
      className={`button ${light ? "button-light" : "button-lime"} ${className}`}
      href={STORE}
      target="_blank"
      rel="noopener noreferrer"
    >
      <PlayMark />
      <span>Google Play’den indir</span>
      <ArrowUpRight size={18} />
    </a>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <Motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => [...menuRef.current.querySelectorAll("a,button")];
    focusables()[0]?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [toggleRef.current, ...focusables()];
        const first = items[0];
        const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);
  const links = [
    ["#statboost", "Stat Boost"],
    ["#deneyim", "Deneyimle"],
    ["#studio", "Stüdyo"],
  ];
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <a href="#hero" className="wordmark" aria-label="ForgeLabs ana sayfa">
          <ForgeMark />
          <span>
            forge<span className="wordmark-light">labs</span>
            <span className="wordmark-dot">+</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Ana menü">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="#contact">
          Birlikte üretelim <ArrowUpRight size={16} />
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          ref={menuRef}
          aria-label="Mobil menü"
        >
          {[...links, ["#contact", "İletişim"]].map(([href, label], i) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight />
            </a>
          ))}
          <StoreLink />
        </nav>
      )}
    </header>
  );
}

function AppScreen({ kind = "dashboard", eager = false }) {
  const screens = {
    dashboard: [
      "statboost-progress.webp",
      "Stat Boost antrenman özeti ve başarılar ekranı",
    ],
    analysis: [
      "statboost-overview.webp",
      "Stat Boost haftalık hacim analizi ekranı",
    ],
    social: ["statboost-workout.webp", "Stat Boost topluluk akışı ekranı"],
    workout: ["statboost-profile.webp", "Stat Boost antrenmana başlama ekranı"],
  };
  const [file, alt] = screens[kind];
  return (
    <div className={`app-screen screen-${kind}`}>
      <img
        src={`/images/${file}`}
        alt={alt}
        width="600"
        height="1050"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
    </div>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-title">
      <div className="hero-grid wrap">
        <div className="hero-copy">
          <Reveal>
            <a
              className="release-pill"
              href={STORE}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="status-dot" /> İLK ÜRÜNÜMÜZ YAYINDA{" "}
              <ArrowUpRight size={13} />
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 id="hero-title">
              Bir tekrar.
              <br />
              Bir adım.
              <br />
              <span className="hero-outline">Daha ileri.</span>
              <span className="title-dot">↗</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="hero-description">
              İlerlemek için buradayız. Antrenmanını veriye,
              <br className="desktop-break" /> emeğini gelişime dönüştüren{" "}
              <strong>Stat Boost</strong> ile tanış.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="hero-actions">
            <StoreLink />
            <a className="text-link" href="#deneyim">
              Önce bir dene <ArrowRight size={17} />
            </a>
          </Reveal>
          <Reveal delay={0.3} className="hero-note">
            <span>FORGELABS TARAFINDAN ÜRETİLDİ</span>
            <span className="note-line" />
            <span>ANDROID İÇİN TASARLANDI</span>
          </Reveal>
        </div>
        <div className="hero-art" aria-label="Stat Boost uygulama vitrini">
          <div className="orbital-field" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <span className="orbit-cross cross-one">+</span>
            <span className="orbit-cross cross-two">+</span>
            <div className="orbit-axis" />
          </div>
          <div className="hero-art-caption mono" aria-hidden="true">
            <span>SB—01 / PERFORMANCE SYSTEM</span>
            <span>BUILT TO PROGRESS</span>
          </div>
          <Motion.div
            className="hero-phone"
            initial={reduced ? false : { opacity: 0, y: 70, rotate: 12 }}
            animate={{ opacity: 1, y: 0, rotate: -8 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="phone-camera" />
            <AppScreen eager />
            <div className="phone-home" />
          </Motion.div>
          <Motion.div
            className="floating-tag tag-progress"
            initial={reduced ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="tag-icon">
              <TrendingUp size={20} />
            </div>
            <div>
              <span>HEDEF BELLİ.</span>
              <strong>Bir önceki senden ileri.</strong>
            </div>
            <svg viewBox="0 0 55 30" aria-hidden="true">
              <path d="m1 28 10-7 8 2 12-14 9 3L54 1" />
            </svg>
          </Motion.div>
          <div className="floating-tag tag-record">
            <span className="mini-star">✳</span>
            <span>Gelişimin, görünür olsun.</span>
          </div>
          <span className="hero-product-name" aria-hidden="true">
            STAT
            <br />
            BOOST
          </span>
        </div>
      </div>
      <div className="hero-bottom wrap">
        <a href="#statboost">
          <ArrowDown size={15} /> KEŞFETMEYE DEVAM ET
        </a>
        <span>DAHA İYİSİNİ ÜRETMEK, BİZİM REFLEKSİMİZ.</span>
        <span className="hero-index">001 — 004</span>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["KAYDET", "GELİŞ", "TEKRAR ET", "KENDİNİ AŞ"];
  return (
    <div className="marquee" aria-label="Kaydet, geliş, tekrar et, kendini aş">
      <div className="marquee-track" aria-hidden="true">
        {[0, 1, 2, 3].map((group) => (
          <div className="marquee-group" key={group}>
            {words.map((word) => (
              <span key={word}>
                {word}
                <span className="asterisk">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    num: "01",
    title: "Her setin bir hikâyesi var.",
    text: "Kilo, tekrar ve zorluk dereceni kaydet. Önceki antrenmanını gör, sıradaki adımını daha bilinçli at.",
    icon: Dumbbell,
    label: "ANTRENMAN KAYDI",
  },
  {
    num: "02",
    title: "Gelişimini tahmin etme. Gör.",
    text: "Antrenman hacminden kişisel rekorlarına; emeğinin karşılığını grafikler ve istatistiklerle takip et.",
    icon: TrendingUp,
    label: "PERFORMANS ANALİZİ",
  },
  {
    num: "03",
    title: "Motivasyon paylaştıkça büyür.",
    text: "Antrenman özetlerini ve rekorlarını toplulukla paylaş. Kendi yolculuğuna, birlikte devam et.",
    icon: Flame,
    label: "TOPLULUK",
  },
];

function Product() {
  const [active, setActive] = useState(0);
  const kinds = ["workout", "analysis", "social"];
  return (
    <section
      id="statboost"
      className="product-section section-space"
      aria-labelledby="product-title"
    >
      <div className="wrap">
        <Reveal className="section-topline">
          <span className="eyebrow">
            <span className="tiny-square" /> 01 / ÜRETTİĞİMİZ ŞEYLER
          </span>
          <span className="section-side-note">FİKİRDEN CEBİNE.</span>
        </Reveal>
        <div className="product-heading">
          <Reveal>
            <div className="product-name">
              <img
                src="/images/statboost-icon.webp"
                width="52"
                height="52"
                alt="Stat Boost uygulama simgesi"
                loading="lazy"
              />
              <span>
                Stat Boost
                <span className="product-badge">
                  YAYINDA <span className="status-dot" />
                </span>
              </span>
            </div>
            <h2 id="product-title">
              Disiplin sende.
              <br />
              <span className="muted">Gerisi cebinde.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="section-description">
              Bir not defterinden çok daha fazlası.
              <br />
              Gücünü ölçen, ilerlemeni görünür kılan
              <br />
              kişisel antrenman günlüğün.
            </p>
            <a
              className="text-link"
              href={STORE}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Play’de keşfet <ArrowUpRight size={17} />
            </a>
          </Reveal>
        </div>
        <div className="product-showcase">
          <Reveal className="product-display">
            <div className="display-grid" aria-hidden="true" />
            <div className="display-coordinate mono">STAT BOOST / ANDROID</div>
            <div className="display-word" aria-hidden="true">
              PROGRESS.
            </div>
            <div className="showcase-phone">
              <AppScreen kind={kinds[active]} key={active} />
            </div>
            <div className="display-bottom">
              <span className="status-dot" />
              <span>Gerçek uygulama ekranı</span>
              <span className="mono">0{active + 1} / 03</span>
            </div>
          </Reveal>
          <div
            className="product-feature-list"
            role="tablist"
            aria-label="Stat Boost özellikleri"
            aria-orientation="vertical"
          >
            {features.map((feature, i) => (
              <button
                key={feature.num}
                id={`feature-tab-${i}`}
                role="tab"
                aria-selected={active === i}
                aria-controls="feature-panel"
                tabIndex={active === i ? 0 : -1}
                onKeyDown={(e) => {
                  if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
                    e.preventDefault();
                    const next =
                      e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? features.length - 1
                          : (i +
                              (e.key === "ArrowDown" ? 1 : -1) +
                              features.length) %
                            features.length;
                    setActive(next);
                    document.getElementById(`feature-tab-${next}`).focus();
                  }
                }}
                className={`product-feature ${active === i ? "active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="feature-number mono">{feature.num}</span>
                <span className="feature-content">
                  <span className="feature-label">
                    <feature.icon size={14} />
                    {feature.label}
                  </span>
                  <span className="feature-title">{feature.title}</span>
                  <span className="feature-description">{feature.text}</span>
                </span>
                <ArrowUpRight className="feature-arrow" size={22} />
              </button>
            ))}
          </div>
        </div>
        <p
          id="feature-panel"
          role="tabpanel"
          aria-labelledby={`feature-tab-${active}`}
          className="sr-only"
        >
          {features[active].text}
        </p>
        <Reveal className="product-extras">
          <span>
            <WifiOff size={17} /> İnternet olmasa da antrenman devam eder.
          </span>
          <span>
            <Droplets size={17} /> Su takibi
          </span>
          <span>
            <Utensils size={17} /> Öğün takibi
          </span>
        </Reveal>
      </div>
    </section>
  );
}

function ProgressGraph({ completed, id }) {
  const y = 125 - completed * 20;
  return (
    <svg
      viewBox="0 0 420 160"
      className="progress-graph"
      role="img"
      aria-label={`Örnek hacim grafiği: ${completed} set tamamlandı`}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4f458" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#c4f458" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[30, 80, 130].map((n) => (
        <line
          key={n}
          x1="0"
          y1={n}
          x2="420"
          y2={n}
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeDasharray="3 5"
        />
      ))}
      <path
        d={`M0 140 60 123 120 130 180 91 240 104 300 69 360 77 420 ${y}V160H0Z`}
        fill={`url(#${id})`}
      />
      <path
        className="graph-line"
        d={`M0 140 60 123 120 130 180 91 240 104 300 69 360 77 420 ${y}`}
        fill="none"
        stroke="#c4f458"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="415" cy={y} r="5" fill="#c4f458" />
    </svg>
  );
}

function TrainingDemo() {
  const [weight, setWeight] = useState(60);
  const [completed, setCompleted] = useState(0);
  const volume = completed * weight * 10;
  const complete = completed === 4;
  return (
    <section
      id="deneyim"
      className="demo-section section-space"
      aria-labelledby="demo-title"
    >
      <div className="wrap demo-layout">
        <Reveal className="demo-copy">
          <span className="eyebrow">
            <span className="tiny-square" /> 02 / KÜÇÜK BİR ÖN İZLEME
          </span>
          <h2 id="demo-title">
            Sadece bakma.
            <br />
            <span className="serif-accent">Hisset.</span>
          </h2>
          <p>
            Bir set ekle. Grafiğin nasıl değiştiğini gör.
            <br />
            Küçük bir hareketin büyük resimdeki yerini keşfet.
          </p>
          <div className="demo-instruction">
            <span className="step-circle">1</span> Ağırlığını seç{" "}
            <ArrowRight size={15} />
            <span className="step-circle">2</span> Setini tamamla
          </div>
          <p className="demo-disclaimer">
            Bu, örnek verilerle hazırlanmış bir web demosudur.
            <br />
            Gerçek antrenmanlarını Stat Boost’ta takip edebilirsin.
          </p>
        </Reveal>
        <Reveal className="demo-console">
          <div className="console-header">
            <span>
              <span className="status-dot" /> CANLI DENEYİM
            </span>
            <span className="mono">STAT BOOST LAB</span>
          </div>
          <div className="console-body">
            <div className="exercise-title">
              <div>
                <span className="mini-label">BUGÜNKÜ ANTRENMAN</span>
                <h3>
                  Bench Press<span> / 4 × 10</span>
                </h3>
              </div>
              <Dumbbell size={25} />
            </div>
            <div className="weight-control">
              <button
                aria-label="Ağırlığı 2,5 kilogram azalt"
                disabled={weight <= 20 || completed > 0}
                onClick={() => setWeight((w) => Math.max(20, w - 2.5))}
              >
                <Minus size={19} />
              </button>
              <span>
                <strong>{number.format(weight)}</strong> kg
                <span className="weight-caption">ÇALIŞMA AĞIRLIĞI</span>
              </span>
              <button
                aria-label="Ağırlığı 2,5 kilogram artır"
                disabled={weight >= 120 || completed > 0}
                onClick={() => setWeight((w) => Math.min(120, w + 2.5))}
              >
                <Plus size={19} />
              </button>
            </div>
            <div
              className="set-indicators"
              aria-label={`${completed} / 4 set tamamlandı`}
            >
              {[0, 1, 2, 3].map((i) => (
                <div className={i < completed ? "done" : ""} key={i}>
                  {i < completed ? <Check size={16} /> : <span>0{i + 1}</span>}
                  <span>SET</span>
                </div>
              ))}
            </div>
            <div className="demo-metrics">
              <div>
                <span className="mini-label">TOPLAM HACİM</span>
                <span className="volume-value" aria-live="polite">
                  {number.format(volume)}
                  <small> kg</small>
                </span>
              </div>
              <span className={`session-state ${complete ? "finished" : ""}`}>
                {complete ? "İYİ İŞ ÇIKARDIN ↗" : `${completed} / 4 SET`}
              </span>
            </div>
            <ProgressGraph completed={completed} id="demo-gradient" />
            <div className="graph-axis mono">
              <span>BAŞLANGIÇ</span>
              <span>ŞİMDİ</span>
            </div>
            <button
              className={`complete-set button ${complete ? "button-complete" : "button-lime"}`}
              onClick={() => setCompleted((c) => Math.min(c + 1, 4))}
              disabled={complete}
            >
              {complete ? <Check size={19} /> : <Plus size={19} />}
              {complete ? "Antrenman tamamlandı" : "Bir set tamamla"}
              {!complete && <span>10 TEKRAR</span>}
            </button>
            <button
              className="reset-demo"
              onClick={() => {
                setCompleted(0);
                setWeight(60);
              }}
            >
              <RotateCcw size={12} /> Demoyu sıfırla
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section
      id="studio"
      className="studio-section section-space"
      aria-labelledby="studio-title"
    >
      <div className="wrap">
        <Reveal className="section-topline">
          <span className="eyebrow">
            <span className="tiny-square" /> 03 / MERAKTAN ÜRÜNE
          </span>
          <span className="section-side-note">INDEPENDENT BY DESIGN.</span>
        </Reveal>
        <div className="studio-layout">
          <Reveal>
            <h2 id="studio-title">
              Bir fikri
              <br />
              gerçeğe <span className="serif-accent">dövmek.</span>
            </h2>
            <p className="studio-lead">İsmimizde var.</p>
            <p className="studio-description">
              ForgeLabs, günlük hayattaki gerçek ihtiyaçlardan yola çıkan
              bağımsız bir ürün stüdyosu. Fikirleri tasarlıyor, kodluyor ve
              insanların kullanabileceği ürünlere dönüştürüyoruz.
            </p>
            <a className="text-link" href={`mailto:${EMAIL}`}>
              Bir fikrin mi var? Konuşalım <ArrowUpRight size={17} />
            </a>
          </Reveal>
          <Reveal className="forge-art">
            <div className="forge-art-grid" aria-hidden="true" />
            <div className="forge-art-top mono">
              <span>THE FORGE / INDEPENDENT STUDIO</span>
              <span>↗</span>
            </div>
            <div className="forge-sculpture" aria-hidden="true">
              <div className="forge-layer layer-back">
                <ForgeMark />
              </div>
              <div className="forge-layer layer-mid">
                <ForgeMark />
              </div>
              <div className="forge-layer layer-front">
                <ForgeMark />
              </div>
            </div>
            <div className="forge-art-bottom">
              <span>
                BİR FİKİR.
                <br />
                <strong>SONSUZ İHTİMAL.</strong>
              </span>
              <span className="mono">
                DESIGN.
                <br />
                BUILD.
                <br />
                REFINE.
              </span>
            </div>
          </Reveal>
        </div>
        <div className="studio-principles">
          {[
            [
              "01",
              "İşlev, önce gelir.",
              "Güzel görünenin ötesinde, gerçekten işe yarayan ürünler.",
            ],
            [
              "02",
              "Detay, fark yaratır.",
              "Bir dokunuş, bir geçiş, doğru yerde doğru bilgi.",
            ],
            [
              "03",
              "Ürün, hep gelişir.",
              "Yayınlamak bir son değil. Daha iyisinin başlangıcı.",
            ],
          ].map(([n, title, desc]) => (
            <Reveal key={n}>
              <span className="mono">{n} /</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const questions = [
  [
    "Stat Boost’u nereden indirebilirim?",
    <>
      Stat Boost, Android için Google Play’de yayında.{" "}
      <a href={STORE} target="_blank" rel="noopener noreferrer">
        Mağaza sayfasından
      </a>{" "}
      cihazına yükleyebilirsin.
    </>,
  ],
  [
    "İnternet olmadan kullanabilir miyim?",
    "Evet. Antrenmanlarını çevrimdışıyken de kaydedebilirsin. Mağaza açıklamasına göre bağlantı yeniden sağlandığında veriler bulutla senkronize edilir.",
  ],
  [
    "Bu sitedeki demo gerçek hesabıma bağlanıyor mu?",
    "Hayır. Demo yalnızca örnek verilerle tarayıcında çalışır. Hesap oluşturmaz, sağlık verisi istemez ve antrenman kaydetmez. Gerçek takip için uygulamayı kullanabilirsin.",
  ],
  [
    "Destek için size nasıl ulaşabilirim?",
    <>
      <a href={`mailto:${EMAIL}`}>{EMAIL}</a> adresine yazabilirsin. Geri
      bildirimlerini ve fikirlerini duymak isteriz.
    </>,
  ],
];

function Faq() {
  return (
    <section className="faq-section section-space" aria-labelledby="faq-title">
      <div className="wrap faq-layout">
        <Reveal>
          <span className="eyebrow">
            <span className="tiny-square" /> MERAK EDİLENLER
          </span>
          <h2 id="faq-title">
            Aklında
            <br />
            bir şey mi var?
          </h2>
        </Reveal>
        <div className="faq-list">
          {questions.map(([q, answer], i) => (
            <details key={q}>
              <summary>
                <span className="mono">0{i + 1}</span>
                {q}
                <ChevronDown size={18} />
              </summary>
              <div className="faq-answer">{answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ paused, onToggleMotion }) {
  return (
    <>
      <section id="contact" className="contact-section">
        <div className="wrap">
          <Reveal className="contact-top">
            <span className="eyebrow">04 / SIRADAKİ ADIM SENİN</span>
            <span className="contact-star" aria-hidden="true">
              ✳
            </span>
          </Reveal>
          <Reveal>
            <h2>
              Potansiyelini
              <br />
              <span>harekete geçir.</span>
              <ArrowUpRight aria-hidden="true" />
            </h2>
          </Reveal>
          <Reveal className="contact-actions">
            <StoreLink light />
            <a href={`mailto:${EMAIL}`} className="contact-email">
              Bize yaz <ArrowUpRight size={18} />
            </a>
            <p>İyi bir fikir, bir mesajla başlar.</p>
          </Reveal>
        </div>
      </section>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-main">
            <a
              href="#hero"
              className="wordmark"
              aria-label="ForgeLabs ana sayfa"
            >
              <ForgeMark />
              <span>
                forge<span className="wordmark-light">labs</span>
              </span>
            </a>
            <p>
              Merakla tasarlandı.
              <br />
              İleri gitmek için üretildi.
            </p>
            <a href={`mailto:${EMAIL}`}>
              {EMAIL}
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} ForgeLabs</span>
            <a href="/privacy.html">
              Gizlilik Politikası <ArrowUpRight size={12} />
            </a>
            <a href="#hero">Başa dön ↑</a>
            <button
              className="motion-toggle"
              aria-pressed={paused}
              onClick={onToggleMotion}
            >
              {paused ? "Animasyonları oynat" : "Animasyonları durdur"}
            </button>
            <span className="footer-signature mono">
              ALWAYS A WORK IN PROGRESS.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const reduced = useReducedMotion();
  return (
    <div className={paused ? "site motion-paused" : "site"}>
      <a className="skip-link" href="#main">
        İçeriğe geç
      </a>
      <Motion.div
        className="page-progress"
        style={{ scaleX: reduced ? scrollYProgress : scaleX }}
        aria-hidden="true"
      />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Product />
        <TrainingDemo />
        <Studio />
        <Faq />
      </main>
      <Footer
        paused={paused}
        onToggleMotion={() => setPaused((value) => !value)}
      />
    </div>
  );
}
