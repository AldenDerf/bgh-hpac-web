"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import BackButton from "@/components/BackButton";
import Link from "next/link";

interface Award {
  id: string;
  name: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function HpacAwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const res = await fetch("/api/awards");
        const data = await res.json();
        setAwards(data);
      } catch (error) {
        console.error("Failed to fetch awards:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAwards();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <BackButton />
            <Link 
              href="/hpac/activities/health-worker-week-2026/awards/create"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-black text-sm rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 mb-6 sm:mb-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create New Award
            </Link>
          </div>
          
          <header className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Awards Management</h1>
            <p className="text-slate-500 font-medium">Review and track excellence awards for Health Worker Week.</p>
          </header>

          <div className="space-y-6">
            {/* Awards List */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <h2 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Proposed Awards</h2>
                <span className="text-[10px] font-black bg-white px-2 py-1 rounded-lg border border-slate-200 text-slate-400">
                  {awards.length} TOTAL
                </span>
              </div>

              <div className="divide-y divide-slate-50">
                {isLoading ? (
                  <div className="p-10 text-center text-slate-400 font-medium italic">Syncing with registry...</div>
                ) : awards.length === 0 ? (
                  <div className="p-16 text-center">
                    <p className="text-slate-400 font-bold mb-4">No awards created yet.</p>
                    <Link href="/hpac/activities/health-worker-week-2026/awards/create" className="text-blue-600 font-black text-sm hover:underline">
                      Create the first one →
                    </Link>
                  </div>
                ) : (
                  awards.map((award) => (
                    <div key={award.id} className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start gap-6 hover:bg-slate-50/30 transition-colors">
                      <div className="space-y-1">
                        <h4 className="font-black text-slate-900">{award.name}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-lg">{award.description}</p>
                      </div>
                      <div className="shrink-0">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                          award.status === "APPROVED" ? "bg-emerald-100 text-emerald-700" :
                          award.status === "REJECTED" ? "bg-red-100 text-red-700" :
                          "bg-amber-100 text-amber-700"
                        }`}>
                          {award.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Placeholder for Results */}
            <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl shadow-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Award Results</h3>
                <p className="text-slate-400 text-sm max-w-sm">
                  Final results and statistics for the Health Worker Week 2026 awards will be generated here after voting is complete.
                </p>
              </div>
              <div className="shrink-0 relative z-10">
                <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
