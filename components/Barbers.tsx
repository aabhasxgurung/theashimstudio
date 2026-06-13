"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Artist = {
  num: string;
  name: string;
  role: string;
  specialty: string;
  // object-position so the single source image is framed differently per card
  pos: string;
  offset: string; // vertical offset on desktop for an editorial rhythm
};

const ARTISTS: Artist[] = [
  {
    num: "01",
    name: "Ashim Rai",
    role: "Founder · Master Stylist",
    specialty: "Precision cuts & restructures",
    pos: "50% 30%",
    offset: "md:mt-0",
  },
  {
    num: "02",
    name: "Priya Limbu",
    role: "Senior Colourist",
    specialty: "Balayage & tonal correction",
    pos: "50% 50%",
    offset: "md:mt-20",
  },
  {
    num: "03",
    name: "Dorje Sherpa",
    role: "Barber",
    specialty: "Fades, beards & straight-razor",
    pos: "50% 65%",
    offset: "md:mt-8",
  },
];

export function Barbers() {
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

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

        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
          const img = card.querySelector("[data-card-img]");

          gsap.from(card, {
            yPercent: 12,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          });

          // Gentle parallax inside each frame.
          gsap.fromTo(
            img,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="artists"
      aria-labelledby="artists-heading"
      className="bg-canvas px-gutter py-28 md:py-40"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
          (The hands behind it)
        </span>
        <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
          03 — Artists
        </span>
      </div>

      <h2
        ref={heading}
        id="artists-heading"
        className="mt-10 md:mt-16 font-display font-light text-ink tracking-[-0.015em]"
        style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
      >
        A small bench of <span className="italic text-stone">specialists.</span>
      </h2>

      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
        {ARTISTS.map((a) => (
          <article key={a.num} data-card className={`group ${a.offset}`}>
            <div className="relative aspect-[3/4] overflow-hidden bg-linen">
              <div data-card-img className="absolute inset-0 -top-[10%] h-[120%]">
                <Image
                  src="/home/bg.jpg"
                  alt={`${a.name}, ${a.role}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectPosition: a.pos }}
                  className="object-cover grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:grayscale-0 md:group-hover:scale-[1.03]"
                />
              </div>

              <span className="absolute top-4 left-4 text-canvas/90 text-[0.65rem] tracking-[0.2em] mix-blend-difference">
                {a.num}
              </span>
            </div>

            <div className="mt-5 flex items-baseline justify-between border-t border-ink/15 pt-4">
              <div>
                <h3
                  className="font-display font-light text-ink leading-none"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                >
                  {a.name}
                </h3>
                <p className="mt-2 text-stone text-[0.62rem] tracking-[0.2em] uppercase">
                  {a.role}
                </p>
              </div>
            </div>
            <p className="mt-3 text-ink/60 text-[0.82rem] leading-relaxed">
              {a.specialty}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
