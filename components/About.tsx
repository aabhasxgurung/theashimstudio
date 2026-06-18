"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

const STATS = [
  { value: "12+", label: "Years on the chair" },
  { value: "8k", label: "Heads of hair" },
  { value: "1", label: "Studio, by appointment" },
];

export function About() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const imageWrap = useRef<HTMLDivElement>(null);
  const imageInner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Headline: line-by-line mask reveal, driven by scroll position.
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
          scrollTrigger: {
            trigger: headline.current,
            start: "top 80%",
          },
        });

        // Eyebrow + body + stats: soft fade-up cascade.
        gsap.from("[data-fade]", {
          y: 22,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 65%" },
        });

        // Image: clip reveal on entry + slow parallax drift on scrub.
        gsap.from(imageWrap.current, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: imageWrap.current, start: "top 85%" },
        });

        gsap.fromTo(
          imageInner.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrap.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="about"
      aria-labelledby="about-heading"
      className="bg-canvas px-gutter py-28 md:py-40"
    >
      <div className="flex items-baseline justify-between" data-fade>
        <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
          (About the studio)
        </span>
        <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
          01 — Ethos
        </span>
      </div>

      <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* Statement */}
        <h2
          ref={headline}
          id="about-heading"
          className="md:col-span-7 font-display font-light text-ink tracking-[-0.015em]"
          style={{ fontSize: "clamp(2rem, 4.6vw, 4.25rem)" }}
        >
          A salon should feel less like a chair, and more like a quiet
          <span className="italic text-stone"> sanctuary</span> — somewhere the
          city softens and the work begins.
        </h2>

        {/* Body + link */}
        <div className="md:col-span-5 md:pt-3 flex flex-col gap-6">
          <p className="text-ink/70 text-[0.95rem] leading-relaxed" data-fade>
            For over fifteen years, Ashim Salon has redefined beauty with
            elegance and precision — blending artistry and expertise to craft
            looks that inspire confidence and timeless style.
          </p>
          <p className="text-ink/70 text-[0.95rem] leading-relaxed" data-fade>
            It has never just been about a haircut. Step in, and step out
            transformed.
          </p>
          <Link
            href="/about"
            data-fade
            className="group mt-2 inline-flex items-baseline gap-2 text-ink text-[0.68rem] tracking-[0.22em] uppercase w-fit"
          >
            <span className="border-b border-ink/30 pb-1 transition-colors duration-300 group-hover:border-ink">
              Read our story
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>

      {/* Image */}
      <div
        ref={imageWrap}
        className="relative mt-16 md:mt-24 h-[58vh] md:h-[78vh] overflow-hidden bg-linen"
      >
        <div ref={imageInner} className="absolute inset-0 -top-[8%] h-[116%]">
          <Image
            src="/home/bg.jpg"
            alt="The Ashim Studio interior, Dharan"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Stats */}
      <dl className="mt-16 md:mt-24 grid grid-cols-3 gap-6 border-t border-ink/10 pt-10">
        {STATS.map((s) => (
          <div key={s.label} data-fade>
            <dt
              className="font-display font-light text-ink leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              {s.value}
            </dt>
            <dd className="mt-3 text-stone text-[0.65rem] tracking-[0.2em] uppercase">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
