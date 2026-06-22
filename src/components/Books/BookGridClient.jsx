"use client";

import BookCard from "@/components/Books/BookCard";
import { getBooks } from "@/lib/api/books";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function BookGridClient({ initialBooks }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // ১. শুরুতে URL-এ কোনো ফিল্টার থাকলে সেটা স্টেটে বসবে, না থাকলে ডিফল্ট ভ্যালু পাবে
    const [books, setBooks] = useState(initialBooks);
    const [loading, setLoading] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState(
        searchParams.get("category") ? searchParams.get("category").split(",") : []
    );
    const [maxPrice, setMaxPrice] = useState(
        Number(searchParams.get("maxPrice")) || 100
    );
    const [sortBy, setSortBy] = useState(
        searchParams.get("sortBy") || "Popularity"
    );

    // প্রথমবার পেজ লোডের অতিরিক্ত রান স্কিপ করার জন্য ট্র্যাকার
    const isFirstRender = useRef(true);

    // ২. সার্ভার থেকে আসা initialBooks যখনই চেঞ্জ হবে (URL চেঞ্জের কারণে), তখনই স্টেট আপডেট হবে
    useEffect(() => {
        setBooks(initialBooks);
        setLoading(false); // ডেটা চলে আসলে লোডিং ফলস হবে
    }, [initialBooks]);

    // ৩. ফিল্টার বা সর্ট স্টেট চেঞ্জ হলে ব্রাউজারের URL আপডেট করার লজিক
    useEffect(() => {
        // প্রথমবার পেজ রেন্ডারে URL পুশ করা স্কিপ করবে
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const updateURLAndFetch = async () => {
            setLoading(true);
            const params = new URLSearchParams();
            
            if (selectedCategories.length > 0) {
                params.append("category", selectedCategories.join(","));
            }
            params.append("maxPrice", maxPrice.toString());
            params.append("sortBy", sortBy);

            // ব্রাউজারের URL পরিবর্তন করা হচ্ছে (যেমন: /books?category=Philosophy&maxPrice=100)
            // scroll: false দেওয়ার কারণে পেজ লাফ দিয়ে একদম উপরে উঠে যাবে না
            router.push(`?${params.toString()}`, { scroll: false });
        };

        // ইউজারের ক্লিক করার পর সামান্য ডিলে বা সরাসরি কল
        updateURLAndFetch();
        
    }, [selectedCategories, maxPrice, sortBy, router]); 

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setMaxPrice(100);
        setSortBy("Popularity");
        router.push("?", { scroll: false }); // URL রিমোভ করে একদম ক্লিন করে দেবে
    };

    return (
        <section className="w-full bg-white px-6 py-16 lg:px-8">
            <div className="mx-auto max-w-7xl grid grid-cols-1 gap-10 lg:grid-cols-12">

                {/* === সাইডবার ফিল্টার === */}
                <div className="hidden lg:col-span-3 lg:flex flex-col gap-8 border-r border-gray-100 pr-8">
                    <div>
                        <h3 className="text-lg font-black text-[#0F172A] tracking-tight">Filters</h3>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</span>
                        {["Philosophy", "Architecture", "History", "Science", "Cartography", "Technology", "Non-Fiction"].map((cat) => (
                            <label key={cat} className="flex items-center gap-3 text-sm font-bold text-slate-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleCategoryChange(cat)}
                                    className="h-4 w-4 rounded border-gray-300 text-[#0F172A] focus:ring-[#D4AF37]"
                                />
                                {cat}
                            </label>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Price Range (Up to ${maxPrice})</span>
                        <input
                            type="range"
                            min="15"
                            max="100"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full accent-[#0F172A] cursor-pointer"
                        />
                        <div className="flex justify-between text-xs font-bold text-slate-500">
                            <span>$15</span>
                            <span>$100+</span>
                        </div>
                    </div>

                    <button
                        onClick={handleClearFilters}
                        className="mt-4 w-full rounded-xl border border-[#D4AF37]/40 bg-transparent py-3 text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-colors"
                    >
                        Clear All Filters
                    </button>
                </div>

                {/* === মেইন বুক গ্রিড === */}
                <div className="lg:col-span-9">
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-6">
                        <div>
                            <h2 className="text-2xl font-black text-[#0F172A] tracking-tight sm:text-3xl">Scholarly Collections</h2>
                            <p className="mt-1 text-sm font-medium text-slate-500">
                                {loading ? "Updating library..." : `Found ${books.length} volumes curated for you.`}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-[#0F172A] outline-none shadow-sm focus:border-[#D4AF37] cursor-pointer"
                            >
                                <option>Popularity</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* লোডিং বা ব্ল্যাঙ্ক স্টেট হ্যান্ডলিং */}
                    {loading ? (
                        <div className="text-center py-20">
                            <p className="text-lg font-bold text-slate-400 animate-pulse">Loading items from server...</p>
                        </div>
                    ) : books.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                            {books.map((book) => {
                                const bookId = book._id?.$oid || book._id;
                                return (
                                    <Link href={`/books/${bookId}`} key={bookId} className="block">
                                        <BookCard book={book} />
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                            <p className="text-lg font-bold text-slate-700">No books available for this filter.</p>
                            <button onClick={handleClearFilters} className="mt-3 text-sm text-[#D4AF37] font-extrabold underline">Reset Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}