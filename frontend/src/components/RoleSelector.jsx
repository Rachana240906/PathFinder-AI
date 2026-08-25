import React, { useState } from 'react';
import { Cpu, Code2, BarChart3, Cloud, ShieldCheck, Monitor, Server, Smartphone, Link, MessageSquare, Database, Layers, Gamepad2, Briefcase, TrendingUp, Sparkles, Check, ChevronDown, ChevronUp, Eye, ChevronRight, Plus, Minus } from 'lucide-react';

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

const INITIAL_VISIBLE = 5;

export default function RoleSelector({ 
  roles, 
  selectedRole, 
  onSelectRole, 
  suitabilityData,
  showAnalysis,
  onToggleAnalysis
}) {
  const [showMoreRoles, setShowMoreRoles] = useState(false);

  // Build a map of role_id -> match_score from suitabilityData
  const scoreMap = {};
  if (suitabilityData && suitabilityData.all_role_evaluations) {
    suitabilityData.all_role_evaluations.forEach(item => {
      scoreMap[item.role_id] = item.match_score;
    });
  }

  const currentRoleObj = roles.find(r => r.id === selectedRole) || roles[0];

  // Sorted by match score descending (if available), otherwise stable order
  const sortedRoles = [...roles].sort((a, b) => {
    const sA = scoreMap[a.id] ?? 0;
    const sB = scoreMap[b.id] ?? 0;
    return sB - sA;
  });

  const visibleRoles = showMoreRoles ? sortedRoles : sortedRoles.slice(0, INITIAL_VISIBLE);
  const hiddenCount = sortedRoles.length - INITIAL_VISIBLE;

  return (
    <div className="space-y-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-violet-300 uppercase tracking-wider mb-0.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Career Preference</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            Choose Your Target Career Role
          </h2>
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Select preference, then click Analyze
        </span>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {visibleRoles.map((role) => {
          const IconComponent = iconMap[role.icon] || Code2;
          const isSelected = selectedRole === role.id;
          const matchScore = scoreMap[role.id];
          const isQualified = matchScore !== undefined && matchScore > 60;

          return (
            <div
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={`relative rounded-2xl p-4 cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-violet-950/80 via-slate-900 to-violet-950/60 border-violet-400 shadow-lg shadow-violet-500/20 scale-[1.02]'
                  : 'bg-slate-950/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Active Indicator Pin */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 flex items-center space-x-1 px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[9px] font-extrabold border border-violet-500/40">
                  <Check className="w-2.5 h-2.5 text-violet-300" />
                  <span>Selected</span>
                </div>
              )}

              <div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${
                  isSelected ? 'bg-violet-400 text-slate-950 shadow-md shadow-violet-500/20' : 'bg-slate-800 text-violet-300'
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                  {role.title}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {role.category}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-sky-300 font-semibold flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{role.growth_rate}</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium text-[10px]">
                    {role.demand}
                  </span>
                </div>

                {matchScore !== undefined && (
                  <div className="space-y-1 pt-0.5">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-400">Readiness:</span>
                      <span className={
                        matchScore >= 70 ? 'text-violet-300' :
                        matchScore >= 60 ? 'text-sky-300' : 'text-rose-400'
                      }>
                        {matchScore}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                      <div
                        className={`h-1 rounded-full transition-all duration-500 ${
                          matchScore >= 70 ? 'bg-violet-400' :
                          matchScore >= 60 ? 'bg-sky-400' : 'bg-rose-500'
                        }`}
                        style={{ width: `${matchScore}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More / Show Less Roles Toggle */}
      {hiddenCount > 0 && (
        <div className="flex justify-center pt-1">
          <button
            onClick={() => setShowMoreRoles(!showMoreRoles)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            {showMoreRoles ? (
              <>
                <Minus className="w-3.5 h-3.5 text-violet-400" />
                <span>Show Less Roles</span>
                <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-violet-400" />
                <span>Show {hiddenCount} More Career Roles</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Main Action Button to Reveal / Hide Deep Analysis */}
      <div className="pt-1 flex justify-center">
        <button
          onClick={onToggleAnalysis}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-sky-400 hover:from-violet-400 hover:to-sky-300 text-slate-950 text-xs sm:text-sm font-black flex items-center justify-center space-x-2 shadow-xl shadow-violet-500/25 transition-all cursor-pointer hover:scale-[1.01]"
        >
          <Eye className="w-4 h-4" />
          <span>
            {showAnalysis 
              ? `Hide Analysis for ${currentRoleObj?.title}` 
              : `Show Target Analysis & Skills for ${currentRoleObj?.title}`}
          </span>
          {showAnalysis ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
