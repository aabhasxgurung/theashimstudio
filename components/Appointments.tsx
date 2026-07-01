"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

// NOTE: contact details below are still placeholders; swap in the studio's
// real number/handles before launch.
const CONTACT = [
  { label: "Visit", lines: ["Putali Line, Dharan-08", "Sunsari, Nepal"] },
  { label: "Hours", lines: ["Tue – Sun · 10–7", "Mon · by appointment"] },
  { label: "Reach", lines: ["+977 25-531234", "hello@theashim.studio"] },
];

const SOCIALS = ["Instagram", "Facebook", "TikTok"];

export function Appointments() {
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const wordmark = useRef<HTMLDivElement>(null);
  const imageInner = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(heading.current, {
          type: "lines",
          mask: "lines",
          linesClass: "leading-[0.98]",
        });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: heading.current, start: "top 85%" },
        });

        gsap.from("[data-fade]", {
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-split]", start: "top 75%" },
        });

        // Image clip reveal + slow parallax drift.
        gsap.from("[data-img-wrap]", {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-img-wrap]", start: "top 88%" },
        });
        gsap.fromTo(
          imageInner.current,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-img-wrap]",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.from(wordmark.current, {
          yPercent: 30,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: wordmark.current, start: "top 95%" },
        });

        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <footer
      ref={root}
      id="book"
      aria-labelledby="book-heading"
      className="bg-clay text-canvas px-gutter pt-28 md:pt-40 pb-10"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-ink text-[0.65rem] tracking-[0.22em] uppercase">
          (Reserve your chair)
        </span>
        <span className="text-canvas/60 text-[0.65rem] tracking-[0.22em] uppercase">
          05 / Appointments
        </span>
      </div>

      {/* Two-column split: a warm low-light frame on one side, the enquiry on
          the other. */}
      <div
        data-split
        className="mt-12 md:mt-20 grid md:grid-cols-12 gap-12 md:gap-16 items-stretch"
      >
        {/* Image column */}
        <div
          data-img-wrap
          className="md:col-span-5 relative overflow-hidden bg-linen aspect-[4/5] md:aspect-auto md:min-h-[34rem]"
        >
          <div ref={imageInner} className="absolute inset-0 -top-[6%] h-[112%]">
            <Image
              src="/home/4.jpeg"
              alt="A quiet evening inside The Ashim Studio"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[#1d150f]/25 mix-blend-multiply" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/80 to-transparent" />
          <span className="absolute bottom-5 left-5 text-canvas/80 text-[0.6rem] tracking-[0.22em] uppercase">
            Dharan · by appointment
          </span>
        </div>

        {/* Enquiry column */}
        <div className="md:col-span-7 flex flex-col justify-end">
          <h2
            ref={heading}
            id="book-heading"
            className="font-display font-light tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}
          >
            Let&apos;s begin
            <span className="italic text-ink"> your visit.</span>
          </h2>

          <p
            className="mt-8 max-w-md text-canvas/60 text-[0.95rem] leading-relaxed"
            data-fade
          >
            Leave your email and we&apos;ll follow up within a day to find a time
            that suits.
          </p>

          <form
            data-fade
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="group mt-8 relative flex items-center max-w-md border-b border-canvas/25 focus-within:border-canvas transition-colors duration-300"
          >
            <input
              type="email"
              required
              disabled={sent}
              aria-label="Your email"
              placeholder={sent ? "" : "your@email.com"}
              className="peer w-full bg-transparent py-3 pr-12 text-canvas placeholder:text-canvas/50 outline-none disabled:opacity-0"
            />
            <span
              aria-live="polite"
              className={`pointer-events-none absolute inset-y-0 left-0 flex items-center text-ink text-[0.95rem] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                sent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              Thank you, we&apos;ll be in touch shortly. ↗
            </span>
            <button
              type="submit"
              aria-label="Send enquiry"
              className="absolute right-0 text-canvas transition-transform duration-200 ease-out active:scale-90 group-hover:translate-x-1"
            >
              ↗
            </button>
          </form>

          <a
            href="tel:+97725531234"
            data-fade
            className="mt-6 inline-flex items-baseline gap-2 text-[0.68rem] tracking-[0.22em] uppercase text-canvas/70 hover:text-canvas transition-colors duration-300 w-fit"
          >
            or call the studio
          </a>

          {/* Contact details, inline with the enquiry. */}
          <dl
            data-fade
            className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-6 border-t border-canvas/15 pt-8"
          >
            {CONTACT.map((c) => (
              <div key={c.label}>
                <dt className="text-canvas/70 text-[0.6rem] tracking-[0.22em] uppercase">
                  {c.label}
                </dt>
                <dd className="mt-3 space-y-1">
                  {c.lines.map((line) => (
                    <p key={line} className="text-canvas/85 text-sm">
                      {line}
                    </p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div
        ref={wordmark}
        aria-hidden="true"
        className="mt-24 md:mt-36 overflow-hidden"
      >
        <span
          className="block font-display font-light leading-[0.8] tracking-[-0.02em] text-canvas/90"
          style={{ fontSize: "clamp(3.5rem, 19vw, 17rem)" }}
        >
          The Ashim
        </span>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6 border-t border-canvas/15 pt-8 text-[0.65rem] tracking-[0.18em] uppercase text-canvas/70">
        <span>© {new Date().getFullYear()} The Ashim Studio · Dharan, Nepal</span>
        <nav className="flex gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s}
              href={`https://${s.toLowerCase()}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-canvas transition-colors duration-200"
            >
              {s}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
