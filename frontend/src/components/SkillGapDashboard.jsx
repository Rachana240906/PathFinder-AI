import React from 'react';
import { Target, CheckCircle, AlertTriangle, Sparkles, TrendingUp, Layers, ArrowRight, BookOpen, Check, ShieldAlert, Cpu, Wrench } from 'lucide-react';

export default function SkillGapDashboard({ 
  gapAnalysis, 
  onGenerateRoadmap, 
  selectedRoleTitle 
}) {
  if (!gapAnalysis) return null;

  const score = gapAnalysis.match_score || 0;
  const categories = gapAnalysis.category_scores || { core: 0, advanced: 0, tools: 0 };
  const masteredSkills = gapAnalysis.mastered_skills || [];
  const missingCore = gapAnalysis.missing_core_skills || [];
  const missingAdv = gapAnalysis.missing_advanced_skills || [];
  const missingTools = gapAnalysis.missing_tools || [];

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
      {/* Top Banner: Score Gauge & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Overall Readiness Gauge */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <span className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>Readiness Alignment</span>
          </span>

          <div className="relative w-36 h-36 flex items-center justify-center my-1">
            {/* SVG Radial Meter */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                className={`${score >= 70 ? 'stroke-violet-400' : score >= 40 ? 'stroke-sky-400' : 'stroke-pink-400'} transition-all duration-1000 ease-out`}
                strokeWidth="10"
                strokeDasharray={314}
                strokeDashoffset={314 - (314 * score) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {score}%
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Readiness
              </span>
            </div>
          </div>

          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${
              score >= 70 ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40' :
              score >= 40 ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' :
              'bg-pink-500/20 text-pink-300 border border-pink-500/40'
            }`}>
              {gapAnalysis.readiness_tier}
            </span>
          </div>
        </div>

        {/* Right: Target Role Breakdown & CTA */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-violet-300 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Target Role Analysis</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {gapAnalysis.role_title}
            </h3>
          </div>

          {/* Category Progress Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-4 pt-3 border-t border-slate-800">
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Core Foundations</span>
                <span className="text-violet-300">{categories.core}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-violet-400 h-2 rounded-full transition-all duration-500" style={{ width: `${categories.core}%` }} />
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Advanced Skills</span>
                <span className="text-sky-300">{categories.advanced}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-sky-400 h-2 rounded-full transition-all duration-500" style={{ width: `${categories.advanced}%` }} />
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Tools & Systems</span>
                <span className="text-pink-300">{categories.tools}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-pink-400 h-2 rounded-full transition-all duration-500" style={{ width: `${categories.tools}%` }} />
              </div>
            </div>
          </div>

          {/* Action CTA: Generate Roadmap */}
          {onGenerateRoadmap && (
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-xs text-slate-400">
                Ready to bridge skill gaps for <strong>{gapAnalysis.role_title}</strong>?
              </span>
              <button
                onClick={onGenerateRoadmap}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-sky-400 hover:from-violet-400 hover:to-sky-300 text-slate-950 text-xs font-black flex items-center justify-center space-x-2 shadow-lg shadow-violet-500/20 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Generate Career Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Skills Breakdown Grid: Present vs Missing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Mastered Skills Already in Resume */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Skills In Your Resume ({masteredSkills.length})
              </h4>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Mastered
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {masteredSkills.length > 0 ? (
              masteredSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-200 text-xs font-medium flex items-center space-x-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{skill}</span>
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500 italic">No direct matches.</span>
            )}
          </div>
        </div>

        {/* Missing Skills to Bridge */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Skill Gaps to Add ({missingCore.length + missingAdv.length + missingTools.length})
              </h4>
            </div>
            <span className="text-[10px] font-extrabold text-violet-300 bg-violet-500/15 px-2.5 py-0.5 rounded-full border border-violet-500/30">
              Needs Upskilling
            </span>
          </div>

          <div className="space-y-2 pt-1">
            {missingCore.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] font-extrabold text-rose-300 uppercase tracking-wider mr-1">
                  Core:
                </span>
                {missingCore.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs font-medium flex items-center space-x-1"
                  >
                    <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            )}

            {missingAdv.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] font-extrabold text-sky-300 uppercase tracking-wider mr-1">
                  Advanced:
                </span>
                {missingAdv.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-sky-200 text-xs font-medium flex items-center space-x-1"
                  >
                    <Sparkles className="w-3 h-3 text-sky-400 shrink-0" />
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            )}

            {missingTools.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] font-extrabold text-pink-300 uppercase tracking-wider mr-1">
                  Tools:
                </span>
                {missingTools.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-pink-950/40 border border-pink-500/30 text-pink-200 text-xs font-medium flex items-center space-x-1"
                  >
                    <Wrench className="w-3 h-3 text-pink-400 shrink-0" />
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
