import SkillsCarousel from "./skills-carousel";
import ProjectsAccordion from "./projects-accordion";

export default function Home() {
  return (
    <div className="bg-[#080010] text-white min-h-screen font-sans">
      {/* Navigation (Top Left Horizontal) */}
      <nav className="fixed top-0 left-0 z-50 pt-3 px-6 md:pt-4 md:px-8 pointer-events-none w-full max-w-[100vw]">
        <ul className="flex flex-row flex-wrap items-center gap-4 lg:gap-8 pointer-events-auto relative px-6 py-3 rounded-full backdrop-blur-2xl bg-white/[0.04] border border-white/10 shadow-[0_0_0_1px_rgba(42,1,52,0.6),0_0_30px_rgba(42,1,52,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] w-max max-w-full overflow-x-auto no-scrollbar">
          {[
            { id: 'about', label: 'About' },
            { id: 'education', label: 'Education' },
            { id: 'skills', label: 'Technical Skills' },
            { id: 'projects', label: 'Projects' },
            { id: 'certificates', label: 'Certificates' },
            { id: 'experience', label: 'Experience' },
            { id: 'leadership', label: 'Community & Leadership' },
          ].map((item) => (
            <li key={item.id} className="whitespace-nowrap">
              <a
                href={`#${item.id}`}
                className="text-slate-300 hover:text-purple-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center text-sm md:text-sm lg:text-base font-medium"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section = #about landing page */}
      <header id="about" className="relative min-h-screen flex items-center justify-center bg-[#080010] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2A0134] to-[#080010] to-70% overflow-x-hidden overflow-y-visible">

        {/* 1. THE BIG BOLD 3D NAME */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
          <h6 className="text-[12vw] font-black text-white uppercase select-none tracking-[-0.05em] opacity-80 -translate-y-52
            [text-shadow:_1px_1px_0_#ccc,_2px_2px_0_#c5c5c5,_3px_3px_0_#bbb,_4px_4px_0_#b0b0b0,_5px_5px_0_#aaa,_6px_6px_0_#999,_7px_7px_0_#888,_8px_8px_20px_rgba(0,0,0,0.6)]
            leading-[0.8]">
            CHATHUNI
          </h6>
        </div>

        {/* 2. THE LIGHT GLOW */}
        <div className="absolute z-[1] aspect-square w-[50vw] rounded-full bg-[#2A0134] opacity-80 blur-[120px] pointer-events-none"></div>

        {/* Left Side: About Me Card (Moved further left) */}
        <div className="absolute left-6 lg:left-12 xl:left-24 top-1/2 -translate-y-1/2 z-20 max-w-[280px] xl:max-w-sm p-6 xl:p-8 rounded-2xl overflow-hidden backdrop-blur-2xl bg-white/[0.04] border border-white/10 shadow-[0_0_0_1px_rgba(42,1,52,0.5),0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(42,1,52,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] hidden md:block">
          {/* Inner top highlight line */}
          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
          {/* Corner accent dot */}
          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#2A0134] shadow-[0_0_6px_rgba(168,85,247,0.8)]"></div>
          <h2 className="text-2xl xl:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">Hello there! 👋</h2>
          <p className="text-sm xl:text-base text-slate-300 leading-relaxed font-light">
            I&apos;m An IT &amp; Management undergraduate at the University of Moratuwa.
            I’m drawn to things that let me create, experiment, and leave a little bit of my own touch behind.

          </p>
        </div>

        {/* Right Side: CTAs (Aligned right with consistent vertical spacing) */}
        <div className="absolute right-6 lg:right-12 xl:right-24 z-20 flex flex-col gap-6 w-full max-w-[220px] items-center hidden md:flex">
          {/* Download CV — Transparent glass pill */}
          <a href="/cv.pdf" className="relative w-full px-6 py-4 rounded-full text-center font-medium text-purple-200 overflow-hidden backdrop-blur-2xl bg-white/[0.04] border border-white/10 shadow-[0_0_0_1px_rgba(42,1,52,0.5),0_0_20px_rgba(42,1,52,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_0_0_1px_rgba(168,85,247,0.4),0_0_30px_rgba(42,1,52,0.6)] hover:bg-white/[0.07] transition-all duration-300 group">
            <span className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent"></span>
            Download my CV
          </a>
          {/* Contact Me — Neon glowing primary pill */}
          <a href="#contact" className="relative w-full px-6 py-4 rounded-full text-center font-semibold text-white overflow-hidden backdrop-blur-2xl bg-[#2A0134]/80 border border-white/10 shadow-[0_0_0_1px_rgba(168,85,247,0.3),0_0_35px_rgba(42,1,52,1),0_0_60px_rgba(42,1,52,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-[#3d024a]/80 hover:shadow-[0_0_0_1px_rgba(168,85,247,0.5),0_0_50px_rgba(42,1,52,1),0_0_80px_rgba(42,1,52,0.6)] transition-all duration-300">
            <span className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
            Contact Me
          </a>
        </div>

        {/* 3. THE WAVING AVATAR (Always centered) */}
        <div className="absolute z-10 inset-0 flex items-center justify-center pointer-events-none overflow-visible">
          <video
            src="/avatar.webm"
            autoPlay
            loop
            muted
            playsInline
            className="h-[85vh] xl:h-[95vh] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={{
              maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              mixBlendMode: 'screen'
            }}
          />
        </div>
      </header>

      {/* Sections Below Hero */}
      <main className="flex flex-col gap-16 py-24 px-6 md:px-16 lg:px-32 relative z-10 bg-[#080010]">

        {/* ── Education ── */}
        <section
          id="education"
          className="scroll-mt-32 min-h-fit p-8 md:p-12 rounded-[2.5rem] bg-[#1a0524]/40 backdrop-blur-xl border border-[#2A0134]/50 shadow-2xl flex flex-col items-start justify-start relative overflow-hidden group hover:border-[#2A0134] transition-colors duration-500"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A0134]/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#2A0134]/60 transition-colors duration-500"></div>

          <h2 className="text-4xl md:text-5xl font-black text-white/90 mb-10 tracking-tight">
            Education
            <span className="block w-24 h-1.5 bg-[#2A0134] mt-4 rounded-full shadow-[0_0_10px_rgba(42,1,52,0.8)]"></span>
          </h2>

          <div className="w-full flex flex-col gap-6 relative z-10">

            {/* University Card */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_0_0_1px_rgba(42,1,52,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#2A0134]/60 transition-all duration-300 group/card">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
                    Faculty of IT, University of Moratuwa
                  </h3>
                  <p className="text-purple-300/80 text-sm font-medium mt-0.5">BSc. (Hons) Information Technology &amp; Management</p>
                </div>
                <span className="text-xs text-slate-400 font-mono bg-white/5 px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">2024 – Present</span>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="flex items-center gap-2 bg-[#2A0134]/40 border border-[#2A0134]/60 rounded-full px-4 py-1.5 text-xs text-purple-200 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,0.8)]"></span>
                  CGPA: 3.74 / 4.00
                </div>
                <div className="flex items-center gap-2 bg-[#2A0134]/40 border border-[#2A0134]/60 rounded-full px-4 py-1.5 text-xs text-purple-200 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_6px_rgba(232,121,249,0.8)]"></span>
                  Dean&apos;s List — Semester 02
                </div>
              </div>
            </div>

            {/* A/L Card */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_0_0_1px_rgba(42,1,52,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#2A0134]/60 transition-all duration-300">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
                    Devi Balika Vidyalaya, Colombo 08
                  </h3>
                  <p className="text-purple-300/80 text-sm font-medium mt-0.5">G.C.E. Advanced Level</p>
                </div>
                <span className="text-xs text-slate-400 font-mono bg-white/5 px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">2020 – 2023</span>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="flex items-center gap-2 bg-[#2A0134]/40 border border-[#2A0134]/60 rounded-full px-4 py-1.5 text-xs text-purple-200 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,0.8)]"></span>
                  3A passes — Commerce Stream (English Medium)
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-slate-400 font-medium">
                  2022 (2023)
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Remaining Sections ── */}
        <section
          id="skills"
          className="scroll-mt-32 min-h-fit px-0 py-8 relative"
        >
          <h2 className="text-4xl font-bold text-white mb-8 tracking-tight relative z-10">
            Technical Skills
            <span className="block w-24 h-1.5 bg-[#2A0134] mt-4 rounded-full shadow-[0_0_10px_rgba(42,1,52,0.8)]"></span>
          </h2>

          <SkillsCarousel />
        </section>

        <ProjectsAccordion />

        {/* ── Certificates ── */}
        <section
          id="certificates"
          className="scroll-mt-32 min-h-fit px-0 py-8 relative mt-16 md:mt-24"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white/90 mb-8 tracking-tight relative z-10">
            Certificates
            <span className="block w-24 h-1.5 bg-[#2A0134] mt-4 rounded-full shadow-[0_0_10px_rgba(42,1,52,0.8)]"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full relative z-10">
            {/* Certificate 1 */}
            <div className="relative p-7 md:p-8 rounded-[2rem] bg-[#1a0524]/60 backdrop-blur-xl border border-[#2A0134]/70 shadow-2xl overflow-hidden group flex flex-col justify-between hover:border-[#2A0134] transition-colors duration-300 min-h-[220px]">
              {/* Single Slow Moving Glowing Line */}
              <svg
                className="absolute inset-0 h-full w-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="31"
                  fill="none"
                  stroke="url(#cert-grad-1)"
                  strokeWidth="1.8"
                  className="cert-border-ray-1"
                  pathLength="100"
                />
                <defs>
                  <linearGradient id="cert-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="50%" stopColor="#e879f9" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute top-0 right-0 w-48 h-48 bg-[#2A0134]/30 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#2A0134]/60 transition-colors duration-500 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono text-purple-300/80 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full">
                    2022
                  </span>
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                    BCS Higher Education
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug group-hover:text-purple-200 transition-colors duration-300">
                  BCS Level 4 Certificate in IT
                </h3>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-purple-500/10 flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-purple-400/80 shadow-[0_0_8px_rgba(192,132,252,0.6)]"></span>
                <span>The Chartered Institute for IT</span>
              </div>
            </div>

            {/* Certificate 2 */}
            <div className="relative p-7 md:p-8 rounded-[2rem] bg-[#1a0524]/60 backdrop-blur-xl border border-[#2A0134]/70 shadow-2xl overflow-hidden group flex flex-col justify-between hover:border-[#2A0134] transition-colors duration-300 min-h-[220px]">
              {/* Single Slow Moving Glowing Line */}
              <svg
                className="absolute inset-0 h-full w-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="31"
                  fill="none"
                  stroke="url(#cert-grad-2)"
                  strokeWidth="1.8"
                  className="cert-border-ray-2"
                  pathLength="100"
                />
                <defs>
                  <linearGradient id="cert-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#e879f9" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute top-0 right-0 w-48 h-48 bg-[#2A0134]/30 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#2A0134]/60 transition-colors duration-500 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono text-purple-300/80 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full">
                    2023
                  </span>
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                    SLIIT
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug group-hover:text-purple-200 transition-colors duration-300">
                  Java Programming Certification
                </h3>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-purple-500/10 flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></span>
                <span>Sri Lanka Institute of Information Technology (SLIIT)</span>
              </div>
            </div>
          </div>
        </section>

        {[
          { id: 'experience', title: 'Experience' },
          { id: 'leadership', title: 'Community & Leadership' },
        ].map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-32 min-h-[60vh] p-8 md:p-12 rounded-[2.5rem] bg-[#1a0524]/40 backdrop-blur-xl border border-[#2A0134]/50 shadow-2xl flex flex-col items-start justify-start relative overflow-hidden group hover:border-[#2A0134] transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A0134]/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#2A0134]/60 transition-colors duration-500"></div>

            <h2 className="text-4xl md:text-5xl font-black text-white/90 mb-8 tracking-tight">
              {section.title}
              <span className="block w-24 h-1.5 bg-[#2A0134] mt-4 rounded-full shadow-[0_0_10px_rgba(42,1,52,0.8)]"></span>
            </h2>

            <div className="w-full flex-grow flex items-center justify-center text-slate-500/50 italic text-xl font-light">
              Content for {section.title} goes here...
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}