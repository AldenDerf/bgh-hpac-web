"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { getEmployees, submitNomination, getUserNominations } from "./actions";

interface Award {
  id: string;
  name: string;
  description: string;
}

interface Employee {
  employeeId: string;
  firstname: string;
  lastname: string;
  section: string;
}

export default function HealthWorkerWeekPage() {
  const [approvedAwards, setApprovedAwards] = useState<Award[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [userNominations, setUserNominations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNominalModalOpen, setIsNominalModalOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedNomineeId, setSelectedNomineeId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchData = async () => {
    try {
      const [awardsRes, empData, nominationsData] = await Promise.all([
        fetch("/api/awards?status=APPROVED").then(res => res.json()),
        getEmployees(),
        getUserNominations()
      ]);
      setApprovedAwards(awardsRes);
      setEmployees(empData);
      setUserNominations(nominationsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNominate = (award: Award) => {
    setSelectedAward(award);
    setSearch("");
    setShowSuccess(false);
    setSelectedNomineeId(null);
    setIsNominalModalOpen(true);
  };

  const availableAwards = approvedAwards.filter(a => !userNominations.some(n => n.awardId === a.id));
  const completedAwards = approvedAwards.filter(a => userNominations.some(n => n.awardId === a.id));

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
            <div className="lg:col-span-12 space-y-6 sm:space-y-8">
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
                  ) : availableAwards.length === 0 ? (
                    <div className="py-10 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <p className="text-slate-500 font-bold">You've nominated in all available categories!</p>
                      <p className="text-xs text-slate-400 mt-1">Thank you for your participation.</p>
                    </div>
                  ) : (
                    availableAwards.map((award) => (
                      <div key={award.id} className="bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl p-5 sm:p-6 transition-all group/award">
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <h4 className="font-bold text-slate-900 group-hover/award:text-blue-700 transition-colors">{award.name}</h4>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{award.description}</p>
                          </div>
                          <button 
                            onClick={() => handleNominate(award)}
                            className="shrink-0 px-4 py-2 bg-white text-blue-600 text-xs font-black rounded-xl border border-slate-200 shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95"
                          >
                            NOMINATE
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* COMPLETED NOMINATIONS SECTION */}
              {completedAwards.length > 0 && (
                <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-xl border border-slate-100 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4.13-5.689Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900">Your Nominations</h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">Categories you've already voted for.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completedAwards.map((award) => {
                      const nomination = userNominations.find(n => n.awardId === award.id);
                      return (
                        <div key={award.id} className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 transition-all">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                <h4 className="font-bold text-slate-900 text-sm">{award.name}</h4>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">RECORDED</span>
                            </div>
                            
                            <div className="mt-1 p-3 bg-white/50 rounded-xl border border-emerald-100/50">
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Nominated</p>
                              <p className="text-sm font-bold text-slate-900">
                                {nomination?.nominee?.firstname} {nomination?.nominee?.lastname}
                              </p>
                              {nomination?.reason && (
                                <>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-3 mb-1">Reason</p>
                                  <p className="text-xs text-slate-600 italic leading-relaxed">
                                    "{nomination.reason}"
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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

      {/* Nomination Modal */}
      {isNominalModalOpen && selectedAward && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-500 max-h-[92vh] sm:max-h-[90vh] flex flex-col">
            <div className="overflow-y-auto custom-scrollbar p-6 sm:p-10">
              <header className="text-center mb-6 sm:mb-8 px-2 sm:px-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                    <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346v4.91a.75.75 0 0 0-.427.684l-.012.34c-.018.516-.035 1.031-.054 1.548h-1.13a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-1.13c-.019-.517-.036-1.032-.054-1.548l-.012-.34a.75.75 0 0 0-.427-.684v-4.91a6.73 6.73 0 0 0 2.743-1.346 6.753 6.753 0 0 0 6.138-5.6.75.75 0 0 0-.584-.859 47.469 47.469 0 0 0-3.071-.543v-.858a.75.75 0 0 1 .75-.75h1.125a.75.75 0 0 0 0-1.5H4.041a.75.75 0 0 0 0 1.5H5.166a.75.75 0 0 1 .75.75ZM20.25 5.053c.96.12 1.914.263 2.859.43a5.253 5.253 0 0 1-4.43 4.12 47.27 47.27 0 0 0 .522-3.8c.311-.254.664-.47 1.049-.64a.75.75 0 0 1 1.049.64V5.053Zm-16.5 0a.75.75 0 0 1 1.049-.64c.385.17.738.386 1.049.64a47.272 47.272 0 0 0 .522 3.8 5.253 5.253 0 0 1-4.43-4.12c.945-.167 1.899-.31 2.859-.43v.75Z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{selectedAward.name}</h3>
                <p className="text-slate-500 font-medium text-[10px] sm:text-xs mt-2 leading-relaxed">
                  {selectedAward.description}
                </p>
              </header>

              {showSuccess ? (
                <div className="py-8 sm:py-16 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-bounce-short">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 sm:w-12 sm:h-12">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.74-5.24Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 sm:mb-4">Nomination Saved!</h3>
                  <p className="text-sm sm:text-base text-slate-600 font-medium mb-8 sm:mb-10 leading-relaxed px-2 sm:px-4">
                    Your recognition for <span className="text-blue-600 font-bold">{selectedAward.name}</span> has been successfully recorded.
                  </p>
                  <button 
                    onClick={() => setIsNominalModalOpen(false)}
                    className="w-full py-4 sm:py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-slate-100"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  const formData = new FormData(e.currentTarget);
                  const data = {
                    awardId: selectedAward.id,
                    nomineeId: formData.get("nomineeId") as string,
                    reason: formData.get("reason") as string,
                  };

                  const result = await submitNomination(data);
                  setSubmitting(false);

                  if (result.success) {
                    setShowSuccess(true);
                    fetchData(); // Refresh nomination status
                  } else {
                    alert(result.error);
                  }
                }} className="space-y-5 sm:space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Search & Select Nominee</label>
                    <div className="space-y-3">
                      <div className="relative group">
                        <input 
                          type="text"
                          placeholder="Search name or section..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-2 border-slate-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-sm font-bold text-slate-900 transition-all outline-none pl-11 sm:pl-12 shadow-sm"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>

                    <div className="bg-slate-50 rounded-[1.5rem] sm:rounded-[2rem] border-2 border-slate-100 overflow-hidden">
                        <div className="max-h-40 sm:max-h-48 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                          {employees.filter(e => 
                            `${e.firstname} ${e.lastname}`.toLowerCase().includes(search.toLowerCase()) ||
                            e.section.toLowerCase().includes(search.toLowerCase())
                          ).length > 0 ? (
                            employees.filter(e => 
                              `${e.firstname} ${e.lastname}`.toLowerCase().includes(search.toLowerCase()) ||
                              e.section.toLowerCase().includes(search.toLowerCase())
                            ).map((emp) => (
                              <label 
                                key={emp.employeeId} 
                                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all border-2 ${
                                  selectedNomineeId === emp.employeeId 
                                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" 
                                    : "hover:bg-white border-transparent text-slate-900"
                                }`}
                              >
                                <div className="flex flex-col">
                                  <span className="font-bold text-xs sm:text-sm leading-tight">{emp.lastname}, {emp.firstname}</span>
                                  <span className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-wider ${
                                    selectedNomineeId === emp.employeeId ? "text-blue-100" : "text-slate-500"
                                  }`}>
                                    {emp.section}
                                  </span>
                                </div>
                                <input 
                                  type="radio" 
                                  name="nomineeId" 
                                  value={emp.employeeId}
                                  required
                                  checked={selectedNomineeId === emp.employeeId}
                                  onChange={() => setSelectedNomineeId(emp.employeeId)}
                                  className="sr-only"
                                />
                                {selectedNomineeId === emp.employeeId && (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-white">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </label>
                            ))
                          ) : (
                            <div className="py-6 sm:py-8 text-center text-slate-400 italic text-xs sm:text-sm">No employees found</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reason (Optional)</label>
                    <textarea 
                      name="reason" 
                      placeholder="Why this person?"
                      className="w-full px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-2 border-slate-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-sm font-bold text-slate-900 transition-all outline-none h-24 sm:h-32 resize-none shadow-sm"
                    />
                  </div>

                  <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
                    <button 
                      type="button" 
                      onClick={() => setIsNominalModalOpen(false)}
                      className="flex-1 py-3.5 sm:py-4 text-slate-400 hover:text-slate-900 font-black uppercase tracking-[0.2em] text-[10px] transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="flex-1 py-3.5 sm:py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {submitting ? "..." : "Confirm"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
