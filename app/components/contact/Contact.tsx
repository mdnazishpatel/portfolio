"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Terminal,
  Mail,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

/* ---------- Edit these ---------- */
const EMAIL = "patelnazish7@gmail.com"
const FORM_URL = "https://formspree.io/f/mjyyllpn";

// Social links
const SOCIALS = {
  github: "https://github.com/mdnazishpatel",
  linkedin: "https://www.linkedin.com/in/nazish-patel-8a71272a0/",
  x:"https://x.com/NazishPatel7?s=09"
};

/* ---------- Helpers ---------- */
const pad2 = (n: number) => String(n).padStart(2, "0");

function clock(date: Date) {
  return date.toLocaleTimeString("en-GB", {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function sessionClock(total: number) {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  return `${pad2(h)}:${pad2(m)}:${pad2(total % 60)}`;
}

type LogLine = { t: string; kind: "info" | "ok" | "err"; text: string };

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [now, setNow] = useState<Date | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [bootTime, setBootTime] = useState("");
  const [sentAt, setSentAt] = useState("");
  const [log, setLog] = useState<LogLine[]>([]);

  useEffect(() => {
    const start = new Date();
    setNow(start);
    setBootTime(clock(start));
    const id = setInterval(() => {
      setNow(new Date());
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const stamp = () => clock(new Date());
  const addLog = (kind: LogLine["kind"], text: string) =>
    setLog((l) => [...l, { t: stamp(), kind, text }].slice(-6));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    addLog("info", "Encrypting message...");
    const form = e.currentTarget;

    try {
      addLog("info", "Transmitting signal...");
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (res.ok) {
        setStatus("sent");
        setSentAt(stamp());
        addLog("ok", "Transmission delivered.");
        form.reset();
      } else {
        setStatus("error");
        addLog("err", "Transmission failed.");
      }
    } catch {
      setStatus("error");
      addLog("err", "Transmission failed.");
    }
  }

  const kindStyle: Record<LogLine["kind"], { icon: string; color: string }> = {
    info: { icon: "→", color: "text-emerald-500/80" },
    ok: { icon: "✓", color: "text-emerald-400" },
    err: { icon: "✕", color: "text-red-400" },
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden bg-[#050506] text-[#e4e4e7] selection:bg-[#d4d4d8]/20"
    >
      {/* ===== Background ===== */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Heavy vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050506_75%)]" />

        {/* Soft atmospheric haze */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(212,212,216,0.04),transparent_70%)]" />

        {/* Faint city grid at bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-72 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #a1a1aa 1px, transparent 1px),
              linear-gradient(to bottom, #a1a1aa 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "linear-gradient(to top, black, transparent)",
          }}
        />
      </div>

      {/* ===== Top system bar ===== */}
      <div className="relative z-20 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px] tracking-widest text-emerald-500/90">
              SYSTEM ONLINE
            </span>
          </div>
          <div className="font-mono text-[11px] text-[#71717a]">
            <span className="tabular-nums text-[#a1a1aa]">
              {now ? clock(now) : "00:00:00"}
            </span>
          </div>
        </div>
      </div>

      {/* ===== Header with realistic Bat-signal ===== */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-12 text-center lg:pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mx-auto mb-10 h-52 w-52 sm:h-64 sm:w-64"
        >
          {/* Outer soft glow (atmosphere) */}
          <div className="absolute -inset-16 rounded-full bg-[#d4d4d8]/[0.07] blur-[60px]" />

          {/* Mid glow ring */}
          <div className="absolute -inset-8 rounded-full bg-[#e4e4e7]/[0.12] blur-3xl" />

          {/* Core light source */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.55)_0%,rgba(228,228,231,0.25)_35%,rgba(212,212,216,0.08)_60%,transparent_75%)]" />

          {/* Subtle pulsing halo */}
          <motion.div
            className="absolute inset-4 rounded-full bg-white/10 blur-xl"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* The Batman silhouette (mask) */}
          <div className="absolute left-1/2 top-1/2 aspect-[903/396] w-[68%] -translate-x-1/2 -translate-y-1/2 bg-[#050506] [mask-image:url(/batman.svg)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]" />

          {/* Realistic volumetric light beam coming down */}
          <div className="absolute left-1/2 top-[58%] h-[38rem] w-[85rem] max-w-none -translate-x-1/2">
            {/* Main cone */}
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(228,228,231,0.18) 0%, rgba(212,212,216,0.07) 25%, rgba(212,212,216,0.025) 55%, transparent 85%)",
                clipPath: "polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%)",
                filter: "blur(1px)",
              }}
            />
            {/* Softer outer falloff */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(228,228,231,0.08) 0%, rgba(212,212,216,0.03) 40%, transparent 80%)",
                clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)",
                filter: "blur(8px)",
              }}
            />
            {/* Inner brighter core of the beam */}
            <div
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(228,228,231,0.04) 30%, transparent 70%)",
                clipPath: "polygon(48% 0%, 52% 0%, 70% 100%, 30% 100%)",
              }}
            />
          </div>
        </motion.div>

        <p className="mb-3 font-mono text-xs tracking-[0.3em] text-[#71717a]">
          SECURE UPLINK // 05
        </p>
        <h2 className="font-display text-6xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-8xl">
         Send the
           <span className="text-[#a1a1aa]"> Signal.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[#a1a1aa]">
          The line is open. Whether it&apos;s a mission, a collaboration, or a simple
          transmission — I&apos;m listening.
        </p>
      </div>

      {/* ===== Main content ===== */}
      <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-10 px-6 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
        {/* ---------- LEFT: Contact links ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-4 lg:col-span-4"
        >
          <p className="mb-6 font-mono text-[11px] tracking-[0.25em] text-[#52525b]">
            DIRECT CHANNELS
          </p>

          {/* Gmail */}
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 transition-all hover:border-white/15 hover:bg-white/[0.05]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#a1a1aa] transition-colors group-hover:text-white">
              <Mail size={18} />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] tracking-widest text-[#52525b]">GMAIL</p>
              <p className="truncate text-sm text-[#e4e4e7] transition-colors group-hover:text-white">
                {EMAIL}
              </p>
            </div>
          </a>

          {/* GitHub */}
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 transition-all hover:border-white/15 hover:bg-white/[0.05]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#a1a1aa] transition-colors group-hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-widest text-[#52525b]">GITHUB</p>
              <p className="text-sm text-[#e4e4e7] transition-colors group-hover:text-white">
                @Nazish_Patel
              </p>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 transition-all hover:border-white/15 hover:bg-white/[0.05]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#a1a1aa] transition-colors group-hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-widest text-[#52525b]">LINKEDIN</p>
              <p className="text-sm text-[#e4e4e7] transition-colors group-hover:text-white">
                Nazish Ali
              </p>
            </div>
          </a>

          {/* X */}
          <a
            href={SOCIALS.x}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 transition-all hover:border-white/15 hover:bg-white/[0.05]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#a1a1aa] transition-colors group-hover:text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-widest text-[#52525b]">X</p>
              <p className="text-sm text-[#e4e4e7] transition-colors group-hover:text-white">
                @Nazish_Patel
              </p>
            </div>
          </a>
        </motion.div>

        {/* ---------- RIGHT: Terminal form ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-8"
        >
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0b]/80 shadow-2xl shadow-black/50 backdrop-blur-xl">
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex shrink-0 gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                </div>
                <span className="truncate font-mono text-xs text-[#71717a]">
                  transmission_console.exe
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3 pl-3">
                <span className="font-mono text-[11px] tabular-nums text-[#52525b]">
                  {now ? clock(now) : "--:--:--"}
                </span>
                <Terminal size={14} className="text-[#52525b]" />
              </div>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              {/* Terminal log */}
              <div className="mb-6 min-h-[4.5rem] space-y-1 font-mono text-[12px] text-[#52525b]">
                {bootTime && (
                  <>
                    <p>
                      <span className="text-[#3f3f46]">[{bootTime}]</span>{" "}
                      <span className="text-emerald-500/80">→</span> Establishing secure
                      connection...
                    </p>
                    <p>
                      <span className="text-[#3f3f46]">[{bootTime}]</span>{" "}
                      <span className="text-emerald-500/80">→</span> Channel encrypted. Ready
                      for input.
                    </p>
                  </>
                )}
                {log.map((line, i) => (
                  <p key={i}>
                    <span className="text-[#3f3f46]">[{line.t}]</span>{" "}
                    <span className={kindStyle[line.kind].color}>
                      {kindStyle[line.kind].icon}
                    </span>{" "}
                    <span className={line.kind === "err" ? "text-red-400/80" : undefined}>
                      {line.text}
                    </span>
                  </p>
                ))}
              </div>

              <div className="space-y-5">
                <Field
                  label="IDENTITY"
                  name="name"
                  placeholder="Enter codename or full name"
                  required
                />
                <Field
                  label="SECURE ADDRESS"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
                <Field
                  label="MISSION BRIEF"
                  name="message"
                  as="textarea"
                  placeholder="Describe the project, opportunity, or message..."
                  rows={5}
                  required
                />
              </div>

              {/* Submit */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg bg-[#e4e4e7] px-6 py-4 font-mono text-sm font-semibold tracking-wider text-[#050506] transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <AnimatePresence mode="wait">
                    {status === "sending" ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 size={16} className="animate-spin" />
                        ENCRYPTING TRANSMISSION...
                      </motion.span>
                    ) : status === "sent" ? (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 size={16} />
                        TRANSMISSION COMPLETE
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        INITIATE TRANSMISSION
                        <Send
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {status === "sent" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 overflow-hidden"
                  >
                    <div className="flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                      <div>
                        <p className="font-mono text-sm text-emerald-400">
                          Signal received at {sentAt}.
                        </p>
                        <p className="mt-1 text-xs text-emerald-400/70">
                          I&apos;ll get back to you as soon as possible.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 overflow-hidden"
                  >
                    <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                      <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
                      <div>
                        <p className="font-mono text-sm text-red-400">Transmission failed.</p>
                        <p className="mt-1 text-xs text-red-400/70">
                          Please try again or email me directly.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>

      {/* ===== Skyline + footer ===== */}
      <div
        aria-hidden="true"
        className="relative z-0 h-28 bg-[#0b0b0d] [background-image:radial-gradient(rgba(228,228,231,0.22)_1px,transparent_1.6px)] [background-size:14px_18px] [clip-path:polygon(0%_100%,0%_60%,4%_60%,4%_40%,8%_40%,8%_55%,12%_55%,12%_25%,16%_25%,16%_50%,21%_50%,21%_15%,22%_15%,22%_5%,23%_5%,23%_15%,24%_15%,24%_45%,29%_45%,29%_60%,34%_60%,34%_30%,39%_30%,39%_55%,44%_55%,44%_35%,48%_35%,48%_50%,53%_50%,53%_20%,58%_20%,58%_45%,63%_45%,63%_60%,68%_60%,68%_30%,73%_30%,73%_50%,78%_50%,78%_38%,83%_38%,83%_58%,88%_58%,88%_28%,93%_28%,93%_52%,100%_52%,100%_100%)] md:h-40"
      />
      <div className="relative z-10 bg-[#0b0b0d] pb-8 pt-2 text-center">
        <p className="font-mono text-[11px] tracking-[0.25em] text-[#71717a]">
          © 2026 NAZISH ALI · DESIGNED IN THE BATCAVE
        </p>
        <p className="mt-2 font-mono text-[10px] tracking-[0.25em] tabular-nums text-[#52525b]">
          SESSION {sessionClock(seconds)}
        </p>
      </div>
    </section>
  );
}

/* ---------- Field component ---------- */
function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  as = "input",
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
}) {
  const base =
    "w-full rounded-md border border-white/10 bg-black/40 px-4 py-3.5 font-mono text-sm text-[#e4e4e7] placeholder:text-[#3f3f46] outline-none transition-all focus:border-[#a1a1aa]/40 focus:bg-black/60 focus:ring-1 focus:ring-[#a1a1aa]/20";

  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-[#71717a]">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          placeholder={placeholder}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={base}
        />
      )}
    </div>
  );
}