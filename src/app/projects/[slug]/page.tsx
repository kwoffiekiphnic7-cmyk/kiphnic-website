import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ProjectGallery from "@/components/sections/ProjectGallery";
import ProjectLiveCta from "@/components/sections/ProjectLiveCta";
import ProjectsGrid from "@/components/ProjectsGrid";
import CtaBanner from "@/components/sections/CtaBanner";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title.charAt(0) + project.title.slice(1).toLowerCase(),
    description: project.body,
    openGraph: {
      title: `${project.title} — Kiphnic`,
      description: project.body,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const others = projects.filter((p) => p.slug !== slug).slice(0, 3);
  const liveCta = project.href
    ? { label: "TRY IT LIVE →", href: project.href }
    : undefined;
  return (
    <main>
      <PageHero
        eyebrow={`PROJECT ${project.index} — ${project.tag ?? "BUILT BY KIPHNIC"}`}
        title={<>{project.title}.</>}
        body={project.body}
        bg="/images/bg-projects.webp"
        bgAlt="Kiphnic projects background"
      />
      <section>
        <div className="container">
          <Reveal>
            <ProjectGallery images={project.gallery ?? (project.image ? [project.image] : [])} title={project.title} />
          </Reveal>
          <Reveal delay={100}>
            <div className="actions-row" style={{ marginTop: 28 }}>
              {liveCta ? (
                <ProjectLiveCta
                  href={liveCta.href}
                  label={liveCta.label}
                  external={project.external}
                  requiresAuth={project.requiresAuth}
                />
              ) : null}
              <Link className="btn alt" href="/contact">
                DISCUSS A SIMILAR BUILD →
              </Link>
              <Link className="btn alt" href="/projects">
                ALL PROJECTS →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <section>
        <div className="container">
          <Reveal>
            <div className="eyebrow">KEEP EXPLORING</div>
            <h2>
              MORE <span>WORK.</span>
            </h2>
          </Reveal>
          <ProjectsGrid items={others} />
        </div>
      </section>
      <section className="project-shot" style={{ marginTop: 40 }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow">NEXT STORY</div>
            <p style={{ margin: "10px 0 14px 0" }}>Kept exploring — {others.length} more builds on the way.</p>
            <ProjectsGrid items={others} />
          </Reveal>
        </div>
      </section>
      <CtaBanner />
    </main>
  );
}