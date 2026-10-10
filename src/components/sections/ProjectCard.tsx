"use client";

import Link from "next/link";

import type { Project } from "@/data/projects";
import { useAuth } from "@/components/auth/AuthProvider";

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export default function ProjectCard({ project }: { project: Project }) {
  const { user, loading, openAuth } = useAuth();
  const detailHref = `/projects/${project.slug}`;
  const targetHref = project.href ?? detailHref;
  const external = Boolean(project.external) || isExternal(targetHref);
  const live = Boolean(project.href);

  // Gated projects (e.g. Canvas Dodger) require an account before they open.
  const gated = Boolean(project.requiresAuth);
  const needsAuth = gated && !loading && !user;

  const inner = (
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
        <span className="view">
          {needsAuth
            ? "Sign in to play →"
            : live
              ? "Try it live →"
              : "View project →"}
        </span>
      </div>
    </article>
  );

  // Gated + signed out: open the auth modal instead of following the link.
  if (needsAuth) {
    return (
      <button
        type="button"
        className="project-link"
        aria-label={`${project.title} — sign in to play`}
        onClick={() => openAuth("signup")}
      >
        {inner}
      </button>
    );
  }

  if (external) {
    return (
      <a
        className="project-link"
        href={targetHref}
        aria-label={project.title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link className="project-link" href={targetHref} aria-label={project.title}>
      {inner}
    </Link>
  );
}

