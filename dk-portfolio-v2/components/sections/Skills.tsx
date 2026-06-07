"use client";

import { motion } from "framer-motion";
import { Shield, Wrench, Network, Lock, Cloud, Cpu, Code2 } from "lucide-react";
import LogoLoop from "../ui/LogoLoop";

const COLORS = ["#00E5FF", "#00FF66", "#F97316", "#8B5CF6", "#F43F5E", "#3B82F6", "#EAB308", "#10B981", "#EC4899", "#A855F7"];

const SKILL_CATEGORIES = [
  {
    title: "Cybersecurity & Pentest",
    icon: Shield,
    skills: [
      { name: "Ethical Hacking" },
      { name: "Penetration Testing (VAPT)" },
      { name: "Threat Modelling" },
      { name: "Threat Hunting" },
      { name: "Incident Response" },
      { name: "Red Team / Blue Team" },
      { name: "SOC Operations" },
      { name: "MITRE ATT&CK Framework" },
      { name: "Privilege Escalation" },
      { name: "DevSecOps" },
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
      { name: "OWASP Testing Tools", logo: "owasp" },
      { name: "CISCO Packet Tracer", logo: "cisco" },
    ]
  },
  {
    title: "Network & Infrastructure Security",
    icon: Network,
    skills: [
      { name: "IDS/IPS" },
      { name: "SIEM" },
      { name: "DPI" },
      { name: "Firewall Engineering" },
      { name: "TCP/IP" },
      { name: "DNS" },
      { name: "HTTP/S" },
      { name: "VPN" },
      { name: "Zero Trust Architecture" },
      { name: "Cloud-Native Security" },
      { name: "OWASP Top 10" },
      { name: "Linux Hardening", logo: "linux" },
    ]
  },
  {
    title: "Cryptography & Blockchain",
    icon: Lock,
    skills: [
      { name: "AES-256" },
      { name: "RSA" },
      { name: "Steganography" },
      { name: "LSB" },
      { name: "Blockchain" },
      { name: "Smart Contracts" },
      { name: "Decentralized Identity" },
      { name: "QR Code Systems" },
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "Microsoft Azure", logo: "microsoftazure" },
      { name: "AWS", logo: "amazonaws" },
      { name: "Docker", logo: "docker" },
      { name: "CI/CD Pipelines" },
      { name: "IaC" },
      { name: "Cloud Security" },
      { name: "Cloud Administration" },
    ]
  },
  {
    title: "AI / ML & AI Security",
    icon: Cpu,
    skills: [
      { name: "Machine Learning" },
      { name: "Deep Learning" },
      { name: "Generative AI" },
      { name: "RAG Systems" },
      { name: "TensorFlow", logo: "tensorflow" },
      { name: "Google Vertex AI", logo: "google" },
      { name: "Agentic AI" },
      { name: "AI Security" },
      { name: "Prompt Engineering" },
    ]
  },
  {
    title: "Programming",
    icon: Code2,
    skills: [
      { name: "Python", logo: "python" },
      { name: "JavaScript", logo: "javascript" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Java", logo: "openjdk" },
      { name: "Rust", logo: "rust" },
      { name: "Go", logo: "go" },
      { name: "Node.js", logo: "nodedotjs" },
      { name: "React.js", logo: "react" },
      { name: "REST APIs" },
      { name: "HTML5", logo: "html5" },
      { name: "CSS3", logo: "css3" },
      { name: "Tailwind CSS", logo: "tailwindcss" },
      { name: "Git", logo: "git" },
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
            hoverSpeed={0}
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
