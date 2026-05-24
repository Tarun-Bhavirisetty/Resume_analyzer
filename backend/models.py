from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.sql import func
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from database import Base

# =========================
# SQLAlchemy ORM Models
# =========================
class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True) # Clerk user_id
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Resume(Base):
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    filename = Column(String)
    raw_text = Column(Text)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

class AnalysisResult(Base):
    __tablename__ = "analysis_results"
    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id"))
    target_role = Column(String)
    extracted_skills = Column(String)
    matched_skills = Column(JSON)
    missing_skills = Column(JSON)
    ats_score = Column(Integer)
    structure_present = Column(JSON)
    structure_missing = Column(JSON)
    improved_resume = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# =========================
# Pydantic Schemas
# =========================
class ResumeUploadResponse(BaseModel):
    resume_id: int
    filename: str
    message: str

class AnalyzeRequest(BaseModel):
    resume_id: int
    target_role: str
    manual_skills: Optional[str] = None

class AnalysisResponse(BaseModel):
    id: int
    ats_score: int
    matched_skills: List[str]
    missing_skills: List[str]
    structure_present: List[str]
    structure_missing: List[str]
    extracted_skills: str
    improved_resume: Optional[Dict[str, Any]]
    recommended_roles: List[Dict[str, Any]]
    projects: List[Dict[str, Any]]
    courses: List[Dict[str, Any]]
    job_links: str
