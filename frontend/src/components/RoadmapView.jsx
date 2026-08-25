import React, { useState } from 'react';
import { Trophy, Check, BookOpen, FolderGit2, ChevronRight, ExternalLink, Clock, TrendingUp, Zap, UploadCloud } from 'lucide-react';
import confetti from 'canvas-confetti';

const PHASE_COLORS = ['var(--accent)', '#0284c7', '#7c3aed', '#ea580c'];

export default function RoadmapView({ roadmap, recommendations = [], onGoToResume }) {
  const [activePhase, setActivePhase] = useState(1);
  const [completed, setCompleted] = useState({});

  if (!roadmap?.phases) {
    return (
      <div
        className="rounded-2xl p-12 text-center animate-fade-up shadow-sm"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
          <Trophy size={28} />
        </div>
        <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>No Roadmap Generated Yet</h2>
        <p className="text-xs mt-1 max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
          Upload your resume in the Resume section so our AI can calculate your skill gaps and generate your customized 12-week learning roadmap.
        </p>
        {onGoToResume && (
          <button
            onClick={onGoToResume}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-xs text-white"
            style={{ background: 'var(--accent)' }}
          >
            <UploadCloud size={14} /> Go to Resume Upload
          </button>
        )}
      </div>
    );
  }

  const phases = roadmap.phases;
  const phase = phases.find(p => p.phase_id === activePhase) || phases[0];
  const color = PHASE_COLORS[(activePhase - 1) % PHASE_COLORS.length];

  let total = 0, done = 0;
  phases.forEach(p => {
    (p.topics || []).forEach((_, i) => {
      total++;
      if (completed[`${p.phase_id}-${i}`]) done++;
    });
  });
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  const toggleTopic = (phaseId, idx) => {
    const key = `${phaseId}-${idx}`;
    const next = { ...completed, [key]: !completed[key] };
    setCompleted(next);
    if (!completed[key]) confetti({ particleCount: 30, spread: 55, origin: { y: 0.8 } });
  };

  return (
    <div className="space-y-5 animate-fade-up">

      {/* ── Overall progress banner ── */}
      <div
        className="rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Personalized Career Trajectory
          </span>
          <h1 className="text-lg font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
            12-Week Career Milestone Roadmap
          </h1>
          <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-muted)' }}>
            {roadmap.target_role} · {done} of {total} milestones completed
          </p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
          <div className="text-right">
            <p className="text-2xl font-extrabold" style={{ color: 'var(--accent)' }}>{progress}%</p>
            <p className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>Roadmap Progress</p>
          </div>
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ width: 110, background: '#e2e8f0' }}
          >
            <div
              className="h-full rounded-full bar-fill"
              style={{ width: `${progress}%`, background: 'var(--accent)' }}
            />
          </div>
        </div>
      </div>

      {/* ── Phase Stepper ── */}
      <div
        className="rounded-2xl p-2 shadow-sm"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <div className="grid grid-cols-4 gap-1.5">
          {phases.map((p, idx) => {
            const phaseColor = PHASE_COLORS[idx % PHASE_COLORS.length];
            const isActive = p.phase_id === activePhase;
            const pDone = (p.topics || []).filter((_, i) => completed[`${p.phase_id}-${i}`]).length;
            const pTotal = (p.topics || []).length;
            const isDone = pDone === pTotal && pTotal > 0;

            return (
              <button
                key={p.phase_id}
                onClick={() => setActivePhase(p.phase_id)}
                className="py-3 px-2 rounded-xl text-center transition-all cursor-pointer"
                style={{
                  background: isActive ? 'rgba(5,150,105,0.08)' : 'transparent',
                  border: isActive ? '1px solid rgba(5,150,105,0.3)' : '1px solid transparent',
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mx-auto mb-1.5 transition-all shadow-xs"
                  style={{
                    background: isDone ? 'var(--accent)' : (isActive ? phaseColor : 'var(--bg-card)'),
                    color: isDone || isActive ? '#ffffff' : 'var(--text-muted)',
                  }}
                >
                  {isDone ? <Check size={13} /> : `0${p.phase_id}`}
                </div>
                <p
                  className="text-[11px] font-bold hidden sm:block"
                  style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  Phase {p.phase_id}
                </p>
                <p
                  className="text-[9px] font-medium hidden sm:block"
                  style={{ color: isActive ? phaseColor : 'var(--text-muted)' }}
                >
                  {p.duration}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Phase Detail ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left: Info + Checklist */}
        <div className="lg:col-span-7 space-y-4">

          {/* Phase header */}
          <div
            className="rounded-2xl p-5 shadow-sm"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 text-white shadow-xs"
                style={{ background: color }}
              >
                0{phase.phase_id}
              </div>
              <div>
                <h3 className="text-sm font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>{phase.title}</h3>
                <p className="text-[10px] font-bold" style={{ color }}>{phase.duration}</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>{phase.focus}</p>
          </div>

          {/* Task checklist */}
          <div
            className="rounded-2xl overflow-hidden shadow-sm"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
              <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Weekly Checkpoint Tasks</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100" style={{ color: 'var(--text-secondary)' }}>
                {(phase.topics || []).filter((_, i) => completed[`${phase.phase_id}-${i}`]).length} / {(phase.topics || []).length} completed
              </span>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {(phase.topics || []).map((topic, i) => {
                const key = `${phase.phase_id}-${i}`;
                const isDone = completed[key];
                return (
                  <button
                    key={i}
                    onClick={() => toggleTopic(phase.phase_id, i)}
                    className="w-full px-5 py-3.5 flex items-center gap-3 text-left transition-all cursor-pointer"
                    style={{
                      background: isDone ? 'rgba(5,150,105,0.05)' : 'transparent',
                    }}
                    onMouseEnter={e => { if (!isDone) e.currentTarget.style.background = 'rgba(0,0,0,0.015)'; }}
                    onMouseLeave={e => { if (!isDone) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all shadow-xs"
                      style={{
                        background: isDone ? 'var(--accent)' : 'var(--bg-card)',
                        border: isDone ? 'none' : '1.5px solid var(--border)',
                      }}
                    >
                      {isDone && <Check size={12} className="text-white" />}
                    </div>
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: isDone ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: isDone ? 'line-through' : 'none',
                      }}
                    >
                      {topic}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Milestone + Resources */}
        <div className="lg:col-span-5 space-y-4">

          {/* Milestone */}
          {phase.milestone_goal && (
            <div
              className="rounded-2xl p-5 shadow-sm"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={16} style={{ color: '#d97706' }} />
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
                  Milestone Goal
                </p>
              </div>
              <p className="text-xs leading-relaxed font-semibold" style={{ color: 'var(--text-primary)' }}>
                {phase.milestone_goal}
              </p>
              {phase.project_milestone && (
                <div
                  className="mt-3 p-3 rounded-xl flex items-start gap-2 bg-emerald-50/70 border border-emerald-200"
                >
                  <FolderGit2 size={14} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                  <p className="text-xs leading-relaxed font-semibold text-emerald-900">
                    {phase.project_milestone}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Resources */}
          {phase.resources?.length > 0 && (
            <div
              className="rounded-2xl overflow-hidden shadow-sm"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Curated Learning Resources</h3>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {phase.resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-5 py-3 transition-all group cursor-pointer"
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <div>
                        <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{res.title}</p>
                        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{res.type}</p>
                      </div>
                    </div>
                    <ExternalLink size={12} style={{ color: 'var(--text-muted)' }} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Insights summary */}
          {recommendations?.length > 0 && (
            <div
              className="rounded-2xl p-5 shadow-sm"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap size={15} style={{ color: 'var(--accent)' }} />
                <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                  Explainable AI Insights — {recommendations.length} key priorities
                </p>
              </div>
              <div className="space-y-2">
                {recommendations.slice(0, 3).map((rec, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{rec.skill_name}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="flex items-center gap-1 text-[11px]"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <Clock size={11} /> {rec.estimated_effort}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{
                          background: rec.priority?.includes('High') ? 'rgba(239,68,68,0.1)' : 'var(--accent-dim)',
                          color: rec.priority?.includes('High') ? '#dc2626' : 'var(--accent)',
                        }}
                      >
                        {rec.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
