"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    FaMagnifyingGlass,
    FaUserCheck,
    FaTruckFast,
    FaArrowRotateLeft
} from 'react-icons/fa6';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 }
    }
};

const stepVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
    }
};

const headerVariants = {
    hidden: { opacity: 0, y: -16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const steps = [
    {
        id: "01",
        title: "Discover & Select",
        description: "Explore our premium, curated catalog to locate your next scholarly masterpiece or literary text.",
        icon: FaMagnifyingGlass,
        accentColor: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900",
        topBar: "bg-blue-500",
    },
    {
        id: "02",
        title: "Match Provider",
        description: "Our intelligent archive system pairs your request with an elite local librarian and curator near you.",
        icon: FaUserCheck,
        accentColor: "bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-900",
        topBar: "bg-violet-500",
    },
    {
        id: "03",
        title: "Swift Delivery",
        description: "Experience secure, precise doorstep delivery powered by our specialized local shipping network.",
        icon: FaTruckFast,
        accentColor: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900",
        topBar: "bg-[#C5A059]",
    },
    {
        id: "04",
        title: "Effortless Return",
        description: "Read at your own pace. Once finished, request a seamless return pickup with a single click.",
        icon: FaArrowRotateLeft,
        accentColor: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900",
        topBar: "bg-emerald-500",
    }
];

export default function HowItWorks() {
    return (
        <section className="w-full bg-white dark:bg-slate-900 py-24 px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="mx-auto max-w-6xl">

                {/* Section Header */}
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="text-center max-w-xl mx-auto mb-16"
                >
                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.18em] text-[#C5A059] mb-3">
                        Execution Model
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#1A2332] dark:text-slate-50 tracking-tight leading-tight">
                        How BiblioDrop Works
                    </h2>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        A seamless, four-step logistics pipeline designed to deliver
                        world-class literature right to your workspace.
                    </p>
                </motion.div>

                {/* Connector Line — desktop only */}
                <div className="hidden lg:flex items-center justify-between px-[calc(12.5%_-_1px)] mb-8">
                    {steps.map((step, i) => (
                        <React.Fragment key={step.id}>
                            <div className={`w-2.5 h-2.5 rounded-full ${step.topBar} opacity-60`} />
                            {i < steps.length - 1 && (
                                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/60 mx-1" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Steps Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {steps.map((step) => {
                        const IconComponent = step.icon;

                        return (
                            <motion.div
                                key={step.id}
                                variants={stepVariants}
                                whileHover={{ y: -5, transition: { duration: 0.18 } }}
                                className="group relative flex flex-col bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-5 overflow-hidden
                                    transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-200/70 dark:hover:shadow-slate-900/60
                                    hover:border-slate-200 dark:hover:border-slate-600"
                            >
                                {/* Colored top accent bar */}
                                <div className={`absolute top-0 left-0 right-0 h-[2.5px] ${step.topBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`} />

                                {/* Step number — decorative */}
                                <span className="absolute top-4 right-4 text-[22px] font-black font-mono text-slate-100 dark:text-slate-700 group-hover:text-[#C5A059]/20 transition-colors tracking-tighter select-none">
                                    {step.id}
                                </span>

                                {/* Icon */}
                                <div className={`w-10 h-10 flex items-center justify-center rounded-xl border shadow-sm transition-transform duration-300 group-hover:scale-110 ${step.accentColor}`}>
                                    <IconComponent className="text-base" />
                                </div>

                                {/* Content */}
                                <div className="mt-5 flex-1">
                                    <h3 className="text-[13px] font-black text-[#1A2332] dark:text-slate-100 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
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