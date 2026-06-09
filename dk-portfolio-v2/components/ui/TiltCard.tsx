"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const hover = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const hoverSpring = useSpring(hover, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        hover.set(0.6); // Keep AR border permanently visible on mobile
      } else {
        hover.set(0);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    hover.set(1);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
    hover.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`perspective-1000 relative group ${className || ""}`}
    >
      <div
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {/* AR Scanning Border Effect */}
        <motion.div 
          style={{ opacity: hoverSpring }}
          className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[#00E5FF] via-transparent to-[#10B981] z-[-1] blur-[2px]"
        />

        {children}

        {/* Glare/Spotlight Layer */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden z-50"
          style={{ opacity: hoverSpring }}
        >
          <motion.div
            className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(0,229,255,0.15)_0%,_transparent_50%)] mix-blend-screen"
            style={{
              left: glareX,
              top: glareY,
              x: "-50%",
              y: "-50%",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
