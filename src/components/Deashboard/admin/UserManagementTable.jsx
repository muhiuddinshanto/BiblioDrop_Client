import React from "react";
import { MdDeleteOutline, MdShield, MdOutlineSupervisedUserCircle, MdPerson, MdLayersClear, MdRateReview } from "react-icons/md";

export default function UserManagementTable({ 
  users = [], 
  isLoading = false, 
  onChangeRole, 
  onDelete 
}) {
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-10 h-10 border-4 border-[#775a19] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm text-slate-400 font-medium">Loading all user records...</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-slate-50 border border-dashed border-slate-200 rounded-full flex items-center justify-center mb-4">
          <MdLayersClear className="text-3xl text-slate-300" />
        </div>
        <h3 className="text-base font-bold text-[#040d1b] dark:text-slate-100 mb-1">No Users Found</h3>
        <p className="text-xs text-slate-400 max-w-xs">There are no accounts registered in the system.</p>
      </div>
    );
  }

  const getRoleBadgeStyle = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-700";
      case "librarian":
        return "bg-blue-50 text-blue-700 border border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-700";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
    }
  };

  // রোল ফরম্যাট ঠিক করার হেল্পার
  const formatRoleValue = (role) => {
    if (!role) return "User";
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-[#45474c] dark:text-slate-300 uppercase tracking-wider">
            <tr>
              <th className="p-4 pl-6">User Profile</th>
              <th className="p-4">Current Role</th>
              <th className="p-4 pr-6 text-right">Change Role & Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
            {users.map((user) => {
              const userId = user._id || user.id;
              const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";
              const currentRoleFormatted = formatRoleValue(user.role);

              return (
                <tr key={userId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-[#040d1b] dark:text-slate-100 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center font-bold text-xs shadow-inner">
                        {initial}
                      </div>
                      <div>
                        <p className="font-bold text-[#040d1b] dark:text-slate-100 leading-tight mb-0.5">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${getRoleBadgeStyle(user.role)}`}>
                      {user.role?.toLowerCase() === "admin" && <MdShield className="text-[10px]" />}
                      {user.role?.toLowerCase() === "librarian" && <MdOutlineSupervisedUserCircle className="text-[10px]" />}
                      {(user.role?.toLowerCase() === "user" || !user.role) && <MdPerson className="text-[10px]" />}
                      {currentRoleFormatted}
                    </span>
                  </td>

                  <td className="p-4 pr-6 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <select
                        value={currentRoleFormatted}
                        onChange={(e) => onChangeRole && onChangeRole(userId, e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 text-[#45474c] dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-[#775a19]/20 focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="User">User</option>
                        <option value="Librarian">Librarian</option>
                        <option value="Admin">Admin</option>
                      </select>

                      <button
                        onClick={() => onDelete && onDelete(userId)}
                        className="p-2 border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-200 transition-colors"
                        title="Delete User Account"
                      >
                        <MdDeleteOutline className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
