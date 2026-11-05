"use client";
import { motion } from "framer-motion";
import {
  BookOpen,
  Bot,
  FlaskConical,
  Hammer,
  Telescope,
  type LucideIcon,
} from "lucide-react";

const facts = [
  { label: "Driven by", value: "Curiosity" },
  { label: "Fueled by", value: "Creativity" },
  { label: "Building", value: "Something meaningful" },
];

const stack = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
  },
  {
    group: "Data & Infrastructure",
    items: ["MongoDB", "Git", "GitHub", "Vercel"],
  },
  {
    group: "AI & Intelligence",
    items: ["Python", "Gemini API", "LLMs", "AI integration"],
  },
];

const beyond: { title: string; icon: LucideIcon }[] = [
  { title: "Reading & writing", icon: BookOpen },
  { title: "Fascinated by outer space", icon: Telescope },
  { title: "Exploring AI & emerging tech, LLMs", icon: Bot },
  { title: "Building ideas into products", icon: Hammer },
  { title: "Experimenting with new technologies", icon: FlaskConical },
];

export default function About() {
  return (
    <section id="about" className="relative bg-[#dcdcd8] py-28 text-[#151515]">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 before:col-span-full before:block before:border-b-[6px] before:border-double before:border-[#151515] before:pb-4 before:text-center before:font-serif before:text-5xl before:font-black before:content-['Behind_The_Mask'] md:grid-cols-2 md:before:text-7xl">
        {/* bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 border-b border-[#151515] pb-2 text-sm font-medium uppercase tracking-[0.3em] text-[#55555a]">
            About Me
          </p>
          <h2 className="mb-6 font-serif text-4xl font-black leading-[1.05] md:text-6xl">
            Building quietly,{" "}
            <span className="text-[#55555a]">shipping loudly.</span>
          </h2>

          <div className="space-y-4 leading-relaxed text-[#333] [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:pr-2 [&>p:first-child]:first-letter:font-serif [&>p:first-child]:first-letter:text-6xl [&>p:first-child]:first-letter:font-black [&>p:first-child]:first-letter:leading-[0.8]">
            <p>
              Behind the code is a developer driven by curiosity, creativity,
              and the desire to build something meaningful.
            </p>
            <p>
              I enjoy exploring how things work, learning new technologies, and
              transforming ideas into applications people can actually use.
            </p>
            <p>
              From full-stack engineering to AI-powered products, I&apos;m
              constantly expanding my skills and looking for the next problem
              worth solving.
            </p>
            <p className="border-l-4 border-[#151515] pl-4 font-serif text-lg font-black italic leading-snug text-[#151515]">
              The mission is simple: keep learning, keep building, and never
              stop improving.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-3 border-y-[3px] border-[#151515]">
            {facts.map((f) => (
              <div
                key={f.label}
                className="border-r border-[#151515]/40 p-4 last:border-r-0"
              >
                <dt className="mb-1 text-xs uppercase tracking-widest text-[#55555a]">
                  {f.label}
                </dt>
                <dd className="font-serif text-sm font-black md:text-base">{f.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-5 md:border-l md:border-[#151515]/40 md:pl-10"
        >
          {stack.map((s) => (
            <div
              key={s.group}
              className="border-b-2 border-[#151515] pb-5 last:border-b-0"
            >
              <h3 className="mb-4 font-serif text-lg font-black uppercase tracking-[0.15em]">
                {s.group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="border border-[#151515] px-3 py-1 text-sm transition hover:bg-[#151515] hover:text-[#dcdcd8]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* beyond the code */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="col-span-full"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b-[6px] border-double border-[#151515] pb-3">
            <h3 className="font-serif text-3xl font-black uppercase tracking-[0.08em] md:text-4xl">
              Beyond the Code
            </h3>
            <span className="-rotate-2 border-[3px] border-[#151515] bg-[#fbfbf8] px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] shadow-[3px_3px_0_#151515]">
              Off-duty files
            </span>
          </div>

          <ul className="grid gap-px border-y-[3px] border-[#151515] bg-[#151515]/40 sm:grid-cols-2 lg:grid-cols-5">
            {beyond.map((b, i) => (
              <li
                key={b.title}
                className="group flex flex-col gap-4 bg-[#dcdcd8] p-5 transition hover:bg-[#151515] hover:text-[#dcdcd8] sm:last:col-span-2 lg:last:col-span-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-comic text-3xl leading-none text-[#55555a] transition group-hover:text-[#dcdcd8]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <b.icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <p className="font-serif text-base font-black leading-snug md:text-lg">
                  {b.title}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}