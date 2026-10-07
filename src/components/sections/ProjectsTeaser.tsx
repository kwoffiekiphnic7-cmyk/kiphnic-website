import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ProjectsGrid from "@/components/ProjectsGrid";
import { projects } from "@/data/projects";

export default function ProjectsTeaser() {
  return (
    <section id="projects">
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="04 — FEATURED PROJECTS"
            title={
              <>
                BUILT BY <span>KIPHNIC.</span>
              </>
            }
            body="A growing portfolio of intelligent products — from AI assistants to games and digital systems."
          />
        </Reveal>
        <Reveal delay={100}>
          <ProjectsGrid items={projects.slice(0, 3)} />
        </Reveal>
        <Reveal>
          <div className="view-all">
            <Link className="view-all-link" href="/projects">
              VIEW ALL PROJECTS →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
