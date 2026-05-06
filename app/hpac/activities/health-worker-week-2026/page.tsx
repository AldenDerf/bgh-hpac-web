import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function HealthWorkerWeekActivityPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs />
          <BackButton />
          
          <header className="mb-10">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
              Event Management
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Health Worker Week 2026</h1>
            <p className="text-slate-500 font-medium">BGH Special Events & Recognition Hub</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Awards Menu Item */}
            <Link href="/hpac/activities/health-worker-week-2026/awards" className="group">
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Awards & Recognition</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Manage categories, review nominations, and view final results for excellence awards.
                </p>
              </div>
            </Link>

            {/* Other Event Items (Schedule, etc) */}
            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 opacity-60 grayscale cursor-not-allowed">
              <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Program Schedule</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Coordinate the daily activities and wellness sessions for the event week.
              </p>
              <span className="inline-block mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Coming Soon</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
