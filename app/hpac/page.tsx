"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function HpacPage() {
  const [awardName, setAwardName] = useState("");
  const [awardDesc, setAwardDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
              HPAC Access
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Member Portal</h1>
            <p className="text-slate-500 font-medium">BGH Hospital Personnel Advisory Committee</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <div className="bg-emerald-600 p-6 rounded-3xl text-white shadow-xl shadow-emerald-100 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Active Claims</h3>
              <p className="text-4xl font-black mt-2">12</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Pending Reviews</h3>
              <p className="text-4xl font-black mt-2">5</p>
            </div>
          </div>

          {/* Award Creation Form */}
          <div className="bg-white p-6 sm:p-10 rounded-[2rem] shadow-2xl shadow-slate-100 border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Create New Award</h2>
                <p className="text-sm text-slate-500">Proposed awards require Admin approval.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Award Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Most Compassionate Nurse"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
                  value={awardName}
                  onChange={(e) => setAwardName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the criteria for this award..."
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
                  value={awardDesc}
                  onChange={(e) => setAwardDesc(e.target.value)}
                />
              </div>

              {message && (
                <div className={`p-4 rounded-2xl text-sm font-bold ${
                  message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
                }`}>
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit for Approval"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
