"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
    {
        id: "01",
        title: "Discover & Select",
        description: "Browse our curated catalog and choose your next great read.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
            </svg>
        ),
    },
    {
        id: "02",
        title: "Secure Checkout",
        description: "Seamless instant payment processing powered safely by Stripe.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
        ),
    },
    {
        id: "03",
        title: "Instant Sync",
        description: "Your digital order immediately synchronizes with our local archives.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
            </svg>
        ),
    },
    {
        id: "04",
        title: "Personal Library",
        description: "Access, read, and manage your curated library collection seamlessly.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
        ),
    },
];

const pills = [
    { label: "Same-day", icon: "⚡" },
    { label: "Insured", icon: "🛡" },
    { label: "Tracked", icon: "📍" },
    { label: "Curated", icon: "★" },
];

// ── Framer Motion variants ──
const sectionVariants = {
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

const stepVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HowItWorks() {
    const [active, setActive] = useState(0);
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: false, margin: "-100px" });

    // Auto-cycle active step
    useEffect(() => {
        const id = setInterval(() => setActive((p) => (p + 1) % steps.length), 2500);
        return () => clearInterval(id);
    }, []);

    return (
        <motion.section
            ref={ref}
            variants={sectionVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative w-full bg-slate-50 dark:bg-[#0f1620] py-24 px-6 lg:px-8 overflow-hidden transition-colors duration-500"
        >
            {/* Ambient Radial Glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(197,160,89,0.08) 0%, transparent 70%)",
                }}
            />

            <div className="relative mx-auto max-w-4xl">

                {/* ── Header ── */}
                <motion.div variants={headerVariants} className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="block w-8 h-px bg-[#C5A059] opacity-50" />
                        <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#C5A059]">
                            Execution Model
                        </span>
                        <span className="block w-8 h-px bg-[#C5A059] opacity-50" />
                    </div>

                    <h2
                        className="text-3xl sm:text-4xl font-black leading-tight text-slate-900 dark:text-white"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                        How <span className="text-[#C5A059]">BiblioDrop</span> Works
                    </h2>
                    <p className="mt-3 text-sm text-slate-500 dark:text-[#8a9bb0] leading-relaxed max-w-md mx-auto">
                        A seamless four-step pipeline — from catalog to doorstep, then back again.
                    </p>
                </motion.div>

                {/* ── Connector track (desktop) ── */}
                <div
                    aria-hidden
                    className="hidden lg:flex items-center justify-between mb-6"
                    style={{ padding: "0 calc(12.5% - 1px)" }}
                >
                    {steps.map((step, i) => (
                        <React.Fragment key={step.id}>
                            <div
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                                    active === i 
                                        ? "bg-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,.6)]" 
                                        : "bg-slate-200 dark:bg-[#2a3a4e]"
                                }`}
                            />
                            {i < steps.length - 1 && (
                                <div className="flex-1 h-px mx-1 bg-slate-200 dark:bg-[#2a3a4e] relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-[#C5A059]/30"
                                        animate={{ width: active > i ? "100%" : "0%" }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                    />
                                </div>
                             )}
                        </React.Fragment>
                    ))}
                </div>

                {/* ── Steps Grid ── */}
                <motion.div
                    variants={sectionVariants}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {steps.map((step, i) => {
                        const isActive = active === i;
                        return (
                            <motion.div
                                key={step.id}
                                variants={stepVariants}
                                onMouseEnter={() => setActive(i)}
                                className={`group relative flex flex-col items-center text-center p-5 rounded-2xl cursor-default transition-all duration-300 border ${
                                    isActive
                                        ? "bg-white dark:bg-[#1e2b3a]/90 border-[#C5A059]/40 shadow-xl"
                                        : "bg-slate-100/70 dark:bg-[#1a2332]/50 border-slate-200/60 dark:border-[#2a3a4e]/60"
                                }`}
                                animate={{ y: isActive ? -6 : 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {/* Step number */}
                                <span className={`absolute top-3 right-4 font-mono font-black text-xl select-none transition-colors duration-300 ${
                                    isActive ? "text-[#C5A059]/20" : "text-slate-300 dark:text-[#2a3a4e]/50"
                                }`}>
                                    {step.id}
                                </span>

                                {/* Icon node */}
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-all duration-300 border ${
                                    isActive
                                        ? "bg-[#C5A059]/10 border-[#C5A059]/40 text-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.1)]"
                                        : "bg-white dark:bg-[#1a2332]/80 border-slate-200 dark:border-[#2a3a4e]/80 text-slate-400 dark:text-[#4a6070]"
                                }`}>
                                    {step.icon}
                                </div>

                                {/* Gold underline bar */}
                                <motion.div
                                    className="w-6 h-[2px] rounded-full mb-3 origin-left bg-[#C5A059]/70"
                                    animate={{ scaleX: isActive ? 1 : 0 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                />

                                {/* Title */}
                                <h3 className={`text-[12.5px] font-semibold leading-snug mb-2 transition-colors duration-300 ${
                                    isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-[#8a9bb0]"
                                }`}>
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className={`text-[11px] leading-relaxed transition-colors duration-300 ${
                                    isActive ? "text-slate-500 dark:text-[#7a8fa0]" : "text-slate-400 dark:text-[#4a5a6a]"
                                }`}>
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ── Bottom Stats Row ── */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.55 } }
                    }}
                    className="mt-12 flex rounded-xl overflow-hidden border border-slate-200 dark:border-[#2a3a4e]/70"
                >
                    {pills.map((pill, i) => (
                        <div
                            key={pill.label}
                            className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3.5 text-[10.5px] font-medium text-slate-500 dark:text-[#8a9bb0] tracking-wide transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-[#1e2b3a] hover:text-slate-800 dark:hover:text-[#c5cfd8] cursor-default ${
                                i < pills.length - 1 ? "border-r border-slate-200 dark:border-[#2a3a4e]/70" : ""
                            }`}
                        >
                            <span className="text-[#C5A059] opacity-70 text-base leading-none">
                                {pill.icon}
                            </span>
                            {pill.label}
                        </div>
                    ))}
                </motion.div>

            </div>
        </motion.section>
    );
}