import React from 'react';
import { 
  MdBookmark, 
  MdCheckCircle, 
  MdKeyboardReturn, 
  MdMenuBook, 
  MdLayersClear 
} from 'react-icons/md';

export default function ReadingListContent({ orders = [] }) {
  const safeOrders = orders ?? [];

  // শুধুমাত্র Delivered এবং Returned স্ট্যাটাসের বইগুলো ফিল্টার করা হচ্ছে
  const completedBooks = safeOrders.filter(order => {
    const status = order.status?.toLowerCase();
    return status === 'delivered' || status === 'returned';
  });

  return (
    <div className="w-full space-y-8">
      {/* ১. হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#040d1b] dark:text-slate-100 tracking-tight mb-1 flex items-center gap-2">
            <MdMenuBook className="text-[#775a19]" /> My Reading List
          </h1>
          <p className="text-[#45474c] text-sm">
            A curated gallery of your completed and processed literary works.
          </p>
        </div>
        
        {/* কাউন্টার ব্যাজ */}
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#040d1b] dark:text-slate-100 px-4 py-2 rounded-xl text-sm font-semibold self-start sm:self-auto">
          Books Collected: <span className="font-serif font-bold text-[#775a19] dark:text-amber-500 ml-1">{completedBooks.length}</span>
        </div>
      </div>

      {/* ২. গ্যালারি গ্রিড (Gallery View) */}
      {completedBooks.length === 0 ? (
        /* রিডিং লিস্ট খালি থাকলে এই সুন্দর UI-টি দেখাবে */
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-slate-900 rounded-xl border border-[#c5c6cc]/20 p-6 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
            <MdLayersClear className="text-4xl text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-[#040d1b] dark:text-slate-100 mb-1">Your Reading List is Empty</h3>
          <p className="text-sm text-[#45474c] max-w-sm leading-relaxed">
            Books will appear here once their delivery is successfully completed or processed through the archive.
          </p>
        </div>
      ) : (
        /* ফিল্টার করা বইগুলোর লাক্সারি গ্যালারি কার্ড ভিউ */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {completedBooks.map((order) => {
            // ডেট এক্সট্রাক্ট করার সেফটি মেকানিজম
            const rawDate = order.date?.$date || order.date || order.createdAt;
            const formattedDate = rawDate 
              ? new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : 'Recent';

            const isReturned = order.status?.toLowerCase() === 'returned';

            return (
              <div 
                key={order._id} 
                className="bg-white dark:bg-slate-900 rounded-xl border border-[#c5c6cc]/20 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md hover:border-[#775a19]/30 transition-all duration-300 relative"
              >
                {/* স্ট্যাটাস ব্যাজ (ইমেজের ওপর ভাসমান) */}
                <div className="absolute top-3 right-3 z-10">
                  {isReturned ? (
                    <span className="inline-flex items-center gap-1 text-[10px] bg-slate-900/90 backdrop-blur-sm text-white px-2 py-1 rounded font-bold uppercase tracking-wider shadow-sm">
                      <MdKeyboardReturn className="text-xs text-amber-400" /> Returned
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-600/90 backdrop-blur-sm text-white px-2 py-1 rounded font-bold uppercase tracking-wider shadow-sm">
                      <MdCheckCircle className="text-xs" /> Delivered
                    </span>
                  )}
                </div>

                {/* কভার ইমেজ সেকশন */}
                <div className="w-full aspect-[3/4] bg-[#f6f3f4] relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                  <img 
                    src={order.image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400"} 
                    alt={order.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* হোভার ওনলি গ্লেজ ইফেক্ট */}
                  <div className="absolute inset-0 bg-[#040d1b]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* মেটাডাটা বা বিবরণী */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* ক্যাটাগরি */}
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#775a19] bg-[#fed488]/20 px-2 py-0.5 rounded">
                      {order.category || "Literature"}
                    </span>

                    {/* বইয়ের নাম */}
                    <h3 className="font-serif font-bold text-base text-[#040d1b] dark:text-slate-100 leading-tight mt-2 line-clamp-1 group-hover:text-[#775a19] transition-colors" title={order.title}>
                      {order.title || "Untitled Masterpiece"}
                    </h3>

                    {/* লেখক */}
                    <p className="text-xs text-[#45474c] mt-0.5 font-medium italic">
                      by {order.author || "Unknown Author"}
                    </p>
                  </div>

                  {/* ফুটার লাইন: ডেলিভারি/প্রসেসিং ডেট */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <MdBookmark className="text-slate-300" /> 
                      {isReturned ? 'Returned On' : 'Delivered On'}
                    </span>
                    <span className="font-mono text-[#040d1b] dark:text-slate-100 font-semibold">
                      {formattedDate}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
