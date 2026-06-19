import React from 'react';
import {
    MdLocalShipping,
    MdPending,
    MdCheckCircle,
    MdRemoveRedEye,
    MdSearch,
    MdFilterList
} from 'react-icons/md';

// এই কম্পোনেন্টটি orders ডাটা প্রপস হিসেবে নিবে, যাতে এটিকে বারবার যেকোনো জায়গায় রিয়ুজ করা যায়
export default function OrdersContent({ orders = [] }) {
    const safeOrders = orders ?? [];

    // অর্ডারের স্ট্যাটাস অনুযায়ী ডাইনামিক কালার ব্যাজ সেট করার ফাংশন
    const getStatusBadge = (status) => {
        const currentStatus = status?.toLowerCase() || 'pending';

        switch (currentStatus) {
            case 'delivered':
                return (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-emerald-200">
                        <MdCheckCircle className="text-xs" /> Delivered
                    </span>
                );
            case 'shipped':
                return (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-blue-200">
                        <MdLocalShipping className="text-xs" /> Shipped
                    </span>
                );
            default: // pending
                return (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-[#775a19] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-amber-200">
                        <MdPending className="text-xs" /> Pending
                    </span>
                );
        }
    };

    return (
        <div className="w-full bg-transparent">
            {/* ১. হেডার সেকশন */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-[#040d1b] tracking-tight mb-1">
                        Order Management
                    </h1>
                    <p className="text-[#45474c] text-sm">
                        Track and overview all your library delivery requests.
                    </p>
                </div>

                {/* টোটাল কাউন্ট ব্যাজ */}
                <div className="bg-[#040d1b] text-white px-4 py-2 rounded-xl text-sm font-semibold self-start sm:self-auto">
                    Total Orders: <span className="font-serif font-bold text-[#fed488] ml-1">{safeOrders.length}</span>
                </div>
            </div>

            {/* ২. ফিল্টার এবং সার্চ বার UI (প্রিমিয়াম লুকের জন্য) */}
            <div className="bg-white p-4 rounded-xl border border-[#c5c6cc]/20 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                <div className="relative w-full md:max-w-md">
                    <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by book title or order ID..."
                        className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#775a19] transition-colors"
                    />
                </div>
                <button className="flex items-center gap-2 text-sm font-semibold text-[#45474c] hover:text-[#040d1b] border border-slate-200 px-4 py-2 rounded-lg bg-white shadow-sm hover:bg-slate-50 transition-all w-full md:w-auto justify-center">
                    <MdFilterList className="text-lg" /> Filter Orders
                </button>
            </div>

            {/* ৩. অর্ডার লিস্ট বা টেবিল */}
            {safeOrders.length === 0 ? (
                /* খালি থাকলে এই সুন্দর প্লেসহোল্ডারটি দেখাবে */
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-[#c5c6cc]/20 p-6 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
                        <MdLocalShipping className="text-4xl text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-[#040d1b] mb-1">No Deliveries Requested</h3>
                    <p className="text-sm text-[#45474c] max-w-sm leading-relaxed mb-6">
                        It looks like your order history is empty. Head back to the main catalog to request your first archival volume.
                    </p>
                    <button className="bg-[#040d1b] text-white hover:bg-[#1a2332] font-semibold text-sm px-5 py-2.5 rounded-lg transition-all shadow-sm">
                        Browse Catalog
                    </button>
                </div>
            ) : (
                /* অর্ডার থাকলে এই প্রিমিয়াম রেসপন্সিভ টেবিলটি দেখাবে */
                <div className="bg-white rounded-xl border border-[#c5c6cc]/20 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f6f3f4] border-b border-[#c5c6cc]/20 text-xs font-bold uppercase tracking-wider text-[#040d1b]">
                                    <th className="py-4 px-6">Book Description</th>
                                    <th className="py-4 px-6">Category</th>
                                    <th className="py-4 px-6">Request Date</th>
                                    <th className="py-4 px-6">Amount</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#c5c6cc]/10 text-sm text-[#040d1b]">
                                {safeOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                                        {/* বইয়ের বিবরণ ও ইমেজ */}
                                        <td className="py-4 px-6 whitespace-nowrap sm:whitespace-normal">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-16 bg-slate-100 rounded overflow-hidden shadow-sm flex-shrink-0 border border-slate-200/60">
                                                    <img
                                                        src={order.image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=100"}
                                                        alt={order.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#040d1b] max-w-[200px] sm:max-w-[280px] truncate">
                                                        {order.title || "Unknown Volume"}
                                                    </p>
                                                    <p className="text-xs text-[#45474c] mt-0.5">
                                                        ID: <span className="font-mono text-[11px] text-slate-400">{order._id?.substring(0, 8)}...</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* ক্যাটাগরি */}
                                        <td className="py-4 px-6 font-medium text-slate-500 capitalize">
                                            {order.category || "General"}
                                        </td>

                                        {/* তারিখ ও সময় */}
                                        <td className="py-4 px-6 text-slate-600">
                                            {(() => {
                                                // ডাটাবেজ থেকে ডেট যেভাবে আসুক (স্ট্রিং বা মঙ্গোডিবি অবজেক্ট) তা খুঁজে বের করার জন্য সেফটি চেক
                                                const rawDate = order.date?.$date || order.date || order.createdAt;

                                                if (!rawDate) {
                                                    return <span className="text-xs italic text-slate-400">Date Not Available</span>;
                                                }

                                                const dateObj = new Date(rawDate);

                                                return (
                                                    <div className="flex flex-col">
                                                        {/* তারিখ: যেমন Jun 19, 2026 */}
                                                        <span className="font-medium text-[#040d1b]">
                                                            {dateObj.toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                        {/* সময়: যেমন 03:23 PM */}
                                                        <span className="text-xs text-slate-400 font-mono mt-0.5">
                                                            {dateObj.toLocaleTimeString('en-US', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: true
                                                            })}
                                                        </span>
                                                    </div>
                                                );
                                            })()}
                                        </td>

                                        {/* মূল্য বা প্রাইস */}
                                        <td className="py-4 px-6 font-bold text-[#040d1b]">
                                            ${typeof order.price === 'number' ? order.price.toFixed(2) : parseFloat(order.price || 0).toFixed(2)}
                                        </td>

                                        {/* স্ট্যাটাস ব্যাজ */}
                                        <td className="py-4 px-6">
                                            {getStatusBadge(order.status)}
                                        </td>

                                        {/* অ্যাকশন বাটন */}
                                        <td className="py-4 px-6 text-center">
                                            <button className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 hover:bg-[#fed488]/30 hover:text-[#775a19] font-bold text-xs px-3 py-2 rounded-lg transition-all border border-transparent hover:border-[#fed488]/60">
                                                <MdRemoveRedEye className="text-sm" /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}