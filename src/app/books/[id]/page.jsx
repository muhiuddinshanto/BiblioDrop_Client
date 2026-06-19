
import BookDetailsContent from '@/components/Books/BookDetailsContent';
import { getBooksById } from '@/lib/api/books';
import React from 'react';



const BookDetailPage = async ({ params }) => {
   
    const { id } = await params;
    
    
    const book = await getBooksById(id);

    return (
        <main className="w-full bg-white min-h-screen">
            
            <BookDetailsContent book={book} />
        </main>
    );
};

export default BookDetailPage;