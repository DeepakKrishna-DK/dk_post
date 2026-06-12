"use client";

import { motion } from "framer-motion";
import { Shield, Wrench, Network, Lock, Cloud, Code2, ShieldAlert, Target, Activity, Crosshair, Radar, KeySquare, Search, ShieldCheck, Server, AlertTriangle } from "lucide-react";
import LogoLoop from "../ui/LogoLoop";

const COLORS = ["#00E5FF", "#00FF66", "#F97316", "#8B5CF6", "#F43F5E", "#3B82F6", "#EAB308", "#10B981", "#EC4899", "#A855F7"];

const SKILL_CATEGORIES = [
  {
    title: "Cybersecurity & Pentesting",
    icon: Shield,
    skills: [
      { name: "Ethical Hacking", customIcon: ShieldCheck },
      { name: "VAPT", customIcon: Target },
      { name: "Threat Modelling", customIcon: ShieldAlert },
      { name: "Incident Response", customIcon: Activity },
      { name: "MITRE ATT&CK", customIcon: Crosshair },
      { name: "SOC Operations", customIcon: Radar },
      { name: "Privilege Escalation", customIcon: KeySquare },
      { name: "CVE Analysis", customIcon: Search },
      { name: "OWASP Top 10", customIcon: AlertTriangle },
    ]
  },
  {
    title: "Security Tools",
    icon: Wrench,
    skills: [
      { name: "Kali Linux", logo: "kalilinux" },
      { name: "Metasploit", logo: "metasploit" },
      { name: "Burp Suite", logo: "burpsuite" },
      { name: "Wireshark", logo: "wireshark" },
      { name: "Nmap", logo: "nmap" },
      { name: "Splunk", logo: "splunk" },
      { name: "CISCO Packet Tracer", logo: "cisco" },
    ]
  },
  {
    title: "Network & Infrastructure",
    icon: Network,
    skills: [
      { name: "IDS/IPS", customIcon: Shield },
      { name: "SIEM", customIcon: Activity },
      { name: "Firewall Engineering", customIcon: Server },
      { name: "TCP/IP", customIcon: Network },
      { name: "DNS", customIcon: Search },
      { name: "HTTP/S", customIcon: Lock },
      { name: "Zero Trust Architecture", customIcon: ShieldCheck },
      { name: "Linux Hardening", logo: "linux" },
    ]
  },
  {
    title: "Cryptography",
    icon: Lock,
    skills: [
      { name: "AES-256", customIcon: Lock },
      { name: "RSA", customIcon: KeySquare },
      { name: "LSB Steganography", customIcon: Search },
    ]
  },
  {
    title: "Programming",
    icon: Code2,
    skills: [
      { name: "Python", logo: "python" },
      { name: "JavaScript", logo: "javascript" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Rust", logo: "rust" },
    ]
  },
  {
    title: "Cloud",
    icon: Cloud,
    skills: [
      { name: "Microsoft Azure", logo: "microsoftazure" },
      { name: "AWS", logo: "amazonaws" },
      { name: "Docker", logo: "docker" },
    ]
  }
];

const ALL_SKILLS = SKILL_CATEGORIES.flatMap(category => category.skills);

const techLogos = ALL_SKILLS.map((skill, index) => {
  const color = COLORS[index % COLORS.length];
  return {
    src: skill.logo ? `https://cdn.simpleicons.org/${skill.logo}/${color.replace('#', '')}` : "",
    title: skill.name,
    alt: skill.name,
    color: color,
    customIcon: skill.customIcon,
  };
});

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="section-eyebrow justify-center mb-3">Technical Arsenal</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Mastering <span className="text-[#00E5FF]">Tech-Stack</span>
          </h2>
        </motion.div>

        {/* Infinite Skill Loop */}
        <div className="mt-20 w-full overflow-hidden">
          <LogoLoop
            logos={techLogos}
            speed={80}
            direction="left"
            logoHeight={60}
            gap={24}
            hoverSpeed={80}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="#02060D"
            ariaLabel="All Technical Skills"
          />
        </div>
      </div>
    </section>
  );
}
