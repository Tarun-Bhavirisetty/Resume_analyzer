"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";

interface CollapsibleCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

export function CollapsibleCard({ id, title, icon, isActive, onToggle, children }: CollapsibleCardProps) {
  return (
    <div className={`glass-card overflow-hidden border transition-all duration-300 ${isActive ? 'border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.1)]' : 'border-border/50 hover:border-primary/30'}`}>
      <button
        onClick={() => onToggle(id)}
        className="w-full p-5 flex items-center justify-between bg-background/40 backdrop-blur-md hover:bg-muted/30 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
            {icon}
          </div>
          <h3 className={`text-lg font-bold tracking-tight transition-colors ${isActive ? 'text-primary' : 'text-foreground'}`}>
            {title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={isActive ? "text-primary" : "text-muted-foreground"}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="p-6 pt-4 border-t border-border/50 bg-background/20">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
