"use client";

import React from "react";
import { MdCalendarMonth, MdPerson, MdMenuBook, MdLocalShipping, MdAccessTime, MdCheckCircleOutline } from "react-icons/md";

export default function DeliveryTable({ deliveries = [], onStatusChange, isUpdating = false }) {
  
  // স্ট্যাটাস অনুযায়ী টেক্সট এবং বর্ডারের কালার স্কিম (Case-Insensitive করার জন্য lowercase হ্যান্ডেল করা হলো)
  const getStatusColor = (status = "") => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "dispatched":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // স্ট্যাটাস অনুযায়ী আইকন সেটআপ
  const getStatusIcon = (status = "") => {
    switch (status.toLowerCase()) {
      case "pending": return <MdAccessTime className="text-amber-500 text-base" />;
      case "dispatched": return <MdLocalShipping className="text-blue-500 text-base" />;
      case "delivered": return <MdCheckCircleOutline className="text-emerald-500 text-base" />;
      default: return null;
    }
  };

  // ISO ডেট স্ট্রিং থেকে শুধু সুন্দর ডেট (YYYY-MM-DD) আলাদা করার হেল্পার
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    if (dateStr.includes("T")) {
      return dateStr.split("T")[0]; // "2026-06-19" ফরম্যাট আলাদা করবে
    }
    return dateStr;
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left border-collapse">
          
          {/* টেবিল হেডার */}
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-[#45474c]">
              <th className="py-4 px-6">Client / Reader</th>
              <th className="py-4 px-6">Book Title</th>
              <th className="py-4 px-6">Order Date</th>
              <th className="py-4 px-6">Current Status</th>
              <th className="py-4 px-6 text-right">Update Order Status</th>
            </tr>
          </thead>

          {/* টেবিল বডি */}
          <tbody className="divide-y divide-slate-50 text-sm text-[#040d1b]">
            {deliveries.map((delivery) => {
              // ওনার আইডি এক্সট্র্যাক্ট সেফটি মেথড
              const deliveryId = delivery._id?.$oid || delivery._id;

              // ডাটাবেজের রিয়েল ডাটা কি-ম্যাপিং অথবা ফলব্যাক
              const clientName = delivery?.customerDetails?.name || delivery?.clientName || "Regular Reader";
              const clientEmail = delivery?.customerDetails?.email || delivery?.clientEmail || "No Email Logged";
              const bookTitle = delivery?.title || delivery?.bookTitle || "Untitled Volume";
              const displayStatus = delivery?.status || "Pending";

              return (
                <tr key={deliveryId} className="hover:bg-slate-50/40 transition-colors">
                  
                  {/* ক্লায়েন্ট নেম ও ইমেইল */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
                        <MdPerson className="text-lg" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{clientName}</h4>
                        <p className="text-xs text-slate-400 -mt-0.5">{clientEmail}</p>
                      </div>
                    </div>
                  </td>

                  {/* বইয়ের নাম ও ট্রানকেশন সেফটি */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <MdMenuBook className="text-slate-400 text-base flex-shrink-0" />
                      <span className="font-semibold text-slate-700 truncate max-w-[220px]" title={bookTitle}>
                        {bookTitle}
                      </span>
                    </div>
                  </td>

                  {/* অর্ডারের তারিখ (ISO ফরম্যাট হ্যান্ডেলড) */}
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5 text-xs">
                      <MdCalendarMonth className="text-slate-400 text-sm" />
                      {formatDate(delivery?.date)}
                    </div>
                  </td>

                  {/* বর্তমান স্ট্যাটাস ব্যাজ */}
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold border rounded-full capitalize ${getStatusColor(displayStatus)}`}>
                      {getStatusIcon(displayStatus)}
                      {displayStatus}
                    </span>
                  </td>

                  {/* স্ট্যাটাস আপডেট ড্রপডাউন কন্ট্রোলার */}
                  <td className="py-4 px-6 text-right">
                    <select
                      disabled={isUpdating}
                      value={displayStatus === "pending" ? "Pending" : displayStatus === "dispatched" ? "Dispatched" : displayStatus === "delivered" ? "Delivered" : displayStatus}
                      onChange={(e) => onStatusChange?.(deliveryId, e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 focus:outline-none focus:border-[#775a19] shadow-sm cursor-pointer transition-colors disabled:bg-slate-50 disabled:text-slate-300"
                    >
                      <option value="Pending">🕒 Mark as Pending</option>
                      <option value="Dispatched">📦 Mark as Dispatched</option>
                      <option value="Delivered">✅ Mark as Delivered</option>
                    </select>
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