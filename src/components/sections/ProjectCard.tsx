import Link from "next/link";

import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  // Every card opens the project detail page (story + gallery + live link
  // at the bottom). Gated projects (e.g. Canvas Dodger) keep their
  // sign-in check on the detail page's live CTA — not on the card — so
  // anyone can always open the page and see the project pictures.
  const detailHref = `/projects/${project.slug}`;

  return (
    <Link className="project-link" href={detailHref} aria-label={project.title}>
      <article
        className="project"
        style={
          project.image
            ? {
                backgroundImage: `linear-gradient(transparent 40%, var(--bg) 100%), url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div>
          <h3>
            {project.index} — {project.title}
          </h3>
          <p>{project.body}</p>
          <span className="view">View project →</span>
        </div>
      </article>
    </Link>
  );
}

