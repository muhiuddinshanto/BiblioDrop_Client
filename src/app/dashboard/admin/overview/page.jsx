import React from "react";
import { 
  MdGroup, MdLibraryBooks, MdLocalShipping, MdPayments, 
  MdEdit, MdDelete
} from "react-icons/md";

import StatCard from "@/components/Deashboard/admin/StatCard";
import ApprovalRow from "@/components/Deashboard/admin/ApprovalRow";
import ActivityTrend from "@/components/Deashboard/admin/ActivityTrend";
import GlobalInventory from "@/components/Deashboard/admin/GlobalInventory";

export default async function AdminDashboardPage() {
  const statsData = [
    { title: "Total Users", value: "12,482", icon: MdGroup, trend: "+12% ↗", trendType: "up", bg: "bg-blue-50 text-blue-600" },
    { title: "Total Books", value: "48,291", icon: MdLibraryBooks, trend: "+5% ↗", trendType: "up", bg: "bg-amber-50 text-[#775a19]" },
    { title: "Total Deliveries", value: "852", icon: MdLocalShipping, trend: "Active Now", trendType: "up", bg: "bg-slate-900 text-white" },
    { title: "Total Revenue", value: "$142,390", icon: MdPayments, trend: "+24% ↗", trendType: "up", bg: "bg-emerald-50 text-emerald-600" },
  ];

  const approvalQueue = [
    { id: 1, title: "The Silent Archive", author: "Elias Thorne", librarian: "Dr. Sarah Jenkins" },
    { id: 2, title: "Mechanized Lore", author: "Ava Mercer", librarian: "Johnathan Aris" },
  ];

  const usersData = [
    { name: "Julianne Doe", email: "j.doe@university.edu", role: "Librarian", badgeBg: "bg-blue-50 text-blue-700", initial: "JD" },
    { name: "Marcus Kane", email: "m.kane@biblio.com", role: "Admin", badgeBg: "bg-amber-50 text-amber-700", initial: "MK" },
  ];

  const initialBooks = [
    { id: 1, title: "Echoes of the Void", status: "Published", bgClass: "bg-[#040d1b]" },
    { id: 2, title: "The Golden Ledger", status: "Published", bgClass: "bg-[#775a19]" },
  ];

  const transactions = [
    { id: "TX-9921-004", email: "c.winter@mail.com", librarian: "Sarah J.", amount: "$12.50", date: "Oct 24, 2024", status: "Completed", statusClass: "text-green-600" },
    { id: "TX-9921-003", email: "r.black@domain.net", librarian: "System", amount: "$24.99", date: "Oct 23, 2024", status: "Completed", statusClass: "text-green-600" },
    { id: "TX-9921-002", email: "m.luther@web.com", librarian: "Ava M.", amount: "$8.00", date: "Oct 23, 2024", status: "Pending", statusClass: "text-amber-500" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      
      {/* ─── HEADER ─── */}
      <header>
        <h1 className="text-2xl font-bold font-serif text-[#040d1b] tracking-tight">Platform Overview</h1>
        <p className="text-sm text-[#45474c] mt-0.5">Real-time metrics and system administrative control for BiblioDrop Logistics.</p>
      </header>

      {/* ─── STATS GRID ─── */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsData.map((stat, idx) => (
          <StatCard 
            key={idx} 
            title={stat.title} 
            value={stat.value} 
            icon={stat.icon} 
            trend={stat.trend} 
            trendType={stat.trendType} 
            iconBgClass={stat.bg} 
          />
        ))}
      </section>

      {/* ─── CHARTS ROW ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActivityTrend />

        {/* Books by Category Pie Representation */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 p-6 rounded-2xl flex flex-col shadow-sm">
          <h4 className="text-base font-bold text-[#040d1b] mb-4">Books by Category</h4>
          <div className="flex-grow flex items-center justify-center py-4">
            <div className="relative w-40 h-40 rounded-full border-[14px] border-slate-100" style={{ background: "conic-gradient(#040d1b 0% 35%, #775a19 35% 60%, #bec7db 60% 85%, #fed488 85% 100%)" }}>
              <div className="absolute inset-0 flex items-center justify-center flex-col bg-white rounded-full m-3 shadow-inner">
                <span className="text-lg font-bold text-[#040d1b]">48k+</span>
                <span className="text-[10px] text-slate-400 font-medium">Total</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#45474c]">
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#040d1b]" /> Fiction (35%)</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#775a19]" /> Non-Fiction (25%)</span>
          </div>
        </div>
      </section>

      {/* ─── BOOK APPROVAL QUEUE ─── */}
      <section className="space-y-3">
        <div className="flex justify-between items-end">
          <div>
            <h4 className="text-base font-bold text-[#040d1b]">Book Approval Queue</h4>
            <p className="text-xs text-slate-400">Books awaiting system verification</p>
          </div>
          <button className="text-[#775a19] text-xs font-bold hover:underline">View All Requests</button>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-[#45474c] uppercase tracking-wider">
              <tr>
                <th className="p-4">Book Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Librarian</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {approvalQueue.map((item) => (
                <ApprovalRow key={item.id} title={item.title} author={item.author} librarian={item.librarian} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── USER MANAGEMENT & GLOBAL INVENTORY ─── */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* User Management */}
        <div className="space-y-3">
          <h4 className="text-base font-bold text-[#040d1b]">User Management</h4>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm h-fit">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-[#45474c] uppercase tracking-wider">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {usersData.map((user, idx) => (
                  <tr key={idx}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-[#040d1b] flex items-center justify-center font-bold text-xs">{user.initial}</div>
                        <div>
                          <p className="font-bold text-[#040d1b]">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${user.badgeBg}`}>{user.role}</span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1 text-slate-500">
                        <button className="p-2 hover:text-[#040d1b] hover:bg-slate-50 rounded-lg"><MdEdit /></button>
                        <button className="p-2 hover:text-red-600 hover:bg-red-50 rounded-lg"><MdDelete /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Inventory */}
        <div className="space-y-3">
          <h4 className="text-base font-bold text-[#040d1b]">Global Inventory</h4>
          <GlobalInventory initialBooks={initialBooks} />
        </div>
      </section>

      {/* ─── TRANSACTION HISTORY ─── */}
      <section className="space-y-3">
        <h4 className="text-base font-bold text-[#040d1b]">Recent Transaction History</h4>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-[#45474c] uppercase tracking-wider">
              <tr>
                <th className="p-4">TX ID</th>
                <th className="p-4">User Email</th>
                <th className="p-4">Librarian</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="p-4 font-mono text-xs text-[#45474c]">{tx.id}</td>
                  <td className="p-4">{tx.email}</td>
                  <td className="p-4 text-[#45474c]">{tx.librarian}</td>
                  <td className="p-4 font-bold text-[#040d1b]">{tx.amount}</td>
                  <td className="p-4 text-[#45474c]">{tx.date}</td>
                  <td className={`p-4 text-right font-bold ${tx.statusClass}`}>{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}