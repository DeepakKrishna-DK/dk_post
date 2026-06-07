"use client";

import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Deepak has consistently displayed exceptional professionalism, visionary leadership, and advanced technical capability through his remarkable contributions to the COPS Club, delivering impactful digital solutions while successfully leading and executing major departmental initiatives and technical events",
    name: "Dr. Vasudeva R",
    role1: "HOD, Dept. of CSE,CBIT-KOlar",
    role2: "President, COPS Club",
    avatar: "V",
    avatarColor: "#00E5FF",
  },
];

export default function Dashboard() {
  const [active, setActive] = useState(0);

  return (
    <section id="dashboard" className="py-20 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center mb-16">
          <div className="section-eyebrow justify-center mb-3">Testimonials</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Words of <span className="text-[#00E5FF]">Appreciation</span>
          </h2>
        </motion.div>

        <div className="card p-6 sm:p-8 md:p-10 relative max-w-4xl mx-auto text-center">
          <Quote className="w-8 h-8 md:w-10 md:h-10 text-[#00E5FF]/20 mb-6 mx-auto" />

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[#7A93B2] text-lg md:text-xl italic leading-relaxed mb-8 max-w-3xl mx-auto">
              &quot;{TESTIMONIALS[active].quote}&quot;
            </p>

            <div className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-orbitron text-sm font-bold shrink-0 mb-2"
                style={{
                  background: `${TESTIMONIALS[active].avatarColor}20`,
                  border: `2px solid ${TESTIMONIALS[active].avatarColor}50`,
                  color: TESTIMONIALS[active].avatarColor,
                }}
              >
                {TESTIMONIALS[active].avatar}
              </div>
              <div>
                <div className="font-semibold text-white">{TESTIMONIALS[active].name}</div>
                <div className="text-sm text-[#7A93B2]">{TESTIMONIALS[active].role1}</div>
                <div className="text-sm text-[#7A93B2]">{TESTIMONIALS[active].role2}</div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-[#00E5FF] w-5" : "bg-white/20"}`}
                />
              ))}
            </div>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setActive((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-[#7A93B2] hover:border-[#00E5FF]/50 hover:text-white transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActive((active + 1) % TESTIMONIALS.length)}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-[#7A93B2] hover:border-[#00E5FF]/50 hover:text-white transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
