import Link from "next/link";

import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const detailHref = `/projects/${project.slug}`;
  return (
    <Link href={project.href ?? detailHref} aria-label={project.title}>
      <article
        className="project"
        style={
          project.image
            ? {
                backgroundImage: `linear-gradient(transparent 40%, #03070d 100%), url(${project.image})`,
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
          {project.href ? (
            <span className="view">Try it live →</span>
          ) : (
            <span className="view">View project →</span>
          )}
        </div>
      </article>
    </Link>
  );
}
