import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/sections/ProjectCard";

export default function ProjectsGrid({ items }: { items?: Project[] }) {
  const list = items ?? projects;
  return (
    <div className="projects">
      {list.map((p) => (
        <ProjectCard key={p.title} project={p} />
      ))}
    </div>
  );
}

