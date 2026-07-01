"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Service = {
  num: string;
  name: string;
  desc: string;
  price: string;
  img: string;
};

const SERVICES: Service[] = [
  {
    num: "01",
    name: "Cut & Style",
    desc: "Shaped to your hair, your face, your week.",
    price: "from ₨ 1,200",
    img: "/home/7.jpeg",
  },
  {
    num: "02",
    name: "Colour & Balayage",
    desc: "Lived-in colour, hand-painted.",
    price: "from ₨ 3,500",
    img: "/home/4.jpeg",
  },
  {
    num: "03",
    name: "Bridal & Occasion",
    desc: "An unhurried morning that's only yours.",
    price: "on request",
    img: "/home/3.jpeg",
  },
  {
    num: "04",
    name: "Treatments & Care",
    desc: "Bond repair, gloss and scalp rituals.",
    price: "from ₨ 900",
    img: "/home/1.jpeg",
  },
  {
    num: "05",
    name: "Beard & Grooming",
    desc: "Hot-towel finish, straight-razor edge.",
    price: "from ₨ 600",
    img: "/home/2.jpg",
  },
];

export function Services() {
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

        gsap.from("[data-card]", {
          yPercent: 14,
          autoAlpha: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-cards]", start: "top 80%" },
        });

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-linen px-gutter py-28 md:py-40"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-clay text-[0.65rem] tracking-[0.22em] uppercase">
          (What we do)
        </span>
        <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
          03 / Services
        </span>
      </div>

      <h2
        ref={heading}
        id="services-heading"
        className="mt-10 md:mt-16 font-display font-light text-ink tracking-[-0.015em]"
        style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
      >
        The craft, <span className="italic text-clay">priced plainly.</span>
      </h2>

      <div
        data-cards
        className="mt-14 md:mt-20 grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16"
      >
        {SERVICES.map((s) => (
          <Link key={s.num} href="/book" data-card className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
              <Image
                src={s.img}
                alt={s.name}
                fill
                // sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              {/* Warm clay wash so the cards read sun-baked, not catalogue. */}
              <div className="absolute inset-0 bg-clay/20 mix-blend-multiply" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 to-transparent" />

              <span className="absolute top-3 left-3 text-canvas/85 text-[0.6rem] tracking-[0.2em] tabular-nums">
                {s.num}
              </span>
              <span className="absolute bottom-3 right-3 bg-clay text-canvas text-[0.62rem] tracking-[0.08em] tabular-nums whitespace-nowrap px-2 py-1">
                {s.price}
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-ink/15 pt-3">
              <h3
                className="font-display font-light text-ink leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.85rem)" }}
              >
                {s.name}
              </h3>
              <span
                aria-hidden="true"
                className="text-stone shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:opacity-0 md:-translate-x-1 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:text-clay"
              >
                ↗
              </span>
            </div>
            <p className="mt-2 text-ink/60 text-[0.82rem] leading-relaxed">
              {s.desc}
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/services"
        className="group mt-14 md:mt-20 inline-flex items-baseline gap-2 text-clay text-[0.68rem] tracking-[0.22em] uppercase"
      >
        <span className="border-b border-clay pb-1 transition-colors duration-300 group-hover:text-clay-deep group-hover:border-clay-deep">
          View the full menu &amp; pricing
        </span>
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </Link>
    </section>
  );
}
