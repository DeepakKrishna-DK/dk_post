"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "blog", label: "Blog", isPage: true, path: "/blog" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [active, setActive] = useState("home");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (!isHome) return;
      const ids = navLinks.filter(l => !l.isPage).map(l => l.id);
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) { setActive(id); break; }
      }
    };
    
    // Initialize state on mount
    onScroll();
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#02060D]/95 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobile(false)}>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-transform duration-300 group-hover:scale-105">
              <img src="/download-removebg-preview.png" alt="DK Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-orbitron text-lg font-bold text-white tracking-widest group-hover:text-[#00E5FF] transition-colors duration-300">
              d<span className="text-[#00E5FF]">k</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => {
              const href = l.isPage ? l.path! : (isHome ? `#${l.id}` : `/#${l.id}`);
              const isActive = !l.isPage && isHome && active === l.id;

              return l.isPage || !isHome ? (
                <Link
                  key={l.id}
                  href={href}
                  className="px-4 py-2 text-base font-medium text-[#7A93B2] hover:text-white transition-colors rounded-md hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.id}
                  href={href}
                  className={`relative px-4 py-2 text-base font-medium transition-colors rounded-md ${isActive ? "text-white" : "text-[#7A93B2] hover:text-white hover:bg-white/5"
                    }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#00E5FF] rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex"
            >
              <Link
                href={isHome ? "#contact" : "/#contact"}
                className="btn-primary text-base py-2.5 px-6 rounded-lg flex items-center justify-center w-full"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <button
              onClick={() => setMobile(!mobile)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-[#7A93B2]"
            >
              {mobile ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobile(false)}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 inset-y-0 z-50 w-64 bg-[#061224] border-l border-white/7 flex flex-col pt-20 pb-8 px-5 md:hidden"
            >
              {navLinks.map((l, i) => {
                const href = l.isPage ? l.path! : (isHome ? `#${l.id}` : `/#${l.id}`);
                const isActive = !l.isPage && isHome && active === l.id;
                return (
                  <motion.div key={l.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    {l.isPage || !isHome ? (
                      <Link href={href} onClick={() => setMobile(false)} className="block py-3 text-sm font-medium text-[#7A93B2] hover:text-white border-b border-white/5">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={href} onClick={() => setMobile(false)} className={`block py-3 text-sm font-medium border-b border-white/5 ${isActive ? "text-[#00E5FF]" : "text-[#7A93B2] hover:text-white"}`}>
                        {l.label}
                      </a>
                    )}
                  </motion.div>
                );
              })}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                transition={{ delay: navLinks.length * 0.05 + 0.1, type: "spring", stiffness: 300, damping: 20 }}
                className="mt-6 w-full"
              >
                <Link href={isHome ? "#contact" : "/#contact"} onClick={() => setMobile(false)} className="btn-primary w-full justify-center relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Hire Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
