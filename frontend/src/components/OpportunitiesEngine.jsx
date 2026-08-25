import React, { useState } from 'react';
import { Users, Briefcase, Award, ExternalLink, Calendar, MapPin, CheckCircle } from 'lucide-react';

export default function OpportunitiesEngine({ opportunitiesData }) {
  const [bookingSuccess, setBookingSuccess] = useState(null);

  if (!opportunitiesData) return null;

  const { mentors = [], opportunities = [] } = opportunitiesData;

  const handleConnectMentor = (mentorName) => {
    setBookingSuccess(`Session request sent to ${mentorName}! They will connect via email within 24 hours.`);
    setTimeout(() => setBookingSuccess(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Alert toast */}
      {bookingSuccess && (
        <div className="bg-emerald-950 border border-emerald-600 text-emerald-200 px-4 py-3 rounded-xl text-xs font-semibold flex items-center space-x-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{bookingSuccess}</span>
        </div>
      )}

      {/* AI Mentorship Engine */}
      <div className="space-y-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>AI Mentor Matching (Slide 9 Vision)</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Connect with Industry Mentors
          </h2>
          <p className="text-xs text-slate-400">
            Matched directly to your target career path and identified skill development goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {mentor.name}
                    </h3>
                    <p className="text-xs font-medium text-indigo-400">
                      {mentor.title} • {mentor.company}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  "{mentor.bio}"
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.expertise.map((exp, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-semibold">
                  ● {mentor.availability}
                </span>
                <button
                  onClick={() => handleConnectMentor(mentor.name)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  Book 1:1 Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internships & Hackathons */}
      <div className="space-y-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Opportunities & Hackathon Discovery (Slide 9)</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Curated Internships & Hackathons
          </h2>
          <p className="text-xs text-slate-400">
            Real-world opportunities benchmarked to your skill set.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {opp.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400">
                    {opp.stipend}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mt-1">
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {opp.company} • {opp.location}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Matching Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {opp.match_skills.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Deadline: {opp.deadline}</span>
                </span>
                <button
                  onClick={() => alert(`Redirecting to application portal for ${opp.title}`)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
