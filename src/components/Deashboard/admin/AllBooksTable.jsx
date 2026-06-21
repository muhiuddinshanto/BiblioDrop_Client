import React from "react";
import { MdMenuBook, MdDeleteOutline, MdCloudOff, MdCloudQueue, MdLayersClear } from "react-icons/md";

export default function AllBooksTable({ 
  books = [], 
  isLoading = false, 
  onTogglePublish, 
  onDelete 
}) {
  
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-10 h-10 border-4 border-[#775a19] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm text-slate-400 font-medium">Loading platform books...</p>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-slate-50 border border-dashed border-slate-200 rounded-full flex items-center justify-center mb-4">
          <MdLayersClear className="text-3xl text-slate-300" />
        </div>
        <h3 className="text-base font-bold text-[#040d1b] mb-1">No Books Available</h3>
        <p className="text-xs text-slate-400 max-w-xs">There are no books currently listed on the entire platform.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-[#45474c] uppercase tracking-wider">
            <tr>
              <th className="p-4 pl-6">Book Info</th>
              <th className="p-4">Category & Price</th>
              <th className="p-4">Global Status</th>
              <th className="p-4 pr-6 text-right">Ultimate Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {books.map((book) => {
              const bookId = book._id || book.id;
              // স্ট্যাটাস ট্রু-ফলস বা স্ট্রিং যাই হোক না কেন সেফলি হ্যান্ডেল করার জন্য:
              const isPublished = book.status?.toLowerCase() === "published" || book.isPublished === true;

              return (
                <tr key={bookId} className="hover:bg-slate-50/50 transition-colors">
                  
                  {/* বইয়ের কভার, নাম ও লেখক */}
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      {book.image ? (
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="w-9 h-12 rounded object-cover border border-slate-100 shadow-sm"
                        />
                      ) : (
                        <div className="w-9 h-12 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                          <MdMenuBook className="text-lg" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-[#040d1b] leading-tight mb-0.5">{book.title}</p>
                        <p className="text-xs text-slate-400">by {book.author || "Unknown Author"}</p>
                      </div>
                    </div>
                  </td>

                  {/* ক্যাটাগরি ও প্রাইস */}
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-[#040d1b] rounded-lg text-xs font-medium当前的">
                      {book.category || "General"}
                    </span>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">
                      {book.price ? `$${book.price}` : "Free / Borrowable"}
                    </p>
                  </td>

                  {/* লাইভ গ্লোবাল স্ট্যাটাস ব্যাজ */}
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isPublished 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" 
                        : "bg-rose-50 text-rose-700 border border-rose-200/50"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                      {isPublished ? "Live / Published" : "Unpublished"}
                    </span>
                  </td>

                  {/* অ্যাকশন বাটনসমূহ (Unpublish/Publish ও Delete) */}
                  <td className="p-4 pr-6 text-right">
                    <div className="flex justify-end items-center gap-2">
                      
                      {/* Forcibly Publish / Unpublish Toggle Button */}
                      <button
                        onClick={() => onTogglePublish && onTogglePublish(bookId, isPublished)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 border ${
                          isPublished
                            ? "border-amber-200 text-amber-700 hover:bg-amber-50"
                            : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        }`}
                        title={isPublished ? "Forcibly Hide from Public Store" : "Make Book Publicly Live"}
                      >
                        {isPublished ? (
                          <>
                            <MdCloudOff className="text-sm" /> Unpublish
                          </>
                        ) : (
                          <>
                            <MdCloudQueue className="text-sm" /> Publish Live
                          </>
                        )}
                      </button>

                      {/* Hard Delete Button */}
                      <button
                        onClick={() => onDelete && onDelete(bookId)}
                        className="p-2 border border-red-100 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors"
                        title="Permanently Wipe from Database"
                      >
                        <MdDeleteOutline className="text-lg" />
                      </button>

                    </div>
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