# AI Resume Analyzer

A production-ready full-stack AI SaaS platform for analyzing resumes, detecting skill gaps, providing ATS scoring, and recommending roles and projects.

## Stack
- **Frontend**: Next.js App Router, React, Tailwind CSS, Framer Motion, Recharts
- **Backend**: FastAPI
- **Database**: PostgreSQL (Structured), ChromaDB (Vector)
- **AI/LLM**: Groq (llama-3.3-70b-versatile), LangChain
- **Auth**: Clerk Authentication
- **Parsing**: PyMuPDF, pdfplumber, Tesseract OCR

## Overview
This platform allows users to upload their resumes in PDF format, specify a target role, and instantly receive comprehensive analysis including:
1. An ATS Score out of 100
2. Matching and Missing Technical Skills
3. Role Recommendations with Match %
4. Recommended Courses and Projects
5. An ATS-Optimized rewriting of their resume

Please refer to `setup.md` for detailed installation instructions.
