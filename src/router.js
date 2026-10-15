import { useSyncExternalStore } from "react";
const subscribe = (callback) => {
  window.addEventListener("popstate", callback);
  window.addEventListener("forge:navigate", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("forge:navigate", callback);
  };
};
const snapshot = () =>
  window.location.pathname + window.location.search + window.location.hash;
export function useLocation(initialPath = "/") {
  return useSyncExternalStore(subscribe, snapshot, () => initialPath);
}
export function navigate(href) {
  if (href === snapshot()) {
    const hash = new URL(href, window.location.origin).hash.slice(1);
    if (hash)
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    else {
      const reduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.querySelector(".site")?.classList.contains("motion-paused");
      window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
      document.querySelector("main h1")?.focus({ preventScroll: true });
    }
    return;
  }
  window.history.pushState({}, "", href);
  window.dispatchEvent(new Event("forge:navigate"));
}
