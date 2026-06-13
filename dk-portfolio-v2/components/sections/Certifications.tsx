"use client";

import { motion } from "framer-motion";
import { Shield, Network, Lock, Brain, Zap, BookOpen, Award, ShieldCheck, GraduationCap } from "lucide-react";

const CERTS = [
  { name: "Cybersecurity", org: "Agartas Edu Tech", color: "#00E5FF", icon: ShieldCheck },
  { name: "AWS", org: "CBIT College", color: "#1c67d6", logo: "amazonaws" },
  { name: "MS Elevate-AICTE", org: "AICTE", color: "#10EFC6", logo: "microsoftazure" },
  { name: "Computer Networks", org: "CBIT College", color: "#960da2", icon: Network },
  { name: "AI Unplugged", org: "CBIT College", color: "#51ac5d", icon: Brain },
  { name: "i-Sphere'26", org: "COPS", color: "#87E423", icon: Zap },
  { name: "ICNEXT'26", org: "ICNEXT", color: "#D6982C", icon: Award },
  { name: "NCRTEST'25", org: "NCRTEST", color: "#E94619", icon: BookOpen },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="section-eyebrow justify-center mb-3">Credentials & validation</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Industry <span className="text-gradient-cyber">Certifications</span>
          </h2>
          <p className="text-[#7A93B2] max-w-xl mx-auto mt-4 text-base leading-relaxed">
            Professional certifications showcasing expertise in cybersecurity, cloud, and modern technologies.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {CERTS.map((cert) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.name}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                whileHover={{ y: -4 }}
                className="group relative card-hover p-5 flex flex-col items-center text-center gap-3 cursor-default overflow-hidden"
              >
                {/* Subtle hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top, ${cert.color}10, transparent 70%)` }}
                />

                {/* Icon / Logo */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative z-10"
                  style={{ background: `${cert.color}15`, border: `1.5px solid ${cert.color}35` }}
                >
                  {cert.logo ? (
                    <img
                      src={`https://cdn.simpleicons.org/${cert.logo}/${cert.color.replace('#', '')}`}
                      alt={cert.name}
                      className="w-7 h-7"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const next = e.currentTarget.nextElementSibling as HTMLElement;
                        if (next) next.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {/* Fallback icon */}
                  <span
                    style={{
                      display: cert.logo ? 'none' : 'flex',
                      color: cert.color,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {Icon && <Icon className="w-6 h-6" />}
                  </span>
                </div>

                {/* Text */}
                <div className="relative z-10">
                  <div
                    className="font-bold text-sm text-white transition-colors duration-200 leading-snug"
                    style={{ color: undefined }}
                  >
                    {cert.name}
                  </div>
                  <div
                    className="text-xs mt-1 font-mono transition-colors duration-200"
                    style={{ color: cert.color, opacity: 0.8 }}
                  >
                    {cert.org}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 transition-all duration-300 rounded-full"
                  style={{ background: cert.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
