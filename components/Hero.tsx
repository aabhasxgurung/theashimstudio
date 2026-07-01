"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const lineReveal = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 1.1, ease: EASE, delay: 0.15 + i * 0.14 },
  }),
};

export function Hero() {
  return (
    <section
      className="relative min-h-dvh flex flex-col justify-end overflow-hidden bg-ink px-gutter pb-gutter pt-32"
      aria-label="Hero"
    >
      {/* ── Background video (full-bleed) ─────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/home/hero.jpg"
            aria-label="Inside The Ashim Salon"
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src="/home/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Warm legibility wash: walnut shadow rising from the bottom where
            the text sits, kept warm (not black) so the footage reads dusk. */}
        <div className="absolute inset-0 bg-linear-to-t from-[#140c06]/85 via-[#140c06]/35 to-[#140c06]/30" />
        {/* Golden-hour tint: a faint brass glow up top, the warm bulbs. */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(192,138,62,0.22),transparent_55%)] mix-blend-soft-light" />
      </motion.div>

      {/* ── Headline + intro ─────────────────────── */}
      <div className="relative z-10">
        {/* Eyebrow row — same shape as every other section's lead-in, so the
            hero reads as part of the system, not a separate poster. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          className="flex items-baseline justify-between border-b border-canvas/20 pb-5 mb-8 md:mb-12 text-[0.65rem] tracking-[0.22em] uppercase"
        >
          <span className="text-ochre">(Dharan, Nepal)</span>
          <span className="text-canvas/55">Est. 2024</span>
        </motion.div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <h1
          className="font-display font-light text-canvas leading-[0.92] tracking-[-0.015em]"
          style={{ fontSize: "clamp(3.25rem, 11vw, 10.5rem)" }}
        >
          <span className="block overflow-hidden">
            <motion.span
              custom={0}
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="block"
            >
              The Ashim
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              custom={1}
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="block italic text-ochre md:ml-[12vw]"
            >
              Salon
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.8 }}
          className="md:max-w-[17rem] md:pb-3 shrink-0"
        >
          <p className="text-canvas/80 text-sm leading-relaxed">
            Where every strand tells your story. A private studio for considered
            hair, in the heart of Dharan.
          </p>
          <Link
            href="/book"
            className="group mt-6 inline-flex items-baseline gap-2 text-canvas text-[0.68rem] tracking-[0.22em] uppercase"
          >
            <span className="border-b border-ochre pb-1 text-ochre transition-colors duration-300 group-hover:text-canvas group-hover:border-canvas">
              Book an appointment
            </span>
            <span
              aria-hidden="true"
              className="text-ochre transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </Link>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
