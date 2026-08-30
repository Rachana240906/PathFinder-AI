import React from 'react';
import {
  LayoutDashboard, FileText, FolderGit2, Users, Compass, LogOut,
  ChevronRight, BookOpenCheck, Sparkles
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',            icon: LayoutDashboard },
  { id: 'resume',    label: 'Resume & Roadmap',     icon: FileText },
  { id: 'projects',  label: 'Recommended Projects', icon: FolderGit2 },
  { id: 'mentors',   label: 'Mentors',              icon: Users },
];

export default function AppShell({ activeTab, setActiveTab, currentUser, onLogout, onOpenPitch, highlightUpload = false, children }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>

      {/* ── Sidebar ── */}
      <aside
        className="sidebar flex-shrink-0 flex flex-col border-r h-full z-30 relative shadow-xs"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 cursor-pointer"
          style={{ height: 'var(--header-height)', borderBottom: '1px solid var(--border)' }}
          onClick={() => setActiveTab('dashboard')}
        >
          <div
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-xs"
            style={{ background: 'var(--accent)', boxShadow: 'var(--shadow-accent)' }}
          >
            <Compass className="w-4 h-4 text-white" />
          </div>
          <span className="sidebar-label font-black text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>
            PathFinder AI
          </span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-3 space-y-0.5 px-2">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            const isResumeHighlighted = id === 'resume' && highlightUpload && !isActive;

            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative cursor-pointer ${
                  isResumeHighlighted ? 'ring-2 ring-emerald-400 bg-emerald-50/70' : ''
                }`}
                style={{
                  background: isActive ? 'var(--accent-dim)' : (isResumeHighlighted ? 'rgba(5,150,105,0.08)' : 'transparent'),
                  color: isActive ? 'var(--accent)' : (isResumeHighlighted ? 'var(--accent)' : 'var(--text-secondary)'),
                }}
                onMouseEnter={e => { if (!isActive && !isResumeHighlighted) e.currentTarget.style.background = 'rgba(0,0,0,0.03)'; }}
                onMouseLeave={e => { if (!isActive && !isResumeHighlighted) e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 rounded-full"
                    style={{ background: 'var(--accent)' }}
                  />
                )}
                <Icon className="flex-shrink-0 w-4.5 h-4.5" size={18} />
                <span className="sidebar-label text-sm font-semibold">{label}</span>
                {id === 'mentors' && (
                  <span
                    className="sidebar-label text-[9px] font-bold px-1.5 py-0.5 rounded ml-auto bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    Soon
                  </span>
                )}
                {isResumeHighlighted && (
                  <span className="sidebar-label ml-auto flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Instructions & User */}
        <div className="px-2 pb-3 space-y-1" style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
          <button
            onClick={onOpenPitch}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <BookOpenCheck size={18} className="flex-shrink-0" />
            <span className="sidebar-label text-sm font-semibold">Instructions</span>
          </button>

          {currentUser && (
            <div className="flex items-center gap-3 px-3 py-2">
              <div
                className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-xs"
                style={{ background: 'var(--accent)' }}
              >
                {currentUser.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="sidebar-label flex-1 min-w-0">
                <p className="text-xs font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                  {currentUser.name}
                </p>
                <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>
                  {currentUser.email}
                </p>
              </div>
              <button
                onClick={onLogout}
                className="sidebar-label flex-shrink-0 p-1 rounded transition-colors cursor-pointer"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#dc2626'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                title="Sign out"
              >
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header
          className="flex-shrink-0 flex items-center justify-between px-6 shadow-xs"
          style={{
            height: 'var(--header-height)',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div>
            <h1 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              {NAV_ITEMS.find(n => n.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Team Twix · SVNIT Surat
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Backend status dot */}
            <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
              <span className="hidden sm:inline">Engine Online</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-base)' }}>
          <div className="max-w-6xl mx-auto px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
