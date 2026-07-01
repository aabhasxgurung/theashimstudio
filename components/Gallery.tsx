"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Tile = {
  src: string;
  alt: string;
  caption: string;
  span: string; // column span on desktop
  aspect: string; // mobile aspect ratio (desktop height comes from the row)
  /** "bw" is the deliberate bold black-and-white contrast beat. */
  tone: "warm" | "bw";
};

// Edge-to-edge mosaic on espresso. Fixed row heights + object-cover keep the
// strip tidy; tones stay warm except the one graphic black-and-white frame.
const ROW_ONE: Tile[] = [
  {
    src: "/home/10.jpg",
    alt: "The wash basin under warm light",
    caption: "The wash",
    span: "md:col-span-8",
    aspect: "aspect-[16/11]",
    tone: "warm",
  },
  {
    src: "/home/6.jpeg",
    alt: "Hand-painted colour in progress",
    caption: "Colour, by hand",
    span: "md:col-span-4",
    aspect: "aspect-[3/4]",
    tone: "warm",
  },
];

const ROW_TWO: Tile[] = [
  {
    src: "/home/5.jpeg",
    alt: "The studio after hours",
    caption: "After hours",
    span: "md:col-span-4",
    aspect: "aspect-[3/4]",
    tone: "bw",
  },
  {
    src: "/home/3.jpeg",
    alt: "A finished cut, close up",
    caption: "The finish",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
    tone: "warm",
  },
  {
    src: "/home/7.jpeg",
    alt: "The chair, waiting",
    caption: "The chair",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
    tone: "warm",
  },
];

function GalleryTile({ tile }: { tile: Tile }) {
  const isBW = tile.tone === "bw";
  return (
    <figure
      data-tile
      className={`group relative overflow-hidden bg-ink ${tile.span} ${tile.aspect} md:aspect-auto`}
    >
      <div data-tile-img className="absolute inset-0 -top-[6%] h-[112%]">
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          // sizes="(max-width: 768px) 100vw, 40vw"
          className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-[1.04] ${
            isBW ? "grayscale contrast-125 brightness-90" : ""
          }`}
        />
      </div>

      {/* Tone wash, warm clay over the colour tiles, a deeper graphic veil on
          the black-and-white beat. */}
      <div
        className={
          isBW
            ? "absolute inset-0 bg-ink/40"
            : "absolute inset-0 bg-clay/15 mix-blend-multiply"
        }
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent" />

      <figcaption className="absolute bottom-5 left-5 text-canvas/90 text-[0.6rem] tracking-[0.22em] uppercase">
        {tile.caption}
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-tile]").forEach((tile) => {
          gsap.from(tile, {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: { trigger: tile, start: "top 92%" },
          });

          const img = tile.querySelector("[data-tile-img]");
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: tile,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="gallery"
      aria-label="Selected work"
      className="bg-ink pt-20 md:pt-28 pb-1"
    >
      <div className="px-gutter flex items-baseline justify-between">
        <span className="text-ochre text-[0.65rem] tracking-[0.22em] uppercase">
          (Selected work)
        </span>
        <span className="text-canvas/50 text-[0.65rem] tracking-[0.22em] uppercase">
          02 / Gallery
        </span>
      </div>

      <h2
        className="px-gutter mt-6 md:mt-8 mb-10 md:mb-14 font-display font-light text-canvas tracking-[-0.015em]"
        style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
      >
        Quiet mornings, <span className="italic text-ochre">slow light.</span>
      </h2>

      {/* Edge-to-edge: no page gutter, images run to the screen. */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:h-[64vh]">
        {ROW_ONE.map((t) => (
          <GalleryTile key={t.src} tile={t} />
        ))}
      </div>

      <div className="mt-1 grid grid-cols-1 md:grid-cols-12 gap-1 md:h-[72vh]">
        {ROW_TWO.map((t) => (
          <GalleryTile key={t.src} tile={t} />
        ))}
      </div>
    </section>
  );
}
