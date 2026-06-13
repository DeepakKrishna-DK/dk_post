"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, ExternalLink, Award } from "lucide-react";

const PUBLICATIONS = [
  {
    title: "Rudras: A Cognitive Immunological Defense Firewall for Zero-Trust, AI-Native Network Protection",
    authors: "Deepak P S",
    conference: "ICNEXT'26",
    date: "MAR 2026",
    doi: "/blog/rudras-firewall-architecture",
    badge: "Best Research Paper",
    description: "A novel AI-native firewall architecture simulating the human immune system for Zero-Trust networks, dynamically identifying and mitigating zero-day threats through cognitive pattern recognition.",
  },
  {
    title: "A Comprehensive Review on Artificial Intelligence in Drug Discovery and Pharmaceutical Research",
    authors: "Bhanu kiran R, Deepak P S, Nithin S, Dr. Vasudeva R",
    conference: "NCETICT 2024 / BookRivers",
    date: "FEB 2026",
    doi: "/blog/ai-in-drug-discovery",
    description: "A thorough examination of current trends in AI-enabled drug discovery, focusing on critical activities such as target identification, hit identification, ADMET prediction, and lead optimization.",
  },
  {
    title: "HylexCrypt TU2050: A Unified Hybrid Steganography–Cryptography Framework",
    authors: "Deepak P S, Nithin S",
    conference: "Independent Research",
    date: "JUN 2026",
    doi: "/blog/hylexcrypt-tu2050",
    description: "An open-source, cross-platform toolkit integrating Argon2id, dual-mode Authenticated Encryption (ChaCha20-Poly1305 / AES-256-GCM), and adaptive LSB steganography.",
  }
];

export default function Publications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="publications" className="py-24 relative" ref={containerRef}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="section-eyebrow justify-center mb-3">Academic contributions</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Research & <span className="text-gradient-cyber">Publications</span>
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
            {PUBLICATIONS.map((pub, i) => (
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
                  className="absolute left-6 md:left-[2.5rem] w-10 h-10 rounded-full flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                  style={{ background: "var(--color-background)", border: `2px solid #00E5FF` }}
                >
                  <BookOpen className="w-4 h-4 text-[#00E5FF]" />
                </div>

                {/* Content Card */}
                <div className="w-full">
                  <div className={`card-hover p-6 md:p-8 relative overflow-hidden group ${
                      i === 0
                        ? "border border-[#D6982C]/40 bg-[#D6982C]/5 shadow-[0_0_30px_rgba(214,152,44,0.12)]"
                        : ""
                    }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="flex flex-col gap-3 relative z-10">
                      {pub.badge && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#D6982C] uppercase tracking-wider mb-1">
                          <Award className="w-3.5 h-3.5" /> {pub.badge}
                        </div>
                      )}
                      
                      <h3 className="font-bold text-xl text-white group-hover:text-primary transition-colors leading-snug">
                        {pub.title}
                      </h3>
                      
                      <p className="text-sm font-medium text-[#7A93B2]">
                        {pub.authors}
                      </p>

                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-mono text-white/50">
                          {pub.conference} • {pub.date}
                        </span>
                      </div>

                      <p className="text-sm text-[#7A93B2] leading-relaxed mt-2">
                        {pub.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                        <a 
                          href={pub.doi} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-white transition-colors"
                        >
                          View DOI / Paper <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
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
