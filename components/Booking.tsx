"use client";

import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Service = { num: string; name: string; price: string };
type Artist = { num: string; name: string; role: string };

const SERVICES: Service[] = [
  { num: "01", name: "Cut & Style", price: "from ₨ 1,200" },
  { num: "02", name: "Colour & Balayage", price: "from ₨ 3,500" },
  { num: "03", name: "Bridal & Occasion", price: "on request" },
  { num: "04", name: "Treatments & Care", price: "from ₨ 900" },
  { num: "05", name: "Beard & Grooming", price: "from ₨ 600" },
];

const ARTISTS: Artist[] = [
  { num: "00", name: "No preference", role: "First available" },
  { num: "01", name: "Ashim Rai", role: "Master Stylist" },
  { num: "02", name: "Priya Limbu", role: "Senior Colourist" },
  { num: "03", name: "Dorje Sherpa", role: "Barber" },
];

const TIMES = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const EASE = "cubic-bezier(0.16,1,0.3,1)";

export function Booking() {
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  const [service, setService] = useState<string | null>(null);
  const [artist, setArtist] = useState<string>(ARTISTS[0].name);
  const [time, setTime] = useState<string | null>(null);
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
          scrollTrigger: { trigger: heading.current, start: "top 88%" },
        });

        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          gsap.from(step.querySelectorAll("[data-fade]"), {
            y: 24,
            autoAlpha: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: { trigger: step, start: "top 82%" },
          });
        });

        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="book"
      aria-labelledby="book-heading"
      className="bg-canvas px-gutter pt-36 md:pt-44 pb-28 md:pb-40"
    >
      {/* Section marker */}
      <div className="flex items-baseline justify-between">
        <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
          (Reserve your chair)
        </span>
        <span className="text-stone text-[0.65rem] tracking-[0.22em] uppercase">
          04 — Book
        </span>
      </div>

      <h1
        ref={heading}
        id="book-heading"
        className="mt-10 md:mt-16 font-display font-light text-ink tracking-[-0.02em]"
        style={{ fontSize: "clamp(2.75rem, 9vw, 8rem)" }}
      >
        Book your <span className="italic text-stone">visit.</span>
      </h1>

      <p
        className="mt-8 max-w-md text-ink/60 text-[0.95rem] leading-relaxed"
        data-fade
      >
        Choose what you&apos;re after and a time that suits. We&apos;ll confirm
        your chair within a day.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="mt-20 md:mt-28 grid lg:grid-cols-12 gap-x-16 gap-y-20"
      >
        {/* Left column — selections */}
        <div className="lg:col-span-7 space-y-20">
          {/* 01 — Service */}
          <fieldset data-step className="border-none p-0 m-0">
            <legend className="sr-only">Choose a service</legend>
            <StepLabel num="01" label="The service" />
            <ul className="mt-8 border-t border-ink/15">
              {SERVICES.map((s) => {
                const selected = service === s.name;
                return (
                  <li key={s.num} data-fade>
                    <button
                      type="button"
                      onClick={() => setService(s.name)}
                      aria-pressed={selected}
                      className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-5 md:gap-8 border-b border-ink/15 py-6 text-left"
                    >
                      <Marker on={selected} />
                      <span className="flex flex-col md:flex-row md:items-baseline md:gap-6">
                        <span
                          className={`font-display font-light leading-none transition-colors duration-300 ${
                            selected ? "text-ink" : "text-ink/80"
                          }`}
                          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
                        >
                          {s.name}
                        </span>
                      </span>
                      <span className="text-[0.72rem] md:text-sm tracking-[0.08em] tabular-nums whitespace-nowrap text-ink/60 pb-1">
                        {s.price}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          {/* 02 — Artist */}
          <fieldset data-step className="border-none p-0 m-0">
            <legend className="sr-only">Choose an artist</legend>
            <StepLabel num="02" label="The artist" />
            <div className="mt-8 grid grid-cols-2 gap-3" data-fade>
              {ARTISTS.map((a) => {
                const selected = artist === a.name;
                return (
                  <button
                    key={a.num}
                    type="button"
                    onClick={() => setArtist(a.name)}
                    aria-pressed={selected}
                    className={`group flex flex-col items-start gap-1 border p-5 text-left transition-colors duration-300 ${
                      selected
                        ? "border-ink bg-ink text-canvas"
                        : "border-ink/15 text-ink hover:border-ink/40"
                    }`}
                  >
                    <span
                      className={`text-[0.6rem] tracking-[0.2em] ${
                        selected ? "text-sand" : "text-stone"
                      }`}
                    >
                      {a.num}
                    </span>
                    <span
                      className="font-display font-light leading-none mt-2"
                      style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.6rem)" }}
                    >
                      {a.name}
                    </span>
                    <span
                      className={`text-[0.62rem] tracking-[0.18em] uppercase mt-2 ${
                        selected ? "text-canvas/60" : "text-stone"
                      }`}
                    >
                      {a.role}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 03 — Date & Time */}
          <fieldset data-step className="border-none p-0 m-0">
            <legend className="sr-only">Choose a date and time</legend>
            <StepLabel num="03" label="The moment" />

            <div className="mt-8" data-fade>
              <label
                htmlFor="date"
                className="text-stone text-[0.62rem] tracking-[0.22em] uppercase"
              >
                Preferred date
              </label>
              <input
                id="date"
                type="date"
                required
                className="mt-3 w-full bg-transparent border-b border-ink/25 py-3 text-ink outline-none focus:border-ink transition-colors duration-300 [color-scheme:light]"
              />
            </div>

            <div className="mt-10" data-fade>
              <span className="text-stone text-[0.62rem] tracking-[0.22em] uppercase">
                Preferred time
              </span>
              <div className="mt-4 flex flex-wrap gap-2">
                {TIMES.map((t) => {
                  const selected = time === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      aria-pressed={selected}
                      className={`px-4 py-2 text-[0.8rem] tracking-[0.06em] tabular-nums border transition-colors duration-300 ${
                        selected
                          ? "border-ink bg-ink text-canvas"
                          : "border-ink/15 text-ink/70 hover:border-ink/40"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </fieldset>
        </div>

        {/* Right column — details + summary */}
        <div className="lg:col-span-5 lg:pl-4">
          <div data-step className="lg:sticky lg:top-28">
            <StepLabel num="04" label="Your details" />

            <div className="mt-8 space-y-8">
              <Field
                id="name"
                label="Full name"
                type="text"
                placeholder="Your name"
              />
              <Field
                id="email"
                label="Email"
                type="email"
                placeholder="your@email.com"
              />
              <Field
                id="phone"
                label="Phone"
                type="tel"
                placeholder="+977 …"
                required={false}
              />

              <div data-fade>
                <label
                  htmlFor="notes"
                  className="text-stone text-[0.62rem] tracking-[0.22em] uppercase"
                >
                  Anything we should know?
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Optional"
                  className="mt-3 w-full bg-transparent border-b border-ink/25 py-3 text-ink placeholder:text-stone outline-none focus:border-ink transition-colors duration-300 resize-none"
                />
              </div>
            </div>

            {/* Summary */}
            <dl
              data-fade
              className="mt-12 border-t border-ink/15 pt-6 space-y-3 text-[0.8rem]"
            >
              <SummaryRow label="Service" value={service ?? "—"} />
              <SummaryRow label="Artist" value={artist} />
              <SummaryRow label="Time" value={time ?? "—"} />
            </dl>

            <button
              type="submit"
              disabled={sent}
              data-fade
              className="group mt-10 inline-flex items-center gap-4 bg-ink text-canvas px-8 py-4 text-[0.7rem] tracking-[0.22em] uppercase transition-colors duration-300 hover:bg-ink/90 disabled:opacity-60"
            >
              {sent ? "Request received" : "Request appointment"}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                style={{ transitionTimingFunction: EASE }}
              >
                ↗
              </span>
            </button>

            <p
              aria-live="polite"
              className={`mt-5 text-sand text-[0.85rem] transition-all duration-500 ${
                sent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionTimingFunction: EASE }}
            >
              Thank you — we&apos;ll confirm your chair within a day. ↗
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}

function StepLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4" data-fade>
      <span className="text-stone text-[0.62rem] tracking-[0.2em] tabular-nums">
        {num}
      </span>
      <span
        className="font-display italic font-light text-ink"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
      >
        {label}
      </span>
    </div>
  );
}

function Marker({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative top-[0.35rem] block h-3 w-3 rounded-full border transition-colors duration-300 ${
        on ? "border-ink bg-ink" : "border-ink/30 bg-transparent"
      }`}
    />
  );
}

function Field({
  id,
  label,
  type,
  placeholder,
  required = true,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div data-fade>
      <label
        htmlFor={id}
        className="text-stone text-[0.62rem] tracking-[0.22em] uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent border-b border-ink/25 py-3 text-ink placeholder:text-stone outline-none focus:border-ink transition-colors duration-300"
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-stone text-[0.62rem] tracking-[0.2em] uppercase">
        {label}
      </dt>
      <dd className="text-ink text-right">{value}</dd>
    </div>
  );
}
