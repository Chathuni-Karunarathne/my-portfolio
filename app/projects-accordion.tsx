"use client";

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
				<div className="mb-4 flex gap-1.5"><span className="h-2 w-2 rounded-full bg-fuchsia-300/80" /><span className="h-2 w-2 rounded-full bg-purple-300/70" /><span className="h-2 w-2 rounded-full bg-cyan-300/70" /></div>
				<div className="grid h-[calc(100%-1.5rem)] grid-cols-5 gap-2"><div className="rounded bg-purple-300/10" /><div className="col-span-4 space-y-2"><div className="h-3 w-2/3 rounded bg-white/20" /><div className="h-20 rounded bg-white/10" /><div className="grid grid-cols-3 gap-2"><div className="h-8 rounded bg-purple-300/15" /><div className="h-8 rounded bg-cyan-300/15" /><div className="h-8 rounded bg-fuchsia-300/15" /></div></div></div>
			</div>
			<span className="absolute bottom-4 left-5 text-xs uppercase tracking-[0.22em] text-white/60">Project preview / {number}</span>
		</div>
	);
}

export default function ProjectsAccordion() {
	return (
		<section id="projects" className="relative w-full py-20">
			<h2 className="mb-12 text-6xl font-black tracking-wider text-white/90 drop-shadow-[0_0_35px_rgba(168,85,247,0.3)]">PROJECTS</h2>
			<div className="space-y-0">
				{projects.map((project, index) => {
					const stackClasses = [
						"sticky top-24 z-10 mb-20",
						"sticky top-32 z-20 mb-20",
						"sticky top-40 z-30 mb-20",
						"sticky top-48 z-40 mb-20",
					][index];

					return (
						<article key={project.number} className={`${stackClasses} overflow-hidden rounded-3xl border border-purple-500/30 bg-[#0d0722] shadow-[0_-15px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl`}>
							<div className="flex w-full items-center gap-4 border-b border-purple-500/20 px-5 py-4 md:gap-8 md:px-8">
								<span className="text-4xl font-black text-white/90 md:text-6xl">{project.number}</span>
								<span className="min-w-0 flex-1"><span className="block truncate text-lg font-semibold text-white md:text-2xl">{project.title}</span><span className="mt-1 block truncate text-sm text-slate-400">{project.timeline}</span></span>
							</div>
							<div className="grid gap-6 p-5 md:grid-cols-[1.1fr_1fr] md:p-8"><div><p className="text-base leading-relaxed text-slate-300">{project.description}</p><div className="mt-6 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="rounded-full border border-purple-500/30 bg-purple-950/60 px-3 py-1.5 text-xs text-purple-200">{technology}</span>)}</div></div><ProjectPreview number={project.number} /></div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
