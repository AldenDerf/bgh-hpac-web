import Navbar from "@/components/Navbar";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Employee Portal</h1>
            <p className="text-sm text-gray-500 font-medium">General Information</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link 
              href="/health_worker_week_2026"
              className="md:col-span-2 group relative overflow-hidden bg-blue-600 rounded-[2rem] p-8 shadow-2xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-4">
                  Upcoming Event
                </span>
                <h2 className="text-3xl font-black text-white mb-2">Health Worker Week 2026</h2>
                <p className="text-blue-100 font-medium mb-6">Celebrate excellence and nominate your colleagues for awards!</p>
                <div className="inline-flex items-center gap-2 text-white font-bold text-sm">
                  View Event Details 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>

            <div className="bg-emerald-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-emerald-200">
              <h3 className="font-bold text-lg mb-2">My Profile</h3>
              <p className="text-emerald-100 text-sm mb-6">View your records and employment details.</p>
              <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl font-bold transition-colors">
                Go to Profile
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">General Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
                  Announcements
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                    <p className="text-sm font-semibold text-orange-800">New Benefits Package</p>
                    <p className="text-xs text-orange-600 mt-1">Check your email for details on the 2026 updates.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li className="text-blue-600 hover:underline cursor-pointer">Employee Handbook</li>
                  <li className="text-blue-600 hover:underline cursor-pointer">Payroll Info</li>
                  <li className="text-blue-600 hover:underline cursor-pointer">IT Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

