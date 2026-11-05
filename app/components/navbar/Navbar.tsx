"use client";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
   { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#1f2024] bg-[#0b0b0d]/85 backdrop-blur-[10px]">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 md:px-6">
        <a
          href="#home"
          className="font-display text-2xl font-black uppercase tracking-[0.12em] text-white"
        >
          NAZISH
        </a>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 md:gap-x-7">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200 md:text-[0.8rem] ${
                  active === l.id
                    ? "text-white"
                    : "text-[#9a9aa3] hover:text-white"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}