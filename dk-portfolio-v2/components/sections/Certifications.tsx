"use client";

import { motion } from "framer-motion";
import { Shield, ArrowUpRight } from "lucide-react";

const CERTS = [
  { name: "Cybersecurity", org: "Agartas Edu Tech", color: "#00E5FF", abbr: "C" },
  { name: "HackFest'25", org: "BTI College", color: "#05DD5B", abbr: "HF" },
  { name: "HackHive'25", org: "CBIT College", color: "#4207CB", abbr: "H" },
  { name: "Quantum Quest'25", org: "CBIT College", color: "#7C2FE9", abbr: "Q" },
  { name: "AWS", org: "CBIT College", color: "#1463D9", abbr: "AWS" },
  { name: "MS Elevate-AICTE", org: "AICTE", color: "#10EFC6", abbr: "MS" },
  { name: "Computer Networks", org: "CBIT College", color: "#B51FC3", abbr: "CN" },
  { name: "AI Unplugged", org: "CBIT College", color: "#83B88A", abbr: "AI" },
  { name: "i-Sphere'26", org: "COPS", color: "#87E423", abbr: "i" },
  { name: "ICNEXT'26", org: "ICNEXT", color: "#D6982C", abbr: "I" },
  { name: "NCRTEST'25", org: "NCRTEST", color: "#E94619", abbr: "N" },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="section-eyebrow justify-center mb-3">Validation</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Certifications & <span className="text-[#00E5FF]">Badges</span>
          </h2>
          <p className="text-[#7A93B2] max-w-xl mx-auto mt-4 text-lg leading-relaxed">
            Professional certifications showcasing expertise in cybersecurity, security practices, and modern technologies.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="card-hover p-5 sm:p-6 flex flex-col items-center text-center gap-4 cursor-default group h-full w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] lg:w-[185px] xl:w-[190px]"
            >
              {/* Badge icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-orbitron text-sm font-black transition-transform group-hover:scale-110"
                style={{ background: `${cert.color}15`, border: `2px solid ${cert.color}40`, color: cert.color }}
              >
                {cert.abbr}
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <div className="font-bold text-base text-white group-hover:text-[#00E5FF] transition-colors">{cert.name}</div>
                <div className="text-sm text-[#7A93B2] mt-1 leading-tight">{cert.org}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
