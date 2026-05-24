"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export function AtsScoreSection({ score }: { score: number }) {
  const getAtsColor = (score: number) => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 60) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h3 className="text-xl font-bold mb-6">Your Match Score</h3>
      <div className="h-56 w-full max-w-sm relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { name: "Score", value: score },
                { name: "Remaining", value: 100 - score }
              ]}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              cornerRadius={5}
            >
              <Cell fill={getAtsColor(score)} />
              <Cell fill="hsl(var(--muted))" />
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-5xl font-black drop-shadow-md" style={{ color: getAtsColor(score) }}>
            {score}%
          </span>
        </div>
      </div>
      <p className="mt-6 text-center text-muted-foreground max-w-md">
        {score >= 80 ? "Great job! Your resume is highly optimized for this role." : 
         score >= 60 ? "Good start, but you can improve your chances by adding missing keywords." : 
         "Your resume needs significant changes to match the target role effectively."}
      </p>
    </div>
  );
}
