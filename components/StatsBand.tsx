"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const STATS = [
  { value: "15", suffix: "yrs", label: "On the chair" },
  { value: "8k", suffix: "+", label: "Heads of hair" },
  { value: "1", suffix: "", label: "Studio, by appointment" },
];

export function StatsBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-stat]", {
          y: 18,
          autoAlpha: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        });
        gsap.from("[data-band-line]", {
          autoAlpha: 0,
          y: 12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-label="By the numbers"
      className="bg-clay text-canvas px-gutter py-16 md:py-24"
    >
      <p
        data-band-line
        className="max-w-2xl font-display font-light italic leading-[1.15] text-canvas"
        style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)" }}
      >
        Not a salon you pass through, but one you settle into.
      </p>

      <dl className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 border-t border-canvas/25">
        {STATS.map((s) => (
          <div
            key={s.label}
            data-stat
            className="flex items-baseline gap-4 py-6 md:py-8 border-b border-canvas/25 md:border-b-0 md:border-r md:last:border-r-0 md:pr-8"
          >
            <dt
              className="font-display font-light leading-none text-canvas"
              style={{ fontSize: "clamp(2.75rem, 6.5vw, 5rem)" }}
            >
              {s.value}
              <span className="text-canvas/55 text-[0.4em] align-top ml-1">
                {s.suffix}
              </span>
            </dt>
            <dd className="text-canvas/75 text-[0.62rem] tracking-[0.22em] uppercase max-w-[8rem] leading-snug">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
