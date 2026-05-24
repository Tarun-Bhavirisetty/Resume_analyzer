from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
import database
import routes

# =========================
# Create Database Tables
# =========================
models.Base.metadata.create_all(
    bind=database.engine
)

# =========================
# Initialize FastAPI App
# =========================
app = FastAPI(
    title="AI Resume Analyzer API",
    description="Backend API for AI Resume Analyzer",
    version="1.0.0"
)

# =========================
# CORS Configuration
# =========================
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",

    # Production Frontend URL
    "https://tarun-resume-analyzer.vercel.app",
]

app.add_middleware(
    CORSMiddleware,

    allow_origins=origins,

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# =========================
# Include API Routes
# =========================
app.include_router(
    routes.router,
    prefix="/api",
    tags=["Resume Analysis"]
)

# =========================
# Root Route
# =========================
@app.get("/")
async def root():

    return {
        "status": "success",
        "message": "AI Resume Analyzer Backend Running Successfully"
    }

# =========================
# Health Check Route
# =========================
@app.get("/health")
async def health_check():

    return {
        "status": "healthy"
    }