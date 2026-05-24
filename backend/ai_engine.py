import os
import re
import json
from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

# Initialize LLM
def get_llm():
    return ChatGroq(
        groq_api_key=os.getenv("GROQ_API_KEY"),
        temperature=0,
        model_name="llama-3.1-8b-instant"
    )

def extract_skills(text: str) -> str:
    llm = get_llm()
    prompt = PromptTemplate.from_template("""
    Extract ONLY technical skills from the text.

    Rules:
    - Ignore soft skills
    - Return only comma-separated skills

    Text:
    {text}
    """)
    chain = prompt | llm
    result = chain.invoke({"text": text})
    return result.content.strip()

def generate_job_requirements(role: str) -> str:
    llm = get_llm()
    prompt = PromptTemplate.from_template("""
    You are an expert recruiter.

    For the role: {role}

    Provide:
    - Required technical skills
    - Tools & technologies
    - Key responsibilities
    """)
    chain = prompt | llm
    result = chain.invoke({"role": role})
    return result.content

def calculate_ats_score(skills: str, requirements: str):

    llm = get_llm()

    prompt = PromptTemplate.from_template("""
    Candidate Skills:
    {skills}

    Job Requirements:
    {requirements}

    Extract:
    - Required technical skills
    - Matched skills
    - Missing skills

    STRICT RULES:
    - Output ONLY valid JSON
    - No explanation
    - No text before/after JSON

    Format:
    {{
        "matched": ["skill1", "skill2"],
        "missing": ["skill3", "skill4"],
        "total_required": number
    }}
    """)

    chain = prompt | llm

    result = chain.invoke({
        "skills": skills,
        "requirements": requirements
    })

    try:
        json_text = re.search(
            r"\{.*\}",
            result.content,
            re.DOTALL
        ).group()

        data = json.loads(json_text)

    except Exception as e:

        print(f"Error parsing ATS score JSON: {e}")

        return 0, [], []

    matched = data.get("matched", [])

    missing = data.get("missing", [])

    total = data.get(
        "total_required",
        len(matched) + len(missing)
    )

    if total == 0:
        return 0, matched, missing

    score = int(
        (len(matched) / total) * 100
    )

    return score, matched, missing

def suggest_roles(skills: str):
    llm = get_llm()
    prompt = PromptTemplate.from_template("""
    Based on these skills:
    {skills}

    Suggest 5 relevant job roles and calculate a match percentage (0-100) for each based on how well the skills align with the role.
    
    STRICT RULES:
    - Output ONLY valid JSON
    - No explanation
    - No text before/after JSON

    Format:
    [
        {{"role": "Role Name", "match_percentage": 85}},
        {{"role": "Another Role", "match_percentage": 70}}
    ]
    """)
    chain = prompt | llm
    result = chain.invoke({"skills": skills})
    
    try:
        json_text = re.search(r"\[.*\]", result.content, re.DOTALL).group()
        data = json.loads(json_text)
        data.sort(key=lambda x: x.get("match_percentage", 0), reverse=True)
        return data
    except Exception as e:
        print(f"Error parsing suggest_roles JSON: {e}")
        return []

def get_course_links(missing_skills: str):
    llm = get_llm()
    prompt = PromptTemplate.from_template("""
    Missing Skills:
    {skills}

    For the missing skills, suggest up to 15 best courses.
    Provide direct links to the courses.
    
    STRICT RULES:
    - Output ONLY valid JSON
    - No explanation
    - No text before/after JSON
    - Max 15 courses

    Format:
    [
        {{"skill": "Docker", "course_name": "Docker for Beginners", "platform": "Udemy", "link": "https://www.udemy.com/..."}},
        {{"skill": "React", "course_name": "Advanced React", "platform": "Coursera", "link": "https://www.coursera.org/..."}}
    ]
    """)
    chain = prompt | llm
    result = chain.invoke({"skills": missing_skills})
    
    try:
        json_text = re.search(r"\[.*\]", result.content, re.DOTALL).group()
        data = json.loads(json_text)
        return data[:15]
    except Exception as e:
        print(f"Error parsing get_course_links JSON: {e}")
        return []

def generate_job_links(roles: str) -> str:
    role_list = roles.split(",")
    links = []
    for role in role_list:
        role_clean = role.strip().replace(" ", "%20")
        link = f"https://www.linkedin.com/jobs/search/?keywords={role_clean}"
        links.append(f"{role.strip()} - {link}")
    return "\n".join(links)

def generate_improved_resume(original_text: str, role: str, missing_skills: str):
    llm = get_llm()
    prompt = PromptTemplate.from_template("""
    You are an expert resume writer.

    Candidate Resume:
    {resume}

    Target Role:
    {role}

    Missing Skills:
    {skills}

    Task:
    - Improve the resume to match the target role
    - Add relevant skills naturally (do NOT fake experience)
    - Make it ATS-friendly
    
    STRICT RULES:
    - Output ONLY valid JSON
    - No explanation
    - No text before/after JSON

    Format exactly like this JSON structure:
    {{
      "summary": "Professional summary...",
      "skills": ["Skill 1", "Skill 2"],
      "experience": [
        {{
          "role_and_company": "Software Engineer Intern, Google (June 2023 - Aug 2023)",
          "bullet_points": ["Developed X...", "Improved Y by 20%..."]
        }}
      ],
      "projects": [
        {{
          "title": "AI Dashboard",
          "bullet_points": ["Built using React and Python...", "Achieved 95% accuracy..."]
        }}
      ],
      "education": "B.S. in Computer Science..."
    }}

    Keep it realistic and professional based on the original resume.
    """)
    chain = prompt | llm
    result = chain.invoke({
        "resume": original_text,
        "role": role,
        "skills": missing_skills
    })
    try:
        json_text = re.search(r"\{.*\}", result.content, re.DOTALL).group()
        return json.loads(json_text)
    except Exception as e:
        print(f"Error parsing generate_improved_resume JSON: {e}")
        return None

def suggest_projects(skills: str, role: str, missing_skills: str):
    llm = get_llm()
    prompt = PromptTemplate.from_template("""
    Candidate Skills:
    {skills}

    Target Role:
    {role}

    Missing Skills:
    {missing}

    Suggest 3-5 real-world projects to help the candidate improve.

    STRICT RULES:
    - Output ONLY valid JSON
    - No explanation
    - No text before/after JSON

    Format:
    [
        {{
            "title": "E-commerce Dashboard",
            "description": "Build a responsive dashboard to visualize sales data.",
            "tech_stack": ["React", "Node.js", "PostgreSQL"]
        }}
    ]
    """)
    chain = prompt | llm
    result = chain.invoke({
        "skills": skills,
        "role": role,
        "missing": missing_skills
    })
    try:
        json_text = re.search(r"\[.*\]", result.content, re.DOTALL).group()
        return json.loads(json_text)
    except Exception as e:
        print(f"Error parsing suggest_projects JSON: {e}")
        return []
