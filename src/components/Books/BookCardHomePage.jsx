"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaBookOpen } from "react-icons/fa6";

const fallbackImage =
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=500";

export default function BookCardHomePage({ book }) {
    if (!book) return null;

    const { title, author, category, price, image, rating = 5, reviews = 0, badge } = book;

    const priceValue =
        typeof price === "number" ? price.toFixed(2) : parseFloat(String(price)).toFixed(2);

    const starsArray = [...Array(5)].map((_, i) => ({
        filled: i < Math.floor(rating),
    }));

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-2xl h-full cursor-pointer select-none w-full
                bg-white dark:bg-[#111827]
                border border-slate-100 dark:border-white/[0.06]
                hover:border-[#D4AF37]/50 dark:hover:border-[#D4AF37]/30
                shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                transition-[border-color,box-shadow] duration-300"
        >
            {/* Shimmer line top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

            {/* ── Image ── */}
            <div className="relative overflow-hidden flex-shrink-0 h-[180px] sm:h-[220px] bg-slate-100 dark:bg-[#0d1320]">
                <motion.img
                    src={image || fallbackImage}
                    alt={title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onError={(e) => { e.currentTarget.src = fallbackImage; }}
                />

                {/* Gradient overlay */}
                <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/70 via-transparent to-transparent dark:from-[#0a0e18]/85"
                />

                {/* Badge */}
                {badge && (
                    <span className={`absolute top-2.5 right-2.5 text-[8px] sm:text-[9px] font-black uppercase tracking-[.14em] px-2 py-0.5 sm:py-1 rounded-md backdrop-blur-sm ${
                        badge.type === "new"
                            ? "bg-slate-900/80 text-[#D4AF37] border border-[#D4AF37]/40"
                            : "bg-[#D4AF37] text-slate-900 border border-transparent"
                    }`}>
                        {badge.text}
                    </span>
                )}

                {/* Rating — bottom left */}
                <div className="absolute bottom-2.5 left-3 flex items-center gap-1">
                    <div className="flex gap-[1px]">
                        {starsArray.map((s, i) => (
                            <FaStar
                                key={i}
                                className="text-[8px] sm:text-[9px]"
                                style={{ color: s.filled ? "#D4AF37" : "rgba(212,175,55,0.2)" }}
                            />
                        ))}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-white/70 tabular-nums">
                        ({reviews > 999 ? `${(reviews / 1000).toFixed(1)}k` : reviews})
                    </span>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="flex flex-col flex-1 p-3.5 sm:p-4 pb-4">
                {/* Category */}
                <span className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-[.2em] text-[#D4AF37] mb-1">
                    {category}
                </span>

                {/* Title */}
                <h3
                    className="line-clamp-2 leading-snug text-[13.5px] sm:text-[14.5px] font-bold min-h-[36px] sm:min-h-[40px]
                        text-slate-800 dark:text-slate-100
                        group-hover:text-[#D4AF37] transition-colors duration-200"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                    {title}
                </h3>

                {/* Author */}
                <p className="mt-1 text-[10px] sm:text-[10.5px] font-medium text-slate-400 dark:text-slate-500 truncate">
                    by {author}
                </p>

                {/* Divider */}
                <div className="mt-auto pt-3">
                    <div className="h-px w-full bg-slate-100 dark:bg-white/[0.05] mb-2.5" />

                    <div className="flex items-center justify-between">
                        {/* Price */}
                        <div className="flex items-baseline gap-0.5">
                            <sup className="text-[8px] sm:text-[9px] text-[#D4AF37] font-bold">$</sup>
                            <span className="text-[15px] sm:text-[17px] font-black tracking-tight text-slate-900 dark:text-white">
                                {priceValue}
                            </span>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={(e) => e.preventDefault()}
                            className="flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-[.08em] px-2.5 sm:px-3.5 py-1.5 rounded-lg
                                bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/25
                                hover:bg-[#D4AF37] hover:text-slate-900 hover:border-[#D4AF37]
                                transition-all duration-200"
                        >
                            <FaBookOpen className="text-[9px] sm:text-[10px]" />
                            Borrow
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}