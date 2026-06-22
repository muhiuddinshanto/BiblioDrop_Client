"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-12 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">We could not load this shelf.</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Please try again. If the backend is waking up, this usually clears in a moment.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="flex-1 rounded-xl bg-[#0F172A] px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-[#D4AF37] dark:text-slate-950"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
