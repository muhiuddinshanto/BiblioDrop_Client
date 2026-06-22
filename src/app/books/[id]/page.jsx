import BookDetailsContent from '@/components/Books/BookDetailsContent';
import { getBooksById } from '@/lib/api/books';
import React from 'react';
import { reviewsByUserId } from '@/lib/api/reviews';

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

    //  Reviews আলাদাভাবে fetch 
    let reviewsData = [];
    try {
        const reviewJson = await reviewsByUserId(rawBook._id);
        reviewsData = reviewJson || [];
    } catch {
        reviewsData = [];
    }

    return (
        <main className="w-full bg-white dark:bg-slate-900 min-h-screen dark:bg-slate-950">
            <BookDetailsContent 
                book={book} 
                reviewsData={reviewsData}
            />
        </main>
    );
};

export default BookDetailPage;
