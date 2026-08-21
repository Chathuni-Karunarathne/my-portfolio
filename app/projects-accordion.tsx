"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";

type Project = {
    number: string;
    title: string;
    timeline: string;
    description: string;
    technologies: string[];
    image?: string; // Dynamic project image path
};

const projects: Project[] = [
    {
        number: "01",
        title: "Enterprise IT Asset Management System (EITAMS)",
        timeline: "11/2025 - Present",
        description: "A scalable, enterprise-level asset registry featuring real-time tracking, advanced data grids, bulk transfers, automated PDF tag generation, and role-based authentication.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Drizzle ORM"],
        image: "/eitams.png",
    },
    {
        number: "02",
        title: "Wordora - Full-Stack Blogging Platform",
        timeline: "09/2025 - 11/2025",
        description: "A dynamic content publishing platform with secure role-based access, comprehensive blog CRUD management, optimized relational schema, and interactive user profiles.",
        technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Git", "GitHub"],
        image: "/wordora.png",
    },
    {
        number: "03",
        title: "Retro Clash - Microcontroller Interactive Pong Game",
        timeline: "12/2024 - 08/2025",
        description: "A physical arcade game powered by custom EasyEDA PCBs, rotary encoder paddle controls, and seven-segment displays synchronized via shift registers.",
        technologies: ["ESP32", "Arduino", "C++", "EasyEDA", "74HC595", "Rotary Encoders"],
        image: "/retroclash.jpg",
    },
    {
        number: "04",
        title: "Camping Reservation System",
        timeline: "10/2023 - 04/2024",
        description: "A desktop reservation management platform built with Java Swing/AWT, featuring JDBC MySQL integration, report/PDF generation, and internationalization (i18n) support.",
        technologies: ["Java", "Swing", "AWT", "MySQL", "JDBC", "PDF Generation"],
        image: "/campres.png",
    },
];

function ProjectPreview({ number, image, title }: { number: string; image?: string; title: string }) {
    return (
        <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-purple-500/30 bg-purple-950/20 md:h-60">
            {image ? (
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={number === "01"}
                />
            ) : (
                /* Fallback gradient if image is missing */
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-900/40 to-slate-900 text-sm text-purple-300/60">
                    No image provided
                </div>
            )}

            {/* Subtle Overlay Badge */}
            <span className="absolute bottom-3 left-4 rounded-md bg-black/60 px-2.5 py-1 text-xs uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
                Project  {number} / preview
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
                <motion.article className="relative w-full rounded-[2rem] border border-[#2A0134]/70 bg-[#1a0524]/60 p-6 shadow-2xl backdrop-blur-xl overflow-hidden md:px-8 md:pt-6 md:pb-8">
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_55%)]" />
                    <div className="flex w-full relative z-10 items-center gap-4 border-b border-purple-500/20 pb-3.5 md:gap-6">
                        <span className="text-3xl font-black text-white/90 md:text-5xl">
                            {project.number}
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block truncate text-base font-bold text-white md:text-xl">
                                {project.title}
                            </span>
                            <span className="mt-0.5 block truncate text-xs font-medium text-slate-400 md:text-sm">
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
                                        className="rounded-full border border-purple-400/40 bg-[#2A0134]/80 px-3 py-1 text-xs font-medium text-purple-100 shadow-[0_0_0_1px_rgba(168,85,247,0.3),0_0_20px_rgba(42,1,52,0.5)]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <ProjectPreview number={project.number} image={project.image} title={project.title} />
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
