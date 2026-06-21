import BookDetailsContent from '@/components/Books/BookDetailsContent';
import { getBooksById } from '@/lib/api/books';
import React from 'react';

const BookDetailPage = async ({ params }) => {
    const { id } = await params;
    const rawBook = await getBooksById(id);

    let book = null;
    if (rawBook) {
        const activeBook = rawBook.data || rawBook.result || rawBook;
        book = {
            ...activeBook,
            status: typeof activeBook.status === "object"
                ? (activeBook.status?.status ?? "Available")
                : (activeBook.status ?? "Available")
        };
    }

    // ✅ Reviews আলাদাভাবে fetch করো
    let reviewsData = [];
    try {
        const reviewRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/${id}`,
            { cache: "no-store" }
        );
        const reviewJson = await reviewRes.json();
        reviewsData = reviewJson?.data || [];
    } catch {
        reviewsData = [];
    }

    return (
        <main className="w-full bg-white min-h-screen">
            <BookDetailsContent 
                book={book} 
                reviewsData={reviewsData}
            />
        </main>
    );
};

export default BookDetailPage;