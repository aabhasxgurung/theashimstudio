"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLenis } from "lenis/react";

const LINKS = [
  { num: "01", label: "Services", href: "/services" },
  { num: "02", label: "Gallery", href: "/gallery" },
  { num: "03", label: "About", href: "/about" },
  { num: "04", label: "Book", href: "/book" },
];

const EASE_EXPO_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const EASE_EXPO_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];

const overlayVariants: Variants = {
  closed: { clipPath: "inset(0 0 100% 0)" },
  open: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.88, ease: EASE_EXPO_IN_OUT },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.68, ease: EASE_EXPO_IN_OUT },
  },
};

const navListVariants: Variants = {
  closed: {},
  open: { transition: { staggerChildren: 0.08, delayChildren: 0.26 } },
};

const navItemVariants: Variants = {
  closed: { y: 32, opacity: 0 },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: EASE_EXPO_OUT },
  },
};

const footerVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_EXPO_OUT, delay: 0.72 },
  },
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();

  // Only the home page opens over the dark hero; every other route starts on a
  // light background, so the bar should read as "scrolled" from the top.
  const isHome = pathname === "/";

  // Transparent over the hero, solid once we scroll into the light sections.
  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the virtualised Lenis scroll while the overlay is open. `overflow:
  // hidden` alone can't stop Lenis, so we also call stop()/start().
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Light content while the menu is open or while sitting over the dark hero.
  const lightContent = open || (isHome && !scrolled);
  const barColor = lightContent ? "#F5F0E6" : "#1C1714";
  const logoColor = barColor;

  return (
    <>
      {/* ── Top bar ─────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-gutter py-6 transition-colors duration-300 ${
          open || (isHome && !scrolled)
            ? "bg-transparent"
            : "bg-canvas/85 backdrop-blur-md"
        }`}
      >
        <Link href="/" onClick={() => setOpen(false)}>
          <motion.span
            animate={{ color: logoColor }}
            transition={{ duration: 0.38, ease: EASE_EXPO_IN_OUT }}
            className="font-display text-[0.8rem] font-normal tracking-[0.28em] uppercase select-none"
          >
            The Ashim
          </motion.span>
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative z-[1001] flex flex-col items-end justify-center gap-[6px] w-10 h-10 bg-transparent border-none cursor-pointer p-0"
        >
          {/* Top bar */}
          <motion.span
            animate={{
              rotate: open ? -45 : 0,
              y: open ? 7 : 0,
              width: open ? "1.5rem" : "2rem",
              backgroundColor: barColor,
            }}
            transition={{ duration: 0.42, ease: EASE_EXPO_IN_OUT }}
            className="block h-px"
            style={{ backgroundColor: barColor }}
          />
          {/* Mid bar */}
          <motion.span
            animate={{
              opacity: open ? 0 : 1,
              scaleX: open ? 0 : 1,
              backgroundColor: barColor,
            }}
            transition={{ duration: 0.28, ease: EASE_EXPO_OUT }}
            className="block h-px w-[1.4rem]"
            style={{ backgroundColor: barColor }}
          />
          {/* Bottom bar */}
          <motion.span
            animate={{
              rotate: open ? 45 : 0,
              y: open ? -7 : 0,
              width: open ? "1.5rem" : "0.875rem",
              backgroundColor: barColor,
            }}
            transition={{ duration: 0.42, ease: EASE_EXPO_IN_OUT }}
            className="block h-px"
            style={{ backgroundColor: barColor }}
          />
        </button>
      </nav>

      {/* ── Full-screen overlay ──────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed inset-0 z-[999] bg-ink flex flex-col justify-center px-gutter pt-32 pb-14"
            role="dialog"
            aria-modal="true"
          >
            {/* Links */}
            <motion.nav
              variants={navListVariants}
              initial="closed"
              animate="open"
            >
              {LINKS.map(({ num, label, href }) => (
                <motion.div key={num} variants={navItemVariants}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-6 py-5 border-b border-canvas/[0.07] relative overflow-hidden"
                  >
                    {/* Hover underline */}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: EASE_EXPO_OUT }}
                      className="absolute bottom-0 left-0 right-0 h-px bg-sand origin-left"
                    />

                    <span className="text-stone text-[0.65rem] tracking-[0.12em] flex-shrink-0 pb-1">
                      {num}
                    </span>
                    <motion.span
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.35, ease: EASE_EXPO_OUT }}
                      className="font-display text-canvas font-light leading-none"
                      style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
                    >
                      {label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Footer row */}
            <motion.div
              variants={footerVariants}
              initial="closed"
              animate="open"
              className="mt-auto pt-10 flex justify-between items-center text-stone text-[0.65rem] tracking-[0.18em] uppercase"
            >
              <span>Dharan, Nepal · Est. 2024</span>
              <div className="flex gap-6">
                {["Instagram", "Facebook"].map((s) => (
                  <a
                    key={s}
                    href={`https://${s.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone hover:text-canvas transition-colors duration-200"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
