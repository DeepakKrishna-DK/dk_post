import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Achievements from "@/components/sections/Achievements";
import Dashboard from "@/components/sections/Dashboard";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import PageWrapper from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "Deepak P S | Cybersecurity Professional",
  description:
    "Building intelligent cyber defense systems focused on threat detection, secure infrastructure, and resilient digital protection against evolving cyber threats.",
};

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Education />
      <Experience />
      <Achievements />
      <Dashboard />
      <Contact />
    </PageWrapper>
  );
}
