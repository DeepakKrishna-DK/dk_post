"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, ShieldCheck, TerminalSquare } from "lucide-react";

const EXPERIENCES = [
  {
    role: "Technical Lead",
    company: "Club of Programmers (COPS)",
    duration: "AUG 2025 - Present",
    type: "Full-Time",
    description:
      "Led the technical direction of the club by designing and managing scalable solutions, including the development of a centralized web platform for registrations, event management, and communication. Coordinated a team of 50+ members, ensuring efficient task allocation, system reliability, and timely deployment. Strengthened the club’s technical presence through GitHub collaboration, optimized workflows, and integration of modern development practices.",
    icon: ShieldCheck,
    color: "#00E5FF", // Cyan
  },
  {
    role: "i-Sphere'26 - Tech Lead",
    company: "Club of Programmers (COPS)",
    duration: "APR 2026",
    type: "Part-Time",
    description:
      "Led technical execution for ISphere 1.0, a large-scale multi-domain hackathon comprising 8 technical and non-technical events, delivering a high-impact experience for 250+ participants.",
    icon: TerminalSquare,
    color: "#00FF66", // Neon Green
  },
  {
    role: "Microsoft Elevate_AICTE Intern",
    company: "AICTE",
    duration: "JAN 2026 - FEB 2026",
    type: "Internship",
    description:
      "I am pleased to announce the completion of a series of intensive certifications through the Microsoft Elevate AICTE program, bridging the gap between cloud infrastructure and intelligent systems.",
    icon: Briefcase,
    color: "#E2F744",
  },
  {
    role: "Cyber Security intern",
    company: "Agartas Edu Tech",
    duration: "JUN 2024 - AUG 2024",
    type: "Internship",
    description:
      "During my internship at Agratas Edutech, I gained hands-on experience in Cybersecurity.I was responsible for tasks such as  conducting research, assisting with project development, which helped me apply my academic knowledge in a professional setting.",
    icon: ShieldCheck,
    color: "#F714E4",
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 relative" ref={containerRef}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="section-eyebrow justify-center mb-3">Professional Track Record</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Work <span className="text-primary">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline background line */}
          <div className="absolute left-6 md:left-[2.5rem] top-0 bottom-0 w-px bg-white/5" />

          {/* Vertical timeline animated active line */}
          <motion.div
            className="absolute left-6 md:left-[2.5rem] top-0 w-px bg-gradient-to-b from-primary to-accent origin-top shadow-[0_0_15px_rgba(0,229,255,0.5)]"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                  className="relative flex gap-8 items-start pl-16 md:pl-24"
                >
                  {/* Timeline Dot */}
                  <div
                    className="absolute left-6 md:left-[2.5rem] w-10 h-10 rounded-xl flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                    style={{ background: "var(--color-background)", border: `2px solid ${exp.color}` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: exp.color }} />
                  </div>

                  {/* Content Card */}
                  <div className="w-full">
                    <div className="card-hover p-6 md:p-8 relative overflow-hidden group">
                      {/* Subtle hover glow background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <div className="flex flex-wrap flex-col md:flex-row md:items-center justify-between gap-3 mb-4 relative z-10">
                        <div>
                          <h3 className="font-bold text-xl text-white group-hover:text-primary transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-base font-medium mt-1 text-[#7A93B2]">
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono text-[#7A93B2]/80">
                            {exp.duration}
                          </span>
                          <span
                            className="tag text-[10px]"
                            style={{
                              color: exp.color,
                              background: `${exp.color}15`,
                              border: `1px solid ${exp.color}30`,
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-[#7A93B2] leading-relaxed relative z-10">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
