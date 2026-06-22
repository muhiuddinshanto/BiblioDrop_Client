"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    FaShieldHalved, 
    FaLeaf, 
    FaClock, 
    FaGem 
} from 'react-icons/fa6';

/**
 * =========================================================================
 * @COMPONENT: WhyChooseUs (Client Component with Scroll Animations)
 * =========================================================================
 * Features:
 * 1. Framer Motion 'whileInView' combined with interactive hover physics.
 * 2. 4-column modern card grid showing the platform's core value propositions.
 * 3. Minimalist layout matching the premium typography of your application.
 */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // প্রতিটি কার্ডের অ্যানিমেশনের মধ্যকার গ্যাপ
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export default function WhyChooseUs() {
    // ৪টি মডার্ন কি-ফিচারের ডাটা (ইংরেজিতে)
    const features = [
        {
            id: 1,
            title: "Curated Excellence",
            description: "Every manuscript and textbook undergoes strict physical evaluation by elite curators before delivery.",
            icon: FaGem,
            borderColor: "hover:border-amber-200",
            iconColor: "text-amber-500 bg-amber-50"
        },
        {
            id: 2,
            title: "Eco-Friendly Logistics",
            description: "Our decentralized local sharing infrastructure utilizes 100% zero-emission shipping methods.",
            icon: FaLeaf,
            borderColor: "hover:border-emerald-200",
            iconColor: "text-emerald-500 bg-emerald-50"
        },
        {
            id: 3,
            title: "Flexible Scheduling",
            description: "No hard deadlines or stress. Extend your borrowing session dynamically from your dashboard anytime.",
            icon: FaClock,
            borderColor: "hover:border-blue-200",
            iconColor: "text-blue-500 bg-blue-50"
        },
        {
            id: 4,
            title: "Secure Verification",
            description: "Dual-layer authentication tracks every handoff perfectly, ensuring full asset protection.",
            icon: FaShieldHalved,
            borderColor: "hover:border-purple-200",
            iconColor: "text-purple-500 bg-purple-50"
        }
    ];

    return (
        <section className="w-full bg-white py-20 px-6 lg:px-8 border-t border-slate-100 overflow-hidden">
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
                        Core Advantages
                    </span>
                    <h2 className="mt-2 text-2xl font-black text-[#1A2332] tracking-tight sm:text-4xl">
                        Why Choose BiblioDrop
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Bridging institutional archival standards with real-time on-demand local distribution networks.
                    </p>
                </motion.div>

                {/* 🎛️ Features Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {features.map((feature) => {
                        const IconComponent = feature.icon;
                        
                        return (
                            <motion.div 
                                key={feature.id}
                                variants={cardVariants}
                                whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.2 } }}
                                className={`group flex flex-col items-start bg-slate-50/50 border border-slate-100 rounded-2xl p-6 transition-all duration-300 hover:bg-white hover:shadow-xl ${feature.borderColor}`}
                            >
                                {/* Icon Container */}
                                <div className={`p-3 rounded-xl border border-transparent shadow-sm transition-transform duration-300 group-hover:scale-105 ${feature.iconColor}`}>
                                    <IconComponent className="text-xl" />
                                </div>

                                {/* Content Title & Desc */}
                                <h3 className="mt-5 text-base font-black text-[#1A2332] tracking-tight group-hover:text-blue-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-xs leading-relaxed text-slate-500 font-medium">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}