import React, { useState, useMemo } from 'react';
import { Sparkles, Cpu, Award, BookOpen, AlertCircle, CheckCircle, ExternalLink, X } from 'lucide-react';

export default function SkillGalaxy({ gapAnalysis, recommendations = [] }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  if (!gapAnalysis) return null;

  const roleTitle = gapAnalysis.role_title || "Target Career Path";
  const masteredSkills = gapAnalysis.mastered_skills || [];
  
  // Combine all missing skills
  const missingCore = gapAnalysis.missing_core_skills || [];
  const missingAdv = gapAnalysis.missing_advanced_skills || [];
  const missingTools = gapAnalysis.missing_tools || [];
  
  const missingSkills = useMemo(() => {
    return [
      ...missingCore.map(s => ({ name: s, type: 'core' })),
      ...missingAdv.map(s => ({ name: s, type: 'advanced' })),
      ...missingTools.map(s => ({ name: s, type: 'tool' }))
    ];
  }, [missingCore, missingAdv, missingTools]);

  // Construct node list
  const nodes = useMemo(() => {
    const list = [];
    const centerX = 250;
    const centerY = 250;
    
    // 1. Center node
    list.push({
      id: 'center',
      name: roleTitle,
      x: centerX,
      y: centerY,
      isCenter: true,
      size: 45
    });

    // 2. Mastered skills (inner circle)
    const innerRadius = 105;
    masteredSkills.forEach((skillName, idx) => {
      const angle = (idx / masteredSkills.length) * 2 * Math.PI - Math.PI / 2;
      list.push({
        id: `mastered-${idx}`,
        name: skillName,
        isMastered: true,
        x: centerX + innerRadius * Math.cos(angle),
        y: centerY + innerRadius * Math.sin(angle),
        size: 14,
        angle
      });
    });

    // 3. Missing skills (outer circle)
    const outerRadius = 195;
    missingSkills.forEach((skill, idx) => {
      const angle = (idx / missingSkills.length) * 2 * Math.PI - Math.PI / 4;
      list.push({
        id: `missing-${idx}`,
        name: skill.name,
        isMastered: false,
        type: skill.type,
        x: centerX + outerRadius * Math.cos(angle),
        y: centerY + outerRadius * Math.sin(angle),
        size: 14,
        angle
      });
    });

    return list;
  }, [roleTitle, masteredSkills, missingSkills]);

  // Find recommendation explanation for a skill
  const getSkillRecommendation = (skillName) => {
    return recommendations.find(r => {
      const recName = typeof r === 'object' ? (r.skill || r.name) : r;
      return recName?.toLowerCase() === skillName?.toLowerCase();
    }) || null;
  };

  const handleNodeClick = (node) => {
    if (node.isCenter) return;
    const rec = getSkillRecommendation(node.name);
    setSelectedSkill({
      name: node.name,
      isMastered: node.isMastered,
      type: node.type || (node.isMastered ? 'mastered' : 'recommended'),
      recommendation: rec
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* SVG Canvas Column */}
      <div className="xl:col-span-7 flex flex-col items-center justify-center relative">
        <div className="w-full flex items-center justify-between mb-4 border-b border-slate-800/60 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-bold text-slate-200 tracking-wide uppercase">Interactive Skill Galaxy Map</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] font-bold">
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="text-slate-400">Acquired ({masteredSkills.length})</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              <span className="text-slate-400">Target Gap ({missingSkills.length})</span>
            </div>
          </div>
        </div>

        {/* SVG Galaxy Graph Container */}
        <div className="w-full max-w-[500px] aspect-square relative bg-slate-950/40 border border-slate-800/40 rounded-2xl overflow-hidden shadow-inner">
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full select-none"
          >
            {/* Defs for gradients, drop shadows and neon glows */}
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </radialGradient>
              <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glowPurple" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbit rings */}
            <circle cx="250" cy="250" r="105" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
            <circle cx="250" cy="250" r="195" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.4" />

            {/* Connection lines from center to nodes */}
            {nodes.map((node) => {
              if (node.isCenter) return null;
              
              const isHovered = hoveredNode === node.id;
              const isSelected = selectedSkill?.name === node.name;
              
              let strokeColor = node.isMastered ? '#10b981' : '#8b5cf6';
              let opacity = isHovered || isSelected ? '0.9' : '0.25';
              let strokeWidth = isHovered || isSelected ? '2' : '1';
              
              return (
                <line
                  key={`line-${node.id}`}
                  x1="250"
                  y1="250"
                  x2={node.x}
                  y2={node.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={node.isMastered ? '0' : '4,3'}
                  opacity={opacity}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Render Nodes */}
            {nodes.map((node) => {
              const isHovered = hoveredNode === node.id;
              const isSelected = selectedSkill?.name === node.name;
              
              if (node.isCenter) {
                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-default"
                  >
                    <circle r={node.size + 15} fill="url(#centerGlow)" />
                    <circle r={node.size} fill="#090d16" stroke="#8b5cf6" strokeWidth="2.5" className="shadow-lg" />
                    <circle r={node.size - 6} fill="#0f172a" stroke="#a78bfa" strokeWidth="1" opacity="0.6" />
                    <Cpu className="w-6 h-6 text-violet-400 absolute -translate-x-3 -translate-y-3 pointer-events-none" />
                    
                    {/* Render Title in center */}
                    <foreignObject x="-40" y="8" width="80" height="24">
                      <div className="text-[7.5px] text-center font-black leading-tight text-white uppercase tracking-wider line-clamp-2">
                        {node.name}
                      </div>
                    </foreignObject>
                  </g>
                );
              }

              // Normal nodes
              let color = node.isMastered ? '#10b981' : '#8b5cf6';
              let scale = isHovered || isSelected ? 1.25 : 1;
              let filter = node.isMastered ? 'url(#glowGreen)' : 'url(#glowPurple)';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y}) scale(${scale})`}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => handleNodeClick(node)}
                >
                  <circle
                    r={node.size}
                    fill={isSelected ? color : '#0f172a'}
                    stroke={color}
                    strokeWidth={isSelected ? 3 : 1.5}
                    filter={isHovered || isSelected ? filter : ''}
                    className="transition-all duration-300"
                  />
                  <circle
                    r={node.size - 4}
                    fill={node.isMastered ? '#064e3b' : '#311052'}
                    opacity={isSelected ? 0 : 0.8}
                  />

                  {/* Tiny text identifier inside circle */}
                  <text
                    y="3"
                    textAnchor="middle"
                    fill={isSelected ? '#090d16' : '#f8fafc'}
                    className="text-[8px] font-extrabold select-none pointer-events-none"
                  >
                    {node.name.charAt(0).toUpperCase()}
                  </text>

                  {/* Floating labels */}
                  <foreignObject 
                    x={node.angle !== undefined && Math.cos(node.angle) < 0 ? -110 : 15} 
                    y="-10" 
                    width="95" 
                    height="32"
                    className="pointer-events-none"
                  >
                    <div className={`text-[9px] font-bold leading-normal truncate ${
                      node.angle !== undefined && Math.cos(node.angle) < 0 ? 'text-right' : 'text-left'
                    } ${isSelected ? 'text-white' : 'text-slate-400'} group-hover:text-white`}>
                      <span className={`inline-block px-1 py-0.5 rounded text-[7px] font-black uppercase mr-1 ${
                        node.isMastered ? 'bg-emerald-500/10 text-emerald-400' : 'bg-violet-500/10 text-violet-400'
                      }`}>
                        {node.isMastered ? 'Acquired' : node.type === 'core' ? 'Core' : node.type === 'advanced' ? 'Adv' : 'Tool'}
                      </span>
                      <div className="truncate mt-0.5">{node.name}</div>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Info Panel / Progressive Disclosure Column */}
      <div className="xl:col-span-5 flex flex-col justify-between border-t xl:border-t-0 xl:border-l border-slate-800/80 pt-5 xl:pt-0 xl:pl-6">
        {selectedSkill ? (
          <div className="flex flex-col h-full justify-between space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedSkill.isMastered ? 'bg-emerald-500/20 text-emerald-400' : 'bg-violet-500/20 text-violet-400'
                  }`}>
                    {selectedSkill.isMastered ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white leading-tight">{selectedSkill.name}</h4>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">
                      {selectedSkill.isMastered ? 'Acquired Competency' : `${selectedSkill.type} Requirement`}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="w-6 h-6 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Recommendation Content */}
              <div className="space-y-4 py-3">
                {selectedSkill.isMastered ? (
                  <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-4 text-xs text-emerald-200">
                    <p className="leading-relaxed">
                      ✓ This skill has been successfully detected in your resume parser scan! You already have a strong foundation in <strong>{selectedSkill.name}</strong>, aligning you closer to the {roleTitle} benchmark.
                    </p>
                  </div>
                ) : (
                  <>
                    {selectedSkill.recommendation ? (
                      <div className="space-y-3.5">
                        {/* Summary / Why it is recommended */}
                        <div className="bg-violet-950/15 border border-violet-500/20 rounded-2xl p-4">
                          <span className="text-[10px] font-bold text-violet-300 uppercase tracking-wider block mb-1">
                            Hiring & Market Insights
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed font-medium">
                            {selectedSkill.recommendation.reasoning || selectedSkill.recommendation.reason || 'This skill is essential for industry-standard implementation, architecture, and pipeline integration in this career track.'}
                          </p>
                        </div>

                        {/* Impact Stat */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                            <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Estimated Effort</span>
                            <span className="text-sm font-extrabold text-white">
                              {selectedSkill.recommendation.effort_estimate || selectedSkill.recommendation.effort || '2-3 Weeks'}
                            </span>
                          </div>
                          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                            <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Competency Layer</span>
                            <span className="text-sm font-extrabold text-violet-300 capitalize">
                              {selectedSkill.type}
                            </span>
                          </div>
                        </div>

                        {/* Curated Materials */}
                        {selectedSkill.recommendation.resources && selectedSkill.recommendation.resources.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              Curated Learning Checkpoints
                            </span>
                            <div className="space-y-1.5">
                              {selectedSkill.recommendation.resources.map((res, idx) => (
                                <a
                                  key={idx}
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-violet-500/30 text-xs text-slate-300 hover:text-white transition-all group"
                                >
                                  <div className="flex items-center space-x-2">
                                    <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                                    <span className="font-semibold line-clamp-1">{res.title || res.name}</span>
                                  </div>
                                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400">
                        <p className="leading-relaxed">
                          This skill is recommended as an industry-standard prerequisite for this role. Complete weekly checkpoints to master this skill gap.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Quick Action */}
            {!selectedSkill.isMastered && (
              <div className="bg-gradient-to-r from-violet-950/20 to-indigo-950/20 border border-violet-500/20 rounded-2xl p-3.5 flex items-center justify-between">
                <span className="text-[10px] text-slate-300 font-medium">Mapped to Weekly Roadmap Plan</span>
                <span className="text-[10px] bg-violet-500 text-slate-950 px-2 py-1 rounded font-black uppercase tracking-wider">
                  Queued
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-slate-950/20 border border-dashed border-slate-800 rounded-3xl min-h-[300px]">
            <Award className="w-10 h-10 text-slate-700 mb-3 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-300">Skill Details Overlay</h4>
            <p className="text-[11px] text-slate-500 max-w-xs mt-1 leading-relaxed">
              Click on any active skill bubble in the <strong>Skill Galaxy Map</strong> to inspect its career alignment stats, market demand, and recommended learning resources.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
