import React from 'react';
import { Trophy, ArrowRight, Check, Target, Cpu, Code2, BarChart3, Cloud, ShieldCheck, Monitor, Server, Smartphone, Link, MessageSquare, Database, Layers, Gamepad2, Briefcase, AlertCircle } from 'lucide-react';

const iconMap = {
  Cpu: Cpu,
  Code2: Code2,
  BarChart3: BarChart3,
  Cloud: Cloud,
  ShieldCheck: ShieldCheck,
  Monitor: Monitor,
  Server: Server,
  Smartphone: Smartphone,
  Link: Link,
  MessageSquare: MessageSquare,
  Database: Database,
  Layers: Layers,
  Gamepad2: Gamepad2,
  Briefcase: Briefcase,
};

export default function BestFitRoleBanner({ 
  suitabilityData, 
  selectedRole, 
  onSelectRole,
  userSkills = [],
}) {
  if (!suitabilityData || !suitabilityData.all_role_evaluations) return null;

  const {
    best_fit_role_id,
    best_fit_role_title,
    best_fit_match_score,
    all_role_evaluations = []
  } = suitabilityData;

  // Only show roles with > 60% match score
  const qualifiedRoles = all_role_evaluations.filter(r => r.match_score > 60);
  const isBestFitActive = selectedRole === best_fit_role_id;
  const hasQualified = qualifiedRoles.length > 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
      {/* Top Matched Role Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-violet-500/15 text-violet-300 text-xs font-bold border border-violet-500/30">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>Best Role Match From Your Resume</span>
          </div>

          <div className="flex items-baseline space-x-3 flex-wrap pt-0.5">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {best_fit_role_title}
            </h2>
            <span className="px-3 py-0.5 rounded-xl bg-violet-500/20 text-violet-200 font-extrabold text-xs border border-violet-500/40">
              {best_fit_match_score}% Match
            </span>
          </div>
        </div>

        {/* Quick select best-fit if not current */}
        {!isBestFitActive && (
          <button
            onClick={() => onSelectRole(best_fit_role_id)}
            className="px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer transition-all shadow-md"
          >
            <span>Set As Target</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Qualified Roles (> 60% match only) */}
      {hasQualified ? (
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Strong Career Matches (&gt;60% Readiness)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-violet-500/15 text-violet-300 border border-violet-500/30">
              {qualifiedRoles.length} roles
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {qualifiedRoles.map((evalItem) => {
              const IconComp = iconMap[evalItem.icon] || Code2;
              const isSelected = selectedRole === evalItem.role_id;
              const isBest = evalItem.role_id === best_fit_role_id;

              return (
                <div
                  key={evalItem.role_id}
                  onClick={() => onSelectRole(evalItem.role_id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-violet-950/60 border-violet-400 shadow-md shadow-violet-500/20 scale-[1.02]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {isBest && (
                    <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider">
                      Top Fit
                    </span>
                  )}

                  <div className="flex items-center space-x-1.5 mb-2">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-violet-500 text-slate-950' : 'bg-slate-800 text-violet-300'
                    }`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-white line-clamp-2 leading-tight">
                      {evalItem.role_title}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-400">Match</span>
                      <span className={
                        evalItem.match_score >= 70 ? 'text-violet-300' : 'text-sky-300'
                      }>
                        {evalItem.match_score}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          evalItem.match_score >= 70 ? 'bg-violet-400' : 'bg-sky-400'
                        }`}
                        style={{ width: `${evalItem.match_score}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-3 bg-amber-950/30 border border-amber-600/40 rounded-2xl p-4 text-sm text-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            No roles currently exceed 60% readiness. Add more relevant skills to unlock strong career matches.
          </span>
        </div>
      )}
    </div>
  );
}
