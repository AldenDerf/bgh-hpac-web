"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface Award {
  id: string;
  name: string;
  description: string;
}

export default function HealthWorkerWeekPage() {
  const [approvedAwards, setApprovedAwards] = useState<Award[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
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
    fetchAwards();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1 animate-bounce-short">
              Celebrating Our Heroes
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight px-2">
              Health Worker Week <span className="text-blue-600">2026</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium px-4">
              Join us in honoring those who dedicate their lives to care.
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            
            {/* PRIMARY HIGHLIGHT: Recognition (col-span 7) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-blue-100/50 border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-24 h-24 sm:w-32 sm:h-32 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 sm:mb-6 flex items-center gap-3">
                  Nominate a <span className="text-blue-600 whitespace-nowrap">Colleague</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                  Celebrate excellence! Select an award category below and recognize the outstanding work of your peers.
                </p>
                
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="py-10 text-center text-slate-400 font-medium">Loading awards...</div>
                  ) : approvedAwards.length === 0 ? (
                    <div className="py-10 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <p className="text-slate-500 font-bold">Awards are currently being finalized.</p>
                      <p className="text-xs text-slate-400 mt-1">Check back soon to start nominating!</p>
                    </div>
                  ) : (
                    approvedAwards.map((award) => (
                      <div key={award.id} className="bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl p-5 sm:p-6 transition-all group/award">
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <h4 className="font-bold text-slate-900 group-hover/award:text-blue-700 transition-colors">{award.name}</h4>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{award.description}</p>
                          </div>
                          <button className="shrink-0 px-4 py-2 bg-white text-blue-600 text-xs font-black rounded-xl border border-slate-200 shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95">
                            NOMINATE
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* SECONDARY HIGHLIGHT: Event Schedule (col-span 5) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 shadow-xl border border-slate-100 h-full">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Event Schedule</h3>
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Week 2026</span>
                </div>
                
                <div className="space-y-6">
                  {[
                    { day: "Mon", title: "Kick-off Ceremony", time: "8:00 AM", desc: "Breakfast and opening remarks at the Main Hall." },
                    { day: "Tue", title: "Sports & Wellness", time: "3:00 PM", desc: "Inter-departmental matches and yoga." },
                    { day: "Wed", title: "Wellness Workshop", time: "1:00 PM", desc: "Mental health and resilience training." },
                    { day: "Thu", title: "Cultural Night", time: "6:00 PM", desc: "Talent showcase and staff dinner." },
                    { day: "Fri", title: "Recognition Gala", time: "7:00 PM", desc: "Grand awards night and celebration." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 sm:gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          {item.day}
                        </div>
                        {i < 4 && <div className="w-0.5 h-full bg-slate-100 my-1"></div>}
                      </div>
                      <div className="pb-4">
                        <p className="text-[10px] font-bold text-blue-500 mb-1">{item.time}</p>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors leading-tight">{item.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Gallery Placeholder */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm font-medium">
              Check back daily for photo updates and announcements.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
