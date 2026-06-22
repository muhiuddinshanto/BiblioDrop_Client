import React from "react";
import { MdGroup, MdLibraryBooks, MdLocalShipping, MdPayments, MdPendingActions, MdArrowForward } from "react-icons/md";
import Link from "next/link";

import { adminStats } from "@/lib/api/order";
import CategoryPieChart from "@/components/Deashboard/admin/CategoryPieChart";
import StatCard from "@/components/Deashboard/admin/StatCard";
import ActivityTrend from "@/components/Deashboard/admin/ActivityTrend";

export default async function AdminDashboardPage() {
  // ব্যাকএন্ড এপিআই থেকে ডাটা ফেচ করা
  const statsResponse = await adminStats();
  console.log("Stats Response:", statsResponse);
  const pendingApprovalQueue = statsResponse?.approvalQueue || [];

  // সেফটি চেইনিং বা ফলব্যাক ডিফল্ট ভ্যালু ডিফাইন করা
  const systemStats = statsResponse?.stats || { totalUsers: 0, totalBooks: 0, totalDeliveries: 0, totalRevenue: 0 };

  const statsData = [
    { 
      title: "Total Users", 
      value: systemStats.totalUsers.toLocaleString(), 
      icon: MdGroup, 
      trend: "+12% ↗", 
      trendType: "up", 
      bg: "bg-blue-50 text-blue-600" 
    },
    { 
      title: "Total Books", 
      value: systemStats.totalBooks.toLocaleString(), 
      icon: MdLibraryBooks, 
      trend: "+5% ↗", 
      trendType: "up", 
      bg: "bg-amber-50 text-[#775a19]" 
    },
    { 
      title: "Total Deliveries", 
      value: systemStats.totalDeliveries.toLocaleString(), 
      icon: MdLocalShipping, 
      trend: "Active Now", 
      trendType: "up", 
      bg: "bg-slate-955 text-white" 
    },
    { 
      title: "Total Revenue", 
      value: `$${systemStats.totalRevenue.toLocaleString()}`, 
      icon: MdPayments, 
      trend: "+24% ↗", 
      trendType: "up", 
      bg: "bg-emerald-50 text-emerald-600" 
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      
      {/* ─── HEADER ─── */}
      <header className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#040d1b] dark:text-slate-100 tracking-tight">Platform Overview</h1>
        <p className="text-xs text-[#45474c] mt-0.5">Real-time holistic performance indexes, operational metrics, and structural data visualization.</p>
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

      {/* ─── VISUAL DATA CHARTS ROW ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActivityTrend />
        <CategoryPieChart totalBooks={systemStats.totalBooks} />
      </section>

      {/* ─── 📝 PENDING APPROVAL OVERVIEW CARD (নতুন ছিমছাম ডিজাইন) ─── */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="p-3 bg-amber-50 text-[#775a19] rounded-xl">
            <MdPendingActions size={32} />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#040d1b] dark:text-slate-100">Pending Book Approvals</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              There are currently <span className="font-bold text-[#775a19]">{pendingApprovalQueue.length} books</span> awaiting administrator verification.
            </p>
          </div>
        </div>
        
        {/* মেইন অ্যাপ্রুভাল পেজে যাওয়ার বাটন (আপনার রাউট অনুযায়ী লিংকটি চেঞ্জ করে নিতে পারেন) */}
        <Link 
          href="/dashboard/admin/queue" 
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#040d1b] hover:bg-[#040d1b]/90 px-4 py-2.5 rounded-xl transition shadow-sm whitespace-nowrap"
        >
          Review Requests <MdArrowForward size={14} />
        </Link>
      </section>

     {/* ─── SYSTEM STATUS OVERVIEW (ডাইনামিক মনিটর) ─── */}
    {/* ─── SYSTEM STATUS OVERVIEW (এখন ১০০% লাইভ ও ডাইনামিক) ─── */}
      <section className="space-y-4">
        <div>
          <h4 className="text-base font-bold text-[#040d1b] dark:text-slate-100 flex items-center gap-2">
            System Status Overview
            {/* যদি statsResponse ডাটাসহ আসে তাহলে Live Operational দেখাবে, নাহলে Warning দেখাবে */}
            {statsResponse?.success ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Operational
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> System Degraded
              </span>
            )}
          </h4>
          <p className="text-xs text-slate-400">Snapshot of active global platform instances and database engines</p>
        </div>

        {/* গ্রিড কার্ডস */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* ১. রিয়েল ডাটাবেজ স্ট্যাটাস */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Database Link</span>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-slate-800">MongoDB</span>
              {statsResponse?.success ? (
                <span className="text-xs font-semibold text-emerald-500">Connected</span>
              ) : (
                <span className="text-xs font-semibold text-rose-500">Disconnected</span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              {statsResponse?.success ? "Cluster: Cluster0 (Primary)" : "Engine Status: Offline"}
            </p>
          </div>

          {/* ২. ডাটাবেজ সামারি স্ট্যাটাস (ডামি MS এর জায়গায় আমরা রিয়াল টোটাল বুকস কাউন্ট বা ইউজার দেখাবো) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Indexed Content</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-lg font-bold text-slate-800">{systemStats.totalBooks}</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">items</span>
            </div>
            <p className="text-[10px] text-emerald-500 mt-1 font-medium">● Sync Completed</p>
          </div>

          {/* ৩. একটিভ হোস্টিং এনভায়রনমেন্ট */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Runtime</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-lg font-bold text-slate-800">Next.js</span>
              <span className="text-xs font-semibold text-blue-500">Node.js</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Environment: {process.env.NODE_ENV || "production"}</p>
          </div>

          {/* ৪. রিয়েল ইউজার অডিট কাউন্ট */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Registry</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-lg font-bold text-slate-800">{systemStats.totalUsers}</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Users</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Access Control: RBAC</p>
          </div>

        </div>

        {/* বটম ফুটার মেসেজ */}
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-center">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
            {statsResponse?.success 
              ? "All platform core engines operating within nominal boundaries. API handshake completed successfully."
              : "Warning: Unable to establish core infrastructure handshakes. Please check backend server status."}
          </p>
        </div>
      </section>
    </div>
  );
}
