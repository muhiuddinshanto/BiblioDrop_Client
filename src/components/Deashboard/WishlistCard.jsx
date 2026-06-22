"use client";

import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { MdShoppingCart, MdDeleteOutline, MdOutlineCategory } from 'react-icons/md';

export default function WishlistCard({ item, onViewBookDetails, onDelete }) {
  // সেইফ প্রাইস ক্যালকুলেশন
  const displayPrice = typeof item.price === 'number' 
    ? item.price.toFixed(2) 
    : parseFloat(item.price || 0).toFixed(2);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:border-[#775a19]/30 hover:shadow-md transition-all duration-300 flex flex-col h-full">
      
      {/* ইমেজ সেকশন */}
      <div className="relative aspect-[3/4] bg-slate-50 w-full overflow-hidden border-b border-slate-100">
        <img 
          src={item.image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600"} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* ক্যাটাগরি ব্যাজ */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#040d1b]/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md shadow-sm">
          <MdOutlineCategory className="text-amber-400 text-xs" />
          {item.category || "General"}
        </span>
      </div>

      {/* টেক্সট কন্টেন্ট */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div className="space-y-1">
          <h4 className="font-serif font-bold text-[#040d1b] dark:text-slate-100 text-base leading-snug line-clamp-2 group-hover:text-[#775a19] transition-colors" title={item.title}>
            {item.title || "Untitled Volume"}
          </h4>
          <p className="text-xs text-[#45474c] italic truncate">
            by {item.author || "Unknown Author"}
          </p>
        </div>

        {/* প্রাইস এবং অ্যাকশন বাটন */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-auto">
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Price</span>
            <span className="text-lg font-mono font-bold text-[#775a19]">${displayPrice}</span>
          </div>

          {/* বাটন্স গ্রুপিং */}
          <div className="flex items-center gap-2">
            {/* ডিলিট বাটন */}
            <button 
              onClick={() => onDelete?.(item._id?.$oid || item._id)}
              className="p-2 rounded-xl border border-slate-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all duration-200"
              title="Remove from wishlist"
            >
              <MdDeleteOutline className="text-xl" />
            </button>
            
            {/* কার্ট বাটন */}
            <button 
              onClick={() => onViewBookDetails?.(item)}
              className="p-2.5 rounded-xl bg-[#040d1b] text-white hover:bg-[#775a19] transition-all duration-200 shadow-sm flex items-center justify-center"
              title="View Book Details"
            >
              <FaInfoCircle className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
