"use client";

import { CheckCircle, AlertTriangle } from "lucide-react";

export function SkillsGapSection({ matched, missing }: { matched: string[], missing: string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-green-500/5 rounded-xl border border-green-500/20 p-5">
        <h4 className="flex items-center gap-2 text-green-500 font-bold mb-4 text-lg">
          <CheckCircle className="h-5 w-5" /> Matched Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {matched.length > 0 ? matched.map((skill, i) => (
            <span key={i} className="px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-sm font-medium">
              {skill}
            </span>
          )) : <span className="text-muted-foreground text-sm italic">None detected</span>}
        </div>
      </div>
      
      <div className="bg-red-500/5 rounded-xl border border-red-500/20 p-5">
        <h4 className="flex items-center gap-2 text-red-500 font-bold mb-4 text-lg">
          <AlertTriangle className="h-5 w-5" /> Missing Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {missing.length > 0 ? missing.map((skill, i) => (
            <span key={i} className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md text-sm font-medium">
              {skill}
            </span>
          )) : <span className="text-muted-foreground text-sm italic">You have all required skills!</span>}
        </div>
      </div>
    </div>
  );
}
