"use client";

import React, { useState } from "react";
import { MdSearch, MdFilterList, MdBook } from "react-icons/md";

export default function GlobalInventory({ initialBooks }) {
  const [searchQuery, setSearchQuery] = useState("");

  // সার্চ কুয়েরি অনুযায়ী ক্লায়েন্ট সাইড ফিল্টারিং
  const filteredBooks = initialBooks.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 p-6 rounded-2xl h-fit shadow-sm">
      <div className="flex gap-4 items-center mb-4">
        <div className="relative flex-grow">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#45474c] text-lg" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all titles..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:ring-2 focus:ring-[#775a19]/20 focus:border-[#775a19] focus:outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors text-[#45474c]">
          <MdFilterList className="text-sm" /> Filter
        </button>
      </div>

      <div className="space-y-2">
        {filteredBooks.map((book) => (
          <div key={book.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-14 rounded shadow-sm flex items-center justify-center text-white/20 ${book.bgClass}`}>
                <MdBook className="text-xl text-white" />
              </div>
              <div>
                <p className="font-bold text-[#040d1b] text-sm">{book.title}</p>
                <p className="text-xs text-slate-400">Status: {book.status}</p>
              </div>
            </div>
            <div className="flex gap-3 text-xs font-bold">
              <button className="text-[#45474c] hover:text-[#040d1b]">Unpublish</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {filteredBooks.length === 0 && (
          <p className="text-center text-xs text-slate-400 py-4">No books found.</p>
        )}
      </div>
    </div>
  );
}