"use client";
import { motion } from "framer-motion";

const skills = [
  { cmd: "frontend", value: "React, JavaScript, HTML, CSS, Tailwind CSS" },
  { cmd: "backend", value: "Node.js, Express.js, REST APIs" },
  { cmd: "data & infrastructure", value: "MongoDB, Git, GitHub" },
  { cmd: "ai & intelligence", value: "Python, Gemini API, LLMs, AI integration" },
  { cmd: "status", value: "Ready to deploy" },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#090b0c] py-28 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
        {/* terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-[#6d737b]">
            arsenal · section 02 of 05
          </p>
          <div className="space-y-5 font-mono text-base leading-relaxed text-[#d8dbe0] md:text-lg">
            {skills.map((s, i) => (
              <div key={s.cmd}>
                <p className="text-[#6d737b]">&gt; {s.cmd}</p>
                <p>
                  {s.value}
                  {i === skills.length - 1 && (
                    <span className="ml-1 animate-pulse">&#9613;</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto aspect-square w-full max-w-md rounded-full border border-white/25"
        >
          {/* rings and crosshair */}
          <div className="absolute inset-[25%] rounded-full border border-white/15" />
          <div className="absolute inset-[50%] rounded-full" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-white/15" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/15" />

          {/* sweep */}
          <div className="absolute inset-0 animate-spin rounded-full [animation-duration:6s] [background:conic-gradient(rgba(255,255,255,0.3),transparent_25%)] motion-reduce:animate-none" />

          {/* bat emblem */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-[903/396] w-3/5 -translate-x-1/2 -translate-y-1/2 bg-[#e4e6ea] [mask-image:url(/batman.svg)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
          />
        </motion.div>
      </div>
    </section>
  );
}