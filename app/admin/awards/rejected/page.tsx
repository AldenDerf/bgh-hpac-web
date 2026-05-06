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

export default function AdminRejectedAwardsPage() {
  const [rejectedAwards, setRejectedAwards] = useState<Award[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRejectedAwards = async () => {
    try {
      const res = await fetch("/api/awards?status=REJECTED");
      const data = await res.json();
      setRejectedAwards(data);
    } catch (error) {
      console.error("Failed to fetch awards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRejectedAwards();
  }, []);

  const handleRestore = async (id: string) => {
    try {
      const res = await fetch(`/api/awards/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "PENDING" }),
      });

      if (res.ok) {
        setRejectedAwards(rejectedAwards.filter(a => a.id !== id));
      }
    } catch (error) {
      console.error("Failed to restore award:", error);
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
            <div className="inline-block px-3 py-1 bg-slate-200 text-slate-600 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
              Archived Proposals
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Rejected Awards</h1>
            <p className="text-slate-500 font-medium">History of award proposals that were not approved for this event.</p>
          </header>

          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Rejected Records</h2>
              <span className="text-[10px] font-black bg-white px-2 py-1 rounded-lg border border-slate-200 text-red-600">
                {rejectedAwards.length} ARCHIVED
              </span>
            </div>

            <div className="divide-y divide-slate-50">
              {isLoading ? (
                <div className="p-10 text-center text-slate-400 font-medium italic">Retrieving archive...</div>
              ) : rejectedAwards.length === 0 ? (
                <div className="p-20 text-center text-slate-300 font-medium uppercase tracking-widest text-[10px]">
                  Archive is empty.
                </div>
              ) : (
                rejectedAwards.map((award) => (
                  <div key={award.id} className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start gap-6 hover:bg-slate-50/30 transition-colors group">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-slate-400 group-hover:text-slate-600 transition-colors line-through decoration-slate-300">{award.name}</h4>
                        <span className="bg-slate-100 text-slate-500 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Rejected</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{award.description}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        Originally by: {award.createdBy?.employee?.firstname} {award.createdBy?.employee?.lastname}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleRestore(award.id)}
                      className="px-4 py-2 border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all uppercase tracking-widest whitespace-nowrap"
                    >
                      Restore to Pending
                    </button>
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
