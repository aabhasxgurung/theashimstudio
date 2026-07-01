"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { serviceMenu } from "@/lib/service";

export function ServiceMenu() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const splits: SplitText[] = [];

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "leading-[1.05]",
          });
          splits.push(split);

          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
          gsap.from(el, {
            y: 22,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          });
        });

        // Each price row lifts into place as its category scrolls in.
        gsap.utils.toArray<HTMLElement>("[data-rows]").forEach((list) => {
          gsap.from(list.querySelectorAll("[data-row]"), {
            yPercent: 40,
            autoAlpha: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.06,
            scrollTrigger: { trigger: list, start: "top 88%" },
          });
        });

        return () => splits.forEach((s) => s.revert());
      });
    },
    { scope: root }
  );

  return (
    <article ref={root} className="bg-canvas">
      {/* ── Header ───────────────────────────────────── */}
      <section
        aria-labelledby="services-heading"
        className="px-gutter pt-40 pb-20 md:pt-52 md:pb-28"
      >
        <div className="flex items-baseline justify-between" data-fade>
          <span className="text-clay text-[0.65rem] tracking-[0.22em] uppercase">
            (What we do)
          </span>
          <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
            The full menu
          </span>
        </div>

        <h1
          id="services-heading"
          data-split
          className="mt-10 md:mt-16 font-display font-light text-ink tracking-[-0.015em]"
          style={{ fontSize: "clamp(2.75rem, 9vw, 8rem)" }}
        >
          The craft, <span className="italic text-clay">priced plainly.</span>
        </h1>

        <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-16">
          <p
            className="md:col-span-7 md:col-start-6 text-ink/75 leading-relaxed"
            style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)" }}
            data-fade
          >
            Every cut, colour and treatment we offer, listed in full and priced
            plainly in Nepalese rupees. No hidden extras, just the work, and
            what it costs.
          </p>
        </div>
      </section>

      {/* ── Menu ─────────────────────────────────────── */}
      {serviceMenu.map((category, i) => (
        <section
          key={category.id}
          id={category.id}
          aria-labelledby={`${category.id}-heading`}
          className="px-gutter py-16 md:py-24 border-t border-ink/10 scroll-mt-28"
        >
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            {/* Category label */}
            <div className="md:col-span-4">
              <div className="md:sticky md:top-28" data-fade>
                <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  id={`${category.id}-heading`}
                  className="mt-3 font-display font-light text-ink leading-[0.95] tracking-[-0.015em]"
                  style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)" }}
                >
                  {category.name}
                </h2>
              </div>
            </div>

            {/* Service rows */}
            <ul
              data-rows
              className="md:col-span-7 md:col-start-6 border-t border-ink/15"
            >
              {category.services.map((service) => (
                <li
                  key={service.id}
                  data-row
                  className="grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-ink/15 py-5"
                >
                  <span className="flex flex-col md:flex-row md:items-baseline md:gap-3">
                    <span
                      className="font-display font-light text-ink leading-tight"
                      style={{ fontSize: "clamp(1.15rem, 1.9vw, 1.5rem)" }}
                    >
                      {service.name}
                    </span>
                    {service.note && (
                      <span className="text-stone text-[0.62rem] tracking-[0.18em] uppercase">
                        {service.note}
                      </span>
                    )}
                  </span>
                  <span className="text-ink/80 text-sm md:text-base tabular-nums whitespace-nowrap">
                    {service.priceLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* ── Closing note + CTA ───────────────────────── */}
      <section className="px-gutter py-20 md:py-28 border-t border-ink/10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end">
          <p
            className="md:col-span-6 text-ink/60 text-[0.85rem] leading-relaxed"
            data-fade
          >
            Prices are a guide and may vary with hair length, density and the
            condition of your hair. We&apos;ll always confirm the final cost at
            your consultation, before any work begins.
          </p>
          <div className="md:col-span-5 md:col-start-8" data-fade>
            <Link
              href="/book"
              className="group inline-flex items-baseline gap-2 text-ink text-[0.68rem] tracking-[0.22em] uppercase"
            >
              <span className="border-b border-ink/30 pb-1 transition-colors duration-300 group-hover:border-ink">
                Book an appointment
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
      </section>
    </article>
  );
}
