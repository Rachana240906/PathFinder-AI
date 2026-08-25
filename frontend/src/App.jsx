import React, { useState, useEffect } from 'react';
import AppShell from './components/AppShell';
import LandingPage from './components/LandingPage';
import DashboardView from './components/DashboardView';
import ResumeView from './components/ResumeView';
import RoadmapView from './components/RoadmapView';
import PresentationModal from './components/PresentationModal';
import MentorComingSoon from './components/MentorComingSoon';

// ─── Static Multi-Domain Catalog (24 Roles) ──────────────────────────
const DEFAULT_ROLES = [
  // Technical Roles
  { id: 'ai_ml_engineer',        domain: 'technical', domain_label: 'Technical', title: 'AI / Machine Learning Engineer',         category: 'Artificial Intelligence & Data',    icon: 'Cpu',           demand: 'Very High', growth_rate: '+36%', avg_salary: '$115k - $165k' },
  { id: 'full_stack_developer',  domain: 'technical', domain_label: 'Technical', title: 'Full Stack Web Developer',               category: 'Software Engineering',              icon: 'Code2',         demand: 'Very High', growth_rate: '+24%', avg_salary: '$95k - $145k' },
  { id: 'data_scientist',        domain: 'technical', domain_label: 'Technical', title: 'Data Scientist / Analytics Lead',        category: 'Data Science & Analytics',         icon: 'BarChart3',     demand: 'High',      growth_rate: '+28%', avg_salary: '$105k - $155k' },
  { id: 'cloud_devops_engineer', domain: 'technical', domain_label: 'Technical', title: 'Cloud & DevOps Engineer',                category: 'Cloud & Infrastructure',            icon: 'Cloud',         demand: 'Very High', growth_rate: '+30%', avg_salary: '$110k - $160k' },
  { id: 'cybersecurity_analyst', domain: 'technical', domain_label: 'Technical', title: 'Cybersecurity & AppSec Specialist',      category: 'Information Security',              icon: 'ShieldCheck',   demand: 'Very High', growth_rate: '+32%', avg_salary: '$100k - $150k' },
  { id: 'frontend_engineer',     domain: 'technical', domain_label: 'Technical', title: 'Frontend / UI Engineer',                 category: 'Software Engineering',              icon: 'Monitor',       demand: 'High',      growth_rate: '+22%', avg_salary: '$90k - $135k' },
  { id: 'backend_engineer',      domain: 'technical', domain_label: 'Technical', title: 'Backend & Distributed Systems Engineer',  category: 'Software Engineering',              icon: 'Server',        demand: 'High',      growth_rate: '+25%', avg_salary: '$100k - $150k' },
  { id: 'data_engineer',         domain: 'technical', domain_label: 'Technical', title: 'Data Engineer & Pipeline Architect',     category: 'Data Engineering',                  icon: 'Database',      demand: 'Very High', growth_rate: '+29%', avg_salary: '$110k - $160k' },
  { id: 'ml_ops_engineer',       domain: 'technical', domain_label: 'Technical', title: 'MLOps & AI Platform Engineer',           category: 'AI Infrastructure',                 icon: 'Layers',        demand: 'Very High', growth_rate: '+38%', avg_salary: '$120k - $170k' },
  { id: 'mobile_developer',      domain: 'technical', domain_label: 'Technical', title: 'Mobile App Developer (iOS & Android)',   category: 'Mobile Engineering',                icon: 'Smartphone',    demand: 'High',      growth_rate: '+20%', avg_salary: '$90k - $140k' },
  { id: 'blockchain_engineer',   domain: 'technical', domain_label: 'Technical', title: 'Blockchain & Web3 Engineer',             category: 'Decentralized Tech',                icon: 'Link',          demand: 'Medium',    growth_rate: '+18%', avg_salary: '$110k - $165k' },
  { id: 'site_reliability_engineer', domain: 'technical', domain_label: 'Technical', title: 'Site Reliability Engineer (SRE)',  category: 'Cloud & Infrastructure',            icon: 'Layers',        demand: 'Very High', growth_rate: '+31%', avg_salary: '$115k - $165k' },

  // Non-Technical & Business / Design / Management Roles
  { id: 'product_manager',       domain: 'non_technical', domain_label: 'Product & Strategy',      title: 'Technical Product Manager / APM',        category: 'Product & Strategy',                icon: 'Briefcase',     demand: 'Very High', growth_rate: '+26%', avg_salary: '$105k - $155k' },
  { id: 'ui_ux_designer',        domain: 'non_technical', domain_label: 'Design & Creative',       title: 'UI/UX & Product Designer',               category: 'Design & Creative',                 icon: 'Sparkles',      demand: 'Very High', growth_rate: '+24%', avg_salary: '$85k - $135k' },
  { id: 'business_analyst',      domain: 'non_technical', domain_label: 'Business & Analytics',   title: 'Business Analyst & Operations Lead',      category: 'Business & Analytics',              icon: 'BarChart3',     demand: 'High',      growth_rate: '+21%', avg_salary: '$85k - $130k' },
  { id: 'financial_analyst',     domain: 'non_technical', domain_label: 'Finance & Economics',    title: 'Financial Analyst & Quantitative Modeler', category: 'Finance & Economics',              icon: 'TrendingUp',    demand: 'High',      growth_rate: '+19%', avg_salary: '$90k - $140k' },
  { id: 'digital_marketer',      domain: 'non_technical', domain_label: 'Marketing & Growth',     title: 'Digital Marketing & Growth Strategist',   category: 'Marketing & Growth',                icon: 'TrendingUp',    demand: 'High',      growth_rate: '+22%', avg_salary: '$75k - $125k' },
  { id: 'content_seo_strategist', domain: 'non_technical', domain_label: 'Media & Comms',          title: 'Content Strategy & SEO Specialist',       category: 'Media & Communications',            icon: 'FileText',      demand: 'High',      growth_rate: '+18%', avg_salary: '$70k - $115k' },
  { id: 'management_consultant', domain: 'non_technical', domain_label: 'Consulting & Strategy',  title: 'Management & Strategy Consultant',        category: 'Consulting & Strategy',             icon: 'Briefcase',     demand: 'Very High', growth_rate: '+20%', avg_salary: '$110k - $165k' },
  { id: 'scrum_project_manager', domain: 'non_technical', domain_label: 'Project Management',     title: 'Agile Project Manager & Scrum Master',    category: 'Project & Program Management',      icon: 'CheckCircle2',  demand: 'High',      growth_rate: '+23%', avg_salary: '$95k - $140k' },
  { id: 'sales_bd_specialist',   domain: 'non_technical', domain_label: 'Sales & Growth',          title: 'Business Development & Tech Sales Exec',  category: 'Sales & Business Development',      icon: 'Users',         demand: 'Very High', growth_rate: '+24%', avg_salary: '$80k - $145k' },
  { id: 'hr_talent_specialist',  domain: 'non_technical', domain_label: 'People & Talent',         title: 'Tech Talent Acquisition & HR Specialist', category: 'People & Talent',                  icon: 'Users',         demand: 'High',      growth_rate: '+20%', avg_salary: '$75k - $120k' },
  { id: 'technical_writer',      domain: 'non_technical', domain_label: 'Media & Comms',          title: 'Technical Writer & Documentation Lead',   category: 'Media & Communications',            icon: 'FileText',      demand: 'High',      growth_rate: '+19%', avg_salary: '$80k - $125k' },
  { id: 'customer_success_manager', domain: 'non_technical', domain_label: 'Customer Solutions',   title: 'Customer Success & Client Solutions Lead', category: 'Operations & Customer Experience', icon: 'Users',         demand: 'Very High', growth_rate: '+25%', avg_salary: '$80k - $130k' },
];

const PRESETS = {
  rachana: {
    contact: { name: 'Rachana Bonigala', email: 'rachana@example.com', phone: '+91 9876543210', linkedin: 'https://linkedin.com/in/rachanab', github: 'https://github.com/rachana-b' },
    education: [{ degree_or_institution: 'BTech in Artificial Intelligence, 3rd Year · SVNIT Surat', gpa: '8.8/10', year: '2024-2028' }],
    projects: ['PathFinder AI: Intelligent Student Success Ecosystem using FastAPI, React, PyTorch, and NLP', 'Computer Vision Real-Time Object Classifier with PyTorch and OpenCV'],
    skills: ['Python', 'PyTorch', 'Scikit-Learn', 'Deep Learning', 'Natural Language Processing', 'FastAPI', 'React.js', 'SQL', 'Pandas', 'NumPy', 'Git & GitHub', 'Docker'],
    profile_strength_score: 92,
    default_role: 'ai_ml_engineer',
  },
  fullstack: {
    contact: { name: 'Aditya Verma', email: 'aditya.v@example.com', phone: '+91 9123456780', linkedin: 'https://linkedin.com/in/adityav', github: 'https://github.com/adityav' },
    education: [{ degree_or_institution: 'B.Tech Computer Science, 3rd Year', gpa: '8.2/10', year: '2024-2028' }],
    projects: ['E-Commerce Platform with React, Node.js, and MongoDB', 'REST API microservice with Express and PostgreSQL'],
    skills: ['JavaScript', 'TypeScript', 'React.js', 'Node.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'MongoDB', 'Git & GitHub'],
    profile_strength_score: 84,
    default_role: 'full_stack_developer',
  },
  priya: {
    contact: { name: 'Priya Sharma', email: 'priya.pm@example.com', phone: '+91 9811223344', linkedin: 'https://linkedin.com/in/priyasharma', github: 'https://github.com/priyasharma' },
    education: [{ degree_or_institution: 'B.Tech & Minor in Management Studies, 3rd Year', gpa: '8.7/10', year: '2024-2028' }],
    projects: ['B2B SaaS Workflow Product Requirements Document (PRD) & Figma Prototype', 'Product Growth & Onboarding Funnel A/B Testing Case Study'],
    skills: ['Product Management', 'PRD & Spec Writing', 'Product Roadmapping', 'Agile & Scrum', 'User Research', 'Jira & Confluence', 'A/B Testing & Experimentation', 'Figma', 'Advanced Excel / Spreadsheets'],
    profile_strength_score: 88,
    default_role: 'product_manager',
  },
  sneha: {
    contact: { name: 'Sneha Kulkarni', email: 'sneha.ba@example.com', phone: '+91 9765432109', linkedin: 'https://linkedin.com/in/snehak', github: 'https://github.com/snehak' },
    education: [{ degree_or_institution: 'B.S. in Economics & Data Analytics', gpa: '8.6/10', year: '2024-2028' }],
    projects: ['Executive Business Intelligence Dashboard in Power BI with SQL', 'End-to-End Business Process Mapping & Optimization Plan with BPMN'],
    skills: ['Business Analysis', 'Advanced Excel / Spreadsheets', 'SQL', 'Power BI', 'Process Mapping (BPMN)', 'Tableau', 'Market Research', 'Competitive Analysis'],
    profile_strength_score: 86,
    default_role: 'business_analyst',
  },
  cyber: {
    contact: { name: 'Karan Patel', email: 'karan.sec@example.com', phone: '+91 9988776655', linkedin: 'https://linkedin.com/in/karanp', github: 'https://github.com/karanp' },
    education: [{ degree_or_institution: 'B.Tech Information Technology, 3rd Year', gpa: '8.5/10', year: '2024-2028' }],
    projects: ['Network Intrusion Detection System with Python and ML', 'Encrypted Password Manager CLI tool'],
    skills: ['Linux / Bash', 'Network Security', 'Wireshark', 'Python', 'Cryptography', 'Git & GitHub', 'OWASP Top 10 Security'],
    profile_strength_score: 80,
    default_role: 'cybersecurity_analyst',
  },
};

const EMPTY_PROFILE = {
  contact: { name: '', email: '', phone: '', linkedin: '', github: '' },
  education: [],
  projects: [],
  skills: [],
  profile_strength_score: 0,
  default_role: 'ai_ml_engineer',
};

// ─── App ──────────────────────────────────────────────────────────
export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try { const s = localStorage.getItem('pathfinder_user'); return s ? JSON.parse(s) : null; }
    catch { return null; }
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [roles, setRoles] = useState(DEFAULT_ROLES);
  const [selectedRole, setSelectedRole] = useState('ai_ml_engineer');
  const [profile, setProfile] = useState(() => {
    if (currentUser?.skills?.length) {
      return {
        ...EMPTY_PROFILE,
        contact: { name: currentUser.name || '', email: currentUser.email || '' },
        skills: currentUser.skills,
        profile_strength_score: 75,
        default_role: currentUser.target_role || 'ai_ml_engineer'
      };
    }
    return {
      ...EMPTY_PROFILE,
      contact: { name: currentUser?.name || '', email: currentUser?.email || '' },
      default_role: currentUser?.target_role || 'ai_ml_engineer'
    };
  });

  const [userSkills, setUserSkills] = useState(() => currentUser?.skills?.length ? currentUser.skills : []);
  const [gapAnalysis, setGapAnalysis] = useState(null);
  const [suitabilityData, setSuitabilityData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [roadmap, setRoadmap] = useState(null);
  const [backendStatus, setBackendStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pitchOpen, setPitchOpen] = useState(false);
  const [highlightUpload, setHighlightUpload] = useState(true);

  // 5-second highlight timer
  useEffect(() => {
    setHighlightUpload(true);
    const timer = setTimeout(() => {
      setHighlightUpload(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentUser?.email, activeTab]);

  useEffect(() => {
    fetchRoles();
    if (currentUser?.skills?.length) {
      const role = currentUser?.target_role || selectedRole;
      runGapAnalysis(currentUser.skills, role);
    }
  }, []);

  useEffect(() => {
    if (userSkills?.length > 0) {
      runGapAnalysis(userSkills, selectedRole);
    } else {
      setGapAnalysis(null);
      setSuitabilityData(null);
      setRecommendations([]);
      setRoadmap(null);
    }
  }, [selectedRole, userSkills]);

  const fetchRoles = async () => {
    try {
      const res = await fetch('/api/roles');
      if (res.ok) { const d = await res.json(); if (d.roles) setRoles(d.roles); setBackendStatus(true); }
    } catch { setBackendStatus(false); }
  };

  const runGapAnalysis = async (skills, roleId) => {
    if (!skills || skills.length === 0) {
      setGapAnalysis(null);
      setSuitabilityData(null);
      setRecommendations([]);
      setRoadmap(null);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/analyze-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills,
          target_role_id: roleId,
          candidate_name: profile?.contact?.name || currentUser?.name,
          candidate_email: profile?.contact?.email || currentUser?.email,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setGapAnalysis(data.gap_analysis);
      setRecommendations(data.explainable_recommendations || []);
      setRoadmap(data.personalized_roadmap);
      if (data.suitability) setSuitabilityData(data.suitability);
      setBackendStatus(true);
    } catch {
      simulateLocalAnalysis(skills, roleId);
    } finally {
      setLoading(false);
    }
  };

  const simulateLocalAnalysis = (skills, roleId) => {
    if (!skills || skills.length === 0) return;
    const isAI = roleId === 'ai_ml_engineer';
    const match = isAI ? 80 : roleId === 'full_stack_developer' ? 68 : 55;
    setGapAnalysis({
      role_id: roleId,
      role_title: isAI ? 'AI / Machine Learning Engineer' : roleId === 'full_stack_developer' ? 'Full Stack Web Developer' : 'Data Scientist / Analytics Lead',
      match_score: match,
      readiness_tier: match >= 70 ? 'Job Ready' : 'Near Ready',
      category_scores: { core: match >= 70 ? 90 : 70, advanced: match >= 70 ? 75 : 55, tools: 70 },
      mastered_skills: skills,
      missing_core_skills: isAI ? [{ name: 'Large Language Models (LLMs)' }] : [{ name: 'Next.js' }],
      missing_advanced_skills: isAI ? [{ name: 'Retrieval-Augmented Generation (RAG)' }] : [{ name: 'PostgreSQL' }],
      missing_tools: [{ name: 'Kubernetes' }],
    });
    setSuitabilityData({
      best_fit_role_id: 'ai_ml_engineer',
      best_fit_role_title: 'AI / Machine Learning Engineer',
      best_fit_match_score: match,
      all_role_evaluations: [
        { role_id: 'ai_ml_engineer', role_title: 'AI / ML Engineer', match_score: match, icon: 'Cpu' },
        { role_id: 'nlp_engineer', role_title: 'NLP Engineer', match_score: Math.max(0, match - 5), icon: 'MessageSquare' },
        { role_id: 'data_scientist', role_title: 'Data Scientist', match_score: Math.max(0, match - 10), icon: 'BarChart3' },
        { role_id: 'full_stack_developer', role_title: 'Full Stack Dev', match_score: Math.max(0, match - 20), icon: 'Code2' },
        { role_id: 'backend_engineer', role_title: 'Backend Eng.', match_score: Math.max(0, match - 25), icon: 'Server' },
      ],
    });
    setRoadmap({
      target_role_id: roleId,
      target_role: isAI ? 'AI / Machine Learning Engineer' : 'Full Stack Developer',
      match_score: match,
      skills_present: skills,
      skills_to_add: [{ name: 'LLMs' }, { name: 'RAG' }, { name: 'Kubernetes' }],
      phases: [
        {
          phase_id: 1, title: 'Phase 1: Core Competency & Foundational Bridging', duration: 'Weeks 1–3',
          focus: 'Bridge essential missing skills: LLMs, Prompt Engineering',
          milestone_goal: 'Establish working proficiency with foundational concepts.',
          topics: ['LLM prompting & function calling', 'Standardized Python & Git dev environment', 'FastAPI async fundamentals'],
          resources: [{ title: 'Hugging Face Documentation', url: 'https://huggingface.co', type: 'Documentation' }],
          project_milestone: 'Build a structured CLI tool using LLMs.',
        },
        {
          phase_id: 2, title: 'Phase 2: Framework Mastery & Microservice Architecture', duration: 'Weeks 4–6',
          focus: 'Hands-on integration with RAG & Vector Databases',
          milestone_goal: 'Develop production-ready modules with proper validation.',
          topics: ['Architecting RAG with ChromaDB', 'FastAPI microservice routing', 'Docker containerization basics'],
          resources: [{ title: 'FastAPI Interactive Docs', url: 'https://fastapi.tiangolo.com', type: 'Guide' }],
          project_milestone: 'Create a functional RAG knowledge assistant.',
        },
        {
          phase_id: 3, title: 'Phase 3: Advanced Features & Capstone Engineering', duration: 'Weeks 7–9',
          focus: 'End-to-end full stack ML pipelines',
          milestone_goal: 'Complete an impressive portfolio project solving a real problem.',
          topics: ['Performance optimization & latency benchmarks', 'Security and token cost controls'],
          resources: [{ title: 'DeepLearning.AI Short Courses', url: 'https://www.deeplearning.ai', type: 'Course' }],
          project_milestone: 'End-to-End Enterprise GenAI Solution with Docker.',
        },
        {
          phase_id: 4, title: 'Phase 4: Cloud Deployment & Job Readiness', duration: 'Weeks 10–12',
          focus: 'Cloud CI/CD deployment and interview preparation',
          milestone_goal: 'Deploy live application and publish open-source showcase.',
          topics: ['Docker and GitHub Actions CI/CD', 'Technical interview system design'],
          resources: [{ title: 'NeetCode Structured Algorithms', url: 'https://neetcode.io', type: 'Practice' }],
          project_milestone: 'Live deployed demo URL and open-source GitHub showcase.',
        },
      ],
    });
    setRecommendations([
      { skill_name: 'Large Language Models (LLMs)', priority: 'High Priority', why_it_matters: 'Fastest growing AI hiring area.', market_demand_stat: '+140% YoY demand surge', estimated_effort: '2 Weeks', actionable_tip: 'Start with Hugging Face transformers.' },
      { skill_name: 'Retrieval-Augmented Generation', priority: 'Competitive Advantage', why_it_matters: 'Required for 78% of GenAI roles.', market_demand_stat: 'In 78% of GenAI job posts', estimated_effort: '1–2 Weeks', actionable_tip: 'Build a RAG system with ChromaDB.' },
      { skill_name: 'Kubernetes', priority: 'Moderate Priority', why_it_matters: 'Industry-standard container orchestration.', market_demand_stat: '+45% job requirement increase', estimated_effort: '3–4 Weeks', actionable_tip: 'Complete the Kubernetes Basics tutorial.' },
    ]);
  };

  // ── Auth Handlers ──────────────────────────────────────────────
  const handleLogin = async ({ email, password }) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.detail || 'Invalid credentials'); }
      const { user } = await res.json();
      setCurrentUser(user); localStorage.setItem('pathfinder_user', JSON.stringify(user));
      const skills = user.skills || [];
      setUserSkills(skills);
      setProfile({
        ...EMPTY_PROFILE,
        contact: { name: user.name, email: user.email },
        skills: skills,
        profile_strength_score: skills.length > 0 ? Math.min(100, skills.length * 8) : 0,
        default_role: user.target_role || selectedRole
      });
      if (user.target_role) setSelectedRole(user.target_role);
      if (skills.length > 0) {
        runGapAnalysis(skills, user.target_role || selectedRole);
      } else {
        setGapAnalysis(null);
        setSuitabilityData(null);
        setRecommendations([]);
        setRoadmap(null);
      }
    } catch (err) {
      if (password.length >= 6) {
        const fb = { name: email.split('@')[0], email, target_role: 'ai_ml_engineer', skills: [] };
        setCurrentUser(fb); localStorage.setItem('pathfinder_user', JSON.stringify(fb));
        setUserSkills([]);
        setProfile({
          ...EMPTY_PROFILE,
          contact: { name: fb.name, email: fb.email },
          skills: [],
          profile_strength_score: 0,
          default_role: 'ai_ml_engineer'
        });
        setGapAnalysis(null);
        setSuitabilityData(null);
        setRecommendations([]);
        setRoadmap(null);
      } else throw err;
    }
  };

  const handleRegister = async ({ name, email, password, target_role }) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, target_role, skills: [] }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.detail || 'Registration failed'); }
      const { user } = await res.json();
      setCurrentUser(user); localStorage.setItem('pathfinder_user', JSON.stringify(user));
      if (target_role) setSelectedRole(target_role);
      setUserSkills([]);
      setProfile({
        ...EMPTY_PROFILE,
        contact: { name: user.name, email: user.email },
        skills: [],
        profile_strength_score: 0,
        default_role: target_role || 'ai_ml_engineer'
      });
      setGapAnalysis(null);
      setSuitabilityData(null);
      setRecommendations([]);
      setRoadmap(null);
    } catch {
      const fb = { name, email, target_role, skills: [] };
      setCurrentUser(fb); localStorage.setItem('pathfinder_user', JSON.stringify(fb));
      if (target_role) setSelectedRole(target_role);
      setUserSkills([]);
      setProfile({
        ...EMPTY_PROFILE,
        contact: { name, email },
        skills: [],
        profile_strength_score: 0,
        default_role: target_role || 'ai_ml_engineer'
      });
      setGapAnalysis(null);
      setSuitabilityData(null);
      setRecommendations([]);
      setRoadmap(null);
    }
  };

  const handleDemoLogin = (presetKey) => {
    const p = PRESETS[presetKey] || PRESETS.rachana;
    const user = { name: p.contact.name, email: p.contact.email, target_role: p.default_role, skills: p.skills };
    setCurrentUser(user); localStorage.setItem('pathfinder_user', JSON.stringify(user));
    setProfile(p); setUserSkills(p.skills); setSelectedRole(p.default_role);
    runGapAnalysis(p.skills, p.default_role);
  };

  const handleLogout = () => {
    setCurrentUser(null); localStorage.removeItem('pathfinder_user'); setActiveTab('dashboard');
    setUserSkills([]);
    setProfile(EMPTY_PROFILE);
    setGapAnalysis(null);
    setSuitabilityData(null);
    setRecommendations([]);
    setRoadmap(null);
  };

  const handleLoadPreset = (key) => {
    const p = PRESETS[key] || PRESETS.rachana;
    setProfile(p); setUserSkills(p.skills);
    const role = p.default_role || 'ai_ml_engineer';
    setSelectedRole(role); runGapAnalysis(p.skills, role);
  };

  // ── Landing Page ───────────────────────────────────────────────
  if (!currentUser) {
    return (
      <>
        <LandingPage
          onLogin={handleLogin}
          onRegister={handleRegister}
          onDemoLogin={handleDemoLogin}
          backendStatus={backendStatus}
          onOpenPitch={() => setPitchOpen(true)}
        />
        <PresentationModal isOpen={pitchOpen} onClose={() => setPitchOpen(false)} />
      </>
    );
  }

  // ── App Shell (Authenticated) ───────────────────────────────────
  return (
    <>
      <AppShell
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenPitch={() => setPitchOpen(true)}
        highlightUpload={highlightUpload && userSkills.length === 0}
      >
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <DashboardView
            roles={roles}
            selectedRole={selectedRole}
            onSelectRole={setSelectedRole}
            suitabilityData={suitabilityData}
            gapAnalysis={gapAnalysis}
            userSkills={userSkills}
            loading={loading}
            onAnalyze={runGapAnalysis}
            onGoToResume={() => setActiveTab('resume')}
            onGoToRoadmap={() => setActiveTab('roadmap')}
            currentUser={currentUser}
            highlightUpload={highlightUpload}
          />
        )}

        {/* Resume */}
        {activeTab === 'resume' && (
          <ResumeView
            profile={profile}
            setProfile={setProfile}
            userSkills={userSkills}
            setUserSkills={setUserSkills}
            onAnalyze={(skills) => { setUserSkills(skills); runGapAnalysis(skills, selectedRole); }}
            loading={loading}
            onLoadPreset={handleLoadPreset}
            highlightUpload={highlightUpload}
          />
        )}

        {/* Roadmap */}
        {activeTab === 'roadmap' && (
          <RoadmapView
            roadmap={roadmap}
            recommendations={recommendations}
            onGoToResume={() => setActiveTab('resume')}
          />
        )}

        {/* Mentors */}
        {activeTab === 'mentors' && <MentorComingSoon />}
      </AppShell>

      <PresentationModal isOpen={pitchOpen} onClose={() => setPitchOpen(false)} />
    </>
  );
}
