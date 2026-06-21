"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaLock, FaArrowLeft, FaHome } from 'react-icons/fa';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center">
        
        {/* 🔒 লক আইকন অ্যানিমেশন সহ */}
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100 mb-6 animate-bounce">
          <FaLock className="text-3xl text-rose-500" />
        </div>

        {/* এরর টেক্সট */}
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Access Denied
        </h1>
        
        <p className="text-sm font-semibold text-rose-500 uppercase tracking-widest mt-1">
          Error 403 / Unauthorized
        </p>

        <p className="mt-4 text-sm text-slate-500 leading-relaxed">
          দুঃখিত, এই পেজটি দেখার বা এই অ্যাকশনটি নেওয়ার অনুমতি আপনার অ্যাকাউন্টের নেই। দয়া করে সঠিক অ্যাকাউন্ট দিয়ে লগইন করুন অথবা এডমিনের সাথে যোগাযোগ করুন।
        </p>

        {/* 🛠️ অ্যাকশন বাটনসমূহ */}
        <div className="w-full mt-8 space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-sm"
          >
            <FaHome className="text-base" /> Go to Home
          </button>

          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-slate-50 border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
          >
            <FaArrowLeft className="text-xs" /> Go Back
          </button>
        </div>

        {/* ফুটার নোট */}
        <div className="mt-8 border-t border-slate-100 pt-4 w-full text-center">
          <p className="text-xs text-slate-400 font-medium">
            BiblioDrop Security System &copy; {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </main>
  );
}