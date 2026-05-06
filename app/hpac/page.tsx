import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function HpacPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs />
          
          <header className="mb-10">
            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
              HPAC Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Activities & Events</h1>
            <p className="text-slate-500 font-medium">Manage hospital personnel advisory committee actions.</p>
          </header>

          <div className="grid grid-cols-1 gap-6">
            {/* Health Worker Week Activity Card */}
            <Link href="/hpac/activities/health-worker-week-2026" className="group">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-emerald-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m0 10h1m-1 4h1m-7 10v-2a2 2 0 012-2h2a2 2 0 012 2v2m-7 0h11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Health Worker Week 2026</h3>
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Active Activity</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 max-w-lg mb-6 leading-relaxed">
                    Manage awards, recognize excellence, and organize events for the upcoming Health Worker Week celebration.
                  </p>
                  
                  <div className="flex items-center text-emerald-600 font-bold text-sm gap-2">
                    Enter Activity Dashboard
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Other Activity Placeholder */}
            <div className="bg-slate-100/50 p-8 rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No Other Active Activities</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
