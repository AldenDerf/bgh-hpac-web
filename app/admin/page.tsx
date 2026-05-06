"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface Award {
  id: string;
  name: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdBy: {
    employee: {
      firstname: true;
      lastname: true;
    }
  }
}

export default function AdminPage() {
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
          <header className="mb-8">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
              System Admin
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium">BGH System Overview & Management</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-xl shadow-blue-100 relative overflow-hidden">
              <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Total Users</h3>
              <p className="text-3xl font-black mt-1">1,248</p>
            </div>
            <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
              <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Active Tasks</h3>
              <p className="text-3xl font-black mt-1">42</p>
            </div>
            <div className="bg-purple-600 p-6 rounded-3xl text-white shadow-xl shadow-purple-100 relative overflow-hidden">
              <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Pending Awards</h3>
              <p className="text-3xl font-black mt-1">{pendingAwards.length}</p>
            </div>
          </div>

          {/* Awards Approval Section */}
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-100 border border-slate-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-50 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-2xl">⚖️</span> Award Approvals
              </h2>
              <p className="text-sm text-slate-500">Review and approve proposed awards for Health Worker Week.</p>
            </div>

            <div className="divide-y divide-slate-100">
              {isLoading ? (
                <div className="p-10 text-center text-slate-400 font-medium">Loading awards...</div>
              ) : pendingAwards.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <p className="text-slate-500 font-bold">No pending awards to review.</p>
                </div>
              ) : (
                pendingAwards.map((award) => (
                  <div key={award.id} className="p-6 sm:p-8 hover:bg-slate-50/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-black text-slate-900">{award.name}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed max-w-lg">{award.description}</p>
                        <div className="flex items-center gap-2 mt-4">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-600">
                            {award.createdBy?.employee?.firstname?.[0] || "U"}
                          </div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                            Proposed by HPAC Member
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:flex-col shrink-0">
                        <button
                          onClick={() => handleStatusUpdate(award.id, "APPROVED")}
                          className="flex-1 sm:w-32 py-2.5 bg-emerald-100 text-emerald-700 text-xs font-black rounded-xl hover:bg-emerald-600 hover:text-white transition-all active:scale-95"
                        >
                          APPROVE
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(award.id, "REJECTED")}
                          className="flex-1 sm:w-32 py-2.5 bg-red-50 text-red-600 text-xs font-black rounded-xl hover:bg-red-600 hover:text-white transition-all active:scale-95"
                        >
                          REJECT
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
