"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const ACHIEVEMENTS = [
  {
    icon: Award,
    title: "Best Research Paper",
    org: "ICNEXT'26",
    year: "2026",
    description: "Awarded best research paper for developing Rudras: A Cognitive Immunological Defense Firewall for Zero-Trust, AI-Native Network Protection ",
    color: "#00E5FF",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="mb-14 text-center">
          <div className="section-eyebrow justify-center mb-3">Achievements</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Notable <span className="text-[#00E5FF]">Accomplishments</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="card-hover p-8 flex flex-col gap-5 transition-all duration-300 hover:shadow-xl w-full sm:w-[350px] lg:w-[320px] text-left"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${a.color}15`, border: `1px solid ${a.color}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: a.color }} />
                </div>
                <div>
                  <div className="font-bold text-white text-lg mb-1">{a.title}</div>
                  <div className="text-sm text-[#00E5FF] font-medium mb-1.5">{a.org}</div>
                  <div className="text-xs text-[#7A93B2]/70 font-mono mb-3">{a.year}</div>
                  <p className="text-sm text-[#7A93B2] leading-relaxed">{a.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
