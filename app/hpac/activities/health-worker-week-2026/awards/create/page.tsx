"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";

export default function CreateAwardPage() {
  const [awardName, setAwardName] = useState("");
  const [awardDesc, setAwardDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/awards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: awardName, description: awardDesc }),
      });

      if (!res.ok) throw new Error("Failed to create award");

      setMessage({ type: "success", text: "Award submitted for approval!" });
      setAwardName("");
      setAwardDesc("");
      
      // Redirect back after short delay
      setTimeout(() => {
        router.push("/hpac/activities/health-worker-week-2026/awards");
      }, 2000);
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs />
          <BackButton />
          
          <header className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create New Award</h1>
            <p className="text-slate-500 font-medium">Define a new category for excellence recognition.</p>
          </header>

          <div className="bg-white p-6 sm:p-10 rounded-[2rem] shadow-2xl shadow-slate-200/30 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2 ml-1">Award Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Most Dedicated Pharmacist"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                  value={awardName}
                  onChange={(e) => setAwardName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-black text-slate-700 mb-2 ml-1">Criteria / Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What qualities or achievements are required for this award?"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                  value={awardDesc}
                  onChange={(e) => setAwardDesc(e.target.value)}
                />
              </div>

              {message && (
                <div className={`p-4 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-2 ${
                  message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
                }`}>
                  <div className="flex items-center gap-2">
                    {message.type === "success" ? "✅" : "❌"}
                    {message.text}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : "Submit Proposal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
