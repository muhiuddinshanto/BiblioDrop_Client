"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
    FaPalette, 
    FaCompass, 
    FaLandmark, 
    FaAtom, 
    FaMicrochip, 
    FaBook, 
    FaQuoteLeft,
    FaLayerGroup
} from 'react-icons/fa6';

const categoryStyles = {
    "Philosophy": { 
        icon: FaQuoteLeft, 
        color: "text-purple-600 dark:text-purple-400",
        bg: "hover:bg-purple-50/50 hover:border-purple-200/60 dark:hover:bg-purple-500/10 dark:hover:border-purple-500/30" 
    },
    "Architecture": { 
        icon: FaPalette, 
        color: "text-amber-600 dark:text-amber-400",
        bg: "hover:bg-amber-50/50 hover:border-amber-200/60 dark:hover:bg-amber-500/10 dark:hover:border-amber-500/30" 
    },
    "History": { 
        icon: FaLandmark, 
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "hover:bg-emerald-50/50 hover:border-emerald-200/60 dark:hover:bg-emerald-500/10 dark:hover:border-emerald-500/30" 
    },
    "Science": { 
        icon: FaAtom, 
        color: "text-blue-600 dark:text-blue-400",
        bg: "hover:bg-blue-50/50 hover:border-blue-200/60 dark:hover:bg-blue-500/10 dark:hover:border-blue-500/30" 
    },
    "Cartography": { 
        icon: FaCompass, 
        color: "text-rose-600 dark:text-rose-400",
        bg: "hover:bg-rose-50/50 hover:border-rose-200/60 dark:hover:bg-rose-500/10 dark:hover:border-rose-500/30" 
    },
    "Technology": { 
        icon: FaMicrochip, 
        color: "text-cyan-600 dark:text-cyan-400",
        bg: "hover:bg-cyan-50/50 hover:border-cyan-200/60 dark:hover:bg-cyan-500/10 dark:hover:border-cyan-500/30" 
    },
    "Non-Fiction": { 
        icon: FaBook, 
        color: "text-indigo-600 dark:text-indigo-400",
        bg: "hover:bg-indigo-50/50 hover:border-indigo-200/60 dark:hover:bg-indigo-500/10 dark:hover:border-indigo-500/30" 
    },
    "Default": { 
        icon: FaLayerGroup, 
        color: "text-slate-600 dark:text-slate-400",
        bg: "hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-700" 
    }
};

// গ্রিড কন্টেইনারের অ্যানিমেশন ভেরিয়েন্ট (একের পর এক কার্ড আসার জন্য)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05, // প্রতিটি কার্ড ৫ মিলি-সেকেন্ড পর পর আসবে
        }
    }
};

// একক কার্ডের অ্যানিমেশন ভেরিয়েন্ট
const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 15 }
    }
};

export default function PopularCategories({ categoriesList }) {
    const defaultCategories = [
        "Philosophy", 
        "Architecture", 
        "History", 
        "Science", 
        "Cartography", 
        "Technology", 
        "Non-Fiction"
    ];

    const displayCategories = categoriesList || defaultCategories;

    return (
        <section className="w-full bg-white dark:bg-[#0D1117] py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800/60 transition-colors duration-300 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 dark:border-slate-800/60 pb-6 mb-12">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059]">
                            Browse by Interest
                        </span>
                        <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white tracking-tight sm:text-3xl">
                            Popular Categories
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Explore literature and research across specialized genres
                        </p>
                    </div>
                </div>

                {/* 🎛️ Animated Grid Layout */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
                >
                    {displayCategories.map((category) => {
                        const config = categoryStyles[category] || categoryStyles["Default"];
                        const IconComponent = config.icon;

                        return (
                            <motion.div
                                key={category}
                                variants={cardVariants}
                                whileHover={{ 
                                    y: -6, 
                                    scale: 1.02,
                                    transition: { type: "spring", stiffness: 400, damping: 10 } 
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full"
                            >
                                <Link
                                    href={`/books?category=${encodeURIComponent(category)}`}
                                    className={`group flex flex-col items-center justify-center p-6 h-full bg-slate-50/50 dark:bg-[#161B27] border border-slate-100 dark:border-slate-800/60 rounded-2xl transition-colors duration-300 text-center ${config.bg} hover:shadow-md`}
                                >
                                    {/* Icon Box */}
                                    <div className={`p-3.5 bg-white dark:bg-[#0D1117] border border-slate-100 dark:border-slate-800 rounded-xl ${config.color} group-hover:scale-110 shadow-[0_2px_8px_rgba(0,0,0,0.02)] dark:shadow-none group-hover:shadow-none transition-all duration-300`}>
                                        <IconComponent className="text-xl" />
                                    </div>

                                    {/* Category Title */}
                                    <h3 className="mt-4 text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight transition-colors duration-200">
                                        {category}
                                    </h3>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}