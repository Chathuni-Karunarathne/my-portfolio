"use client";
<head>
  <link rel="icon" type="image/png" href="/favicon.png" />
</head>

import { AnimatePresence, motion } from "framer-motion";
import { siGithub, siGmail, siWhatsapp } from "simple-icons";
import { useEffect, useState, useRef } from "react";
import SkillsCarousel from "./skills-carousel";
import ProjectsAccordion from "./projects-accordion";

const linkedInIcon = {
  path: "M6.94 8.94A1.94 1.94 0 1 1 6.94 5.06a1.94 1.94 0 0 1 0 3.88ZM5.5 9.67h2.88v8.45H5.5V9.67Zm4.43 0h2.76v1.15h.04c.38-.72 1.32-1.48 2.72-1.48 2.91 0 3.45 1.91 3.45 4.39v4.39h-2.88v-4.11c0-1.01-.02-2.3-1.4-2.3-1.41 0-1.63 1.1-1.63 2.23v4.18H9.93V9.67Z",
};

const socialLinks = [
  { href: "https://github.com/Chathuni-Karunarathne", label: "GitHub", icon: siGithub },
  { href: "https://www.linkedin.com/in/chathuni-k", label: "LinkedIn", icon: linkedInIcon },
  { href: "mailto:chathunik27@gmail.com", label: "Email", icon: siGmail },
  { href: "https://wa.me/94762132822", label: "WhatsApp", icon: siWhatsapp },
];

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Video & Hero section refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Ping-Pong (Reverse/Forward) Loop: Plays 0–10s, then oscillates between 7s and 10s
  const isReversingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let lastTime: number | null = null;

    const reverseStep = (timestamp: number) => {
      if (!isReversingRef.current) return;

      if (lastTime !== null) {
        const delta = (timestamp - lastTime) / 1000;
        video.currentTime = Math.max(7.0, video.currentTime - delta);
      }
      lastTime = timestamp;

      // Reached 7s -> Resume normal forward playback
      if (video.currentTime <= 7.0) {
        isReversingRef.current = false;
        lastTime = null;
        video.play();
        return;
      }

      animFrameRef.current = requestAnimationFrame(reverseStep);
    };

    const handleTimeUpdate = () => {
      // Reached end of forward playback -> Start reversing back to 7s
      const endThreshold = video.duration ? Math.max(video.duration - 0.15, 7.1) : 9.9;
      if (!isReversingRef.current && video.currentTime >= endThreshold) {
        video.pause();
        isReversingRef.current = true;
        lastTime = null;
        animFrameRef.current = requestAnimationFrame(reverseStep);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Scroll observer (Restarts video from 0s when scrolling back to hero)
  useEffect(() => {
    const heroSection = heroRef.current;
    const video = videoRef.current;
    if (!heroSection || !video) return;

    let hasScrolledAway = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          hasScrolledAway = true;
        } else if (entry.isIntersecting && hasScrolledAway) {
          if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
          }
          isReversingRef.current = false;
          video.currentTime = 0; // Restart intro from beginning (0s)
          video.play();
          hasScrolledAway = false;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitSuccess("Your message has been sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setSubmitError(data.error || "Failed to send email. Please try again.");
      }
    } catch (err) {
      setSubmitError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);

    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "Chathuni_CV.pdf";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.setTimeout(() => {
      setIsDownloading(false);
      setShowBanner(true);
    }, 800);

    window.setTimeout(() => {
      setShowBanner(false);
    }, 4800);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 180);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    const sections = ['about', 'education', 'skills', 'projects', 'certificates', 'leadership'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#080010] text-white font-sans">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 z-50 pt-5 px-6 md:pt-6 md:px-8 pointer-events-none w-full max-w-[100vw] flex justify-between items-start">
          {/* Desktop Nav (hidden on mobile) */}
          <ul className="hidden md:flex flex-row flex-wrap items-center gap-4 lg:gap-8 pointer-events-auto relative px-6 py-3 rounded-full backdrop-blur-2xl bg-white/[0.04] border border-white/10 shadow-[0_0_0_1px_rgba(42,1,52,0.6),0_0_30px_rgba(42,1,52,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] w-max max-w-full overflow-x-auto no-scrollbar">
            {[
              { id: 'about', label: 'About' },
              { id: 'education', label: 'Education' },
              { id: 'skills', label: 'Technical Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'certificates', label: 'Certificates' },
              { id: 'leadership', label: 'Community & Leadership' },
            ].map((item) => (
              <li key={item.id} className="whitespace-nowrap">
                <a
                  href={`#${item.id}`}
                  className={`px-3 py-1.5 rounded-full transition-all duration-300 flex items-center text-sm lg:text-base font-medium ${activeSection === item.id
                    ? "text-purple-200 bg-purple-500/20 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105"
                    : "text-slate-300 hover:text-purple-300 border border-transparent hover:-translate-y-0.5"
                    }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden pointer-events-auto relative p-3 rounded-full backdrop-blur-2xl bg-white/[0.1] border border-white/20 shadow-[0_0_15px_rgba(42,1,52,0.8)] text-white z-[60] ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-40 bg-[#080010]/95 backdrop-blur-3xl pt-24 px-6 md:hidden flex flex-col items-center gap-6 overflow-y-auto"
            >
              <ul className="flex flex-col items-center gap-6 mt-10 w-full max-w-[280px]">
                {[
                  { id: 'about', label: 'About' },
                  { id: 'education', label: 'Education' },
                  { id: 'skills', label: 'Technical Skills' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'certificates', label: 'Certificates' },
                  { id: 'leadership', label: 'Community & Leadership' },
                ].map((item) => (
                  <li key={item.id} className="w-full text-center">
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block w-full px-6 py-4 rounded-2xl transition-all duration-300 text-lg font-medium border ${activeSection === item.id
                        ? "text-purple-100 bg-purple-500/30 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                        : "text-slate-300 border-white/5 bg-white/5 hover:text-purple-300 hover:bg-white/10"
                        }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section = #about landing page */}
        <header ref={heroRef} id="about" className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-between overflow-hidden pt-24 md:pt-0 pb-16 md:pb-0 bg-[#080010]">
          {/* Full Landing Page Background Video */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 flex items-center justify-center">
            <video
              ref={videoRef}
              src="/final.mp4"
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover object-center scale-[0.95] transform-gpu"
            />
            {/* Subtle bottom fade to blend smoothly into the next section */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080010] to-transparent pointer-events-none" />
          </div>

          {/* Left Side: CTAs */}
          <div className="relative md:absolute w-[90%] md:w-auto mt-6 md:mt-0 order-2 md:order-none left-auto md:left-6 lg:left-12 xl:left-24 top-auto md:top-[60%] md:-translate-y-1/2 z-20 flex flex-col sm:flex-row md:flex-col gap-4 md:gap-5 max-w-[400px] md:max-w-[220px] items-center">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="relative w-full px-6 py-4 rounded-full text-center font-medium text-purple-200 overflow-hidden backdrop-blur-2xl bg-white/[0.04] border border-white/10 shadow-[0_0_0_1px_rgba(42,1,52,0.5),0_0_20px_rgba(42,1,52,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_0_0_1px_rgba(168,85,247,0.4),0_0_30px_rgba(42,1,52,0.6)] hover:bg-white/[0.07] transition-all duration-300 group disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <span className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent"></span>
              <span className="flex items-center justify-center gap-2">
                {isDownloading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin text-purple-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Downloading...
                  </>
                ) : (
                  "Download my CV"
                )}
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsContactOpen(true);
                setSubmitSuccess(null);
                setSubmitError(null);
              }}
              className="relative w-full px-6 py-4 rounded-full text-center font-semibold text-white overflow-hidden backdrop-blur-2xl bg-[#2A0134]/80 border border-white/10 shadow-[0_0_0_1px_rgba(168,85,247,0.3),0_0_35px_rgba(42,1,52,1),0_0_60px_rgba(42,1,52,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-[#3d024a]/80 hover:shadow-[0_0_0_1px_rgba(168,85,247,0.5),0_0_50px_rgba(42,1,52,1),0_0_80px_rgba(42,1,52,0.6)] transition-all duration-300"
            >
              <span className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
              Contact Me
            </button>
          </div>

          {/* Social Icons (Very Bottom Left) */}
          <div className="relative md:absolute w-[90%] md:w-auto mt-6 md:mt-0 order-3 md:order-none left-auto md:left-6 lg:left-12 xl:left-24 bottom-6 md:bottom-8 z-20 flex items-center justify-center md:justify-start gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 rounded-full backdrop-blur-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/40 shadow-[0_0_0_1px_rgba(42,1,52,0.4),0_4px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d={social.icon.path} />
                </svg>
              </a>
            ))}
          </div>

          {/* Right Side: About Me Card */}
          <div className="relative md:absolute w-[90%] md:w-auto mt-8 md:mt-0 order-1 md:order-none right-auto md:right-6 lg:right-12 xl:right-24 top-auto md:top-[80%] md:-translate-y-1/2 z-20 max-w-[320px] md:max-w-[280px] xl:max-w-sm p-6 xl:p-8 rounded-2xl overflow-hidden backdrop-blur-2xl bg-white/[0.04] border border-white/10 shadow-[0_0_0_1px_rgba(42,1,52,0.5),0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(42,1,52,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] block">
            <div className="absolute top-0 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none w-1/2"></div>
            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#2A0134] shadow-[0_0_6px_rgba(168,85,247,0.8)]"></div>
            <h2 className="text-2xl xl:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">Hello there! </h2>
            <p className="text-sm xl:text-base text-slate-300 leading-relaxed font-light">
              I&apos;m Chathuni Karunarathne, an IT &amp; Management undergraduate at the University of Moratuwa.
              I’m drawn to things that let me create, experiment, and leave a little bit of my own touch behind.
            </p>
          </div>
        </header>

        {isContactOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030208]/75 backdrop-blur-sm px-4 py-6"
            onClick={() => setIsContactOpen(false)}
          >
            <form
              onSubmit={handleContactSubmit}
              className="relative w-full max-w-md rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_0_1px_rgba(168,85,247,0.22),0_0_25px_rgba(42,1,52,0.7)] backdrop-blur-2xl md:p-5"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close contact form"
                onClick={() => setIsContactOpen(false)}
                className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/40 bg-[#1a0524]/60 text-base font-light text-purple-200 transition hover:bg-[#2A0134]/80 hover:text-white"
              >
                ×
              </button>

              <div className="space-y-4 pt-3">
                {submitSuccess && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    {submitSuccess}
                  </div>
                )}

                {submitError && (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                    {submitError}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="mb-2 block text-base font-bold text-white md:text-lg">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="w-full rounded-xl border border-[#2A0134]/70 bg-[#f2f2f2] px-3 py-3 text-base text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-[#a855f7] focus:shadow-[0_0_0_2px_rgba(168,85,247,0.2)] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-base font-bold text-white md:text-lg">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="w-full rounded-xl border border-[#2A0134]/70 bg-[#f2f2f2] px-3 py-3 text-base text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-[#a855f7] focus:shadow-[0_0_0_2px_rgba(168,85,247,0.2)] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-base font-bold text-white md:text-lg">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="w-full resize-none rounded-xl border border-[#2A0134]/70 bg-[#f2f2f2] px-3 py-3 text-base text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-[#a855f7] focus:shadow-[0_0_0_2px_rgba(168,85,247,0.2)] disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-[78%] rounded-full border border-white/10 bg-[#2A0134]/80 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(168,85,247,0.3),0_0_35px_rgba(42,1,52,1),0_0_60px_rgba(42,1,52,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:bg-[#3d024a]/80 hover:shadow-[0_0_0_1px_rgba(168,85,247,0.5),0_0_50px_rgba(42,1,52,1),0_0_80px_rgba(42,1,52,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute top-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
                  {isSubmitting ? "Sending..." : "Contact Me"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Sections Below Hero */}
        <main className="flex flex-1 flex-col gap-12 md:gap-16 py-16 md:py-24 px-5 md:px-16 lg:px-32 relative z-10 bg-[#080010]">

          {/* Education */}
          <section
            id="education"
            className="scroll-mt-24 md:scroll-mt-32 min-h-fit p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-[#1a0524]/40 backdrop-blur-xl border border-[#2A0134]/50 shadow-2xl flex flex-col items-start justify-start relative overflow-hidden group hover:border-[#2A0134] transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-[#2A0134]/30 rounded-full blur-[60px] md:blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#2A0134]/60 transition-colors duration-500"></div>

            <h2 className="text-3xl md:text-5xl font-black text-white/90 mb-8 md:mb-10 tracking-tight">
              Education
              <span className="block w-24 h-1.5 bg-[#2A0134] mt-4 rounded-full shadow-[0_0_10px_rgba(42,1,52,0.8)]"></span>
            </h2>

            <div className="w-full flex flex-col gap-6 relative z-10">
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
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2 bg-[#2A0134]/40 border border-[#2A0134]/60 rounded-full px-4 py-1.5 text-xs text-purple-200 font-medium w-fit max-w-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,0.8)]"></span>
                    <span>CGPA: 3.74 / 4.00</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#2A0134]/40 border border-[#2A0134]/60 rounded-full px-4 py-1.5 text-xs text-purple-200 font-medium w-fit max-w-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_6px_rgba(232,121,249,0.8)]"></span>
                    <span>Dean&apos;s List — Semester 02</span>
                  </div>
                </div>
              </div>

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

          {/* Technical Skills */}
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

          {/* Certificates */}
          <section
            id="certificates"
            className="scroll-mt-32 min-h-fit px-0 py-8 relative mt-16 md:mt-24"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white/90 mb-6 md:mb-8 tracking-tight relative z-10">
              Certificates
              <span className="block w-24 h-1.5 bg-[#2A0134] mt-4 rounded-full shadow-[0_0_10px_rgba(42,1,52,0.8)]"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full relative z-10">
              <div className="relative p-7 md:p-8 rounded-[2rem] bg-[#1a0524]/60 backdrop-blur-xl border border-[#2A0134]/70 shadow-2xl overflow-hidden group flex flex-col justify-between hover:border-[#2A0134] transition-colors duration-300 min-h-[220px]">
                <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
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
                      <stop offset="0%" stopColor="#f5d0fe" />
                      <stop offset="50%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#9333ea" />
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

              <div className="relative p-7 md:p-8 rounded-[2rem] bg-[#1a0524]/60 backdrop-blur-xl border border-[#2A0134]/70 shadow-2xl overflow-hidden group flex flex-col justify-between hover:border-[#2A0134] transition-colors duration-300 min-h-[220px]">
                <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
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
                      <stop offset="0%" stopColor="#e9d5ff" />
                      <stop offset="50%" stopColor="#d8b4fe" />
                      <stop offset="100%" stopColor="#a855f7" />
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
                  <span className="w-2 h-2 rounded-full bg-violet-400/80 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
                  <span>Sri Lanka Institute of Information Technology (SLIIT)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Community & Leadership */}
          <section
            id="leadership"
            className="scroll-mt-24 md:scroll-mt-32 min-h-[50vh] md:min-h-[60vh] p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-[#1a0524]/40 backdrop-blur-xl border border-[#2A0134]/50 shadow-2xl flex flex-col items-start justify-start relative overflow-hidden group hover:border-[#2A0134] transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-[#2A0134]/30 rounded-full blur-[60px] md:blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#2A0134]/60 transition-colors duration-500"></div>

            <h2 className="text-3xl md:text-5xl font-black text-white/90 mb-8 tracking-tight">
              Community & Leadership
              <span className="block w-24 h-1.5 bg-[#2A0134] mt-4 rounded-full shadow-[0_0_10px_rgba(42,1,52,0.8)]"></span>
            </h2>

            <ul className="w-full space-y-4 text-slate-300 text-base md:text-lg">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></span>
                <span><strong className="font-semibold text-white">Hackelite 2.0, IEEE WIE Student Branch Affinity Group of UOM</strong><br />Co-Chairperson</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></span>
                <span><strong className="font-semibold text-white">Annual General Meeting 2025, IEEE Professional Communication Society</strong><br />Leading Moderator</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></span>
                <span><strong className="font-semibold text-white">Road to Legacy 2.0, IIEE of USJ</strong><br />Lead - Delegates Handling Committee</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></span>
                <span><strong className="font-semibold text-white">Binara Padura 2.0, Rotaract Club of University of Moratuwa</strong><br />Member - Finance Committee</span>
              </li>
            </ul>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-[#080010]/90 backdrop-blur-xl py-8 px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs sm:text-sm md:text-base font-medium text-slate-300 tracking-wide">
              <a
                href="mailto:chathunik27@gmail.com"
                className="group flex items-center gap-1.5 transition-all duration-300 hover:text-purple-300"
              >
                <span>chathunik27@gmail.com</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-purple-400">↗</span>
              </a>
              <a
                href="https://github.com/Chathuni-Karunarathne"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 transition-all duration-300 hover:text-purple-300"
              >
                <span>Chathuni-Karunarathne</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-purple-400">↗</span>
              </a>
              <a
                href="https://www.linkedin.com/in/chathuni-k"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 transition-all duration-300 hover:text-purple-300"
              >
                <span>in/chathuni-k</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-purple-400">↗</span>
              </a>
              <a
                href="https://wa.me/94762132822"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 transition-all duration-300 hover:text-purple-300"
              >
                <span>+94 76 213 2822</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-purple-400">↗</span>
              </a>
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="group flex items-center gap-1.5 transition-all duration-300 hover:text-purple-300 cursor-pointer bg-transparent border-0 p-0 text-slate-300 font-medium text-xs sm:text-sm md:text-base tracking-wide disabled:opacity-50"
              >
                <span>PDF, 2026</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-y-0.5 text-purple-400">↓</span>
              </button>
            </div>
            <div className="text-center text-xs text-slate-500">
              <span>© 2026 Chathuni Karunarathne. All Rights Reserved.</span>
            </div>
          </div>
        </footer>

        {showScrollToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Return to top"
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-purple-400/40 bg-[#1a0524]/80 text-lg text-purple-200 shadow-[0_0_0_1px_rgba(168,85,247,0.3),0_0_18px_rgba(42,1,52,0.8)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[#2A0134]/90 hover:text-white"
          >
            ↑
          </button>
        )}
      </div>

      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-purple-500/30 bg-[#0d0722]/90 px-5 py-3.5 text-sm font-medium text-purple-100 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/20 text-purple-300">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <span>CV downloaded successfully!</span>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setShowBanner(false)}
              className="ml-2 rounded-lg p-1 text-purple-300/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}