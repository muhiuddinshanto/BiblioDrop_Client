"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaMedal, FaCircleCheck } from 'react-icons/fa6';
import Image from 'next/image';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 140, damping: 14 }
    }
};

// পজিশন অনুযায়ী মেডেল ও বর্ডারের প্রিমিয়াম কালার স্কিম
const rankStyles = {
    0: { 
        medal: "text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]", 
        border: "dark:group-hover:border-amber-500/40 group-hover:border-amber-500/50",
        rankBadge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
    }, // 1st Place (Gold)
    1: { 
        medal: "text-slate-400 drop-shadow-[0_0_8px_rgba(148,163,184,0.4)]", 
        border: "dark:group-hover:border-slate-400/40 group-hover:border-slate-400/50",
        rankBadge: "bg-slate-400/10 text-slate-600 dark:text-slate-400 border-slate-400/20"
    }, // 2nd Place (Silver)
    2: { 
        medal: "text-amber-700 drop-shadow-[0_0_8px_rgba(180,83,9,0.3)]", 
        border: "dark:group-hover:border-amber-700/40 group-hover:border-amber-700/50",
        rankBadge: "bg-amber-700/10 text-amber-700 dark:text-amber-500 border-amber-700/20"
    }, // 3rd Place (Bronze)
};

export default function LibrarianCardWrapper({ librarians }) {
    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto"
        >
            {librarians.map((librarian, index) => {
                const { name, deliveries, avatar, role, id } = librarian;
                const currentStyle = rankStyles[index] || rankStyles[0];

                return (
                    <motion.div
                        key={id || index}
                        variants={cardVariants}
                        whileHover={{ y: -6, scale: 1.01 }}
                        className="group relative flex flex-col items-center bg-slate-50/50 dark:bg-[#161B27] border border-slate-100 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm dark:shadow-xl transition-colors duration-300 text-center"
                    >
                        {/* 🏅 মেডেল পজিশন ব্যাজ */}
                        <div className={`absolute top-4 right-4 text-2xl ${currentStyle.medal} transition-transform duration-300 group-hover:scale-110`}>
                            <FaMedal />
                        </div>

                        {/* পজিশন র্যাংক টেক্সট ব্যাজ */}
                        <div className={`absolute top-4 left-4 text-[10px] font-black px-2 py-0.5 border rounded-md uppercase tracking-wider ${currentStyle.rankBadge}`}>
                            #{index + 1} Rank
                        </div>

                        {/* প্রোফাইল ইমেজ (Next.js Image দিয়ে অপ্টিমাইজড) */}
                        <div className={`relative w-24 h-24 mt-4 bg-white dark:bg-[#0D1117] rounded-full overflow-hidden p-1 border-2 border-slate-200 dark:border-slate-800 transition-all duration-300 ${currentStyle.border}`}>
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image 
                                    src={avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120"} 
                                    alt={name} 
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="96px"
                                />
                            </div>
                        </div>

                        {/* লাইব্রেরিয়ান ইনফরমেশন */}
                        <div className="mt-5">
                            <h3 className="text-base font-bold text-slate-800 dark:text-white tracking-tight group-hover:text-[#C5A059] dark:group-hover:text-[#C5A059] transition-colors duration-200 capitalize">
                                {name}
                            </h3>
                            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
                                {role || "Expert Curator"}
                            </p>
                        </div>

                        {/* 📦 ডেলিভারি কাউন্টার বক্স */}
                        <div className="mt-6 w-full bg-white dark:bg-[#0D1117] border border-slate-100 dark:border-slate-800 rounded-xl py-3 px-4 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-colors duration-300">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                <FaCircleCheck className="text-emerald-500 text-sm" /> Deliveries
                            </span>
                            <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                                {deliveries} Completed
                            </span>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}