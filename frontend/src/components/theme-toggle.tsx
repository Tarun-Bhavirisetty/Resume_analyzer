"use client"

import * as React from "react"
import { Moon, Sun, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-md p-1 rounded-full border border-border shadow-sm">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted'}`}
        title="Light Mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted'}`}
        title="Dark Mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("bright")}
        className={`p-2 rounded-full transition-all ${theme === 'bright' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md' : 'text-muted-foreground hover:bg-muted'}`}
        title="Bright Mode"
      >
        <Sparkles className="h-4 w-4" />
      </button>
    </div>
  )
}
