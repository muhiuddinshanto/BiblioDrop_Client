"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BookCardHomePage from "./BookCardHomePage";

export default function FeaturedBooksSlider({ books }) {
    // স্ক্রিন সাইজ অনুযায়ী উইডথ ডাইনামিক করার স্টেট
    const [cardWidth, setCardWidth] = useState(340);
    const cardGap = 20; // মোবাইলের জন্য একটু কম গ্যাপ (২০ পিক্সেল)

    // স্ক্রিন সাইজ ট্র্যাক করে ডাইনামিক উইডথ ক্যালকুলেট করা
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                // মোবাইলে দুই পাশের প্যাডিং বাদ দিয়ে স্ক্রিনের সমপরিমাণ উইডথ পাবে
                setCardWidth(window.innerWidth - 48); 
            } else {
                setCardWidth(340); // ডেস্কটপে ফিক্সড ৩৪০ পিক্সেল
            }
        };

        handleResize(); // ইনিশিয়াল রান
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const step = cardWidth + cardGap;
    const autoPlayInterval = 3200;

    const items = [...books, ...books, ...books];
    const loopStart = books.length;
    const loopEnd = books.length * 2;

    const [current, setCurrent] = useState(loopStart);
    const [dragging, setDragging] = useState(false);
    const [transitioning, setTransitioning] = useState(true);
    const autoPlayRef = useRef(null);
    const containerRef = useRef(null);

    const translateX = -current * step;

    const jumpTo = useCallback((index) => {
        setTransitioning(false);
        setCurrent(index);
    }, []);

    useEffect(() => {
        if (!transitioning) {
            const raf = requestAnimationFrame(() => setTransitioning(true));
            return () => cancelAnimationFrame(raf);
        }
    }, [transitioning]);

    const startAutoPlay = useCallback(() => {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(() => {
            setCurrent((prev) => prev + 1);
        }, autoPlayInterval);
    }, [step]);

    useEffect(() => {
        startAutoPlay();
        return () => clearInterval(autoPlayRef.current);
    }, [startAutoPlay]);

    useEffect(() => {
        if (!transitioning) return;
        if (current >= loopEnd) {
            const timeout = setTimeout(() => jumpTo(loopStart), 400);
            return () => clearTimeout(timeout);
        }
        if (current < loopStart) {
            const timeout = setTimeout(() => jumpTo(loopEnd - 1), 400);
            return () => clearTimeout(timeout);
        }
    }, [current, loopStart, loopEnd, transitioning, jumpTo]);

    const goNext = () => {
        clearInterval(autoPlayRef.current);
        setCurrent((p) => p + 1);
        startAutoPlay();
    };

    const goPrev = () => {
        clearInterval(autoPlayRef.current);
        setCurrent((p) => p - 1);
        startAutoPlay();
    };

    // ── Touch / Drag Handle ──
    const dragStartX = useRef(0);
    const dragDelta = useRef(0);

    const onPointerDown = (e) => {
        clearInterval(autoPlayRef.current);
        setDragging(true);
        dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        dragDelta.current = 0;
    };

    const onPointerMove = (e) => {
        if (!dragging) return;
        const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? dragStartX.current;
        dragDelta.current = clientX - dragStartX.current;
    };

    const onPointerUp = () => {
        if (!dragging) return;
        setDragging(false);
        const threshold = step * 0.20; // ২০% ড্রাগ করলেই স্লাইড চেঞ্জ হবে
        if (dragDelta.current < -threshold) setCurrent((p) => p + 1);
        else if (dragDelta.current > threshold) setCurrent((p) => p - 1);
        startAutoPlay();
    };

    const dotIndex = ((current - loopStart) % books.length + books.length) % books.length;

    return (
        <div className="relative w-full">
            {/* Viewport container */}
            <div
                ref={containerRef}
                className="overflow-hidden w-full px-1"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                onTouchStart={(e) => onPointerDown(e.touches[0])}
                onTouchMove={(e) => onPointerMove(e.touches[0])}
                onTouchEnd={onPointerUp}
                style={{ cursor: dragging ? "grabbing" : "grab" }}
            >
                <motion.div
                    className="flex"
                    style={{ gap: cardGap }}
                    animate={{ x: translateX }}
                    transition={
                        transitioning
                            ? { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
                            : { duration: 0 }
                    }
                >
                    {items.map((book, idx) => {
                        const bookId = book._id?.$oid || book._id || book.id;
                        const isActive = idx === current;

                        return (
                            <motion.div
                                key={`${bookId}-${idx}`}
                                style={{ width: cardWidth, flexShrink: 0 }}
                                animate={{ 
                                    opacity: isActive ? 1 : 0.4, 
                                    scale: isActive ? 1 : 0.95 
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <Link href={`/books/${bookId}`} className="block h-full" draggable={false}>
                                    <BookCardHomePage book={book} />
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* ── Dots Indicators ── */}
            <div className="mt-6 flex items-center justify-center gap-1.5 flex-wrap">
                {books.map((_, i) => (
                    <motion.button
                        key={i}
                        onClick={() => {
                            clearInterval(autoPlayRef.current);
                            setCurrent(loopStart + i);
                            startAutoPlay();
                        }}
                        animate={{
                            width: dotIndex === i ? 20 : 6,
                            opacity: dotIndex === i ? 1 : 0.25,
                            backgroundColor: dotIndex === i ? "#D4AF37" : "#94a3b8",
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="h-1.5 rounded-full"
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* ── Navigation Arrows (Desktop only) ── */}
            <div className="hidden lg:block">
                <NavArrow direction="left" onClick={goPrev} />
                <NavArrow direction="right" onClick={goNext} />
            </div>
        </div>
    );
}

function NavArrow({ direction, onClick }) {
    const isLeft = direction === "left";
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1, backgroundColor: "#D4AF37", color: "#0f172a" }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.18 }}
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center border border-[#D4AF37]/30 bg-transparent text-[#D4AF37] cursor-pointer z-10"
            style={{ [isLeft ? "left" : "right"]: -25 }}
            aria-label={isLeft ? "Previous" : "Next"}
        >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                {isLeft ? (
                    <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                    <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                )}
            </svg>
        </motion.button>
    );
}