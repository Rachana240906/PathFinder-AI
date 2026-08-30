import React, { useEffect, useState, useRef } from 'react';
import { FolderGit2, Clock, ExternalLink, Lightbulb, Zap, ChevronRight } from 'lucide-react';

// Check reduced-motion preference once at module level
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const DIFFICULTY_STYLES = {
  Beginner: { bg: 'rgba(5,150,105,0.10)', color: '#059669', border: 'rgba(5,150,105,0.25)' },
  Intermediate: { bg: 'rgba(234,179,8,0.12)', color: '#b45309', border: 'rgba(234,179,8,0.3)' },
  Advanced: { bg: 'rgba(220,38,38,0.10)', color: '#dc2626', border: 'rgba(220,38,38,0.25)' },
};

function SkeletonCard({ index }) {
  return (
    <div
      className="rounded-2xl p-5 overflow-hidden"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      {/* Shimmer overlay */}
      <div
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: prefersReducedMotion ? 'none' : 'shimmer 1.4s infinite',
          animationDelay: `${index * 120}ms`,
          borderRadius: '12px',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />
      <div className="space-y-3 relative">
        <div className="h-4 rounded-lg w-3/4" style={{ background: '#e2e8f0' }} />
        <div className="h-3 rounded-lg w-full" style={{ background: '#f1f5f9' }} />
        <div className="h-3 rounded-lg w-5/6" style={{ background: '#f1f5f9' }} />
        <div className="flex gap-2 mt-4">
          <div className="h-5 w-16 rounded-lg" style={{ background: '#e2e8f0' }} />
          <div className="h-5 w-20 rounded-lg" style={{ background: '#f1f5f9' }} />
          <div className="h-5 w-16 rounded-lg" style={{ background: '#f1f5f9' }} />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, roleTitle, index }) {
  const diffStyle = DIFFICULTY_STYLES[project.difficulty] || DIFFICULTY_STYLES.Intermediate;
  const matchCount = project.matched_skills?.length ?? 0;
  const animClass = prefersReducedMotion
    ? ''
    : `animate-fade-up delay-${Math.min(index * 50, 300)}`;

  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-3 transition-all ${animClass}`}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        e.currentTarget.style.borderColor = 'var(--accent-border)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
          >
            <FolderGit2 size={16} style={{ color: 'var(--accent)' }} />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h4>
            <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {project.description}
            </p>
          </div>
        </div>

        {/* Difficulty badge */}
        <span
          className="text-[10px] font-bold px-2 py-1 rounded-lg flex-shrink-0"
          style={{
            background: diffStyle.bg,
            color: diffStyle.color,
            border: `1px solid ${diffStyle.border}`,
          }}
        >
          {project.difficulty}
        </span>
      </div>

      {/* Covers: matched skill pills */}
      {project.matched_skills?.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-wider flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
            Covers:
          </span>
          {project.matched_skills.map((skill, i) => (
            <span
              key={i}
              className="text-[11px] px-2.5 py-0.5 rounded-md font-medium"
              style={{
                background: 'var(--bg-card)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Why this project */}
      <div
        className="flex items-start gap-2 px-3 py-2 rounded-xl"
        style={{ background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.12)' }}
      >
        <Lightbulb size={12} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
        <p className="text-[11px] leading-relaxed" style={{ color: '#065f46' }}>
          Recommended because it directly builds{' '}
          <strong>{project.matched_skills?.slice(0, 2).join(' and ')}</strong>
          {matchCount > 2 ? ` and ${matchCount - 2} more` : ''}{' '}
          — {matchCount} of your top gaps for {roleTitle}.
        </p>
      </div>

      {/* Footer: time + links */}
      <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
        <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
          <Clock size={11} />
          <span className="text-[11px]">~{project.estimated_hours} hrs</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {project.github_starter_url && (
            <a
              href={project.github_starter_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-semibold transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <FolderGit2 size={12} />
              Starter Repo
            </a>
          )}
          {project.resource_links?.slice(0, 2).map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-semibold transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <ExternalLink size={11} />
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RecommendedProjects({ selectedRole, userSkills, gapAnalysis, roles }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastFetchKey = useRef(null);

  const hasGaps =
    gapAnalysis &&
    (
      (gapAnalysis.missing_core_skills?.length ?? 0) +
      (gapAnalysis.missing_advanced_skills?.length ?? 0) +
      (gapAnalysis.missing_tools?.length ?? 0)
    ) > 0;

  const roleTitle = roles?.find(r => r.id === selectedRole)?.title || selectedRole;

  useEffect(() => {
    if (!userSkills?.length || !selectedRole || !hasGaps) {
      setProjects([]);
      return;
    }
    const fetchKey = `${selectedRole}|${userSkills.sort().join(',')}`;
    if (fetchKey === lastFetchKey.current) return;
    lastFetchKey.current = fetchKey;

    setLoading(true);
    setError(null);
    const skillsParam = encodeURIComponent(userSkills.join(','));
    fetch(`/api/recommendations/projects?role=${selectedRole}&skills=${skillsParam}`)
      .then(r => r.ok ? r.json() : Promise.reject('fetch failed'))
      .then(data => { setProjects(data.projects || []); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [selectedRole, userSkills, hasGaps]);

  // Empty state — no skills yet
  if (!userSkills?.length) return null;

  // Empty state — no gaps (all skills matched)
  if (!hasGaps && !loading) return null;

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
          >
            <Zap size={13} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              Recommended Projects to Close Your Gap
            </h3>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Hands-on projects that directly build your missing skills
            </p>
          </div>
        </div>
        {!loading && projects.length > 0 && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}
          >
            {projects.length} projects
          </span>
        )}
      </div>

      <div className="p-5 space-y-3">
        {loading ? (
          // Skeleton loading — 3 shimmer cards
          <div className="space-y-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="relative">
                <SkeletonCard index={i} />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-6 rounded-xl" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
            <p className="text-xs font-semibold" style={{ color: '#dc2626' }}>Could not load project recommendations</p>
            <p className="text-[11px] mt-1" style={{ color: '#991b1b' }}>Check backend connection and try analyzing again.</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-6 px-2 rounded-xl bg-slate-50 border border-slate-100">
            <FolderGit2 size={24} className="mx-auto mb-2" style={{ color: '#94a3b8' }} />
            <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>No project matches found</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Your skills may already cover this role's requirements well.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                roleTitle={roleTitle}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
