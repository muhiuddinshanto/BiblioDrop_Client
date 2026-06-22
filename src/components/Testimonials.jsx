"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaHeart } from 'react-icons/fa6';

/**
 * =========================================================================
 * @COMPONENT: Testimonials (Client Component with Scroll Animations)
 * =========================================================================
 * Features:
 * 1. Animated using Framer Motion via 'whileInView' scroll triggers.
 * 2. Staggered children effect so cards appear one after another smoothly.
 * 3. Minimalist dark-accented typography with a premium grid structure.
 */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // একটি কার্ডের পর আরেকটি কার্ড আসার ব্যবধান
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

export default function Testimonials() {
    // প্রফেশনাল ৩টি স্ট্যাটিক রিভিউ ডাটা
    const reviews = [
        {
            id: 1,
            name: "Alexander Vance",
            role: "Research Scholar",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
            comment: "BiblioDrop has completely redefined my research workflow. Having rare historical manuscripts and academic texts delivered straight to my workspace by expert local curators is an absolute luxury.",
            rating: 5,
        },
        {
            id: 2,
            name: "Sarah Jenkins",
            role: "Literary Critic & Author",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
            comment: "The precision of their delivery network combined with the immaculate physical quality of the curated copies is flawless. It feels like having a world-class personal university archive at your fingertips.",
            rating: 5,
        },
        {
            id: 3,
            name: "Marcus Thorne",
            role: "Collector & Historian",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
            comment: "I am extremely selective about the editions I read. The curators here treat literature with true scholarly care. The seamless return pickups make continuous reading effortless.",
            rating: 5,
        }
    ];

    return (
        <section className="w-full bg-slate-50/50 py-20 px-6 lg:px-8 border-t border-slate-100 overflow-hidden">
            <div className="mx-auto max-w-6xl">
                
                {/* 🎯 Section Header (Scroll Animated) */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="text-xs font-black uppercase tracking-widest text-[#C5A059] flex items-center justify-center gap-1.5">
                        <FaHeart className="animate-pulse" /> Reader Feedback
                    </span>
                    <h2 className="mt-2 text-2xl font-black text-[#1A2332] tracking-tight sm:text-4xl">
                        Voices of Our Community
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Discover how scholars, researchers, and book collectors experience our premium local delivery ecosystem.
                    </p>
                </motion.div>

                {/* 🎛️ Testimonials Grid (Framer Motion Container) */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }} // স্ক্রিনে আসার সাথে সাথে এনিমেশন রান হবে একবারই
                    className="grid grid-cols-1 gap-8 md:grid-cols-3"
                >
                    {reviews.map((review) => {
                        const { id, name, role, avatar, comment, rating } = review;
                        
                        return (
                            <motion.div 
                                key={id}
                                variants={cardVariants}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }} // হোভার করলে হালকা উপরে উঠবে
                                className="group relative flex flex-col bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-slate-200/80 transition-shadow duration-300"
                            >
                                {/* Quote Icon Decorative */}
                                <div className="absolute top-6 right-8 text-slate-100 group-hover:text-[#C5A059]/10 text-4xl transition-colors duration-300">
                                    <FaQuoteLeft />
                                </div>

                                {/* ⭐ Star Ratings */}
                                <div className="flex items-center gap-1 text-amber-400 text-xs mb-5">
                                    {[...Array(rating)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                {/* Comment Body */}
                                <blockquote className="flex-1 text-sm leading-relaxed text-slate-600 font-medium italic">
                                    "{comment}"
                                </blockquote>

                                {/* Divider Line */}
                                <div className="w-full h-px bg-slate-100 my-6" />

                                {/* User Bio Info */}
                                <div className="flex items-center gap-4">
                                    <div className="relative w-11 h-11 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                                        <img 
                                            src={avatar} 
                                            alt={name} 
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-sm font-black text-[#1A2332] tracking-tight group-hover:text-blue-600 transition-colors">
                                            {name}
                                        </h4>
                                        <p className="text-[11px] text-slate-400 font-semibold tracking-wide uppercase mt-0.5">
                                            {role}
                                        </p>
                                    </div>
                                </div>

                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}