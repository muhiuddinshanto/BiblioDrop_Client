"use client";

import React from "react";
import { MdCalendarMonth, MdPerson, MdMenuBook, MdLocalShipping, MdAccessTime, MdCheckCircleOutline } from "react-icons/md";

export default function DeliveryTable({ deliveries = [], onStatusChange, isUpdating = false }) {
  
  // স্ট্যাটাস অনুযায়ী টেক্সট এবং বর্ডারের কালার স্কিম
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Dispatched":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // স্ট্যাটাস অনুযায়ী আইকন সেটআপ
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending": return <MdAccessTime className="text-amber-500 text-base" />;
      case "Dispatched": return <MdLocalShipping className="text-blue-500 text-base" />;
      case "Delivered": return <MdCheckCircleOutline className="text-emerald-500 text-base" />;
      default: return null;
    }
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
            {deliveries.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-slate-400 font-medium">
                  No active delivery shipments found.
                </td>
              </tr>
            ) : (
              deliveries.map((delivery) => {
                const deliveryId = delivery._id?.$oid || delivery._id;

                return (
                  <tr key={deliveryId} className="hover:bg-slate-50/40 transition-colors">
                    
                    {/* ক্লায়েন্ট নেম ও ইমেইল */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
                          <MdPerson className="text-lg" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{delivery.clientName}</h4>
                          <p className="text-xs text-slate-400 -mt-0.5">{delivery.clientEmail || "Regular Reader"}</p>
                        </div>
                      </div>
                    </td>

                    {/* বইয়ের নাম ও লেখক */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <MdMenuBook className="text-slate-400 text-base flex-shrink-0" />
                        <span className="font-semibold text-slate-700 truncate max-w-[220px]" title={delivery.bookTitle}>
                          {delivery.bookTitle}
                        </span>
                      </div>
                    </td>

                    {/* অর্ডারের তারিখ */}
                    <td className="py-4 px-6 text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5 text-xs">
                        <MdCalendarMonth className="text-slate-400 text-sm" />
                        {delivery.date}
                      </div>
                    </td>

                    {/* বর্তমান স্ট্যাটাস ব্যাজ */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold border rounded-full ${getStatusColor(delivery.status)}`}>
                        {getStatusIcon(delivery.status)}
                        {delivery.status}
                      </span>
                    </td>

                    {/* 💡 স্ট্যাটাস আপডেট ড্রপডাউন কন্ট্রোলার */}
                    <td className="py-4 px-6 text-right">
                      <select
                        disabled={isUpdating}
                        value={delivery.status}
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
              })
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}