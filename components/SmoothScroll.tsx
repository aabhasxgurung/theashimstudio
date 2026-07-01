"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Drives Lenis from GSAP's ticker (single rAF loop) and keeps ScrollTrigger
 * in sync with the virtualised scroll position. This is the integration that
 * gives the whole site its weighted, "site of the year" inertia.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // One rAF loop for everything; GSAP ticker feeds Lenis. Read the instance
    // lazily each frame so the loop is robust to Lenis initialising a tick late
    // (bailing here once would freeze scrolling entirely with autoRaf: false).
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  // Keep ScrollTrigger in sync with the virtualised scroll position once the
  // Lenis instance exists, and refresh once fonts settle so scrubbed/triggered
  // sections measure against the real metrics.
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
