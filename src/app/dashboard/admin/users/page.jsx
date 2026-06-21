import React from "react";
import { MdManageAccounts, MdGroup, MdShield, MdOutlineSupervisedUserCircle, MdPerson } from "react-icons/md";
import { getUsers } from "@/lib/api/users";
import UserClientWrapper from "@/components/Deashboard/admin/UserClientWrapper";


async function fetchAllSystemUsers() {
  try {
    const res = await getUsers();
    console.log("Fetched all users:", res);
    return res || [];
  } catch (error) {
    console.error("Failed to fetch users on server:", error);
    return [];
  }
}

export default async function ManageUsersPage() {
  const allUsers = await fetchAllSystemUsers();

  // 📊 সার্ভার সাইডেই রোল কাউন্ট করার লজিক
  const totalUsers = allUsers.length;
  const adminCount = allUsers.filter(u => u.role?.toLowerCase() === "admin").length;
  const librarianCount = allUsers.filter(u => u.role?.toLowerCase() === "librarian").length;
  const generalUserCount = allUsers.filter(u => !u.role || u.role?.toLowerCase() === "user").length;

  const statsData = [
    { title: "Total Registered", value: totalUsers, icon: MdGroup, bg: "bg-slate-900 text-white" },
    { title: "System Admins", value: adminCount, icon: MdShield, bg: "bg-amber-50 text-amber-700 border border-amber-200/50" },
    { title: "Librarians", value: librarianCount, icon: MdOutlineSupervisedUserCircle, bg: "bg-blue-50 text-blue-700 border border-blue-200/50" },
    { title: "General Users", value: generalUserCount, icon: MdPerson, bg: "bg-emerald-50 text-emerald-700 border border-emerald-200/50" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* হেডার */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#040d1b] tracking-tight mb-1 flex items-center gap-2">
          <MdManageAccounts className="text-[#775a19]" /> Manage Users
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Overview of all registered accounts. Dynamically assign roles or terminate system profiles.
        </p>
      </div>

      {/* 📊 নতুন টপ স্ট্যাটস গ্রিড সেকশন */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsData.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white/80 backdrop-blur-md border border-slate-200/50 p-5 rounded-2xl shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#45474c]">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[#040d1b] mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl text-xl ${stat.bg}`}>
                <Icon />
              </div>
            </div>
          );
        })}
      </section>

      {/* ক্লায়েন্ট র‍্যাপার ও টেবিল কল */}
      <div className="space-y-3">
        <h4 className="text-base font-bold text-[#040d1b]">All User Registrations</h4>
        <UserClientWrapper initialUsers={allUsers} />
      </div>
    </div>
  );
}