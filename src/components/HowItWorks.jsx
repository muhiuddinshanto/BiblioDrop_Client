"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    FaMagnifyingGlass, 
    FaUserCheck, 
    FaTruckFast, 
    FaArrowRotateLeft 
} from 'react-icons/fa6';

/**
 * =========================================================================
 * @COMPONENT: HowItWorks (Client Component with Scroll Animations)
 * =========================================================================
 * Features:
 * 1. Smooth scroll-triggered entrance animations using Framer Motion.
 * 2. Staggered children effect so steps appear sequentially.
 * 3. Modern, clean "Tech Vibe" UI grid with connection lines for desktop.
 */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // একটি কার্ড আসার পর পরেরটি আসার গ্যাপ
        }
    }
};

const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export default function HowItWorks() {
    // ৪টি প্রফেশনাল স্টেপের ডাটা
    const steps = [
        {
            id: "01",
            title: "Discover & Select",
            description: "Explore our premium, meticulously curated catalog to locate your next scholarly masterpiece or literary text.",
            icon: FaMagnifyingGlass,
            iconBg: "bg-blue-50 text-blue-600 border-blue-100",
        },
        {
            id: "02",
            title: "Match Provider",
            description: "Our intelligent archive system pairs your request with an elite local librarian and curator near you.",
            icon: FaUserCheck,
            iconBg: "bg-purple-50 text-purple-600 border-purple-100",
        },
        {
            id: "03",
            title: "Swift Delivery",
            description: "Experience secure, precise doorstep delivery powered by our specialized local shipping network.",
            icon: FaTruckFast,
            iconBg: "bg-amber-50 text-amber-600 border-amber-100",
        },
        {
            id: "04",
            title: "Effortless Return",
            description: "Read completely at your own pace. Once finished, request a seamless return pickup with a single click.",
            icon: FaArrowRotateLeft,
            iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
        }
    ];

    return (
        <section className="w-full bg-white dark:bg-slate-900 py-20 px-6 lg:px-8 border-t border-slate-100 overflow-hidden">
            <div className="mx-auto max-w-6xl">
                
                {/* 🎯 Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="text-xs font-black uppercase tracking-widest text-[#C5A059]">
                        Execution Model
                    </span>
                    <h2 className="mt-2 text-2xl font-black text-[#1A2332] dark:text-slate-100 tracking-tight sm:text-4xl">
                        How BiblioDrop Works
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        A seamless, four-step logistics pipeline designed to deliver world-class literature right to your workspace.
                    </p>
                </motion.div>

                {/* 🎛️ Steps Grid Layout */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 relative"
                >
                    {steps.map((step) => {
                        const IconComponent = step.icon;
                        
                        return (
                            <motion.div 
                                key={step.id}
                                variants={stepVariants}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="group relative flex flex-col items-start bg-slate-50/60 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:border-slate-200/80"
                            >
                                {/* Step Number Badge */}
                                <span className="absolute top-6 right-6 text-2xl font-black text-slate-200/70 group-hover:text-[#C5A059]/20 transition-colors tracking-tight font-mono">
                                    {step.id}
                                </span>

                                {/* Icon Container */}
                                <div className={`p-3.5 border rounded-xl shadow-sm bg-white dark:bg-slate-900 transition-transform duration-300 group-hover:scale-110 ${step.iconBg}`}>
                                    <IconComponent className="text-xl" />
                                </div>

                                {/* Step Content */}
                                <div className="mt-6">
                                    <h3 className="text-base font-black text-[#1A2332] dark:text-slate-100 tracking-tight group-hover:text-blue-600 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
