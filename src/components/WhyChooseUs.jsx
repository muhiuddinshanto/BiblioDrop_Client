"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
    {
        id: "01",
        title: "Curated Excellence",
        description: "Every manuscript undergoes strict physical evaluation by elite curators before delivery.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-[18px] h-[18px]">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ),
        accentClass: {
            topBar: "bg-[#C5A059]",
            iconContainer: "text-[#C5A059] bg-[#C5A059]/10 border-[#C5A059]/25",
            hoverBorder: "hover:border-[#C5A059]/45",
            hoverShadow: "hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]",
            dotColor: "bg-[#C5A059]",
        },
    },
    {
        id: "02",
        title: "Eco-Friendly Logistics",
        description: "Decentralized local sharing with 100% zero-emission shipping methods.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-[18px] h-[18px]">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        ),
        accentClass: {
            topBar: "bg-[#34a878]",
            iconContainer: "text-[#34a878] bg-[#34a878]/10 border-[#34a878]/25",
            hoverBorder: "hover:border-[#34a878]/40",
            hoverShadow: "hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]",
            dotColor: "bg-[#34a878]",
        },
    },
    {
        id: "03",
        title: "Flexible Scheduling",
        description: "No hard deadlines. Extend your borrowing session from your dashboard anytime.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-[18px] h-[18px]">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
        accentClass: {
            topBar: "bg-[#388bde]",
            iconContainer: "text-[#388bde] bg-[#388bde]/10 border-[#388bde]/25",
            hoverBorder: "hover:border-[#388bde]/40",
            hoverShadow: "hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]",
            dotColor: "bg-[#388bde]",
        },
    },
    {
        id: "04",
        title: "Secure Verification",
        description: "Dual-layer authentication tracks every handoff, ensuring full asset protection.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-[18px] h-[18px]">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        accentClass: {
            topBar: "bg-[#8c64dc]",
            iconContainer: "text-[#8c64dc] bg-[#8c64dc]/10 border-[#8c64dc]/25",
            hoverBorder: "hover:border-[#8c64dc]/40",
            hoverShadow: "hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]",
            dotColor: "bg-[#8c64dc]",
        },
    },
];

const badges = [
    { label: "10,000+ Titles", color: "bg-[#C5A059]" },
    { label: "Carbon Neutral", color: "bg-[#34a878]" },
    { label: "24 / 7 Support", color: "bg-[#388bde]" },
    { label: "Bank-grade Security", color: "bg-[#8c64dc]" },
];

// ── Framer Motion variants ──────────────────────────────────────────────────

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
};

const headerVariants = {
    hidden: { opacity: 0, y: -18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const badgesVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.5 } },
};

export default function WhyChooseUs() {
    return (
        <section className="relative w-full bg-slate-50 dark:bg-[#0f1620] py-20 px-6 lg:px-8 overflow-hidden transition-colors duration-500">

            {/* Ambient glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 w-[400px] h-[400px] rounded-full opacity-40 dark:opacity-100"
                style={{
                    background: "radial-gradient(circle, rgba(197,160,89,0.06) 0%, transparent 70%)",
                    transform: "translate(30%, -30%)",
                }}
            />

            <div className="relative mx-auto max-w-4xl">

                {/* ── Header ── */}
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="text-center mb-14"
                >
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="block w-7 h-px bg-[#C5A059] opacity-45" />
                        <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#C5A059]">
                            Core Advantages
                        </span>
                        <span className="block w-7 h-px bg-[#C5A059] opacity-45" />
                    </div>

                    <h2
                        className="text-3xl sm:text-[38px] font-black leading-tight text-slate-900 dark:text-white mb-2"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                        Why Choose <span className="text-[#C5A059]">BiblioDrop</span>
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-[#6a7f96] leading-relaxed max-w-md mx-auto">
                        Bridging institutional archival standards with real-time on-demand local distribution networks.
                    </p>
                </motion.div>

                {/* ── Cards Grid ── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {features.map((f) => (
                        <motion.div
                            key={f.id}
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            className={`group relative flex flex-col rounded-2xl p-[22px] overflow-hidden cursor-default transition-all duration-300 
                                bg-white dark:bg-[#1a2535] 
                                border border-slate-200/80 dark:border-slate-800/70 
                                ${f.accentClass.hoverBorder} ${f.accentClass.hoverShadow}`}
                        >
                            {/* Colored top accent bar */}
                            <div
                                aria-hidden
                                className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${f.accentClass.topBar}`}
                            />

                            {/* Step number */}
                            <span className="absolute top-3 right-3.5 font-mono font-bold text-[11px] text-slate-300 dark:text-slate-700 transition-colors duration-300">
                                {f.id}
                            </span>

                            {/* Icon Container */}
                            <motion.div
                                className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center mb-5 border transition-all duration-250 ${f.accentClass.iconContainer}`}
                                whileHover={{ scale: 1.05 }}
                            >
                                {f.icon}
                            </motion.div>

                            {/* Title */}
                            <h3 className="text-[12.5px] font-semibold mb-2 leading-snug text-slate-800 dark:text-[#c5cfd8] transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-white">
                                {f.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[11px] leading-[1.65] text-slate-500 dark:text-[#6a7f96]">
                                {f.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── Bottom Badges ── */}
                <motion.div
                    variants={badgesVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="mt-9 pt-7 flex items-center justify-center flex-wrap gap-2 border-t border-slate-200 dark:border-slate-800/70"
                >
                    {badges.map((b) => (
                        <div
                            key={b.label}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10.5px] font-medium text-slate-500 dark:text-[#6a7f96] cursor-default
                                border border-slate-200 dark:border-slate-800/70 transition-colors duration-200 hover:text-[#C5A059] hover:border-[#C5A059]/30"
                        >
                            <span
                                className={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${b.color}`}
                            />
                            {b.label}
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}