import Hero from "@/components/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import ServicesTeaser from "@/components/sections/ServicesTeaser";
import AiTeaser from "@/components/sections/AiTeaser";
import ProjectsTeaser from "@/components/sections/ProjectsTeaser";
import Vision from "@/components/sections/Vision";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ContactTeaser from "@/components/sections/ContactTeaser";
import CtaBanner from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <ServicesTeaser />
      <AiTeaser />
      <ProjectsTeaser />
      <Vision />
      <AboutTeaser />
      <ContactTeaser />
      <CtaBanner />
    </main>
  );
}


