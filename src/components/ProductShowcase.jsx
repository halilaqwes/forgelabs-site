import { useState } from "react";
import {
  ArrowUpRight,
  Dumbbell,
  TrendingUp,
  Flame,
  WifiOff,
  Droplets,
  Utensils,
} from "lucide-react";
import { Reveal, AppScreen } from "../ui";
import { STORE } from "../site-data";

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

export default function ProductShowcase() {
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
