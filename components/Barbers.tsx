"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Artist = {
  num: string;
  name: string;
  role: string;
  specialty: string;
  img: string;
  pos: string; // object-position: frame each crop close and intimate
  offset: string; // vertical offset on desktop for an editorial rhythm
};

const ARTISTS: Artist[] = [
  {
    num: "01",
    name: "Ashim Rai",
    role: "Founder · Master Stylist",
    specialty: "Precision cuts & restructures",
    img: "/home/owner.jpeg",
    pos: "50% 22%",
    offset: "md:mt-0",
  },
  {
    num: "02",
    name: "Priya Limbu",
    role: "Senior Colourist",
    specialty: "Balayage & tonal correction",
    img: "/home/6.jpeg",
    pos: "50% 30%",
    offset: "md:mt-24",
  },
  {
    num: "03",
    name: "Dorje Sherpa",
    role: "Barber",
    specialty: "Fades, beards & straight-razor",
    img: "/home/7.jpeg",
    pos: "50% 28%",
    offset: "md:mt-10",
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
            { yPercent: -8 },
            {
              yPercent: 8,
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
      className="bg-ink text-canvas px-gutter py-28 md:py-40"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-ochre text-[0.65rem] tracking-[0.22em] uppercase">
          (The hands behind it)
        </span>
        <span className="text-canvas/50 text-[0.65rem] tracking-[0.22em] uppercase">
          04 / Artists
        </span>
      </div>

      <h2
        ref={heading}
        id="artists-heading"
        className="mt-10 md:mt-16 font-display font-light text-canvas tracking-[-0.015em]"
        style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
      >
        A small bench of <span className="italic text-ochre">specialists.</span>
      </h2>

      <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12">
        {ARTISTS.map((a) => (
          <article key={a.num} data-card className={`group ${a.offset}`}>
            {/* Tight, close crop: intimate, not a catalogue headshot. Name
                rides over the lower edge on a warm shadow. */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#3a2519]">
              <div
                data-card-img
                className="absolute inset-0 -top-[8%] h-[116%]"
              >
                <Image
                  src={a.img}
                  alt={`${a.name}, ${a.role}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectPosition: a.pos }}
                  className="object-cover scale-[1.06] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-[1.12]"
                />
              </div>

              <div className="absolute inset-0 bg-clay/15 mix-blend-multiply" />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/70 to-transparent" />

              <span className="absolute top-4 left-4 text-canvas/90 text-[0.6rem] tracking-[0.2em] tabular-nums">
                {a.num}
              </span>

              <div className="absolute bottom-4 left-4 right-4">
                <h3
                  className="font-display font-light text-canvas leading-none"
                  style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)" }}
                >
                  {a.name}
                </h3>
                <p className="mt-2 text-canvas/70 text-[0.6rem] tracking-[0.2em] uppercase">
                  {a.role}
                </p>
              </div>
            </div>

            <p className="mt-4 text-canvas/55 text-[0.82rem] leading-relaxed">
              {a.specialty}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
