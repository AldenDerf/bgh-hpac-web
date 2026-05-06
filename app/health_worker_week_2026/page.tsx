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
              Honoring the dedication, compassion, and resilience of BGH health professionals.
            </p>
          </div>

          {/* Event Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Feature Card */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-xl border border-slate-100 group hover:shadow-2xl transition-all duration-300">
              <div className="h-64 bg-slate-900 rounded-2xl mb-8 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-emerald-600/40 mix-blend-overlay"></div>
                <span className="text-white text-lg font-bold z-10 text-center px-8">
                  "Your care transforms lives. This week is for you."
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Message from Administration</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                As we mark Health Worker Week 2026, we extend our deepest gratitude to every member of our team. 
                Whether you are on the front lines or supporting from behind the scenes, your commitment to 
                excellence is what makes Bataan General Hospital a pillar of health in our community.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">#BGHHeroes</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">#HealthWorkerWeek</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">#CareBeyondCompare</span>
              </div>
            </div>

            {/* Side Schedule Card */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white shadow-lg shadow-blue-200">
                <h3 className="text-xl font-bold mb-4">Event Schedule</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="font-bold opacity-75">Mon</span>
                    <span>Kick-off Ceremony</span>
                  </li>
                  <li className="flex gap-3 border-t border-white/10 pt-4">
                    <span className="font-bold opacity-75">Wed</span>
                    <span>Wellness Workshop</span>
                  </li>
                  <li className="flex gap-3 border-t border-white/10 pt-4">
                    <span className="font-bold opacity-75">Fri</span>
                    <span>Grand Recognition Gala</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Recognition</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Nominate a colleague for the "Excellence in Care" award.
                </p>
                <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                  Submit Nomination
                </button>
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
