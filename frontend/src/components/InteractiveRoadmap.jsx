import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, ChevronRight, ExternalLink, Award, Sparkles, Trophy, Check, AlertTriangle, ArrowRight, Layers, Clock, FolderGit2, Target } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveRoadmap({ roadmap, userSkills = [] }) {
  const [completedTopics, setCompletedTopics] = useState({});
  const [expandedPhases, setExpandedPhases] = useState({ 1: true, 2: true, 3: true, 4: true });

  if (!roadmap || !roadmap.phases) return null;

  const targetRole = roadmap.target_role || "Selected Career Path";
  const skillsPresent = roadmap.skills_present || userSkills || [];
  const skillsToAdd = roadmap.skills_to_add || [];

  const toggleTopic = (phaseId, topicIdx) => {
    const key = `${phaseId}-${topicIdx}`;
    const nextState = { ...completedTopics, [key]: !completedTopics[key] };
    setCompletedTopics(nextState);

    // If marked complete, trigger confetti!
    if (!completedTopics[key]) {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.8 }
      });
    }
  };

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  let totalTopics = 0;
  roadmap.phases.forEach(p => {
    totalTopics += (p.topics ? p.topics.length : 0);
  });
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner: Dynamic Skills Audit */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-5">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-violet-300 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Dynamic Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              12-Week Career Action Plan for {targetRole}
            </h2>
          </div>

          {/* Progress Tracker Card */}
          <div className="flex items-center space-x-4 bg-slate-950/80 px-5 py-3 rounded-2xl border border-slate-800 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                Roadmap Progress
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-black text-white">
                  {progressPercent}%
                </span>
                <span className="text-xs text-violet-300 font-bold">
                  ({completedCount}/{totalTopics} Tasks)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Present Skills vs Skills To Add Breakdown Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
          {/* Skills Mastered in Resume */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Skills in Your Resume ({skillsPresent.length})</span>
              </span>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded font-bold">
                Mastered
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skillsPresent.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-emerald-950/40 text-emerald-200 border border-emerald-500/30 text-[11px] font-semibold"
                >
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          {/* Skills to be Added */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-violet-400" />
                <span>Skills to be Added ({skillsToAdd.length})</span>
              </span>
              <span className="text-[10px] bg-violet-500/15 text-violet-300 px-2 py-0.5 rounded font-bold">
                Target Curriculum
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skillsToAdd.length > 0 ? (
                skillsToAdd.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-violet-950/40 text-violet-200 border border-violet-500/30 text-[11px] font-semibold flex items-center space-x-1"
                  >
                    <span>+ {typeof s === 'object' ? s.name : s}</span>
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500 italic">All benchmarks satisfied.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Phase Cards Timeline */}
      <div className="space-y-4">
        {roadmap.phases.map((phase) => {
          const isExpanded = expandedPhases[phase.phase_id];
          const phaseTopics = phase.topics || [];
          const phaseCompleted = phaseTopics.filter((_, idx) => completedTopics[`${phase.phase_id}-${idx}`]).length;

          return (
            <div
              key={phase.phase_id}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl transition-all"
            >
              {/* Phase Header Accordion */}
              <div
                onClick={() => togglePhase(phase.phase_id)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:bg-slate-850 transition-colors"
              >
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-400 via-purple-400 to-sky-300 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shrink-0">
                    0{phase.phase_id}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {phase.title}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-violet-500/15 text-violet-300 border border-violet-500/30">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {phase.focus}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0 justify-between sm:justify-end">
                  <span className="text-xs text-violet-300 font-bold">
                    {phaseCompleted}/{phaseTopics.length} Tasks
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Phase Body */}
              {isExpanded && (
                <div className="p-6 pt-0 border-t border-slate-800/80 bg-slate-950/40 space-y-5">
                  {/* Milestone Goal Statement */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-start space-x-3">
                    <Award className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-violet-300 uppercase tracking-wider block">
                        Phase Milestone Goal:
                      </span>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {phase.milestone_goal}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Action Checklist */}
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                      Weekly Action Tasks:
                    </span>
                    <div className="space-y-2">
                      {phaseTopics.map((topic, topicIdx) => {
                        const isDone = completedTopics[`${phase.phase_id}-${topicIdx}`];

                        return (
                          <div
                            key={topicIdx}
                            onClick={() => toggleTopic(phase.phase_id, topicIdx)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3 ${
                              isDone
                                ? 'bg-violet-950/40 border-violet-500/40 text-violet-200 shadow-sm'
                                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                              isDone ? 'bg-violet-400 text-slate-950 font-bold' : 'border border-slate-700 bg-slate-800'
                            }`}>
                              {isDone && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <span className={`text-xs font-medium ${isDone ? 'line-through text-slate-400' : ''}`}>
                              {topic}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Capstone Milestone Project */}
                  {phase.project_milestone && (
                    <div className="bg-gradient-to-r from-violet-950/40 to-slate-900 border border-violet-500/20 rounded-2xl p-4 flex items-start space-x-3">
                      <FolderGit2 className="w-5 h-5 text-violet-300 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold text-violet-300 uppercase tracking-wider block">
                          Capstone Project Milestone:
                        </span>
                        <p className="text-xs font-medium text-white mt-0.5">
                          {phase.project_milestone}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Curated Resources */}
                  {phase.resources && phase.resources.length > 0 && (
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Curated Learning Resources:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {phase.resources.map((res, resIdx) => (
                          <a
                            key={resIdx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 rounded-xl p-3 flex items-center justify-between text-xs text-slate-300 hover:text-white transition-all group"
                          >
                            <div className="flex items-center space-x-2.5">
                              <BookOpen className="w-4 h-4 text-violet-300 shrink-0" />
                              <div>
                                <span className="font-semibold block line-clamp-1">{res.title}</span>
                                <span className="text-[10px] text-slate-500 uppercase">{res.type}</span>
                              </div>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white shrink-0 ml-2" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
