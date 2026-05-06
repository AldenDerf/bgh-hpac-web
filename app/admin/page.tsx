import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs />
          
          <header className="mb-10">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
              Admin Control
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">System Management</h1>
            <p className="text-slate-500 font-medium">BGH Administrative Operations Hub</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Awards Approval Link */}
            <Link href="/admin/awards" className="group">
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-blue-200 transition-all duration-300">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <span className="text-3xl">⚖️</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Award Approvals</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Review, approve, or reject new award categories proposed by the HPAC committee.
                </p>
              </div>
            </Link>

            {/* User Management */}
            <Link href="/admin/users" className="group">
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-blue-200 transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">User Management</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Audit system access, manage roles, and monitor hospital personnel account security.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
