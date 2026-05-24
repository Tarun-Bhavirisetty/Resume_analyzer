"use client";

export function ImprovedResumeSection({ resumeData }: { resumeData: any }) {
  if (!resumeData) return null;

  return (
    <div className="bg-background/60 p-6 sm:p-8 rounded-xl border border-border/80 shadow-inner text-foreground">
      
      {/* Summary */}
      {resumeData.summary && (
        <div className="mb-8">
          <h4 className="text-lg font-black border-b border-border/80 pb-2 mb-4 text-primary uppercase tracking-wider">Professional Summary</h4>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{resumeData.summary}</p>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-black border-b border-border/80 pb-2 mb-4 text-primary uppercase tracking-wider">Technical Skills</h4>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 bg-secondary/50 text-secondary-foreground rounded-md text-sm border border-border/50 font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-black border-b border-border/80 pb-2 mb-4 text-primary uppercase tracking-wider">Professional Experience</h4>
          <div className="space-y-6">
            {resumeData.experience.map((exp: any, idx: number) => (
              <div key={idx}>
                <h5 className="font-bold text-foreground text-base sm:text-lg">{exp.role_and_company}</h5>
                <ul className="list-disc list-outside ml-5 mt-3 space-y-2">
                  {exp.bullet_points.map((pt: string, pIdx: number) => (
                    <li key={pIdx} className="text-sm sm:text-base text-muted-foreground leading-relaxed">{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-black border-b border-border/80 pb-2 mb-4 text-primary uppercase tracking-wider">Projects</h4>
          <div className="space-y-6">
            {resumeData.projects.map((proj: any, idx: number) => (
              <div key={idx}>
                <h5 className="font-bold text-foreground text-base sm:text-lg">{proj.title}</h5>
                <ul className="list-disc list-outside ml-5 mt-3 space-y-2">
                  {proj.bullet_points.map((pt: string, pIdx: number) => (
                    <li key={pIdx} className="text-sm sm:text-base text-muted-foreground leading-relaxed">{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education && (
        <div>
          <h4 className="text-lg font-black border-b border-border/80 pb-2 mb-4 text-primary uppercase tracking-wider">Education</h4>
          <p className="text-sm sm:text-base font-semibold text-foreground">{resumeData.education}</p>
        </div>
      )}

    </div>
  );
}
