import Navbar from "@/components/Navbar";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 font-medium">System Overview & Management</p>
          </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
            <h3 className="text-lg font-semibold opacity-80">Total Users</h3>
            <p className="text-3xl font-bold mt-2">1,248</p>
          </div>
          <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-200">
            <h3 className="text-lg font-semibold opacity-80">Active Tasks</h3>
            <p className="text-3xl font-bold mt-2">42</p>
          </div>
          <div className="bg-purple-600 p-6 rounded-2xl text-white shadow-lg shadow-purple-200">
            <h3 className="text-lg font-semibold opacity-80">System Health</h3>
            <p className="text-3xl font-bold mt-2">99.9%</p>
          </div>
        </div>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Privileged Actions</h2>
          <p className="text-gray-600 mb-6">
            As an Administrator, you have full access to system configuration, user auditing, and role management.
          </p>
          <div className="space-y-3">
            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold">U</span>
              </div>
              <span className="font-medium text-gray-700">User Management</span>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-purple-600 font-bold">L</span>
              </div>
              <span className="font-medium text-gray-700">Audit Logs</span>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
