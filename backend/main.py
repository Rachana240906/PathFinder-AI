from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uuid

from data.career_benchmarks import CAREER_ROLES
from services.resume_parser import parser
from services.gap_analyzer import gap_analyzer
from services.explainability import explainability_engine
from services.roadmap_generator import roadmap_generator
from services.opportunities import CURATED_MENTORS, CURATED_OPPORTUNITIES
from services.database import (
    save_profile, get_profile, create_user, authenticate_user, 
    get_user_by_email, update_user_profile
)

app = FastAPI(
    title="PathFinder AI Backend",
    description="Intelligent Student Success Ecosystem API",
    version="2.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Seed demo users on startup if not present
def seed_demo_accounts():
    demos = [
        {
            "name": "Rachana Bonigala",
            "email": "rachana@example.com",
            "password": "password123",
            "target_role": "ai_ml_engineer",
            "skills": ["Python", "PyTorch", "Scikit-Learn", "Deep Learning", "Natural Language Processing", "FastAPI", "React.js", "SQL", "Pandas", "NumPy", "Git & GitHub", "Docker"]
        },
        {
            "name": "Aditya Verma",
            "email": "aditya.v@example.com",
            "password": "password123",
            "target_role": "full_stack_developer",
            "skills": ["JavaScript", "TypeScript", "React.js", "Node.js", "HTML5", "CSS3", "Tailwind CSS", "MongoDB", "Git & GitHub"]
        },
        {
            "name": "Priya Sharma",
            "email": "priya.pm@example.com",
            "password": "password123",
            "target_role": "product_manager",
            "skills": ["Product Management", "PRD & Spec Writing", "Product Roadmapping", "Agile & Scrum", "User Research", "Jira & Confluence", "A/B Testing & Experimentation", "Figma", "Advanced Excel / Spreadsheets"]
        },
        {
            "name": "Sneha Kulkarni",
            "email": "sneha.ba@example.com",
            "password": "password123",
            "target_role": "business_analyst",
            "skills": ["Business Analysis", "Advanced Excel / Spreadsheets", "SQL", "Power BI", "Process Mapping (BPMN)", "Tableau", "Market Research", "Competitive Analysis"]
        },
        {
            "name": "Karan Patel",
            "email": "karan.sec@example.com",
            "password": "password123",
            "target_role": "cybersecurity_analyst",
            "skills": ["Linux / Bash", "Network Security", "Wireshark", "Python", "Cryptography", "Git & GitHub", "OWASP Top 10 Security"]
        }
    ]
    for d in demos:
        if not get_user_by_email(d["email"]):
            try:
                create_user(d["name"], d["email"], d["password"], d["target_role"], d["skills"])
            except Exception:
                pass

seed_demo_accounts()

# Request Models
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    target_role: Optional[str] = "ai_ml_engineer"
    skills: Optional[List[str]] = []

class LoginRequest(BaseModel):
    email: str
    password: str

class UpdateRoleRequest(BaseModel):
    email: str
    target_role: str

class BestFitRequest(BaseModel):
    skills: List[str]

class SkillGapRequest(BaseModel):
    skills: List[str]
    target_role_id: str
    profile_id: Optional[str] = None
    candidate_name: Optional[str] = None
    candidate_email: Optional[str] = None

class DirectTextParseRequest(BaseModel):
    text: str

@app.get("/")
def root():
    return {
        "name": "PathFinder AI",
        "status": "online",
        "version": "2.1.0",
        "description": "Helping students discover the smartest path from skills to success across 24+ Tech and Non-Tech roles."
    }

@app.get("/api/health")
def health():
    return {"status": "healthy", "service": "PathFinder AI"}

# Authentication Endpoints
@app.post("/api/auth/register")
def register(req: RegisterRequest):
    if not req.email or not req.password or not req.name:
        raise HTTPException(status_code=400, detail="Name, email, and password are required.")
    if len(req.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters.")
    
    try:
        user = create_user(
            name=req.name,
            email=req.email,
            password=req.password,
            target_role=req.target_role or "ai_ml_engineer",
            skills=req.skills or []
        )
        return {"status": "success", "user": user, "message": "Account created successfully."}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Registration error: {str(e)}")

@app.post("/api/auth/login")
def login(req: LoginRequest):
    if not req.email or not req.password:
        raise HTTPException(status_code=400, detail="Email and password are required.")
    
    user = authenticate_user(req.email, req.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    
    return {"status": "success", "user": user, "message": "Login successful."}

@app.get("/api/auth/user/{email}")
def get_user(email: str):
    user = get_user_by_email(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    return {"user": user}

@app.post("/api/auth/update-role")
def update_role(req: UpdateRoleRequest):
    success = update_user_profile(req.email, target_role=req.target_role)
    if not success:
        raise HTTPException(status_code=404, detail="Failed to update user target role.")
    return {"status": "success", "target_role": req.target_role}

# Role and Career Intelligence
@app.get("/api/roles")
def get_roles():
    roles_list = []
    for r_id, r in CAREER_ROLES.items():
        roles_list.append({
            "id": r["id"],
            "title": r["title"],
            "category": r["category"],
            "domain": r.get("domain", "technical"),
            "domain_label": r.get("domain_label", "Technical"),
            "icon": r.get("icon", "Code2"),
            "demand": r.get("demand", "High"),
            "growth_rate": r.get("growth_rate", "+25%"),
            "avg_salary": r.get("avg_salary", ""),
            "summary": r.get("summary", ""),
            "core_skills_count": len(r["core_skills"]),
            "advanced_skills_count": len(r["advanced_skills"])
        })
    return {"roles": roles_list}

@app.get("/api/roles/{role_id}")
def get_role_detail(role_id: str):
    if role_id not in CAREER_ROLES:
        raise HTTPException(status_code=404, detail="Role not found")
    return {"role": CAREER_ROLES[role_id]}

@app.post("/api/analyze-best-fit")
def analyze_best_fit(req: BestFitRequest):
    suitability = gap_analyzer.analyze_all_roles(req.skills)
    return suitability

@app.post("/api/resume/upload")
async def upload_resume(file: UploadFile = File(...)):
    try:
        content = await file.read()
        parsed_result = parser.parse(content, is_bytes=True, filename=file.filename)
        # Compute best fit immediately
        suitability = gap_analyzer.analyze_all_roles(parsed_result.get("extracted_skills", []))
        return {
            "status": "success", 
            "data": parsed_result,
            "suitability": suitability
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse resume: {str(e)}")

@app.post("/api/resume/parse-text")
def parse_resume_text(req: DirectTextParseRequest):
    try:
        parsed_result = parser.parse(req.text, is_bytes=False)
        suitability = gap_analyzer.analyze_all_roles(parsed_result.get("extracted_skills", []))
        return {
            "status": "success", 
            "data": parsed_result,
            "suitability": suitability
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse text: {str(e)}")

@app.post("/api/analyze-gap")
def analyze_skill_gap(req: SkillGapRequest):
    gap_result = gap_analyzer.analyze(req.skills, req.target_role_id)
    recommendations = explainability_engine.explain_recommendations(gap_result)
    roadmap = roadmap_generator.generate(gap_result, req.skills)
    suitability = gap_analyzer.analyze_all_roles(req.skills)

    # Save to SQLite
    profile_id = req.profile_id or str(uuid.uuid4())[:8]
    if req.candidate_name:
        save_profile(
            profile_id=profile_id,
            name=req.candidate_name,
            email=req.candidate_email or "",
            target_role=req.target_role_id,
            skills=req.skills,
            score=gap_result["match_score"]
        )

    return {
        "profile_id": profile_id,
        "gap_analysis": gap_result,
        "explainable_recommendations": recommendations,
        "personalized_roadmap": roadmap,
        "suitability": suitability
    }

@app.get("/api/opportunities")
def get_opportunities():
    return {
        "mentors": CURATED_MENTORS,
        "opportunities": CURATED_OPPORTUNITIES
    }

@app.get("/api/profile/{profile_id}")
def fetch_profile(profile_id: str):
    profile = get_profile(profile_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"profile": profile}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

