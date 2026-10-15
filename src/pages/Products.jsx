import { ArrowUpRight, Smartphone, RefreshCw, Layers3 } from "lucide-react";
import {
  AppScreen,
  Eyebrow,
  NextPage,
  PageIntro,
  Reveal,
  StoreLink,
  TiltCard,
} from "../ui";
import SiteLink from "../SiteLink";

export default function Products() {
  return (
    <>
      <PageIntro
        number="01"
        eyebrow="ÜRÜNLER"
        title="Bir ihtiyacı çözmek."
        accent="İyi bir başlangıç."
        description="Her ürünümüz, gündelik hayatta karşılaştığımız bir soruya verdiğimiz yanıt. İlk yanıtımız, antrenmanını daha anlamlı takip etmek için."
      />
      <section className="wrap catalog-section">
        <TiltCard className="catalog-product">
          <div className="catalog-art">
            <div className="catalog-orbit" />
            <div className="catalog-phone">
              <AppScreen kind="workout" eager />
            </div>
            <span className="catalog-serial mono">FL—001 / STAT BOOST</span>
            <span className="catalog-available">
              <span className="status-dot" /> YAYINDA
            </span>
          </div>
          <div className="catalog-copy">
            <Eyebrow>ANTRENMAN GÜNLÜĞÜ / ANDROID</Eyebrow>
            <h2>
              Stat Boost<span>↗</span>
            </h2>
            <p>
              Antrenmanın bittiğinde geriye sadece yorgunluk kalmasın. Set,
              tekrar, ağırlık ve kişisel rekorlarını takip et; bir sonraki
              antrenmanına daha bilinçli başla.
            </p>
            <ul className="plain-feature-list">
              <li>Hızlı set ve tekrar kaydı</li>
              <li>Gelişim grafikleri ve hacim analizi</li>
              <li>Antrenmanlarını paylaşabileceğin topluluk</li>
            </ul>
            <div className="catalog-actions">
              <SiteLink
                href="/urunler/stat-boost/"
                className="button button-lime"
              >
                Stat Boost’u keşfet <ArrowUpRight size={17} />
              </SiteLink>
              <StoreLink />
            </div>
            <span className="catalog-smallprint">
              Uygulama içi satın alma seçenekleri bulunur.
            </span>
          </div>
        </TiltCard>
      </section>
      <section className="wrap section-space">
        <Reveal className="section-topline">
          <Eyebrow>ÜRÜN YAPMA BİÇİMİMİZ</Eyebrow>
          <span className="mono">BUILT FOR EVERYDAY LIFE.</span>
        </Reveal>
        <div className="editorial-cards">
          {[
            [
              Smartphone,
              "Kullanıldığı yerde iyi.",
              "Bir spor salonunda, bir molada, günlük hayatın içinde. Kullanım bağlamını tasarımın merkezine alıyoruz.",
            ],
            [
              Layers3,
              "İhtiyacı kadar teknoloji.",
              "Bir özelliğin değeri, ne kadar karmaşık olduğunda değil; bir sorunu ne kadar iyi çözdüğünde.",
            ],
            [
              RefreshCw,
              "Yayınlandıktan sonra da.",
              "Bir ürünü yayına almak bizim için bir bitiş değil. Kullanım, geri bildirim ve iyileştirme döngüsünün başlangıcı.",
            ],
          ].map(([Icon, title, text]) => (
            <Reveal key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <NextPage
        label="ARKASINDAKİ STÜDYO"
        title="Nasıl düşünüyoruz?"
        href="/studio/"
      />
    </>
  );
}
