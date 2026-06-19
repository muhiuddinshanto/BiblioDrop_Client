import { wishlistById } from "@/lib/api/wishlist";
import { getUserSession } from "@/lib/core/session";
import React from 'react';
import Link from 'next/link';
import { MdLayersClear, MdFavorite } from 'react-icons/md';
import WishlistClientContainer from "@/components/Deashboard/WishlistClientContainer";


const UserWishlistPage = async () => {
    const user = await getUserSession();
    const wishlist = user?.id ? await wishlistById(user.id) : [];
    
    // ডাটা এরে নিশ্চিত করা
    const safeWishlist = Array.isArray(wishlist) ? wishlist : [];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
            
            {/* হেডার সেকশন */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-[#040d1b] tracking-tight mb-1 flex items-center gap-3">
                        <MdFavorite className="text-rose-500" /> My Wishlist
                    </h1>
                    <p className="text-[#45474c] text-sm">
                        You have <span className="font-bold text-[#040d1b]">{safeWishlist.length}</span> luxury volumes saved in your curation.
                    </p>
                </div>
                
                {safeWishlist.length > 0 && (
                    <Link 
                        href="/books" 
                        className="text-xs font-bold uppercase tracking-wider bg-slate-50 hover:bg-[#040d1b] hover:text-white text-[#040d1b] px-4 py-2.5 rounded-xl border border-slate-200/60 text-center transition-all duration-300"
                    >
                        Explore More Books
                    </Link>
                )}
            </div>

            {/* কন্টেন্ট এরিয়া (এখানেই আমরা ক্লায়েন্ট লজিক হ্যান্ডেল করব) */}
            {safeWishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-slate-100 shadow-sm p-8 max-w-xl mx-auto">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
                        <MdLayersClear className="text-4xl text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold font-serif text-[#040d1b] mb-2">Your Wishlist is Empty</h3>
                    <p className="text-sm text-[#45474c] max-w-sm leading-relaxed mb-6">
                        Explore our elite library collections and save your favorite masterpieces here for future curation.
                    </p>
                    <Link 
                        href="/books" 
                        className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider bg-[#040d1b] hover:bg-[#775a19] text-white px-6 py-3.5 rounded-xl shadow-md shadow-slate-900/10 transition-all duration-300"
                    >
                        Browse Collections
                    </Link>
                </div>
            ) : (
                // ডাটা পাস করে দেওয়া হচ্ছে ক্লায়েন্ট কন্টেইনারে
                <WishlistClientContainer initialItems={safeWishlist} />
            )}
        </div>
    );
};

export default UserWishlistPage;