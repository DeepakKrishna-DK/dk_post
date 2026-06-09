"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, GitBranch, Shield, Lock, Server, Bug, ChevronLeft, ChevronRight } from "lucide-react";
import { TiltCard } from "../ui/TiltCard";

const PROJECTS = [
  {
    id: "RUDRAS",
    title: "Rudras - A Cognitive Immunological Defense_Firewall (In-Dev)",
    description: "The core architecture is currently in development and undergoing rigorous validation. Coming Soon to Windows. We are pushing the boundaries of what a firewall can become. Stay tuned for further updates as the evolution continues.",
    tech: ["Rust", "IDS/IPS", "Firewall", "Zero-Trust", "Networks"],
    categoryLabel: "Firewall",
    categoryColor: "#F69708",
    icon: Shield,
    github: "https://github.com/DeepakKrishna-DK/Rudras-Cognitive_Immunological_Defense_Firewall",
  },
  {
    id: "COPS",
    title: "COPS - Official Website ",
    description: "Designed and developed for COPS a centralized event management platform for  concurrent events and the official website for ongoing COPS operations.",
    tech: ["SaaS", "Full-Stack Development", "Python"],
    categoryLabel: "SaaS",
    categoryColor: "#3B82F6",
    icon: ArrowUpRight,
    github: "https://github.com/DeepakKrishna-DK/COPS-Official-Website",
  },
  {
    id: "VIKRANTA",
    title: "VIKRANTA - Smart Tourist Safety System",
    description: "Project VIKRANTA is an AI-driven, proactive tourist safety platform using geo-fencing and blockchain. It ensures predictive protection via intelligent anomaly detection, real-time high-risk alerts, and rapid one-touch SOS response, providing authorities with actionable insights for efficient crisis management.",
    tech: ["SaaS", "Blockchain", "Full-Stack Development"],
    categoryLabel: "SaaS",
    categoryColor: "#8B5CF6",
    icon: ArrowUpRight,
    github: "https://github.com/DeepakKrishna-DK/Vikranta-Smart_Tourist_Safety_System",
  },
  {
    id: "VIKRANTA-ID",
    title: "VIKRANTA - Blockchain_ID_Generation",
    description: "A complete blockchain-based tourist registration system with unique ID generation, encrypted user information storage, document verification, and PVC card creation with QR codes.",
    tech: ["Ethereum", "Blockchain", "Full-Stack Development"],
    categoryLabel: "Blockchain",
    categoryColor: "#00FF66",
    icon: Server,
    github: "https://github.com/DeepakKrishna-DK/Vikranta-Blockchain_ID_Generation",
  },
  {
    id: "HylexC",
    title: "HylexCrypt- TU2050",
    description: "HylexCrypt - The Ultimate 2050 is an all-in-one steganography and encryption toolkit. It encrypts secret messages with modern cryptographic algorithms and hides them inside files (images, audio, etc.) using steganography producing normal-looking files that secretly contain secure information.",
    tech: ["Python", "Steganography", "Cryptography"],
    categoryLabel: "HylexC",
    categoryColor: "#0400FF",
    icon: Lock,
    github: "https://github.com/DeepakKrishna-DK/HylexCrypt-TU2050",
  },
];

export default function Projects() {
  const [active, setActive] = useState(1); // Start with second project highlighted
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgentMatch = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isIPadOS = typeof navigator !== 'undefined' && typeof document !== 'undefined' && navigator.userAgent.includes("Mac") && "ontouchend" in document;
      const isTouch = typeof window !== 'undefined' && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
      setIsMobile(userAgentMatch || isIPadOS || window.innerWidth < 1024 || (isTouch && window.innerWidth <= 1366));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isPaused || isModalOpen) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, isModalOpen, active]);

  const handleNext = () => {
    setActive((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActive((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 optimize-gpu"
        >
          <div className="section-eyebrow justify-center mb-3">Operations</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Featured <span className="text-[#00E5FF]">Projects</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative h-[550px] sm:h-[550px] md:h-[500px] flex items-center justify-center perspective-[1000px] mt-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {PROJECTS.map((project, i) => {
            const Icon = project.icon;

            // Calculate relative position (-1, 0, 1) to determine styling
            // This handles wrapping around the ends
            let diff = i - active;
            if (active === 0 && i === PROJECTS.length - 1) diff = -1;
            if (active === PROJECTS.length - 1 && i === 0) diff = 1;

            // If it's more than 1 step away, we just hide it or push it further back
            // For a smooth 3D effect, we mainly care about active, prev, and next
            const isVisible = Math.abs(diff) <= 1 || PROJECTS.length <= 3;

            // Normalize diff for layout calculation
            let normalizedDiff = diff;
            if (diff < -1) normalizedDiff = -2;
            if (diff > 1) normalizedDiff = 2;

            const isActive = normalizedDiff === 0;

            return (
              <motion.div
                key={project.id}
                initial={false}
                animate={{
                  x: `${isMobile ? normalizedDiff * 85 : normalizedDiff * 60}%`,
                  scale: isActive ? 1 : (isMobile ? 0.9 : 0.85),
                  opacity: isActive ? 1 : isVisible ? (isMobile ? 0.15 : 0.4) : 0,
                  rotateY: isMobile ? normalizedDiff * -8 : normalizedDiff * -15, // mild turn on mobile
                  zIndex: isActive ? 50 : 40 - Math.abs(normalizedDiff),
                }}
                transition={{ duration: isMobile ? 0.25 : 0.5, ease: "easeOut" }}
                onClick={() => {
                  if (!isActive) setActive(i);
                  else setIsModalOpen(true);
                }}
                className={`absolute w-full max-w-[320px] sm:w-[350px] md:w-[400px] h-[480px] sm:h-[500px] md:h-[500px] cursor-pointer optimize-gpu ${!isVisible && "pointer-events-none"}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <TiltCard className="h-full w-full">
                  <div
                    className={`relative h-full flex flex-col bg-[#02060D] rounded-2xl overflow-hidden transition-all duration-300 ${isActive
                      ? "shadow-[0_0_30px_rgba(6,182,212,0.2)] border-2 border-[#00E5FF]/50"
                      : "border border-white/10"
                      }`}
                  >
                    {/* Glowing background for active card */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/10 to-transparent pointer-events-none" />
                    )}

                    {/* Header Image area */}
                    <div className="h-28 sm:h-32 flex items-center justify-center relative shrink-0 border-b border-white/5" style={{ background: `${project.categoryColor}10` }}>
                      <Icon className="w-12 h-12" style={{ color: project.categoryColor }} />
                      <span
                        className="absolute top-4 left-4 tag text-[10px]"
                        style={{
                          color: project.categoryColor,
                          background: `${project.categoryColor}15`,
                          border: `1px solid ${project.categoryColor}30`,
                        }}
                      >
                        {project.categoryLabel}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-grow relative z-10 overflow-hidden">
                      <h3 className={`font-bold text-lg sm:text-xl mb-3 ${isActive ? "text-[#00E5FF]" : "text-white"}`}>
                        {project.title}
                      </h3>
                      <p className="text-[#7A93B2] text-xs sm:text-sm leading-relaxed mb-4 flex-grow overflow-y-auto scrollbar-none pr-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t) => (
                          <span key={t} className="text-xs px-2.5 py-1 bg-white/5 rounded text-[#7A93B2] font-mono border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 flex">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isActive) setIsModalOpen(true);
                          }}
                          className={`btn-primary w-full justify-center py-2.5 text-xs tracking-wider uppercase font-mono ${!isActive ? "opacity-50 pointer-events-none" : ""}`}
                        >
                          View Data
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#7A93B2] hover:text-[#00E5FF] hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-[#00E5FF]" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#7A93B2] hover:text-[#00E5FF] hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>

      {/* Spring Modal Implementation */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="bg-[#02060D]/80 backdrop-blur-md p-4 md:p-8 fixed inset-0 z-[100] grid place-items-center overflow-y-auto cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#061224] border border-white/10 text-white p-8 rounded-2xl w-full max-w-lg shadow-[0_0_50px_rgba(6,182,212,0.15)] cursor-default relative overflow-hidden"
            >
              {(() => {
                const ActiveIcon = PROJECTS[active].icon;
                return (
                  <>
                    <ActiveIcon className="text-white/5 rotate-12 w-64 h-64 absolute z-0 -top-12 -right-12 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 mb-6 rounded-full flex items-center justify-center border border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF]">
                        <ActiveIcon className="w-8 h-8" />
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {PROJECTS[active].title}
                      </h3>
                      <div
                        className="inline-block px-3 py-1 rounded text-xs font-mono mb-6"
                        style={{ backgroundColor: `${PROJECTS[active].categoryColor}20`, color: PROJECTS[active].categoryColor }}
                      >
                        {PROJECTS[active].categoryLabel}
                      </div>

                      <p className="text-[#7A93B2] mb-8 leading-relaxed">
                        {PROJECTS[active].description}
                        <br /><br />
                        {PROJECTS[active].id === "RUDRAS" ? (
                          <span className="text-[#F69708]/90 font-mono text-xs uppercase tracking-wider">
                            [Detailed analysis and case study for this operation is highly classified and currently encrypted. Initiate authorization protocols to proceed.]
                          </span>
                        ) : (
                          <span className="text-[#00E5FF]/80 font-mono text-xs uppercase tracking-wider">
                            [ Status: Declassified ]<br/>
                            Full architectural blueprints and source code for this operation have been made available to the public. Access the repository below for technical specifications.
                          </span>
                        )}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {PROJECTS[active].tech.map((t) => (
                          <span key={t} className="text-xs px-3 py-1 bg-white/5 rounded text-[#7A93B2] font-mono border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="btn-outline flex-1 py-3 justify-center text-sm"
                        >
                          Close Data
                        </button>
                        <a
                          href={PROJECTS[active].github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex-1 py-3 justify-center text-sm"
                        >
                          <GitBranch className="w-4 h-4 mr-2" /> {PROJECTS[active].id === "RUDRAS" ? "Project Status" : "Source Code"}
                        </a>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
