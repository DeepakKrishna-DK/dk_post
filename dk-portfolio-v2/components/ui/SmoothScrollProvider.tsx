"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable smooth scrolling on touch devices for native feel
    const checkMobile = () => {
      const isTouch = typeof window !== "undefined" && (("ontouchstart" in window) || (navigator.maxTouchPoints > 0));
      setIsMobile(isTouch || window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children as any}
    </ReactLenis>
  );
}
