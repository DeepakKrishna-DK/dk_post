"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// --- CLICK SPARK ---
export const ClickSpark = ({
  sparkColor = "#00E5FF",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  children,
}: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life -= 16 / duration;
        if (p.life <= 0) particles.splice(i, 1);
        else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, sparkSize * p.life, 0, Math.PI * 2);
          ctx.fillStyle = sparkColor;
          ctx.fill();
        }
      });
      if (particles.length > 0) requestAnimationFrame(animate);
    };

    const handleClick = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      for (let i = 0; i < sparkCount; i++) {
        particles.push({
          x: clientX,
          y: clientY,
          angle: (Math.PI * 2 * i) / sparkCount,
          speed: Math.random() * (sparkRadius / 5) + 2,
          life: 1,
        });
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("click", handleClick);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />
      {children}
    </>
  );
};



// --- SPLIT TEXT ---
export const SplitText = ({ text, className, delay = 0.5 }: any) => {
  const chars = text.split("");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {chars.map((char: string, i: number) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: delay + i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

// --- DECRYPTED TEXT ---
export const DecryptedText = ({
  text,
  speed = 60,
  maxIterations = 10,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*",
  animateOn = "view",
  className = "",
}: any) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const isInView = useRef(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const startDecrypt = (targetText: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev: string) =>
        targetText
          .split("")
          .map((letter: string, index: number) => {
            if (index < iteration) {
              return targetText[index];
            }
            if (letter === " ") return " ";
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
        setIsAnimating(false);
        setDisplayText(targetText);
      }

      iteration += targetText.length / maxIterations;
    }, speed);
  };

  // Trigger animation when `text` prop changes
  useEffect(() => {
    if (displayText !== text && !isAnimating) {
      startDecrypt(text);
    }
  }, [text]);

  useEffect(() => {
    if (animateOn === "view") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isInView.current) {
            isInView.current = true;
            setTimeout(() => {
              if (displayText !== text) startDecrypt(text);
            }, 500); // Small delay before decrypting on view
          }
        },
        { threshold: 0.1 }
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [animateOn, text, speed, maxIterations]);

  return (
    <motion.span
      ref={containerRef}
      onMouseEnter={animateOn === "hover" ? () => startDecrypt(text) : undefined}
      className={`inline-block font-mono ${className}`}
    >
      {displayText}
    </motion.span>
  );
};
