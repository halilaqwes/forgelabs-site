import { useState } from "react";
import {
  ArrowRight,
  Check,
  Dumbbell,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import { Reveal } from "../ui";
const number = new Intl.NumberFormat("tr-TR");

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

export default function TrainingDemo() {
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
