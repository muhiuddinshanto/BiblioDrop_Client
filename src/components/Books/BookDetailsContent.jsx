// src/components/Books/BookDetailsContent.jsx
"use client";



import { orderBooks } from '@/lib/actions/order';
import { wishlistCreate } from '@/lib/actions/wishlist';
import { authClient } from '@/lib/auth-client';

import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import { FaStar, FaTruckMoving, FaHeart, FaRegCommentDots, FaCircleUser } from 'react-icons/fa6';

export default function BookDetailsContent({ book, reviewsData = [], isLoadingReviews = false }) {
  if (!book) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg font-bold text-slate-500">Book data not found.</p>
      </div>
    );
  }

  
    const router = useRouter();

  const  { data: session } = authClient.useSession();
  //  console.log(session?.user?.id, 'login user');

  // মঙ্গোডিবির অবজেক্ট থেকে ডেস্ট্রাকচারিং
  const { _id, title, author, category, price, image, rating, reviews, badge } = book;
  const fallbackImage = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600";


  const handleDelivery = async () => {
  const deliveryData = {
    BookId: _id,
    title,
    author,
    category,
    price,
    image,
    userId: session?.user?.id,
    status: "pending",
  };

  if(deliveryData && deliveryData.userId) {
    alert("অর্ডার করা হয়েছে");
  }

  const res = await orderBooks(deliveryData);
};


const handleWishlist = async () => {
  // ১. ইউজার লগইন না থাকলে উইশলিস্টে অ্যাড করতে দিবে না
  if (!session?.user?.id) {
    alert("Please login first to add items to your wishlist!");
    router.push(`/login?redirect=/books/${_id}`);
    return;
  }

  const wishlistData = {
    BookId: _id,
    title,
    author,
    category,
    price,
    image,
    userId: session?.user?.id,
  };

  try {
    // ২. অ্যাকশন কল করা হচ্ছে
    const res = await wishlistCreate(wishlistData);
    
    // ৩. মঙ্গোডিবির রেসপন্স (insertedId) চেক করা হচ্ছে ঠিকঠাক
    if (res?.insertedId) {
      alert("Successfully added to Wishlist! ❤️");
    } else {
      alert("Something went wrong or item already exists.");
    }
  } catch (error) {
    console.error("Wishlist error:", error);
    alert("Failed to connect to the server.");
  }
};

  return (
    <section className="w-full bg-white px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        
        {/* === প্রথম পার্ট: বইয়ের বিবরণ এবং মেইন ইনফো === */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 items-start">
          
          {/* === বাম পাশ: বইয়ের কভার ইমেজ === */}
          <div className="md:col-span-5 flex justify-center bg-slate-50 rounded-2xl p-8 border border-slate-100 max-h-[500px]">
            <div className="relative w-full max-w-[320px] aspect-[3/4] shadow-2xl rounded-lg overflow-hidden group">
              <img
                src={image || fallbackImage}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {badge && (
                <span className={`absolute top-4 left-4 rounded-md px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md
                  ${badge.type === "new" ? "bg-[#0F172A]" : "bg-[#D4AF37]"}`}
                >
                  {badge.text}
                </span>
              )}
            </div>
          </div>

          {/* === ডান পাশ: বইয়ের বিবরণ ও অ্যাকশন বাটন === */}
          <div className="md:col-span-7 flex flex-col h-full justify-center">
            {/* ক্যাটাগরি */}
            <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
              {category}
            </span>

            {/* টাইটেল */}
            <h1 className="mt-2 text-3xl font-black text-[#0F172A] tracking-tight sm:text-4xl">
              {title}
            </h1>

            {/* লেখক */}
            <p className="mt-2 text-lg font-medium text-slate-600">
              by <span className="font-bold text-[#0F172A]">{author}</span>
            </p>

            {/* রেটিং সেকশন */}
            <div className="mt-4 flex items-center gap-3 border-b border-slate-100 pb-6">
              <div className="flex items-center text-sm text-[#D4AF37] gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.floor(rating || 5) ? "text-[#D4AF37]" : "text-gray-200"} 
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-500">
                {rating || 5}.0 ({reviews || 0} customer reviews)
              </span>
            </div>

            {/* প্রাইস বা মূল্য */}
            <div className="mt-6">
              <span className="text-3xl font-black text-[#0F172A]">
                ${typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2)}
              </span>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Premium scholarly edition. Specially curated volume bound with archival-quality materials, perfect for collectors, researchers, and academic institutions.
              </p>
            </div>

            {/* === অ্যাকশন বাটনসমূহ === */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              
              {/* Button 1: Request Delivery */}
              {
                session ?(<button 
                className="flex-1 flex items-center justify-center gap-3 rounded-xl bg-[#0F172A] px-6 py-4 text-sm font-bold text-white hover:bg-[#1E293B] active:scale-[0.98] transition-all shadow-sm"
                onClick={handleDelivery}
              >
                <FaTruckMoving className="text-lg text-[#D4AF37]" />
                Request Delivery
              </button>):(<button
                className="flex-1 flex items-center justify-center gap-3 rounded-xl bg-[#0F172A] px-6 py-4 text-sm font-bold text-white hover:bg-[#1E293B] active:scale-[0.98] transition-all shadow-sm"
                onClick={() => {
                  router.push(`/login?redirect=/books/${_id}`);
                }}
              >
                <FaTruckMoving className="text-lg text-[#D4AF37]" />
                Login to Request Delivery
              </button>)
              }

              {/* Button 2: Add to Wishlist */}
              <button 
                className="flex items-center justify-center gap-3 rounded-xl border-2 border-slate-200 bg-transparent px-6 py-4 text-sm font-bold text-[#0F172A] hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all"
                onClick={handleWishlist}
              >
                <FaHeart className="text-base text-rose-500" />
                Add to Wishlist
              </button>

            </div>

            {/* অতিরিক্ত ফিচার ট্যাগ */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 text-xs font-bold text-slate-500">
              <div className="flex items-center gap-2">✓ Official BiblioDrop Edition</div>
              <div className="flex items-center gap-2">✓ Secured Packaging</div>
            </div>

          </div>
        </div>

        {/* === দ্বিতীয় পার্ট: ডাইনামিক রিভিউ সেকশন === */}
        <div className="mt-16 border-t border-slate-100 pt-10">
          <h3 className="text-xl font-black text-[#0F172A] flex items-center gap-2">
            <FaRegCommentDots className="text-[#D4AF37]" />
            Customer Reviews ({reviewsData?.length || 0})
          </h3>

          <div className="mt-6 space-y-6">
            {/* ১. ডাটা লোডিং স্টেট */}
            {isLoadingReviews ? (
              [...Array(2)].map((_, idx) => (
                <div key={idx} className="animate-pulse flex gap-4 p-4 border border-slate-50 rounded-xl">
                  <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {/* ২. যদি কোনো রিভিউ না থাকে তখন কি দেখাবে */}
                {reviewsData.length === 0 ? (
                  <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-sm font-medium text-slate-500">No reviews yet for this volume.</p>
                    <p className="text-xs text-slate-400 mt-1">Be the first to share your thoughts after purchase!</p>
                  </div>
                ) : (
                  // ৩. রিভিউ থাকলে ম্যাপ হয়ে লুপে দেখাবে
                  reviewsData.map((review) => (
                    <div key={review._id || review.id} className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 flex gap-4">
                      <div className="text-slate-400 flex-shrink-0">
                        {/* 💡 এখানে ফিক্সড আইকন ব্যবহার করা হয়েছে */}
                        <FaCircleUser className="text-3xl" />
                      </div>
                      <div className="flex-col w-full">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#0F172A]">{review.reviewerName || "Anonymous Collector"}</h4>
                          <span className="text-xs text-slate-400">{review.date || "Recent"}</span>
                        </div>
                        {/* রিভিউর নিজস্ব স্টার রেটিং */}
                        <div className="flex items-center text-xs text-[#D4AF37] mt-1 gap-0.5">
                          {[...Array(5)].map((_, starIdx) => (
                            <FaStar 
                              key={starIdx} 
                              className={starIdx < (review.rating || 5) ? "text-[#D4AF37]" : "text-gray-200"} 
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}