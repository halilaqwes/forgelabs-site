import { useState } from "react";
import {
  Blocks,
  Waves,
  Orbit,
  ArrowUpRight,
  RotateCcw,
  MousePointer2,
  ShieldCheck,
} from "lucide-react";
import ForgeField from "../components/ForgeField";
import TrainingDemo from "../components/TrainingDemo";
import { Eyebrow, NextPage, PageIntro, Reveal } from "../ui";
import { useMotionSettings } from "../motion-settings";

const modes = [
  ["forge", "Forge", Blocks],
  ["wave", "Dalga", Waves],
  ["orbit", "Yörünge", Orbit],
];
export default function Lab() {
  const [mode, setMode] = useState("forge");
  const [burst, setBurst] = useState(0);
  const { paused, reduced } = useMotionSettings();
  const stopped = paused || reduced;
  return (
    <>
      <PageIntro
        number="03"
        eyebrow="FORGELABS LAB"
        title="Ya şöyle"
        accent="olsaydı?"
        description="Bazen bir ürün, bazen yalnızca iyi bir soru. Burası fikirlerle oynadığımız, hareketi araştırdığımız ve denemekten çekinmediğimiz yer."
      />
      <section className="wrap lab-experiment">
        <div className="experiment-topbar">
          <div>
            <span className="status-dot" />
            <span className="mono">EXPERIMENT 001 / BIT FOUNDRY</span>
          </div>
          <span className="experiment-state mono">
            {stopped ? "STATİK GÖRÜNÜM" : "TARAYICINDA CANLI"}
          </span>
        </div>
        <div className={`lab-canvas mode-${mode}`}>
          <ForgeField mode={mode} burst={burst} />
          <div className="lab-canvas-title">
            <span className="mono">FORM / {mode.toUpperCase()}</span>
            <h2>
              Her şey
              <br />
              bir <em>bit</em> ile başlar.
            </h2>
          </div>
          <span className="lab-canvas-hint">
            <MousePointer2 size={14} /> Fareyle ışığın yönünü değiştir.
          </span>
          <div className="binary-strip" aria-hidden="true">
            01000110
            <br />
            01001100
            <br />
            00101011
            <br />
            01000010
          </div>
        </div>
        <div className="experiment-controls">
          <div
            className="mode-switch"
            role="group"
            aria-label="Parçacık biçimi"
          >
            {modes.map(([value, label, Icon]) => (
              <button
                key={value}
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
          <button
            className="scatter-button"
            disabled={stopped}
            onClick={() => setBurst((n) => n + 1)}
          >
            <RotateCcw size={14} /> Dağıt ve yeniden oluştur{" "}
            <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="experiment-caption">
          <p>
            Küçük kareler, ortak bir form. Biraz derinlik, biraz ışık, biraz
            fizik. Şekli değiştir, parçaları dağıt ve nasıl yeniden
            buluştuklarını izle.
          </p>
          <span className="mono">CANVAS / 3D PROJECTION / SPRING MOTION</span>
        </div>
      </section>
      <section className="wrap lab-divider">
        <Reveal>
          <Eyebrow>EXPERIMENT 002 / ÜRÜNÜ DENEYİMLE</Eyebrow>
          <p>Bir etkileşim, bir ürünü anlatmanın en kısa yolu olabilir.</p>
        </Reveal>
      </section>
      <TrainingDemo />
      <section className="wrap lab-principles section-space">
        <Reveal>
          <ShieldCheck />
          <h3>Burada yalnızca deney var.</h3>
          <p>
            Deneyler tarayıcında çalışır. Bir uygulama hesabına bağlanmaz,
            sağlık verisi toplamaz ve gerçek antrenman kaydetmez. Demodaki
            değerler örnektir.
          </p>
        </Reveal>
        <Reveal>
          <Waves />
          <h3>Herkes için aynı hızda değil.</h3>
          <p>
            Hareket azaltma tercihini dikkate alıyoruz. İstersen sayfanın
            altındaki kontrolle animasyonları durdurabilir, deneyleri statik
            olarak inceleyebilirsin.
          </p>
        </Reveal>
      </section>
      <NextPage
        label="MERAKTAN DOĞAN GERÇEK ÜRÜNLER"
        title="Deneyden günlük hayata."
        href="/urunler/"
      />
    </>
  );
}
