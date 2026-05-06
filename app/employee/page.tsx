import Navbar from "@/components/Navbar";

export default function EmployeePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Employee Portal</h1>
            <p className="text-sm text-gray-500 font-medium">General Information</p>
          </header>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-gray-400 text-3xl font-bold">E</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 mb-8 max-w-lg">
              This is your personal employee portal. Here you can view company announcements, update your profile, and access general resources.
            </p>
            
            <div className="border-t border-gray-100 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Announcements</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                    <p className="text-sm font-semibold text-orange-800">New Benefits Package</p>
                    <p className="text-xs text-orange-600 mt-1">Check your email for details on the 2026 updates.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li className="text-blue-600 hover:underline cursor-pointer">Employee Handbook</li>
                  <li className="text-blue-600 hover:underline cursor-pointer">Payroll Info</li>
                  <li className="text-blue-600 hover:underline cursor-pointer">IT Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
