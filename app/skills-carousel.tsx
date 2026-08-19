"use client";

import {
  siArduino, siC, siCplusplus, siDocker, siDrizzle, siEasyeda,
  siEspressif, siExpo, siFastapi, siGit, siGithub, siJavascript,
  siMysql, siNeon, siNextdotjs, siNodedotjs, siOpenjdk, siPostgresql,
  siPython, siReact, siSqlite, siTailwindcss, siTypescript, siVercel,
} from "simple-icons";

type SkillItem = { name: string; iconPath: string; color: string };
type SkillBelt = { title: string; reverse: boolean; items: SkillItem[] };

const belts: SkillBelt[] = [
  { title: "Languages", reverse: false, items: [
    { name: "TypeScript", iconPath: siTypescript.path, color: "#3178C6" }, { name: "JavaScript", iconPath: siJavascript.path, color: "#F7DF1E" }, { name: "Java", iconPath: siOpenjdk.path, color: "#EA2D2E" }, { name: "C", iconPath: siC.path, color: "#A8B9CC" }, { name: "C++", iconPath: siCplusplus.path, color: "#00599C" }, { name: "SQL", iconPath: siSqlite.path, color: "#003B57" }, { name: "Python", iconPath: siPython.path, color: "#3776AB" },
  ] },
  { title: "Frameworks & Libraries", reverse: true, items: [
    { name: "Tailwind CSS", iconPath: siTailwindcss.path, color: "#06B6D4" }, { name: "Next.js", iconPath: siNextdotjs.path, color: "#FFFFFF" }, { name: "React", iconPath: siReact.path, color: "#61DAFB" }, { name: "Node.js", iconPath: siNodedotjs.path, color: "#5FA04E" }, { name: "REST APIs", iconPath: siFastapi.path, color: "#00A393" },
  ] },
  { title: "Databases & ORMs", reverse: false, items: [
    { name: "MySQL", iconPath: siMysql.path, color: "#4479A1" }, { name: "PostgreSQL", iconPath: siPostgresql.path, color: "#4169E1" }, { name: "Drizzle", iconPath: siDrizzle.path, color: "#C5F74F" }, { name: "Neon", iconPath: siNeon.path, color: "#00E699" },
  ] },
  { title: "DevOps Tools", reverse: true, items: [
    { name: "Git", iconPath: siGit.path, color: "#F05032" }, { name: "GitHub", iconPath: siGithub.path, color: "#FFFFFF" }, { name: "Docker", iconPath: siDocker.path, color: "#2496ED" }, { name: "Vercel", iconPath: siVercel.path, color: "#FFFFFF" }, { name: "Expo", iconPath: siExpo.path, color: "#FFFFFF" },
  ] },
  { title: "Hardware Platforms", reverse: false, items: [
    { name: "ESP32", iconPath: siEspressif.path, color: "#E7352C" }, { name: "Arduino", iconPath: siArduino.path, color: "#00979D" }, { name: "PCB Design (EasyEDA)", iconPath: siEasyeda.path, color: "#1765F6" },
  ] },
];

function SkillPill({ item }: { item: SkillItem }) {
  return <div className="flex w-max items-center gap-3 rounded-full border border-purple-500/30 bg-purple-950/40 px-5 py-2.5 font-medium whitespace-nowrap text-purple-100 shadow-lg transition-all duration-300 hover:border-purple-400/60 hover:bg-purple-900/50"><svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill={item.color} aria-hidden="true"><path d={item.iconPath} /></svg><span className="text-sm md:text-base">{item.name}</span></div>;
}

export default function SkillsCarousel() {
  return (
    <div className="relative z-10 flex flex-col gap-4">
      <style>{`
        @keyframes marquee-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes marquee-left {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-right {
          animation: marquee-right 20s linear infinite;
        }
        .animate-marquee-left {
          animation: marquee-left 20s linear infinite;
        }
      `}</style>
      {belts.map((belt) => {
        const duplicatedItems = [...belt.items, ...belt.items];
        const animationClass = belt.reverse ? "animate-marquee-left" : "animate-marquee-right";

        return (
          <div
            key={belt.title}
            className="group relative w-full overflow-hidden py-1 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-[#0d0722] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-[#0d0722] after:to-transparent"
          >
            <div className={`flex w-max gap-3 ${animationClass}`}>
              {duplicatedItems.map((item, index) => (
                <SkillPill key={`${belt.title}-${item.name}-${index}`} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}