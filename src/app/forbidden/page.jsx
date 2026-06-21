"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaBan, FaArrowLeft, FaHome } from 'react-icons/fa';

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center">
        
        {/* 🚫 ফোরবিডেন আইকন (অ্যানিমেশন সহ) */}
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100 mb-6 animate-pulse">
          <FaBan className="text-3xl text-amber-600" />
        </div>

        {/* এরর হেডিং */}
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          403 - Forbidden
        </h1>
        
        <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mt-1">
          Access is Strictly Restricted
        </p>

        <p className="mt-4 text-sm text-slate-500 leading-relaxed">
          আপনার এই নির্দিষ্ট ডিরেক্টরি বা পেজে প্রবেশের কোনো আইনি অনুমতি নেই। এটি একটি সুরক্ষিত এলাকা। দয়া করে নিচে দেওয়া বাটনের সাহায্যে মূল ওয়েবসাইটে ফিরে যান।
        </p>

        {/* 🛠️ নেভিগেশন বাটনসমূহ */}
        <div className="w-full mt-8 space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-sm"
          >
            <FaHome className="text-base" /> Back to Safety
          </button>

          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-slate-50 border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
          >
            <FaArrowLeft className="text-xs" /> Go Back
          </button>
        </div>

        {/* ফুটার লাইন */}
        <div className="mt-8 border-t border-slate-100 pt-4 w-full text-center">
          <p className="text-xs text-slate-400 font-medium">
            BiblioDrop Security System &copy; {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </main>
  );
}