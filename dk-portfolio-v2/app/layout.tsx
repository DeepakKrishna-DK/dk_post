import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Deepak P S | Cybersecurity Engineer",
  description:
    "I help organizations secure their digital assets, prevent cyber threats, and build resilient security systems.",
  keywords: ["Deepak P S", "Cybersecurity Engineer", "Penetration Testing", "Ethical Hacking", "Security Engineer"],
  authors: [{ name: "Deepak P S" }],
  openGraph: {
    title: "Deepak P S | Cybersecurity Engineer",
    description: "I help organizations secure their digital assets, prevent cyber threats, and build resilient security systems.",
    url: "https://deepakps.dev",
    siteName: "Deepak P S",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak P S | Cybersecurity Engineer",
    description: "Cybersecurity engineer protecting systems and defending futures.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} antialiased bg-[#02060D] text-[#F1F5F9] relative`}>
        {/* Global Background Layer */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#02060D]">
          {/* Ambient Mesh Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.08)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.05)_0%,transparent_60%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.03)_0%,transparent_50%)]" />
          
          {/* Subtle Noise Texture */}
          <div 
            className="absolute inset-0 opacity-[0.02]" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
            }} 
          />
        </div>

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
