"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { getEmployees, submitNomination } from "./actions";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isNominalModalOpen, setIsNominalModalOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedNomineeId, setSelectedNomineeId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
@@ -49,6 +50,7 @@
   const handleNominate = (award: Award) => {
     setSelectedAward(award);
     setSearch("");
+    setShowSuccess(false);
     setSelectedNomineeId(null);
     setIsNominalModalOpen(true);
   };
@@ -142,88 +144,115 @@
       {isNominalModalOpen && selectedAward && (
         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
-            <div className="p-8 sm:p-10">
-              <header className="text-center mb-8">
-                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
-                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
-                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
-                  </svg>
+            {showSuccess ? (
+              <div className="p-10 sm:p-16 text-center animate-in fade-in zoom-in duration-500">
+                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-short">
+                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
+                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.74-5.24Z" clipRule="evenodd" />
+                  </svg>
                 </div>
-                <h3 className="text-2xl font-black text-slate-900">{selectedAward.name}</h3>
-                <p className="text-slate-500 font-medium text-sm mt-1">Submit your nomination for this category</p>
-              </header>
+                <h3 className="text-3xl font-black text-slate-900 mb-4">Nomination Saved!</h3>
+                <p className="text-slate-600 font-medium mb-10 leading-relaxed px-4">
+                  Your recognition for <span className="text-blue-600 font-bold">{selectedAward.name}</span> has been successfully recorded. Thank you for celebrating excellence!
+                </p>
+                <button 
+                  onClick={() => setIsNominalModalOpen(false)}
+                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-slate-100"
+                >
+                  Done
+                </button>
+              </div>
+            ) : (
+              <div className="p-8 sm:p-10">
+                <header className="text-center mb-8">
+                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
+                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
+                      <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
+                    </svg>
+                  </div>
+                  <h3 className="text-2xl font-black text-slate-900">{selectedAward.name}</h3>
+                  <p className="text-slate-500 font-medium text-sm mt-1">Submit your nomination for this category</p>
+                </header>
 
-              <form onSubmit={async (e) => {
-                e.preventDefault();
-                setSubmitting(true);
-                const formData = new FormData(e.currentTarget);
-                const data = {
-                  awardId: selectedAward.id,
-                  nomineeId: formData.get("nomineeId") as string,
-                  reason: formData.get("reason") as string,
-                };
+                <form onSubmit={async (e) => {
+                  e.preventDefault();
+                  setSubmitting(true);
+                  const formData = new FormData(e.currentTarget);
+                  const data = {
+                    awardId: selectedAward.id,
+                    nomineeId: formData.get("nomineeId") as string,
+                    reason: formData.get("reason") as string,
+                  };
 
-                const result = await submitNomination(data);
-                setSubmitting(false);
+                  const result = await submitNomination(data);
+                  setSubmitting(false);
 
-                if (result.success) {
-                  alert("Nomination submitted successfully!");
-                  setIsNominalModalOpen(false);
-                } else {
-                  alert(result.error);
-                }
-              }} className="space-y-6">
-                <div className="space-y-2">
-                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Search & Select Nominee</label>
+                  if (result.success) {
+                    setShowSuccess(true);
+                  } else {
+                    alert(result.error);
+                  }
+                }} className="space-y-6">
                   <div className="space-y-2">
-                    <div className="relative">
-                      <input 
-                        type="text"
-                        placeholder="Search by name or section..."
-                        value={search}
-                        onChange={(e) => setSearch(e.target.value)}
-                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 focus:border-blue-600 rounded-2xl text-sm font-bold text-slate-900 transition-all outline-none pl-12"
-                      />
-                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
-                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
-                          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
-                        </svg>
+                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Search & Select Nominee</label>
+                    <div className="space-y-3">
+                      <div className="relative">
+                        <input 
+                          type="text"
+                          placeholder="Search by name or section..."
+                          value={search}
+                          onChange={(e) => setSearch(e.target.value)}
+                          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 focus:border-blue-600 rounded-2xl text-sm font-bold text-slate-900 transition-all outline-none pl-12"
+                        />
+                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
+                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
+                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
+                          </svg>
+                        </div>
+                      </div>
+
+                      <div className="bg-slate-50 rounded-[2rem] border-2 border-slate-100 overflow-hidden">
+                        <div className="max-h-48 overflow-y-auto p-2 space-y-1 custom-scrollbar">
+                          {filteredEmployees.length > 0 ? (
+                            filteredEmployees.map((emp) => (
+                              <label 
+                                key={emp.employeeId} 
+                                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border-2 ${
+                                  selectedNomineeId === emp.employeeId 
+                                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" 
+                                    : "hover:bg-white border-transparent text-slate-900"
+                                }`}
+                              >
+                                <div className="flex flex-col">
+                                  <span className="font-bold text-sm leading-tight">{emp.lastname}, {emp.firstname}</span>
+                                  <span className={`text-[10px] font-medium uppercase tracking-wider ${
+                                    selectedNomineeId === emp.employeeId ? "text-blue-100" : "text-slate-500"
+                                  }`}>
+                                    {emp.section}
+                                  </span>
+                                </div>
+                                <input 
+                                  type="radio" 
+                                  name="nomineeId" 
+                                  value={emp.employeeId}
+                                  required
+                                  checked={selectedNomineeId === emp.employeeId}
+                                  onChange={() => setSelectedNomineeId(emp.employeeId)}
+                                  className="sr-only"
+                                />
+                                {selectedNomineeId === emp.employeeId && (
+                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
+                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
+                                  </svg>
+                                )}
+                              </label>
+                            ))
+                          ) : (
+                            <div className="py-8 text-center text-slate-400 italic text-sm">No employees found</div>
+                          )}
+                        </div>
+                      </div>
                     </div>
                   </div>
-
-                  <div className="bg-slate-50 rounded-[2rem] border-2 border-slate-100 overflow-hidden">
-                    <div className="max-h-48 overflow-y-auto p-2 space-y-1 custom-scrollbar">
-                      {filteredEmployees.length > 0 ? (
-                        filteredEmployees.map((emp) => (
-                          <label 
-                            key={emp.employeeId} 
-                            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border-2 ${
-                              selectedNomineeId === emp.employeeId 
-                                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" 
-                                : "hover:bg-white border-transparent text-slate-900"
-                            }`}
-                          >
-                            <div className="flex flex-col">
-                              <span className="font-bold text-sm leading-tight">{emp.lastname}, {emp.firstname}</span>
-                              <span className={`text-[10px] font-medium uppercase tracking-wider ${
-                                selectedNomineeId === emp.employeeId ? "text-blue-100" : "text-slate-500"
-                              }`}>
-                                {emp.section}
-                              </span>
-                            </div>
-                            <input 
-                              type="radio" 
-                              name="nomineeId" 
-                              value={emp.employeeId}
-                              required
-                              checked={selectedNomineeId === emp.employeeId}
-                              onChange={() => setSelectedNomineeId(emp.employeeId)}
-                              className="sr-only"
-                            />
-                            {selectedNomineeId === emp.employeeId && (
-                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
-                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
-                              </svg>
-                            )}
-                          </label>
-                        ))
-                      ) : (
-                        <div className="py-8 text-center text-slate-400 italic text-sm">No employees found</div>
-                      )}
-                    </div>
-                  </div>
-                </div>
-
-                <div className="space-y-2">
-                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reason (Optional)</label>
-                  <textarea 
-                    name="reason" 
-                    placeholder="Why are you nominating this person?"
-                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl text-sm font-bold text-slate-900 transition-all outline-none h-32 resize-none"
-                  />
-                </div>
-
-                <div className="flex gap-4 pt-4">
-                  <button 
-                    type="button" 
-                    onClick={() => setIsNominalModalOpen(false)}
-                    className="flex-1 py-4 text-slate-400 hover:text-slate-900 font-black uppercase tracking-[0.2em] text-[10px] transition-all"
-                  >
-                    Cancel
-                  </button>
-                  <button 
-                    type="submit" 
-                    disabled={submitting}
-                    className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:opacity-50"
-                  >
-                    {submitting ? "Submitting..." : "Confirm Nomination"}
-                  </button>
-                </div>
-              </form>
-            </div>
+
+                  <div className="space-y-2">
+                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reason (Optional)</label>
+                    <textarea 
+                      name="reason" 
+                      placeholder="Why are you nominating this person?"
+                      className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl text-sm font-bold text-slate-900 transition-all outline-none h-32 resize-none"
+                    />
+                  </div>
+
+                  <div className="flex gap-4 pt-4">
+                    <button 
+                      type="button" 
+                      onClick={() => setIsNominalModalOpen(false)}
+                      className="flex-1 py-4 text-slate-400 hover:text-slate-900 font-black uppercase tracking-[0.2em] text-[10px] transition-all"
+                    >
+                      Cancel
+                    </button>
+                    <button 
+                      type="submit" 
+                      disabled={submitting}
+                      className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:opacity-50"
+                    >
+                      {submitting ? "Submitting..." : "Confirm Nomination"}
+                    </button>
+                  </div>
+                </form>
+              </div>
+            )}
           </div>
         </div>
       )}

