"use client";

import { Pagination } from "@heroui/react";
import BookCard from "@/components/Books/BookCard";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useTransition } from "react";

export default function BookGridClient({ initialBooks }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // à¦¸à§‡à¦« à¦¡à§‡à¦Ÿà¦¾ à¦ªà¦¾à¦°à§à¦¸à¦¿à¦‚ (à¦…à¦¬à¦œà§‡à¦•à§à¦Ÿ à¦¬à¦¾ à¦…à§à¦¯à¦¾à¦°à§‡ à¦¯à¦¾à¦‡ à¦†à¦¸à§à¦•)
    const initialBooksArray = Array.isArray(initialBooks) ? initialBooks : (initialBooks?.books || []);
    const backendTotalItems = Array.isArray(initialBooks) ? initialBooks.length : (initialBooks?.total || 0);

    const books = initialBooksArray;
    const [isPending, startTransition] = useTransition();
    const loading = isPending;

    // URL à¦¥à§‡à¦•à§‡ à¦¡à¦¿à¦°à§‡à¦•à§à¦Ÿ à¦•à¦¾à¦°à§‡à¦¨à§à¦Ÿ à¦ªà§‡à¦œ à¦°à¦¿à¦¡ à¦•à¦°à¦¾
    const currentPage = Number(searchParams.get("page")) || 1;
    const currentSearch = searchParams.get("search");

    const [selectedCategories, setSelectedCategories] = useState(
        searchParams.get("category") ? searchParams.get("category").split(",") : []
    );

    const itemsPerPage = 9;
    const totalItems = backendTotalItems;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    // 'Showing X-Y of Z' à¦•à§à¦¯à¦¾à¦²à¦•à§à¦²à§‡à¦¶à¦¨
    const currentStartItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const currentEndItem = Math.min(currentPage * itemsPerPage, totalItems);

    // ðŸ”¢ à¦•à¦¾à¦¸à§à¦Ÿà¦® à¦ªà§‡à¦œ à¦¨à¦¾à¦®à§à¦¬à¦¾à¦° à¦à¦¬à¦‚ à¦‡à¦²à¦¿à¦ªà¦¸à¦¿à¦¸ (...) à¦œà§‡à¦¨à¦¾à¦°à§‡à¦Ÿ à¦•à¦°à¦¾à¦° à¦²à¦œà¦¿à¦•
    const getPageNumbers = () => {
        const pages = [];
        pages.push(1);

        if (currentPage > 3) {
            pages.push("ellipsis");
        }

        const startLoop = Math.max(2, currentPage - 1);
        const endLoop = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startLoop; i <= endLoop; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push("ellipsis");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return [...new Set(pages)];
    };

    const [maxPrice, setMaxPrice] = useState(
        Number(searchParams.get("maxPrice")) || 100
    );
    const [sortBy, setSortBy] = useState(
        searchParams.get("sortBy") || "Popularity"
    );

    const isFirstRender = useRef(true);

    // à¦«à¦¿à¦²à§à¦Ÿà¦¾à¦° à¦¬à¦¾ à¦¸à¦°à§à¦Ÿ à¦šà§‡à¦žà§à¦œ à¦¹à¦²à§‡ URL à¦†à¦ªà¦¡à§‡à¦Ÿ à¦•à¦°à¦¾à¦° à¦²à¦œà¦¿à¦•
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const params = new URLSearchParams();

        if (currentSearch) params.append("search", currentSearch);
        if (selectedCategories.length > 0) params.append("category", selectedCategories.join(","));

        params.append("maxPrice", maxPrice.toString());
        params.append("sortBy", sortBy);

        params.append("page", "1");
        params.append("perPage", itemsPerPage.toString());

        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false });
            router.refresh();
        }); 
    }, [currentSearch, itemsPerPage, maxPrice, router, selectedCategories, sortBy]);

    // à¦¶à§à¦§à§à¦®à¦¾à¦¤à§à¦° à¦ªà§‡à¦œ à¦šà§‡à¦žà§à¦œ à¦¹à§à¦¯à¦¾à¦¨à§à¦¡à§‡à¦² à¦•à¦°à¦¾à¦° à¦œà¦¨à§à¦¯ à¦¡à§‡à¦¡à¦¿à¦•à§‡à¦Ÿà§‡à¦¡ à¦«à¦¾à¦‚à¦¶à¦¨
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", newPage.toString());
            params.set("perPage", itemsPerPage.toString());

            startTransition(() => {
                router.push(`?${params.toString()}`, { scroll: false });
                router.refresh();
            }); 
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setMaxPrice(100);
        setSortBy("Popularity");
        const currentSearch = searchParams.get("search");
        startTransition(() => {
            if (currentSearch) {
                router.push(`?search=${encodeURIComponent(currentSearch)}`, { scroll: false });
            } else {
                router.push("?", { scroll: false });
            }
            router.refresh();
        });
    };

    return (
        <section className="w-full bg-white dark:bg-slate-900 px-6 py-16 dark:bg-slate-950 lg:px-8">
            <div className="mx-auto max-w-7xl grid grid-cols-1 gap-10 lg:grid-cols-12">

                {/* === à¦¸à¦¾à¦‡à¦¡à¦¬à¦¾à¦° à¦«à¦¿à¦²à§à¦Ÿà¦¾à¦° === */}
                <div className="hidden lg:col-span-3 lg:flex flex-col gap-8 border-r border-gray-100 pr-8 dark:border-slate-800">
                    <div>
                        <h3 className="text-lg font-black text-[#0F172A] dark:text-slate-100 tracking-tight">Filters</h3>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</span>
                        {["Philosophy", "Architecture", "History", "Science", "Cartography", "Technology", "Non-Fiction"].map((cat) => (
                            <label key={cat} className="flex items-center gap-3 text-sm font-bold text-slate-700 cursor-pointer dark:text-slate-300">
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
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300">Price Range (Up to ${maxPrice})</span>
                        <input
                            type="range"
                            min="15"
                            max="100"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full accent-[#0F172A] dark:accent-[#D4AF37] cursor-pointer"
                        />
                        <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                            <span>$15</span>
                            <span>$100+</span>
                        </div>
                    </div>

                    <button
                        onClick={handleClearFilters}
                        className="mt-4 w-full rounded-xl border border-dashed border-red-200 bg-transparent py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors dark:border-red-900/60 dark:hover:bg-red-950/30"
                    >
                        Clear All Filters
                    </button>
                </div>

                {/* === à¦®à§‡à¦‡à¦¨ à¦¬à§à¦• à¦—à§à¦°à¦¿à¦¡ === */}
                <div className="lg:col-span-9">
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-6 dark:border-slate-800">
                        <div>
                            <h2 className="text-2xl font-black text-[#0F172A] dark:text-slate-100 tracking-tight sm:text-3xl">Scholarly Collections</h2>
                            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                                {loading ? "Updating library..." : `Found ${totalItems} volumes curated for you.`}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-xl border border-gray-200 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold text-[#0F172A] outline-none shadow-sm focus:border-[#D4AF37] cursor-pointer dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                                <option>Popularity</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* ðŸ”„ à¦²à§‹à¦¡à¦¿à¦‚ à¦…à¦¥à¦¬à¦¾ à¦•à¦¨à¦Ÿà§‡à¦¨à§à¦Ÿ à¦¥à¦¾à¦•à¦¾ à¦…à¦¬à¦¸à§à¦¥à¦¾à§Ÿ à¦ªà§‡à¦œà§‡à¦° à¦²à§‡à¦†à¦‰à¦Ÿ à¦¸à§à¦¥à¦¿à¦° à¦°à¦¾à¦–à¦¾à¦° à¦®à§‡à¦•à¦¾à¦¨à¦¿à¦œà¦® */}
                    {(loading || books.length > 0) ? (
                        <>
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                                {loading ? (
                                    // à§§. à¦²à§‹à¦¡ à¦¹à¦“à§Ÿà¦¾à¦° à¦¸à¦®à§Ÿ à¦¹à§à¦Ÿ à¦•à¦°à§‡ à¦—à§à¦°à¦¿à¦¡ à¦¡à¦¿à¦²à¦¿à¦Ÿ à¦¨à¦¾ à¦¹à§Ÿà§‡ à§¯à¦Ÿà¦¿ à¦¸à§à¦¨à§à¦¦à¦° à¦…à§à¦¯à¦¾à¦¨à¦¿à¦®à§‡à¦Ÿà§‡à¦¡ à¦•à¦™à§à¦•à¦¾à¦² (Skeleton) à¦¦à§‡à¦–à¦¾à¦¬à§‡
                                    Array.from({ length: itemsPerPage }).map((_, idx) => (
                                        <div 
                                            key={idx} 
                                            className="w-full h-[380px] rounded-2xl bg-slate-100/80 animate-pulse border border-slate-200/50 flex flex-col justify-between p-5 dark:border-slate-800 dark:bg-slate-900/80"
                                        >
                                            <div className="w-full h-44 bg-slate-200 rounded-xl dark:bg-slate-800" />
                                            <div className="h-4 bg-slate-200 rounded w-3/4 mt-4 dark:bg-slate-800" />
                                            <div className="h-3 bg-slate-200 rounded w-1/2 mt-2 dark:bg-slate-800" />
                                            <div className="h-6 bg-slate-200 rounded w-1/4 mt-4 dark:bg-slate-800" />
                                        </div>
                                    ))
                                ) : (
                                    // à§¨. à¦¡à¦¾à¦Ÿà¦¾ à¦¸à¦«à¦²à¦­à¦¾à¦¬à§‡ à¦šà¦²à§‡ à¦†à¦¸à¦²à§‡ à¦†à¦¸à¦² à¦•à¦¾à¦°à§à¦¡ à¦°à§‡à¦¨à§à¦¡à¦¾à¦° à¦¹à¦¬à§‡
                                    books.map((book) => {
                                        const bookId = book._id?.$oid || book._id;
                                        return (
                                            <Link href={`/books/${bookId}`} key={bookId} className="block">
                                                <BookCard book={book} />
                                            </Link>
                                        );
                                    })
                                )}
                            </div>

                            {/* === HeroUI à¦¸à§à¦Ÿà§à¦°à¦¾à¦•à¦šà¦¾à¦°à§à¦¡ à¦ªà§‡à¦œà¦¿à¦¨à§‡à¦¶à¦¨ (à¦¯à¦¾ à¦²à§‹à¦¡à¦¿à¦‚ à¦…à¦¬à¦¸à§à¦¥à¦¾à§Ÿà¦“ à¦¨à¦¿à¦šà§‡ à¦«à¦¿à¦•à§à¦¸à¦¡ à¦¥à¦¾à¦•à¦¬à§‡) === */}
                            <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row border-t border-gray-100 pt-6 dark:border-slate-800">
                                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                    Showing <b className="text-slate-800 dark:text-slate-200">{currentStartItem}</b> to <b className="text-slate-800 dark:text-slate-200">{currentEndItem}</b> of <b className="text-slate-800 dark:text-slate-200">{totalItems}</b> results
                                </span>
                                
                                <Pagination className="select-none select-none-pagination">
                                    <Pagination.Content>
                                        {/* Previous Button */}
                                        <Pagination.Item>
                                            <button
                                                disabled={currentPage === 1 || loading}
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                    currentPage === 1 || loading
                                                    ? "text-slate-300 cursor-not-allowed" 
                                                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                                                }`}
                                            >
                                                &larr; Previous
                                            </button>
                                        </Pagination.Item>

                                        {/* Dynamic Page Numbers & Ellipsis */}
                                        {getPageNumbers().map((p, idx) => (
                                            <Pagination.Item key={idx}>
                                                {p === "ellipsis" ? (
                                                    <span className="px-2 text-slate-400">...</span>
                                                ) : (
                                                    <button
                                                        disabled={loading}
                                                        onClick={() => handlePageChange(p)}
                                                        className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${
                                                            p === currentPage
                                                            ? "bg-[#0F172A] text-white"
                                                            : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 disabled:opacity-50"
                                                        }`}
                                                    >
                                                        {p}
                                                    </button>
                                                )}
                                            </Pagination.Item>
                                        ))}

                                        {/* Next Button */}
                                        <Pagination.Item>
                                            <button
                                                disabled={currentPage === totalPages || loading}
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                    currentPage === totalPages || loading
                                                    ? "text-slate-300 cursor-not-allowed" 
                                                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                                                }`}
                                            >
                                                Next &rarr;
                                            </button>
                                        </Pagination.Item>
                                    </Pagination.Content>
                                </Pagination>
                            </div>
                        </>
                    ) : (
                        // à§©. à¦²à§‹à¦¡à¦¿à¦‚ à¦¶à§‡à¦· à¦à¦¬à¦‚ à¦•à§‹à¦¨à§‹ à¦¬à¦‡ à¦«à¦¿à¦²à§à¦Ÿà¦¾à¦°à§‡ à¦®à§à¦¯à¦¾à¦š à¦•à¦°à§‡à¦¨à¦¿â€”à¦¶à§à¦§à§ à¦¤à¦–à¦¨à¦‡ à¦à¦‡ à¦«à¦¾à¦à¦•à¦¾ à¦¸à§à¦Ÿà§‡à¦Ÿà¦Ÿà¦¿ à¦†à¦¸à¦¬à§‡
                        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                            <p className="text-lg font-bold text-slate-700 dark:text-slate-300">No books available for this filter.</p>
                            <button onClick={handleClearFilters} className="mt-3 text-sm text-[#D4AF37] font-extrabold underline">Reset Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}




