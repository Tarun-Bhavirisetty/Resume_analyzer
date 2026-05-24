"use client";

import { ExternalLink } from "lucide-react";

export function RolesSection({ roles }: { roles: any[] }) {
  return (
    <ul className="space-y-3">
      {roles.map((r: any, i: number) => (
        <li key={i} className="p-4 bg-muted/20 rounded-xl border border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-primary/50 hover:bg-muted/40">
          <span className="font-bold text-foreground text-lg">{r.role}</span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-sm font-extrabold px-3 py-1.5 bg-primary/20 text-primary rounded-md border border-primary/20">
              {r.match_percentage}% Match
            </span>
            <a 
              href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(r.role)}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-primary hover:text-primary/80 hover:underline font-bold flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-md transition-colors"
            >
              Find Jobs <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
