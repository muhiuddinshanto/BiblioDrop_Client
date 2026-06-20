import { MdCheckCircle, MdDeleteOutline, MdRateReview, MdLayersClear } from "react-icons/md";

export default function ApprovalQueueTable({ 
  books = [], 
  isLoading = false, 
  onApprove, 
  onDelete 
}) {
  
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-10 h-10 border-4 border-[#775a19] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm text-slate-500 font-medium tracking-wide">Loading pending approval queue...</p>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-slate-50 border border-dashed border-slate-200 rounded-full flex items-center justify-center mb-4">
          <MdLayersClear className="text-3xl text-slate-300" />
        </div>
        <h3 className="text-base font-bold text-[#040d1b] mb-1">All Caught Up!</h3>
        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
          There are currently no books awaiting system verification. Outstanding requests will appear here.
        </p>
      </div>
    );
  }

  // ডেট ফরম্যাট করার হেল্পার ফাংশন
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-4 px-6">Book Details</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Submitted By</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {books.map((book) => {
              const bookId = book._id || book.id;
              return (
                <tr key={bookId} className="hover:bg-slate-50/40 transition-colors group">
                  {/* ১. বইয়ের ডিটেইলস কলাম */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      {book.image ? (
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="w-10 h-14 rounded-lg object-cover border border-slate-200/60 shadow-sm group-hover:scale-[1.02] transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-10 h-14 bg-slate-50 border border-slate-200/60 rounded-lg flex items-center justify-center text-slate-400 shadow-sm">
                          <MdRateReview className="text-lg" />
                        </div>
                      )}
                      <div className="space-y-0.5">
                        <p className="font-semibold text-slate-900 leading-snug text-sm tracking-tight group-hover:text-[#775a19] transition-colors">
                          {book.title}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">by {book.author || "Unknown Author"}</p>
                      </div>
                    </div>
                  </td>

                  {/* ২. ক্যাটাগরি ও প্রাইস কলাম */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col items-start gap-1">
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-semibold tracking-wide">
                        {book.category || "General"}
                      </span>
                      {book.price && (
                        <p className="text-xs text-slate-500 font-bold pl-0.5">${Number(book.price).toFixed(2)}</p>
                      )}
                    </div>
                  </td>

                  {/* ৩. সাবমিটেড বাই (ইউজার অ্যাভাটার সহ) কলাম */}
                  <td className="py-4 px-6 text-slate-600">
                    <div className="flex items-center gap-2.5">
                      {book.publisher?.image ? (
                        <img 
                          src={book.publisher.image} 
                          alt={book.publisher.name} 
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                          {book.publisher?.name ? book.publisher.name.charAt(0) : "A"}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-xs text-slate-800">{book.publisher?.name || "Archivist"}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{formatDate(book.date)}</p>
                      </div>
                    </div>
                  </td>

                  {/* ৪. অ্যাকশন বাটন কলাম */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => onApprove && onApprove(bookId)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#040d1b] hover:bg-[#0c1b35] text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        <MdCheckCircle className="text-sm text-emerald-400" /> Approve & Publish
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(bookId)}
                        className="p-2 border border-slate-200 text-slate-400 rounded-xl hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all active:scale-95"
                        title="Delete Request"
                      >
                        <MdDeleteOutline className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}