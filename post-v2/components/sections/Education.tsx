"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const TIMELINE = [
  {
    degree: "BE - Computer Science & Engineering",
    institution: "C Byregowda Institute of Technology",
    location: "Kolar, Karnataka, India",
    year: "2023 – 2027",
    status: "Pursuing",
    color: "#00E5FF",
    highlights: ["Strong academic foundation with practical technical knowledge"],
  },
  {
    degree: "Higher Secondary Education",
    specialization: "Science (PCMB)",
    institution: "SDC Independent PU College",
    location: "KGF, Karnataka, India",
    year: "2021 – 2023",
    status: "Completed",
    color: "#00FF66",
    highlights: ["Physics", "Mathematics", "Chemistry", "Biology"],
  },
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="py-24 relative" ref={containerRef}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="section-eyebrow justify-center mb-3">Academic Background</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Education & <span className="text-[#00E5FF]">Training</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline background line */}
          <div className="absolute left-6 md:left-[50%] top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />

          {/* Vertical timeline animated active line */}
          <motion.div
            className="absolute left-6 md:left-[50%] top-0 w-px bg-gradient-to-b from-[#00E5FF] to-[#00FF66] -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Center Dot */}
                <div
                  className="absolute left-6 md:left-[50%] w-12 h-12 rounded-full flex items-center justify-center shrink-0 -translate-x-1/2 z-10"
                  style={{ background: `${item.color}15`, border: `2px solid ${item.color}` }}
                >
                  <GraduationCap className="w-5 h-5" style={{ color: item.color }} />
                </div>

                {/* Left/Right spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0">
                  <div className={`card p-8 group transition-all duration-300 hover:shadow-xl ${i % 2 === 0 ? "md:mr-10" : "md:ml-10"}`}>
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-white group-hover:text-[#00E5FF] transition-colors">{item.degree}</h3>
                        <p className="text-base text-[#00E5FF] font-medium mt-1">{item.specialization}</p>
                      </div>
                      <span
                        className="tag text-xs shrink-0 mt-1"
                        style={{ color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-[#7A93B2] mb-5">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {item.institution}, {item.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> {item.year}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((h) => (
                        <span key={h} className="text-sm px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#E2E8F0]">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
