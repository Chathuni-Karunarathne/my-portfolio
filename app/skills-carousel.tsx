"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  siArduino, siC, siCplusplus, siDocker, siDrizzle, siEasyeda,
  siEspressif, siExpo, siFastapi, siGit, siGithub, siJavascript,
  siMysql, siNeon, siNextdotjs, siNodedotjs, siOpenjdk, siPostgresql,
  siPython, siReact, siSqlite, siTailwindcss, siTypescript, siVercel,
} from "simple-icons";

type SkillItem = { name: string; iconPath: string; color: string };
type SkillCard = { title: string; items: SkillItem[] };

const cards: SkillCard[] = [
  { title: "Languages", items: [
    { name: "TypeScript", iconPath: siTypescript.path, color: "#3178C6" }, { name: "JavaScript", iconPath: siJavascript.path, color: "#F7DF1E" }, { name: "Java", iconPath: siOpenjdk.path, color: "#EA2D2E" }, { name: "C", iconPath: siC.path, color: "#A8B9CC" }, { name: "C++", iconPath: siCplusplus.path, color: "#00599C" }, { name: "SQL", iconPath: siSqlite.path, color: "#003B57" }, { name: "Python", iconPath: siPython.path, color: "#3776AB" },
  ] },
  { title: "Frameworks & Libraries", items: [
    { name: "Tailwind CSS", iconPath: siTailwindcss.path, color: "#06B6D4" }, { name: "Next.js", iconPath: siNextdotjs.path, color: "#FFFFFF" }, { name: "React", iconPath: siReact.path, color: "#61DAFB" }, { name: "Node.js", iconPath: siNodedotjs.path, color: "#5FA04E" }, { name: "REST APIs", iconPath: siFastapi.path, color: "#00A393" },
  ] },
  { title: "Databases & ORMs", items: [
    { name: "MySQL", iconPath: siMysql.path, color: "#4479A1" }, { name: "PostgreSQL", iconPath: siPostgresql.path, color: "#4169E1" }, { name: "Drizzle", iconPath: siDrizzle.path, color: "#C5F74F" }, { name: "Neon", iconPath: siNeon.path, color: "#00E699" },
  ] },
  { title: "DevOps Tools", items: [
    { name: "Git", iconPath: siGit.path, color: "#F05032" }, { name: "GitHub", iconPath: siGithub.path, color: "#FFFFFF" }, { name: "Docker", iconPath: siDocker.path, color: "#2496ED" }, { name: "Vercel", iconPath: siVercel.path, color: "#FFFFFF" }, { name: "Expo", iconPath: siExpo.path, color: "#FFFFFF" },
  ] },
  { title: "Hardware Platforms", items: [
    { name: "ESP32", iconPath: siEspressif.path, color: "#E7352C" }, { name: "Arduino", iconPath: siArduino.path, color: "#00979D" }, { name: "PCB Design (EasyEDA)", iconPath: siEasyeda.path, color: "#1765F6" },
  ] },
];

function SkillPill({ item }: { item: SkillItem }) {
  return (
    <div className="flex min-w-[110px] items-center justify-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/50 px-4 py-2.5 font-medium whitespace-nowrap text-purple-200 shadow-lg transition-all hover:bg-purple-900/80">
      <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill={item.color} aria-hidden="true">
        <path d={item.iconPath} />
      </svg>
      <span className="text-sm md:text-base">{item.name}</span>
    </div>
  );
}

function relativePosition(index: number, activeIndex: number) {
  const distance = index - activeIndex;
  const half = cards.length / 2;

  if (distance > half) return distance - cards.length;
  if (distance < -half) return distance + cards.length;
  return distance;
}

function cardMotion(position: number) {
  const isActive = position === 0;
  const direction = position < 0 ? 1 : -1;

  return {
    x: position * 280,
    rotateY: isActive ? 0 : direction * 35,
    z: isActive ? 80 : -100,
    scale: isActive ? 1.05 : 0.8,
    opacity: isActive ? 1 : 0.3,
    filter: isActive ? "blur(0px)" : "blur(1px)",
  };
}

export default function SkillsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + cards.length) % cards.length);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="relative z-10 w-full"
      aria-roledescription="carousel"
      aria-label="Technical skills categories"
      onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(distance) > 50) move(distance > 0 ? -1 : 1);
        touchStartX.current = null;
      }}
    >
      <div className="relative mx-auto h-[30rem] w-full max-w-6xl [perspective:1200px] [transform-style:preserve-3d] md:h-[27rem]">
        {cards.map((card, index) => {
          const position = relativePosition(index, activeIndex);
          const isActive = position === 0;
          const isVisible = Math.abs(position) <= 2;
          return (
            <motion.article
              key={card.title}
              aria-label={`Show ${card.title}`}
              aria-pressed={isActive}
              initial={false}
              animate={cardMotion(position)}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") setActiveIndex(index);
              }}
              tabIndex={isVisible ? 0 : -1}
              role="button"
              className={`absolute left-1/2 top-1/2 w-[min(88%,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border p-8 [transform-style:preserve-3d] ${
                isActive
                  ? "z-30 border-purple-400/60 bg-[#120a2a]/80 shadow-[0_0_45px_rgba(168,85,247,0.4)]"
                  : "z-20 cursor-pointer border-purple-500/20 bg-[#2A0134]/60 hover:opacity-50"
              } ${isVisible ? "" : "opacity-0"}`}
            >
              <h3 className="mb-6 text-2xl font-semibold text-purple-100 md:text-3xl">{card.title}</h3>
              <div className="flex flex-wrap gap-3">
                {card.items.map((item) => <SkillPill key={item.name} item={item} />)}
              </div>
            </motion.article>
          );
        })}

        <button type="button" aria-label="Previous skills category" onClick={() => move(-1)} className="absolute left-2 top-1/2 z-40 -translate-y-1/2 rounded-full border border-purple-500/30 bg-purple-950/60 p-3 text-purple-200 transition-all hover:bg-purple-600 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] md:left-8">
          <span aria-hidden="true" className="text-xl leading-none">&lt;</span>
        </button>
        <button type="button" aria-label="Next skills category" onClick={() => move(1)} className="absolute right-2 top-1/2 z-40 -translate-y-1/2 rounded-full border border-purple-500/30 bg-purple-950/60 p-3 text-purple-200 transition-all hover:bg-purple-600 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] md:right-8">
          <span aria-hidden="true" className="text-xl leading-none">&gt;</span>
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-2" role="tablist" aria-label="Choose skill category">
        {cards.map((card, index) => (
          <button key={card.title} type="button" role="tab" aria-selected={index === activeIndex} aria-label={`Show ${card.title}`} onClick={() => setActiveIndex(index)} className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" : "w-2.5 bg-purple-500/30 hover:bg-purple-400/70"}`} />
        ))}
      </div>
    </div>
  );
}
