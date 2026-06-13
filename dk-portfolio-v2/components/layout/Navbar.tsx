"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "blog", label: "Blog", isPage: true, path: "/blog" },
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
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ${scrolled ? "bg-[#02060D]/95 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"
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
          <nav className="hidden lg:flex items-center gap-1">
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
              className="hidden lg:flex"
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
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-[#7A93B2] hover:text-[#00E5FF] hover:bg-white/5 transition-all relative z-50"
              aria-label="Toggle Menu"
            >
              <motion.div 
                animate={mobile ? "open" : "closed"}
                initial={false}
                className="flex flex-col items-center justify-center gap-[5px] w-5 h-[16px]"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 7 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-[2px] bg-current rounded-full block origin-center"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1, scale: 1 },
                    open: { opacity: 0, scale: 0 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-[2px] bg-current rounded-full block origin-center"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -7 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-[2px] bg-current rounded-full block origin-center"
                />
              </motion.div>
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
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 inset-y-0 z-50 w-64 bg-[#02060D]/60 backdrop-blur-2xl border-l border-white/10 flex flex-col pt-20 pb-8 px-5 lg:hidden shadow-2xl overflow-y-auto"
            >
              {navLinks.map((l, i) => {
                const href = l.isPage ? l.path! : (isHome ? `#${l.id}` : `/#${l.id}`);
                const isActive = l.isPage ? pathname === l.path : (isHome && active === l.id);
                
                const linkClasses = `relative flex items-center py-3 -mr-5 pr-5 text-sm font-medium border-b border-white/5 transition-colors ${isActive ? "text-[#00E5FF]" : "text-[#7A93B2] hover:text-white"}`;
                
                const Indicator = isActive && (
                  <motion.div
                    layoutId="mobile-active-indicator"
                    className="absolute right-0 w-1.5 h-3/4 bg-[#00E5FF] rounded-l-md shadow-[0_0_10px_#00E5FF]"
                  />
                );

                return (
                  <motion.div key={l.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    {l.isPage || !isHome ? (
                      <Link href={href} onClick={() => setMobile(false)} className={linkClasses}>
                        {l.label}
                        {Indicator}
                      </Link>
                    ) : (
                      <a href={href} onClick={() => setMobile(false)} className={linkClasses}>
                        {l.label}
                        {Indicator}
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
