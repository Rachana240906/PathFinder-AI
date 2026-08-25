"""
Career Benchmarks and Skill Taxonomies for PathFinder AI
Comprehensive Multi-Domain Catalog (Technical & Non-Technical)
"""

SKILL_SYNONYMS = {
    # ── Programming & Software Languages ──
    "py": "Python",
    "python": "Python",
    "python3": "Python",
    "js": "JavaScript",
    "javascript": "JavaScript",
    "ts": "TypeScript",
    "typescript": "TypeScript",
    "cpp": "C++",
    "c++": "C++",
    "c#": "C#",
    "csharp": "C#",
    "java": "Java",
    "golang": "Go",
    "go": "Go",
    "rust": "Rust",
    "r": "R",
    "sql": "SQL",
    "html": "HTML5",
    "html5": "HTML5",
    "css": "CSS3",
    "css3": "CSS3",
    "solidity": "Solidity",
    "swift": "Swift",
    "kotlin": "Kotlin",
    "dart": "Dart",

    # ── Frameworks & Web Development ──
    "react": "React.js",
    "react.js": "React.js",
    "reactjs": "React.js",
    "next": "Next.js",
    "next.js": "Next.js",
    "nextjs": "Next.js",
    "node": "Node.js",
    "node.js": "Node.js",
    "nodejs": "Node.js",
    "express": "Express.js",
    "express.js": "Express.js",
    "fastapi": "FastAPI",
    "django": "Django",
    "flask": "Flask",
    "spring boot": "Spring Boot",
    "springboot": "Spring Boot",
    "tailwind": "Tailwind CSS",
    "tailwind css": "Tailwind CSS",
    "tailwindcss": "Tailwind CSS",
    "vue": "Vue.js",
    "vue.js": "Vue.js",
    "angular": "Angular",
    "flutter": "Flutter",
    "react native": "React Native",

    # ── AI / ML / Data Science ──
    "machine learning": "Machine Learning",
    "ml": "Machine Learning",
    "deep learning": "Deep Learning",
    "dl": "Deep Learning",
    "nlp": "Natural Language Processing",
    "natural language processing": "Natural Language Processing",
    "computer vision": "Computer Vision",
    "cv": "Computer Vision",
    "tensorflow": "TensorFlow",
    "tf": "TensorFlow",
    "pytorch": "PyTorch",
    "keras": "Keras",
    "scikit-learn": "Scikit-Learn",
    "sklearn": "Scikit-Learn",
    "pandas": "Pandas",
    "numpy": "NumPy",
    "matplotlib": "Matplotlib",
    "seaborn": "Seaborn",
    "huggingface": "Hugging Face Transformers",
    "transformers": "Hugging Face Transformers",
    "langchain": "LangChain",
    "rag": "Retrieval-Augmented Generation (RAG)",
    "llm": "Large Language Models (LLMs)",
    "llms": "Large Language Models (LLMs)",
    "fine-tuning": "LLM Fine-Tuning",
    "spacy": "spaCy",
    "opencv": "OpenCV",
    "vector db": "Vector Databases (Chroma/Pinecone)",
    "chromadb": "ChromaDB",
    "pinecone": "Pinecone",
    "spark": "Apache Spark",
    "apache spark": "Apache Spark",
    "airflow": "Apache Airflow",
    "apache airflow": "Apache Airflow",
    "kafka": "Apache Kafka",
    "dbt": "dbt (Data Build Tool)",
    "mlflow": "MLflow",

    # ── Cloud, DevOps & Infrastructure ──
    "docker": "Docker",
    "kubernetes": "Kubernetes",
    "k8s": "Kubernetes",
    "aws": "AWS",
    "azure": "Microsoft Azure",
    "gcp": "Google Cloud Platform (GCP)",
    "ci/cd": "CI/CD Pipelines",
    "cicd": "CI/CD Pipelines",
    "git": "Git & GitHub",
    "github": "Git & GitHub",
    "linux": "Linux / Bash",
    "bash": "Linux / Bash",
    "terraform": "Terraform",
    "ansible": "Ansible",
    "prometheus": "Prometheus & Grafana",
    "grafana": "Prometheus & Grafana",
    "nginx": "Nginx",

    # ── Databases ──
    "postgresql": "PostgreSQL",
    "postgres": "PostgreSQL",
    "mysql": "MySQL",
    "mongodb": "MongoDB",
    "mongo": "MongoDB",
    "redis": "Redis",
    "sqlite": "SQLite",
    "snowflake": "Snowflake",
    "bigquery": "Google BigQuery",

    # ── Cybersecurity ──
    "penetration testing": "Penetration Testing",
    "pen testing": "Penetration Testing",
    "ethical hacking": "Ethical Hacking",
    "wireshark": "Wireshark",
    "network security": "Network Security",
    "cryptography": "Cryptography",
    "soc": "SOC & SIEM Operations",
    "owasp": "OWASP Top 10 Security",
    "burpsuite": "Burp Suite",

    # ── UI/UX & Product Design (Non-Tech / Creative) ──
    "figma": "Figma",
    "ui design": "UI Design",
    "ux design": "UX Design",
    "ui/ux": "UI/UX Design",
    "user research": "User Research",
    "wireframing": "Wireframing & Prototyping",
    "prototyping": "Wireframing & Prototyping",
    "design systems": "Design Systems",
    "usability testing": "Usability Testing",
    "information architecture": "Information Architecture",
    "adobe xd": "Adobe XD",

    # ── Product & Project Management (Non-Tech / Business) ──
    "product management": "Product Management",
    "prd": "PRD & Spec Writing",
    "product roadmap": "Product Roadmapping",
    "roadmapping": "Product Roadmapping",
    "agile": "Agile & Scrum",
    "scrum": "Agile & Scrum",
    "jira": "Jira & Confluence",
    "confluence": "Jira & Confluence",
    "user stories": "User Story Mapping",
    "a/b testing": "A/B Testing & Experimentation",
    "sprint planning": "Sprint Planning",
    "stakeholder management": "Stakeholder Management",
    "feature prioritization": "Feature Prioritization (RICE/MoSCoW)",

    # ── Business Analysis & Strategy ──
    "business analysis": "Business Analysis",
    "excel": "Advanced Excel / Spreadsheets",
    "spreadsheets": "Advanced Excel / Spreadsheets",
    "power bi": "Power BI",
    "powerbi": "Power BI",
    "tableau": "Tableau",
    "market research": "Market Research",
    "competitive analysis": "Competitive Analysis",
    "process mapping": "Process Mapping (BPMN)",
    "kpi tracking": "KPI Tracking & Dashboards",
    "data visualization": "Data Visualization",

    # ── Finance & Quantitative Modeling ──
    "financial modeling": "Financial Modeling",
    "dcf": "DCF Valuation",
    "valuation": "Valuation & Equity Analysis",
    "budgeting": "Budgeting & Forecasting",
    "accounting": "Accounting & Financial Statements",
    "risk management": "Risk Management",
    "portfolio management": "Portfolio Analysis",

    # ── Marketing & Growth ──
    "digital marketing": "Digital Marketing",
    "seo": "Search Engine Optimization (SEO)",
    "google analytics": "Google Analytics 4",
    "ga4": "Google Analytics 4",
    "content marketing": "Content Marketing",
    "copywriting": "Copywriting",
    "social media": "Social Media Strategy",
    "sem": "Google & Meta Ads (PPC)",
    "ppc": "Google & Meta Ads (PPC)",
    "email marketing": "Email Marketing & Automation",
    "hubspot": "HubSpot CRM",
    "conversion rate optimization": "Conversion Rate Optimization (CRO)",
    "cro": "Conversion Rate Optimization (CRO)",

    # ── Sales & Business Development ──
    "b2b sales": "B2B Sales & Outbound",
    "salesforce": "Salesforce CRM",
    "crm": "CRM Management",
    "lead generation": "Lead Generation & Prospecting",
    "cold outreach": "Cold Outreach & Email Campaigns",
    "negotiation": "Negotiation & Deal Closing",
    "client communication": "Client Relationship Management",

    # ── Human Resources & Talent ──
    "recruitment": "Technical Talent Sourcing",
    "talent acquisition": "Technical Talent Sourcing",
    "ats": "ATS Management",
    "interviewing": "Structured Behavioral Interviewing",
    "hr analytics": "HR Analytics",
    "linkedin recruiter": "LinkedIn Recruiter",
    "onboarding": "Employee Onboarding & Retention",

    # ── Technical Writing & Documentation ──
    "technical writing": "Technical Writing",
    "api documentation": "API Documentation (Swagger/Postman)",
    "markdown": "Markdown & GitBook",
    "release notes": "Release Notes & Knowledge Bases",
}

CAREER_ROLES = {
    # =========================================================================
    # 💻 TECHNICAL DOMAIN (12 Roles)
    # =========================================================================
    "ai_ml_engineer": {
        "id": "ai_ml_engineer",
        "domain": "technical",
        "domain_label": "Technical",
        "title": "AI / Machine Learning Engineer",
        "category": "Artificial Intelligence & Data",
        "icon": "Cpu",
        "demand": "Very High",
        "growth_rate": "+36% (YoY)",
        "avg_salary": "$115,000 - $165,000 / yr (₹12 - ₹28 LPA)",
        "summary": "Designs, trains, and deploys predictive and generative machine learning models, neural networks, and scalable AI microservices.",
        "core_skills": [
            {"name": "Python", "weight": 1.0, "description": "Primary programming language for AI/ML pipelines and modeling."},
            {"name": "PyTorch", "weight": 0.95, "description": "Leading deep learning framework for neural network training."},
            {"name": "Machine Learning", "weight": 0.95, "description": "Algorithms: regression, trees, boosting, clustering, cross-validation."},
            {"name": "Deep Learning", "weight": 0.9, "description": "CNN, RNN, LSTM, and Transformer neural architectures."},
            {"name": "Scikit-Learn", "weight": 0.85, "description": "Standard ML toolkit for feature engineering and pipelines."},
            {"name": "NumPy", "weight": 0.8, "description": "Vectorized numerical array mathematics."},
            {"name": "Pandas", "weight": 0.8, "description": "Data wrangling, cleansing, and tabular analytics."}
        ],
        "advanced_skills": [
            {"name": "Large Language Models (LLMs)", "weight": 0.9, "description": "Prompt design, fine-tuning, and LLM orchestration."},
            {"name": "Retrieval-Augmented Generation (RAG)", "weight": 0.85, "description": "Semantic knowledge retrieval with vector embeddings."},
            {"name": "Vector Databases (Chroma/Pinecone)", "weight": 0.8, "description": "High-dimensional vector indexing and semantic search."},
            {"name": "Hugging Face Transformers", "weight": 0.85, "description": "Pretrained models, tokenizers, and model checkpoints."},
            {"name": "Natural Language Processing", "weight": 0.85, "description": "Text analytics, sentiment analysis, NER."},
            {"name": "Computer Vision", "weight": 0.75, "description": "Object recognition, segmentation with OpenCV/YOLO."}
        ],
        "tools_and_infrastructure": [
            {"name": "Docker", "weight": 0.8, "description": "Containerized ML inference environments."},
            {"name": "FastAPI", "weight": 0.8, "description": "High-speed async API microservices for model serving."},
            {"name": "Git & GitHub", "weight": 0.85, "description": "Version control and collaborative pipelines."},
            {"name": "Linux / Bash", "weight": 0.75, "description": "CLI automation and GPU instance setup."},
            {"name": "AWS", "weight": 0.7, "description": "Cloud compute (EC2, S3, SageMaker)."}
        ],
        "recommended_projects": [
            "End-to-End RAG Knowledge Assistant with LangChain, ChromaDB and FastAPI",
            "Fine-Tuned LLM Microservice Containerized with Docker",
            "Real-Time Computer Vision Object Classifier with OpenCV and PyTorch"
        ]
    },

    "full_stack_developer": {
        "id": "full_stack_developer",
        "domain": "technical",
        "domain_label": "Technical",
        "title": "Full Stack Web Developer",
        "category": "Software Engineering",
        "icon": "Code2",
        "demand": "Very High",
        "growth_rate": "+24% (YoY)",
        "avg_salary": "$95,000 - $145,000 / yr (₹8 - ₹22 LPA)",
        "summary": "Architects responsive user interfaces, robust backend APIs, relational database schemas, and end-to-end web applications.",
        "core_skills": [
            {"name": "JavaScript", "weight": 1.0, "description": "Core web scripting language for browser and asynchronous runtimes."},
            {"name": "TypeScript", "weight": 0.9, "description": "Static typing, scalable architecture, and maintainability."},
            {"name": "React.js", "weight": 0.95, "description": "Component-based UI state management and hooks."},
            {"name": "Node.js", "weight": 0.9, "description": "Server-side runtime for high-concurrency event-driven APIs."},
            {"name": "HTML5", "weight": 0.85, "description": "Semantic web structuring and accessible markup."},
            {"name": "CSS3", "weight": 0.85, "description": "Modern styling, Flexbox/Grid, and responsive layouts."},
            {"name": "Tailwind CSS", "weight": 0.8, "description": "Utility-first rapid styling framework."}
        ],
        "advanced_skills": [
            {"name": "Next.js", "weight": 0.85, "description": "Server-side rendering (SSR), SSG, and edge API routes."},
            {"name": "PostgreSQL", "weight": 0.85, "description": "Relational data modeling, indexing, and ACID transactions."},
            {"name": "MongoDB", "weight": 0.75, "description": "NoSQL document store for flexible data structures."},
            {"name": "Express.js", "weight": 0.8, "description": "REST routing and API middleware."},
            {"name": "Redis", "weight": 0.75, "description": "In-memory caching and session store."}
        ],
        "tools_and_infrastructure": [
            {"name": "Git & GitHub", "weight": 0.9, "description": "Branching, pull requests, and version management."},
            {"name": "Docker", "weight": 0.8, "description": "Containerizing frontend and backend microservices."},
            {"name": "CI/CD Pipelines", "weight": 0.75, "description": "Automated build & test pipelines via GitHub Actions."},
            {"name": "Linux / Bash", "weight": 0.7, "description": "Server setup and CLI deployment."}
        ],
        "recommended_projects": [
            "Real-Time Collaborative Workspace with Next.js, WebSockets, Redis, and PostgreSQL",
            "Full Stack SaaS Application with Stripe Billing and Role-Based Access Control",
            "Multi-Tenant Microservices Architecture with Docker and CI/CD"
        ]
    },

    "data_scientist": {
        "id": "data_scientist",
        "domain": "technical",
        "domain_label": "Technical",
        "title": "Data Scientist / Analytics Lead",
        "category": "Data Science & Analytics",
        "icon": "BarChart3",
        "demand": "High",
        "growth_rate": "+28% (YoY)",
        "avg_salary": "$105,000 - $155,000 / yr (₹10 - ₹24 LPA)",
        "summary": "Extracts actionable insights from complex datasets and builds statistical models to power data-driven strategic decisions.",
        "core_skills": [
            {"name": "Python", "weight": 1.0, "description": "Primary analytics and statistical modeling language."},
            {"name": "SQL", "weight": 0.95, "description": "Complex joins, CTEs, window functions, and analytics queries."},
            {"name": "Pandas", "weight": 0.9, "description": "Data wrangling, cleaning, and aggregation."},
            {"name": "NumPy", "weight": 0.85, "description": "Matrix mathematics and numerical computing."},
            {"name": "Scikit-Learn", "weight": 0.85, "description": "Predictive modeling and statistical classification."},
            {"name": "Matplotlib", "weight": 0.8, "description": "Exploratory plotting and visual analytics."},
            {"name": "Seaborn", "weight": 0.8, "description": "High-level statistical visualization."}
        ],
        "advanced_skills": [
            {"name": "Machine Learning", "weight": 0.9, "description": "Supervised/unsupervised algorithms and model evaluation."},
            {"name": "Deep Learning", "weight": 0.75, "description": "Neural approaches for complex non-linear data."},
            {"name": "PostgreSQL", "weight": 0.8, "description": "Relational data warehousing and querying."},
            {"name": "Natural Language Processing", "weight": 0.75, "description": "Sentiment mining and text classification."}
        ],
        "tools_and_infrastructure": [
            {"name": "Git & GitHub", "weight": 0.85, "description": "Reproducible research and notebook management."},
            {"name": "Linux / Bash", "weight": 0.75, "description": "CLI data transformations and server workflows."},
            {"name": "Docker", "weight": 0.7, "description": "Containerized analytics environments."}
        ],
        "recommended_projects": [
            "Customer Lifetime Value & Churn Prediction Model with SHAP Feature Attribution",
            "Interactive Business Intelligence Dashboard with Streamlit and SQL",
            "Automated Exploratory Data Analysis & Anomaly Detection Pipeline"
        ]
    },

    "cloud_devops_engineer": {
        "id": "cloud_devops_engineer",
        "domain": "technical",
        "domain_label": "Technical",
        "title": "Cloud & DevOps Engineer",
        "category": "Cloud & Infrastructure",
        "icon": "Cloud",
        "demand": "Very High",
        "growth_rate": "+30% (YoY)",
        "avg_salary": "$110,000 - $160,000 / yr (₹10 - ₹26 LPA)",
        "summary": "Automates software delivery, provisions cloud infrastructure via code, and guarantees 99.99% system uptime, security, and scalability.",
        "core_skills": [
            {"name": "Docker", "weight": 1.0, "description": "Container creation, image optimization, and orchestration."},
            {"name": "Kubernetes", "weight": 0.95, "description": "Cluster orchestration, deployments, ingress, and auto-scaling."},
            {"name": "Linux / Bash", "weight": 0.95, "description": "OS internals, shell scripting, and administration."},
            {"name": "Git & GitHub", "weight": 0.9, "description": "Source control and GitOps workflows."},
            {"name": "CI/CD Pipelines", "weight": 0.9, "description": "Automated build, test, and release pipelines."},
            {"name": "AWS", "weight": 0.9, "description": "Cloud services: EC2, S3, IAM, VPC, ECS, EKS."}
        ],
        "advanced_skills": [
            {"name": "Terraform", "weight": 0.85, "description": "Infrastructure as Code (IaC) provisioning."},
            {"name": "Prometheus & Grafana", "weight": 0.8, "description": "Metrics monitoring, alerting, and telemetry dashboards."},
            {"name": "Microsoft Azure", "weight": 0.75, "description": "Enterprise cloud services and Azure DevOps."},
            {"name": "Google Cloud Platform (GCP)", "weight": 0.75, "description": "Cloud Run, GKE, and GCP networking."},
            {"name": "Nginx", "weight": 0.75, "description": "Reverse proxy, load balancing, and SSL termination."}
        ],
        "tools_and_infrastructure": [
            {"name": "Python", "weight": 0.8, "description": "Infrastructure automation scripts and tools."},
            {"name": "PostgreSQL", "weight": 0.7, "description": "Managed cloud database instances."}
        ],
        "recommended_projects": [
            "Production Kubernetes Cluster with GitOps (ArgoCD), Prometheus, and Grafana Telemetry",
            "Multi-Region AWS Infrastructure automated via Terraform and GitHub Actions",
            "Zero-Downtime Blue-Green Deployment Pipeline for Microservices"
        ]
    },

    "cybersecurity_analyst": {
        "id": "cybersecurity_analyst",
        "domain": "technical",
        "domain_label": "Technical",
        "title": "Cybersecurity & AppSec Specialist",
        "category": "Information Security",
        "icon": "ShieldCheck",
        "demand": "Very High",
        "growth_rate": "+32% (YoY)",
        "avg_salary": "$100,000 - $150,000 / yr (₹9 - ₹24 LPA)",
        "summary": "Protects digital assets, performs penetration testing, analyzes threat vectors, and audits application vulnerabilities.",
        "core_skills": [
            {"name": "Network Security", "weight": 1.0, "description": "TCP/IP, routing, firewalls, and network protocols."},
            {"name": "Linux / Bash", "weight": 0.95, "description": "Security auditing, system hardening, and log analysis."},
            {"name": "Wireshark", "weight": 0.9, "description": "Packet capture, network protocol analysis, and traffic inspection."},
            {"name": "Cryptography", "weight": 0.85, "description": "Ciphers, hashing, PKI, SSL/TLS certificates, and key management."},
            {"name": "OWASP Top 10 Security", "weight": 0.9, "description": "Web vulnerabilities: SQLi, XSS, CSRF, auth bypass."},
            {"name": "Python", "weight": 0.85, "description": "Security automation scripts and exploit analysis."}
        ],
        "advanced_skills": [
            {"name": "Penetration Testing", "weight": 0.9, "description": "Vulnerability scanning, exploitation, and reporting."},
            {"name": "Ethical Hacking", "weight": 0.85, "description": "Red team methodologies, reconnaissance, and offensive tactics."},
            {"name": "SOC & SIEM Operations", "weight": 0.8, "description": "Security event analysis, incident triage, and correlation."},
            {"name": "Burp Suite", "weight": 0.8, "description": "Web application security proxy and auditing tool."}
        ],
        "tools_and_infrastructure": [
            {"name": "Git & GitHub", "weight": 0.8, "description": "Collaborative security tooling."},
            {"name": "Docker", "weight": 0.75, "description": "Isolated sandbox testing environments."}
        ],
        "recommended_projects": [
            "Automated Vulnerability Scanner & Security Audit Tool in Python",
            "Network Intrusion Detection System (IDS) analyzing packet traffic with Wireshark & ML",
            "Hardened Web Application Lab demonstrating OWASP Top 10 remediations"
        ]
    },

    "frontend_engineer": {
        "id": "frontend_engineer",
        "domain": "technical",
        "domain_label": "Technical",
        "title": "Frontend / UI Engineer",
        "category": "Software Engineering",
        "icon": "Monitor",
        "demand": "High",
        "growth_rate": "+22% (YoY)",
        "avg_salary": "$90,000 - $135,000 / yr (₹7 - ₹18 LPA)",
        "summary": "Crafts pixel-perfect, accessible, and ultra-fast web user interfaces and interactive single-page web applications.",
        "core_skills": [
            {"name": "JavaScript", "weight": 1.0, "description": "Core client-side scripting language."},
            {"name": "React.js", "weight": 0.95, "description": "Component hierarchies, hooks, and virtual DOM performance."},
            {"name": "HTML5", "weight": 0.9, "description": "Semantic markup and accessibility standards."},
            {"name": "CSS3", "weight": 0.9, "description": "Modern layout engines (Grid/Flexbox) and fluid responsive design."},
            {"name": "TypeScript", "weight": 0.85, "description": "Type-safe UI component architecture."},
            {"name": "Tailwind CSS", "weight": 0.85, "description": "Utility-first modern styling toolkit."}
        ],
        "advanced_skills": [
            {"name": "Next.js", "weight": 0.85, "description": "SSR, SSG, routing, and optimized image/font pipelines."},
            {"name": "Figma", "weight": 0.75, "description": "Translating UI/UX mockups into production code."},
            {"name": "Vue.js", "weight": 0.7, "description": "Alternative reactive UI framework."}
        ],
        "tools_and_infrastructure": [
            {"name": "Git & GitHub", "weight": 0.9, "description": "Version control and collaborative PRs."},
            {"name": "CI/CD Pipelines", "weight": 0.75, "description": "Automated frontend deployment (Vercel/Netlify)."}
        ],
        "recommended_projects": [
            "Interactive Design System Component Library with Storybook & Tailwind",
            "High-Performance E-Commerce Web App with Next.js and Micro-Interactions",
            "Real-Time Finance Dashboard with Chart.js and WebSocket Streaming"
        ]
    },

    "backend_engineer": {
        "id": "backend_engineer",
        "domain": "technical",
        "domain_label": "Technical",
        "title": "Backend & Distributed Systems Engineer",
        "category": "Software Engineering",
        "icon": "Server",
        "demand": "High",
        "growth_rate": "+25% (YoY)",
        "avg_salary": "$100,000 - $150,000 / yr (₹9 - ₹22 LPA)",
        "summary": "Develops highly scalable server-side microservices, REST/GraphQL APIs, message queues, and high-performance database architectures.",
        "core_skills": [
            {"name": "Python", "weight": 0.95, "description": "Backend services, scripting, and async programming."},
            {"name": "Node.js", "weight": 0.95, "description": "Event-driven asynchronous backend runtime."},
            {"name": "PostgreSQL", "weight": 0.95, "description": "Relational schema design, transactions, and indexing."},
            {"name": "FastAPI", "weight": 0.9, "description": "Modern asynchronous REST framework with auto OpenAPI."},
            {"name": "SQL", "weight": 0.9, "description": "Relational data querying and query optimization."},
            {"name": "Express.js", "weight": 0.85, "description": "Server middleware and endpoint routing."}
        ],
        "advanced_skills": [
            {"name": "Redis", "weight": 0.85, "description": "In-memory caching, pub/sub, and rate-limiting."},
            {"name": "Apache Kafka", "weight": 0.8, "description": "Distributed event streaming and message queuing."},
            {"name": "MongoDB", "weight": 0.75, "description": "Document-based database architecture."}
        ],
        "tools_and_infrastructure": [
            {"name": "Docker", "weight": 0.85, "description": "Microservice containerization."},
            {"name": "Git & GitHub", "weight": 0.9, "description": "Version control and code reviews."},
            {"name": "Linux / Bash", "weight": 0.85, "description": "Production server configuration and logging."}
        ],
        "recommended_projects": [
            "High-Throughput Distributed Rate-Limiter and Caching Service with Redis",
            "Event-Driven Order Processing Microservice with Kafka and PostgreSQL",
            "Scalable Authentication & OAuth2 Microservice with JWT and FastAPI"
        ]
    },

    "data_engineer": {
        "id": "data_engineer",
        "domain": "technical",
        "domain_label": "Technical",
        "title": "Data Engineer & Pipeline Architect",
        "category": "Data Engineering",
        "icon": "Database",
        "demand": "Very High",
        "growth_rate": "+29% (YoY)",
        "avg_salary": "$110,000 - $160,000 / yr (₹11 - ₹25 LPA)",
        "summary": "Builds robust ETL/ELT pipelines, data lakes, and streaming architectures to transform raw data into analytics-ready models.",
        "core_skills": [
            {"name": "Python", "weight": 1.0, "description": "Data processing and pipeline automation scripts."},
            {"name": "SQL", "weight": 1.0, "description": "Advanced querying, aggregation, and data warehousing."},
            {"name": "PostgreSQL", "weight": 0.9, "description": "Relational data warehousing and storage."},
            {"name": "Pandas", "weight": 0.85, "description": "Data transformation and normalization."},
            {"name": "Linux / Bash", "weight": 0.85, "description": "CLI automation and scheduled cron jobs."}
        ],
        "advanced_skills": [
            {"name": "Apache Spark", "weight": 0.9, "description": "Big data distributed batch and streaming computations."},
            {"name": "Apache Airflow", "weight": 0.85, "description": "DAG orchestration and automated ETL scheduling."},
            {"name": "Apache Kafka", "weight": 0.85, "description": "Real-time streaming ingestion."},
            {"name": "dbt (Data Build Tool)", "weight": 0.8, "description": "In-warehouse data transformation and testing."},
            {"name": "Snowflake", "weight": 0.8, "description": "Cloud analytical data warehouse."}
        ],
        "tools_and_infrastructure": [
            {"name": "Docker", "weight": 0.8, "description": "Containerizing pipeline dependencies."},
            {"name": "AWS", "weight": 0.8, "description": "Cloud storage (S3, Redshift, Glue)."},
            {"name": "Git & GitHub", "weight": 0.85, "description": "Version control for data pipelines."}
        ],
        "recommended_projects": [
            "Automated End-to-End ETL Pipeline with Apache Airflow, dbt, and PostgreSQL",
            "Real-Time IoT Event Stream Processor with Kafka, Spark Streaming, and S3",
            "Modern Cloud Data Warehouse Architecture with Snowflake & Airflow"
        ]
    },

    "ml_ops_engineer": {
        "id": "ml_ops_engineer",
        "domain": "technical",
        "domain_label": "Technical",
        "title": "MLOps & AI Platform Engineer",
        "category": "AI Infrastructure",
        "icon": "Layers",
        "demand": "Very High",
        "growth_rate": "+38% (YoY)",
        "avg_salary": "$120,000 - $170,000 / yr (₹14 - ₹30 LPA)",
        "summary": "Bridges machine learning and DevOps by automating model CI/CD, experiment tracking, model registry, and scalable inference clusters.",
        "core_skills": [
            {"name": "Python", "weight": 1.0, "description": "ML workflows and automation."},
            {"name": "Docker", "weight": 0.95, "description": "Reproducible model containerization."},
            {"name": "Kubernetes", "weight": 0.9, "description": "Orchestrating model serving workloads."},
            {"name": "Machine Learning", "weight": 0.9, "description": "Model lifecycle, metrics, and drift detection."},
            {"name": "FastAPI", "weight": 0.85, "description": "Serving inference endpoints."},
            {"name": "Git & GitHub", "weight": 0.9, "description": "GitOps and code versioning."}
        ],
        "advanced_skills": [
            {"name": "MLflow", "weight": 0.85, "description": "Experiment tracking and model registry."},
            {"name": "CI/CD Pipelines", "weight": 0.85, "description": "Automated retraining and deployment pipelines."},
            {"name": "Prometheus & Grafana", "weight": 0.8, "description": "Monitoring model latency and data drift."},
            {"name": "AWS", "weight": 0.8, "description": "Cloud ML infrastructure (SageMaker/EC2)."}
        ],
        "tools_and_infrastructure": [
            {"name": "Linux / Bash", "weight": 0.85, "description": "GPU cluster management and CLI tools."},
            {"name": "PyTorch", "weight": 0.8, "description": "Deep learning model runtime optimization."}
        ],
        "recommended_projects": [
            "Continuous Machine Learning (CML) Pipeline with GitHub Actions and MLflow",
            "Scalable Real-Time Model Serving Cluster on Kubernetes with Autoscaling",
            "Model Performance & Drift Monitoring Dashboard with Prometheus and Grafana"
        ]
    },

    "mobile_developer": {
        "id": "mobile_developer",
        "domain": "technical",
        "domain_label": "Technical",
        "title": "Mobile App Developer (iOS & Android)",
        "category": "Mobile Engineering",
        "icon": "Smartphone",
        "demand": "High",
        "growth_rate": "+20% (YoY)",
        "avg_salary": "$90,000 - $140,000 / yr (₹7 - ₹20 LPA)",
        "summary": "Builds high-performance native and cross-platform mobile apps with engaging user experiences for iOS and Android.",
        "core_skills": [
            {"name": "JavaScript", "weight": 0.9, "description": "Mobile scripting and async operations."},
            {"name": "React Native", "weight": 0.95, "description": "Cross-platform native mobile app framework."},
            {"name": "Flutter", "weight": 0.9, "description": "Cross-platform UI toolkit by Google."},
            {"name": "TypeScript", "weight": 0.85, "description": "Type-safe mobile application architecture."},
            {"name": "Git & GitHub", "weight": 0.85, "description": "Source control and collaborative workflows."}
        ],
        "advanced_skills": [
            {"name": "Swift", "weight": 0.8, "description": "Native iOS app development with SwiftUI."},
            {"name": "Kotlin", "weight": 0.8, "description": "Native Android app development with Jetpack Compose."},
            {"name": "Firebase", "weight": 0.75, "description": "Mobile backend-as-a-service, push notifications, and auth."}
        ],
        "tools_and_infrastructure": [
            {"name": "Figma", "weight": 0.75, "description": "Mobile UI/UX design translation."},
            {"name": "REST APIs", "weight": 0.85, "description": "Consuming backend microservices."}
        ],
        "recommended_projects": [
            "Cross-Platform Social & Fitness Tracker App with Flutter and Firebase",
            "E-Commerce Mobile App with Offline Storage, Push Notifications, and React Native",
            "Native iOS Health & Habits Tracker with SwiftUI and CoreData"
        ]
    },

    "blockchain_engineer": {
        "id": "blockchain_engineer",
        "domain": "technical",
        "domain_label": "Technical",
        "title": "Blockchain & Web3 Engineer",
        "category": "Decentralized Tech",
        "icon": "Link",
        "demand": "Medium",
        "growth_rate": "+18% (YoY)",
        "avg_salary": "$110,000 - $165,000 / yr (₹12 - ₹28 LPA)",
        "summary": "Develops smart contracts, decentralized applications (dApps), and cryptographic protocols on EVM and decentralized ledgers.",
        "core_skills": [
            {"name": "Solidity", "weight": 1.0, "description": "Smart contract programming language for Ethereum/EVM."},
            {"name": "JavaScript", "weight": 0.9, "description": "Web3 client integration and testing."},
            {"name": "TypeScript", "weight": 0.85, "description": "Type-safe decentralized dApp development."},
            {"name": "Cryptography", "weight": 0.85, "description": "Hashing, asymmetric encryption, and consensus mechanisms."},
            {"name": "Git & GitHub", "weight": 0.85, "description": "Version control for open-source protocols."}
        ],
        "advanced_skills": [
            {"name": "React.js", "weight": 0.8, "description": "Decentralized user interfaces and wallet integrations."},
            {"name": "Node.js", "weight": 0.8, "description": "Backend oracle indexing and web3 event listeners."}
        ],
        "tools_and_infrastructure": [
            {"name": "Docker", "weight": 0.75, "description": "Local testnet blockchain nodes."},
            {"name": "Linux / Bash", "weight": 0.75, "description": "Validator node setup and script automation."}
        ],
        "recommended_projects": [
            "Decentralized Escrow & Staking Protocol with Audited Solidity Smart Contracts",
            "Full-Stack Web3 dApp with WalletConnect, Ethers.js, and React",
            "Automated On-Chain DeFi Indexer & Analytics Dashboard"
        ]
    },

    "site_reliability_engineer": {
        "id": "site_reliability_engineer",
        "domain": "technical",
        "domain_label": "Technical",
        "title": "Site Reliability Engineer (SRE)",
        "category": "Cloud & Infrastructure",
        "icon": "Layers",
        "demand": "Very High",
        "growth_rate": "+31% (YoY)",
        "avg_salary": "$115,000 - $165,000 / yr (₹12 - ₹27 LPA)",
        "summary": "Applies software engineering principles to operations to build ultra-reliable, automated, self-healing distributed systems.",
        "core_skills": [
            {"name": "Linux / Bash", "weight": 1.0, "description": "System internals, kernel debugging, and performance profiling."},
            {"name": "Python", "weight": 0.95, "description": "Reliability automation, health checks, and alerting scripts."},
            {"name": "Kubernetes", "weight": 0.95, "description": "High-availability cluster management."},
            {"name": "Docker", "weight": 0.9, "description": "Container standards and security."},
            {"name": "Prometheus & Grafana", "weight": 0.9, "description": "SLO/SLI monitoring, alerting, and observability."}
        ],
        "advanced_skills": [
            {"name": "Terraform", "weight": 0.85, "description": "Reproducible cloud infrastructure."},
            {"name": "CI/CD Pipelines", "weight": 0.85, "description": "Automated canary and rollbacks."},
            {"name": "AWS", "weight": 0.85, "description": "Cloud resilience, auto-scaling groups, and multi-AZ deployments."}
        ],
        "tools_and_infrastructure": [
            {"name": "Git & GitHub", "weight": 0.85, "description": "Infrastructure as Code versioning."}
        ],
        "recommended_projects": [
            "Automated Chaos Engineering & Disaster Recovery Sandbox for Microservices",
            "SLO/SLI Observability Stack with Automated PagerDuty Alerts and Grafana",
            "Self-Healing Infrastructure with Kubernetes Operators and Prometheus"
        ]
    },

    # =========================================================================
    # 📈 NON-TECHNICAL & BUSINESS / DESIGN / MANAGEMENT DOMAIN (12 Roles)
    # =========================================================================
    "product_manager": {
        "id": "product_manager",
        "domain": "non_technical",
        "domain_label": "Non-Technical & Business",
        "title": "Technical Product Manager / APM",
        "category": "Product & Strategy",
        "icon": "Briefcase",
        "demand": "Very High",
        "growth_rate": "+26% (YoY)",
        "avg_salary": "$105,000 - $155,000 / yr (₹12 - ₹26 LPA)",
        "summary": "Defines product vision, conducts market discovery, writes PRDs, collaborates with engineers/designers, and drives product launches.",
        "core_skills": [
            {"name": "Product Management", "weight": 1.0, "description": "Product discovery, lifecycle management, and go-to-market strategy."},
            {"name": "PRD & Spec Writing", "weight": 0.95, "description": "Authoring unambiguous Product Requirements Documents and user stories."},
            {"name": "Product Roadmapping", "weight": 0.95, "description": "Strategic milestone planning, sprint themes, and timeline tracking."},
            {"name": "Agile & Scrum", "weight": 0.9, "description": "Sprint planning, backlog grooming, standups, and retrospectives."},
            {"name": "Feature Prioritization (RICE/MoSCoW)", "weight": 0.9, "description": "Data-driven scoring to balance business impact vs engineering effort."},
            {"name": "Stakeholder Management", "weight": 0.85, "description": "Cross-functional alignment between engineering, design, sales, and executives."}
        ],
        "advanced_skills": [
            {"name": "A/B Testing & Experimentation", "weight": 0.85, "description": "Hypothesis formulation, statistical sample sizing, and feature rollout."},
            {"name": "User Research", "weight": 0.85, "description": "Customer discovery interviews, surveys, and journey mapping."},
            {"name": "KPI Tracking & Dashboards", "weight": 0.8, "description": "Defining North Star metrics, retention, and conversion analytics."},
            {"name": "SQL", "weight": 0.75, "description": "Self-serve product analytics and cohort retention queries."}
        ],
        "tools_and_infrastructure": [
            {"name": "Jira & Confluence", "weight": 0.9, "description": "Issue tracking, sprint management, and product documentation."},
            {"name": "Figma", "weight": 0.8, "description": "Reviewing design prototypes and UX user flows."},
            {"name": "Advanced Excel / Spreadsheets", "weight": 0.8, "description": "Business case modeling and ROI calculations."}
        ],
        "recommended_projects": [
            "Comprehensive PRD & Interactive Prototype for a B2B SaaS Workflow Tool",
            "End-to-End Product Roadmap & Go-To-Market Launch Strategy Presentation",
            "Product Growth Case Study: Onboarding Funnel A/B Test & Metrics Optimization"
        ]
    },

    "ui_ux_designer": {
        "id": "ui_ux_designer",
        "domain": "non_technical",
        "domain_label": "Design & Creative",
        "title": "UI/UX & Product Designer",
        "category": "Design & Creative",
        "icon": "Sparkles",
        "demand": "Very High",
        "growth_rate": "+24% (YoY)",
        "avg_salary": "$85,000 - $135,000 / yr (₹7 - ₹18 LPA)",
        "summary": "Conducts user research, crafts design systems, architects intuitive user journeys, and builds interactive clickable product prototypes.",
        "core_skills": [
            {"name": "Figma", "weight": 1.0, "description": "Industry-standard vector design, auto-layout, components, and variables."},
            {"name": "UI/UX Design", "weight": 0.95, "description": "Visual hierarchy, typography, color theory, spacing, and micro-interactions."},
            {"name": "User Research", "weight": 0.95, "description": "User interviews, persona synthesis, empathy mapping, and journey maps."},
            {"name": "Wireframing & Prototyping", "weight": 0.9, "description": "Low-fidelity sketches to high-fidelity clickable interactive prototypes."},
            {"name": "Design Systems", "weight": 0.9, "description": "Scalable component libraries, design tokens, and accessibility guidelines."}
        ],
        "advanced_skills": [
            {"name": "Usability Testing", "weight": 0.85, "description": "Moderated/unmoderated task testing, SUS scoring, and design iterations."},
            {"name": "Information Architecture", "weight": 0.85, "description": "Site mapping, card sorting, and clear navigation structures."},
            {"name": "HTML5", "weight": 0.65, "description": "Understanding web layout constraints and DOM structure for engineer handoff."},
            {"name": "CSS3", "weight": 0.65, "description": "Flexbox, animations, and responsive breakpoints understanding."}
        ],
        "tools_and_infrastructure": [
            {"name": "Adobe XD", "weight": 0.75, "description": "Alternative vector and prototyping tool."},
            {"name": "Jira & Confluence", "weight": 0.75, "description": "Design sprint collaboration with agile development squads."}
        ],
        "recommended_projects": [
            "Complete End-to-End Fintech Mobile App Redesign with User Research Case Study",
            "Comprehensive Multi-Platform Design System with Figma Variables & Tokens",
            "B2B SaaS Analytics Dashboard UI/UX with Interactive Clickable Prototype"
        ]
    },

    "business_analyst": {
        "id": "business_analyst",
        "domain": "non_technical",
        "domain_label": "Non-Technical & Business",
        "title": "Business Analyst & Operations Lead",
        "category": "Business & Analytics",
        "icon": "BarChart3",
        "demand": "High",
        "growth_rate": "+21% (YoY)",
        "avg_salary": "$85,000 - $130,000 / yr (₹7 - ₹17 LPA)",
        "summary": "Analyzes organizational processes, models operational data, identifies cost-saving bottlenecks, and bridges business needs with technical solutions.",
        "core_skills": [
            {"name": "Business Analysis", "weight": 1.0, "description": "Requirements gathering, feasibility studies, and business case formulation."},
            {"name": "Advanced Excel / Spreadsheets", "weight": 0.95, "description": "VLOOKUP/XLOOKUP, Pivot Tables, scenario analysis, and financial functions."},
            {"name": "SQL", "weight": 0.9, "description": "Querying relational data, business metric calculation, and reporting."},
            {"name": "Power BI", "weight": 0.9, "description": "Interactive executive dashboards, DAX queries, and visual reporting."},
            {"name": "Process Mapping (BPMN)", "weight": 0.85, "description": "Visualizing workflow pipelines, swimlanes, and process optimization."}
        ],
        "advanced_skills": [
            {"name": "Tableau", "weight": 0.85, "description": "Visual analytics and cross-departmental dashboards."},
            {"name": "Competitive Analysis", "weight": 0.8, "description": "Market benchmarking, SWOT analysis, and industry trend evaluation."},
            {"name": "KPI Tracking & Dashboards", "weight": 0.85, "description": "Establishing operational OKRs, SLAs, and performance metrics."}
        ],
        "tools_and_infrastructure": [
            {"name": "Jira & Confluence", "weight": 0.8, "description": "Agile backlog items, epics, and documentation."},
            {"name": "Stakeholder Management", "weight": 0.85, "description": "Executive presentations and change management."}
        ],
        "recommended_projects": [
            "End-to-End Business Process Optimization Plan with BPMN & ROI Model",
            "Executive Sales & Operations KPI Dashboard in Power BI with Live SQL Feeds",
            "Market Feasibility & Competitive Benchmarking Report for New Product Line"
        ]
    },

    "financial_analyst": {
        "id": "financial_analyst",
        "domain": "non_technical",
        "domain_label": "Finance & Economics",
        "title": "Financial Analyst & Quantitative Modeler",
        "category": "Finance & Economics",
        "icon": "TrendingUp",
        "demand": "High",
        "growth_rate": "+19% (YoY)",
        "avg_salary": "$90,000 - $140,000 / yr (₹8 - ₹20 LPA)",
        "summary": "Constructs financial models, analyzes P&L statements, performs equity valuation, and guides capital allocation decisions.",
        "core_skills": [
            {"name": "Financial Modeling", "weight": 1.0, "description": "3-statement models (P&L, Balance Sheet, Cash Flow) and sensitivity analysis."},
            {"name": "Advanced Excel / Spreadsheets", "weight": 1.0, "description": "Complex financial formulas, macros, and dynamic forecasting models."},
            {"name": "Accounting & Financial Statements", "weight": 0.95, "description": "US GAAP / IFRS standards, ratio analysis, and working capital dynamics."},
            {"name": "DCF Valuation", "weight": 0.9, "description": "Discounted Cash Flow, WACC calculations, and enterprise valuation."},
            {"name": "Budgeting & Forecasting", "weight": 0.9, "description": "Annual operational budgeting, variance analysis, and cost center tracking."}
        ],
        "advanced_skills": [
            {"name": "Risk Management", "weight": 0.85, "description": "Credit risk, market volatility, and hedging strategies."},
            {"name": "Portfolio Analysis", "weight": 0.8, "description": "CAPM, Sharpe ratio, and asset allocation strategies."},
            {"name": "SQL", "weight": 0.75, "description": "Querying transaction databases for financial reporting."}
        ],
        "tools_and_infrastructure": [
            {"name": "Power BI", "weight": 0.75, "description": "Financial performance dashboards."},
            {"name": "Python", "weight": 0.7, "description": "Automating financial data ingestion and quantitative calculations."}
        ],
        "recommended_projects": [
            "3-Statement Dynamic Financial Model & DCF Valuation for a Public Tech Enterprise",
            "Corporate Budget Variance & Revenue Forecasting Model in Excel",
            "Investment Portfolio Risk & Return Optimization Simulator in Python/Excel"
        ]
    },

    "digital_marketer": {
        "id": "digital_marketer",
        "domain": "non_technical",
        "domain_label": "Marketing & Growth",
        "title": "Digital Marketing & Growth Strategist",
        "category": "Marketing & Growth",
        "icon": "TrendingUp",
        "demand": "High",
        "growth_rate": "+22% (YoY)",
        "avg_salary": "$75,000 - $125,000 / yr (₹6 - ₹16 LPA)",
        "summary": "Drives customer acquisition through multi-channel digital campaigns, performance marketing (PPC), conversion funnels, and data analytics.",
        "core_skills": [
            {"name": "Digital Marketing", "weight": 1.0, "description": "Full-funnel customer acquisition, activation, and retention strategy."},
            {"name": "Search Engine Optimization (SEO)", "weight": 0.95, "description": "Keyword research, on-page optimization, backlink strategies, and technical audits."},
            {"name": "Google Analytics 4", "weight": 0.95, "description": "Event tracking, attribution modeling, audience segmentation, and funnel analysis."},
            {"name": "Google & Meta Ads (PPC)", "weight": 0.9, "description": "Search, display, paid social campaigns, bid optimization, and ROAS tracking."},
            {"name": "Conversion Rate Optimization (CRO)", "weight": 0.85, "description": "Landing page optimization and conversion rate experiments."}
        ],
        "advanced_skills": [
            {"name": "Email Marketing & Automation", "weight": 0.85, "description": "Drip campaigns, lifecycle automation, and deliverability optimization."},
            {"name": "Content Marketing", "weight": 0.85, "description": "Editorial strategy, lead magnets, and customer education."},
            {"name": "Social Media Strategy", "weight": 0.8, "description": "Brand presence, viral hooks, and influencer partnerships."},
            {"name": "A/B Testing & Experimentation", "weight": 0.8, "description": "Creative and messaging split testing."}
        ],
        "tools_and_infrastructure": [
            {"name": "HubSpot CRM", "weight": 0.8, "description": "Marketing automation, lead scoring, and CRM pipelines."},
            {"name": "Advanced Excel / Spreadsheets", "weight": 0.8, "description": "Campaign ROI modeling and CAC/LTV calculations."}
        ],
        "recommended_projects": [
            "Complete Multi-Channel Digital Growth Campaign & ROAS Optimization Plan",
            "Comprehensive Technical & On-Page SEO Audit with Content Roadmap",
            "Automated Email Lead Nurturing & Onboarding Sequence with HubSpot"
        ]
    },

    "content_seo_strategist": {
        "id": "content_seo_strategist",
        "domain": "non_technical",
        "domain_label": "Media & Communications",
        "title": "Content Strategy & SEO Specialist",
        "category": "Media & Communications",
        "icon": "FileText",
        "demand": "High",
        "growth_rate": "+18% (YoY)",
        "avg_salary": "$70,000 - $115,000 / yr (₹5 - ₹14 LPA)",
        "summary": "Plans, writes, and optimizes high-ranking content that builds organic brand authority, educates audiences, and drives qualified inbound leads.",
        "core_skills": [
            {"name": "Search Engine Optimization (SEO)", "weight": 1.0, "description": "Search intent analysis, keyword clustering, and SERP rankings."},
            {"name": "Content Marketing", "weight": 1.0, "description": "Thought leadership, educational guides, and editorial calendar management."},
            {"name": "Copywriting", "weight": 0.95, "description": "Compelling headlines, persuasive landing copy, and calls-to-action (CTAs)."},
            {"name": "Google Analytics 4", "weight": 0.85, "description": "Organic traffic monitoring, bounce rates, and engagement duration."},
            {"name": "Competitive Analysis", "weight": 0.85, "description": "Content gap analysis against industry competitors."}
        ],
        "advanced_skills": [
            {"name": "Social Media Strategy", "weight": 0.8, "description": "Repurposing long-form content across LinkedIn and Twitter."},
            {"name": "Email Marketing & Automation", "weight": 0.75, "description": "Newsletter creation and subscriber growth strategies."}
        ],
        "tools_and_infrastructure": [
            {"name": "Markdown & GitBook", "weight": 0.75, "description": "Documentation and article publishing."},
            {"name": "Figma", "weight": 0.7, "description": "Collaborating on blog header illustrations and visual assets."}
        ],
        "recommended_projects": [
            "Organic SEO Inbound Traffic Strategy with 20 Keyword Cluster Pillar Pages",
            "Company Thought Leadership Publication Series & LinkedIn Distribution Plan",
            "Complete Brand Tone of Voice Guide & Conversion Copywriting Teardown"
        ]
    },

    "management_consultant": {
        "id": "management_consultant",
        "domain": "non_technical",
        "domain_label": "Consulting & Strategy",
        "title": "Management & Strategy Consultant",
        "category": "Consulting & Strategy",
        "icon": "Briefcase",
        "demand": "Very High",
        "growth_rate": "+20% (YoY)",
        "avg_salary": "$110,000 - $165,000 / yr (₹14 - ₹30 LPA)",
        "summary": "Solves high-stakes strategic business challenges, models growth scenarios, and presents structured advisory recommendations to C-suite leaders.",
        "core_skills": [
            {"name": "Business Analysis", "weight": 1.0, "description": "Hypothesis-driven problem solving and structured MECE frameworks."},
            {"name": "Competitive Analysis", "weight": 0.95, "description": "Industry structure (Porter's 5 Forces), benchmarking, and positioning."},
            {"name": "Stakeholder Management", "weight": 0.95, "description": "Executive interview synthesis and senior stakeholder alignment."},
            {"name": "Advanced Excel / Spreadsheets", "weight": 0.9, "description": "Market sizing (TAM/SAM/SOM) and cost-benefit modeling."},
            {"name": "Process Mapping (BPMN)", "weight": 0.85, "description": "Organizational redesign and operating model transformation."}
        ],
        "advanced_skills": [
            {"name": "Financial Modeling", "weight": 0.85, "description": "Valuation, M&A synergy modeling, and cash flow projections."},
            {"name": "Market Research", "weight": 0.85, "description": "Primary and secondary industry discovery research."},
            {"name": "KPI Tracking & Dashboards", "weight": 0.8, "description": "Transformation program governance and value realization."}
        ],
        "tools_and_infrastructure": [
            {"name": "Power BI", "weight": 0.75, "description": "Executive dashboard presentations."}
        ],
        "recommended_projects": [
            "Market Entry Strategy & TAM Sizing Presentation for a Tech Unicorn",
            "Corporate Operational Cost Optimization & Restructuring Deck",
            "Digital Transformation Roadmap with Risk Mitigation Framework"
        ]
    },

    "scrum_project_manager": {
        "id": "scrum_project_manager",
        "domain": "non_technical",
        "domain_label": "Project Management",
        "title": "Agile Project Manager & Scrum Master",
        "category": "Project & Program Management",
        "icon": "CheckCircle2",
        "demand": "High",
        "growth_rate": "+23% (YoY)",
        "avg_salary": "$95,000 - $140,000 / yr (₹9 - ₹22 LPA)",
        "summary": "Facilitates high-velocity agile development teams, removes operational blockers, manages scope, and ensures timely milestone delivery.",
        "core_skills": [
            {"name": "Agile & Scrum", "weight": 1.0, "description": "Scrum ceremonies: sprint planning, daily standups, reviews, retrospectives."},
            {"name": "Jira & Confluence", "weight": 1.0, "description": "Backlog organization, sprint boards, burndown charts, velocity tracking."},
            {"name": "Sprint Planning", "weight": 0.95, "description": "Capacity planning, story point estimation, and commitment tracking."},
            {"name": "Stakeholder Management", "weight": 0.9, "description": "Status reporting, scope negotiation, and expectation alignment."},
            {"name": "Process Mapping (BPMN)", "weight": 0.85, "description": "Workflow optimization and continuous process improvement."}
        ],
        "advanced_skills": [
            {"name": "Risk Management", "weight": 0.85, "description": "Project dependency tracking, risk registers, and mitigation plans."},
            {"name": "User Story Mapping", "weight": 0.8, "description": "Breaking complex epics into actionable user stories with acceptance criteria."}
        ],
        "tools_and_infrastructure": [
            {"name": "Advanced Excel / Spreadsheets", "weight": 0.8, "description": "Resource allocation and budget tracking."},
            {"name": "Git & GitHub", "weight": 0.7, "description": "Understanding release branches and pull request workflows."}
        ],
        "recommended_projects": [
            "Comprehensive Agile Transformation Blueprint for a 30-Person Engineering Team",
            "End-to-End Jira Sprint Board Setup with Automated Workflows and SLAs",
            "Project Risk Management Plan & Multi-Team Dependency Tracking Framework"
        ]
    },

    "sales_bd_specialist": {
        "id": "sales_bd_specialist",
        "domain": "non_technical",
        "domain_label": "Sales & Growth",
        "title": "Business Development & Tech Sales Executive",
        "category": "Sales & Business Development",
        "icon": "Users",
        "demand": "Very High",
        "growth_rate": "+24% (YoY)",
        "avg_salary": "$80,000 - $145,000 / yr (₹6 - ₹22 LPA + Incentives)",
        "summary": "Identifies high-value B2B prospective clients, pitches complex technical software solutions, negotiates terms, and closes enterprise deals.",
        "core_skills": [
            {"name": "B2B Sales & Outbound", "weight": 1.0, "description": "Discovery calls, consultative selling, objection handling, and closing."},
            {"name": "Salesforce CRM", "weight": 0.95, "description": "Managing sales pipelines, stage conversions, and deal forecasts."},
            {"name": "Lead Generation & Prospecting", "weight": 0.95, "description": "Outbound prospecting, ideal customer profiling (ICP), and qualification."},
            {"name": "Negotiation & Deal Closing", "weight": 0.9, "description": "Contract negotiation, pricing structures, and closing techniques."},
            {"name": "Cold Outreach & Email Campaigns", "weight": 0.85, "description": "Crafting high-converting outbound email and LinkedIn cadences."}
        ],
        "advanced_skills": [
            {"name": "Client Relationship Management", "weight": 0.85, "description": "Account relationship nurturing and executive presentation."},
            {"name": "Competitive Analysis", "weight": 0.8, "description": "Differentiating software capabilities against market alternatives."}
        ],
        "tools_and_infrastructure": [
            {"name": "HubSpot CRM", "weight": 0.8, "description": "Pipeline tracking and contact management."},
            {"name": "LinkedIn Recruiter", "weight": 0.75, "description": "Executive networking and prospect identification."}
        ],
        "recommended_projects": [
            "Enterprise Outbound B2B SaaS Sales Playbook with Cold Email Sequences",
            "Sales Pipeline Forecasting Model & CRM Conversion Funnel Analysis",
            "Competitive Software Product Pitch Deck & Objection Handling Guide"
        ]
    },

    "hr_talent_specialist": {
        "id": "hr_talent_specialist",
        "domain": "non_technical",
        "domain_label": "People & HR",
        "title": "Tech Talent Acquisition & HR Specialist",
        "category": "People & Talent",
        "icon": "Users",
        "demand": "High",
        "growth_rate": "+20% (YoY)",
        "avg_salary": "$75,000 - $120,000 / yr (₹6 - ₹16 LPA)",
        "summary": "Attracts, screens, and recruits top-tier technical and executive talent, while fostering strong employee engagement and onboarding culture.",
        "core_skills": [
            {"name": "Technical Talent Sourcing", "weight": 1.0, "description": "Sourcing software engineers, data scientists, and product leaders."},
            {"name": "Structured Behavioral Interviewing", "weight": 0.95, "description": "STAR method evaluation, competency rubrics, and candidate scoring."},
            {"name": "LinkedIn Recruiter", "weight": 0.95, "description": "Boolean search strings, talent pipeline building, and outreach."},
            {"name": "ATS Management", "weight": 0.9, "description": "Candidate pipeline tracking via modern Applicant Tracking Systems."},
            {"name": "Employee Onboarding & Retention", "weight": 0.85, "description": "Structured orientation, 30-60-90 day reviews, and culture integration."}
        ],
        "advanced_skills": [
            {"name": "HR Analytics", "weight": 0.8, "description": "Time-to-hire, cost-per-hire, offer acceptance rate, and retention metrics."},
            {"name": "Stakeholder Management", "weight": 0.85, "description": "Consulting with engineering hiring managers on job requirements."}
        ],
        "tools_and_infrastructure": [
            {"name": "Advanced Excel / Spreadsheets", "weight": 0.8, "description": "Compensation benchmarking and headcount planning."}
        ],
        "recommended_projects": [
            "End-to-End Technical Recruiting Playbook with Competency Rubrics & Sourcing Guides",
            "Diversity & Inclusion (D&I) Talent Pipeline Strategy & Candidate Experience Audit",
            "Comprehensive 90-Day New Hire Onboarding Workflow & Feedback System"
        ]
    },

    "technical_writer": {
        "id": "technical_writer",
        "domain": "non_technical",
        "domain_label": "Media & Communications",
        "title": "Technical Writer & Documentation Strategist",
        "category": "Media & Communications",
        "icon": "FileText",
        "demand": "High",
        "growth_rate": "+19% (YoY)",
        "avg_salary": "$80,000 - $125,000 / yr (₹7 - ₹16 LPA)",
        "summary": "Transforms complex software architectures, APIs, and engineering concepts into crystal-clear documentation, developer guides, and user manuals.",
        "core_skills": [
            {"name": "Technical Writing", "weight": 1.0, "description": "Clear, structured, unambiguous documentation for technical and non-technical readers."},
            {"name": "API Documentation (Swagger/Postman)", "weight": 0.95, "description": "Documenting REST endpoints, payloads, query params, and status codes."},
            {"name": "Markdown & GitBook", "weight": 0.95, "description": "Docs-as-code authoring and structured static documentation sites."},
            {"name": "Release Notes & Knowledge Bases", "weight": 0.9, "description": "Writing user-facing changelogs, FAQs, and self-help articles."},
            {"name": "Git & GitHub", "weight": 0.85, "description": "Pull requests, review workflows, and version control for documentation."}
        ],
        "advanced_skills": [
            {"name": "Information Architecture", "weight": 0.85, "description": "Logical hierarchy, indexing, and searchability of large doc hubs."},
            {"name": "HTML5", "weight": 0.7, "description": "Customizing documentation web templates and layout."}
        ],
        "tools_and_infrastructure": [
            {"name": "Jira & Confluence", "weight": 0.8, "description": "Tracking documentation sprint tickets with engineering squads."}
        ],
        "recommended_projects": [
            "Comprehensive Developer Documentation Hub & API Reference for a SaaS Platform",
            "Interactive Software User Manual with Step-by-Step GIF Guides & FAQs",
            "Docs-as-Code Implementation with Markdown, GitHub Actions, and GitBook"
        ]
    },

    "customer_success_manager": {
        "id": "customer_success_manager",
        "domain": "non_technical",
        "domain_label": "Operations & Customer Experience",
        "title": "Customer Success & Client Solutions Manager",
        "category": "Operations & Customer Experience",
        "icon": "Users",
        "demand": "Very High",
        "growth_rate": "+25% (YoY)",
        "avg_salary": "$80,000 - $130,000 / yr (₹7 - ₹18 LPA)",
        "summary": "Manages enterprise post-sale relationships, drives user adoption, minimizes churn, and identifies expansion/upsell opportunities.",
        "core_skills": [
            {"name": "Client Relationship Management", "weight": 1.0, "description": "Executive business reviews (QBRs), customer health monitoring, and advocacy."},
            {"name": "CRM Management", "weight": 0.95, "description": "Tracking customer lifecycle, product usage metrics, and renewal dates."},
            {"name": "Stakeholder Management", "weight": 0.9, "description": "Resolving critical client escalations with engineering and product teams."},
            {"name": "KPI Tracking & Dashboards", "weight": 0.9, "description": "Monitoring Net Revenue Retention (NRR), Gross Churn, and NPS scores."},
            {"name": "Product Management", "weight": 0.8, "description": "Understanding software product features to conduct client onboarding training."}
        ],
        "advanced_skills": [
            {"name": "Salesforce CRM", "weight": 0.85, "description": "Account tracking and contract renewals."},
            {"name": "HubSpot CRM", "weight": 0.8, "description": "Customer communications and lifecycle ticket management."}
        ],
        "tools_and_infrastructure": [
            {"name": "Advanced Excel / Spreadsheets", "weight": 0.8, "description": "Cohort churn analysis and client health scoring models."}
        ],
        "recommended_projects": [
            "Enterprise Customer Onboarding & 90-Day Time-to-Value (TTV) Playbook",
            "Customer Health Scoring & Churn Prevention Early Warning System",
            "Executive Quarterly Business Review (QBR) Presentation & Upsell Strategy Deck"
        ]
    }
}
