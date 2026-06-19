import { orderById } from '@/lib/api/order';
import { wishlistById } from '@/lib/api/wishlist';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import { 
  MdAutoStories, 
  MdStars, 
  MdLocalShipping, 
  MdPending, 
  MdCheckCircle,
  MdKeyboardReturn,
  MdFilterList, 
  MdGridView, 
  MdShoppingCart,
  MdLayersClear
} from 'react-icons/md';

export default async function DashboardContent() {
  // প্রগ্রেস বারের জন্য ডামি ডাটা (যেহেতু এটি কাস্টম ট্র্যাকিং ফিচার)
  const inProgressBooks = [
    {
      title: "The Shadow of the Wind",
      author: "Carlos Ruiz Zafón",
      progress: 72,
      img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600"
    },
    {
      title: "Modern Logistics",
      author: "Sarah Henderson",
      progress: 15,
      img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600"
    }
  ];

  const user = await getUserSession();
  
  // সেফটি চেকিং সহ রিয়েল অর্ডার ও উইশলিস্ট ডেটা লোড
  const orders = user?.id ? await orderById(user.id) : [];
  const safeOrders = orders ?? [];

  const wishlist = user?.id ? await wishlistById(user.id) : [];
  const safeWishlist = wishlist ?? [];

  // ডাইনামিক সংখ্যা গণনার লজিক
  const currentLoans = safeOrders.filter(o => o.status?.toLowerCase() === 'delivered').length;
  const totalSpent = safeOrders.reduce((acc, curr) => acc + (typeof curr.price === 'number' ? curr.price : parseFloat(curr.price || 0)), 0);

  return (
    <>
      {/* হেডার বা ওয়েলকাম মেসেজ */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-serif text-[#040d1b] tracking-tight mb-1">
          Welcome back, {user?.name || "Curator Julian"}
        </h1>
        <p className="text-[#45474c] text-base">
          Your literary collection has grown by {safeOrders.length} volumes this month.
        </p>
      </div>

      {/* ড্যাশবোর্ড বেন্টো গ্রিড লেআউট */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* ১. লাইব্রেরি ইনসাইটস (Library Insights) - dynamic values loaded */}
        <div className="col-span-12 md:col-span-4 bg-[#ffffff] p-6 rounded-xl border border-[#c5c6cc]/20 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <MdAutoStories className="text-[80px] text-[#040d1b]" />
          </div>
          <h2 className="text-xl font-bold font-serif text-[#040d1b] mb-6">Library Insights</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#c5c6cc]/20">
              <span className="text-[#45474c] text-sm font-semibold">Total Requests</span>
              <span className="text-[#040d1b] text-2xl font-bold font-serif">{safeOrders.length}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#c5c6cc]/20">
              <span className="text-[#45474c] text-sm font-semibold">Current Loans</span>
              <span className="text-[#040d1b] text-2xl font-bold font-serif">{currentLoans}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#45474c] text-sm font-semibold">Total Investment</span>
              <span className="text-[#775a19] text-xl font-bold font-mono">${totalSpent.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 pt-4">
            <div className="flex items-center gap-2 text-[#785a1a] bg-[#fed488]/30 p-3 rounded-lg">
              <MdStars className="text-lg" />
              <span className="text-xs font-semibold">Premier Curator Status Active</span>
            </div>
          </div>
        </div>

        {/* ২. ইন প্রগ্রেস বুকস (In Progress) */}
        <div className="col-span-12 md:col-span-8 bg-white p-6 rounded-xl border border-[#c5c6cc]/20 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-serif text-[#040d1b]">In Progress</h2>
            <button className="text-[#775a19] text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {inProgressBooks.map((book, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="w-20 h-28 flex-shrink-0 bg-[#f0edee] rounded-md overflow-hidden shadow-sm transition-transform group-hover:-translate-y-1">
                  <img className="w-full h-full object-cover" src={book.img} alt={book.title} />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <h3 className="text-base font-bold font-serif text-[#040d1b] leading-tight mb-1">{book.title}</h3>
                  <p className="text-xs text-[#45474c] mb-4">{book.author}</p>
                  <div className="w-full bg-[#f0edee] h-1 rounded-full overflow-hidden">
                    <div className="bg-[#775a19] h-full" style={{ width: `${book.progress}%` }}></div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold mt-2 text-[#45474c]">{book.progress}% Completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ৩. রিসেন্ট অর্ডারস (Recent Orders) - Dynamic Badges */}
        <div className="col-span-12 md:col-span-7 bg-white p-6 rounded-xl border border-[#c5c6cc]/20 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-serif text-[#040d1b]">Recent Orders</h2>
              <MdFilterList className="text-[#45474c] text-xl cursor-pointer hover:text-[#775a19]" />
            </div>

            <div className="space-y-4">
              {safeOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 p-6 my-auto">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <MdLayersClear className="text-3xl text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-[#040d1b] mb-1">No Orders Found</h3>
                  <p className="text-xs text-[#45474c] max-w-[280px] leading-relaxed">
                    You haven't requested any book deliveries yet. Explore our library to start your collection.
                  </p>
                </div>
              ) : (
                safeOrders.slice(0, 4).map((order) => {
                  const rawDate = order.date?.$date || order.date || order.createdAt;
                  const currentStatus = order.status?.toLowerCase() || 'pending';

                  return (
                    <div 
                      key={order._id} 
                      className="flex items-center justify-between p-3 border-b border-[#c5c6cc]/20 hover:bg-[#f6f3f4] transition-colors rounded-lg group"
                    >
                      <div className="flex items-center gap-4">
                        {order.image ? (
                          <div className="w-12 h-14 bg-slate-100 rounded overflow-hidden shadow-sm flex-shrink-0">
                            <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#1a2332] flex items-center justify-center flex-shrink-0">
                            <MdLocalShipping className="text-[#bec7db] text-lg" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-[#040d1b] max-w-[180px] sm:max-w-[250px] truncate" title={order.title}>
                            {order.title || "Untitled Volume"}
                          </p>
                          <p className="text-xs text-[#45474c] capitalize">
                            {order.category || "General"} • {rawDate ? new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recent"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#040d1b]">
                          ${typeof order.price === 'number' ? order.price.toFixed(2) : parseFloat(order.price || 0).toFixed(2)}
                        </p>
                        
                        {/* ডাইনামিক স্ট্যাটাস ব্যাজ ম্যাপিং */}
                        {currentStatus === 'delivered' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider mt-1 border border-emerald-200">
                            <MdCheckCircle className="text-xs" /> Delivered
                          </span>
                        ) : currentStatus === 'returned' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider mt-1 border border-slate-300">
                            <MdKeyboardReturn className="text-xs" /> Returned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-[#775a19] px-2 py-0.5 rounded font-bold uppercase tracking-wider mt-1 border border-amber-200">
                            <MdPending className="text-xs" /> Pending
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ৪. রিয়েল উইশলিস্ট গ্রিড (Real Wishlist Integration) */}
        <div className="col-span-12 md:col-span-5 bg-[#f6f3f4] p-6 rounded-xl border border-[#c5c6cc]/20 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-serif text-[#040d1b]">Wishlist</h2>
              <MdGridView className="text-[#775a19] text-xl cursor-pointer" />
            </div>
            
            {safeWishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full my-auto">
                <MdLayersClear className="text-3xl text-slate-300 mb-2" />
                <p className="text-xs text-slate-400">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-3 custom-scrollbar">
                {safeWishlist.map((item) => (
                  <div key={item._id} className="flex-shrink-0 w-32 group">
                    <div className="w-full aspect-[2/3] bg-[#f0edee] rounded-lg mb-2 overflow-hidden relative border border-slate-200/40">
                      <img 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        src={item.image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600"} 
                        alt={item.title} 
                      />
                      <div className="absolute inset-0 bg-[#040d1b]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white p-2 rounded-full shadow-lg text-[#040d1b] hover:text-[#775a19] transition-colors">
                          <MdShoppingCart className="text-lg" />
                        </button>
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-[#040d1b] truncate" title={item.title}>
                      {item.title || "Untitled"}
                    </h4>
                    <p className="text-[11px] font-mono font-semibold text-[#775a19] mt-0.5">
                      ${typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price || 0).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}