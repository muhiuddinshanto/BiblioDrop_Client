"use client";

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import {
  MdDashboard,
  MdMenuBook,
  MdAttachMoney,
  MdHourglassTop,
  MdTrendingUp,
  MdStar
} from 'react-icons/md';

export default function LibrarianOverview({
  stats ,
  earningTrends,
  topRequestedBooks,
}) {
  return (
    <div className="w-full space-y-8 p-1">
      {/* হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#040d1b] dark:text-slate-100 tracking-tight mb-1 flex items-center gap-2.5">
            <MdDashboard className="text-[#775a19]" /> Librarian Dashboard
          </h1>
          <p className="text-[#45474c] dark:text-slate-400 text-sm">
            Monitor inventory health, platform earnings, and processing cycles.
          </p>
        </div>
      </div>

      {/* ==================== ১. কুইক স্ট্যাটস কার্ডস ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ক) Total Books Listed */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#775a19]/40 hover:shadow-md transition-all duration-300">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#45474c] dark:text-slate-400">Total Books Listed</span>
            <h3 className="text-3xl font-bold font-serif text-[#040d1b] dark:text-slate-100">{stats.totalBooks}</h3>
            <p className="text-[11px] text-emerald-600 flex items-center gap-0.5 font-medium">
              <MdTrendingUp className="text-sm" /> Live in Inventory
            </p>
          </div>
          <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-[#040d1b] dark:text-slate-100 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:bg-[#040d1b] group-hover:text-white transition-all duration-300 shadow-sm">
            <MdMenuBook className="text-xl" />
          </div>
        </div>

        {/* খ) Total Earnings */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#775a19]/40 hover:shadow-md transition-all duration-300">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#45474c] dark:text-slate-400">Total Earnings</span>
            <h3 className="text-3xl font-bold font-serif text-[#040d1b] dark:text-slate-100">${stats.totalEarnings.toFixed(2)}</h3>
            <p className="text-[11px] text-slate-400 font-medium">Platform revenue generated</p>
          </div>
          <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-emerald-700 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300 shadow-sm">
            <MdAttachMoney className="text-xl" />
          </div>
        </div>

        {/* গ) Active Pending Requests */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#775a19]/40 hover:shadow-md transition-all duration-300">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#45474c] dark:text-slate-400">Active Pending Requests</span>
            <h3 className="text-3xl font-bold font-serif text-[#040d1b] dark:text-slate-100">{stats.pendingRequests}</h3>
            <p className="text-[11px] text-amber-600 font-medium">Awaiting delivery approvals</p>
          </div>
          <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-[#775a19] rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:bg-[#775a19] group-hover:text-white transition-all duration-300 shadow-sm">
            <MdHourglassTop className="text-xl" />
          </div>
        </div>
      </div>

      {/* ==================== ২. চার্ট এবং গ্রাফ সেকশন ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* আর্নিং চার্ট (Area Chart) */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold font-serif text-[#040d1b] dark:text-slate-100">Revenue Overview</h3>
            <p className="text-xs text-[#45474c] dark:text-slate-400">Analytical performance of monthly institutional revenue.</p>
          </div>

          {/* 💡 এখানে h-72 এর সাথে relative এবং min-w-0 যোগ করা হয়েছে */}
          <div className="h-72 w-full relative min-w-0 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#775a19" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#775a19" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" />
                <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#040d1b', borderRadius: '12px', color: '#fff', border: 'none' }}
                  itemStyle={{ color: '#fed488' }}
                />
                <Area type="monotone" dataKey="earnings" name="Earnings ($)" stroke="#775a19" strokeWidth={2} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* রিকোয়েস্ট ভলিউম চার্ট (Bar Chart) */}
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-lg font-bold font-serif text-[#040d1b] dark:text-slate-100">Order Volume</h3>
            <p className="text-xs text-[#45474c] dark:text-slate-400">Total monthly processed deliveries.</p>
          </div>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningTrends} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" />
                <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="requests" name="Requests" fill="#040d1b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ==================== ৩. মোস্ট রিকোয়েস্টেড মিনি-লিস্ট ==================== */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 shadow-sm max-w-full">
        <div className="mb-6">
          <h3 className="text-lg font-bold font-serif text-[#040d1b] dark:text-slate-100">Most Requested Volumes</h3>
          <p className="text-xs text-[#45474c] dark:text-slate-400">Your highly demanded catalog items prioritized by subscriber tier.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topRequestedBooks.map((book) => (
            <div
              key={book.id}
              className="flex items-center gap-4 p-3 border border-slate-50 dark:border-slate-800 rounded-xl hover:border-slate-100 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group"
            >
              <div className="w-12 h-16 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden shadow-sm flex-shrink-0 border border-slate-100 dark:border-slate-700">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="min-w-0 flex-grow">
                <h4 className="text-sm font-bold text-[#040d1b] dark:text-slate-100 truncate group-hover:text-[#775a19] transition-colors" title={book.title}>
                  {book.title}
                </h4>
                <p className="text-[11px] text-[#45474c] dark:text-slate-400 truncate">by {book.author}</p>

                {/* রিকোয়েস্ট কাউন্ট ব্যাজ */}
                <div className="flex items-center gap-1 mt-1 text-amber-600 font-medium text-[11px]">
                  <MdStar className="text-xs text-[#775a19]" />
                  <span>{book.requests} Requests</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0 pl-2">
                <span className="text-sm font-bold font-mono text-[#040d1b] dark:text-slate-100">${book.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
