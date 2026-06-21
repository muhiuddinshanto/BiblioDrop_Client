"use client";

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// ডামি চার্ট ডেটা (রিয়েল প্রজেক্টে এপিআই থেকে আসতে পারে)
const data = [
  { name: "Jan", deliveries: 400, revenue: 2400 },
  { name: "Feb", deliveries: 300, revenue: 1398 },
  { name: "Mar", deliveries: 200, revenue: 9800 },
  { name: "Apr", deliveries: 278, revenue: 3908 },
  { name: "May", deliveries: 189, revenue: 4800 },
  { name: "Jun", deliveries: 239, revenue: 3800 },
];

export default function ActivityTrend() {
  const [timeRange, setTimeRange] = useState("Last 6 Months");

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col shadow-sm lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-base font-bold text-[#040d1b]">Platform Activity Trends</h4>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-slate-50 text-[#45474c] text-xs font-bold border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#775a19]/20 focus:outline-none"
        >
          <option>Last 30 Days</option>
          <option>Last 6 Months</option>
        </select>
      </div>
      
      {/* Recharts Responsive Bar Container */}
      <div className="w-full h-[260px] text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#040d1b", borderRadius: "12px", border: "none", color: "#fff" }}
              itemStyle={{ color: "#fed488" }}
            />
            <Bar dataKey="deliveries" fill="#775a19" radius={[4, 4, 0, 0]} maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}