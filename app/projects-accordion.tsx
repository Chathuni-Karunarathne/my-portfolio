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
        <div className="relative h-48 overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-fuchsia-500/25 via-purple-500/15 to-cyan-400/20 md:h-64">
            <div className="absolute inset-5 rounded-xl border border-white/10 bg-black/25 p-4 backdrop-blur-sm">
                <div className="mb-4 flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-fuchsia-300/80" />
                    <span className="h-2 w-2 rounded-full bg-purple-300/70" />
                    <span className="h-2 w-2 rounded-full bg-cyan-300/70" />
                </div>
                <div className="grid h-[calc(100%-1.5rem)] grid-cols-5 gap-2">
                    <div className="rounded bg-purple-300/10" />
                    <div className="col-span-4 space-y-2">
                        <div className="h-3 w-2/3 rounded bg-white/20" />
                        <div className="h-20 rounded bg-white/10" />
                        <div className="grid grid-cols-3 gap-2">
                            <div className="h-8 rounded bg-purple-300/15" />
                            <div className="h-8 rounded bg-cyan-300/15" />
                            <div className="h-8 rounded bg-fuchsia-300/15" />
                        </div>
                    </div>
                </div>
            </div>
            <span className="absolute bottom-4 left-5 text-xs uppercase tracking-[0.22em] text-white/60">
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

    // Title is stuck right to the top of Card 01 (~90px height + margin)
    // Subsequent cards pin progressively right below previous card header rows (~75px step)
    const topMargin = index === 0 ? 0 : 96 + index * 75;

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
                    <div className="mb-6">
                        <h2 className="text-4xl md:text-5xl font-black text-white/90 tracking-tight">
                            Projects
                            <span className="block w-24 h-1.5 bg-[#2A0134] mt-3 rounded-full shadow-[0_0_10px_rgba(42,1,52,0.8)]"></span>
                        </h2>
                    </div>
                )}
                <motion.article className="relative w-full rounded-3xl border border-purple-500/30 bg-[#0d0722] p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.95)] backdrop-blur-xl md:p-8">
                    <div className="flex w-full items-center gap-4 border-b border-purple-500/20 pb-4 md:gap-8">
                        <span className="text-4xl font-black text-white/90 md:text-6xl">
                            {project.number}
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block truncate text-lg font-semibold text-white md:text-2xl">
                                {project.title}
                            </span>
                            <span className="mt-1 block truncate text-sm text-slate-400">
                                {project.timeline}
                            </span>
                        </span>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_1fr]">
                        <div>
                            <p className="text-base leading-relaxed text-slate-300">
                                {project.description}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-purple-500/30 bg-purple-950/60 px-3 py-1.5 text-xs text-purple-200"
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
