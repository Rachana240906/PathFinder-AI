import React, { useState } from 'react';
import { Award, BookOpen, Check, ChevronRight, ExternalLink, FolderGit2, Sparkles, Star, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveJourneyPath({ roadmap, userSkills = [] }) {
  const [activePhaseId, setActivePhaseId] = useState(1);
  const [completedTopics, setCompletedTopics] = useState({});

  if (!roadmap || !roadmap.phases) return null;

  const phases = roadmap.phases;
  const activePhase = phases.find(p => p.phase_id === activePhaseId) || phases[0];

  const toggleTopic = (phaseId, topicIdx) => {
    const key = `${phaseId}-${topicIdx}`;
    const nextState = { ...completedTopics, [key]: !completedTopics[key] };
    setCompletedTopics(nextState);

    // Confetti effect on completion!
    if (!completedTopics[key]) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  // Progress metrics
  let totalTopics = 0;
  phases.forEach(p => {
    totalTopics += (p.topics ? p.topics.length : 0);
  });
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // Path coordinates for a beautiful S-curve path representing 4 steps
  const width = 600;
  const height = 150;
  const points = [
    { x: 75, y: 75, id: 1, title: 'Phase 1' },
    { x: 225, y: 40, id: 2, title: 'Phase 2' },
    { x: 375, y: 110, id: 3, title: 'Phase 3' },
    { x: 525, y: 75, id: 4, title: 'Phase 4' }
  ];

  return (
    <div className="space-y-6 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      <div className="absolute top-0 left-0 w-64 h-64 bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-800/60 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-violet-300 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Learning Path</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            12-Week Roadmap Journey
          </h3>
        </div>

        {/* Mini progress tracker */}
        <div className="flex items-center space-x-3 bg-slate-950/60 border border-slate-800/80 px-4 py-2 rounded-2xl">
          <Trophy className="w-5 h-5 text-amber-400" />
          <div>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-black block">Progress</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-black text-white">{progressPercent}%</span>
              <span className="text-[10px] text-violet-300 font-bold">({completedCount}/{totalTopics} Completed)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Graphical Curved Map Path */}
      <div className="w-full bg-slate-950/40 border border-slate-800/40 rounded-2xl p-4 flex flex-col items-center justify-center overflow-x-auto">
        <div className="min-w-[600px] relative h-[180px] flex items-center justify-center">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[600px] select-none h-full overflow-visible">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <filter id="glowPath" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing background path */}
            <path
              d={`M 75 75 C 150 40, 150 40, 225 40 C 300 40, 300 110, 375 110 C 450 110, 450 75, 525 75`}
              fill="none"
              stroke="#1e1b4b"
              strokeWidth="10"
              strokeLinecap="round"
            />
            
            {/* Colored actual path */}
            <path
              d={`M 75 75 C 150 40, 150 40, 225 40 C 300 40, 300 110, 375 110 C 450 110, 450 75, 525 75`}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#glowPath)"
            />

            {/* Milestone stepping stone nodes */}
            {points.map((p) => {
              const phase = phases.find(ph => ph.phase_id === p.id);
              if (!phase) return null;
              
              const isActive = activePhaseId === p.id;
              const phaseTopics = phase.topics || [];
              const phaseCompletedCount = phaseTopics.filter((_, idx) => completedTopics[`${p.id}-${idx}`]).length;
              const isPhaseDone = phaseCompletedCount === phaseTopics.length && phaseTopics.length > 0;
              
              let ringColor = isActive ? '#a78bfa' : '#334155';
              let ringWidth = isActive ? 3.5 : 1.5;
              let fill = isPhaseDone ? '#10b981' : isActive ? '#8b5cf6' : '#1e293b';
              
              return (
                <g
                  key={p.id}
                  transform={`translate(${p.x}, ${p.y})`}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setActivePhaseId(p.id)}
                >
                  <circle
                    r="24"
                    fill={fill}
                    stroke={ringColor}
                    strokeWidth={ringWidth}
                    className="transition-all duration-300 hover:scale-110 shadow-lg"
                  />
                  
                  {/* Inside circle representation */}
                  {isPhaseDone ? (
                    <Check className="w-5 h-5 text-slate-950 -translate-x-2.5 -translate-y-2.5 pointer-events-none stroke-[3]" />
                  ) : p.id === 4 ? (
                    <Trophy className="w-5 h-5 text-amber-400 -translate-x-2.5 -translate-y-2.5 pointer-events-none" />
                  ) : (
                    <Star className={`w-4 h-4 -translate-x-2 -translate-y-2 pointer-events-none ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  )}

                  {/* Title overlay */}
                  <text
                    y="-32"
                    textAnchor="middle"
                    fill={isActive ? '#ffffff' : '#94a3b8'}
                    className="text-[10px] font-black uppercase tracking-wider transition-colors"
                  >
                    {p.title}
                  </text>
                  
                  {/* Duration overlay below */}
                  <text
                    y="36"
                    textAnchor="middle"
                    fill="#64748b"
                    className="text-[8px] font-bold"
                  >
                    {phase.duration}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Phase detail breakdown panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-3 border-t border-slate-800/60">
        
        {/* Left Side: Goal / Focus and Curated Resources */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center font-black text-xs">
                {activePhase.phase_id}
              </span>
              <div>
                <h4 className="text-sm font-black text-white">{activePhase.title}</h4>
                <span className="text-[9px] text-violet-400 font-bold uppercase tracking-wider">{activePhase.duration}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Phase Focus</span>
                <p className="text-slate-300 font-medium">{activePhase.focus}</p>
              </div>
              <div className="pt-2 border-t border-slate-900">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Milestone Goal</span>
                <p className="text-slate-300 leading-relaxed font-medium">{activePhase.milestone_goal}</p>
              </div>
            </div>
          </div>

          {/* Project Milestone */}
          {activePhase.project_milestone && (
            <div className="bg-gradient-to-r from-violet-950/30 to-indigo-950/20 border border-violet-500/20 rounded-2xl p-4 flex items-start space-x-3">
              <FolderGit2 className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-black text-violet-300 uppercase tracking-wider block">
                  Capstone Project Milestone
                </span>
                <p className="text-xs font-bold text-white mt-0.5 leading-relaxed">
                  {activePhase.project_milestone}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Weekly Checklist and Resources */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Action Tasks */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-2.5">
              Weekly Action Checklist
            </span>
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
              {activePhase.topics && activePhase.topics.map((topic, idx) => {
                const isDone = completedTopics[`${activePhase.phase_id}-${idx}`];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleTopic(activePhase.phase_id, idx)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-2.5 text-xs ${
                      isDone
                        ? 'bg-violet-950/35 border-violet-500/30 text-violet-300'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all ${
                      isDone ? 'bg-violet-400 text-slate-950 font-bold' : 'border border-slate-700 bg-slate-800'
                    }`}>
                      {isDone && <Check className="w-3 h-3 stroke-[2.5]" />}
                    </div>
                    <span className={`font-semibold ${isDone ? 'line-through text-slate-500' : ''}`}>
                      {topic}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Curated Resources */}
          {activePhase.resources && activePhase.resources.length > 0 && (
            <div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-2">
                Phase Learning Resources
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activePhase.resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-950/60 border border-slate-800 hover:border-violet-500/40 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-300 hover:text-white transition-all group"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <BookOpen className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                      <div className="truncate">
                        <span className="font-semibold block truncate">{res.title}</span>
                        <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">{res.type}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
