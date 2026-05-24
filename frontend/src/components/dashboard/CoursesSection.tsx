"use client";

import { ExternalLink } from "lucide-react";

export function CoursesSection({ courses }: { courses: any[] }) {
  if (!courses || courses.length === 0) {
    return <div className="text-sm text-muted-foreground p-4 text-center">No courses needed. You have all the skills!</div>;
  }

  return (
    <ul className="grid md:grid-cols-2 gap-4">
      {courses.map((c: any, i: number) => (
        <li key={i} className="p-4 bg-muted/20 rounded-xl border border-border flex flex-col gap-3 transition-all hover:border-primary/50 hover:bg-muted/30 hover:shadow-md">
          <div className="flex justify-between items-start gap-2">
            <span className="font-bold text-foreground leading-tight">{c.course_name}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-secondary text-secondary-foreground rounded-full whitespace-nowrap">
              {c.platform}
            </span>
          </div>
          <div className="mt-auto pt-2 flex justify-between items-end border-t border-border/50">
            <span className="text-xs text-muted-foreground font-medium bg-background px-2 py-1 rounded-md">Skill: <span className="text-foreground">{c.skill}</span></span>
            <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary/80 font-bold flex items-center gap-1">
              Access ↗
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
