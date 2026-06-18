"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function AboutStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const splits: SplitText[] = [];

        // Headlines: line-by-line mask reveal, driven by scroll position.
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "leading-[1.08]",
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

        // Eyebrows + body copy: soft fade-up.
        gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
          gsap.from(el, {
            y: 22,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          });
        });

        // Images: clip reveal on entry.
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        return () => splits.forEach((s) => s.revert());
      });
    },
    { scope: root }
  );

  return (
    <article ref={root} className="bg-canvas">
      {/* ── Intro / About us ─────────────────────────── */}
      <section
        aria-labelledby="about-heading"
        className="px-gutter pt-40 pb-24 md:pt-52 md:pb-32"
      >
        <div className="flex items-baseline justify-between" data-fade>
          <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
            (About us)
          </span>
          <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
            01 — Who we are
          </span>
        </div>

        <h1
          id="about-heading"
          data-split
          className="mt-10 md:mt-16 font-display font-light text-ink tracking-[-0.015em]"
          style={{ fontSize: "clamp(2.75rem, 9vw, 8rem)" }}
        >
          Ashim <span className="italic text-stone">Salon</span>
        </h1>

        <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-16">
          <p
            className="md:col-span-7 md:col-start-6 text-ink/75 leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)" }}
            data-fade
          >
            For over fifteen years, Ashim Salon has been redefining beauty with
            elegance and precision. Trusted by countless clients, we blend
            artistry and expertise to craft looks that inspire confidence and
            timeless style. Step in, and step out transformed.
          </p>
        </div>
      </section>

      {/* ── Never just a haircut ─────────────────────── */}
      <section className="px-gutter py-24 md:py-32 border-t border-ink/10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5" data-fade>
            <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
              02 — The experience
            </span>
          </div>
          <div className="md:col-span-7 flex flex-col gap-8">
            <h2
              data-split
              className="font-display font-light text-ink tracking-[-0.015em]"
              style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.75rem)" }}
            >
              It&apos;s never just been about a haircut.
            </h2>
            <p className="text-ink/70 text-[0.95rem] leading-relaxed" data-fade>
              A space where every visit is shaped around you — your style, your
              comfort, your confidence.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our story ────────────────────────────────── */}
      <section
        aria-labelledby="story-heading"
        className="px-gutter py-24 md:py-32 border-t border-ink/10"
      >
        <div className="flex items-baseline justify-between" data-fade>
          <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
            (Our story)
          </span>
          <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
            03 — How we grew
          </span>
        </div>

        <h2
          id="story-heading"
          data-split
          className="mt-10 md:mt-16 font-display font-light text-ink tracking-[-0.015em] md:max-w-[18ch]"
          style={{ fontSize: "clamp(2rem, 5vw, 4.25rem)" }}
        >
          Rooted in trust, <span className="italic text-stone">we grew.</span>
        </h2>

        <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-16">
          <p
            className="md:col-span-6 md:col-start-1 text-ink/70 text-[0.95rem] leading-relaxed"
            data-fade
          >
            What began as a small salon with a simple promise — to make people
            feel good about themselves — has grown into a name trusted across
            the community for over fifteen years. Every chair, every mirror,
            every appointment has been part of a journey shaped by care, skill,
            and the quiet satisfaction of seeing a client smile at their own
            reflection.
          </p>
          <p
            className="md:col-span-6 text-ink/70 text-[0.95rem] leading-relaxed"
            data-fade
          >
            Since opening our doors, Ashim Salon has welcomed thousands of
            clients through transformations big and small — a fresh haircut
            before a big day, a bridal look that made someone feel unstoppable,
            a small change that brought back someone&apos;s confidence. Through
            it all, one thing has stayed the same: we treat every client like
            family, not just a service.
          </p>
        </div>
      </section>

      {/* ── The founder ──────────────────────────────── */}
      <section
        aria-labelledby="founder-heading"
        className="px-gutter py-24 md:py-32 border-t border-ink/10"
      >
        <div className="flex items-baseline justify-between" data-fade>
          <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
            (The hands behind it)
          </span>
          <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
            04 — The founder
          </span>
        </div>

        <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-16 items-end">
          {/* Portrait */}
          <div className="md:col-span-5" data-reveal>
            <div className="relative aspect-[3/4] overflow-hidden bg-linen">
              <Image
                src="/home/owner.jpeg"
                alt="Ashim Rai, founder of Ashim Salon"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-6 md:col-start-7 flex flex-col gap-6">
            <h2
              id="founder-heading"
              data-split
              className="font-display font-light text-ink tracking-[-0.015em]"
              style={{ fontSize: "clamp(2rem, 4.6vw, 3.75rem)" }}
            >
              Ashim Rai
            </h2>
            <p
              className="text-stone text-[0.62rem] tracking-[0.22em] uppercase"
              data-fade
            >
              Founder · Master Stylist
            </p>
            <p className="text-ink/70 text-[0.95rem] leading-relaxed" data-fade>
              For more than fifteen years, Ashim has stood behind the chair with
              the same belief that started it all — that the right cut can change
              the way a person carries themselves. What grew from a single
              room into a trusted name was built one client, one conversation,
              one reflection at a time.
            </p>
            <p className="text-ink/70 text-[0.95rem] leading-relaxed" data-fade>
              Every stylist on the bench works to the standard he set: listen
              first, and treat each guest like family.
            </p>
          </div>
        </div>
      </section>

      {/* ── Philosophy ───────────────────────────────── */}
      <section
        aria-labelledby="philosophy-heading"
        className="bg-ink text-canvas px-gutter py-28 md:py-40"
      >
        <div className="flex items-baseline justify-between" data-fade>
          <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
            (Our philosophy)
          </span>
          <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
            05 — What we believe
          </span>
        </div>

        <blockquote className="mt-12 md:mt-20">
          <p
            id="philosophy-heading"
            data-split
            className="font-display font-light tracking-[-0.015em] md:max-w-[16ch]"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4.75rem)" }}
          >
            <span className="italic text-sand">&ldquo;</span>True beauty
            isn&apos;t just about the look — it&apos;s about how someone feels
            when they walk out the door.<span className="italic text-sand">
              &rdquo;
            </span>
          </p>
        </blockquote>

        <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-16">
          <p
            className="md:col-span-6 md:col-start-7 text-canvas/70 text-[0.95rem] leading-relaxed"
            data-fade
          >
            At Ashim Salon, we believe great style comes from listening first.
            Our team blends years of hands-on expertise with a genuine
            understanding of what each client wants, so that every visit ends
            with not just a new look, but renewed confidence.
          </p>
        </div>

        <Link
          href="/book"
          data-fade
          className="group mt-16 md:mt-24 inline-flex items-baseline gap-2 text-canvas text-[0.68rem] tracking-[0.22em] uppercase"
        >
          <span className="border-b border-canvas/40 pb-1 transition-colors duration-300 group-hover:border-canvas">
            Book an appointment
          </span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </Link>
      </section>
    </article>
  );
}
