import React, { useState } from 'react';
import { Users, Video, Code, FileCode, Bell, CheckCircle } from 'lucide-react';

export default function MentorComingSoon() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setTimeout(() => { setEmail(''); setSubmitted(false); }, 5000); }
  };

  const features = [
    { icon: Video,    label: '1-on-1 Alumni Mentorship',  desc: 'Verified engineer guidance matched to your career path.', color: '#059669', bg: 'bg-emerald-50' },
    { icon: Code,     label: 'AI Mock Interviews',         desc: 'Coding & system design rounds with instant AI feedback.',  color: '#0284c7', bg: 'bg-sky-50' },
    { icon: FileCode, label: 'Direct Referrals',           desc: 'Verified portfolio milestones earn fast-track reviews.',   color: '#7c3aed', bg: 'bg-purple-50' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-up">

      {/* Header card */}
      <div
        className="rounded-2xl p-8 text-center relative overflow-hidden shadow-sm"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(5,150,105,0.06) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 space-y-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-xs bg-emerald-50 border border-emerald-200"
          >
            <Users size={26} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            AI Mentorship & Mock Interviews
          </h1>
          <p className="text-xs leading-relaxed max-w-md mx-auto font-medium" style={{ color: 'var(--text-secondary)' }}>
            Direct connections to industry alumni from Google DeepMind, Stripe, and Microsoft Azure for portfolio reviews and 1:1 guidance.
          </p>
          <span
            className="inline-block text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
          >
            In Active Development
          </span>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map(({ icon: Icon, label, desc, color, bg }) => (
          <div
            key={label}
            className="rounded-2xl p-5 space-y-3 shadow-sm"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <h3 className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{label}</h3>
              <p className="text-[11px] mt-1 leading-relaxed font-medium" style={{ color: 'var(--text-muted)' }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Waitlist form */}
      <div
        className="rounded-2xl p-6 shadow-sm"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <p className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Join the Early Beta Waitlist
        </p>
        {submitted ? (
          <div
            className="flex items-center gap-2 text-xs font-bold px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200"
          >
            <CheckCircle size={16} />
            <span>You're on the priority waitlist! We'll notify you on release.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-1 px-3.5 py-2.5 rounded-xl text-xs outline-none transition-all"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 flex-shrink-0 transition-all cursor-pointer text-white shadow-xs"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <Bell size={13} /> Notify Me
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
