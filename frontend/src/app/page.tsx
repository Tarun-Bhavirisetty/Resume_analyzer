"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Target, BarChart, CheckCircle2, LayoutTemplate, Briefcase, PlayCircle, BookOpen, FileSignature } from "lucide-react";
import { uploadResume, analyzeResume } from "@/lib/api";

// Import new modular components
import { CollapsibleCard } from "@/components/dashboard/CollapsibleCard";
import { UploadSection } from "@/components/dashboard/UploadSection";
import { AtsScoreSection } from "@/components/dashboard/AtsScoreSection";
import { SkillsGapSection } from "@/components/dashboard/SkillsGapSection";
import { StructureSection } from "@/components/dashboard/StructureSection";
import { RolesSection } from "@/components/dashboard/RolesSection";
import { CoursesSection } from "@/components/dashboard/CoursesSection";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { ImprovedResumeSection } from "@/components/dashboard/ImprovedResumeSection";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [manualSkills, setManualSkills] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"upload" | "analyzing" | "results">("upload");
  const [results, setResults] = useState<any>(null);

  // Accordion State: Only one section open at a time for clean SaaS feel
  const [activeSection, setActiveSection] = useState<string | null>("ats-score");

  const toggleSection = (id: string) => {
    setActiveSection(prev => prev === id ? null : id);
  };

  const handleAnalyze = async () => {
    if ((!file && !manualSkills) || !targetRole) {
      alert("Please provide a target role and either upload a resume or enter skills manually.");
      return;
    }

    try {
      setIsLoading(true);
      setStep("analyzing");
      
      let resumeId = 0;
      if (file) {
        const uploadRes = await uploadResume(file);
        resumeId = uploadRes.resume_id;
      }

      const analysisRes = await analyzeResume(resumeId, targetRole, manualSkills);
      setResults(analysisRes);
      setStep("results");
      setActiveSection("ats-score"); // Default open section on results
    } catch (error: any) {
      alert(error.message);
      setStep("upload");
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setTargetRole("");
    setManualSkills("");
    setResults(null);
    setStep("upload");
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight drop-shadow-sm">
            AI Resume <span className="gradient-text">Analyzer</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Get recruiter-level insights, fix skill gaps, and optimize your ATS score in seconds.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* UPLOAD STEP */}
          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <UploadSection 
                file={file} setFile={setFile}
                targetRole={targetRole} setTargetRole={setTargetRole}
                manualSkills={manualSkills} setManualSkills={setManualSkills}
              />
              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full gradient-btn p-5 rounded-xl text-xl font-bold flex justify-center items-center gap-3 shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-1"
              >
                <Target className="h-6 w-6" /> Analyze My Resume
              </button>
            </motion.div>
          )}

          {/* ANALYZING STEP */}
          {step === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center justify-center py-20 gap-8"
            >
              <div className="relative">
                <Loader2 className="h-24 w-24 animate-spin text-primary relative z-10" />
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
              </div>
              <h2 className="text-3xl font-bold animate-pulse text-foreground">Running AI Analysis...</h2>
              <p className="text-muted-foreground text-center max-w-md text-lg">
                Extracting skills, computing ATS scores, and generating personalized career insights.
              </p>
            </motion.div>
          )}

          {/* RESULTS DASHBOARD */}
          {step === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Dashboard Action Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background/50 p-6 rounded-2xl border border-border/50 shadow-sm">
                <div>
                  <h2 className="text-2xl font-black text-foreground">Dashboard Overview</h2>
                  <p className="text-muted-foreground font-medium mt-1">Target Role: <span className="text-primary font-bold">{targetRole}</span></p>
                </div>
                <button
                  onClick={resetAnalysis}
                  className="px-6 py-2.5 bg-secondary text-secondary-foreground font-bold rounded-lg hover:bg-secondary/80 transition-colors shadow-sm"
                >
                  Analyze New Resume
                </button>
              </div>

              {/* Accordion Dashboard Sections */}
              <div className="space-y-4">
                
                <CollapsibleCard 
                  id="ats-score" 
                  title="ATS Match Score" 
                  icon={<BarChart className="h-5 w-5" />} 
                  isActive={activeSection === "ats-score"} 
                  onToggle={toggleSection}
                >
                  <AtsScoreSection score={results.ats_score} />
                </CollapsibleCard>

                <CollapsibleCard 
                  id="skills-gap" 
                  title="Skill Gap Analysis" 
                  icon={<CheckCircle2 className="h-5 w-5" />} 
                  isActive={activeSection === "skills-gap"} 
                  onToggle={toggleSection}
                >
                  <SkillsGapSection matched={results.matched_skills} missing={results.missing_skills} />
                </CollapsibleCard>

                <CollapsibleCard 
                  id="structure" 
                  title="Resume Structure" 
                  icon={<LayoutTemplate className="h-5 w-5" />} 
                  isActive={activeSection === "structure"} 
                  onToggle={toggleSection}
                >
                  <StructureSection present={results.structure_present} missing={results.structure_missing} />
                </CollapsibleCard>

                <CollapsibleCard 
                  id="roles" 
                  title="Role Recommendations" 
                  icon={<Briefcase className="h-5 w-5" />} 
                  isActive={activeSection === "roles"} 
                  onToggle={toggleSection}
                >
                  <RolesSection roles={results.recommended_roles} />
                </CollapsibleCard>

                <CollapsibleCard 
                  id="courses" 
                  title="Suggested Upskilling Courses" 
                  icon={<PlayCircle className="h-5 w-5" />} 
                  isActive={activeSection === "courses"} 
                  onToggle={toggleSection}
                >
                  <CoursesSection courses={results.courses} />
                </CollapsibleCard>

                <CollapsibleCard 
                  id="projects" 
                  title="Recommended Projects" 
                  icon={<BookOpen className="h-5 w-5" />} 
                  isActive={activeSection === "projects"} 
                  onToggle={toggleSection}
                >
                  <ProjectsSection projects={results.projects} />
                </CollapsibleCard>

                {results.improved_resume && (
                  <CollapsibleCard 
                    id="improved-resume" 
                    title="AI ATS-Optimized Rewrite" 
                    icon={<FileSignature className="h-5 w-5" />} 
                    isActive={activeSection === "improved-resume"} 
                    onToggle={toggleSection}
                  >
                    <ImprovedResumeSection resumeData={results.improved_resume} />
                  </CollapsibleCard>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
