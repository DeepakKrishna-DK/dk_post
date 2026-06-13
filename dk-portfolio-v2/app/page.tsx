import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Publications from "@/components/sections/Publications";
import Recognition from "@/components/sections/Recognition";
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
      <Experience />
      <Publications />
      <Projects />
      <Skills />
      <Education />
      <Certifications />
      <Recognition />
      <Contact />
    </PageWrapper>
  );
}
