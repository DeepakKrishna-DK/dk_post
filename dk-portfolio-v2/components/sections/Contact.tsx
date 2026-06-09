"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Send, Mail, User, MessageSquare, Loader2, CheckCircle2, GitBranch, Link2, ShieldAlert, X, CheckSquare, ArrowRight } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [notifications, setNotifications] = useState<{ id: number; text: string; type: "success" | "error" }[]>([]);

  const removeNotif = (id: number) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const formUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL;

    if (!formUrl) {
      setStatus("idle");
      setNotifications((pv) => [{ id: Math.random(), text: `System Error: Submission endpoint not configured.`, type: "error" }, ...pv]);
      return;
    }

    try {
      const response = await fetch(formUrl, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        setNotifications((pv) => [{ id: Math.random(), text: `Secure transmission initiated.`, type: "success" }, ...pv]);
        setTimeout(() => {
          setStatus("idle");
          setForm({ name: "", email: "", message: "" });
        }, 2000);
      } else {
        const text = await response.text();
        let errorMsg = "HTTP " + response.status;
        try {
          const data = JSON.parse(text);
          errorMsg = data.error || (data.errors && data.errors.map((err: any) => err.message).join(", ")) || JSON.stringify(data);
        } catch {
          errorMsg = text.substring(0, 50);
        }
        setStatus("idle");
        setNotifications((pv) => [{ id: Math.random(), text: `Error: ${errorMsg}`, type: "error" }, ...pv]);
      }
    } catch (error: any) {
      setStatus("idle");
      setNotifications((pv) => [{ id: Math.random(), text: `Network Error: Please try again.`, type: "error" }, ...pv]);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.08) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="section-eyebrow justify-center">GET in Touch</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Lets Build something <span className="text-[#00E5FF]">Together</span> <br /> Initiate Secure <span className="text-[#00E5FF]">Connection</span>
          </h2>
          <p className="text-[#7A93B2] max-w-2xl mx-auto text-lg">
            I&apos;m always open to new challenges & oppurtunities, security assessments, and innovative collaborations. Feel free to reach out!
          </p>
        </motion.div>

        {/* Main Card Split Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-2 md:p-4 bg-[#061224]/80 backdrop-blur-xl border border-white/10"
        >
          <div className="grid lg:grid-cols-5 gap-0 overflow-hidden rounded-xl">

            {/* Left Column: Contact Info */}
            <div className="lg:col-span-2 bg-[#02060D] p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-[#00E5FF]" /> Comm Channels
              </h3>

              <div className="relative z-10 flex flex-col pt-4">
                <HoverLink heading="Email" subheading="deepakkrishnark@gmail.com" href="mailto:deepakkrishnark@gmail.com" Icon={Mail} />
                <HoverLink heading="GitHub" subheading="@DeepakKrishna-DK" href="https://github.com/DeepakKrishna-DK" Icon={GitBranch} />
                <HoverLink heading="Linkedin" subheading="in/deepak-p-s" href="https://www.linkedin.com/in/deepak-p-s" Icon={Link2} />
              </div>

              {/* Status Indicator */}
              <div className="mt-16 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/20">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-pulse" />
                <span className="text-sm font-medium text-[#00FF66]">System Online & Ready</span>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-3 p-8 md:p-10 lg:pl-16 relative">
              <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-[#7A93B2] mb-2 uppercase tracking-wider">
                      Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A93B2] group-focus-within:text-[#00E5FF]" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-3.5 bg-[#02060D]/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5FF]/50 focus:bg-[#02060D] transition-all"
                        placeholder="Your Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#7A93B2] mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A93B2] group-focus-within:text-[#00E5FF]" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3.5 bg-[#02060D]/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5FF]/50 focus:bg-[#02060D] transition-all"
                        placeholder="your@gmail.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#7A93B2] mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-[#7A93B2] group-focus-within:text-[#00E5FF]" />
                    <textarea
                      required
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-[#02060D]/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5FF]/50 focus:bg-[#02060D] transition-all resize-none"
                      placeholder="How Can I help you?"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={status !== "idle"}
                  whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                  whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
                  className="btn-primary w-full justify-center py-4 mt-4 text-sm tracking-wider uppercase font-mono"
                >
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        Send <Send className="w-4 h-4" />
                      </motion.div>
                    )}
                    {status === "submitting" && (
                      <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                      </motion.div>
                    )}
                    {status === "success" && (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> Transmission Complete
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slide-In Notifications */}
      <div className="flex flex-col gap-3 w-72 sm:w-80 fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

const NOTIFICATION_TTL = 5000;

const Notification = ({ text, id, type, removeNotif }: { text: string; id: number; type: "success" | "error"; removeNotif: (id: number) => void }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, [id, removeNotif]);

  const isError = type === "error";

  return (
    <motion.div
      layout
      initial={{ y: 20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`p-4 flex items-start rounded-xl gap-3 text-sm font-medium shadow-[0_0_30px_rgba(0,0,0,0.2)] text-white bg-[#061224]/90 backdrop-blur-md border pointer-events-auto ${
        isError ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]" : "border-[#00E5FF]/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
      }`}
    >
      {isError ? (
        <ShieldAlert className="mt-0.5 w-5 h-5 text-red-500 shrink-0" />
      ) : (
        <CheckSquare className="mt-0.5 w-5 h-5 text-[#00E5FF] shrink-0" />
      )}
      <span className="leading-snug">{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5 text-[#7A93B2] hover:text-white transition-colors">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const HoverLink = ({ heading, subheading, href, Icon }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-white/5 py-5 transition-colors duration-500 hover:border-[#00E5FF]/50"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -8 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.1,
          }}
          className="relative z-10 block text-lg font-bold text-white transition-colors duration-500 group-hover:text-[#00E5FF]"
        >
          {heading.split("").map((l: string, i: number) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 8 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-1 block text-sm text-[#7A93B2] font-mono transition-colors duration-500 group-hover:text-white">
          {subheading}
        </span>
      </div>

      <motion.div
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        className="absolute z-0 h-20 w-20 flex items-center justify-center rounded-xl bg-[#061224]/90 backdrop-blur-md border border-[#00E5FF]/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] pointer-events-none"
      >
        <Icon className="w-8 h-8 text-[#00E5FF]" />
      </motion.div>

      <motion.div
        variants={{
          initial: { x: "25%", opacity: 0 },
          whileHover: { x: "0%", opacity: 1 },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-2"
      >
        <ArrowRight className="w-5 h-5 text-white" />
      </motion.div>
    </motion.a>
  );
};
