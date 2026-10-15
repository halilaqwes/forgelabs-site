import {
  ArrowDown,
  BarChart3,
  Trophy,
  Droplets,
  Utensils,
  WifiOff,
  Gauge,
} from "lucide-react";
import {
  AppScreen,
  Eyebrow,
  NextPage,
  Reveal,
  StoreLink,
  TextLink,
  TiltCard,
} from "../ui";
import ProductShowcase from "../components/ProductShowcase";
import FAQ from "../components/FAQ";
import SiteLink from "../SiteLink";

export default function StatBoost() {
  return (
    <>
      <section className="app-detail-hero wrap">
        <div>
          <Reveal>
            <div className="breadcrumbs">
              <SiteLink href="/">ForgeLabs</SiteLink><span>/</span>
              <SiteLink href="/urunler/">Ürünler</SiteLink>
              <span>/</span>
              <span>Stat Boost</span>
            </div>
            <div className="detail-app-name">
              <img
                src="/images/statboost-icon.webp"
                alt="Stat Boost simgesi"
                width="48"
                height="48"
              />
              <span>
                Stat Boost
                <span className="product-badge">
                  <span className="status-dot" /> GOOGLE PLAY’DE
                </span>
              </span>
            </div>
            <h1 tabIndex={-1}>
              Stat Boost.
              <br />
              <span>Antrenman</span>
              <br />
              <em>takibi.</em>
            </h1>
            <p>
              Stat Boost, Android için antrenman takip uygulaması.
              <br />
              Ağırlık, set ve tekrarlarını kaydet; bir öncekiyle karşılaştır.
            </p>
          </Reveal>
          <Reveal className="detail-hero-actions">
            <StoreLink />
            <TextLink href="/urunler/stat-boost/deneyim/">Deneyim merkezini aç</TextLink>
            <a href="#statboost" className="text-link">
              İçeride neler var? <ArrowDown size={16} />
            </a>
          </Reveal>
          <span className="detail-hero-note mono">
            ANDROID / UYGULAMA İÇİ SATIN ALMA
          </span>
        </div>
        <TiltCard className="detail-hero-art">
          <div className="detail-orbits" />
          <div className="detail-device">
            <AppScreen kind="dashboard" eager />
          </div>
          <span className="detail-float-top">
            <Trophy size={18} />
            KENDİ REKORUNUN PEŞİNDEN.
          </span>
          <span className="detail-float-bottom">
            <BarChart3 size={18} /> Gelişim, görünür.
          </span>
        </TiltCard>
      </section>
      <ProductShowcase />
      <section className="capabilities-section section-space">
        <div className="wrap">
          <Reveal className="section-topline">
            <Eyebrow>ANTRENMANIN ETRAFINDAKİ HER ŞEY</Eyebrow>
            <span className="mono">MORE THAN A LOGBOOK.</span>
          </Reveal>
          <div className="capability-grid">
            {[
              [
                Trophy,
                "Kişisel rekorlar",
                "En yüksek ağırlık, hacim ve tekrar rekorlarını takip et. Kendi gelişimine odaklan.",
              ],
              [
                Gauge,
                "Zorluk derecesi",
                "RPE ve dinlenme süreleriyle setlerine bağlam ekle; sadece sayıyı değil, eforunu da hatırla.",
              ],
              [
                WifiOff,
                "Çevrimdışı kayıt",
                "Bağlantı kesilse de antrenmanını kaydetmeye devam et.",
              ],
              [
                Droplets,
                "Su takibi",
                "Gün içinde içtiğin suyu uygulama içinden takip et.",
              ],
              [
                Utensils,
                "Öğün takibi",
                "Öğünlerini kaydet, beslenme takibini antrenman düzeninle birlikte düşün.",
              ],
              [
                BarChart3,
                "Gelişim analizi",
                "Hacim, egzersiz gelişimi ve kas grupları üzerinden antrenmanlarına daha geniş bir açıdan bak.",
              ],
            ].map(([Icon, title, text], i) => (
              <Reveal key={title}>
                <span className="mono">0{i + 1}</span>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
          <p className="product-availability-note">
            Özelliklerin kapsamı uygulama sürümüne ve satın alma seçeneklerine
            göre değişebilir. Güncel bilgi için Google Play sayfasını ve
            uygulama içi açıklamaları incele.
          </p>
        </div>
      </section>
      <section className="wrap app-lab-banner">
        <Reveal>
          <Eyebrow>İNDİRMEDEN ÖNCE BİR DOKUNUŞ</Eyebrow>
          <h2>Bir setle başla.</h2>
          <p>
            Örnek antrenman demosunda ağırlığını seç, setini tamamla ve hacmin
            nasıl değiştiğini gör.
          </p>
          <TextLink href="/lab/#deneyim">Lab’de deneyimle</TextLink>
        </Reveal>
        <div className="mini-set-art" aria-hidden="true">
          <span>
            60<span>KG</span>
          </span>
          <div>
            01 <i /> 02 <i /> 03 <i /> 04
          </div>
        </div>
      </section>
      <FAQ />
      <section className="wrap fitness-product-note"><h2>Antrenman takibine nereden başlamalı?</h2><p>Önce tutarlı bir günlük oluştur, sonra aynı egzersizin kayıtlarını karşılaştır. Fitness rehberlerimizde örnekler ve hesaplama aracı seni bekliyor.</p><TextLink href="/fitness/">Antrenman takibi rehberlerini keşfet</TextLink></section>
      <NextPage
        label="ÜRÜN DESTEĞİ VE GERİ BİLDİRİM"
        title="Birlikte daha iyiye."
        href="/iletisim/"
      />
    </>
  );
}
