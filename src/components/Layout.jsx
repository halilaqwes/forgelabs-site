import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X, Pause, Play, Mail } from "lucide-react";
import { ForgeMark } from "../ui";
import SiteLink from "../SiteLink";
import { EMAIL, navigation, routeHref } from "../site-data";

export function Header({ path }) {
  const [open, setOpen] = useState(false);
  const panel = useRef(null),
    toggle = useRef(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const items = () => [
      toggle.current,
      ...panel.current.querySelectorAll("a"),
    ];
    items()[1]?.focus();
    const keydown = (event) => {
      const list = items();
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current.focus();
      }
      if (
        event.key === "Tab" &&
        event.shiftKey &&
        document.activeElement === list[0]
      ) {
        event.preventDefault();
        list.at(-1).focus();
      }
      if (
        event.key === "Tab" &&
        !event.shiftKey &&
        document.activeElement === list.at(-1)
      ) {
        event.preventDefault();
        list[0].focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", keydown);
    };
  }, [open]);
  const active = (target) =>
    path === target || (["/urunler", "/fitness"].includes(target) && path.startsWith(`${target}/`));
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <SiteLink
          className="wordmark"
          href="/"
          aria-label="ForgeLabs ana sayfa"
          onClick={() => setOpen(false)}
        >
          <ForgeMark />
          <span>
            forge<span className="wordmark-light">labs</span>
            <span className="wordmark-dot">+</span>
          </span>
        </SiteLink>
        <nav className="desktop-nav" aria-label="Ana menü">
          {navigation
            .filter((route) => route.path !== "/iletisim")
            .map((route) => (
              <SiteLink
                href={routeHref(route.path)}
                key={route.path}
                aria-current={active(route.path) ? "page" : undefined}
              >
                {route.label}
                {route.path === "/lab" && <span className="nav-lab-dot" />}
              </SiteLink>
            ))}
        </nav>
        <SiteLink className="header-contact" href="/iletisim/">
          Birlikte üretelim <ArrowUpRight size={16} />
        </SiteLink>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls={open ? "mobile-nav" : undefined}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          ref={panel}
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobil menü"
        >
          {navigation.map((route, index) => (
            <SiteLink
              href={routeHref(route.path)}
              key={route.path}
              aria-current={active(route.path) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              {route.label}
              <ArrowUpRight />
            </SiteLink>
          ))}
          <p className="mobile-menu-note">BAĞIMSIZ FİKİRLER. GERÇEK ÜRÜNLER.</p>
        </nav>
      )}
    </header>
  );
}

export function Footer({ paused, onToggleMotion }) {
  return (
    <footer className="site-footer footer-expanded">
      <div className="wrap">
        <div className="footer-statement">
          <SiteLink href="/iletisim/">
            Sıradaki iyi fikir,
            <br />
            <span>bir merhabayla başlar.</span>
            <ArrowUpRight />
          </SiteLink>
          <a className="footer-mail" href={`mailto:${EMAIL}`}>
            <Mail size={15} />
            {EMAIL}
          </a>
        </div>
        <div className="footer-sitemap">
          <SiteLink
            href="/"
            className="wordmark"
            aria-label="ForgeLabs ana sayfa"
          >
            <ForgeMark />
            <span>
              forge<span className="wordmark-light">labs</span>
            </span>
          </SiteLink>
          <p>
            Merakla tasarlandı.
            <br />
            İleri gitmek için üretildi.
          </p>
          <nav aria-label="Alt menü">
            {navigation.map((route) => (
              <SiteLink href={routeHref(route.path)} key={route.path}>
                {route.label}
              </SiteLink>
            ))}
            <a href="/privacy.html">Gizlilik</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ForgeLabs</span>
          <span className="footer-signature mono">CRAFTED WITH CURIOSITY.</span>
          <button
            className="motion-toggle"
            aria-pressed={paused}
            onClick={onToggleMotion}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
            {paused ? "Hareketi aç" : "Hareketi durdur"}
          </button>
        </div>
      </div>
    </footer>
  );
}
