"use client";

import { motion } from "framer-motion";
import { Shield, GitBranch, Link2, MessageCircle, Mail } from "lucide-react";
import Link from "next/link";

const SOCIALS = [
  { icon: Link2, href: "https://www.linkedin.com/in/deepak-p-s", label: "LinkedIn" },
  { icon: GitBranch, href: "https://github.com/DeepakKrishna-DK", label: "GitHub" },
  { icon: MessageCircle, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:deepakkrishnark@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/7 bg-[#02060D]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00E5FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-transform duration-300 group-hover:scale-105">
            <img src="/download.png" alt="DK Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-orbitron text-base font-bold text-white tracking-widest group-hover:text-[#00E5FF] transition-colors duration-300">
            d<span className="text-[#00E5FF]">k</span>
          </span>
        </Link>

        {/* Copyright & Legal */}
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <p className="text-xs text-[#7A93B2]">
            © {new Date().getFullYear()} dk. All rights reserved.
          </p>
          <Link href="/privacy" className="text-[10px] text-[#7A93B2]/70 hover:text-[#00E5FF] transition-colors font-mono uppercase tracking-wider">
            Privacy Policy & Trust
          </Link>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -2, color: "#00E5FF" }}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-[#7A93B2] hover:border-[#00E5FF]/40 hover:text-[#00E5FF] transition-all"
              >
                <Icon className="w-3.5 h-3.5" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
