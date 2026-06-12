"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LogoLoop({
  logos = [],
  speed = 50,
  direction = "right",
  logoHeight = 60,
  gap = 60,
  hoverSpeed = 0,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = "#02060D", 
  ariaLabel = "Technologies",
}: any) {
  const [isHovered, setIsHovered] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].target.scrollWidth / 2);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
      setContainerWidth(containerRef.current.scrollWidth / 2);
    }
    
    const handleResize = () => {
      const userAgentMatch = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isIPadOS = typeof navigator !== 'undefined' && typeof document !== 'undefined' && navigator.userAgent.includes("Mac") && "ontouchend" in document;
      const isTouch = typeof window !== 'undefined' && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
      
      setIsMobile(userAgentMatch || isIPadOS || window.innerWidth < 1024 || (isTouch && window.innerWidth <= 1366));
    };
    
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [logos, gap]);

  // If containerWidth is 0 (e.g. before mount), use a fallback duration so the animation doesn't skip
  const duration = (speed > 0 && containerWidth > 0) ? (containerWidth / speed) : 30;
  const currentDuration = (isHovered && hoverSpeed === 0) ? 999999 : duration;

  return (
    <div 
      className="relative w-full overflow-hidden flex items-center"
      style={{ height: logoHeight + 60 }} // Add vertical space for the text below the circle
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel}
    >
      {fadeOut && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${fadeOutColor}, transparent)` }} />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${fadeOutColor}, transparent)` }} />
        </>
      )}

      <motion.div
        ref={containerRef}
        className="flex shrink-0 items-center optimize-gpu"
        style={{ willChange: "transform" }}
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: currentDuration,
        }}
      >
        {/* Render two identical blocks for a seamless loop */}
        {[0, 1].map((blockIdx) => (
          <div 
            key={blockIdx} 
            className="flex shrink-0 items-center" 
            style={{ gap: gap, paddingRight: gap }}
          >
            {logos.map((logo: any, i: number) => {
              const color = logo.color || "#00E5FF";
              return (
                <div 
                  key={i} 
                  className={`flex flex-col items-center gap-4 shrink-0 group ${scaleOnHover ? 'cursor-pointer' : ''} optimize-gpu`}
                  title={logo.title || logo.alt}
                >
                  <motion.div 
                    className="relative flex items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-2 optimize-gpu" 
                    style={{ width: logoHeight, height: logoHeight, willChange: "transform" }}
                    animate={isMobile ? undefined : { y: [0, -8, 0] }}
                    transition={isMobile ? undefined : { duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                  >
                    <div className="absolute inset-0 rounded-full border border-white/5 bg-[#02060D] z-10 transition-colors duration-300 group-hover:border-[#00E5FF]/30" />
                    
                    <div 
                      className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10"
                      style={{ background: color }}
                    />
                    
                    <div 
                      className="absolute inset-[2px] rounded-full opacity-10"
                      style={{ background: color }}
                    />
                    
                    <div className="relative z-20 font-orbitron font-bold text-white transition-colors duration-300 flex items-center justify-center" style={{ textShadow: `0 0 15px ${color}`, fontSize: logoHeight * 0.3 }}>
                      {logo.src ? (
                        <img 
                          src={logo.src} 
                          alt={logo.title} 
                          style={{ width: logoHeight * 0.5, height: logoHeight * 0.5 }}
                          className="transition-transform duration-300 group-hover:scale-110 drop-shadow-md" 
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <span className={logo.src ? 'hidden' : ''}>
                        {logo.title?.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  </motion.div>
                  
                  <span className="text-sm font-medium text-[#7A93B2] group-hover:text-white transition-colors text-center leading-tight max-w-[120px]">
                    {logo.title}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
