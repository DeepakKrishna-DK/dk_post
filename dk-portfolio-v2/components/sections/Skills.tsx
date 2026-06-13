"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Wrench, Network, Lock, Cloud, Code2, ShieldAlert, Target, Activity, Crosshair, Radar, KeySquare, Search, ShieldCheck, Server, AlertTriangle, Brain, Zap } from "lucide-react";
import LogoLoop from "../ui/LogoLoop";

const COLORS = ["#00E5FF", "#00FF66", "#F97316", "#8B5CF6", "#F43F5E", "#3B82F6", "#EAB308", "#10B981", "#EC4899", "#A855F7"];

const SKILL_CATEGORIES = [
  {
    id: "cyber",
    title: "Cybersecurity",
    icon: Shield,
    color: "#00E5FF",
    skills: [
      { name: "Ethical Hacking", icon: ShieldCheck },
      { name: "VAPT", icon: Target },
      { name: "Threat Modelling", icon: ShieldAlert },
      { name: "Incident Response", icon: Activity },
      { name: "MITRE ATT&CK", icon: Crosshair },
      { name: "SOC Operations", icon: Radar },
      { name: "Privilege Escalation", icon: KeySquare },
      { name: "CVE Analysis", icon: Search },
      { name: "OWASP Top 10", icon: AlertTriangle },
    ]
  },
  {
    id: "tools",
    title: "Security Tools",
    icon: Wrench,
    color: "#F97316",
    skills: [
      { name: "Kali Linux", logo: "kalilinux" },
      { name: "Metasploit", logo: "metasploit" },
      { name: "Burp Suite", logo: "burpsuite" },
      { name: "Wireshark", logo: "wireshark" },
      { name: "Nmap", logo: "nmap" },
      { name: "Splunk", logo: "splunk" },
      { name: "CISCO", logo: "cisco" },
    ]
  },
  {
    id: "network",
    title: "Networks",
    icon: Network,
    color: "#8B5CF6",
    skills: [
      { name: "IDS/IPS", icon: Shield },
      { name: "SIEM", icon: Activity },
      { name: "Firewall Engineering", icon: Server },
      { name: "TCP/IP", icon: Network },
      { name: "DNS", icon: Search },
      { name: "HTTP/S", icon: Lock },
      { name: "Zero Trust", icon: ShieldCheck },
      { name: "Linux Hardening", logo: "linux" },
    ]
  },
  {
    id: "crypto",
    title: "Cryptography",
    icon: Lock,
    color: "#F43F5E",
    skills: [
      { name: "AES-256", icon: Lock },
      { name: "RSA", icon: KeySquare },
      { name: "LSB Steganography", icon: Search },
      { name: "ChaCha20-Poly1305", icon: ShieldCheck },
      { name: "Argon2id", icon: ShieldAlert },
    ]
  },
  {
    id: "programming",
    title: "Programming",
    icon: Code2,
    color: "#EAB308",
    skills: [
      { name: "Python", logo: "python" },
      { name: "JavaScript", logo: "javascript" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Rust", logo: "rust" },
    ]
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "#10B981",
    skills: [
      { name: "Microsoft Azure", logo: "microsoftazure" },
      { name: "AWS", logo: "amazonaws" },
      { name: "Docker", logo: "docker" },
    ]
  }
];

const ALL_LOGOS = SKILL_CATEGORIES.flatMap(cat =>
  cat.skills.map((skill, index) => ({
    src: skill.logo ? `https://cdn.simpleicons.org/${skill.logo}/${cat.color.replace('#', '')}` : "",
    title: skill.name,
    alt: skill.name,
    color: cat.color,
    customIcon: skill.icon,
  }))
);

export default function Skills() {
  const [activeTab, setActiveTab] = useState("cyber");

  const activeCategory = SKILL_CATEGORIES.find(c => c.id === activeTab)!;

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="section-eyebrow justify-center mb-3">Technical arsenal</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Skills & <span className="text-gradient-cyber">Tooling</span>
          </h2>
          <p className="text-[#7A93B2] mt-4 text-base max-w-xl mx-auto">
            A full-stack security skill set — from offensive pentesting to defensive infrastructure and secure development.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? "text-[#030712] border-transparent"
                    : "bg-white/5 border-white/10 text-[#7A93B2] hover:text-white hover:border-white/20"
                }`}
                style={isActive ? { background: cat.color, boxShadow: `0 0 20px ${cat.color}40` } : {}}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.title}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-16"
          >
            {activeCategory.skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/8 hover:border-[var(--cat-color)]/40 hover:bg-[var(--cat-color)]/5 transition-all duration-200 cursor-default"
                  style={{ "--cat-color": activeCategory.color } as React.CSSProperties}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                    style={{ background: `${activeCategory.color}15`, color: activeCategory.color }}
                  >
                    {skill.logo ? (
                      <img
                        src={`https://cdn.simpleicons.org/${skill.logo}/${activeCategory.color.replace('#', '')}`}
                        alt={skill.name}
                        className="w-4 h-4"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : Icon ? (
                      <Icon className="w-4 h-4" />
                    ) : null}
                  </div>
                  <span className="text-sm font-medium text-[#7A93B2] group-hover:text-white transition-colors leading-tight">
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Infinite Ticker */}
        <div className="relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="text-center text-xs font-mono text-[#7A93B2]/50 uppercase tracking-widest mb-6 mt-6">Full stack</p>
          <div className="w-full overflow-hidden">
            <LogoLoop
              logos={ALL_LOGOS}
              speed={70}
              direction="left"
              logoHeight={52}
              gap={20}
              hoverSpeed={0}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="#030712"
              ariaLabel="All technical skills"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
