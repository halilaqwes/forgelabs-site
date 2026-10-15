import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Sparkles,
  Code2,
  ScanLine,
} from "lucide-react";
import ForgeField from "../components/ForgeField";
import AmbientPaths from "../components/AmbientPaths";
import {
  AppScreen,
  Eyebrow,
  Reveal,
  StoreLink,
  TextLink,
  TiltCard,
} from "../ui";
import SiteLink from "../SiteLink";

function SignalFlow() {
  return (
    <section className="signal-section wrap">
      <div className="signal-top">
        <Eyebrow>FİKİRDEN KULLANIMA</Eyebrow>
        <span className="mono">OUR WAY OF MAKING THINGS.</span>
      </div>
      <div className="signal-flow">
        {[
          ["01", "Bir ihtiyaç.", "Gerçek bir sorudan başlarız."],
          ["02", "Bir fikir.", "Olasılıkları görünür kılarız."],
          ["03", "Bir deneyim.", "Detayları çalışan bir bütüne dönüştürürüz."],
          ["04", "Bir ürün.", "Hayata karışır, geri bildirimle gelişir."],
        ].map(([n, title, desc]) => (
          <Reveal key={n}>
            <span className="signal-node">
              <span />
            </span>
            <span className="mono">{n} /</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <section className="brand-hero" id="hero">
        <AmbientPaths />
        <div className="wrap brand-hero-grid">
          <div className="brand-hero-copy">
            <Reveal>
              <Eyebrow>BAĞIMSIZ DİJİTAL ÜRÜN STÜDYOSU</Eyebrow>
              <h1 tabIndex={-1}>
                Fikirler dijital.
                <br />
                <span>Hissettirdikleri</span>
                <br />
                <em>gerçek.</em>
              </h1>
              <p>
                İyi bir fikir, hayatın içinde bir karşılık bulmalı.
                <br className="desktop-break" /> ForgeLabs’te merakı tasarıma,
                tasarımı çalışan ürünlere dönüştürüyoruz.
              </p>
            </Reveal>
            <Reveal className="brand-hero-actions" delay={0.1}>
              <SiteLink href="/urunler/" className="button button-lime">
                Ürünleri keşfet <ArrowUpRight size={18} />
              </SiteLink>
              <TextLink href="/studio/">Stüdyoyu tanı</TextLink>
            </Reveal>
            <Reveal className="brand-hero-footnote">
              <span className="status-dot" />
              STAT BOOST ŞİMDİ GOOGLE PLAY’DE
            </Reveal>
          </div>
          <div className="brand-hero-scene">
            <div className="scene-topline mono">
              <span>FORGE ENGINE / 001</span>
              <span>LIVE RENDER</span>
            </div>
            <ForgeField />
            <div className="scene-bottomline">
              <span className="mono">BİR FİKİR, BİNLERCE OLASILIK.</span>
              <SiteLink href="/lab/">
                İçeri gir <ArrowUpRight size={15} />
              </SiteLink>
            </div>
            <span className="scene-side-label mono">MOVE TO EXPLORE ↔</span>
          </div>
        </div>
        <div className="wrap brand-hero-bottom">
          <a href="#one-cikan">
            <ArrowDown size={13} /> AŞAĞIDA DAHA FAZLASI VAR
          </a>
          <span className="mono">DESIGNED TO MAKE A DIFFERENCE.</span>
          <span className="mono">SCROLL / 01</span>
        </div>
      </section>
      <SignalFlow />
      <section id="one-cikan" className="home-featured section-space wrap">
        <Reveal className="section-topline">
          <Eyebrow number="01">BİR FİKRİN HAYATA GEÇMİŞ HÂLİ</Eyebrow>
          <TextLink href="/urunler/">Tüm ürünler</TextLink>
        </Reveal>
        <TiltCard className="featured-product">
          <div className="featured-product-copy">
            <div className="product-name">
              <img
                src="/images/statboost-icon.webp"
                alt="Stat Boost simgesi"
                width="42"
                height="42"
                loading="lazy"
              />
              <span>
                Stat Boost
                <span className="product-badge">
                  <span className="status-dot" /> YAYINDA
                </span>
              </span>
            </div>
            <h2>
              Her set.
              <br />
              Bir sonraki
              <br />
              <span>sen.</span>
            </h2>
            <p>
              Setlerini kaydet. Gelişimini takip et.
              <br />
              Emeğinin karşılığını daha net gör.
            </p>
            <div className="featured-product-actions">
              <SiteLink
                href="/urunler/stat-boost/"
                className="button button-lime"
              >
                Ürünü incele <ArrowUpRight size={17} />
              </SiteLink>
              <StoreLink />
            </div>
            <div className="product-metadata mono">
              <span>ANDROID</span>
              <span>SAĞLIK & FITNESS</span>
              <span>FORGELABS ORIGINAL</span>
            </div>
          </div>
          <div className="featured-product-art">
            <span className="featured-word" aria-hidden="true">
              BOOST
            </span>
            <div className="featured-phone phone-back">
              <AppScreen kind="analysis" />
            </div>
            <div className="featured-phone phone-front">
              <AppScreen kind="dashboard" />
            </div>
            <span className="product-art-note mono">
              GERÇEK UYGULAMA EKRANLARI
            </span>
          </div>
        </TiltCard>
      </section>
      <section className="manifesto-band">
        <div className="wrap manifesto-layout">
          <Reveal>
            <Eyebrow number="02">YAKLAŞIMIMIZ</Eyebrow>
            <h2>
              Az gürültü.
              <br />
              Daha çok <em>anlam.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Teknolojiyi göstermek için değil, bir şeyi daha iyi hâle getirmek
              için kullanıyoruz. Sade arayüzler, düşünülmüş etkileşimler ve
              gerçek hayatta işe yarayan ürünler.
            </p>
            <TextLink href="/studio/">Bizi tanımlayan şeyler</TextLink>
          </Reveal>
        </div>
        <div className="wrap manifesto-tags">
          <span>
            <ScanLine size={17} /> NETLİK
          </span>
          <span>
            <Sparkles size={17} /> KARAKTER
          </span>
          <span>
            <Code2 size={17} /> İŞLEV
          </span>
        </div>
      </section>
      <section className="home-lab section-space wrap">
        <Reveal className="section-topline">
          <Eyebrow number="03">BİRAZ MERAK, BİRAZ OYUN</Eyebrow>
          <span className="mono">EXPERIMENTS IN MOTION.</span>
        </Reveal>
        <SiteLink href="/lab/" className="lab-teaser">
          <div>
            <span className="lab-small-label">
              <span className="status-dot" /> FORGELABS LAB
            </span>
            <h2>
              Ciddi işler.
              <br />
              <span>Oyuncu bir zihin.</span>
            </h2>
            <p>
              Bitler hareket eder. Formlar değişir.
              <br />
              Sen dokununca fikir başka bir şeye dönüşür.
            </p>
            <span className="text-link">
              Deney alanını aç <ArrowRight size={19} />
            </span>
          </div>
          <div className="pixel-teaser-art" aria-hidden="true">
            {Array.from({ length: 100 }, (_, i) => (
              <span
                key={i}
                style={{
                  "--bit-index": i,
                  "--bit-opacity": 0.15 + (Math.sin(i * 2.3) + 1) * 0.4,
                }}
              />
            ))}
          </div>
          <ArrowUpRight className="lab-teaser-arrow" />
        </SiteLink>
      </section>
    </>
  );
}
