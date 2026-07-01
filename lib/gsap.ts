// Single source of truth for GSAP + plugin registration.
// Importing from here guarantees plugins are registered exactly once,
// client-side only (GSAP touches `window` / `document`).
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

// Easing curves shared with the CSS layer; keep these in sync with
// the custom-property values defined in globals.css.
export const EASE_EXPO_OUT = "expo.out"; // cubic-bezier(0.16, 1, 0.3, 1)
export const EASE_EXPO_IN_OUT = "expo.inOut"; // cubic-bezier(0.77, 0, 0.175, 1)

export { gsap, ScrollTrigger, SplitText, useGSAP };
