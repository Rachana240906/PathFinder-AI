import React, { useState, useRef, useEffect } from 'react';
import {
  Upload, FileText, X, Plus, Check, ChevronRight,
  BookOpen, Cpu, Sparkles, History, Trash2, RotateCcw, Clock, CheckCircle2
} from 'lucide-react';
import RoadmapView from './RoadmapView';

const PRESETS = [
  { key: 'rachana',   label: 'Rachana — AI/ML',          role: 'AI / ML Engineer',      domain: 'Technical' },
  { key: 'fullstack', label: 'Aditya — Full Stack',       role: 'Full Stack Developer',  domain: 'Technical' },
  { key: 'priya',     label: 'Priya — Product Manager',   role: 'Product Manager',       domain: 'Product' },
  { key: 'sneha',     label: 'Sneha — Business Analyst',  role: 'Business Analyst',      domain: 'Business' },
  { key: 'cyber',     label: 'Karan — Cybersecurity',     role: 'Security Specialist',   domain: 'Technical' },
];

const HISTORY_KEY = 'pathfinder_resume_history';

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}

function saveHistory(items) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 10))); } catch {}
}

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function ResumeView({
  profile,
  setProfile,
  userSkills,
  setUserSkills,
  onAnalyze,
  loading,
  onLoadPreset,
  highlightUpload = false,
  roadmap,
  recommendations = [],
}) {
  const [dragActive, setDragActive] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [pasteMode, setPasteMode] = useState(false);
  const [rawText, setRawText] = useState('');
  const [resumeHistory, setResumeHistory] = useState(loadHistory);
  const [showHistory, setShowHistory] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const fileInputRef = useRef(null);

  // Persist history to localStorage whenever it changes
  useEffect(() => { saveHistory(resumeHistory); }, [resumeHistory]);

  const addToHistory = (parsedData, sourceLabel) => {
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      source: sourceLabel,
      name: parsedData?.contact?.name || 'Unknown Candidate',
      skillCount: (parsedData?.extracted_skills || []).length,
      profile: parsedData,
      skills: parsedData?.extracted_skills || [],
    };
    setResumeHistory(prev => [entry, ...prev]);
  };

  const restoreHistory = (entry) => {
    setProfile(entry.profile);
    setUserSkills(entry.skills);
    onAnalyze(entry.skills);
    setShowHistory(false);
  };

  const deleteHistory = (id) => {
    setResumeHistory(prev => prev.filter(e => e.id !== id));
  };

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleFileUpload = async (file) => {
    // Create a fresh object URL for viewing; revoke any previous one
    if (uploadedFileUrl) URL.revokeObjectURL(uploadedFileUrl);
    const fileUrl = URL.createObjectURL(file);
    setUploadedFileUrl(fileUrl);
    setShowPdfViewer(false);
    const fd = new FormData(); fd.append('file', file);
    try {
      const res = await fetch('/api/resume/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.status === 'success') {
        setProfile(data.data);
        setUserSkills(data.data.extracted_skills || []);
        onAnalyze(data.data.extracted_skills || []);
        addToHistory(data.data, file.name || 'Uploaded PDF');
      }
    } catch {
      onLoadPreset('rachana');
    }
  };

  const handleTextSubmit = async () => {
    if (!rawText.trim()) return;
    try {
      const res = await fetch('/api/resume/parse-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: rawText }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.status === 'success') {
        setProfile(data.data);
        setUserSkills(data.data.extracted_skills || []);
        onAnalyze(data.data.extracted_skills || []);
        addToHistory(data.data, 'Pasted Text');
        setPasteMode(false);
        setRawText('');
      }
    } catch { /* silent */ }
  };

  const addSkill = (e) => {
    e.preventDefault();
    const s = newSkill.trim();
    if (s && !userSkills.includes(s)) {
      const updated = [...userSkills, s];
      setUserSkills(updated);
      onAnalyze(updated);
    }
    setNewSkill('');
  };

  const removeSkill = (skill) => {
    const updated = userSkills.filter(s => s !== skill);
    setUserSkills(updated);
    onAnalyze(updated);
  };

  const contact = profile?.contact || {};
  const education = profile?.education || [];
  const projects = profile?.projects || [];
  const profileScore = profile?.profile_strength_score || 0;

  return (
    <div className="space-y-5 animate-fade-up">

      {/* ── Upload Zone ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Upload / Paste */}
        <div
          className={`rounded-2xl overflow-hidden shadow-sm transition-all ${
            highlightUpload && userSkills.length === 0 ? 'ring-2 ring-emerald-400' : ''
          }`}
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
            <div>
              <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Resume Intelligence</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Upload PDF or paste resume text to extract skills</p>
            </div>
            {highlightUpload && userSkills.length === 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 animate-pulse">
                <Sparkles size={10} /> Step 1: Upload Here
              </span>
            )}
          </div>

          <div className="p-5 space-y-4">
            {/* Toggle PDF / Paste */}
            <div
              className="flex rounded-xl overflow-hidden p-1"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              {[{ label: 'Upload PDF', value: false }, { label: 'Paste Text', value: true }].map(opt => (
                <button
                  key={String(opt.value)}
                  onClick={() => setPasteMode(opt.value)}
                  className="flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  style={{
                    background: pasteMode === opt.value ? 'var(--accent)' : 'transparent',
                    color: pasteMode === opt.value ? '#ffffff' : 'var(--text-muted)',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {pasteMode ? (
              <div className="space-y-3">
                <textarea
                  value={rawText}
                  onChange={e => setRawText(e.target.value)}
                  placeholder="Paste your full resume text here (Education, Experience, Projects, Skills)…"
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl text-xs outline-none resize-none"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    lineHeight: '1.6',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
                />
                <button
                  onClick={handleTextSubmit}
                  className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  style={{ background: 'var(--accent)', color: '#ffffff' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >
                  Parse Resume Text <ChevronRight size={14} />
                </button>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  highlightUpload && userSkills.length === 0 ? 'animate-upload-highlight bg-emerald-50/50' : ''
                }`}
                style={{
                  borderColor: dragActive ? 'var(--accent)' : (highlightUpload && userSkills.length === 0 ? 'var(--accent)' : 'var(--border)'),
                  background: dragActive ? 'var(--accent-dim)' : 'var(--bg-card)',
                }}
                onDragEnter={handleDrag} onDragLeave={handleDrag}
                onDragOver={handleDrag} onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-xs"
                  style={{ background: 'var(--accent)', color: '#ffffff' }}
                >
                  <Upload size={22} />
                </div>
                <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Drop your PDF resume here
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  or click to browse files · PDF files supported
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
              </div>
            )}

            {/* Demo Preset Profiles */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                Demo Profiles
              </p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(p => (
                  <button
                    key={p.key}
                    onClick={() => onLoadPreset(p.key)}
                    className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer"
                    style={{
                      background: 'var(--bg-card)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Parsed Profile Card */}
        <div
          className="rounded-2xl overflow-hidden shadow-sm"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
            <div>
              <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Parsed Profile</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Extracted candidate details</p>
            </div>
            <div className="flex items-center gap-2">
              {uploadedFileUrl && (
                <button
                  onClick={() => setShowPdfViewer(v => !v)}
                  className="text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  style={{
                    background: showPdfViewer ? 'var(--accent)' : 'var(--accent-dim)',
                    color: showPdfViewer ? '#ffffff' : 'var(--accent)',
                    border: '1px solid var(--accent-border)',
                  }}
                  onMouseEnter={e => { if (!showPdfViewer) e.currentTarget.style.background = 'rgba(5,150,105,0.15)'; }}
                  onMouseLeave={e => { if (!showPdfViewer) e.currentTarget.style.background = 'var(--accent-dim)'; }}
                >
                  <FileText size={13} />
                  {showPdfViewer ? 'Hide Resume' : 'View Resume'}
                </button>
              )}
              <div
                className="text-center px-3 py-1.5 rounded-xl"
                style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
              >
                <p className="text-lg font-extrabold leading-none" style={{ color: 'var(--accent)' }}>
                  {userSkills.length > 0 ? profileScore : 0}%
                </p>
                <p className="text-[9px] font-bold mt-0.5" style={{ color: 'var(--accent)' }}>Strength</p>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {contact.name || userSkills.length > 0 ? (
              <>
                {/* Identity */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0"
                    style={{ background: 'var(--accent)', color: '#ffffff' }}
                  >
                    {contact.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{contact.name || 'Candidate'}</p>
                    {contact.email && (
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{contact.email}</p>
                    )}
                  </div>
                </div>

                {/* Education */}
                {education.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Education</p>
                    {education.slice(0, 2).map((ed, i) => (
                      <div key={i} className="text-xs py-1.5 flex items-start gap-2">
                        <BookOpen size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                        <span style={{ color: 'var(--text-secondary)' }}>{ed.degree_or_institution}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Projects</p>
                    {projects.slice(0, 2).map((p, i) => (
                      <div key={i} className="text-xs py-1.5 flex items-start gap-2">
                        <Cpu size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                        <span className="line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-center p-4">
                <FileText size={32} style={{ color: '#94a3b8' }} className="mb-2" />
                <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>No profile extracted yet</p>
                <p className="text-[11px] mt-0.5 max-w-xs" style={{ color: 'var(--text-muted)' }}>
                  Upload a PDF resume on the left or click a demo profile to preview parsed results.
                </p>
              </div>
            )}

            {/* Embedded PDF Viewer Panel */}
            {showPdfViewer && uploadedFileUrl && (
              <div className="mt-4 pt-4 border-t border-slate-200 animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <FileText size={14} className="text-emerald-600" /> Embedded PDF Preview
                  </span>
                  <a
                    href={uploadedFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-600 hover:underline font-semibold"
                  >
                    Open in new tab ↗
                  </a>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-96">
                  <iframe
                    src={uploadedFileUrl}
                    title="Resume PDF Preview"
                    className="w-full h-full border-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Resume Version History ── */}
      <div
        className="rounded-2xl overflow-hidden shadow-sm"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <button
          onClick={() => setShowHistory(v => !v)}
          className="w-full px-5 py-4 flex items-center justify-between cursor-pointer transition-all"
          style={{ borderBottom: showHistory ? '1px solid var(--border)' : 'none' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.01)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
            >
              <History size={15} style={{ color: 'var(--accent)' }} />
            </div>
            <div className="text-left">
              <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                Resume Version History
              </h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {resumeHistory.length === 0
                  ? 'No uploads yet — upload your resume to see history here'
                  : `${resumeHistory.length} version${resumeHistory.length > 1 ? 's' : ''} saved · Click any version to restore it`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {resumeHistory.length > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {resumeHistory.length} saved
              </span>
            )}
            <ChevronRight
              size={16}
              className="transition-transform duration-200"
              style={{
                color: 'var(--text-muted)',
                transform: showHistory ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            />
          </div>
        </button>

        {showHistory && (
          <div className="p-4 space-y-2.5">
            {resumeHistory.length === 0 ? (
              <div className="py-8 text-center">
                <Clock size={28} className="mx-auto mb-3" style={{ color: '#cbd5e1' }} />
                <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>No resume history yet</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Every resume you upload or parse will appear here, timestamped and ready to restore.
                </p>
              </div>
            ) : (
              resumeHistory.map((entry, idx) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 p-3.5 rounded-xl border transition-all"
                  style={{
                    background: idx === 0 ? 'rgba(5,150,105,0.04)' : 'var(--bg-card)',
                    borderColor: idx === 0 ? 'var(--accent-border)' : 'var(--border)',
                  }}
                >
                  {/* Version badge */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-xs shadow-xs"
                    style={{
                      background: idx === 0 ? 'var(--accent)' : 'var(--bg-surface)',
                      color: idx === 0 ? '#ffffff' : 'var(--text-muted)',
                      border: idx !== 0 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    v{resumeHistory.length - idx}
                  </div>

                  {/* Entry metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                        {entry.name}
                      </p>
                      {idx === 0 && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                          ✓ Current
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] mt-0.5 flex items-center gap-1.5 flex-wrap" style={{ color: 'var(--text-muted)' }}>
                      <Clock size={10} />
                      {fmtDate(entry.timestamp)}
                      <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                      <FileText size={10} />
                      {entry.source}
                      <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                      <CheckCircle2 size={10} style={{ color: 'var(--accent)' }} />
                      {entry.skillCount} skills extracted
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {idx !== 0 && (
                      <button
                        onClick={() => restoreHistory(entry)}
                        className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                        style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(5,150,105,0.2)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-dim)'; }}
                        title="Restore this resume version"
                      >
                        <RotateCcw size={11} /> Restore
                      </button>
                    )}
                    <button
                      onClick={() => deleteHistory(entry.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                      style={{ color: 'var(--text-muted)', background: 'transparent' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.background = 'rgba(220,38,38,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
                      title="Delete from history"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}

            {resumeHistory.length > 0 && (
              <p className="text-[10px] text-center pt-1" style={{ color: 'var(--text-muted)' }}>
                History saved locally in your browser · Up to 10 versions stored · Upload a new resume to track your growth over time
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Skill Editor ── */}
      <div
        className="rounded-2xl overflow-hidden shadow-sm"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              Skills — {userSkills.length} active
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Click × to remove · Add skills manually below</p>
          </div>
          {userSkills.length > 0 && (
            <button
              onClick={() => onAnalyze(userSkills)}
              disabled={loading}
              className="text-xs px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              style={{ background: 'var(--accent)', color: '#ffffff', opacity: loading ? 0.6 : 1 }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = loading ? '0.6' : '1'; }}
            >
              {loading ? 'Analyzing…' : 'Re-analyze'} <ChevronRight size={13} />
            </button>
          )}
        </div>

        <div className="p-5 space-y-4">
          {userSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {userSkills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium"
                  style={{
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <Check size={11} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-1 rounded transition-colors cursor-pointer"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#dc2626'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              No skills added yet. Upload your resume above or add skills manually.
            </div>
          )}

          <form onSubmit={addSkill} className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              placeholder="Add a skill manually (e.g., Python, Docker, Figma, SQL)…"
              className="flex-1 px-3.5 py-2 rounded-xl text-xs outline-none transition-all"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 flex-shrink-0 transition-all cursor-pointer"
              style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(5,150,105,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-dim)'}
            >
              <Plus size={14} /> Add Skill
            </button>
          </form>
        </div>
      </div>

      {/* ── Embedded 12-Week Roadmap ── */}
      <div className="pt-4 border-t border-slate-200">
        <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Your 12-Week Milestone Roadmap</span>
        </h2>
        <RoadmapView roadmap={roadmap} recommendations={recommendations} />
      </div>
    </div>
  );
}
