"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function Ethos() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const imageInner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(headline.current, {
          type: "lines",
          mask: "lines",
          linesClass: "leading-[1.08]",
        });

        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: headline.current, start: "top 82%" },
        });

        gsap.from("[data-fade]", {
          y: 22,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 60%" },
        });

        gsap.from("[data-img-wrap]", {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-img-wrap]", start: "top 85%" },
        });
        gsap.fromTo(
          imageInner.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-img-wrap]",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about"
      aria-labelledby="ethos-heading"
      className="bg-canvas"
    >
      <div className="grid md:grid-cols-2 items-stretch">
        {/* Full-bleed image, edge of the screen on the left. */}
        <div
          data-img-wrap
          className="relative order-1 md:order-none overflow-hidden bg-linen aspect-[4/5] md:aspect-auto md:min-h-[40rem]"
        >
          <div ref={imageInner} className="absolute inset-0 -top-[8%] h-[116%]">
            <Image
              src="/home/9.jpg"
              alt="A quiet moment in the chair at The Ashim Studio"
              width={1200}
              height={1500}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-coverobject-center w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-clay/10 mix-blend-multiply" />
          <span className="absolute bottom-5 left-5 text-canvas/90 text-[0.6rem] tracking-[0.22em] uppercase">
            The room, at dusk
          </span>
        </div>

        {/* Statement, short, warm, with a terracotta accent word. */}
        <div className="flex flex-col justify-center px-gutter py-20 md:py-28">
          <div className="flex items-baseline justify-between" data-fade>
            <span className="text-clay text-[0.65rem] tracking-[0.22em] uppercase">
              (Ethos)
            </span>
            <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
              01 / The room
            </span>
          </div>

          <h2
            ref={headline}
            id="ethos-heading"
            className="mt-10 md:mt-14 font-display font-light text-ink tracking-[-0.015em]"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.85rem)" }}
          >
            Less a chair, more a quiet
            <span className="italic text-clay"> sanctuary</span>, where the city
            softens and the work begins.
          </h2>

          <p
            className="mt-10 max-w-sm text-ink/70 text-[0.95rem] leading-relaxed"
            data-fade
          >
            Fifteen years on, the work is unchanged: to send you back out
            feeling more like yourself.
          </p>

          <Link
            href="/about"
            data-fade
            className="group mt-8 inline-flex items-baseline gap-2 text-[0.68rem] tracking-[0.22em] uppercase text-ink w-fit"
          >
            <span className="border-b border-clay pb-1 text-clay transition-colors duration-300 group-hover:text-clay-deep">
              Read our story
            </span>
            <span
              aria-hidden="true"
              className="text-clay transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
