import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from data.career_benchmarks import CAREER_ROLES, SKILL_SYNONYMS
from services.resume_parser import parser
from services.database import save_profile, get_profile, init_db

def test_taxonomies():
    print("--- Testing Career Benchmarks ---")
    print(f"Loaded {len(CAREER_ROLES)} career roles:")
    for r_id, r_info in CAREER_ROLES.items():
        print(f"  * {r_info['title']} ({r_info['category']}) - {len(r_info['core_skills'])} core skills")
    assert len(CAREER_ROLES) >= 5, "Expected at least 5 career roles"
    print("Taxonomies OK!")

def test_resume_parser():
    print("\n--- Testing Resume Parser ---")
    sample_resume_text = """
    Rachana Bonigala
    rachana@example.com | +91 9876543210
    github.com/rachana-b | linkedin.com/in/rachanab

    EDUCATION
    BTech in Artificial Intelligence, 3rd Year (2024 - 2028)
    Sardar Vallabhbhai National Institute of Technology (SVNIT Surat) - CGPA: 8.8/10

    TECHNICAL SKILLS
    Languages: Python, JavaScript, C++, SQL
    AI & ML: PyTorch, Scikit-Learn, Deep Learning, Natural Language Processing, Pandas, NumPy
    Web & Cloud: FastAPI, React, Docker, Git, Linux

    PROJECTS
    - PathFinder AI: Intelligent Student Success Ecosystem using FastAPI, React, PyTorch, and NLP
    - Computer Vision Real-Time Object Classifier with PyTorch and OpenCV
    """

    parsed = parser.parse(sample_resume_text)
    print(f"Candidate Name: {parsed['contact']['name']}")
    print(f"Email: {parsed['contact']['email']}")
    print(f"Phone: {parsed['contact']['phone']}")
    print(f"LinkedIn: {parsed['contact']['linkedin']}")
    print(f"GitHub: {parsed['contact']['github']}")
    print(f"Extracted Skills ({parsed['skills_count']}): {parsed['extracted_skills']}")
    print(f"Profile Strength Score: {parsed['profile_strength_score']}/100")
    print(f"Education: {parsed['education']}")
    print(f"Projects: {parsed['projects']}")

    assert "Python" in parsed["extracted_skills"], "Python should be extracted"
    assert "PyTorch" in parsed["extracted_skills"], "PyTorch should be extracted"
    assert "FastAPI" in parsed["extracted_skills"], "FastAPI should be extracted"
    assert "React.js" in parsed["extracted_skills"], "React.js should be extracted"
    assert parsed["profile_strength_score"] >= 80, "Profile score should be high for this profile"
    print("Resume Parser OK!")

def test_database():
    print("\n--- Testing Database Storage ---")
    init_db()
    test_id = "student_test_101"
    save_profile(test_id, "Rachana Bonigala", "rachana@example.com", "ai_ml_engineer", ["Python", "PyTorch", "FastAPI"], 90)
    profile = get_profile(test_id)
    print(f"Retrieved Saved Profile: {profile}")
    assert profile is not None
    assert profile["name"] == "Rachana Bonigala"
    print("Database OK!")

if __name__ == "__main__":
    test_taxonomies()
    test_resume_parser()
    test_database()
    print("\nALL CORE ENGINE TESTS PASSED SUCCESSFULLY!")
