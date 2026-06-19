"use client";

import React from "react";
import { MdEdit, MdDeleteOutline, MdOutlineToggleOn, MdOutlineToggleOff, MdHourglassEmpty, MdCheckCircle, MdDoNotDisturbOn } from "react-icons/md";

export default function InventoryTable({ books = [], onEdit, onDelete, onStatusToggle, isUpdating = false }) {
  
  // স্ট্যাটাসের ওপর বেস করে ব্যাজ ডিজাইন জেনারেটর
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending Approval":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 rounded-full">
            <MdHourglassEmpty className="text-sm animate-spin" /> Pending Approval
          </span>
        );
      case "Published":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full">
            <MdCheckCircle className="text-sm" /> Published
          </span>
        );
      case "Unpublished":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 rounded-full">
            <MdDoNotDisturbOn className="text-sm" /> Unpublished
          </span>
        );
      default:
        return <span className="text-xs text-slate-400">{status}</span>;
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left border-collapse">
          
          {/* টেবিল হেডার */}
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-[#45474c]">
              <th className="py-4 px-6">Book Details</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Delivery Fee</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Publishing Power</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>

          {/* টেবিল বডি */}
          <tbody className="divide-y divide-slate-50 text-sm text-[#040d1b]">
            {books.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-slate-400 font-medium">
                  No books added to your inventory yet.
                </td>
              </tr>
            ) : (
              books.map((book) => {
                const bookId = book._id?.$oid || book._id;
                const isPending = book.status === "Pending Approval";
                const isPublished = book.status === "Published";

                return (
                  <tr key={bookId} className="hover:bg-slate-50/40 transition-colors">
                    
                    {/* বইয়ের বিবরণ এবং ইমেজ */}
                    <td className="py-4 px-6 flex items-center gap-4">
                      <div className="w-10 h-14 bg-slate-100 rounded-md overflow-hidden border border-slate-100 flex-shrink-0 shadow-sm">
                        <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-base text-[#040d1b] truncate max-w-[200px]" title={book.title}>
                          {book.title}
                        </h4>
                        <p className="text-xs text-[#45474c] italic truncate">by {book.author}</p>
                      </div>
                    </td>

                    {/* ক্যাটাগরি */}
                    <td className="py-4 px-6 font-medium text-slate-600">{book.category}</td>

                    {/* ডেলিভারি ফি */}
                    <td className="py-4 px-6 font-mono font-bold text-[#775a19]">${book.deliveryFee.toFixed(2)}</td>

                    {/* কারেন্ট স্ট্যাটাস ব্যাজ */}
                    <td className="py-4 px-6">{getStatusBadge(book.status)}</td>

                    {/* 💡 পাবলিশিং পাওয়ার টগল বাটন */}
                    <td className="py-4 px-6 text-center">
                      <button
                        disabled={isPending || isUpdating}
                        onClick={() => onStatusToggle?.(bookId, isPublished ? "Unpublished" : "Published")}
                        className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border transition-all ${
                          isPending
                            ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                            : isPublished
                            ? "bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-100"
                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-100"
                        }`}
                        title={isPending ? "Cannot publish until approved by admin" : `Click to make ${isPublished ? 'Unpublished' : 'Published'}`}
                      >
                        {isPublished ? (
                          <>
                            <MdOutlineToggleOn className="text-xl text-rose-500" /> Unpublish
                          </>
                        ) : (
                          <>
                            <MdOutlineToggleOff className="text-xl text-slate-400" /> Publish
                          </>
                        )}
                      </button>
                    </td>

                    {/* এডিট এবং ডিলিট অ্যাকশন বাটন */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* এডিট বাটন */}
                        <button
                          onClick={() => onEdit?.(book)}
                          className="p-2 text-slate-500 hover:text-[#775a19] hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-xl transition-all"
                          title="Edit Book Details"
                        >
                          <MdEdit className="text-lg" />
                        </button>
                        
                        {/* ডিলিট বাটন */}
                        <button
                          onClick={() => onDelete?.(bookId)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-xl transition-all"
                          title="Delete Book"
                        >
                          <MdDeleteOutline className="text-lg" />
                        </button>
                      </div>
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