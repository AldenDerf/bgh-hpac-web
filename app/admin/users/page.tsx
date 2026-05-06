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

  const [pendingDelete, setPendingDelete] = useState<{ id: string, name: string, timer: number } | null>(null);
  const [roleSelectionEmployee, setRoleSelectionEmployee] = useState<Employee | null>(null);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/admin/employees");
      const data = await res.json();
      if (Array.isArray(data)) {
        setEmployees(data);
      } else {
        console.error("Invalid employees data format:", data);
        setEmployees([]);
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setEmployees([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Timer logic for Undo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pendingDelete) {
      interval = setInterval(() => {
        setPendingDelete(prev => {
          if (!prev) return null;
          if (prev.timer <= 1) {
            // Timer expired, perform actual delete
            fetch("/api/admin/employees", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ employeeId: prev.id }),
            });
            return null;
          }
          return { ...prev, timer: prev.timer - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pendingDelete]);

  const handleDelete = async (employeeId: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}? This will also remove their administrative access.`)) {
      setPendingDelete({ id: employeeId, name, timer: 60 });
      setEmployees(prev => prev.filter(e => e.employeeId !== employeeId));
    }
  };

  const handleUndo = async () => {
    if (pendingDelete) {
      setPendingDelete(null);
      fetchEmployees();
    }
  };

  const handleRoleToggle = async (employeeId: string, currentRole?: string) => {
    if (currentRole) {
      // Demote
      if (confirm("Remove administrative access for this user?")) {
        await fetch("/api/admin/users", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employeeId }),
        });
        fetchEmployees();
      }
    } else {
      // Open our new custom role selection modal
      const employee = employees.find(e => e.employeeId === employeeId);
      if (employee) setRoleSelectionEmployee(employee);
    }
  };

  const assignRole = async (employeeId: string, role: string) => {
    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId, userType: role }),
    });
    setRoleSelectionEmployee(null);
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

  const filteredEmployees = Array.isArray(employees) ? employees.filter(e => 
    `${e.firstname} ${e.lastname}`.toLowerCase().includes(search.toLowerCase()) ||
    e.employeeId.includes(search)
  ) : [];

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
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search name or ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-full text-slate-900 placeholder:text-slate-500 font-semibold shadow-inner"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <button 
                onClick={() => {
                  setEditingEmployee(null);
                  setIsModalOpen(true);
                }}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 group-hover:scale-110 transition-transform">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75z" clipRule="evenodd" />
                </svg>
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
                              onClick={() => handleDelete(employee.employeeId, `${employee.firstname} ${employee.lastname}`)}
                              className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete Employee"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button>
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
      {/* Role Selection Modal */}
      {roleSelectionEmployee && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 sm:p-14">
              <header className="text-center mb-12">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">Promotion Manager</p>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Assign Access Role</h2>
                <p className="text-slate-500 font-medium mt-2">Choose the administrative level for <b>{roleSelectionEmployee.firstname} {roleSelectionEmployee.lastname}</b></p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Admin Option */}
                <button 
                  onClick={() => assignRole(roleSelectionEmployee.employeeId, "ADMIN")}
                  className="group p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516 11.209 11.209 0 0 1-7.877-3.08z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-black text-slate-900 mb-1">System Admin</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Full access to users, awards, and system settings.</p>
                </button>

                {/* HPAC Option */}
                <button 
                  onClick={() => assignRole(roleSelectionEmployee.employeeId, "HPAC_MEMBER")}
                  className="group p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                      <path d="m3.265 10.602 7.667 4.128a1.25 1.25 0 0 0 1.136 0l7.667-4.128A9.015 9.015 0 0 1 21 12.013V17.5a.75.75 0 0 1-1.5 0v-4.582l-6.792 3.658a2.75 2.75 0 0 1-2.416 0L3.5 12.918v4.582a.75.75 0 0 1-1.5 0v-5.487c0-.311.16-.599.425-.77l.84-.541Z" />
                    </svg>
                  </div>
                  <h4 className="font-black text-slate-900 mb-1">HPAC Member</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Can propose award categories and view event results.</p>
                </button>
              </div>

              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setRoleSelectionEmployee(null)}
                  className="px-10 py-4 border-2 border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:border-red-100 hover:text-red-500 hover:bg-red-50 transition-all active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Undo Toast */}
      {pendingDelete && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-6 border border-slate-800">
            <div className="flex flex-col">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Record Deleted</p>
              <p className="text-sm font-bold">{pendingDelete.name} removed</p>
            </div>
            
            <div className="h-10 w-[1px] bg-slate-800"></div>

            <button 
              onClick={handleUndo}
              className="px-6 py-2 bg-blue-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-all active:scale-95"
            >
              Undo ({pendingDelete.timer}s)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
