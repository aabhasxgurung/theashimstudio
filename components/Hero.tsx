"use client";

import Image from "next/image";
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
      className="min-h-dvh flex flex-col bg-canvas px-gutter pb-gutter pt-32 md:pt-36"
      aria-label="Hero"
    >
      {/* ── Meta row ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1 }}
        className="flex justify-between text-stone text-[0.65rem] tracking-[0.22em] uppercase"
      >
        <span>Fine hair &amp; beauty arts</span>
        <span className="hidden md:block">Dharan, Nepal</span>
        <span>Est. 2024</span>
      </motion.div>

      {/* ── Headline + intro ─────────────────────── */}
      <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <h1
          className="font-display font-light text-ink leading-[0.92] tracking-[-0.015em]"
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
              className="block italic text-stone md:ml-[12vw]"
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
          <p className="text-ink/70 text-sm leading-relaxed">
            Where every strand tells your story. A private studio for considered
            hair, in the heart of Dharan.
          </p>
          <Link
            href="/book"
            className="group mt-6 inline-flex items-baseline gap-2 text-ink text-[0.68rem] tracking-[0.22em] uppercase"
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
        </motion.div>
      </div>

      {/* ── Image — swap public/home/bg.jpg for your own ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}
        className="relative flex-1 min-h-[44vh] md:min-h-[52vh] mt-10 md:mt-14 overflow-hidden bg-linen"
      >
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.45 }}
          className="absolute inset-0"
        >
          <Image
            src="/home/bg.jpg"
            alt="Inside The Ashim Salon"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
