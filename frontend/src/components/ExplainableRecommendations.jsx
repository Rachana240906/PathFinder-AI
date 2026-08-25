import React from 'react';
import { Sparkles, Clock, TrendingUp, Zap } from 'lucide-react';

export default function ExplainableRecommendations({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-violet-300 uppercase tracking-wider mb-0.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Explainable AI Insights</span>
        </div>
        <h2 className="text-lg font-black text-white">
          Why Are These Competencies Recommended?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>{rec.skill_name}</span>
                </h3>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  rec.priority.includes('High') 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                    : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                }`}>
                  {rec.priority}
                </span>
              </div>

              {/* Why it matters */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Why It Matters:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {rec.why_it_matters}
                </p>
              </div>

              {/* Market Demand Stat */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 flex items-center space-x-2 text-xs text-sky-300">
                <TrendingUp className="w-4 h-4 shrink-0 text-sky-400" />
                <span className="text-[11px] font-semibold">{rec.market_demand_stat}</span>
              </div>
            </div>

            {/* Effort & Actionable Tip */}
            <div className="pt-3 mt-3 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-violet-400" />
                  <span>Est. Effort:</span>
                </span>
                <span className="font-bold text-violet-300">{rec.estimated_effort}</span>
              </div>

              <div className="text-[11px] text-slate-400">
                <span className="font-bold text-sky-300 block mb-0.5">Next Action:</span>
                <span className="text-slate-300">{rec.actionable_tip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
