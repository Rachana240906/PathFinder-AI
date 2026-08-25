import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpenCheck, Users, Sparkles, Layers, Award, Target, Zap, CheckCircle2, Shield, UploadCloud, Compass, HelpCircle } from 'lucide-react';

const SLIDES = [
  {
    slideNumber: 1,
    title: "PathFinder AI — User Guide",
    subtitle: "Complete Platform Walkthrough & Navigation Guide",
    tagline: '"Discover how to navigate your career from current skills to your dream job."',
    team: [
      { name: "Golla Abhinav Kumar", role: "Team Lead" },
      { name: "Rachana Bonigala", role: "Team Member" }
    ],
    institution: "BTech in Artificial Intelligence, 3rd Year • SVNIT Surat",
    content: "Welcome to PathFinder AI! Follow this step-by-step interactive guide to learn how to make the most of our AI-powered career intelligence ecosystem."
  },
  {
    slideNumber: 2,
    title: "Step 1: Choose Your Domain & Dream Role",
    subtitle: "Explore 24+ Tech & Non-Tech Career Tracks",
    points: [
      "Domain Switcher: Easily toggle between Technical Roles (AI/ML, Full Stack, Cloud, DevOps, Cyber) and Non-Technical & Business Roles (Product, UI/UX Design, Business Analytics, Finance, Marketing).",
      "Real-Time Search: Search any role title, keyword, or tool to instantly find your dream job.",
      "Salary & Growth Data: View real-world market demand, YoY growth percentages, and salary benchmarks for every track.",
      "Target Role Selection: Click any career track card on the dashboard to immediately set it as your target."
    ]
  },
  {
    slideNumber: 3,
    title: "Step 2: Upload Your Resume for NLP Extraction",
    subtitle: "Zero Guesswork — Real-Time Skill Taxonomy Parsing",
    points: [
      "Instant Parsing: Upload your resume in PDF/DOCX format or paste plaintext into the Resume tab.",
      "150+ Skill Taxonomy: Our NLP engine extracts hard technical skills, business concepts, software tools, and design competencies.",
      "Clean 0% Baseline: New users start with a clean zero baseline — your metrics generate dynamically only once your resume is analyzed.",
      "Education & Projects: Automatically structures your university degree, CGPA, and portfolio project highlights."
    ]
  },
  {
    slideNumber: 4,
    title: "Step 3: Audit Readiness Score & Skill Gaps",
    subtitle: "Transparent, Weighted 3-Tier Gap Analysis",
    points: [
      "Visual Arc Gauge: See your overall Career Readiness percentage calculated in real time against your target role.",
      "Core Foundations (55% Weight): Essential core competencies required for entry-level competence.",
      "Advanced Specializations (30% Weight): High-impact domain skills that give you a competitive edge.",
      "Tools & Infrastructure (15% Weight): Practical platforms, frameworks, and deployment workflows.",
      "Acquired vs Missing: Green checkmarks for skills you've mastered, with clear red/blue tags for gaps you need to bridge."
    ]
  },
  {
    slideNumber: 5,
    title: "Step 4: Personalized 12-Week Learning Roadmap",
    subtitle: "Structured 4-Phase Milestone Trajectory",
    points: [
      "Phase 1 (Weeks 1-3): Foundational core competency bridging and standardized developer environment setup.",
      "Phase 2 (Weeks 4-6): Framework mastery, microservice architecture, and production testing.",
      "Phase 3 (Weeks 7-9): Advanced capstone engineering project with real-world industry applications.",
      "Phase 4 (Weeks 10-12): Cloud deployment, open-source publishing, ATS resume optimization, and interview readiness.",
      "Interactive Checklist: Click tasks to mark them complete with confetti feedback and live progress tracking!"
    ]
  },
  {
    slideNumber: 6,
    title: "Step 5: Resume Version History & Tracking Growth",
    subtitle: "Level Up Your Profile As You Learn",
    points: [
      "Version History Log: Every resume you upload is timestamped and saved in your Resume Version History.",
      "Track Score Growth: As you complete roadmap milestones and learn new skills, upload an updated resume to watch your Readiness Score rise from 0% to 100%.",
      "Switch & Compare: Easily restore or review previous resume versions with a single click.",
      "Continuous Optimization: Keep your profile synchronized with real-time job market requirements."
    ]
  },
  {
    slideNumber: 7,
    title: "Step 6: Career Suitability & Pivot Recommendations",
    subtitle: "Discover Your Best Natural Fit Across All 24 Roles",
    points: [
      "Multi-Role Benchmarking: The AI engine simultaneously scores your resume against all 24 industry career tracks.",
      "Best-Fit Role Discovery: Identifies which career path offers the highest immediate overlap with your existing skill set.",
      "Smart Pivot Insights: Recommends alternative high-compatibility roles where your skills provide an instant advantage.",
      "Explainable AI: Clear written rationale explaining why a role suits you and what exact skills give you the edge."
    ]
  },
  {
    slideNumber: 8,
    title: "Step 7: Mentors, Mock Interviews & Opportunities",
    subtitle: "Connect with Industry Engineers & Smart India Hackathon Tracks",
    points: [
      "1-on-1 Alumni Mentors: Guidance from verified engineers and product managers at Google, Microsoft, Stripe, and top startups.",
      "AI Mock Interviews: Practice coding rounds, system design, and behavioral STAR questions with instant feedback.",
      "SIH Problem Statements: Direct alignment with Smart India Hackathon problem statements and innovation tracks.",
      "Verified Referrals: Completing portfolio roadmap milestones unlocks fast-track referral reviews."
    ]
  },
  {
    slideNumber: 9,
    title: "Quick 5-Step Action Checklist",
    subtitle: "Your Roadmap to Career Success",
    points: [
      "1️⃣ Sign In / Try Demo: Access your account or try instant demo presets.",
      "2️⃣ Select Domain: Choose Technical or Non-Technical & pick your Dream Role.",
      "3️⃣ Upload Resume: Upload your resume in the Resume tab for instant parsing.",
      "4️⃣ Check Gap Analysis: Review your Readiness Gauge and identify missing bridge skills.",
      "5️⃣ Complete 12-Week Roadmap: Follow the weekly checkpoint tasks and upload updated resumes to track your growth!"
    ]
  }
];

export default function PresentationModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slide = SLIDES[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col h-[570px]">
        {/* Top bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
            <BookOpenCheck className="w-4 h-4 text-emerald-600" />
            <span>PathFinder AI Instructions & App Flow — Guide {currentSlide + 1} of {SLIDES.length}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-900 flex items-center justify-center cursor-pointer transition-colors"
            title="Close Guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Body */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center overflow-y-auto bg-white">
          {/* Slide 1: Welcome */}
          {slide.slideNumber === 1 && (
            <div className="text-center space-y-5">
              <div className="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                Team Twix • SVNIT Surat
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg text-emerald-700 font-bold">
                {slide.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 italic max-w-xl mx-auto">
                {slide.tagline}
              </p>
              <div className="pt-2 flex justify-center gap-4 flex-wrap">
                {slide.team.map((m, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-2xl text-left shadow-xs">
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900">{m.name}</p>
                    <p className="text-[11px] font-bold text-emerald-600">{m.role}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">{slide.institution}</p>
            </div>
          )}

          {/* Slides 2 to 9: Instructions and Flow */}
          {slide.slideNumber > 1 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  App Guide · Step {slide.slideNumber - 1} of 8
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{slide.title}</h2>
                <p className="text-xs sm:text-sm text-emerald-700 font-bold mt-0.5">{slide.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {(slide.points || []).map((pt, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-emerald-300 transition-colors">
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      📌 {pt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-slate-700 text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Dots */}
          <div className="flex items-center space-x-1.5">
            {SLIDES.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  currentSlide === idx ? 'bg-emerald-600 w-5' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(Math.min(SLIDES.length - 1, currentSlide + 1))}
            disabled={currentSlide === SLIDES.length - 1}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold flex items-center space-x-1 cursor-pointer shadow-xs transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
