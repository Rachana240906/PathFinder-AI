from typing import Dict, List, Any

EXPLAINABILITY_KNOWLEDGE_BASE = {
    "PyTorch": {
        "why_it_matters": "PyTorch is the gold-standard research and production framework for modern Deep Learning, Transformers, and LLM development.",
        "market_demand_stat": "Present in 86% of Senior AI/ML job descriptions in 2025-2026.",
        "effort": "2 - 3 Weeks",
        "actionable_tip": "Build a custom neural network from scratch, then fine-tune a pre-trained vision/NLP model."
    },
    "Large Language Models (LLMs)": {
        "why_it_matters": "Generative AI and foundational models are currently the fastest-growing hiring area across all tech sectors.",
        "market_demand_stat": "Demand surged by +140% YoY in enterprise AI solutions.",
        "effort": "2 Weeks",
        "actionable_tip": "Master prompt engineering, structured JSON outputs, function calling, and token optimization."
    },
    "Retrieval-Augmented Generation (RAG)": {
        "why_it_matters": "RAG enables private corporate data to be seamlessly connected to LLMs without expensive pre-training.",
        "market_demand_stat": "Crucial requirement for 78% of modern GenAI Developer roles.",
        "effort": "1 - 2 Weeks",
        "actionable_tip": "Implement semantic chunking, vector indexing with ChromaDB, and hybrid keyword-vector retrieval."
    },
    "Docker": {
        "why_it_matters": "Guarantees reproducibility, eliminates 'works on my machine' issues, and is essential for cloud containerization.",
        "market_demand_stat": "Standard requirement across 92% of software engineering and DevOps positions.",
        "effort": "1 Week",
        "actionable_tip": "Write multi-stage Dockerfiles and containerize your frontend + backend services using docker-compose."
    },
    "FastAPI": {
        "why_it_matters": "Asynchronous, high-performance Python framework ideally suited for low-latency ML model serving and REST APIs.",
        "market_demand_stat": "Fastest growing Python backend framework, preferred by AI labs.",
        "effort": "1 - 2 Weeks",
        "actionable_tip": "Create async endpoints with Pydantic validation, dependency injection, and automatic Swagger docs."
    },
    "Kubernetes": {
        "why_it_matters": "Industry standard for orchestrating containerized microservices at global scale with automated self-healing.",
        "market_demand_stat": "Required in 84% of Cloud & Infrastructure engineering listings.",
        "effort": "3 Weeks",
        "actionable_tip": "Set up a local Minikube cluster and deploy multi-pod applications with ConfigMaps and Ingress."
    },
    "TypeScript": {
        "why_it_matters": "Prevents runtime bugs through static typing, improving code maintainability and team velocity on large codebases.",
        "market_demand_stat": "Used by 78% of modern frontend and full-stack enterprise projects.",
        "effort": "1 - 2 Weeks",
        "actionable_tip": "Convert a standard JavaScript React project to strict TypeScript with interfaces and generic types."
    },
    "Next.js": {
        "why_it_matters": "Leading React framework providing built-in server-side rendering, SEO optimization, and edge computing capabilities.",
        "market_demand_stat": "Dominates high-performance web engineering and startup tech stacks.",
        "effort": "2 Weeks",
        "actionable_tip": "Build an app using App Router, Server Components, and dynamic Server Actions."
    },
    "PostgreSQL": {
        "why_it_matters": "Most robust, enterprise-grade relational database with support for complex indexing, ACID compliance, and pgvector.",
        "market_demand_stat": "Top chosen database engine in developer surveys worldwide.",
        "effort": "1 - 2 Weeks",
        "actionable_tip": "Master relational schema design, indexing strategies (B-tree, GIN), and query optimization with EXPLAIN."
    },
    "OWASP Top 10 Security": {
        "why_it_matters": "Defines the most critical security risks to web applications; essential for building secure, resilient software.",
        "market_demand_stat": "Mandatory compliance knowledge for AppSec and Security Engineers.",
        "effort": "2 Weeks",
        "actionable_tip": "Practice identifying and remediating SQL injection, XSS, and broken access controls on vulnerable lab apps."
    }
}

class ExplainabilityEngine:
    def explain_recommendations(self, gap_result: Dict[str, Any]) -> List[Dict[str, Any]]:
        missing_skills = gap_result.get("missing_core_skills", []) + gap_result.get("missing_advanced_skills", []) + gap_result.get("missing_tools", [])
        recommendations = []

        for skill in missing_skills[:6]:
            name = skill["name"]
            info = EXPLAINABILITY_KNOWLEDGE_BASE.get(name, {
                "why_it_matters": f"{name} is a key capability required to execute professional responsibilities in {gap_result.get('role_title', 'this role')}.",
                "market_demand_stat": "Required in high-demand job postings for this specialization.",
                "effort": "1 - 2 Weeks",
                "actionable_tip": f"Study official documentation and implement an end-to-end practical project incorporating {name}."
            })

            priority = "High Impact (Core)" if skill in gap_result.get("missing_core_skills", []) else "Competitive Advantage"

            recommendations.append({
                "skill_name": name,
                "priority": priority,
                "weight": skill.get("weight", 0.8),
                "description": skill.get("description", ""),
                "why_it_matters": info["why_it_matters"],
                "market_demand_stat": info["market_demand_stat"],
                "estimated_effort": info["effort"],
                "actionable_tip": info["actionable_tip"]
            })

        return recommendations

explainability_engine = ExplainabilityEngine()
