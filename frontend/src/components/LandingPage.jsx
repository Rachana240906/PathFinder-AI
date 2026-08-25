import React, { useState } from 'react';
import { Compass, ArrowRight, Eye, EyeOff, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

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
  { label: 'Rachana — AI/ML', preset: 'rachana' },
  { label: 'Aditya — Full Stack', preset: 'fullstack' },
  { label: 'Priya — Product Manager', preset: 'priya' },
  { label: 'Sneha — Business Analyst', preset: 'sneha' },
  { label: 'Karan — Security', preset: 'cyber' },
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
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Left: Brand Panel ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[500px] flex-shrink-0 p-10 relative overflow-hidden shadow-xs"
        style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}
      >
        {/* Ambient subtle emerald glow */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 20% 20%, rgba(5,150,105,0.06) 0%, transparent 65%)',
          }}
        />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
            style={{ background: 'var(--accent)', boxShadow: 'var(--shadow-accent)' }}
          >
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-base font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>PathFinder AI</p>
            <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>v2.1 · Team Twix (SVNIT)</p>
          </div>
        </div>

        {/* Main tagline */}
        <div className="relative z-10 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Sparkles size={12} /> Diverse Multi-Domain Career Platform
            </div>
            <h2 className="text-3xl font-black leading-tight" style={{ color: 'var(--text-primary)' }}>
              Discover the smartest path from{' '}
              <span style={{ color: 'var(--accent)' }}>skills to success.</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Explore 24+ industry career tracks across Technical, Product, Business, Design, Finance, and Strategy domains with AI resume intelligence.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-3">
            {[
              '24+ Career Tracks across Tech & Non-Tech Domains',
              'Real-Time Resume Parsing & Skill Taxonomy Audit',
              'Domain Switcher & Dynamic Skill Gap Matrix',
              'Personalized 12-Week Milestone Roadmaps',
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
                >
                  <CheckCircle2 size={12} style={{ color: 'var(--accent)' }} />
                </div>
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{feat}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-3 p-4 rounded-2xl shadow-xs"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            {[
              { value: '24+', label: 'Tech & Non-Tech' },
              { value: '150+', label: 'Skill Taxonomy' },
              { value: '12-Wk', label: 'Roadmap Plan' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-xl font-extrabold" style={{ color: 'var(--accent)' }}>{s.value}</p>
                <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs font-medium relative z-10" style={{ color: 'var(--text-muted)' }}>
          Golla Abhinav Kumar & Rachana Bonigala · SVNIT Surat
        </p>
      </div>

      {/* ── Right: Auth Panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-[440px] space-y-6 bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-lg">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden mb-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-xs"
              style={{ background: 'var(--accent)' }}
            >
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>PathFinder AI</span>
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {isSignUp ? 'Select from Technical or Business/Creative domains to get started.' : 'Sign in to access your dashboard & roadmaps.'}
            </p>
          </div>

          {/* Demo account quick-access */}
          <div
            className="p-3.5 rounded-2xl space-y-2 bg-slate-50 border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Explore Diverse Demo Accounts
              </p>
              <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                Instant Login
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.preset}
                  onClick={() => onDemoLogin && onDemoLogin(acc.preset)}
                  className="text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer bg-white text-emerald-700 border border-emerald-200 shadow-xs hover:bg-emerald-50"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">or continue below</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isSignUp && (
              <div>
                <label className="text-xs font-bold block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Rachana Bonigala"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs outline-none transition-all"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs outline-none transition-all"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div>
              <label className="text-xs font-bold block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs outline-none transition-all pr-10"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="text-xs font-bold block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Target Dream Role (Tech / Non-Tech)</label>
                <select
                  value={targetRole}
                  onChange={e => setTargetRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs outline-none transition-all"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <optgroup label="💻 Technical Career Tracks">
                    {TECH_ROLES.map(r => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="📈 Non-Technical, Business & Creative Tracks">
                    {NON_TECH_ROLES.map(r => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            )}

            {error && (
              <p className="text-xs px-3 py-2 rounded-xl font-medium bg-red-50 text-red-600 border border-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm text-white"
              style={{
                background: loading ? 'rgba(5,150,105,0.5)' : 'var(--accent)',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.9'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              {loading ? 'Please wait…' : (isSignUp ? 'Create Free Account' : 'Sign In')}
              {!loading && <ArrowRight size={14} />}
            </button>
          </form>

          <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="font-bold transition-colors cursor-pointer text-emerald-700 hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
