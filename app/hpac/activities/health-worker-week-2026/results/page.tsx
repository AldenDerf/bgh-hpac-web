"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import BackButton from "@/components/BackButton";
import { getNominationSummary } from "../actions";

export default function NominationResultsPage() {
  const [summary, setSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNominationSummary();
        setSummary(data);
      } catch (error) {
        console.error("Failed to load summary:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs />
          <BackButton />

          <header className="mb-10 mt-4">
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
              Live Statistics
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Nomination Results</h1>
            <p className="text-slate-500 font-medium">Real-time summary of voting participation and results.</p>
          </header>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Votes Cast</p>
              <h2 className="text-5xl font-black text-blue-600">{summary?.totalNominations}</h2>
              <p className="text-xs text-slate-500 mt-2 font-medium">Across all approved categories</p>
            </div>
            
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Active Participants</p>
              <h2 className="text-5xl font-black text-emerald-600">{summary?.uniqueVoters}</h2>
              <p className="text-xs text-slate-500 mt-2 font-medium">Unique employees who participated</p>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2rem] shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Full Completion</p>
              <h2 className="text-5xl font-black text-white">
                {summary?.finishedAllCount}
                <span className="text-xl text-slate-500 ml-2">/ {summary?.uniqueVoters}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-2 font-medium">Participants who finished all {summary?.approvedAwardsCount} categories</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Section Breakdown */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                  By Section
                </h3>
                <div className="space-y-4">
                  {summary?.sectionCounts.sort((a: any, b: any) => b.count - a.count).map((item: any) => (
                    <div key={item.section} className="flex items-center justify-between group">
                      <div className="space-y-1">
                        <p className="font-bold text-slate-700 text-sm">{item.section}</p>
                        <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 transition-all duration-1000" 
                            style={{ width: `${summary.totalNominations > 0 ? (item.count / summary.totalNominations) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-lg font-black text-slate-900">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Award Results */}
            <div className="lg:col-span-8 space-y-8">
              {summary?.resultsPerAward.map((award: any) => (
                <div key={award.id} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-slate-900">{award.name}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed max-w-2xl">{award.description}</p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="text-2xl font-black text-blue-600">{award.totalVotes}</span>
                      <p className="text-[10px] font-black text-slate-400 uppercase">Total Votes</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {award.topNominees.length === 0 ? (
                      <p className="text-center py-6 text-slate-400 font-medium italic">No nominations yet.</p>
                    ) : (
                      award.topNominees.map((nominee: any, idx: number) => (
                        <div 
                          key={nominee.name} 
                          className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                            idx === 0 ? "bg-blue-50 border border-blue-100" : "bg-slate-50/50 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                              idx === 0 ? "bg-blue-600 text-white" : "bg-white text-slate-400 border border-slate-200"
                            }`}>
                              {idx + 1}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{nominee.name}</p>
                              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">{nominee.section}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                              <div 
                                className={`h-full transition-all duration-1000 ${idx === 0 ? "bg-blue-600" : "bg-slate-400"}`}
                                style={{ width: `${award.totalVotes > 0 ? (nominee.count / award.totalVotes) * 100 : 0}%` }}
                              ></div>
                            </div>
                            <span className="font-black text-slate-900 text-base w-8 text-right">{nominee.count}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
