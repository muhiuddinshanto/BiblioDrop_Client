"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import Image from 'next/image';

const cardVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }
    }),
    exit: { opacity: 0, x: -40, transition: { duration: 0.3 } }
};

const reviews = [
    {
        id: 1,
        name: "Alexander Vance",
        role: "Research Scholar",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80",
        comment: "BiblioDrop has completely redefined my research workflow. Having rare historical manuscripts delivered by expert local curators is an absolute luxury.",
        rating: 5,
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Literary Critic & Author",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80",
        comment: "The precision of their delivery network combined with the immaculate physical quality of curated copies is flawless. Like having a personal university archive at your fingertips.",
        rating: 5,
    },
    {
        id: 3,
        name: "Marcus Thorne",
        role: "Collector & Historian",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=80",
        comment: "The curators here treat literature with true scholarly care. Seamless return pickups make continuous reading completely effortless.",
        rating: 5,
    },
    {
        id: 4,
        name: "Elena Vasquez",
        role: "University Professor",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=80",
        comment: "Assigning rare texts to students used to be a logistical nightmare. BiblioDrop has made academic access effortless — every copy arrives pristine and on time.",
        rating: 5,
    },
    {
        id: 5,
        name: "James Holloway",
        role: "Independent Researcher",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80",
        comment: "Nothing compares to the curation level here. Each recommendation feels personally tailored. The return process is genuinely the smoothest I've used.",
        rating: 5,
    },
    {
        id: 6,
        name: "Priya Nair",
        role: "Novelist & Translator",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80",
        comment: "As a translator I rely on multiple editions of a single text. BiblioDrop is the only service that reliably sources obscure editions. Their knowledge is genuinely impressive.",
        rating: 5,
    },
];

const CARDS_PER_PAGE = 3;

export default function Testimonials() {
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(1);
    const touchStartX = useRef(0);

    const totalPages = Math.ceil(reviews.length / CARDS_PER_PAGE);
    const currentGroup = reviews.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

    const goTo = (nextPage) => {
        setDirection(nextPage > page ? 1 : -1);
        setPage(nextPage);
    };

    return (
        <section className="w-full bg-slate-50/50 dark:bg-slate-950 py-24 px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-xl mx-auto mb-16"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C5A059] flex items-center justify-center gap-1.5 mb-3">
                        <FaHeart className="animate-pulse text-[9px]" /> Reader Feedback
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#1A2332] dark:text-slate-50 tracking-tight">
                        Voices of Our Community
                    </h2>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Discover how scholars, researchers, and book collectors experience our premium local delivery ecosystem.
                    </p>
                </motion.div>

                {/* Slider */}
                <div
                    className="relative overflow-hidden"
                    onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                    onTouchEnd={(e) => {
                        const dx = e.changedTouches[0].clientX - touchStartX.current;
                        if (Math.abs(dx) > 40) {
                            if (dx < 0 && page < totalPages - 1) goTo(page + 1);
                            if (dx > 0 && page > 0) goTo(page - 1);
                        }
                    }}
                >
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            initial={{ opacity: 0, x: direction * 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction * -60 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="grid grid-cols-1 gap-4 md:grid-cols-3"
                        >
                            {currentGroup.map((review, i) => (
                                <motion.div
                                    key={review.id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70 dark:hover:shadow-slate-900/60 hover:border-slate-200 dark:hover:border-slate-700"
                                >
                                    {/* Golden top bar on hover */}
                                    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                                    {/* Decorative quote */}
                                    <div className="absolute top-4 right-5 text-4xl leading-none text-slate-100 dark:text-slate-800 group-hover:text-[#C5A059]/10 transition-colors duration-300 font-serif select-none">
                                        &quot;
                                    </div>

                                    {/* Stars */}
                                    <div className="flex gap-0.5 text-[#C5A059] text-[10px] mb-4">
                                        {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="flex-1 text-[12.5px] leading-relaxed text-slate-600 dark:text-slate-300 italic mb-5">
                                        &quot;{review.comment}&quot;
                                    </blockquote>

                                    <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-4" />

                                    {/* Bio */}
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700 flex-shrink-0">
                                            <Image
                                                src={review.avatar}
                                                alt={review.name}
                                                fill
                                                className="object-cover"
                                                sizes="40px"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-[12.5px] font-black text-[#1A2332] dark:text-slate-100 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {review.name}
                                            </h4>
                                            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                                                {review.role}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={() => goTo(page - 1)}
                        disabled={page === 0}
                        className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:border-[#C5A059] hover:text-[#C5A059] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Previous"
                    >
                        <FaChevronLeft className="text-xs" />
                    </button>

                    <div className="flex gap-1.5 items-center">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`rounded-full transition-all duration-200 ${
                                    i === page
                                        ? 'w-5 h-2 bg-[#C5A059]'
                                        : 'w-2 h-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                                }`}
                                aria-label={`Go to page ${i + 1}`}
                            />
                        ))}
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono min-w-[36px] text-center">
                        {page + 1} / {totalPages}
                    </span>

                    <button
                        onClick={() => goTo(page + 1)}
                        disabled={page === totalPages - 1}
                        className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:border-[#C5A059] hover:text-[#C5A059] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Next"
                    >
                        <FaChevronRight className="text-xs" />
                    </button>
                </div>

            </div>
        </section>
    );
}