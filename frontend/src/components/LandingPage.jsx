import React, { useState } from 'react';
import {
  Compass, ArrowRight, Eye, EyeOff, ChevronRight, Sparkles, CheckCircle2,
  Lock, Mail, User, Briefcase, Code2, Cpu, Layers, ShieldCheck, Zap,
  BarChart3, Award, Rocket, Check, Play
} from 'lucide-react';

const TECH_ROLES = [
  { id: 'ai_ml_engineer',        label: 'AI / Machine Learning Engineer' },
  { id: 'full_stack_developer',  label: 'Full Stack Web Developer' },
  { id: 'data_scientist',        label: 'Data Scientist / Analytics Lead' },
  { id: 'cloud_devops_engineer', label: 'Cloud & DevOps Engineer' },
  { id: 'cybersecurity_analyst', label: 'Cybersecurity & AppSec Specialist' },
  { id: 'frontend_engineer',     label: 'Frontend / UI Engineer' },
  { id: 'backend_engineer',      label: 'Backend & Distributed Systems' },
  { id: 'data_engineer',         label: 'Data Engineer & Pipeline Architect' },
  { id: 'ml_ops_engineer',       label: 'MLOps & AI Platform Engineer' },
  { id: 'mobile_developer',      label: 'Mobile App Developer (iOS/Android)' },
  { id: 'blockchain_engineer',   label: 'Blockchain & Web3 Engineer' },
  { id: 'site_reliability_engineer', label: 'Site Reliability Engineer (SRE)' },
];

const NON_TECH_ROLES = [
  { id: 'product_manager',       label: 'Technical Product Manager / APM' },
  { id: 'ui_ux_designer',        label: 'UI/UX & Product Designer' },
  { id: 'business_analyst',      label: 'Business Analyst & Operations Lead' },
  { id: 'financial_analyst',     label: 'Financial Analyst & Quantitative Modeler' },
  { id: 'digital_marketer',      label: 'Digital Marketing & Growth Strategist' },
  { id: 'content_seo_strategist', label: 'Content Strategy & SEO Specialist' },
  { id: 'management_consultant', label: 'Management & Strategy Consultant' },
  { id: 'scrum_project_manager', label: 'Agile Project Manager & Scrum Master' },
  { id: 'sales_bd_specialist',   label: 'Business Development & Tech Sales' },
  { id: 'hr_talent_specialist',  label: 'Tech Talent Acquisition & HR Specialist' },
  { id: 'technical_writer',      label: 'Technical Writer & Documentation Lead' },
  { id: 'customer_success_manager', label: 'Customer Success & Client Solutions' },
];

const DEMO_ACCOUNTS = [
  { label: 'Rachana — AI/ML', preset: 'rachana', role: 'AI / ML Engineer' },
  { label: 'Aditya — Full Stack', preset: 'fullstack', role: 'Full Stack Dev' },
  { label: 'Priya — Product Manager', preset: 'priya', role: 'Product Manager' },
  { label: 'Sneha — Business Analyst', preset: 'sneha', role: 'Business Analyst' },
  { label: 'Karan — Security', preset: 'cyber', role: 'Cybersecurity' },
];

export default function LandingPage({ onLogin, onRegister, onDemoLogin, backendStatus, onOpenPitch }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [targetRole, setTargetRole] = useState('ai_ml_engineer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) { setError('Email and password are required.'); return; }
    if (isSignUp && !name.trim()) { setError('Please enter your name.'); return; }
    if (isSignUp && password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setLoading(true);
    try {
      if (isSignUp) await onRegister({ name, email, password, target_role: targetRole });
      else await onLogin({ email, password });
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white relative overflow-hidden font-sans select-none">

      {/* ── Background Graphic Glow Orbs & Subtle Grid Overlay ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Glowing Orb Top Left */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        {/* Glowing Orb Bottom Right */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        {/* Center Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]" />
        {/* Tech Grid Lines */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* ── Top Header ── */}
      <header className="relative z-10 border-b border-slate-800/80 backdrop-blur-md bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Compass className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">PathFinder AI</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  v2.1
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Team Twix • SVNIT Surat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPitch}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={14} className="text-emerald-400" />
              <span>Pitch Deck</span>
            </button>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 font-semibold px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Engine Status: Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Hero & Login Split Section ── */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Headline, Value Proposition & Graphic Mockups */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
              <Zap size={13} className="text-emerald-400 fill-emerald-400" />
              <span>AI-POWERED STUDENT SUCCESS ECOSYSTEM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Discover the smartest path from{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                skills to success.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Benchmarking <span className="text-white font-semibold">24+ industry career tracks</span> across Tech, Product, Business, Design & Strategy. Parse your resume, unlock real-time readiness scores, build your 12-week roadmap, and receive hands-on project recommendations.
            </p>
          </div>

          {/* Quick Metric Badges */}
          <div className="grid grid-cols-3 gap-4 max-w-xl">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">24+</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Career Tracks</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
              <p className="text-2xl sm:text-3xl font-black text-teal-400">150+</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Skill Taxonomy</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
              <p className="text-2xl sm:text-3xl font-black text-cyan-400">12-Wk</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Milestone Plans</p>
            </div>
          </div>

          {/* Interactive Feature Cards Graphics Preview */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Platform Core Pillars</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <BarChart3 size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Skill Gap Matrix</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Core, Advanced & Tool scoring</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/30">
                  <Rocket size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">12-Week Roadmap</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Phase-by-phase action plan</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                  <Code2 size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Project Matcher</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Hands-on projects for your gaps</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Award size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Explainable AI</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Transparent recommendation rationale</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Modern Glassmorphism Sign In / Sign Up Form Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[440px] bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
            {/* Subtle Top Glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {isSignUp ? 'Create Your Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isSignUp ? 'Select target domain & role to get started.' : 'Sign in to access your intelligence dashboard & roadmap.'}
              </p>
            </div>

            {/* Instant Demo Accounts Switcher */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Instant Demo Login
                </span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  1-Click Access
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {DEMO_ACCOUNTS.map(acc => (
                  <button
                    key={acc.preset}
                    onClick={() => onDemoLogin && onDemoLogin(acc.preset)}
                    className="text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer bg-slate-800 text-emerald-400 border border-slate-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 shadow-xs"
                  >
                    {acc.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-700/80" />
              <span className="text-[11px] font-semibold text-slate-400">or sign in with credentials</span>
              <div className="flex-1 h-px bg-slate-700/80" />
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Rachana Bonigala"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-900/80 border border-slate-700 text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-900/80 border border-slate-700 text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs bg-slate-900/80 border border-slate-700 text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Target Dream Role</label>
                  <select
                    value={targetRole}
                    onChange={e => setTargetRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900/80 border border-slate-700 text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  >
                    <optgroup label="💻 Technical Career Tracks">
                      {TECH_ROLES.map(r => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="📈 Non-Technical & Business Tracks">
                      {NON_TECH_ROLES.map(r => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              )}

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-xs font-black tracking-wide text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all cursor-pointer shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : (isSignUp ? 'Create Free Account' : 'Sign In Now')}
                {!loading && <ArrowRight size={15} />}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400">
              {isSignUp ? 'Already registered? ' : "Don't have an account? "}
              <button
                onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                className="font-bold text-emerald-400 hover:underline cursor-pointer"
              >
                {isSignUp ? 'Sign In' : 'Sign Up Free'}
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* ── Bottom Footer Strip ── */}
      <footer className="relative z-10 border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>Golla Abhinav Kumar & Rachana Bonigala • SVNIT Surat • Built with FastAPI, React, SQLite & PyTorch</p>
      </footer>
    </div>
  );
}
