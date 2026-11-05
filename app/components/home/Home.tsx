"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import photo from "@/public/me-cutout.png"
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[linear-gradient(115deg,#0e0e10_0_30%,#1d1e22_30%_46%,#0e0e10_46%_66%,#2a2b30_66%_70%,#0e0e10_70%)] px-4 pb-10 pt-24 md:px-10"
    >
      {/* spotlight behind the card */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,#2a2a2f_0%,transparent_60%)]" />
      {/* subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-end gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#d9d9dc] via-[#cdcdd0] to-[#b4b4b9] px-6 pt-10 text-[#19191c] shadow-[0_20px_60px_rgba(0,0,0,0.55)] md:grid-cols-2 md:px-14 md:pt-12">
        {/* text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-20 self-center pb-2 md:pb-12"
        >
          <h1 className="font-display text-6xl font-black uppercase leading-[0.85] md:text-7xl lg:text-8xl">
            Nazish <span className="text-[#55555a]">Ali</span>
          </h1>

          <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#55555a] md:text-xs">
            SOFTWARE Developer · AI Builder · Problem Solver
          </p>

          <h2 className="mt-6 font-display text-2xl font-black uppercase leading-tight md:text-3xl">
            I build for the web,{" "}
            <span className="text-[#55555a]">from the shadows.</span>
          </h2>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#34343a] md:text-base">
            I turn ideas into digital experiences — from full-stack
            applications to AI-powered products. Quietly building, constantly
            learning, and always chasing what&apos;s next.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="-skew-x-12 bg-[#19191c] px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#ececee] transition hover:bg-black"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="-skew-x-12 border border-[#19191c]/50 px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition hover:bg-black/10"
            >
              Contact
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 border border-[#19191c]/40 bg-white/40 px-3 py-1.5 font-mono text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#19191c]" />
            Currently building the next big thing.
          </p>
        </motion.div>

        {/* photo + bat emblem behind it */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative z-10 mx-auto w-full max-w-sm self-end"
        >
          {/* bat emblem */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[2%] aspect-[903/396] w-[150%] -translate-x-1/2 bg-[#2a2a2f] [mask-image:url(/batman.svg)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
          />
          <Image
            src={photo}
            alt="Nazish Ali"
            width={760}
            height={950}
            priority
            className="relative h-auto w-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.45)] [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]"
          />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#skills"
        aria-label="Scroll to Skills"
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-muted transition hover:text-text"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}