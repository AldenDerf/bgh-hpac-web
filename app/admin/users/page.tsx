"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import BackButton from "@/components/BackButton";

interface Employee {
  employeeId: string;
  firstname: string;
  lastname: string;
  position: string;
  section: string;
  user?: {
    id: string;
    userType: string;
    requiresPasswordChange: boolean;
  } | null;
}

export default function AdminUserManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/admin/employees");
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleRoleToggle = async (employeeId: string, currentRole?: string) => {
    const newRole = currentRole ? null : "HPAC_MEMBER"; // Default promotion to HPAC
    
    if (currentRole) {
      // Demote
      if (confirm("Remove administrative access for this user?")) {
        await fetch("/api/admin/users", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employeeId }),
        });
      }
    } else {
      // Promote
      const role = prompt("Enter role (ADMIN or HPAC_MEMBER):", "HPAC_MEMBER");
      if (role === "ADMIN" || role === "HPAC_MEMBER") {
        await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employeeId, userType: role }),
        });
      }
    }
    fetchEmployees();
  };

  const handlePasswordReset = async (employeeId: string) => {
    if (confirm("Reset password to 'hpacpassword'? User will be forced to change it on next login.")) {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId }),
      });
      alert("Password reset successfully.");
    }
  };

  const filteredEmployees = employees.filter(e => 
    `${e.firstname} ${e.lastname}`.toLowerCase().includes(search.toLowerCase()) ||
    e.employeeId.includes(search)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs />
          <BackButton />

          <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
              <p className="text-slate-500 font-medium">Manage hospital personnel and system access roles.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search name or ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all w-full md:w-64"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <button 
                onClick={() => {
                  setEditingEmployee(null);
                  setIsModalOpen(true);
                }}
                className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
              >
                Add Employee
              </button>
            </div>
          </header>

          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Role</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Security</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-medium italic">Syncing records...</td>
                    </tr>
                  ) : filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-slate-400">No records found matching your search.</td>
                    </tr>
                  ) : (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.employeeId} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                              {employee.firstname[0]}{employee.lastname[0]}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{employee.firstname} {employee.lastname}</p>
                              <p className="text-xs text-slate-400">{employee.employeeId} • {employee.position}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          {employee.user ? (
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase ${
                              employee.user.userType === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                            }`}>
                              {employee.user.userType.replace("_", " ")}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">No Access</span>
                          )}
                        </td>
                        <td className="px-8 py-6">
                          {employee.user?.requiresPasswordChange && (
                            <div className="flex items-center gap-2 text-amber-600">
                              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                              <span className="text-[10px] font-black uppercase tracking-tighter">Setup Required</span>
                            </div>
                          )}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {employee.user && (
                              <button 
                                onClick={() => handlePasswordReset(employee.employeeId)}
                                className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                                title="Reset Password"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818l5.73-5.83a1.5 1.5 0 0 0 .433-1.06V8.25a6 6 0 0 1 12 0Z" />
                                </svg>
                              </button>
                            )}
                            <button 
                              onClick={() => handleRoleToggle(employee.employeeId, employee.user?.userType)}
                              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                employee.user 
                                  ? "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600" 
                                  : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                              }`}
                            >
                              {employee.user ? "Remove Role" : "Add Access"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Basic Add/Edit Modal (Simplified for this task) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl p-10">
            <h2 className="text-2xl font-black text-slate-900 mb-8">{editingEmployee ? "Edit Employee" : "New Employee"}</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData);
              
              await fetch("/api/admin/employees", {
                method: editingEmployee ? "PATCH" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });
              
              setIsModalOpen(false);
              fetchEmployees();
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input name="employeeId" placeholder="Employee ID" required className="px-6 py-4 bg-slate-50 rounded-2xl text-sm" defaultValue={editingEmployee?.employeeId} />
                <input name="employmentStatus" placeholder="Status (REGULAR/JO/etc)" required className="px-6 py-4 bg-slate-50 rounded-2xl text-sm" defaultValue="REGULAR" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input name="firstname" placeholder="First Name" required className="px-6 py-4 bg-slate-50 rounded-2xl text-sm" defaultValue={editingEmployee?.firstname} />
                <input name="lastname" placeholder="Last Name" required className="px-6 py-4 bg-slate-50 rounded-2xl text-sm" defaultValue={editingEmployee?.lastname} />
              </div>
              <input name="position" placeholder="Position" required className="px-6 py-4 bg-slate-50 rounded-2xl text-sm w-full" defaultValue={editingEmployee?.position} />
              <input name="section" placeholder="Section" required className="px-6 py-4 bg-slate-50 rounded-2xl text-sm w-full" defaultValue={editingEmployee?.section} />
              
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
