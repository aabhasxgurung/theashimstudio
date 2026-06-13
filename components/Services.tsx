"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Service = {
  num: string;
  name: string;
  desc: string;
  price: string;
};

const SERVICES: Service[] = [
  {
    num: "01",
    name: "Cut & Style",
    desc: "A consultation-led cut shaped to your hair, your face, your routine.",
    price: "from ₨ 1,200",
  },
  {
    num: "02",
    name: "Colour & Balayage",
    desc: "Lived-in colour, hand-painted dimension and tonal correction.",
    price: "from ₨ 3,500",
  },
  {
    num: "03",
    name: "Bridal & Occasion",
    desc: "Trial, day-of styling and an unhurried morning that's only yours.",
    price: "on request",
  },
  {
    num: "04",
    name: "Treatments & Care",
    desc: "Bond repair, gloss and scalp rituals to bring hair back to health.",
    price: "from ₨ 900",
  },
  {
    num: "05",
    name: "Beard & Grooming",
    desc: "Precision line-up, hot-towel finish and a proper straight-razor edge.",
    price: "from ₨ 600",
  },
];

export function Services() {
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const moveX = useRef<((v: number) => void) | null>(null);
  const moveY = useRef<((v: number) => void) | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(heading.current, {
          type: "lines",
          mask: "lines",
          linesClass: "leading-[1.05]",
        });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: heading.current, start: "top 82%" },
        });

        gsap.from("[data-row]", {
          yPercent: 60,
          autoAlpha: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-rows]", start: "top 80%" },
        });

        return () => split.revert();
      });

      // Cursor-following preview (only on fine pointers / no reduced motion).
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          moveX.current = gsap.quickTo(preview.current, "x", {
            duration: 0.55,
            ease: "expo.out",
          });
          moveY.current = gsap.quickTo(preview.current, "y", {
            duration: 0.55,
            ease: "expo.out",
          });
        }
      );
    },
    { scope: root }
  );

  const onMove = (e: React.MouseEvent) => {
    const bounds = root.current?.getBoundingClientRect();
    if (!bounds) return;
    moveX.current?.(e.clientX - bounds.left);
    moveY.current?.(e.clientY - bounds.top);
  };

  return (
    <section
      ref={root}
      id="services"
      aria-labelledby="services-heading"
      onMouseMove={onMove}
      className="relative bg-linen px-gutter py-28 md:py-40"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
          (What we do)
        </span>
        <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
          02 — Services
        </span>
      </div>

      <h2
        ref={heading}
        id="services-heading"
        className="mt-10 md:mt-16 font-display font-light text-ink tracking-[-0.015em]"
        style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
      >
        The craft, <span className="italic text-stone">priced plainly.</span>
      </h2>

      {/* Floating preview image */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block w-[18vw] max-w-[16rem] aspect-[3/4] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-ink/5"
        style={{
          opacity: active !== null ? 1 : 0,
          scale: active !== null ? 1 : 0.92,
          filter: active !== null ? "blur(0px)" : "blur(6px)",
          transition:
            "opacity 0.45s cubic-bezier(0.16,1,0.3,1), scale 0.45s cubic-bezier(0.16,1,0.3,1), filter 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Image
          src="/home/bg.jpg"
          alt=""
          fill
          sizes="18vw"
          className="object-cover"
        />
      </div>

      <ul data-rows className="mt-14 md:mt-24 border-t border-ink/15">
        {SERVICES.map((s, i) => (
          <li key={s.num} data-row className="overflow-hidden">
            <a
              href="#book"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-5 md:gap-10 border-b border-ink/15 py-7 md:py-9"
            >
              <span className="text-stone text-[0.65rem] tracking-[0.18em] tabular-nums pb-1">
                {s.num}
              </span>

              <span className="flex flex-col md:flex-row md:items-baseline md:gap-8">
                <span
                  className="font-display font-light text-ink leading-[0.95] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-3"
                  style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}
                >
                  {s.name}
                </span>
                <span className="mt-2 md:mt-0 max-w-sm text-ink/60 text-[0.82rem] leading-relaxed md:opacity-0 md:translate-y-1 md:transition md:duration-500 md:ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:opacity-100 md:group-hover:translate-y-0">
                  {s.desc}
                </span>
              </span>

              <span className="flex items-center gap-4 text-ink shrink-0 pb-1">
                <span className="text-[0.7rem] md:text-sm tracking-[0.08em] tabular-nums whitespace-nowrap">
                  {s.price}
                </span>
                <span
                  aria-hidden="true"
                  className="text-stone transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:opacity-0 md:-translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:text-ink"
                >
                  ↗
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
