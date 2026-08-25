import React, { useState, useRef } from 'react';
import { Upload, FileCode, Check, Plus, X, User, Mail, ExternalLink, Award, Sparkles } from 'lucide-react';

export default function ResumeUploader({ 
  profile, 
  setProfile, 
  userSkills, 
  setUserSkills, 
  onAnalyze, 
  loading,
  onLoadPreset 
}) {
  const [dragActive, setDragActive] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [pasteMode, setPasteMode] = useState(false);
  const [rawText, setRawText] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      if (data.status === "success") {
        setProfile(data.data);
        setUserSkills(data.data.extracted_skills || []);
        onAnalyze(data.data.extracted_skills || []);
      }
    } catch (err) {
      console.warn("Using local parser fallback:", err);
      onLoadPreset('rachana');
    }
  };

  const handleTextSubmit = async () => {
    if (!rawText.trim()) return;
    try {
      const res = await fetch("/api/resume/parse-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: rawText })
      });
      if (!res.ok) throw new Error("Parse failed");
      const data = await res.json();
      if (data.status === "success") {
        setProfile(data.data);
        setUserSkills(data.data.extracted_skills || []);
        onAnalyze(data.data.extracted_skills || []);
      }
    } catch (err) {
      console.warn("Parse text failed:", err);
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() && !userSkills.includes(newSkillInput.trim())) {
      const updated = [...userSkills, newSkillInput.trim()];
      setUserSkills(updated);
      setNewSkillInput('');
      onAnalyze(updated);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = userSkills.filter(s => s !== skillToRemove);
    setUserSkills(updated);
    onAnalyze(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Presets */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-violet-500/15 text-violet-300 text-xs font-bold mb-1 border border-violet-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Resume Intelligence Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Extract, Analyze & Map Your Resume
            </h2>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-bold">Quick Profiles:</span>
            <button
              onClick={() => onLoadPreset('rachana')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-violet-950/60 hover:bg-violet-900/60 text-violet-200 border border-violet-500/30 transition-all cursor-pointer"
            >
              🎓 Rachana (AI / ML)
            </button>
            <button
              onClick={() => onLoadPreset('fullstack')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-sky-200 border border-slate-800 transition-all cursor-pointer"
            >
              💻 Aditya (Web Dev)
            </button>
            <button
              onClick={() => onLoadPreset('cyber')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-pink-200 border border-slate-800 transition-all cursor-pointer"
            >
              🛡️ Karan (Cyber)
            </button>
          </div>
        </div>
      </div>

      {/* Upload Zone & Profile Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload Dropzone */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Upload className="w-4 h-4 text-violet-400" />
                <span>Upload Resume</span>
              </h3>
              <button
                onClick={() => setPasteMode(!pasteMode)}
                className="text-xs text-violet-400 hover:text-violet-300 font-bold underline"
              >
                {pasteMode ? 'Upload PDF instead' : 'Paste text instead'}
              </button>
            </div>

            {!pasteMode ? (
              <div
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  dragActive 
                    ? 'border-violet-400 bg-violet-500/10 scale-[0.99]' 
                    : 'border-slate-800 hover:border-violet-500/40 bg-slate-950/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
                <div className="w-11 h-11 mx-auto rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-300 mb-2.5">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-white">
                  Drop your Resume PDF here
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Supports PDF or Plaintext (Max 10MB)
                </p>
                <div className="mt-3 inline-block px-3 py-1 rounded-lg bg-violet-950/60 text-violet-200 text-xs font-bold border border-violet-500/30">
                  Browse Files
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste your resume contents or bio text here..."
                  className="w-full h-36 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-400"
                />
                <button
                  onClick={handleTextSubmit}
                  className="w-full py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-md shadow-violet-600/30"
                >
                  Parse Text with NLP
                </button>
              </div>
            )}

            {/* Profile Strength Score */}
            {profile && (
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    <span>Profile Completeness</span>
                  </span>
                  <span className="text-violet-300 font-bold">
                    {profile.profile_strength_score || 85}/100
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-violet-400 via-sky-300 to-pink-300 h-1.5 rounded-full transition-all duration-700"
                    style={{ width: `${profile.profile_strength_score || 85}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Parsed Identity & Skills Tagging */}
        <div className="lg:col-span-7 space-y-4">
          {/* Identity Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <User className="w-4 h-4 text-violet-400" />
              <span>Extracted Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Name</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {profile?.contact?.name || 'Rachana Bonigala'}
                </span>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email</span>
                <span className="text-xs font-medium text-slate-200 mt-0.5 block truncate">
                  {profile?.contact?.email || 'rachana@example.com'}
                </span>
              </div>
            </div>

            {/* Education Snippet */}
            {profile?.education && profile.education.length > 0 && (
              <div className="pt-2 border-t border-slate-800">
                {profile.education.map((edu, idx) => (
                  <p key={idx} className="text-xs text-slate-300">
                    🎓 {edu.degree_or_institution} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Extracted Skills Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <FileCode className="w-4 h-4 text-violet-400" />
                <span>Extracted Skills ({userSkills.length})</span>
              </h3>
            </div>

            {/* Skill Badges */}
            <div className="flex flex-wrap gap-1.5 py-1 max-h-40 overflow-y-auto">
              {userSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-950 text-slate-200 border border-slate-800"
                >
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-400 ml-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add Skill Input */}
            <form onSubmit={handleAddSkill} className="pt-2 flex items-center space-x-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="Add another skill (e.g. PyTorch, Docker)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-400"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
