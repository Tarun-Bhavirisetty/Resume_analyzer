"use client";

import { LayoutTemplate, LayoutGrid } from "lucide-react";

export function StructureSection({ present, missing }: { present: string[], missing: string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-5 bg-background/50 rounded-xl border border-border flex flex-col gap-3">
        <div className="flex items-center gap-2 text-primary">
          <LayoutTemplate className="h-5 w-5" />
          <h4 className="font-semibold">Present Sections</h4>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {present.length > 0 ? present.map((sec, i) => (
             <span key={i} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm">
               {sec}
             </span>
          )) : <span className="text-muted-foreground text-sm">None</span>}
        </div>
      </div>
      
      <div className="p-5 bg-background/50 rounded-xl border border-border flex flex-col gap-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <LayoutGrid className="h-5 w-5" />
          <h4 className="font-semibold">Missing Sections</h4>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {missing.length > 0 ? missing.map((sec, i) => (
             <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
               {sec}
             </span>
          )) : <span className="text-muted-foreground text-sm">None</span>}
        </div>
      </div>
    </div>
  );
}
