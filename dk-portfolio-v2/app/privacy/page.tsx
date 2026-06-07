import { Shield, Lock, FileText, Database } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Background Cyber Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00E5FF]/20 via-background to-background z-[-1]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-mono mb-6">
            <Lock className="w-3.5 h-3.5" /> Security & Privacy Protocol
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy <span className="text-[#00E5FF]">Policy</span>
          </h1>
          <p className="text-[#7A93B2] text-lg max-w-2xl">
            As a cybersecurity professional, I take data privacy extremely seriously. This protocol outlines exactly how your information is handled when you interact with this system.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-[#7A93B2] leading-relaxed">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-[#00E5FF]" /> 1. Data Collection & Telemetry
            </h2>
            <p>
              When you visit this portfolio, minimal standard telemetry (such as IP address, browser type, and interaction metrics) may be collected via standard hosting analytics (e.g., Vercel Analytics) solely for performance monitoring and security anomaly detection.
            </p>
            <p>
              When you submit a message through the Contact portal, the system collects your <strong>Name</strong>, <strong>Email Address</strong>, and the <strong>Message Content</strong>. This data is strictly used for direct communication.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#00E5FF]" /> 2. Data Security & Storage
            </h2>
            <p>
              Your contact submissions are securely processed through an encrypted connection. I do not sell, rent, or distribute your personal information to third-party data brokers or marketing agencies.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All form transmissions are protected via industry-standard TLS encryption.</li>
              <li>Data is processed using secure, compliant infrastructure.</li>
              <li>Once correspondence is concluded, sensitive information may be purged according to secure data disposal protocols.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#00E5FF]" /> 3. Zero-Trust Interaction
            </h2>
            <p>
              In alignment with Zero-Trust principles, any links, files, or proposals submitted through the contact form will be subject to strict security analysis. Do not submit unsolicited executable files or sensitive corporate credentials through the public form.
            </p>
          </section>

          <section className="p-6 bg-[#02060D]/80 rounded-xl border border-[#00E5FF]/20 backdrop-blur-md mt-12">
            <h3 className="text-lg font-bold text-white mb-2">Consent & Acknowledgment</h3>
            <p className="text-sm">
              By utilizing this website and its contact portals, you acknowledge and agree to this Privacy Protocol. If you have inquiries regarding your data, you may initiate a secure connection via the <Link href="/#contact" className="text-[#00E5FF] hover:underline">Contact section</Link>.
            </p>
            <p className="text-xs text-[#7A93B2]/70 mt-4 uppercase tracking-wider font-mono">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
