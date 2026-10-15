import { useEffect, useRef, useState } from "react";
import { motion as Motion, useScroll, useSpring } from "framer-motion";
import { Header, Footer } from "./components/Layout";
import { MotionSettings, usePrefersReducedMotion } from "./motion-settings";
import { useLocation } from "./router";
import {
  getRoute,
  normalizePath,
  notFound,
  ORIGIN,
  routeHref,
} from "./site-data";
import { RouteEntrance } from "./ui";
import Home from "./pages/Home";
import Products from "./pages/Products";
import StatBoost from "./pages/StatBoost";
import Studio from "./pages/Studio";
import Lab from "./pages/Lab";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const pages = {
  "/": Home,
  "/urunler": Products,
  "/urunler/stat-boost": StatBoost,
  "/studio": Studio,
  "/lab": Lab,
  "/iletisim": Contact,
};

export default function App({ initialPath = "/" }) {
  const location = useLocation(initialPath);
  const path = normalizePath(location.split(/[?#]/)[0]);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const firstLocation = useRef(true);
  const Page = pages[path] || NotFound;
  useEffect(() => {
    const meta = getRoute(path) || notFound;
    document.title = meta.title;
    const url = ORIGIN + routeHref(path);
    const set = (selector, content) =>
      document.querySelector(selector)?.setAttribute("content", content);
    set('meta[name="description"]', meta.description);
    set('meta[property="og:title"]', meta.title);
    set('meta[property="og:description"]', meta.description);
    set('meta[property="og:url"]', url);
    set('meta[name="twitter:title"]', meta.title);
    set('meta[name="twitter:description"]', meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    const hash = location.includes("#") ? location.split("#")[1] : "";
    const frame = requestAnimationFrame(() => {
      if (hash)
        document.getElementById(hash)?.scrollIntoView({ behavior: "instant" });
      else if (!firstLocation.current)
        window.scrollTo({ top: 0, behavior: "instant" });
      if (!firstLocation.current && !hash)
        document.querySelector("main h1")?.focus({ preventScroll: true });
      firstLocation.current = false;
    });
    return () => cancelAnimationFrame(frame);
  }, [location, path]);
  return (
    <MotionSettings value={{ paused, reduced }}>
      <div
        className={`site${paused ? " motion-paused" : ""}${reduced ? " reduced-motion" : ""}`}
      >
        <a className="skip-link" href="#main">
          İçeriğe geç
        </a>
        <Motion.div
          className="page-progress"
          aria-hidden="true"
          style={{ scaleX: reduced ? scrollYProgress : scaleX }}
        />
        <Header key={`header-${path}`} path={path} />
        <RouteEntrance key={`page-${path}`}>
          <Page />
        </RouteEntrance>
        <Footer
          paused={paused}
          onToggleMotion={() => setPaused((value) => !value)}
        />
      </div>
    </MotionSettings>
  );
}
