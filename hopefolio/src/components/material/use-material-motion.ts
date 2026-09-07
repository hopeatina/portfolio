import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (change: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", change);
  return () => media.removeEventListener("change", change);
};
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => true;

/** Keep the living material in sync with changes to the system preference. */
export function useMaterialReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
