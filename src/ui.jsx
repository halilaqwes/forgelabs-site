import { useEffect, useRef } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useMotionSettings } from "./motion-settings";
import { STORE } from "./site-data";
import SiteLink from "./SiteLink";

export function ForgeMark({ className = "" }) {
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
export function PlayMark() {
  return (
    <svg viewBox="0 0 24 26" fill="currentColor" aria-hidden="true">
      <path d="m2 1 14 12L2 25V1Zm16 10 4 2-4 2-2-2 2-2ZM4 0l13 8-3 3L4 0Zm0 26 10-11 3 3L4 26Z" />
    </svg>
  );
}
export function StoreLink({ className = "", light = false }) {
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
export function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const { paused, reduced } = useMotionSettings();
  useEffect(() => {
    const element = ref.current;
    if (paused || reduced) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          element.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [paused, reduced]);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}s` }}
    >
      {children}
    </div>
  );
}
export function AppScreen({ kind = "dashboard", eager = false }) {
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
export function Eyebrow({ children, number }) {
  return (
    <span className="eyebrow">
      <span className="tiny-square" />
      {number && <span>{number} /</span>}
      {children}
    </span>
  );
}
export function PageIntro({
  number,
  eyebrow,
  title,
  accent,
  description,
  children,
  trail = [],
}) {
  return (
    <section className="page-intro wrap">
      <Reveal>
        <div className="breadcrumbs">
          <SiteLink href="/">ForgeLabs</SiteLink>
          <span>/</span>
          {trail.map(item => <span key={item.href}><SiteLink href={item.href}>{item.label}</SiteLink><span> / </span></span>)}
          <span>{eyebrow}</span>
        </div>
        <Eyebrow number={number}>{eyebrow}</Eyebrow>
        <h1 tabIndex={-1}>
          {title}
          {accent && (
            <>
              <br />
              <span className="serif-accent">{accent}</span>
            </>
          )}
        </h1>
        <p>{description}</p>
        {children}
      </Reveal>
    </section>
  );
}
export function TextLink({ href, children, className = "" }) {
  return (
    <SiteLink className={`text-link ${className}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </SiteLink>
  );
}
export function TiltCard({ children, className = "", strength = 6 }) {
  const { paused, reduced } = useMotionSettings();
  const ref = useRef(null);
  const move = (event) => {
    if (paused || reduced || event.pointerType === "touch") return;
    const box = ref.current.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    ref.current.style.setProperty("--tilt-x", `${(0.5 - y) * strength}deg`);
    ref.current.style.setProperty("--tilt-y", `${(x - 0.5) * strength}deg`);
    ref.current.style.setProperty("--spot-x", `${x * 100}%`);
    ref.current.style.setProperty("--spot-y", `${y * 100}%`);
  };
  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onPointerMove={move}
      onPointerLeave={() => {
        ref.current.style.setProperty("--tilt-x", "0deg");
        ref.current.style.setProperty("--tilt-y", "0deg");
      }}
    >
      {children}
    </div>
  );
}
export function RouteEntrance({ children }) {
  const { reduced, paused } = useMotionSettings();
  return (
    <Motion.main
      id="main"
      tabIndex={-1}
      initial={false}
      animate={{ opacity: 1 }}
      className={reduced || paused ? "route-page" : "route-page page-enter"}
    >
      {children}
    </Motion.main>
  );
}
export function NextPage({ label, title, href }) {
  return (
    <section className="next-page">
      <div className="wrap">
        <Eyebrow>SIRADAKİ ADIM</Eyebrow>
        <SiteLink href={href}>
          <div>
            <span>{label}</span>
            <h2>{title}</h2>
          </div>
          <ArrowRight />
        </SiteLink>
      </div>
    </section>
  );
}
