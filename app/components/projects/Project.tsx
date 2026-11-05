"use client";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  Cloud,
  CookingPot,
  Flame,
  Layers,
  ShoppingBag,
  Star,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import batman from "@/public/batman.svg";
// import bitecountImg from "@/public/projects/bitecount.png";

type Status = "deployed" | "building" | "soon";

type Project = {
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  live?: string;
  code?: string;
  image?: StaticImageData | string;
  icon?: LucideIcon;
  status?: Status;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "BiteCount",
    tagline: "Count every bite, track every meal.",
    description:
      "A full-stack AI-powered nutrition tracker. Log meals using image recognition, track daily calories and macros, and monitor your health goals.",
    stack: ["MongoDB", "Express", "React", "Node.js", "AI API"],
    live: "https://bitecount.vercel.app/home",
    code: "https://github.com/mdnazishpatel/BiteCount-frontend",
    icon: Utensils,
    status: "deployed",
    featured: true,
  },
  {
    title: "Roast My Code",
    tagline: "It's roasting time.",
    description:
      "Paste your source code and let AI roast your syntax, structure, and programming choices, with zero mercy and plenty of humor.",
    stack: ["React", "Tailwind CSS", "Gemini API", "Vercel"],
    live: "https://roast-code-frontend.vercel.app/",
    code: "https://github.com/mdnazishpatel/Roast-code-frontend",
    icon: Flame,
    status: "deployed",
    featured: true,
  },
  {
    title: "AI Chatbot",
    tagline: "Intelligent conversations, on demand.",
    description:
      "An advanced AI-powered conversational platform capable of answering complex questions, generating ideas, and aiding productivity.",
    stack: ["React", "Node.js", "Express", "AI API"],
    live: "https://sikandarchatbot.netlify.app/",
    code: "https://github.com/mdnazishpatel/ChatBot",
    icon: Bot,
    status: "deployed",
  },
  {
    title: "Recipe App",
    tagline: "Discover culinary ideas.",
    description:
      "An interactive culinary explorer that lets you search thousands of recipes, filter by ingredients, and view detailed cooking steps.",
    stack: ["HTML", "CSS", "JavaScript", "Recipe API"],
    live: "https://recipebysikandar.netlify.app/",
    code: "https://github.com/mdnazishpatel/Recipe-App",
    icon: CookingPot,
    status: "deployed",
  },
  {
    title: "Book Recommender",
    tagline: "Books tailored to your mood.",
    description:
      "An AI-driven reading assistant that delivers tailored book recommendations based on your emotional state and reading preferences.",
    stack: ["React", "Tailwind CSS", "Gemini API", "Netlify"],
    live: "https://ideal-books.netlify.app/",
    code: "https://github.com/mdnazishpatel/Book-recommender",
    icon: BookOpen,
    status: "deployed",
  },
  {
    title: "Shopping E-Commerce",
    tagline: "Modern digital marketplace.",
    description:
      "A feature-rich e-commerce storefront showcasing dynamic product catalogs, search filters, and favorite item management.",
    stack: ["HTML", "CSS", "JavaScript", "REST API", "Vercel"],
    live: "https://myshop-8o2t.vercel.app/",
    code: "https://github.com/mdnazishpatel/myshop",
    icon: ShoppingBag,
    status: "deployed",
  },
  {
    title: "Weather App",
    tagline: "Real-time global weather insights.",
    description:
      "Get instant, up-to-date atmospheric conditions, temperature forecasts, and weather metrics for any city worldwide.",
    stack: ["React", "Tailwind CSS", "Weather API", "Vercel"],
    live: "https://react-weather-tau-livid.vercel.app/",
    code: "https://github.com/mdnazishpatel/React-weather",
    icon: Cloud,
    status: "deployed",
  },
];

type PageDef =
  | { kind: "cover" }
  | { kind: "index" }
  | { kind: "project"; project: Project; n: number }
  | { kind: "end" }
  | { kind: "blank" }
  | { kind: "back" };

const EASE: [number, number, number, number] = [0.45, 0.05, 0.2, 1];
const pad = (n: number) => String(n).padStart(2, "0");

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

const patterns = [
  "[background-image:radial-gradient(#45454a_28%,transparent_30%)] [background-size:3cqw_3cqw]",
  "[background-image:repeating-linear-gradient(135deg,#1d1e22_0_1.2cqw,transparent_1.2cqw_2.4cqw)]",
  "[background-image:linear-gradient(#1f2024_0.3cqw,transparent_0.3cqw),linear-gradient(90deg,#1f2024_0.3cqw,transparent_0.3cqw)] [background-size:4cqw_4cqw]",
  "[background-image:repeating-radial-gradient(circle_at_50%_50%,#1d1e22_0_1cqw,transparent_1cqw_3cqw)]",
];

const stamps: Record<Status, string> = {
  deployed: "Case closed",
  building: "Open case",
  soon: "Classified",
};

function Artwork({ project, n }: { project: Project; n: number }) {
  const Icon = project.icon ?? Layers;
  const status = project.status ?? "soon";
  return (
    <div className={`absolute inset-0 ${patterns[(n - 1) % patterns.length]}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(255,255,255,0.16),transparent_62%)]" />
      <span
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center font-comic text-[40cqw] leading-none text-transparent [-webkit-text-stroke:0.5cqw_#3a3b41]"
      >
        {pad(n)}
      </span>
      <div className="absolute left-1/2 top-1/2 grid h-[28cqw] w-[28cqw] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[0.9cqw] border-white bg-[#0b0b0b] shadow-[1.2cqw_1.2cqw_0_#55555a]">
        <Icon className="h-[14cqw] w-[14cqw] text-white" strokeWidth={1.6} />
      </div>
      <span className="absolute bottom-[3cqw] right-[3cqw] rotate-6 border-[0.6cqw] border-double border-white/80 px-[2cqw] py-[0.8cqw] font-mono text-[2.6cqw] uppercase tracking-[0.2em] text-white/90">
        {stamps[status]}
      </span>
    </div>
  );
}

function FeaturedRibbon() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 z-10 h-[32cqw] w-[32cqw] overflow-hidden"
    >
      <span className="absolute right-[-11cqw] top-[5.5cqw] flex w-[42cqw] rotate-45 items-center justify-center gap-[1cqw] border-y-[0.5cqw] border-[#0b0b0b] bg-white py-[0.9cqw] text-[2.3cqw] font-semibold uppercase tracking-[0.25em] text-[#0b0b0b]">
        <Star className="h-[2.6cqw] w-[2.6cqw] fill-current" /> Featured
      </span>
    </div>
  );
}

function Cover({ count }: { count: number }) {
  return (
    <div className="absolute inset-0 [background-image:radial-gradient(#2a2b30_28%,transparent_30%)] [background-size:3cqw_3cqw]">
      <div className="absolute left-1/2 top-[14%] w-[88%] -translate-x-1/2">
        <Image
          src={batman}
          alt=""
          className="h-auto w-full object-contain opacity-90 invert"
        />
      </div>
      <p className="absolute inset-x-[8cqw] top-[63cqw] text-center font-mono text-[2.7cqw] uppercase leading-[1.7] tracking-[0.18em] text-[#c9c9cd]">
        <span className="block">Every tool has a purpose.</span>
        <span className="block text-white">Every project has a story.</span>
      </p>
      <p className="absolute left-[6cqw] top-[5cqw] font-mono text-[2.4cqw] uppercase tracking-[0.3em] text-[#c9c9cd]">
        Issue #01 · The case files
      </p>
      <div className="absolute inset-x-[6cqw] bottom-[16cqw]">
        <p className="mb-[1cqw] font-mono text-[2.6cqw] uppercase tracking-[0.3em] text-[#c9c9cd]">
          Nazish Ali presents
        </p>
        <h3 className="font-comic text-[21cqw] leading-[0.9] text-white [text-shadow:0.8cqw_0.8cqw_0_#55555a]">
          Projects
        </h3>
      </div>
      <p className="absolute inset-x-[6cqw] bottom-[5cqw] flex justify-between font-mono text-[2.4cqw] uppercase tracking-[0.2em] text-[#c9c9cd]">
        <span>{count} cases</span>
        <span>Turn the page →</span>
      </p>
    </div>
  );
}

function BackCover() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[3cqw] [background-image:radial-gradient(#2a2b30_28%,transparent_30%)] [background-size:3cqw_3cqw]">
      <div className="w-[50%]">
        <Image
          src={batman}
          alt=""
          className="h-auto w-full object-contain opacity-80 invert"
        />
      </div>
      <p className="font-mono text-[2.4cqw] uppercase tracking-[0.3em] text-[#c9c9cd]">
        End of issue #01
      </p>
    </div>
  );
}

function IndexPage({ onJump }: { onJump: (n: number) => void }) {
  return (
    <div className="absolute inset-0 flex flex-col p-[6cqw]">
      <p className="font-mono text-[2.4cqw] uppercase tracking-[0.3em] text-[#55555a]">
        Contents
      </p>
      <h3 className="mt-[1cqw] font-comic text-[12cqw] leading-[0.95] [text-shadow:0.6cqw_0.6cqw_0_#a4a4aa]">
        Case files
      </h3>
      <ol className="mt-[4cqw] flex flex-1 flex-col justify-between">
        {projects.map((p, i) => (
          <li key={p.title + i}>
            <button
              type="button"
              onClick={() => onJump(i + 1)}
              className="flex w-full cursor-pointer items-baseline gap-[2cqw] border-b-[0.4cqw] border-dotted border-[#0b0b0b]/60 pb-[1cqw] text-left transition hover:text-[#55555a]"
            >
              <span className="font-comic text-[5cqw]">{pad(i + 1)}</span>
              <span
                className={`flex-1 font-semibold uppercase tracking-wider ${
                  p.featured ? "text-[3.9cqw]" : "text-[3.4cqw]"
                }`}
              >
                {p.title}
              </span>
              {p.featured && (
                <span className="inline-flex items-center gap-[0.8cqw] text-[2.3cqw] font-semibold uppercase tracking-[0.2em]">
                  <Star className="h-[2.8cqw] w-[2.8cqw] fill-current" /> Featured
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

const SLANT = "[clip-path:polygon(9%_0,100%_0,91%_100%,0_100%)]";

function ProjectLink({
  href,
  label,
  solid,
}: {
  href?: string;
  label: string;
  solid?: boolean;
}) {
  const enabled = !!href && href !== "#";
  return (
    <a
      href={enabled ? href : "#projects"}
      target={enabled ? "_blank" : undefined}
      rel={enabled ? "noreferrer" : undefined}
      onClick={enabled ? undefined : (e) => e.preventDefault()}
      aria-disabled={!enabled}
      title={enabled ? undefined : "Link coming soon"}
      className={`group inline-block bg-[#0b0b0b] p-[0.45cqw] ${SLANT} ${
        enabled ? "cursor-pointer" : "cursor-not-allowed opacity-50"
      }`}
    >
      <span
        className={`inline-flex items-center gap-[1cqw] px-[4cqw] py-[1.3cqw] text-[2.6cqw] font-semibold uppercase tracking-[0.2em] transition ${SLANT} ${
          solid
            ? "bg-[#0b0b0b] text-white group-hover:bg-[#333]"
            : "bg-[#fbfbf8] text-[#0b0b0b] group-hover:bg-[#0b0b0b] group-hover:text-white"
        }`}
      >
        {label} <ArrowUpRight className="h-[3cqw] w-[3cqw]" />
      </span>
    </a>
  );
}

function ProjectPage({ project, n }: { project: Project; n: number }) {
  const num = pad(n);
  return (
    <div className="absolute inset-0 flex flex-col gap-[3cqw] p-[4cqw] pb-[7cqw]">
      <div className="relative flex-[1.15] overflow-hidden border-[0.9cqw] border-[#0b0b0b] bg-[#0b0b0b]">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 450px, 100vw"
            className="object-cover grayscale"
          />
        ) : (
          <Artwork project={project} n={n} />
        )}
        <span className="absolute left-0 top-0 border-b-[0.5cqw] border-r-[0.5cqw] border-[#0b0b0b] bg-white px-[2cqw] py-[1cqw] text-[2.4cqw] font-semibold uppercase tracking-[0.2em] text-[#0b0b0b]">
          Case file {num}
        </span>
        {project.featured && <FeaturedRibbon />}
      </div>
      <div>
        <h3
          className={`font-comic leading-[0.95] [text-shadow:0.6cqw_0.6cqw_0_#a4a4aa] ${
            project.title.length > 15 ? "text-[8cqw]" : "text-[9.5cqw]"
          }`}
        >
          {project.title}
        </h3>
        <p className="mt-[1cqw] text-[2.8cqw] font-semibold uppercase tracking-[0.2em] text-[#55555a]">
          {project.tagline}
        </p>
      </div>
      <p className="relative rounded-[3cqw] border-[0.6cqw] border-[#0b0b0b] bg-white p-[3cqw] text-[3.3cqw] leading-snug before:absolute before:-top-[1.8cqw] before:left-[8cqw] before:h-[3cqw] before:w-[3cqw] before:rotate-45 before:border-l-[0.6cqw] before:border-t-[0.6cqw] before:border-[#0b0b0b] before:bg-white before:content-['']">
        {project.description}
      </p>
      <div className="mt-auto flex flex-col gap-[2.5cqw]">
        <ul className="flex flex-wrap gap-[1.5cqw]">
          {project.stack.map((s) => (
            <li
              key={s}
              className="border-[0.4cqw] border-[#0b0b0b] bg-white px-[2cqw] py-[0.8cqw] text-[2.3cqw] font-semibold uppercase tracking-wider"
            >
              {s}
            </li>
          ))}
        </ul>
        <div className="flex gap-[3cqw]">
          <ProjectLink href={project.live} label="Live" solid />
          <ProjectLink href={project.code} label="Code" />
        </div>
      </div>
      <span className="absolute inset-x-0 bottom-[1.8cqw] text-center font-mono text-[2.2cqw] text-[#55555a]">
        — {num} —
      </span>
    </div>
  );
}

function EndPage() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[4cqw] p-[8cqw] text-center">
      <h3 className="font-comic text-[14cqw] leading-[0.95] [text-shadow:0.8cqw_0.8cqw_0_#a4a4aa]">
        To be continued…
      </h3>
      <p className="max-w-[70%] text-[3.4cqw] leading-snug text-[#222]">
        More case files are on the way. Got a case of your own?
      </p>
      <a
        href="#contact"
        className={`cursor-pointer bg-[#0b0b0b] px-[6cqw] py-[2cqw] text-[3cqw] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#333] ${SLANT}`}
      >
        Start a new case
      </a>
    </div>
  );
}

function PageContent({
  page,
  onJump,
}: {
  page: PageDef;
  onJump: (n: number) => void;
}) {
  switch (page.kind) {
    case "cover":
      return <Cover count={projects.length} />;
    case "back":
      return <BackCover />;
    case "index":
      return <IndexPage onJump={onJump} />;
    case "project":
      return <ProjectPage project={page.project} n={page.n} />;
    case "end":
      return <EndPage />;
    default:
      return null;
  }
}

function PageBody({
  page,
  onJump,
}: {
  page: PageDef;
  onJump: (n: number) => void;
}) {
  const dark = page.kind === "cover" || page.kind === "back";
  return (
    <div
      className={`absolute inset-0 border-[5px] border-[#0b0b0d] [container-type:inline-size] ${
        dark
          ? "bg-[#0b0b0d] text-white"
          : "bg-[#fbfbf8] text-[#0b0b0b] [background-image:radial-gradient(rgba(0,0,0,0.07)_22%,transparent_24%)] [background-size:2.2cqw_2.2cqw]"
      }`}
    >
      <PageContent page={page} onJump={onJump} />
    </div>
  );
}

/* ===================== DESKTOP ===================== */

function Face({
  page,
  side,
  back,
  shade,
  onJump,
}: {
  page: PageDef;
  side: "left" | "right";
  back?: boolean;
  shade: MotionValue<number>;
  onJump: (n: number) => void;
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${
        back ? "[transform:rotateY(180deg)]" : ""
      }`}
      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
    >
      <PageBody page={page} onJump={onJump} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            side === "right"
              ? "linear-gradient(to right, rgba(0,0,0,0.3), transparent 14%)"
              : "linear-gradient(to left, rgba(0,0,0,0.3), transparent 14%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-black"
        style={{ opacity: shade }}
      />
    </div>
  );
}

function Leaf({
  index,
  total,
  flippedCount,
  delay,
  front,
  back,
  onJump,
}: {
  index: number;
  total: number;
  flippedCount: number;
  delay: number;
  front: PageDef;
  back: PageDef;
  onJump: (n: number) => void;
}) {
  const isFlipped = index < flippedCount;
  const rot = useMotionValue(isFlipped ? -180 : 0);

  useEffect(() => {
    const controls = animate(rot, isFlipped ? -180 : 0, {
      duration: 1,
      delay,
      ease: EASE,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlipped]);

  const z = useTransform(rot, (r) => (r < -90 ? index : total - index));
  const frontShade = useTransform(rot, [-90, 0], [0.45, 0]);
  const backShade = useTransform(rot, [-180, -90], [0, 0.45]);
  const interactive = index === flippedCount || index === flippedCount - 1;

  return (
    <motion.div
      className="absolute left-1/2 top-0 h-full w-1/2"
      style={{
        rotateY: rot,
        z,
        originX: 0,
        originY: 0.5,
        transformStyle: "preserve-3d",
        pointerEvents: interactive ? "auto" : "none",
      }}
    >
      <Face page={front} side="right" shade={frontShade} onJump={onJump} />
      <Face page={back} side="left" back shade={backShade} onJump={onJump} />
    </motion.div>
  );
}

/* ===================== MOBILE ===================== */

function MobileLeaf({
  index,
  total,
  flippedCount,
  delay,
  front,
  back,
  onJump,
}: {
  index: number;
  total: number;
  flippedCount: number;
  delay: number;
  front: PageDef;
  back: PageDef;
  onJump: (n: number) => void;
}) {
  const isFlipped = index < flippedCount;
  const rot = useMotionValue(isFlipped ? -180 : 0);

  useEffect(() => {
    const controls = animate(rot, isFlipped ? -180 : 0, {
      duration: 1,
      delay,
      ease: EASE,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlipped]);

  const z = useTransform(rot, (r) => (r < -90 ? index : total - index));
  const frontShade = useTransform(rot, [-90, 0], [0.45, 0]);
  const backShade = useTransform(rot, [-180, -90], [0, 0.45]);
  const interactive = index === flippedCount || index === flippedCount - 1;

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        rotateY: rot,
        z,
        originX: 0,
        originY: 0.5,
        transformStyle: "preserve-3d",
        pointerEvents: interactive ? "auto" : "none",
      }}
    >
      {/* FRONT */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
      >
        <PageBody page={front} onJump={onJump} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.28), transparent 14%)",
          }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: frontShade }}
        />
      </div>

      {/* BACK — blank paper (the back cover lives in a fixed base layer) */}
      <div
        className="absolute inset-0 overflow-hidden [transform:rotateY(180deg)]"
        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
      >
        <PageBody page={back} onJump={onJump} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, rgba(0,0,0,0.28), transparent 14%)",
          }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: backShade }}
        />
      </div>
    </motion.div>
  );
}

/* ===================== BOOK ===================== */

function Book({ desktop, active }: { desktop: boolean; active: boolean }) {
  const [flipped, setFlipped] = useState(0);
  const [move, setMove] = useState({ from: 0, to: 0 });
  const touch = useRef<{ x: number; y: number } | null>(null);

  const pages = useMemo<PageDef[]>(() => {
    const base: PageDef[] = [
      { kind: "cover" },
      { kind: "index" },
      ...projects.map((project, i): PageDef => ({ kind: "project", project, n: i + 1 })),
      { kind: "end" },
    ];

    if (!desktop) {
      // mobile: no separate back page — back cover is the reverse of the last leaf
      return base;
    }

    if ((base.length + 1) % 2 !== 0) base.push({ kind: "blank" });
    base.push({ kind: "back" });
    return base;
  }, [desktop]);

  const leaves = useMemo(() => {
    if (desktop) {
      return Array.from({ length: pages.length / 2 }, (_, k) => ({
        front: pages[2 * k],
        back: pages[2 * k + 1],
      }));
    }

    // mobile: each content page is a leaf.
    // LAST leaf: front = "To be continued…", back = the book's back cover
    return pages.map((p, i) => ({
      front: p,
      back: (i === pages.length - 1
        ? { kind: "back" }
        : { kind: "blank" }) as PageDef,
    }));
  }, [pages, desktop]);

  const total = leaves.length;
  const maxFlip = total; // last Next closes onto back cover
  const bookClosed = flipped === maxFlip;

  const go = (target: number) => {
    const t = Math.max(0, Math.min(maxFlip, target));
    if (t === flipped) return;
    setMove({ from: flipped, to: t });
    setFlipped(t);
  };

  const pageIndexOf = (n: number) => n + 1;
  const jumpToProject = (n: number) => {
    const idx = pageIndexOf(n);
    go(desktop ? Math.ceil(idx / 2) : idx);
  };

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(flipped + 1);
      if (e.key === "ArrowLeft") go(flipped - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const delayFor = (i: number) => {
    const { from, to } = move;
    const step = Math.min(0.1, 0.5 / Math.max(1, Math.abs(to - from)));
    if (to > from && i >= from && i < to) return (i - from) * step;
    if (to < from && i >= to && i < from) return (from - 1 - i) * step;
    return 0;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touch.current;
    touch.current = null;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      go(flipped + (dx < 0 ? 1 : -1));
    }
  };

  const visibleIdx = desktop ? [2 * flipped - 1, 2 * flipped] : [flipped];

  const visiblePages = visibleIdx
    .map((i) => pages[i])
    .filter((p): p is PageDef => Boolean(p));
  const nums = visiblePages.flatMap((p) => (p.kind === "project" ? [p.n] : []));

  let label = "";
  if (bookClosed) {
    label = "Back cover";
  } else if (nums.length) {
    const lo = Math.min(...nums);
    const hi = Math.max(...nums);
    label = `Case ${pad(lo)}${hi > lo ? `–${pad(hi)}` : ""} of ${pad(projects.length)}`;
  } else {
    const kind = visiblePages[0]?.kind;
    label =
      kind === "cover"
        ? "Cover"
        : kind === "index"
          ? "Contents"
          : kind === "end"
            ? "The end"
            : kind === "back"
              ? "Back cover"
              : "";
  }

  const shift = flipped === 0 ? "-25%" : flipped === total ? "25%" : "0%";

  return (
    <>
      {desktop ? (
        <div className="[perspective:2400px]">
          <motion.div
            className="relative mx-auto aspect-[3/2] w-full max-w-4xl"
            style={{ transformStyle: "preserve-3d" }}
            initial={false}
            animate={{ x: shift }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="pointer-events-none absolute inset-x-[8%] -bottom-6 h-10 rounded-full bg-black/35 blur-2xl" />
            {leaves.map((leaf, i) => (
              <Leaf
                key={i}
                index={i}
                total={total}
                flippedCount={flipped}
                delay={delayFor(i)}
                front={leaf.front}
                back={leaf.back}
                onJump={jumpToProject}
              />
            ))}
          </motion.div>
        </div>
      ) : (
        <div
          className="relative mx-auto w-full max-w-sm touch-pan-y [perspective:1600px]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* slides right when closed so the flipped back cover is centered (like desktop) */}
          <motion.div
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
            initial={false}
            animate={{ x: bookClosed ? "100%" : "0%" }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="pointer-events-none absolute inset-x-[6%] -bottom-5 h-10 rounded-full bg-black/40 blur-2xl" />

            {/* page stack edges — hide when closed */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-[3px] right-[-10px] w-[10px] rounded-r-sm transition-opacity duration-500 ${
                bookClosed ? "opacity-0" : "opacity-100"
              }`}
              style={{
                background:
                  "repeating-linear-gradient(to right, #d4d3cd 0px, #d4d3cd 1.5px, #f0efe9 1.5px, #f0efe9 3px)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-[-6px] w-[8px] rounded-l-sm"
              style={{
                background:
                  "linear-gradient(to right, #1a1a1c, #2e2e32 40%, #1a1a1c)",
              }}
            />

            <div
              className="relative aspect-[3/4] w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {!bookClosed && (
                <div className="absolute inset-0 border-[5px] border-[#0b0b0d] bg-[#f0efe9]" />
              )}

              {leaves.map((leaf, i) => (
                <MobileLeaf
                  key={i}
                  index={i}
                  total={total}
                  flippedCount={flipped}
                  delay={delayFor(i)}
                  front={leaf.front}
                  back={leaf.back}
                  onJump={jumpToProject}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* controls */}
      <div className="mt-14 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => go(flipped - 1)}
            disabled={flipped === 0}
            aria-label="Previous page"
            className="inline-flex cursor-pointer -skew-x-12 items-center gap-2 border-[3px] border-[#0b0b0b] bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition hover:bg-[#0b0b0b] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#0b0b0b] sm:px-6"
          >
            <ArrowLeft size={16} /> Prev
          </button>
          <span className="min-w-[7.5rem] text-center font-mono text-sm text-[#55555a]">
            {label}
          </span>
          <button
            type="button"
            onClick={() => go(flipped + 1)}
            disabled={flipped === maxFlip}
            aria-label="Next page"
            className="inline-flex cursor-pointer -skew-x-12 items-center gap-2 border-[3px] border-[#0b0b0b] bg-[#0b0b0b] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-30 sm:px-6"
          >
            Next <ArrowRight size={16} />
          </button>
        </div>

        <ul className="flex flex-wrap justify-center gap-2">
          {projects.map((p, i) => {
            const isActive = !bookClosed && visibleIdx.includes(pageIndexOf(i + 1));
            return (
              <li key={p.title + i}>
                <button
                  type="button"
                  onClick={() => jumpToProject(i + 1)}
                  aria-label={`Go to ${p.title}`}
                  className={`inline-flex cursor-pointer items-center gap-1 border-2 border-[#0b0b0b] px-3 py-1 font-comic text-lg transition ${
                    isActive ? "bg-[#0b0b0b] text-white" : "bg-white hover:bg-[#c9c9cc]"
                  }`}
                >
                  {p.featured && <Star className="h-3.5 w-3.5 fill-current" />}
                  {pad(i + 1)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

/* ===================== SECTION ===================== */

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px" });
  const desktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false
  );

  return (
    <section
      id="projects"
      ref={ref}
      className="relative overflow-hidden bg-[#efefec] py-28 text-[#0b0b0b] [background-image:radial-gradient(rgba(0,0,0,0.16)_22%,transparent_24%)] [background-size:12px_12px]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-5 inline-block -rotate-1 border-[3px] border-[#0b0b0b] bg-white px-4 py-1.5 shadow-[4px_4px_0_#0b0b0b]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#0b0b0b]">
            Selected Work
          </p>
        </div>

        <h2 className="mb-5 font-comic text-6xl font-normal tracking-wide [text-shadow:4px_4px_0_#a4a4aa] md:text-8xl">
          Projects
        </h2>

        <div className="relative mb-14 max-w-md rounded-2xl border-[3px] border-[#0b0b0b] bg-white p-5 shadow-[5px_5px_0_#0b0b0b] before:absolute before:-bottom-3 before:left-10 before:h-4 before:w-4 before:rotate-45 before:border-b-[3px] before:border-r-[3px] before:border-[#0b0b0b] before:bg-white before:content-['']">
          <p className="text-[15px] leading-relaxed text-[#222]">
            Open the book and flip through the case files. Start with the two
            featured cases, marked with a star.
          </p>
        </div>

        <Book key={desktop ? "desktop" : "mobile"} desktop={desktop} active={inView} />
      </div>
    </section>
  );
}