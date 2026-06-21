"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function CategoryPieChart({ totalBooks = 0 }) {
  // ক্যাটাগরি ওয়াইজ ডামি ডেটা ডিস্ট্রিবিউশন
  const data = [
    { name: "Fiction", value: 40, color: "#040d1b" },
    { name: "Non-Fiction", value: 25, color: "#775a19" },
    { name: "Academic", value: 20, color: "#bec7db" },
    { name: "Sci-Fi", value: 15, color: "#fed488" },
  ];

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col shadow-sm">
      <h4 className="text-base font-bold text-[#040d1b] mb-2">Books by Category</h4>
      
      <div className="flex-grow flex items-center justify-center relative h-[200px]">
        {/* সেন্ট্রাল কাউন্টার টেক্সট ওভারলে */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <span className="text-xl font-bold text-[#040d1b]">
            {totalBooks > 1000 ? `${(totalBooks / 1000).toFixed(1)}k+` : totalBooks}
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total Books</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* কাস্টম কালার লেজেন্ড গ্রিড */}
      <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-[#45474c] pt-2 border-t border-slate-50">
        {data.map((item, idx) => (
          <span key={idx} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} /> 
            {item.name} ({item.value}%)
          </span>
        ))}
      </div>
    </div>
  );
}