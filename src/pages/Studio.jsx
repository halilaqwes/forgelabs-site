import { ArrowUpRight, Search, PenTool, Code2, Orbit } from "lucide-react";
import {
  Eyebrow,
  ForgeMark,
  NextPage,
  PageIntro,
  Reveal,
  TextLink,
  TiltCard,
} from "../ui";

const stages = [
  [
    Search,
    "Anlamak.",
    "Bir özellik listesiyle değil, doğru soruyla başlarız. Kim kullanacak? Nerede? Hangi anı kolaylaştıracak?",
    "İHTİYAÇ / BAĞLAM / ODAK",
  ],
  [
    PenTool,
    "Şekillendirmek.",
    "Akışları ve arayüzü birlikte düşünürüz. Bir ekranın ne gösterdiği kadar, bir sonraki adımın ne kadar açık olduğu da önemlidir.",
    "AKIŞ / PROTOTİP / ETKİLEŞİM",
  ],
  [
    Code2,
    "Üretmek.",
    "Tasarımı çalışan bir ürüne dönüştürürüz. Detayları, performansı ve küçük ekranlardaki deneyimi geliştirmenin bir parçası sayarız.",
    "KOD / PERFORMANS / ERİŞİLEBİLİRLİK",
  ],
  [
    Orbit,
    "Geliştirmek.",
    "Gerçek kullanım, yeni sorular getirir. Geri bildirimleri dinler, önceliklendirir ve ürünün bir sonraki hâlini oluştururuz.",
    "YAYIN / GERİ BİLDİRİM / İYİLEŞTİRME",
  ],
];

export default function Studio() {
  return (
    <>
      <PageIntro
        number="02"
        eyebrow="STÜDYO"
        title="Bir fikri"
        accent="gerçeğe dövmek."
        description="Forge, şekil vermek demek. Labs ise merak etmeyi bırakmamak. Bizim işimiz bu iki kelimenin buluştuğu yerde başlıyor."
      />
      <section className="wrap studio-origin">
        <Reveal className="studio-origin-copy">
          <Eyebrow>NEDEN FORGELABS?</Eyebrow>
          <h2>
            Bir şey daha
            <br />
            <span className="muted">yapmak değil.</span>
            <br />
            Bir şeyi <em>daha iyi</em> yapmak.
          </h2>
          <p>
            ForgeLabs, gerçek ihtiyaçlardan yola çıkan bağımsız bir dijital ürün
            stüdyosu. Tasarım ve yazılımı ayrı adımlar olarak değil, aynı fikri
            olgunlaştıran iki araç olarak görüyoruz.
          </p>
          <p>
            İlk ürünümüz Stat Boost, bu yaklaşımın antrenman dünyasındaki
            karşılığı: yapılan işi kaydetmek, gelişimi görmek ve bir sonraki
            adımı daha bilinçli atmak.
          </p>
          <TextLink href="/urunler/stat-boost/">
            Yaklaşımın ürüne dönüştüğü yer
          </TextLink>
        </Reveal>
        <TiltCard className="blueprint-sculpture">
          <div className="blueprint-top mono">
            <span>FORGE / STRUCTURE STUDY</span>
            <span>01—03</span>
          </div>
          <div className="sculpture-stack" aria-hidden="true">
            <div>
              <ForgeMark />
            </div>
            <div>
              <ForgeMark />
            </div>
            <div>
              <ForgeMark />
            </div>
          </div>
          <div className="blueprint-measure measure-x" />
          <div className="blueprint-measure measure-y" />
          <span className="blueprint-caption mono">MERAK → TASARIM → ÜRÜN</span>
        </TiltCard>
      </section>
      <section className="process-section section-space">
        <div className="wrap">
          <Reveal className="process-heading">
            <Eyebrow>NASIL ÇALIŞIYORUZ?</Eyebrow>
            <h2>
              İyi bir ürün,
              <br />
              tek bir anda <em>oluşmaz.</em>
            </h2>
            <p>
              Fikirden yayına uzanan bir döngü.
              <br />
              Her adım, bir sonrakini daha iyi kılar.
            </p>
          </Reveal>
          <div className="process-timeline">
            {stages.map(([Icon, title, text, tags], i) => (
              <Reveal className="process-step" key={title}>
                <div className="process-rail">
                  <span className="mono">0{i + 1}</span>
                  <span className="process-light-node" />
                </div>
                <div className="process-step-content">
                  <Icon />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="mono">{tags}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="studio-manifesto manifesto-band">
        <div className="wrap">
          <Eyebrow>STÜDYO NOTLARI / 001</Eyebrow>
          <h2>
            İyi tasarım fark edilir.
            <br />
            <em>İyi deneyim hatırlanır.</em>
          </h2>
          <div className="manifesto-notes">
            {[
              [
                "Sade, eksik demek değil.",
                "Gereksiz olanı çıkarmak, önemli olanın daha net duyulmasını sağlar.",
              ],
              [
                "Hareketin bir sebebi olmalı.",
                "Bir animasyon yön gösterir, bir durumu açıklar ya da markanın karakterini hissettirir.",
              ],
              [
                "İnsan, ölçümüz.",
                "İyi bir deneyim; klavyede, küçük ekranda ve daha az hareket tercih edildiğinde de çalışır.",
              ],
            ].map(([title, text]) => (
              <Reveal key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap studio-invite section-space">
        <Reveal>
          <Eyebrow>AÇIK BİR KAPI</Eyebrow>
          <h2>
            Benzer sorular
            <br />
            soruyorsak, <em>konuşalım.</em>
          </h2>
          <p>
            Bir ürün fikri, bir geri bildirim veya üzerinde düşünmeye değer bir
            problem. İyi sohbetlerin bir şeyleri başlatabileceğine inanıyoruz.
          </p>
          <TextLink href="/iletisim/">
            Merhaba de <ArrowUpRight />
          </TextLink>
        </Reveal>
      </section>
      <NextPage
        label="FİKİRLERİN OYUN ALANI"
        title="Biraz da deneyelim."
        href="/lab/"
      />
    </>
  );
}
