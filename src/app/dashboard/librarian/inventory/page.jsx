import { MdInventory, MdMenuBook, MdAdd } from "react-icons/md";
import InventoryClientContainer from "@/components/Deashboard/librarian/InventoryClientContainer";
import { getUserSession } from "@/lib/core/session";
import { getBooksByUserId } from "@/lib/api/books";
import Link from "next/link";

export default async function ManageInventoryPage() {
  const user = await getUserSession();
  console.log("🚀 Logged In User:", user);

  let fetchedBooks = null;

  if (user?.id) {
    fetchedBooks = await getBooksByUserId(user.id);
  }

  console.log("🚀 Database Response (Raw):", fetchedBooks);

  // ==================== 🛡️ বুলেটপ্রুফ স্যানিটাইজেশন গার্ড ====================
  let sanitizedBooks = [];

  if (fetchedBooks) {
    if (Array.isArray(fetchedBooks)) {
      // ১. ডাটা সরাসরি অ্যারে হলে
      sanitizedBooks = fetchedBooks.map((book) => ({
        ...book,

        // status যদি object হয়ে corrupt থাকে, ভেতর থেকে status বের করো
        status:
          typeof book.status === "object"
            ? (book.status?.status ?? "Pending Approval")
            : (book.status ?? "Pending Approval"),
      }));
    } else if (typeof fetchedBooks === "object") {
      // ২. ডাটা যদি কোনো object wrapper এর ভেতরে আসে

      if (fetchedBooks.books && Array.isArray(fetchedBooks.books)) {
        sanitizedBooks = fetchedBooks.books.map((book) => ({
          ...book,
          status:
            typeof book.status === "object"
              ? (book.status?.status ?? "Pending Approval")
              : (book.status ?? "Pending Approval"),
        }));
      } else if (fetchedBooks.data && Array.isArray(fetchedBooks.data)) {
        sanitizedBooks = fetchedBooks.data.map((book) => ({
          ...book,
          status:
            typeof book.status === "object"
              ? (book.status?.status ?? "Pending Approval")
              : (book.status ?? "Pending Approval"),
        }));
      } else if (
        fetchedBooks.result &&
        Array.isArray(fetchedBooks.result)
      ) {
        // Express থেকে { success: true, result: [...] } আসতে পারে
        sanitizedBooks = fetchedBooks.result.map((book) => ({
          ...book,
          status:
            typeof book.status === "object"
              ? (book.status?.status ?? "Pending Approval")
              : (book.status ?? "Pending Approval"),
        }));
      } else if (fetchedBooks.title) {
        // ৩. যদি সরাসরি একটি single book object আসে
        sanitizedBooks = [
          {
            ...fetchedBooks,
            status:
              typeof fetchedBooks.status === "object"
                ? (fetchedBooks.status?.status ?? "Pending Approval")
                : (fetchedBooks.status ?? "Pending Approval"),
          },
        ];
      } else if (
        fetchedBooks.data &&
        typeof fetchedBooks.data === "object" &&
        fetchedBooks.data.title
      ) {
        // ৪. যদি data এর ভিতরে single book object থাকে
        sanitizedBooks = [
          {
            ...fetchedBooks.data,
            status:
              typeof fetchedBooks.data.status === "object"
                ? (fetchedBooks.data.status?.status ?? "Pending Approval")
                : (fetchedBooks.data.status ?? "Pending Approval"),
          },
        ];
      }
    }
  }

  console.log("📊 Cleaned Sanitized Books Array:", sanitizedBooks);

  // ডাটা ভ্যালিডেশন চেক
  const hasBooks =
    Array.isArray(sanitizedBooks) && sanitizedBooks.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* হেডার সেকশন */}
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#040d1b] tracking-tight mb-1 flex items-center gap-2">
            <MdInventory className="text-[#775a19]" />
            Manage Book Inventory
          </h1>

          <p className="text-xs text-slate-400 mt-0.5">
            Logged in as:{" "}
            <span className="font-semibold text-[#040d1b]">
              {user?.email || "Archivist"}
            </span>
          </p>
        </div>

        {hasBooks && (
          <Link
            href="/dashboard/librarian/add-book"
            className="inline-flex items-center gap-1.5 bg-[#040d1b] hover:bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm self-start sm:self-auto"
          >
            <MdAdd className="text-sm" />
            Add New Book
          </Link>
        )}
      </div>

      {/* Conditional Rendering */}
      {hasBooks ? (
        <InventoryClientContainer initialBooks={sanitizedBooks} />
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-dashed border-slate-200">
            <MdMenuBook className="text-4xl text-slate-300" />
          </div>

          <h3 className="text-lg font-bold text-[#040d1b] mb-1.5">
            Your Inventory is Empty
          </h3>

          <p className="text-sm text-[#45474c] max-w-sm leading-relaxed mb-6">
            It looks like you haven't cataloged any volumes yet. Start
            building your repository by adding your first institutional
            book.
          </p>

          <Link
            href="/dashboard/librarian/add-book"
            className="inline-flex items-center gap-2 bg-[#040d1b] hover:bg-slate-900 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all shadow-sm active:scale-[0.98]"
          >
            <MdAdd className="text-lg" />
            Add Your First Book
          </Link>
        </div>
      )}
    </div>
  );
}