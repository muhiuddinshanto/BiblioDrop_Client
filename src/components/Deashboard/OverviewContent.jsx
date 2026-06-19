"use client"; // Recharts অ্যানিমেশনের জন্য ক্লায়েন্ট কম্পোনেন্ট আবশ্যক

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  MdAutoStories,
  MdLocalShipping,
  MdPaid,
  MdTrendingUp,
  MdDashboard,
  MdGridView,
  MdShoppingCart,
  MdLayersClear,
  MdFilterList,
  MdCheckCircle,
  MdKeyboardReturn,
  MdPending
} from 'react-icons/md';

export default function OverviewContent({ orders = [], safeWishlist = [] }) {
  const safeOrders = orders ?? [];

  // ==================== ১. কুইক স্ট্যাটস (Quick Stats) ক্যালকুলেশন ====================
  const totalBooksRead = safeOrders.filter(o => o.status?.toLowerCase() === 'delivered').length;
  const pendingDeliveries = safeOrders.filter(o => o.status?.toLowerCase() === 'pending').length;

  const totalSpent = safeOrders.reduce((acc, curr) => {
    const price = typeof curr.price === 'number' ? curr.price : parseFloat(curr.price || 0);
    return acc + price;
  }, 0);

  // ==================== ২. চার্ট ডাটা প্রিপারেশন (Chart Data) ====================
  const monthlyDataMap = {};
  safeOrders.forEach(order => {
    const rawDate = order.date?.$date || order.date || order.createdAt;
    if (rawDate) {
      const month = new Date(rawDate).toLocaleDateString('en-US', { month: 'short' });
      const price = typeof order.price === 'number' ? order.price : parseFloat(order.price || 0);

      if (!monthlyDataMap[month]) monthlyDataMap[month] = { name: month, spent: 0, volumes: 0 };
      monthlyDataMap[month].spent += price;
      monthlyDataMap[month].volumes += 1;
    }
  });

  const trendChartData = Object.keys(monthlyDataMap).length > 0
    ? Object.values(monthlyDataMap)
    : [
      { name: 'Jan', spent: 30, volumes: 1 },
      { name: 'Feb', spent: 58, volumes: 2 },
      { name: 'Mar', spent: 45, volumes: 1 },
      { name: 'Apr', spent: 85, volumes: 3 },
    ];

  const categoryMap = {};
  safeOrders.forEach(order => {
    const cat = order.category || 'General';
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });

  const pieChartData = Object.keys(categoryMap).length > 0
    ? Object.keys(categoryMap).map(key => ({ name: key, value: categoryMap[key] }))
    : [
      { name: 'Science', value: 40 },
      { name: 'Fiction', value: 30 },
      { name: 'History', value: 20 },
      { name: 'General', value: 10 },
    ];

  const COLORS = ['#040d1b', '#775a19', '#9ba3b0', '#fed488', '#e2e8f0'];

  return (
    <div className="w-full space-y-8 p-1">
      {/* হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#040d1b] tracking-tight mb-1 flex items-center gap-2.5">
            <MdDashboard className="text-[#775a19]" /> Dashboard Overview
          </h1>
          <p className="text-[#45474c] text-sm">
            Visual metrics and performance of your curations.
          </p>
        </div>
      </div>

      {/* ==================== কুইক স্ট্যাটস কার্ডস ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ১. Total Books Read */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#775a19]/40 hover:shadow-md transition-all duration-300">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#45474c]">Total Books Read</span>
            <h3 className="text-3xl font-bold font-serif text-[#040d1b]">{totalBooksRead}</h3>
            <p className="text-[11px] text-emerald-600 flex items-center gap-0.5 font-medium">
              <MdTrendingUp className="text-sm" /> Completed Loans
            </p>
          </div>
          <div className="w-12 h-12 bg-slate-50 text-[#040d1b] rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-[#040d1b] group-hover:text-white transition-all duration-300 shadow-sm">
            <MdAutoStories className="text-xl" />
          </div>
        </div>

        {/* ২. Pending Deliveries */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#775a19]/40 hover:shadow-md transition-all duration-300">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#45474c]">Pending Deliveries</span>
            <h3 className="text-3xl font-bold font-serif text-[#040d1b]">{pendingDeliveries}</h3>
            <p className="text-[11px] text-amber-600 font-medium">In transit or processing</p>
          </div>
          <div className="w-12 h-12 bg-slate-50 text-[#775a19] rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-[#775a19] group-hover:text-white transition-all duration-300 shadow-sm">
            <MdLocalShipping className="text-xl" />
          </div>
        </div>

        {/* ৩. Total Spent on Fees */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#775a19]/40 hover:shadow-md transition-all duration-300">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#45474c]">Total Spent on Fees</span>
            <h3 className="text-3xl font-bold font-serif text-[#040d1b]">${totalSpent.toFixed(2)}</h3>
            <p className="text-[11px] text-slate-400 font-medium">Total institutional investment</p>
          </div>
          <div className="w-12 h-12 bg-slate-50 text-emerald-700 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300 shadow-sm">
            <MdPaid className="text-xl" />
          </div>
        </div>
      </div>

      {/* ==================== চার্ট সেকশন (Recharts) ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ক) খরচ ও ভলিউমের গ্রাফ (Area Chart) */}
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold font-serif text-[#040d1b]">Acquisition Trend</h3>
            <p className="text-xs text-[#45474c]">Monthly breakdown of platform expenses.</p>
          </div>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="spent" name="Spent ($)" stroke="#775a19" strokeWidth={2} fillOpacity={1} fill="url(#colorSpent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* খ) ক্যাটাগরি ডিস্ট্রিবিউশন (Pie Chart) */}
        <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-lg font-bold font-serif text-[#040d1b]">Genre Distribution</h3>
            <p className="text-xs text-[#45474c]">Classification of requested books.</p>
          </div>
          <div className="h-60 w-full text-xs flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* সেন্ট্রাল টেক্সট ইফেক্ট */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-serif text-[#040d1b]">{safeOrders.length}</span>
              <span className="text-[10px] uppercase font-bold text-[#45474c] tracking-wider">Orders</span>
            </div>
          </div>

          {/* পাই চার্টের কাস্টম লেজেন্ড */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-3 border-t border-slate-100">
            {pieChartData.slice(0, 4).map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className="capitalize">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== নিচের লেয়ারে উইশলিস্ট ও রিসেন্ট অর্ডারস ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* উইশলিস্ট সেকশন */}
        <div className="col-span-12 lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-serif text-[#040d1b]">Wishlist</h2>
              <MdGridView className="text-[#775a19] text-xl cursor-pointer hover:scale-105 transition-transform" />
            </div>

            {safeWishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center h-full">
                <MdLayersClear className="text-4xl text-slate-300 mb-2" />
                <p className="text-sm text-slate-400">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
                {safeWishlist.map((item) => (
                  <div key={item._id} className="flex-shrink-0 w-32 group snap-start">
                    <div className="w-full aspect-[2/3] bg-white rounded-xl mb-2.5 overflow-hidden relative border border-slate-200/60 shadow-sm">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={item.image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600"}
                        alt={item.title}
                      />
                      <div className="absolute inset-0 bg-[#040d1b]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="bg-white p-2.5 rounded-full shadow-lg text-[#040d1b] hover:text-[#775a19] hover:scale-110 transition-all">
                          <MdShoppingCart className="text-lg" />
                        </button>
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-[#040d1b] truncate px-0.5" title={item.title}>
                      {item.title || "Untitled Volume"}
                    </h4>
                    <p className="text-[11px] font-mono font-bold text-[#775a19] mt-0.5 px-0.5">
                      ${typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price || 0).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* রিসেন্ট অর্ডারস সেকশন */}
        <div className="col-span-12 lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            {/* সেকশন হেডার */}
            <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-3">
              <div>
                <h2 className="text-xl font-bold font-serif text-[#040d1b]">Recent Delivery</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Track and manage your latest book requests</p>
              </div>
              <MdFilterList className="text-[#45474c] text-xl cursor-pointer hover:text-[#775a19] hover:scale-110 transition-all" />
            </div>

            {/* অর্ডার লিস্ট কন্টেইনার - ফিক্সড হাইট এবং কাস্টম স্ক্রোল লজিক */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
              {safeOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 p-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3 shadow-sm">
                    <MdLayersClear className="text-2xl text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold text-[#040d1b] mb-1">No Orders Found</h3>
                  <p className="text-xs text-[#45474c] max-w-[280px] leading-relaxed">
                    You haven't requested any book deliveries yet. Explore our library to start your collection.
                  </p>
                </div>
              ) : (
                // slice(0, 5) এর মাধ্যমে সর্বোচ্চ ৫টি অর্ডার রেণ্ডার হবে, যা ড্যাশবোর্ডের জন্য স্ট্যান্ডার্ড
                safeOrders.slice(0, 5).map((order) => {
                  const rawDate = order.date?.$date || order.date || order.createdAt;
                  const currentStatus = order.status?.toLowerCase() || 'pending';

                  return (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-3 border border-slate-50 hover:border-slate-100 hover:bg-slate-50/60 transition-all duration-200 rounded-xl group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {order.image ? (
                          <div className="w-11 h-14 bg-slate-100 rounded-lg overflow-hidden shadow-sm flex-shrink-0 border border-slate-200/40 group-hover:scale-[1.02] transition-transform">
                            <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#775a19]/10 transition-colors">
                            <MdLocalShipping className="text-[#775a19] text-xl" />
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#040d1b] truncate pr-2 group-hover:text-[#775a19] transition-colors" title={order.title}>
                            {order.title || "Untitled Volume"}
                          </p>
                          <p className="text-[11px] text-[#45474c] capitalize truncate flex items-center gap-1.5 mt-0.5">
                            <span className="font-medium">{order.category || "General"}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-400">
                              {rawDate ? new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recent"}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 pl-3">
                        <p className="text-sm font-bold font-mono text-[#040d1b]">
                          ${typeof order.price === 'number' ? order.price.toFixed(2) : parseFloat(order.price || 0).toFixed(2)}
                        </p>

                        {/* ডাইনামিক স্ট্যাটাস ব্যাজ ম্যাপিং */}
                        {currentStatus === 'delivered' ? (
                          <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-black uppercase tracking-wider mt-1 border border-emerald-200 shadow-sm">
                            <MdCheckCircle className="text-[11px]" /> Delivered
                          </span>
                        ) : currentStatus === 'returned' ? (
                          <span className="inline-flex items-center gap-1 text-[9px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-black uppercase tracking-wider mt-1 border border-slate-300 shadow-sm">
                            <MdKeyboardReturn className="text-[11px]" /> Returned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[9px] bg-amber-50 text-[#775a19] px-2 py-0.5 rounded font-black uppercase tracking-wider mt-1 border border-amber-200 shadow-sm">
                            <MdPending className="text-[11px]" /> Pending
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}