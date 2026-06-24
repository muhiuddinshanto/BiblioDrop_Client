"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa6";

const fallbackImage =
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=500";

export default function BookCardHomePage({ book }) {
    if (!book) return null;

    const { title, author, category, price, image, rating = 5, reviews = 0, badge } = book;

    const priceValue =
        typeof price === "number" ? price.toFixed(2) : parseFloat(String(price)).toFixed(2);

    return (
        <motion.div
            whileHover={{
                y: -7,
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-2xl h-full cursor-pointer transition-all duration-300
                bg-white dark:bg-[#18202e] 
                border border-slate-200 dark:border-[#2a3a4e]/80
                hover:border-[#C5A059]/40 dark:hover:border-[#C5A059]/40
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
            {/* ── Image container ── */}
            <div className="relative overflow-hidden flex-shrink-0 h-[200px] bg-slate-100 dark:bg-[#111a26]">
                <motion.img
                    src={image || fallbackImage}
                    alt={title}
                    className="w-full h-full object-cover"
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    whileHover={{ scale: 1.06 }}
                    onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                    }}
                />

                {/* Dark gradient overlay — bottom fade */}
                <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/60 via-transparent to-transparent dark:from-[#0f1620]/85"
                />

                {/* Badge */}
                {badge && (
                    <span className={`absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-[.12em] px-2 py-1 rounded-md border ${
                        badge.type === "new"
                            ? "bg-slate-900 dark:bg-[#0f1620] text-[#C5A059] border-[#C5A059]/35"
                            : "bg-[#C5A059] text-slate-900 dark:text-[#0f1620] border-transparent"
                    }`}>
                        {badge.text}
                    </span>
                )}

                {/* Rating overlay — sits on the gradient */}
                <div className="absolute bottom-2.5 left-3 flex items-center gap-1">
                    <div className="flex gap-px">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className="text-[9px]"
                                style={{
                                    color: i < Math.floor(rating) ? "#C5A059" : "rgba(197,160,89,0.25)",
                                }}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] font-semibold text-white/80 dark:text-[#C5A059]/60">
                        ({reviews > 999 ? `${(reviews / 1000).toFixed(1)}k` : reviews})
                    </span>
                </div>
            </div>

            {/* ── Card body ── */}
            <div className="flex flex-col flex-1 p-3.5 pb-4">

                {/* Category */}
                <span className="text-[9.5px] font-bold uppercase tracking-[.16em] mb-1.5 text-[#C5A059]">
                    {category}
                </span>

                {/* Title */}
                <h3
                    className="line-clamp-2 leading-snug transition-colors duration-200 text-slate-800 dark:text-[#d8e0ea] group-hover:text-[#C5A059] min-h-[38px] text-[14px] font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                    {title}
                </h3>

                {/* Author */}
                <p className="mt-1 text-[10.5px] font-medium truncate text-slate-400 dark:text-[#5a7080]">
                    {author}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100 dark:border-[#2a3a4e]/70">
                    
                    {/* Price */}
                    <span className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white font-sans">
                        <sup className="text-[9px] align-top mt-[3px] inline-block text-[#C5A059]">
                            $
                        </sup>
                        {priceValue}
                    </span>

                    {/* Borrow CTA */}
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="text-[10px] font-semibold tracking-[.06em] px-3 py-1.5 rounded-lg border 
                            bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/25 
                            hover:bg-[#C5A059] hover:text-white dark:hover:text-[#0f1620] transition-colors duration-200"
                    >
                        Borrow
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}