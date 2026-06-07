"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, AlertTriangle, Terminal, CheckCircle, Database, Lock, Download } from "lucide-react";
import { SplitText, DecryptedText } from "../ui/fancy-components";
import Prism from "../ui/Prism";

const PROFESSIONS = ["Cybersecurity Professional", "Security Researcher"];


export default function Hero() {
  const [profIndex, setProfIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProfIndex(prev => (prev + 1) % PROFESSIONS.length);
    }, 4500); // Loop every 4.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-background">

      {/* Background Cyber Effects & Prism */}
      <div className="absolute inset-0 pointer-events-auto z-0 overflow-hidden">
        <Prism
          animationType="rotate"
          timeScale={0.2}
          height={4.0}
          baseWidth={6.0}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.1}
          glow={1.0}
        />
        {/* Medium dark overlay to balance brightness and ensure text contrast */}
        <div className="absolute inset-0 bg-background/50 pointer-events-none" />
        
        {/* Subtle top-right glow */}
        <div className="absolute inset-0 opacity-[0.2] pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-8 z-10 pt-16 pb-36 md:pb-16 flex flex-col items-center text-center">

        {/* ── Content ── */}
        <div className="space-y-10 flex flex-col items-center w-full">

          {/* Headlines */}
          <div className="space-y-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="optimize-gpu w-full"
            >
              <SplitText
                text="DEEPAK P S"
                className="justify-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-foreground to-primary/80 tracking-tighter drop-shadow-[0_0_20px_rgba(0,229,255,0.1)]"
                delay={0.1}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-4xl text-primary font-medium h-[40px] sm:h-[48px] flex items-center justify-center tracking-wide optimize-gpu"
            >
              <DecryptedText
                text={PROFESSIONS[profIndex]}
                speed={70}
                maxIterations={25}
                animateOn="view"
                characters="0123456789ABCDEF!@#$%"
              />
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="text-muted font-medium text-lg sm:text-xl leading-relaxed max-w-3xl px-4 md:px-0 drop-shadow-md text-center optimize-gpu"
          >
            Building intelligent cyber defense systems focused on threat detection, secure infrastructure, and resilient digital protection against evolving cyber threats.
          </motion.p>

          {/* Internship Roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 w-full relative z-20 pointer-events-auto optimize-gpu"
          >
            <div className="flex items-center gap-3 text-xs sm:text-sm font-mono font-bold text-accent uppercase tracking-widest bg-surface-2/60 px-5 py-2 rounded-full backdrop-blur-md border border-accent/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent shadow-[0_0_10px_#10B981]"></span>
              </span>
              Available For Internships
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
              {[
                "Security Analyst",
                "Cyber Security Analyst",
                "Penetration Tester",
                "SOC Analyst",
                "Security Researcher"
              ].map((role, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-6 py-3 rounded-xl bg-surface/40 backdrop-blur-xl border border-white/5 hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all cursor-default text-sm sm:text-base font-medium text-foreground drop-shadow-md optimize-gpu"
                >
                  {role}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-6 w-full max-w-sm sm:max-w-none mx-auto relative z-20 pointer-events-auto mt-4 optimize-gpu"
          >
            <a href="#projects" className="btn-primary group text-lg px-8 py-4">
              View Projects <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a href="https://drive.google.com/file/d/19wcgQQwu0fyfK1ANr_SzaYv1QYWQKIjw/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-outline group text-lg px-8 py-4">
              View CV <Download className="w-5 h-5 ml-1 group-hover:translate-y-1 transition-transform duration-300" />
            </a>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none optimize-gpu"
      >
        <div className="w-6 h-10 border-2 border-muted/30 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2 bg-primary rounded-full shadow-[0_0_8px_#00E5FF] optimize-gpu"
          />
        </div>
        <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
