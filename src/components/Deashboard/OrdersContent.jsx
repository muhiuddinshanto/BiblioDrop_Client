"use client";
import Link from 'next/link';
import React, { useState, useMemo } from 'react'; // 💡 useState ও useMemo ইম্পোর্ট করা হলো
import {
    MdLocalShipping,
    MdCheckCircle,
    MdRemoveRedEye,
    MdSearch,
    MdFilterList,
    MdAccessTime
} from 'react-icons/md';

export default function OrdersContent({ orders = [] }) {
    const safeOrders = orders ?? [];

    // 🎯 সার্চ স্টেট এবং সিলেক্টেড স্ট্যাটাস ফিল্টার স্টেট
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");

    // ⚙️ লাইব্রেরিয়ানের ৩টি স্ট্যাটাসের সাথে মিল রেখে ডাইনামিক কালার ব্যাজ
    const getStatusBadge = (status) => {
        const currentStatus = status?.toLowerCase() || 'pending';
        switch (currentStatus) {
            case 'delivered':
                return (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-emerald-200">
                        <MdCheckCircle className="text-xs" /> Delivered
                    </span>
                );
            case 'dispatched':
                return (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-blue-200">
                        <MdLocalShipping className="text-xs" /> Dispatched
                    </span>
                );
            case 'pending':
            default:
                return (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-[#775a19] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-amber-200">
                        <MdAccessTime className="text-xs" /> Pending
                    </span>
                );
        }
    };

    // 🧠 useMemo দিয়ে সার্চ ও ফিল্টারিং পারফরম্যান্স অপ্টিমাইজ করা হলো
    const filteredOrders = useMemo(() => {
        return safeOrders.filter((order) => {
            const orderId = (order._id?.$oid || order._id || "").toLowerCase();
            const bookTitle = (order.title || "").toLowerCase();
            const orderStatus = (order.status || "pending").toLowerCase();
            const search = searchQuery.toLowerCase();

            // সার্চ কন্ডিশন (টাইটেল অথবা আইডি মিললে ট্রু হবে)
            const matchesSearch = bookTitle.includes(search) || orderId.includes(search);
            
            // ড্রপডাউন ফিল্টার কন্ডিশন
            const matchesStatus = selectedStatus === "all" || orderStatus === selectedStatus;

            return matchesSearch && matchesStatus;
        });
    }, [searchQuery, selectedStatus, safeOrders]);

    return (
        <div className="w-full bg-transparent">
            {/* ১. হেডার সেকশন */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-[#040d1b] dark:text-slate-100 tracking-tight mb-1">
                        Order Management
                    </h1>
                    <p className="text-[#45474c] text-sm">
                        Track and overview all your library delivery requests.
                    </p>
                </div>

                {/* টোটাল কাউন্ট ব্যাজ */}
                <div className="bg-[#040d1b] text-white px-4 py-2 rounded-xl text-sm font-semibold self-start sm:self-auto">
                    Total Orders: <span className="font-serif font-bold text-[#fed488] ml-1">{filteredOrders.length}</span>
                </div>
            </div>

            {/* ২. ফিল্টার এবং সার্চ বার UI (এখন ফাংশনাল) */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-[#c5c6cc]/20 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                <div className="relative w-full md:max-w-md">
                    <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // 💡 সার্চ কোয়েরি আপডেট
                        placeholder="Search by book title or order ID..."
                        className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#775a19] transition-colors dark:text-slate-100"
                    />
                </div>
                
                {/* 💡 বাটন থেকে ড্রপডাউনে কনভার্ট করা হলো সহজে ফিল্টার করার জন্য */}
                <div className="relative w-full md:w-auto flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 shadow-sm">
                    <MdFilterList className="text-lg text-slate-400 mr-2" />
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)} // 💡 স্ট্যাটাস ফিল্টার আপডেট
                        className="bg-transparent text-sm font-semibold text-[#45474c] dark:text-slate-100 focus:outline-none cursor-pointer pr-4"
                    >
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
            </div>

            {/* ৩. অর্ডার লিস্ট বা টেবিল */}
            {filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-slate-900 rounded-xl border border-[#c5c6cc]/20 p-6 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
                        <MdLocalShipping className="text-4xl text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-[#040d1b] dark:text-slate-100 mb-1">No Deliveries Found</h3>
                    <p className="text-sm text-[#45474c] max-w-sm leading-relaxed mb-6">
                        We couldn't find any orders matching your criteria. Try adjusting your search query or status filter.
                    </p>
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#c5c6cc]/20 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f6f3f4] dark:bg-slate-800 border-b border-[#c5c6cc]/20 dark:border-slate-700 text-xs font-bold uppercase tracking-wider text-[#040d1b] dark:text-slate-100">
                                    <th className="py-4 px-6">Book Description</th>
                                    <th className="py-4 px-6">Category</th>
                                    <th className="py-4 px-6">Request Date</th>
                                    <th className="py-4 px-6">Amount</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#c5c6cc]/10 dark:divide-slate-700 text-sm text-[#040d1b] dark:text-slate-100">
                                {filteredOrders.map((order) => {
                                    const orderId = order._id?.$oid || order._id || "";

                                    return (
                                        <tr key={orderId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="py-4 px-6 whitespace-nowrap sm:whitespace-normal">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-16 bg-slate-100 dark:bg-slate-800 rounded overflow-hidden shadow-sm flex-shrink-0 border border-slate-200/60 dark:border-slate-700">
                                                        <img
                                                            src={order.image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=100"}
                                                            alt={order.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-[#040d1b] dark:text-slate-100 max-w-[200px] sm:max-w-[280px] truncate">
                                                            {order.title || "Unknown Volume"}
                                                        </p>
                                                        <p className="text-xs text-[#45474c] mt-0.5">
                                                            ID: <span className="font-mono text-[11px] text-slate-400">
                                                                {orderId ? `${orderId.substring(0, 8)}...` : "N/A"}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6 font-medium text-slate-500 dark:text-slate-400 capitalize">
                                                {order.category || "General"}
                                            </td>

                                            <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                                                {(() => {
                                                    const rawDate = order.date?.$date || order.date || order.createdAt;
                                                    if (!rawDate) return <span className="text-xs italic text-slate-400">Date Not Available</span>;
                                                    const dateObj = new Date(rawDate);
                                                    return (
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-[#040d1b] dark:text-slate-100">
                                                                {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </span>
                                                            <span className="text-xs text-slate-400 font-mono mt-0.5">
                                                                {dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                                                            </span>
                                                        </div>
                                                    );
                                                })()}
                                            </td>

                                            <td className="py-4 px-6 font-bold text-[#040d1b] dark:text-slate-100">
                                                ${typeof order.price === 'number' ? order.price.toFixed(2) : parseFloat(order.price || 0).toFixed(2)}
                                            </td>

                                            <td className="py-4 px-6">
                                                {getStatusBadge(order.status)}
                                            </td>

                                            <td className="py-4 px-6 text-center">
                                                <Link
                                                    href={`/books/${order.BookId}`} className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#fed488]/30 hover:text-[#775a19] dark:hover:text-[#fed488] font-bold text-xs px-3 py-2 rounded-lg transition-all border border-transparent hover:border-[#fed488]/60">
                                                    <MdRemoveRedEye className="text-sm" /> View
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}