"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "../ui/fancy-components";

const STATS = [
  { value: 5, suffix: "+", label: "SECURITY PROJECTS BUILT" },
  { value: 2, suffix: "", label: "RESEARCH PAPERS PUBLISHED" },
  { value: 100, suffix: "%", label: "ZERO-TRUST FOCUS" },
  { value: 8.1, suffix: "", decimals: 1, label: "ACADEMIC CGPA" },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 optimize-gpu"
          >
            <div>
              <div className="section-eyebrow mb-4">
                WHO I AM
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-8">
                About <span className="text-gradient-cyber">Me</span>
              </h2>
            </div>

            <div className="space-y-5 text-muted text-sm sm:text-base leading-relaxed">
              <p>
                I’m an aspiring Cybersecurity professional pursuing a B.E. in Computer Science and
                Engineering at C. Byregowda Institute of Technology, Kolar, with a strong interest in
                security development, cybersecurity, and emerging technologies. I enjoy building
                practical systems, solving real problems, and learning through hands-on development.
              </p>

              <p>
                My experience includes projects in Rust, blockchain, and secure system design,
                including Rudras – A Cognitive Immunological Defense Firewall. I am particularly
                interested in backend logic, network security, and system-level problem solving.
              </p>

              <p>
                I have also presented research papers at NCRTEST and ICNEXT, which allowed me to
                explore how technology can be applied to real-world challenges. In addition, I serve
                as Technical Lead at COPS CBIT, where I contribute to project work, team
                coordination, and technical activities.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap gap-8 items-center text-sm font-medium text-muted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rotate-45 bg-primary"></div>
                Bangarapet, Karnataka
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rotate-45 bg-primary"></div>
                CBIT Kolar, 2023–27
              </div>
            </div>
          </motion.div>

          {/* ── Right Stats Grid ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.3 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 optimize-gpu"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="glass-panel p-8 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] optimize-gpu"
              >
                <div className="text-4xl sm:text-5xl font-bold mb-3 text-gradient-cyan">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <div className="text-[10px] sm:text-xs font-bold tracking-widest text-muted/80 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
