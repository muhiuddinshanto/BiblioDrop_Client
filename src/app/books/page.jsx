

import BookGridClient from "@/components/Books/BookGridClient";
import { getBooks } from "@/lib/api/books";



export default async function BooksPage() {


  const booksData = await getBooks();
 

  return (
    <main className="w-full bg-white">
      {/* ২. ক্লায়েন্ট কম্পোনেন্টে রিয়েল ডাটা প্রপ্স হিসেবে পাস করে দিচ্ছি */}
      <BookGridClient initialBooks={booksData || []} />
    </main>
  );
}