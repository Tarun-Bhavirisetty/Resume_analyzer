from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session

import json

import models
import database
import parser
import ai_engine

router = APIRouter()


# =========================
# Upload Resume
# =========================
@router.post("/upload", response_model=models.ResumeUploadResponse)
async def upload_resume(
    file: UploadFile = File(...),
    user_id: str = Form("anonymous"),
    db: Session = Depends(database.get_db)
):

    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )

    try:
        file_bytes = await file.read()

        text = parser.extract_text_from_pdf(file_bytes)

        if not text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from PDF"
            )

        db_resume = models.Resume(
            user_id=user_id,
            filename=file.filename,
            raw_text=text
        )

        db.add(db_resume)
        db.commit()
        db.refresh(db_resume)

        return {
            "resume_id": db_resume.id,
            "filename": db_resume.filename,
            "message": "Uploaded successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =========================
# Analyze Resume
# =========================
@router.post("/analyze", response_model=models.AnalysisResponse)
async def analyze_resume(
    request: models.AnalyzeRequest,
    db: Session = Depends(database.get_db)
):

    try:

        # =========================
        # Get Resume
        # =========================
        db_resume = db.query(models.Resume).filter(
            models.Resume.id == request.resume_id
        ).first()

        if not db_resume:
            raise HTTPException(
                status_code=404,
                detail="Resume not found"
            )

        combined_input = db_resume.raw_text

        if request.manual_skills:
            combined_input += " " + request.manual_skills

        # =========================
        # Structure Analysis
        # =========================
        present_sections, missing_sections = parser.check_resume_sections(
            db_resume.raw_text
        )

        # =========================
        # Skill Extraction
        # =========================
        skills = ai_engine.extract_skills(combined_input)

        # =========================
        # Job Requirements
        # =========================
        requirements = ai_engine.generate_job_requirements(
            request.target_role
        )

        # =========================
        # ATS Analysis
        # =========================
        ats_score, matched_skills, missing_skills = (
            ai_engine.calculate_ats_score(
                skills,
                requirements
            )
        )

        # =========================
        # Suggested Roles
        # =========================
        roles = ai_engine.suggest_roles(skills)

        roles_str = ",".join(
            [r.get("role", "") for r in roles]
        ) if isinstance(roles, list) else str(roles)

        # =========================
        # Courses
        # =========================
        courses = []

        if missing_skills:
            courses = ai_engine.get_course_links(
                ", ".join(missing_skills)
            )

        # =========================
        # Job Links
        # =========================
        job_links = ai_engine.generate_job_links(
            roles_str
        )

        # =========================
        # Projects
        # =========================
        projects = ai_engine.suggest_projects(
            skills,
            request.target_role,
            ", ".join(missing_skills)
        )

        # =========================
        # Improved Resume
        # =========================
        improved_resume = ""

        if ats_score < 70:

            improved_resume = ai_engine.generate_improved_resume(
                db_resume.raw_text,
                request.target_role,
                ", ".join(missing_skills)
            )

        # =========================
        # Convert Complex Objects
        # =========================
        matched_skills_json = json.dumps(matched_skills)

        missing_skills_json = json.dumps(missing_skills)

        structure_present_json = json.dumps(
            present_sections
        )

        structure_missing_json = json.dumps(
            missing_sections
        )

        improved_resume_json = json.dumps(
            improved_resume
        )

        # =========================
        # Save To Database
        # =========================
        db_analysis = models.AnalysisResult(
            resume_id=request.resume_id,

            target_role=request.target_role,

            extracted_skills=str(skills),

            matched_skills=matched_skills_json,

            missing_skills=missing_skills_json,

            ats_score=int(ats_score),

            structure_present=structure_present_json,

            structure_missing=structure_missing_json,

            improved_resume=improved_resume_json
        )

        db.add(db_analysis)

        db.commit()

        db.refresh(db_analysis)

        # =========================
        # API Response
        # =========================
        return {
            "id": db_analysis.id,

            "ats_score": ats_score,

            "matched_skills": matched_skills,

            "missing_skills": missing_skills,

            "structure_present": present_sections,

            "structure_missing": missing_sections,

            "extracted_skills": skills,

            "improved_resume": improved_resume,

            "recommended_roles": roles,

            "projects": projects,

            "courses": courses,

            "job_links": job_links
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )