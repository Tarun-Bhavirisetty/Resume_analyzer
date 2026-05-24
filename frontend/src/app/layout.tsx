import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { FileText } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Resume Analyzer",
  description: "Smart Career Insights, Skill Gap Detection, and ATS Scoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            themes={['light', 'dark', 'bright']}
          >
            <nav className="w-full border-b border-border/40 bg-background/50 backdrop-blur-md sticky top-0 z-50">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                  <FileText className="text-primary" />
                  <span className="gradient-text">Resume AI</span>
                </Link>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  {/* We can add UserButton from Clerk here later */}
                </div>
              </div>
            </nav>
            <main className="flex-grow">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
