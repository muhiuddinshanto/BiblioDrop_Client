"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimate } from 'framer-motion';
import { FaStar, FaHeart, FaQuoteLeft } from 'react-icons/fa6';
import Image from 'next/image';

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

// মসৃণ লুপের জন্য ডাবল সেট ডাটা
const duplicatedReviews = [...reviews, ...reviews];

const CARD_WIDTH = 360;
const CARD_GAP = 24;
const TOTAL_WIDTH = reviews.length * (CARD_WIDTH + CARD_GAP);

export default function Testimonials() {
    const [scope, animate] = useAnimate();
    const [isDragging, setIsDragging] = useState(false);
    const x = useMotionValue(0);
    const animationRef = useRef(null);

    // ১. অবিরত স্লো অটো-স্ক্রোল অ্যানিমেশন ফাংশন
    const startAutoScroll = () => {
        if (isDragging) return;

        // বর্তমান পজিশন থেকে ১টি ফুল সেটের শেষ মাথা পর্যন্ত অ্যানিমেট হবে
        const currentX = x.get();
        // যদি স্ক্রোল করতে করতে বা ড্র্যাগ করতে করতে লুপের বাইরে চলে যায় তবে রিসেট
        const targetX = currentX <= -TOTAL_WIDTH ? 0 : -TOTAL_WIDTH;
        const remainingDistance = Math.abs(targetX - (currentX <= -TOTAL_WIDTH ? 0 : currentX));
        
        // গতি ঠিক করার জন্য (দূরত্ব / স্পিড ফ্যাক্টর)
        const duration = remainingDistance / 30; // ৩০ পিক্সেল প্রতি সেকেন্ড (আপনার পছন্দমতো কমাতে/বাড়াতে পারেন)

        animationRef.current = animate(x, targetX, {
            duration: duration,
            ease: "linear",
            onComplete: () => {
                x.set(0); // লুপ শেষে সাথে সাথে জিরোতে রিসেট (টের পাওয়া যাবে না)
                startAutoScroll();
            }
        });
    };

    // ২. মাউন্ট এবং ড্র্যাগ চেঞ্জের উপর ভিত্তি করে অ্যানিমেশন কন্ট্রোল
    useEffect(() => {
        if (!isDragging) {
            startAutoScroll();
        }
        return () => animationRef.current?.stop();
    }, [isDragging]);

    // ৩. ড্র্যাগ শেষ হলে লুপের পজিশন বাউন্ডারি হ্যান্ডেল করা
    const handleDragEnd = (event, info) => {
        setIsDragging(false);
        let currentX = x.get();

        // যদি ড্র্যাগ করতে করতে ডান বা বামে বাউন্ডারি ক্রস করে, তবে পজিশন রিসেট করুন
        if (currentX > 0) {
            x.set(currentX - TOTAL_WIDTH);
        } else if (currentX < -TOTAL_WIDTH) {
            x.set(currentX + TOTAL_WIDTH);
        }
    };

    return (
        <section className="w-full bg-white dark:bg-[#0D1117] py-20 px-4 overflow-hidden relative select-none transition-colors duration-300">
            
            {/* লাইট ও ডার্ক মোডের জন্য আলাদা অ্যাম্বিয়েন্ট গ্লো */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-[#C5A059]/5 dark:bg-[#C5A059]/5 blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 dark:bg-blue-900/10 blur-[100px]" />
            </div>

            <div className="mx-auto max-w-7xl relative z-10">
                {/* হেডার */}
                <div className="text-center max-w-xl mx-auto mb-14">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#C5A059] mb-3">
                        <FaHeart className="animate-pulse text-[9px]" />
                        Reader Feedback
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        Voices of Our <span className="text-[#C5A059]">Community</span>
                    </h2>
                </div>

                {/* স্লাইডার ট্র্যাক */}
                <div className="relative w-full" ref={scope}>
                    
                    {/* ফেড ওভারলে (লাইট এবং ডার্ক মোড ফ্রেন্ডলি) */}
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white via-white/50 to-transparent dark:from-[#0D1117] dark:via-[#0D1117]/50 dark:to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-white via-white/50 to-transparent dark:from-[#0D1117] dark:via-[#0D1117]/50 dark:to-transparent" />

                    {/* মেইন মার্কি কন্টেইনার */}
                    <div className="overflow-visible cursor-grab active:cursor-grabbing">
                        <motion.div
                            className="flex"
                            style={{ gap: CARD_GAP, x }}
                            drag="x"
                            onDragStart={() => {
                                setIsDragging(true);
                                animationRef.current?.stop(); // ড্র্যাগ শুরু হলে অটো স্ক্রোল পজ করুন
                            }}
                            onDragEnd={handleDragEnd}
                        >
                            {duplicatedReviews.map((review, i) => (
                                <div
                                    key={`${review.id}-${i}`}
                                    style={{ width: CARD_WIDTH, flexShrink: 0 }}
                                    className="group relative flex flex-col bg-slate-50 dark:bg-[#161B27] border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm dark:shadow-xl transition-colors duration-300"
                                >
                                    {/* টপ অ্যাকসেন্ট হোভার লাইন */}
                                    <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <FaQuoteLeft className="text-[#C5A059]/15 text-3xl mb-4 flex-shrink-0" />

                                    <div className="flex gap-0.5 text-[#C5A059] text-[10px] mb-3">
                                        {[...Array(review.rating)].map((_, idx) => <FaStar key={idx} />)}
                                    </div>

                                    <blockquote className="flex-1 text-[13px] leading-[1.7] text-slate-600 dark:text-slate-300 mb-6">
                                        "{review.comment}"
                                    </blockquote>

                                    <div className="w-full h-px bg-slate-200 dark:bg-slate-800/60 mb-4" />

                                    {/* প্রোফাইল বায়ো */}
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 flex-shrink-0 ring-2 ring-[#C5A059]/10">
                                            <Image
                                                src={review.avatar}
                                                alt={review.name}
                                                fill
                                                className="object-cover"
                                                sizes="36px"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-[13px] font-bold text-slate-800 dark:text-white tracking-tight transition-colors">
                                                {review.name}
                                            </h4>
                                            <p className="text-[10px] text-[#C5A059]/80 dark:text-[#C5A059]/70 font-semibold tracking-wider uppercase mt-0.5">
                                                {review.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}