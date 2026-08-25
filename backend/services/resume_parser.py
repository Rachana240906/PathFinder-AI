import re
import os
import io
from typing import Dict, List, Any, Optional
import pdfplumber
from pypdf import PdfReader
from data.career_benchmarks import SKILL_SYNONYMS

class ResumeParser:
    def __init__(self):
        self.skill_synonyms = SKILL_SYNONYMS
        
    def extract_text_from_pdf_bytes(self, file_bytes: bytes) -> str:
        text = ""
        try:
            # Try pdfplumber first
            with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        except Exception as e:
            # Fallback to pypdf
            try:
                reader = PdfReader(io.BytesIO(file_bytes))
                for page in reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
            except Exception as fallback_e:
                print(f"PDF extraction error: {e}, fallback error: {fallback_e}")
        return text

    def extract_text_from_file_path(self, file_path: str) -> str:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
        
        ext = os.path.splitext(file_path)[1].lower()
        if ext == ".pdf":
            with open(file_path, "rb") as f:
                return self.extract_text_from_pdf_bytes(f.read())
        else:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()

    def extract_contact_info(self, text: str) -> Dict[str, Optional[str]]:
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        
        # Name heuristic
        name = None
        for line in lines[:6]:
            clean_line = re.sub(r'[^a-zA-Z\s]', '', line).strip()
            if 2 <= len(clean_line.split()) <= 4 and "resume" not in clean_line.lower() and "curriculum" not in clean_line.lower():
                name = clean_line
                break
        if not name and lines:
            name = lines[0][:40]

        # Email regex
        email_match = re.search(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', text)
        email = email_match.group(0) if email_match else None

        # Phone regex
        phone_match = re.search(r'(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+91[-.\s]?\d{10}|\b\d{10}\b', text)
        phone = phone_match.group(0) if phone_match else None

        # LinkedIn & GitHub
        linkedin_match = re.search(r'linkedin\.com/in/([a-zA-Z0-9_-]+)', text, re.IGNORECASE)
        linkedin = f"https://linkedin.com/in/{linkedin_match.group(1)}" if linkedin_match else None

        github_match = re.search(r'github\.com/([a-zA-Z0-9_-]+)', text, re.IGNORECASE)
        github = f"https://github.com/{github_match.group(1)}" if github_match else None

        return {
            "name": name or "Candidate",
            "email": email or "Not provided",
            "phone": phone or "Not provided",
            "linkedin": linkedin,
            "github": github
        }

    def extract_skills(self, text: str) -> List[str]:
        text_lower = text.lower()
        extracted_skills = set()

        sorted_keys = sorted(self.skill_synonyms.keys(), key=lambda k: len(k), reverse=True)

        for raw_key in sorted_keys:
            pattern = r'(?<![a-zA-Z0-9])' + re.escape(raw_key) + r'(?![a-zA-Z0-9])'
            if re.search(pattern, text_lower):
                canonical_name = self.skill_synonyms[raw_key]
                extracted_skills.add(canonical_name)

        return sorted(list(extracted_skills))

    def extract_education(self, text: str) -> List[Dict[str, str]]:
        education = []
        edu_keywords = ["b.tech", "btech", "b.e.", "b.s.", "m.tech", "mtech", "m.s.", "bachelor", "master", "ph.d", "diploma", "svnit", "nit", "iit", "university", "institute", "college"]
        
        lines = text.split("\n")
        for line in lines:
            line_lower = line.lower()
            if any(k in line_lower for k in edu_keywords):
                gpa_match = re.search(r'(?:cgpa|gpa|percentage|score)[\s:]*([0-9.]+(?:%|/\d+)?)', line, re.IGNORECASE)
                gpa = gpa_match.group(1) if gpa_match else ""
                
                year_match = re.search(r'\b(20\d{2}|19\d{2})\b', line)
                year = year_match.group(0) if year_match else ""

                clean_text = line.strip()
                if clean_text and len(clean_text) > 4:
                    education.append({
                        "degree_or_institution": clean_text,
                        "gpa": gpa,
                        "year": year
                    })

        unique_edu = []
        seen = set()
        for item in education:
            if item["degree_or_institution"] not in seen:
                seen.add(item["degree_or_institution"])
                unique_edu.append(item)
        return unique_edu[:3]

    def extract_projects_and_experience(self, text: str) -> Dict[str, List[str]]:
        projects = []
        experience = []
        
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        current_section = None
        
        for line in lines:
            line_lower = line.lower()
            if "project" in line_lower and len(line) < 30:
                current_section = "projects"
                continue
            elif ("experience" in line_lower or "internship" in line_lower or "work history" in line_lower) and len(line) < 35:
                current_section = "experience"
                continue
            elif ("education" in line_lower or "skills" in line_lower or "certifications" in line_lower) and len(line) < 30:
                current_section = None
                continue

            if current_section == "projects" and (line.startswith("-") or line.startswith("•") or line.startswith("*") or len(line) > 20):
                clean_p = line.lstrip("-•* ")
                if len(clean_p) > 10 and clean_p not in projects:
                    projects.append(clean_p)
            elif current_section == "experience" and (line.startswith("-") or line.startswith("•") or line.startswith("*") or len(line) > 20):
                clean_e = line.lstrip("-•* ")
                if len(clean_e) > 10 and clean_e not in experience:
                    experience.append(clean_e)

        return {
            "projects": projects[:5],
            "experience": experience[:5]
        }

    def compute_profile_strength(self, contact: Dict, skills: List[str], education: List, projects: List, experience: List) -> int:
        score = 0
        if contact.get("name") and contact["name"] != "Candidate":
            score += 10
        if contact.get("email") and "@" in contact["email"]:
            score += 10
        if contact.get("github") or contact.get("linkedin"):
            score += 10
        
        skill_count = len(skills)
        if skill_count >= 10:
            score += 35
        elif skill_count >= 6:
            score += 25
        elif skill_count >= 3:
            score += 15
        elif skill_count >= 1:
            score += 10

        if len(projects) >= 2:
            score += 20
        elif len(projects) == 1:
            score += 10

        if len(education) >= 1:
            score += 15

        return min(100, score)

    def parse(self, text_or_bytes, is_bytes: bool = False, filename: str = "") -> Dict[str, Any]:
        if is_bytes:
            text = self.extract_text_from_pdf_bytes(text_or_bytes)
        else:
            text = str(text_or_bytes)

        contact = self.extract_contact_info(text)
        skills = self.extract_skills(text)
        education = self.extract_education(text)
        sections = self.extract_projects_and_experience(text)
        strength = self.compute_profile_strength(
            contact, skills, education, sections["projects"], sections["experience"]
        )

        return {
            "contact": contact,
            "extracted_skills": skills,
            "skills_count": len(skills),
            "education": education,
            "projects": sections["projects"],
            "experience": sections["experience"],
            "profile_strength_score": strength,
            "raw_text_snippet": text[:500] if text else ""
        }

parser = ResumeParser()
