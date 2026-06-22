import { topLibrarians } from '@/lib/api/libraians';
import React from 'react';
import { FaMedal, FaCircleCheck, FaUserCheck } from 'react-icons/fa6';


export default async function TopLibrarians() {

    const librarianList = await topLibrarians();
    console.log(librarianList, 'librarian data');

    // মেডেলের কালার ম্যাপিং (ইন্ডেক্স অনুযায়ী)
    const medalColors = {
        0: "text-amber-500",   // Gold 
        2: "text-slate-400",   // Silver 
        1: "text-amber-700",   // Bronze 
    };

    return (
        <section className="w-full bg-white dark:bg-slate-900 py-16 px-6 lg:px-8 border-t border-slate-100">
            <div className="mx-auto max-w-6xl">
                
                {/* সেকশন হেডার */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5">
                        <FaUserCheck /> Elite Network
                    </span>
                    <h2 className="mt-1 text-2xl font-black text-[#0F172A] dark:text-slate-100 tracking-tight sm:text-3xl">
                        Top Librarians / Providers
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Top 3 librarians with the most successful book deliveries and excellent user ratings
                    </p>
                </div>

                {/* 👥 লাইব্রেরিয়ান কার্ডস গ্রিড */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto">
                    {librarianList?.map((librarian, index) => {
                        const { name, deliveries, avatar, role, id } = librarian;
                        
                        // ইন্ডেক্স অনুযায়ী মেডেলের কালার সেট করা হচ্ছে (ডিফল্ট কালার text-slate-300)
                        const currentMedalColor = medalColors[index] || "text-slate-300";

                        return (
                            <div 
                                key={id || index}
                                className="group relative flex flex-col items-center bg-slate-50/60 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-900 hover:border-slate-200/80 transition-all duration-300 text-center"
                            >
                                {/* 🏅 মেডেল পজিশন ব্যাজ (ডাইনামিক কালার) */}
                                <div className={`absolute top-4 right-4 text-xl ${currentMedalColor} drop-shadow-sm animate-pulse`}>
                                    <FaMedal />
                                </div>

                                {/* প্রোফাইল ইমেজ / অ্যাভাটার */}
                                <div className="relative w-20 h-20 bg-slate-200 rounded-full overflow-hidden p-1 border-2 border-slate-100 group-hover:border-[#0F172A]/20 transition-colors">
                                    <img 
                                        src={avatar} 
                                        alt={name} 
                                        className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* লাইব্রেরিয়ান ইনফরমেশন */}
                                <div className="mt-4">
                                    <h3 className="text-base font-black text-[#0F172A] dark:text-slate-100 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors capitalize">
                                        {name}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5 capitalize">
                                        {role}
                                    </p>
                                </div>

                                {/* 📦 ডেলিভারি কাউন্টার */}
                                <div className="mt-5 w-full bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl py-2.5 px-4 flex items-center justify-between transition-colors">
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                        <FaCircleCheck className="text-green-500 text-sm" /> Deliveries
                                    </span>
                                    <span className="text-sm font-black text-[#0F172A] dark:text-slate-100">
                                        {deliveries} Completed
                                    </span>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
