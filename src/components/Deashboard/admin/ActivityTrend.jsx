"use client";

import React, { useState } from "react";

export default function ActivityTrend() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  return (
    <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 p-6 rounded-2xl flex flex-col shadow-sm lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-base font-bold text-[#040d1b]">Platform Activity Trends</h4>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-slate-100 text-[#45474c] text-xs font-bold border-none rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#775a19]/20 focus:outline-none"
        >
          <option>Last 30 Days</option>
          <option>Last 6 Months</option>
        </select>
      </div>
      
      <div className="flex-grow relative min-h-[240px] flex items-end justify-between border-b border-slate-200 px-2">
        {/* Simulated Chart Bars */}
        {[50, 65, 33, 80, 45, 90, 70, 52].map((h, i) => (
          <div 
            key={i} 
            style={{ height: `${h}%` }} 
            className="w-6 bg-slate-900/10 rounded-t-md transition-all hover:bg-[#775a19]/20" 
          />
        ))}
      </div>
    </div>
  );
}