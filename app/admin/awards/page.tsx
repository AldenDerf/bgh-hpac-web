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

export default function AdminAwardsApprovalPage() {
  const [pendingAwards, setPendingAwards] = useState<Award[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPendingAwards = async () => {
    try {
      const res = await fetch("/api/awards?status=PENDING");
      const data = await res.json();
      setPendingAwards(data);
    } catch (error) {
      console.error("Failed to fetch awards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingAwards();
  }, []);

  const handleStatusUpdate = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      const res = await fetch(`/api/awards/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setPendingAwards(pendingAwards.filter(a => a.id !== id));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs />
          <BackButton />
          
          <header className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Award Approvals</h1>
            <p className="text-slate-500 font-medium">Review and authorize new award categories proposed by HPAC.</p>
          </header>

          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Pending Review</h2>
              <span className="text-[10px] font-black bg-white px-2 py-1 rounded-lg border border-slate-200 text-blue-600">
                {pendingAwards.length} REQUESTS
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {isLoading ? (
                <div className="p-10 text-center text-slate-400 font-medium animate-pulse italic">Retrieving proposals...</div>
              ) : pendingAwards.length === 0 ? (
                <div className="p-20 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <p className="text-slate-500 font-bold">All caught up! No awards pending approval.</p>
                </div>
              ) : (
                pendingAwards.map((award) => (
                  <div key={award.id} className="p-6 sm:p-10 hover:bg-slate-50/30 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                      <div className="space-y-3">
                        <h3 className="text-xl font-black text-slate-900">{award.name}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed max-w-xl">{award.description}</p>
                        
                        <div className="flex items-center gap-3 pt-4">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-black text-blue-600">
                            {award.createdBy?.employee?.firstname?.[0] || "H"}
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">Proposed by Member</p>
                            <p className="text-xs font-bold text-slate-700">
                              {award.createdBy?.employee?.firstname} {award.createdBy?.employee?.lastname}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 sm:flex-row lg:flex-col shrink-0 lg:w-40">
                        <button
                          onClick={() => handleStatusUpdate(award.id, "APPROVED")}
                          className="flex-1 py-4 bg-emerald-600 text-white text-[10px] font-black rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95 tracking-widest"
                        >
                          APPROVE AWARD
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(award.id, "REJECTED")}
                          className="flex-1 py-4 bg-slate-100 text-slate-600 text-[10px] font-black rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all active:scale-95 tracking-widest"
                        >
                          DISAPPROVE
                        </button>
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
