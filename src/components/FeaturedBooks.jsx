import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
import { getBooks } from '@/lib/api/books';
import FeaturedBooksSlider from './Books/Featuredbooksslider';

export default async function FeaturedBooks() {
    let books = [];
    let error = null;

    try {
        const booksData = await getBooks();
        if (Array.isArray(booksData)) {
            books = booksData
                .filter(book => book.status === "Published")
                .slice(0, 6); // স্লাইডারের সৌন্দর্য বাড়াতে ৩টির চেয়ে বেশি বই দেখাতে পারেন
        }
    } catch (err) {
        error = "বইগুলো লোড করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।";
    }

    return (
        <section className="relative w-full overflow-hidden bg-slate-50/50 dark:bg-[#080d16] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
            {/* Subtle background texture */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 20%, #D4AF37 0%, transparent 40%)",
                }}
            />

            <div className="relative mx-auto max-w-6xl">
                {/* Section header */}
                <div className="flex items-end justify-between mb-8 sm:mb-12">
                    <div>
                        <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-[.22em] text-[#D4AF37] mb-1 sm:mb-2">
                            Explore Our Catalog
                        </span>
                        <h2
                            className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A] dark:text-slate-50 sm:text-4xl"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                            Featured Books
                        </h2>
                        <div className="mt-1.5 h-0.5 w-12 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/20 rounded-full" />
                        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                            Explore the latest additions to our library.
                        </p>
                    </div>

                    <Link
                        href="/books"
                        className="group hidden sm:flex items-center gap-2 text-[11px] font-black uppercase tracking-[.14em]
                            text-slate-500 dark:text-slate-400
                            hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors duration-200"
                    >
                        See All
                        <FaArrowRight className="text-sm group-hover:translate-x-1.5 transition-transform duration-200" />
                    </Link>
                </div>

                {/* Error & Empty States */}
                {error && (
                    <div className="text-center py-10 rounded-2xl border border-dashed border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 px-4">
                        <p className="text-xs sm:text-sm font-bold text-rose-500">{error}</p>
                    </div>
                )}

                {!error && books.length === 0 && (
                    <div className="text-center py-12 rounded-2xl border border-dashed border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02]">
                        <p className="text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-500">
                            No featured books are currently available.                        </p>
                    </div>
                )}

                {/* Infinite Slider */}
                {!error && books.length > 0 && (
                    <FeaturedBooksSlider books={books} />
                )}

                {/* Mobile "See All" */}
                <div className="mt-8 text-center sm:hidden">
                    <Link
                        href="/books"
                        className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[.14em] text-[#D4AF37]"
                    >
                        See All Books <FaArrowRight className="text-xs" />
                    </Link>
                </div>
            </div>
        </section>
    );
}