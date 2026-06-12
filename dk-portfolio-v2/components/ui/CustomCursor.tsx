"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // useMotionValue prevents React re-renders on every mouse move, fixing the stuttering!
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Snappy spring physics for the main dot
  const springX = useSpring(mouseX, { stiffness: 800, damping: 28, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 800, damping: 28, mass: 0.1 });

  // Slightly slower spring physics for the trailing ring
  const ringSpringX = useSpring(mouseX, { stiffness: 250, damping: 20, mass: 0.5 });
  const ringSpringY = useSpring(mouseY, { stiffness: 250, damping: 20, mass: 0.5 });

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = typeof window !== "undefined" && (("ontouchstart" in window) || (navigator.maxTouchPoints > 0));
      setIsMobile(isTouch);
    };
    checkMobile();

    if (!isMobile) {
      const updateMousePosition = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.classList.contains("cursor-pointer") ||
          window.getComputedStyle(target).cursor === "pointer"
        ) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      };

      window.addEventListener("mousemove", updateMousePosition, { passive: true });
      window.addEventListener("mouseover", handleMouseOver, { passive: true });

      return () => {
        window.removeEventListener("mousemove", updateMousePosition);
        window.removeEventListener("mouseover", handleMouseOver);
      };
    }
  }, [mouseX, mouseY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#00E5FF] rounded-full pointer-events-none z-[9999] mix-blend-screen shadow-[0_0_10px_#00E5FF]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-[#00E5FF]/60 rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringSpringX,
          y: ringSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? "rgba(0, 229, 255, 0.15)" : "rgba(0, 229, 255, 0)",
          borderColor: isHovering ? "rgba(0, 229, 255, 0.8)" : "rgba(0, 229, 255, 0.6)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
