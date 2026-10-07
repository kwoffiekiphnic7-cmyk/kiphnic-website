import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ProjectsGrid from "@/components/ProjectsGrid";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Projects",
  description: "Built by Kiphnic — AI, software systems and game projects.",
  openGraph: {
    title: "Projects — Kiphnic",
    description: "Built by Kiphnic — AI, software systems and game projects.",
  },
};

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        eyebrow="04 — FEATURED PROJECTS"
        title={
          <>
            BUILT BY <span>KIPHNIC.</span>
          </>
        }
        body="A growing portfolio of intelligent products — from AI assistants to games and digital systems."
        bg="/images/bg-projects.webp"
        bgAlt="Kiphnic projects background"
      />
      <section>
        <div className="container">
          <Reveal>
            <ProjectsGrid />
          </Reveal>
          <Reveal delay={100}>
            <div className="feature-card">
              <div className="eyebrow">FEATURED BUILD</div>
              <h2>
                KIPHNIC <span>AI.</span>
              </h2>
              <p>
                Our flagship conversational assistant — ask questions, get help coding,
                generate ideas and research anything. Live on this site.
              </p>
              <Link className="btn" href="/ai">
                TRY IT LIVE →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <CtaBanner />
    </main>
  );
}

