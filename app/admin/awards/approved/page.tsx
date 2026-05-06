"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import BackButton from "@/components/BackButton";

interface Award {
  id: string;
  name: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdBy: {
    employee: {
      firstname: string;
      lastname: string;
    }
  }
}

export default function AdminApprovedAwardsPage() {
  const [approvedAwards, setApprovedAwards] = useState<Award[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApprovedAwards = async () => {
    try {
      const res = await fetch("/api/awards?status=APPROVED");
      const data = await res.json();
      setApprovedAwards(data);
    } catch (error) {
      console.error("Failed to fetch awards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedAwards();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs />
          <BackButton />
          
          <header className="mb-10">
            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
              Approved Records
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Approved Awards</h1>
            <p className="text-slate-500 font-medium">List of authorized award categories for Health Worker Week.</p>
          </header>

          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Finalized Categories</h2>
              <span className="text-[10px] font-black bg-white px-2 py-1 rounded-lg border border-slate-200 text-emerald-600">
                {approvedAwards.length} APPROVED
              </span>
            </div>

            <div className="divide-y divide-slate-50">
              {isLoading ? (
                <div className="p-10 text-center text-slate-400 font-medium italic">Loading records...</div>
              ) : approvedAwards.length === 0 ? (
                <div className="p-20 text-center text-slate-400">
                  No awards have been approved yet.
                </div>
              ) : (
                approvedAwards.map((award) => (
                  <div key={award.id} className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start gap-6 hover:bg-slate-50/30 transition-colors">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-slate-900">{award.name}</h4>
                        <span className="bg-emerald-50 text-emerald-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Approved</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{award.description}</p>
                      <div className="flex items-center gap-2 pt-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                          Proposed by: {award.createdBy?.employee?.firstname} {award.createdBy?.employee?.lastname}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
