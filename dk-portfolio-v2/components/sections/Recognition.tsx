"use client";

import { motion } from "framer-motion";
import { Award, Quote } from "lucide-react";

const ACHIEVEMENTS = [
  {
    icon: Award,
    title: "Best Research Paper",
    org: "ICNEXT'26",
    year: "2026",
    description: "Awarded best research paper for developing Rudras: A Cognitive Immunological Defense Firewall for Zero-Trust, AI-Native Network Protection.",
    color: "#D6982C",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Deepak has consistently displayed exceptional professionalism, visionary leadership, and advanced technical capability through his remarkable contributions to the COPS Club, delivering impactful digital solutions while successfully leading and executing major departmental initiatives and technical events.",
    name: "Dr. Vasudeva R",
    role1: "HOD, Dept. of CSE, CBIT-Kolar",
    role2: "President, COPS Club",
    avatar: "V",
    avatarColor: "#00E5FF",
  },
];

export default function Recognition() {
  return (
    <section id="recognition" className="py-24 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="section-eyebrow justify-center mb-3">Recognition</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Honors & <span className="text-gradient-cyber">Recognition</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">

          {/* — Left: Achievements — */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-[#7A93B2]/60 mb-6">— Notable accomplishments</p>
            {ACHIEVEMENTS.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="card-hover p-6 flex gap-5 group transition-all duration-300 relative overflow-hidden"
                  style={{ borderColor: `${a.color}30` }}
                >
                  {/* Gold glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top left, ${a.color}08, transparent 60%)` }}
                  />
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative z-10"
                    style={{ background: `${a.color}15`, border: `1.5px solid ${a.color}40` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: a.color }} />
                  </div>
                  <div className="relative z-10">
                    <div className="font-bold text-white text-base mb-0.5 group-hover:text-[#D6982C] transition-colors">{a.title}</div>
                    <div className="text-sm font-mono mb-2" style={{ color: a.color }}>{a.org} · {a.year}</div>
                    <p className="text-sm text-[#7A93B2] leading-relaxed">{a.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* — Right: Testimonial — */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <p className="text-xs font-mono uppercase tracking-widest text-[#7A93B2]/60 mb-6">— Words of appreciation</p>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card p-8 relative overflow-hidden">
                {/* Subtle cyan glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <Quote className="w-8 h-8 text-primary/20 mb-6" />

                <p className="text-[#7A93B2] text-base italic leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-orbitron text-sm font-bold shrink-0"
                    style={{
                      background: `${t.avatarColor}15`,
                      border: `2px solid ${t.avatarColor}40`,
                      color: t.avatarColor,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-[#7A93B2] leading-relaxed">{t.role1}</div>
                    <div className="text-xs text-[#7A93B2]">{t.role2}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
