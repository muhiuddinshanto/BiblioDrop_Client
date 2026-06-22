import React from 'react';
import Link from 'next/link';
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

/**
 * =========================================================================
 * @COMPONENT: PopularCategories (Reusable Component)
 * =========================================================================
 * Features:
 * 1. Accepts an optional `categoriesList` prop to make it fully reusable.
 * 2. Dynamically maps domain-specific tech/minimal icons to each category.
 * 3. Appends the filter query dynamically to the URL (e.g., /books?category=Science).
 */

// ক্যাটাগরি অনুযায়ী আইকন এবং ব্যাকগ্রাউন্ড কালার ম্যাপ (Clean & Professional Look)
const categoryStyles = {
    "Philosophy": { icon: FaQuoteLeft, bg: "hover:bg-purple-50 hover:border-purple-200 dark:hover:bg-purple-900/40 dark:hover:border-purple-700" },
    "Architecture": { icon: FaPalette, bg: "hover:bg-amber-50 hover:border-amber-200 dark:hover:bg-amber-900/40 dark:hover:border-amber-700" },
    "History": { icon: FaLandmark, bg: "hover:bg-emerald-50 hover:border-emerald-200 dark:hover:bg-emerald-900/40 dark:hover:border-emerald-700" },
    "Science": { icon: FaAtom, bg: "hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/40 dark:hover:border-blue-700" },
    "Cartography": { icon: FaCompass, bg: "hover:bg-rose-50 hover:border-rose-200 dark:hover:bg-rose-900/40 dark:hover:border-rose-700" },
    "Technology": { icon: FaMicrochip, bg: "hover:bg-cyan-50 hover:border-cyan-200 dark:hover:bg-cyan-900/40 dark:hover:border-cyan-700" },
    "Non-Fiction": { icon: FaBook, bg: "hover:bg-indigo-50 hover:border-indigo-200 dark:hover:bg-indigo-900/40 dark:hover:border-indigo-700" },
    "Default": { icon: FaLayerGroup, bg: "hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-700" }
};

export default function PopularCategories({ categoriesList }) {
    // যদি প্রপ্স হিসেবে কোনো লিস্ট না আসে, তবে তোমার দেওয়া ডিফল্ট লিস্টটি ব্যবহার হবে
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
        <section className="w-full bg-white dark:bg-slate-900 py-16 px-6 lg:px-8 border-t border-slate-100">
            <div className="mx-auto max-w-6xl">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-5 mb-10">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Browse by Interest</span>
                        <h2 className="mt-1 text-2xl font-black text-[#0F172A] dark:text-slate-100 tracking-tight sm:text-3xl">Popular Categories</h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Explore literature and research across specialized genres</p>
                    </div>
                </div>

                {/* 🎛️ Dynamic Responsive Grid Layout */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                    {displayCategories.map((category) => {
                        // ক্যাটাগরির নাম অনুযায়ী স্টাইল বা আইকন খুঁজে বের করা, না থাকলে ডিফল্ট সেট করা
                        const config = categoryStyles[category] || categoryStyles["Default"];
                        const IconComponent = config.icon;

                        return (
                            <Link
                                key={category}
                                // ক্লিক করলে ব্রাউজ পেজে ক্যাটাগরি ফিল্টার কুয়েরি অ্যাপ্লাই হবে (e.g., /books?category=Science)
                                href={`/books?category=${encodeURIComponent(category)}`}
                                className={`group flex flex-col items-center justify-center p-5 bg-slate-50/60 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl transition-all duration-300 text-center ${config.bg} hover:shadow-sm hover:-translate-y-0.5`}
                            >
                                {/* Icon Container */}
                                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 group-hover:text-[#0F172A] dark:group-hover:text-white group-hover:border-transparent shadow-sm transition-all">
                                    <IconComponent className="text-xl" />
                                </div>

                                {/* Category Title */}
                                <h3 className="mt-3 text-xs font-black text-[#0F172A] dark:text-slate-100 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {category}
                                </h3>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
