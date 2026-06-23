import { topLibrarians } from '@/lib/api/libraians';
import React from 'react';
import { FaUserCheck } from 'react-icons/fa6';
import LibrarianCardWrapper from './LibrarianCardWrapper';


export default async function TopLibrarians() {
    const librarianList = await topLibrarians();

    // ডাটা যদি ৩ টার বেশি আসে, তবে টপ ৩ জনকে ফিল্টার করে নেওয়া (Leaderboard ভাইবের জন্য)
    const topThreeLibrarians = librarianList?.slice(0, 3) || [];

    return (
        <section className="w-full bg-white dark:bg-[#0D1117] py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800/60 transition-colors duration-300 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                
                {/* সেকশন হেডার */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059] flex items-center justify-center gap-1.5">
                        <FaUserCheck className="text-xs" /> Elite Network
                    </span>
                    <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white tracking-tight sm:text-3xl">
                        Top Librarians / Providers
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Top 3 curators with the most successful book deliveries and excellent user ratings
                    </p>
                </div>

                {/* 👥 লাইব্রেরিয়ান কার্ডস গ্রিড (ক্লায়েন্ট র‍্যাপার সহ) */}
                <LibrarianCardWrapper librarians={topThreeLibrarians} />

            </div>
        </section>
    );
}