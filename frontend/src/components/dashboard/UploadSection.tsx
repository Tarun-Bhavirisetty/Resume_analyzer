"use client";

import { useDropzone } from "react-dropzone";
import { File, UploadCloud } from "lucide-react";
import React from "react";

interface UploadSectionProps {
  file: globalThis.File | null;
  setFile: (file: globalThis.File | null) => void;
  targetRole: string;
  setTargetRole: (val: string) => void;
  manualSkills: string;
  setManualSkills: (val: string) => void;
}

export function UploadSection({ file, setFile, targetRole, setTargetRole, manualSkills, setManualSkills }: UploadSectionProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) setFile(acceptedFiles[0]);
    },
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="glass-card p-6 flex flex-col gap-4 border border-border/50">
        <h3 className="text-lg font-bold text-foreground">1. Upload Resume (PDF)</h3>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragActive ? "border-primary bg-primary/10 scale-[1.02]" : "border-border/60 hover:border-primary/50 bg-background/30 hover:bg-background/50"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="flex flex-col items-center gap-3">
              <File className="h-12 w-12 text-primary" />
              <p className="font-semibold text-sm sm:text-base text-foreground break-all">{file.name}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <UploadCloud className="h-12 w-12 mb-2" />
              <p className="font-medium">Drag & drop your PDF here</p>
              <p className="text-xs sm:text-sm">or click to browse</p>
            </div>
          )}
        </div>
      </div>

      <div className="glass-card p-6 flex flex-col gap-4 border border-border/50">
        <h3 className="text-lg font-bold text-foreground">2. Target Role</h3>
        <input
          type="text"
          placeholder="e.g. Senior Frontend Developer"
          className="w-full bg-background/50 border border-border/60 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
        />

        <h3 className="text-lg font-bold text-foreground mt-2">3. Manual Skills (Optional)</h3>
        <textarea
          placeholder="Paste additional skills here..."
          className="w-full bg-background/50 border border-border/60 rounded-lg p-3.5 min-h-[110px] focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none text-foreground"
          value={manualSkills}
          onChange={(e) => setManualSkills(e.target.value)}
        />
      </div>
    </div>
  );
}
