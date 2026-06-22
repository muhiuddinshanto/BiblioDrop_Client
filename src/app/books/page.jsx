import BookGridClient from "@/components/Books/BookGridClient";
import { getBooks } from "@/lib/api/books";

// Next.js-এ searchParams এখন একটি Promise, তাই এর আগে async রাখতে হবে
export default async function BooksPage({ searchParams }) {
  
  // ১. প্রথমে searchParams প্রমিজটিকে await করে প্লেইন অবজেক্ট বানিয়ে নিতে হবে
  const resolvedSearchParams = await searchParams;
  
  // ২. এবার URLSearchParams-এ পাস করলে আর কোনো এরর আসবে না
  const params = new URLSearchParams(resolvedSearchParams);
  if (!params.has("page")) params.set("page", "1");
  if (!params.has("perPage")) params.set("perPage", "9");
  const booksData = await getBooks(params.toString());
  console.log("booksData:", booksData);

  return (
    <main className="w-full bg-white dark:bg-slate-950">
      <BookGridClient initialBooks={booksData || []}  />
    </main>
  );
}
