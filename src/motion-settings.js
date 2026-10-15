import { createContext, useContext, useSyncExternalStore } from "react";
export const MotionSettings = createContext({ paused: false, reduced: false });
export const useMotionSettings = () => useContext(MotionSettings);
const mediaQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (callback) => {
  const media = window.matchMedia(mediaQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(mediaQuery).matches,
    () => false,
  );
}
