import React, { useState, useEffect } from 'react';
import {
  Cpu, Code2, BarChart3, Cloud, ShieldCheck, Monitor,
  Server, Smartphone, Link, MessageSquare, Database, Layers,
  Gamepad2, Briefcase, CheckCircle, TrendingUp, ChevronRight,
  UploadCloud, Sparkles, AlertCircle, Search, Filter, PlayCircle
} from 'lucide-react';
import RecommendedProjects from './RecommendedProjects';

const iconMap = {
  Cpu, Code2, BarChart3, Cloud, ShieldCheck, Monitor,
  Server, Smartphone, Link, MessageSquare, Database, Layers,
  Gamepad2, Briefcase,
};

export default function DashboardView({
  roles = [],
  selectedRole,
  onSelectRole,
  suitabilityData,
  gapAnalysis,
  userSkills = [],
  loading,
  onAnalyze,
  onGoToResume,
  onGoToProjects,
  currentUser,
  highlightUpload = false,
}) {
  const [domainFilter, setDomainFilter] = useState('all'); // 'all', 'technical', 'non_technical'
  const [searchQuery, setSearchQuery] = useState('');
  const [gapAnalyzed, setGapAnalyzed] = useState(false);

  // Reset gated state whenever the selected role changes
  useEffect(() => {
    setGapAnalyzed(false);
  }, [selectedRole]);

  const hasSkills = userSkills && userSkills.length > 0;
  
  const scoreMap = {};
  if (hasSkills && suitabilityData?.all_role_evaluations) {
    suitabilityData.all_role_evaluations.forEach(item => {
      scoreMap[item.role_id] = item.match_score;
    });
  }

  const sortedRoles = [...roles].sort((a, b) => {
    if (!hasSkills) return 0;
    return (scoreMap[b.id] ?? 0) - (scoreMap[a.id] ?? 0);
  });

  const filteredRoles = sortedRoles.filter(role => {
    const matchesDomain = domainFilter === 'all' 
      ? true 
      : (domainFilter === 'technical' ? (role.domain === 'technical' || !role.domain) : role.domain === 'non_technical');
    
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = !query || 
      role.title?.toLowerCase().includes(query) || 
      role.category?.toLowerCase().includes(query) ||
      role.domain_label?.toLowerCase().includes(query);
    
    return matchesDomain && matchesQuery;
  });

  const bestFit = hasSkills ? suitabilityData?.best_fit_role_title : null;
  const score = hasSkills ? (gapAnalysis?.match_score ?? (suitabilityData?.best_fit_match_score ?? 0)) : 0;
  const categories = hasSkills ? (gapAnalysis?.category_scores ?? { core: 0, advanced: 0, tools: 0 }) : { core: 0, advanced: 0, tools: 0 };
  const masteredSkills = hasSkills ? (gapAnalysis?.mastered_skills ?? userSkills) : [];
  const missingCore = hasSkills ? (gapAnalysis?.missing_core_skills ?? []) : [];
  const missingAdv = hasSkills ? (gapAnalysis?.missing_advanced_skills ?? []) : [];
  const missingTools = hasSkills ? (gapAnalysis?.missing_tools ?? []) : [];

  // SVG Arc gauge parameters
  const radius = 52;
  const cx = 70, cy = 70;
  const circumference = Math.PI * radius; // half circle
  const arcOffset = circumference - (circumference * score) / 100;

  return (
    <div className="space-y-5 animate-fade-up">

      {/* ── Welcome Hero ── */}
      <div
        className="rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5 relative overflow-hidden shadow-sm"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 90% 50%, rgba(5,150,105,0.06) 0%, transparent 60%)' }}
        />
        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
              Student Career Intelligence
            </span>
            {!hasSkills && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Setup Required
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Welcome, {currentUser?.name || 'Student'}
          </h1>
          <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {hasSkills
              ? (bestFit ? `Top career match: ${bestFit}` : 'Your profile is analyzed against target roles.')
              : 'Upload your resume to calculate your real-time Readiness Score, benchmark skill gaps, and unlock your 12-week roadmap.'}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {/* Upload Resume Button with 5-Second Highlight */}
            <div className="relative inline-flex items-center">
              <button
                onClick={onGoToResume}
                className={`text-xs px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                  highlightUpload ? 'animate-upload-highlight ring-4 ring-emerald-400/40 font-extrabold' : ''
                }`}
                style={{
                  background: 'var(--accent)',
                  color: '#ffffff',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                <UploadCloud size={15} />
                <span>Upload Resume</span>
                <ChevronRight size={13} />
              </button>
              
              {highlightUpload && (
                <span className="absolute -top-3 -right-2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              )}
            </div>

            {hasSkills && gapAnalysis && (
              <button
                onClick={onGoToResume}
                className="text-xs px-4 py-2 rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                View Resume & Roadmap <ChevronRight size={13} />
              </button>
            )}

            {highlightUpload && !hasSkills && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 animate-pulse flex items-center gap-1">
                <Sparkles size={12} /> Start here by uploading your resume
              </span>
            )}
          </div>
        </div>

        {/* Arc gauge */}
        <div className="relative z-10 flex-shrink-0 flex flex-col items-center bg-slate-50/80 px-4 py-3 rounded-2xl border border-slate-100">
          <svg width="140" height="85" viewBox="0 0 140 85">
            {/* Background arc */}
            <path
              d="M 18 74 A 52 52 0 0 1 122 74"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Colored arc */}
            <path
              d="M 18 74 A 52 52 0 0 1 122 74"
              fill="none"
              stroke={score > 0 ? 'var(--accent)' : '#94a3b8'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${circumference}`}
              strokeDashoffset={`${arcOffset}`}
              style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }}
            />
            {/* Score text */}
            <text x="70" y="68" textAnchor="middle" fill="var(--text-primary)" fontSize="22" fontWeight="800" fontFamily="Inter, sans-serif">
              {score}%
            </text>
          </svg>
          <p className="text-[11px] font-bold mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Career Readiness
          </p>
          <p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>
            {hasSkills ? (gapAnalysis?.readiness_tier || 'Analyzed') : '0% · Awaiting Resume'}
          </p>
        </div>
      </div>

      {/* ── Main Grid: Roles Left | Skills Right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Role Selection Panel */}
        <div
          className="rounded-2xl overflow-hidden shadow-sm flex flex-col"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          {/* Header */}
          <div className="px-5 py-4 space-y-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span>Career Tracks & Dream Roles</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {roles.length} Roles
                  </span>
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Filter by domain or search to find your target dream career
                </p>
              </div>
              {!hasSkills && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                  0% Readiness
                </span>
              )}
            </div>

            {/* Domain Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              {[
                { id: 'all', label: `✨ All (${roles.length})` },
                { id: 'technical', label: `💻 Tech (${roles.filter(r => r.domain === 'technical' || !r.domain).length})` },
                { id: 'non_technical', label: `📈 Non-Tech & Business (${roles.filter(r => r.domain === 'non_technical').length})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setDomainFilter(tab.id)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                    domainFilter === tab.id
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search dream role, e.g. Product Manager, AI, Finance, UI/UX..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl text-xs outline-none bg-slate-50 border border-slate-200 text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Roles List */}
          <div className="divide-y max-h-[380px] overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role) => {
                const Icon = iconMap[role.icon] || Code2;
                const isSelected = selectedRole === role.id;
                const matchScore = hasSkills ? (scoreMap[role.id] ?? 0) : 0;
                const isNonTech = role.domain === 'non_technical';

                return (
                  <div
                    key={role.id}
                    onClick={() => onSelectRole(role.id)}
                    className="flex items-center gap-3 px-5 py-3 cursor-pointer transition-all"
                    style={{
                      background: isSelected ? 'rgba(5,150,105,0.08)' : 'transparent',
                      borderLeft: isSelected ? '3px solid var(--accent)' : '3px solid transparent',
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs"
                      style={{
                        background: isSelected ? 'var(--accent)' : (isNonTech ? 'rgba(124,58,237,0.1)' : 'var(--bg-card)'),
                        color: isSelected ? '#ffffff' : (isNonTech ? '#7c3aed' : 'var(--text-secondary)'),
                      }}
                    >
                      <Icon size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p
                          className="text-xs font-bold truncate"
                          style={{ color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }}
                        >
                          {role.title}
                        </p>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                            isNonTech ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-sky-50 text-sky-700 border border-sky-200'
                          }`}
                        >
                          {role.domain_label || (isNonTech ? 'Business / Creative' : 'Technical')}
                        </span>
                      </div>
                      <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>
                        {role.category} · {role.growth_rate} YoY {role.avg_salary ? `· ${role.avg_salary}` : ''}
                      </p>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0"
                      style={{
                        background: hasSkills
                          ? (matchScore >= 70 ? 'rgba(5,150,105,0.12)' : matchScore >= 50 ? 'rgba(234,179,8,0.15)' : 'rgba(0,0,0,0.04)')
                          : 'rgba(0,0,0,0.04)',
                        color: hasSkills
                          ? (matchScore >= 70 ? 'var(--accent)' : matchScore >= 50 ? '#b45309' : 'var(--text-muted)')
                          : 'var(--text-muted)',
                      }}
                    >
                      {hasSkills ? `${matchScore}%` : '0%'}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center text-xs text-slate-500">
                No roles match "{searchQuery}". Try searching for another keyword or switch domain tabs.
              </div>
            )}
          </div>

          {/* Analyze Button */}
          <div className="px-5 py-4 mt-auto" style={{ borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => {
                if (!hasSkills) {
                  onGoToResume();
                } else if (onAnalyze) {
                  setGapAnalyzed(true);
                  onAnalyze(userSkills, selectedRole);
                }
              }}
              disabled={loading}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                highlightUpload && !hasSkills ? 'animate-upload-highlight ring-2 ring-emerald-400' : ''
              }`}
              style={{
                background: loading ? 'rgba(5,150,105,0.4)' : 'var(--accent)',
                color: '#ffffff',
                cursor: loading ? 'wait' : 'pointer',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.9'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              {loading ? 'Analyzing…' : hasSkills ? `Analyze Gap for Selected Role (${roles.find(r => r.id === selectedRole)?.title || 'Target Role'})` : 'Upload Resume to Run Gap Analysis'}
              {!loading && (hasSkills ? <TrendingUp size={14} /> : <UploadCloud size={14} />)}
            </button>
          </div>
        </div>

        {/* Skill Gap Breakdown Panel */}
        <div className="space-y-5">

          {/* ── Not yet analyzed placeholder ── */}
          {!gapAnalyzed && (
            <div
              className="rounded-2xl p-8 text-center shadow-sm"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
              >
                <PlayCircle size={24} style={{ color: 'var(--accent)' }} />
              </div>
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {hasSkills ? 'Ready to Analyze' : 'Upload Resume First'}
              </p>
              <p className="text-xs mt-1 max-w-xs mx-auto" style={{ color: 'var(--text-muted)' }}>
                {hasSkills
                  ? 'Click "Analyze Gap" below to see your Skill Gap Breakdown, Acquired Skills, and Gaps to Bridge.'
                  : 'Upload your resume on the Resume page, then select a role and click Analyze Gap.'}
              </p>
            </div>
          )}

          {/* ── Cards shown only after Analyze is clicked ── */}
          {gapAnalyzed && (
            <>

          {/* Category bars */}
          <div
            className="rounded-2xl p-5 shadow-sm"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                Skill Gap Breakdown
              </h2>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                style={{
                  background: hasSkills ? 'var(--accent-dim)' : 'rgba(0,0,0,0.05)',
                  color: hasSkills ? 'var(--accent)' : 'var(--text-muted)'
                }}
              >
                {hasSkills ? (gapAnalysis?.readiness_tier || 'Calculated') : '0% · Needs Resume'}
              </span>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Core Foundations', value: categories.core, color: 'var(--accent)', weight: '55%' },
                { label: 'Advanced Skills',  value: categories.advanced, color: '#0284c7', weight: '30%' },
                { label: 'Tools & DevOps',   value: categories.tools,  color: '#7c3aed', weight: '15%' },
              ].map(({ label, value, color, weight }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                      {label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>weight {weight}</span>
                      <span className="text-xs font-bold" style={{ color: hasSkills ? color : 'var(--text-muted)' }}>
                        {value}%
                      </span>
                    </div>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: '#e2e8f0' }}
                  >
                    <div
                      className="h-full rounded-full bar-fill"
                      style={{ width: `${value}%`, background: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mastered skills view */}
          <div
            className="rounded-2xl p-5 shadow-sm"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                Acquired Skills
              </h3>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                style={{
                  background: hasSkills ? 'var(--accent-dim)' : 'rgba(0,0,0,0.04)',
                  color: hasSkills ? 'var(--accent)' : 'var(--text-muted)'
                }}
              >
                {masteredSkills.length} skills
              </span>
            </div>

            {hasSkills ? (
              <div className="flex flex-wrap gap-1.5">
                {masteredSkills.slice(0, 12).map((s, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5"
                    style={{
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <CheckCircle size={11} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    {s}
                  </span>
                ))}
                {masteredSkills.length > 12 && (
                  <span className="text-[11px] px-2.5 py-1 rounded-lg font-medium" style={{ color: 'var(--text-muted)' }}>
                    +{masteredSkills.length - 12} more
                  </span>
                )}
              </div>
            ) : (
              <div className="text-center py-4 px-2 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  No skills added yet
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Upload your resume to extract skills automatically
                </p>
                <button
                  onClick={onGoToResume}
                  className={`mt-2.5 text-xs px-3 py-1.5 rounded-lg font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                    highlightUpload ? 'animate-upload-highlight' : ''
                  }`}
                  style={{ background: 'var(--accent)', color: '#ffffff' }}
                >
                  <UploadCloud size={13} /> Upload Resume
                </button>
              </div>
            )}
          </div>

          {/* Missing skills / Gaps to bridge view */}
          <div
            className="rounded-2xl p-5 shadow-sm"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Gaps to Bridge
            </h3>
            {hasSkills && (missingCore.length > 0 || missingAdv.length > 0 || missingTools.length > 0) ? (
              <div className="space-y-2">
                {[
                  { label: 'Core', items: missingCore, color: '#dc2626' },
                  { label: 'Advanced', items: missingAdv, color: '#0284c7' },
                  { label: 'Tools', items: missingTools, color: '#7c3aed' },
                ].map(({ label, items, color }) => items.length > 0 && (
                  <div key={label} className="flex items-start gap-2 flex-wrap">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded mt-0.5 flex-shrink-0"
                      style={{ background: 'rgba(0,0,0,0.05)', color }}
                    >
                      {label}
                    </span>
                    {items.map((s, i) => {
                      const name = typeof s === 'object' ? s.name : s;
                      return (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-0.5 rounded-md font-medium"
                          style={{
                            background: 'var(--bg-card)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          {name}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 px-2 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  {hasSkills ? 'All primary skills matched!' : 'Awaiting Resume Analysis'}
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {hasSkills ? 'You are well aligned with this track.' : 'Gaps will be identified against the selected career track after upload.'}
                </p>
              </div>
            )}
          </div>

          {/* ── CTA Card to Recommended Projects Page ── */}
          <div
            className="rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-600" />
                <span>Recommended Projects Page</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Explore dedicated hands-on project recommendations to bridge your missing skills.
              </p>
            </div>
            <button
              onClick={onGoToProjects}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ChevronRight size={13} />
            </button>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

