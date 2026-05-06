import Navbar from "@/components/Navbar";

export default function HealthWorkerWeekPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold tracking-wide uppercase mb-2 animate-bounce-short">
              Celebrating Our Heroes
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Health Worker Week <span className="text-blue-600">2026</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Join us in honoring those who dedicate their lives to care.
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* PRIMARY HIGHLIGHT: Recognition (col-span 7) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-blue-100/50 border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-32 h-32 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                
                <h2 className="text-4xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  Excellence in Care <span className="text-blue-600">Awards</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                  Who has inspired you this year? Nominate a colleague who exemplifies compassion, clinical excellence, and teamwork.
                </p>
                
                <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">🏆 Recognition Categories:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 font-semibold">
                    <li className="flex items-center gap-2">✨ Patient Choice Award</li>
                    <li className="flex items-center gap-2">🤝 Best Team Player</li>
                    <li className="flex items-center gap-2">💡 Innovation in Care</li>
                    <li className="flex items-center gap-2">🛡️ Safety Sentinel</li>
                  </ul>
                </div>

                <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-xl shadow-blue-200 active:scale-95">
                  Nominate a Colleague Now
                </button>
              </div>

              {/* Recognition Stats/Badge */}
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-1">Impact</p>
                  <h3 className="text-2xl font-bold">248 Health Workers</h3>
                  <p className="text-slate-400 text-sm">Already recognized this month by patients and peers.</p>
                </div>
                <div className="h-14 w-14 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* SECONDARY HIGHLIGHT: Event Schedule (col-span 5) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 h-full">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-slate-900">Event Schedule</h3>
                  <span className="bg-blue-50 text-blue-600 text-xs font-black px-3 py-1 rounded-full">WEEK 2026</span>
                </div>
                
                <div className="space-y-6">
                  {[
                    { day: "Mon", title: "Kick-off Ceremony", time: "8:00 AM", desc: "Breakfast and opening remarks at the Main Hall." },
                    { day: "Tue", title: "Sports & Wellness", time: "3:00 PM", desc: "Inter-departmental friendly matches and yoga." },
                    { day: "Wed", title: "Wellness Workshop", time: "1:00 PM", desc: "Mental health and resilience training session." },
                    { day: "Thu", title: "Cultural Night", time: "6:00 PM", desc: "Talent showcase and dinner for all staff." },
                    { day: "Fri", title: "Recognition Gala", time: "7:00 PM", desc: "Grand awards night and celebration dinner." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          {item.day}
                        </div>
                        {i < 4 && <div className="w-0.5 h-full bg-slate-100 my-1"></div>}
                      </div>
                      <div className="pb-4">
                        <p className="text-xs font-bold text-blue-500 mb-1">{item.time}</p>
                        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Gallery Placeholder */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm font-medium">
              Check back daily for photo updates and announcements.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
