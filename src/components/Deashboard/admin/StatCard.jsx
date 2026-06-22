import React from "react";

export default function StatCard({ title, value, icon: Icon, trend, trendType = "up", iconBgClass }) {
  return (
    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 p-6 rounded-2xl shadow-sm hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        {/* এখানে Icon সরাসরি রেন্ডার হবে */}
        <div className={`p-3 rounded-xl ${iconBgClass || "bg-slate-100 text-[#040d1b] dark:text-slate-100"}`}>
          <Icon className="text-xl" />
        </div>
        {trend && (
          <span className={`text-xs font-bold flex items-center gap-0.5 ${trendType === "up" ? "text-green-600" : "text-amber-600"}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-[#45474c]">{title}</p>
      <h3 className="text-2xl font-bold text-[#040d1b] dark:text-slate-100 mt-1">{value}</h3>
    </div>
  );
}
