import os
import sys

backend_dir = os.path.dirname(__file__)
sys.path.insert(0, backend_dir)

from fastapi.testclient import TestClient
from main import app
from services.resume_parser import parser

def run_e2e_tests():
    print("==================================================")
    print("PATHFINDER AI -- END-TO-END INTEGRATION TEST")
    print("==================================================")
    client = TestClient(app)

    # 1. Test Health Check
    health = client.get("/api/health")
    assert health.status_code == 200
    print(" Health check endpoint: OK (200)")

    # 2. Test Roles Catalog
    roles_res = client.get("/api/roles")
    assert roles_res.status_code == 200
    roles = roles_res.json()["roles"]
    print(f" Roles catalog loaded: {len(roles)} roles available")
    for r in roles:
        print(f"   * {r['title']} [{r['demand']} Demand, {r['growth_rate']}]")

    # 3. Test Resume Parsing from sample file
    sample_path = os.path.join(os.path.dirname(backend_dir), "samples", "sample_resume_rachana.txt")
    with open(sample_path, "r", encoding="utf-8") as f:
        sample_text = f.read()

    parse_res = client.post("/api/resume/parse-text", json={"text": sample_text})
    assert parse_res.status_code == 200
    parsed_data = parse_res.json()["data"]
    print(f"\n Resume Intelligence parsed successfully:")
    print(f"   * Candidate: {parsed_data['contact']['name']} ({parsed_data['contact']['email']})")
    print(f"   * Profile Strength: {parsed_data['profile_strength_score']}/100")
    print(f"   * Skills Found ({parsed_data['skills_count']}): {parsed_data['extracted_skills']}")

    # 4. Test Skill Gap Analysis against AI/ML Role
    gap_req = {
        "skills": parsed_data["extracted_skills"],
        "target_role_id": "ai_ml_engineer",
        "candidate_name": parsed_data["contact"]["name"],
        "candidate_email": parsed_data["contact"]["email"]
    }
    gap_res = client.post("/api/analyze-gap", json=gap_req)
    assert gap_res.status_code == 200
    gap_data = gap_res.json()
    
    print(f"\n Skill Gap Analysis for 'AI / Machine Learning Engineer':")
    print(f"   * Match Score: {gap_data['gap_analysis']['match_score']}%")
    print(f"   * Readiness Tier: {gap_data['gap_analysis']['readiness_tier']}")
    print(f"   * Core Readiness: {gap_data['gap_analysis']['category_scores']['core']}%")
    print(f"   * Advanced Readiness: {gap_data['gap_analysis']['category_scores']['advanced']}%")
    print(f"   * Missing High-Priority Core: {[s['name'] for s in gap_data['gap_analysis']['missing_core_skills']]}")

    # 5. Test Explainable Recommendations
    recs = gap_data["explainable_recommendations"]
    print(f"\n Explainable AI Recommendations ({len(recs)} generated):")
    for rec in recs[:2]:
        print(f"   * {rec['skill_name']} [{rec['priority']}]: {rec['why_it_matters']}")
        print(f"     Market stat: {rec['market_demand_stat']} | Effort: {rec['estimated_effort']}")

    # 6. Test Personalized Roadmap
    roadmap = gap_data["personalized_roadmap"]
    print(f"\n Personalized 12-Week Roadmap ({len(roadmap['phases'])} phases):")
    for phase in roadmap["phases"]:
        print(f"   Phase {phase['phase_id']}: {phase['title']} ({phase['duration']})")
        print(f"     Goal: {phase['milestone_goal']}")
        print(f"     Milestone Project: {phase['project_milestone']}")

    # 7. Test Opportunities & Mentors
    opps_res = client.get("/api/opportunities")
    assert opps_res.status_code == 200
    opps_data = opps_res.json()
    print(f"\n Opportunities & Mentors:")
    print(f"   * {len(opps_data['mentors'])} Matched Industry Mentors")
    print(f"   * {len(opps_data['opportunities'])} Curated Hackathons & Internships")

    print("\n==================================================")
    print(" ALL END-TO-END INTEGRATION TESTS PASSED 100%!")
    print("==================================================")

if __name__ == "__main__":
    run_e2e_tests()
