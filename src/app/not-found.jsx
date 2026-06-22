"use client";

import Link from "next/link";
import { FaChevronRight, FaCompass } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-white dark:bg-slate-950">
      <div className="text-center max-w-md">
        {/* Animated Icon */}
        <div className="inline-flex p-4 rounded-3xl bg-slate-50 border border-slate-100 text-[#C5A059] mb-6 animate-bounce dark:border-slate-800 dark:bg-slate-900">
          <FaCompass className="text-4xl" />
        </div>

        {/* Status Codes */}
        <h1 className="text-8xl font-black text-[#1A2332] dark:text-slate-100 tracking-tighter">
          4<span className="text-[#C5A059]">0</span>4
        </h1>
        
        <h2 className="text-xl font-black text-[#1A2332] dark:text-slate-100 mt-4 tracking-tight">
          Manuscript Not Found
        </h2>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          The literary archive or page you are trying to decipher does not exist or has been relocated to another shelf.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A2332] hover:bg-black text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-sm"
          >
            Return Home
          </Link>
          <Link
            href="/books"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 dark:text-slate-300 text-xs font-bold px-6 py-3 rounded-xl transition border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Browse Catalog <FaChevronRight className="text-[10px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}


