import React, { useState, useEffect } from 'react';
import {
  Zap, FolderGit2, Clock, ExternalLink, Lightbulb, Sparkles,
  Filter, Search, CheckCircle2, ChevronRight, UploadCloud, BookOpen
} from 'lucide-react';

const DIFFICULTY_STYLES = {
  Beginner: { bg: 'rgba(5,150,105,0.10)', color: '#059669', border: 'rgba(5,150,105,0.25)' },
  Intermediate: { bg: 'rgba(234,179,8,0.12)', color: '#b45309', border: 'rgba(234,179,8,0.3)' },
  Advanced: { bg: 'rgba(220,38,38,0.10)', color: '#dc2626', border: 'rgba(220,38,38,0.25)' },
};

export default function ProjectsView({
  roles = [],
  selectedRole,
  onSelectRole,
  userSkills = [],
  gapAnalysis,
  onGoToResume
}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const hasSkills = userSkills && userSkills.length > 0;
  const currentRoleObj = roles.find(r => r.id === selectedRole) || roles[0];
  const roleTitle = currentRoleObj?.title || 'Selected Career Track';

  const gapSkills = hasSkills && gapAnalysis ? [
    ...(gapAnalysis.missing_core_skills || []).map(s => typeof s === 'object' ? s.name : s),
    ...(gapAnalysis.missing_advanced_skills || []).map(s => typeof s === 'object' ? s.name : s),
    ...(gapAnalysis.missing_tools || []).map(s => typeof s === 'object' ? s.name : s),
  ] : [];

  useEffect(() => {
    if (!hasSkills) {
      setProjects([]);
      return;
    }
    setLoading(true);
    const skillsParam = encodeURIComponent(userSkills.join(','));
    fetch(`/api/recommendations/projects?role=${selectedRole}&skills=${skillsParam}`)
      .then(res => res.ok ? res.json() : Promise.reject('Failed to load'))
      .then(data => {
        setProjects(data.projects || []);
      })
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [selectedRole, userSkills, hasSkills]);

  const filteredProjects = projects.filter(p => {
    const matchesDiff = filterDifficulty === 'all' || p.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = !query ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.matched_skills || []).some(s => s.toLowerCase().includes(query));
    return matchesDiff && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-fade-up">

      {/* ── Page Banner Header ── */}
      <div
        className="rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 95% 20%, rgba(5,150,105,0.08) 0%, transparent 65%)' }}
        />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Zap size={13} /> Hands-on Project Intelligence
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Recommended Projects to Close Your Gap
            </h1>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Every recommended project is dynamically matched against your actual skill gaps for{' '}
              <span className="font-bold text-emerald-600">{roleTitle}</span> to make your resume portfolio job-ready.
            </p>
          </div>

          {/* Quick status pill */}
          <div className="flex flex-col items-start md:items-end flex-shrink-0 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Role</span>
            <span className="text-xs font-bold text-slate-800 mt-0.5 truncate max-w-[200px]">{roleTitle}</span>
            <span className="text-[10px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 size={11} /> {hasSkills ? `${gapSkills.length} Gaps Targeted` : 'Needs Resume Upload'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      {!hasSkills ? (
        <div
          className="rounded-3xl p-12 text-center shadow-sm"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-xs">
            <UploadCloud size={30} />
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Upload Resume to Unlock Project Recommendations</h2>
          <p className="text-xs mt-1.5 max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            PathFinder AI analyzes your current resume skills against target roles to recommend real-world portfolio projects tailored specifically to your missing competencies.
          </p>
          {onGoToResume && (
            <button
              onClick={onGoToResume}
              className="mt-5 px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-sm text-white transition-all hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              <UploadCloud size={14} /> Upload Resume Now <ChevronRight size={14} />
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">

          {/* Controls Bar: Role selector + Search + Difficulty Filter */}
          <div
            className="rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-sm"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            {/* Target Role Selector */}
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <span className="text-xs font-bold shrink-0 text-slate-500">Track:</span>
              <select
                value={selectedRole}
                onChange={e => onSelectRole && onSelectRole(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl text-xs outline-none bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                {roles.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.domain_label || r.domain})
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects or skills..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs outline-none bg-slate-50 border border-slate-200 text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              {['all', 'beginner', 'intermediate', 'advanced'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setFilterDifficulty(diff)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    filterDifficulty === diff
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="rounded-2xl p-6 bg-white border border-slate-200 animate-pulse space-y-4">
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-5/6" />
                  <div className="h-6 bg-slate-200 rounded w-1/2 mt-4" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div
              className="rounded-2xl p-10 text-center shadow-sm"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <FolderGit2 size={32} className="mx-auto mb-2 text-slate-400" />
              <p className="text-sm font-bold text-slate-800">No Projects Found</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No recommended projects match your current filters for {roleTitle}. Try adjusting your search query or selecting a different career track.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredProjects.map((project) => {
                const diffStyle = DIFFICULTY_STYLES[project.difficulty] || DIFFICULTY_STYLES.Intermediate;
                const matchCount = project.matched_skills?.length || 0;

                return (
                  <div
                    key={project.id}
                    className="rounded-2xl p-6 flex flex-col justify-between gap-4 transition-all bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md"
                  >
                    <div className="space-y-3">
                      {/* Top Row: Title + Difficulty */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
                          >
                            <FolderGit2 size={18} style={{ color: 'var(--accent)' }} />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 leading-snug">
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                                style={{
                                  background: diffStyle.bg,
                                  color: diffStyle.color,
                                  border: `1px solid ${diffStyle.border}`,
                                }}
                              >
                                {project.difficulty}
                              </span>
                              <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                                <Clock size={11} /> ~{project.estimated_hours} hrs
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Covers: Matched skill pills */}
                      {project.matched_skills?.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Target Gap Skills Covered:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.matched_skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="text-[11px] px-2.5 py-1 rounded-lg font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1"
                              >
                                <CheckCircle2 size={11} className="text-emerald-600" />
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Why this project box */}
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
                        <Lightbulb size={13} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong>Why build this:</strong> Covers {matchCount} missing skill gap{matchCount > 1 ? 's' : ''} specifically benchmarked for {roleTitle}.
                        </p>
                      </div>
                    </div>

                    {/* Bottom Resource Links */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        {project.github_starter_url && (
                          <a
                            href={project.github_starter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-slate-700 hover:text-emerald-600 flex items-center gap-1 transition-colors"
                          >
                            <FolderGit2 size={13} /> Starter Repo ↗
                          </a>
                        )}
                        {project.resource_links?.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink size={11} /> {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
