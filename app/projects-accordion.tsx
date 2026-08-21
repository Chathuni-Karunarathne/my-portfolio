"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

type Project = {
    number: string;
    title: string;
    timeline: string;
    description: string;
    technologies: string[];
};

const projects: Project[] = [
    {
        number: "01",
        title: "Enterprise IT Asset Management System (EITAMS)",
        timeline: "11/2025 - Present",
        description: "A scalable, enterprise-level asset registry featuring real-time tracking, advanced data grids, bulk transfers, automated PDF tag generation, and role-based authentication.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Drizzle ORM"],
    },
    {
        number: "02",
        title: "Wordora - Full-Stack Blogging Platform",
        timeline: "09/2025 - 11/2025",
        description: "A dynamic content publishing platform with secure role-based access, comprehensive blog CRUD management, optimized relational schema, and interactive user profiles.",
        technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Git", "GitHub"],
    },
    {
        number: "03",
        title: "Retro Clash - Microcontroller Interactive Pong Game",
        timeline: "12/2024 - 08/2025",
        description: "A physical arcade game powered by custom EasyEDA PCBs, rotary encoder paddle controls, and seven-segment displays synchronized via shift registers.",
        technologies: ["ESP32", "Arduino", "C++", "EasyEDA", "74HC595", "Rotary Encoders"],
    },
    {
        number: "04",
        title: "Camping Reservation System",
        timeline: "10/2023 - 04/2024",
        description: "A desktop reservation management platform built with Java Swing/AWT, featuring JDBC MySQL integration, report/PDF generation, and internationalization (i18n) support.",
        technologies: ["Java", "Swing", "AWT", "MySQL", "JDBC", "PDF Generation"],
    },
];

function ProjectPreview({ number }: { number: string }) {
    return (
        <div className="relative h-48 overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-fuchsia-500/25 via-purple-500/15 to-cyan-400/20 md:h-60">
            <div className="absolute inset-4 rounded-xl border border-white/10 bg-black/25 p-4 backdrop-blur-sm">
                <div className="mb-3 flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-fuchsia-300/80" />
                    <span className="h-2 w-2 rounded-full bg-purple-300/70" />
                    <span className="h-2 w-2 rounded-full bg-cyan-300/70" />
                </div>
                <div className="grid h-[calc(100%-1.25rem)] grid-cols-5 gap-2">
                    <div className="rounded bg-purple-300/10" />
                    <div className="col-span-4 space-y-2">
                        <div className="h-3 w-2/3 rounded bg-white/20" />
                        <div className="h-16 rounded bg-white/10" />
                        <div className="grid grid-cols-3 gap-2">
                            <div className="h-7 rounded bg-purple-300/15" />
                            <div className="h-7 rounded bg-cyan-300/15" />
                            <div className="h-7 rounded bg-fuchsia-300/15" />
                        </div>
                    </div>
                </div>
            </div>
            <span className="absolute bottom-3 left-4 text-xs uppercase tracking-[0.22em] text-white/60">
                Project preview / {number}
            </span>
        </div>
    );
}

function Card({
    project,
    index,
}: {
    project: Project;
    index: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });

    // Uniform step of exactly 92px between all cards so every header (number, title, and duration) remains fully visible
    const TITLE_HEIGHT = 80;
    const HEADER_STEP = 92;
    const topMargin = index === 0 ? 0 : TITLE_HEIGHT + index * HEADER_STEP;

    return (
        <div
            ref={containerRef}
            className="sticky top-20 flex h-[65vh] items-start justify-center"
            style={{
                paddingTop: `${topMargin}px`,
                zIndex: index + 10,
            }}
        >
            <div className="w-full">
                {index === 0 && (
                    <div className="mb-5 h-[60px]">
                        <h2 className="text-4xl md:text-5xl font-black text-white/90 tracking-tight">
                            Projects
                            <span className="block w-24 h-1.5 bg-[#2A0134] mt-3 rounded-full shadow-[0_0_10px_rgba(42,1,52,0.8)]"></span>
                        </h2>
                    </div>
                )}
                <motion.article className="relative w-full rounded-3xl border border-purple-500/30 bg-[#0d0722] p-6 md:px-8 md:pt-6 md:pb-8 shadow-[0_-20px_50px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                    {/* Header Strip with Number, Title, and Timeline Duration */}
                    <div className="flex w-full items-center gap-4 border-b border-purple-500/20 pb-3.5 md:gap-6">
                        <span className="text-3xl font-black text-white/90 md:text-5xl">
                            {project.number}
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block truncate text-base font-bold text-white md:text-xl">
                                {project.title}
                            </span>
                            <span className="mt-0.5 block truncate text-xs font-medium text-purple-300/80 md:text-sm">
                                {project.timeline}
                            </span>
                        </span>
                    </div>

                    <div className="mt-5 grid gap-6 md:grid-cols-[1.1fr_1fr]">
                        <div>
                            <p className="text-sm leading-relaxed text-slate-300 md:text-base">
                                {project.description}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-purple-500/30 bg-purple-950/60 px-3 py-1 text-xs text-purple-200"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <ProjectPreview number={project.number} />
                    </div>
                </motion.article>
            </div>
        </div>
    );
}

export default function ProjectsAccordion() {
    return (
        <section id="projects" className="relative w-full pt-4 pb-40">
            <div className="relative flex flex-col">
                {projects.map((project, index) => (
                    <Card
                        key={project.number}
                        project={project}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
