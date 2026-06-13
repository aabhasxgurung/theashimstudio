"use client";

import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const CONTACT = [
  { label: "Visit", lines: ["Putali Line, Dharan-08", "Sunsari, Nepal"] },
  { label: "Hours", lines: ["Tue – Sun · 10–7", "Mon · by appointment"] },
  { label: "Reach", lines: ["+977 980-000-0000", "hello@theashim.studio"] },
];

const SOCIALS = ["Instagram", "Facebook", "TikTok"];

export function BookingFooter() {
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const wordmark = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(heading.current, {
          type: "lines",
          mask: "lines",
          linesClass: "leading-[0.95]",
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
          scrollTrigger: { trigger: "[data-contact]", start: "top 80%" },
        });

        // Oversized wordmark rises as the page bottoms out.
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
      className="bg-ink text-canvas px-gutter pt-28 md:pt-40 pb-10"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
          (Reserve your chair)
        </span>
        <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
          04 — Appointments
        </span>
      </div>

      <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-12 md:gap-16 items-end">
        <h2
          ref={heading}
          id="book-heading"
          className="md:col-span-7 font-display font-light tracking-[-0.02em]"
          style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}
        >
          Let&apos;s begin
          <span className="italic text-sand"> your visit.</span>
        </h2>

        {/* Enquiry */}
        <div className="md:col-span-5 md:pb-4">
          <p className="text-canvas/60 text-[0.95rem] leading-relaxed" data-fade>
            Tell us where to reach you. We&apos;ll follow up within a day to find
            a time that suits.
          </p>

          <form
            data-fade
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="group mt-8 relative flex items-center border-b border-canvas/25 focus-within:border-canvas transition-colors duration-300"
          >
            <input
              type="email"
              required
              disabled={sent}
              aria-label="Your email"
              placeholder={sent ? "" : "your@email.com"}
              className="peer w-full bg-transparent py-3 pr-12 text-canvas placeholder:text-stone outline-none disabled:opacity-0"
            />
            <span
              aria-live="polite"
              className={`pointer-events-none absolute inset-y-0 left-0 flex items-center text-sand text-[0.95rem] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                sent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              Thank you — we&apos;ll be in touch shortly. ↗
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
            href="tel:+9779800000000"
            data-fade
            className="mt-6 inline-flex items-baseline gap-2 text-[0.68rem] tracking-[0.22em] uppercase text-stone hover:text-canvas transition-colors duration-300"
          >
            or call the studio
          </a>
        </div>
      </div>

      {/* Contact grid */}
      <dl
        data-contact
        className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 border-t border-canvas/15 pt-12"
      >
        {CONTACT.map((c) => (
          <div key={c.label} data-fade>
            <dt className="text-stone text-[0.62rem] tracking-[0.22em] uppercase">
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
      <div className="mt-12 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6 border-t border-canvas/15 pt-8 text-[0.65rem] tracking-[0.18em] uppercase text-stone">
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
