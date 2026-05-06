import Navbar from "@/components/Navbar";

export default function HpacPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">HPAC Member Portal</h1>
            <p className="text-sm text-gray-500 font-medium">Member Services & Resources</p>
          </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg shadow-emerald-200">
            <h3 className="text-lg font-semibold opacity-80">Active Claims</h3>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>
          <div className="bg-teal-600 p-6 rounded-2xl text-white shadow-lg shadow-teal-200">
            <h3 className="text-lg font-semibold opacity-80">Pending Reviews</h3>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>
        </div>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Member Tools</h2>
          <p className="text-gray-600 mb-6">
            Welcome, HPAC Member. You have access to member-only resources and standard employee features.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="p-4 bg-emerald-50 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-100 transition-colors text-left border border-emerald-100">
              Submit New Claim
            </button>
            <button className="p-4 bg-teal-50 text-teal-700 font-semibold rounded-xl hover:bg-teal-100 transition-colors text-left border border-teal-100">
              View Guidelines
            </button>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
