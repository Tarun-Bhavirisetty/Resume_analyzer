"use client";

export function ProjectsSection({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) {
    return <div className="text-sm text-muted-foreground p-4 text-center">No projects suggested at this time.</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {projects.map((project: any, i: number) => (
        <div key={i} className="p-5 bg-background/40 backdrop-blur-sm rounded-xl border border-border/60 flex flex-col gap-3 transition-all hover:border-primary/50 hover:shadow-lg">
          <h4 className="font-bold text-lg text-foreground">{project.title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/50">
            {project.tech_stack?.map((tech: string, j: number) => (
              <span key={j} className="text-xs px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-md font-bold">
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
