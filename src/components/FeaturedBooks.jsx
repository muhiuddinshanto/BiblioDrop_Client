import React from 'react';
import Link from 'next/link';
import { FaArrowRight, FaStar } from 'react-icons/fa6';
import { getBooks } from '@/lib/api/books';
import BookCard from './Books/BookCard';

export default async function FeaturedBooks() {
    let books = [];
    let error = null;

    try {
        // ১. API বা ডিরেক্ট ফাংশন থেকে ডাটা ফেচ করা হচ্ছে
        const rawData = await getBooks();
        
        // ২. ব্যাকএন্ড রেসপন্স স্ট্রাকচার হ্যান্ডলিং
        // টার্মিনাল লগ অনুযায়ী rawData নিজেই একটি ডিরেক্ট অ্যারে (Array of 28 books)
        let allBooks = [];
        if (Array.isArray(rawData)) {
            allBooks = rawData;
        } else if (rawData?.success) {
            allBooks = rawData.data || rawData.result || [];
        }

        // ৩. ডাইনামিক ফিল্টারিং ও স্লাইসিং লজিক (Latest 6 Published Books)
        // ক) শুধু 'Published' স্ট্যাটাসের বইগুলো ফিল্টার করা হচ্ছে
        // খ) ডাইনামিক স্লাইস (.slice(0, 6)) ব্যবহার করে সর্বশেষ ৬টি বই নেওয়া হচ্ছে
        books = allBooks
            .filter(book => book.status === "Published")
            .slice(0, 6);

    } catch (err) {
        console.error("Error fetching featured books:", err);
        error = "বইগুলো লোড করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।";
    }

    return (
        <section className="w-full bg-slate-50/50 py-16 px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                
                {/* সেকশন হেডার */}
                <div className="flex items-end justify-between border-b border-slate-100 pb-5 mb-10">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Explore Our Catalog</span>
                        <h2 className="mt-1 text-2xl font-black text-[#0F172A] tracking-tight sm:text-3xl">Featured Books</h2>
                        <p className="mt-1 text-sm text-slate-500">ডাটাবেস থেকে বাছাইকৃত একদম নতুন প্রকাশিত বইসমূহ</p>
                    </div>
                    <Link 
                        href="/books" 
                        className="group flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F172A] hover:text-slate-600 transition"
                    >
                        See All Books <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* এরর স্টেট */}
                {error && (
                    <div className="text-center py-10 bg-rose-50 rounded-2xl border border-dashed border-rose-200">
                        <p className="text-sm font-bold text-rose-600">{error}</p>
                    </div>
                )}

                {/* এম্পটি বা ফাঁকা স্টেট */}
                {!error && books.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm">
                        <p className="text-sm font-bold text-slate-500">বর্তমানে কোনো ফিচার্ড বই পাওয়া যায়নি।</p>
                    </div>
                )}

                {/* 🛒 গ্রিড লেআউট (বুক কার্ডস) */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {books.map((book) => {
                       
                        
                        return (
                            <BookCard
                                key={book._id}
                                book={book}
                            />
                        );
                    })}
                </div>

            </div>
        </section>
    );
}