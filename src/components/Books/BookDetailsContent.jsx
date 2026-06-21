"use client";

import { orderBooks } from '@/lib/actions/order';
import { wishlistCreate } from '@/lib/actions/wishlist';
import { bookDelete, bookDetailsUpdate, booksUpdate } from '@/lib/actions/books'; 
import { authClient } from '@/lib/auth-client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { 
  FaStar, FaTruckMoving, FaHeart, FaPenToSquare, FaTrashCan, FaXmark, FaRegCommentDots
} from 'react-icons/fa6';
import StatusToggleButton from './StatusToggleButton'; 
import toast from 'react-hot-toast';

export default function BookDetailsContent({ book: initialBook, reviewsData = [], isLoadingReviews = false }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  useEffect(() => {
  if (session) {
    console.log("SESSION DATA:", session); // এটা দেখো
  }
}, [session]);
  
  const [book, setBook] = useState(initialBook);
  const [reviewsList, setReviewsList] = useState(reviewsData); // ✅ রিভিউজ লোকাল স্টেট
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false); 
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // ✅ সার্ভার থেকে নতুন রিভিউ ডাটা আসলে লোকাল স্টেট আপডেট হবে (router.refresh() এর সাথে সিঙ্ক)
  useEffect(() => {
    if (reviewsData) {
      setReviewsList(reviewsData);
    }
  }, [reviewsData]);

  // ✅ পারচেজ স্ট্যাটাস চেক
  useEffect(() => {
    if (!session?.user || !book?._id) return;

    const checkPurchase = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/check/${book._id}`,
          {
            headers: {
              Authorization: `Bearer ${session.session?.token}` 
            }
          }
        );
        const data = await res.json();
        setHasPurchased(data.hasPurchased);
      } catch {
        setHasPurchased(false);
      }
    };

    checkPurchase();
  }, [session, book?._id]);

  // ✅ রিভিউ সাবমিট হ্যান্ডলার
  const handleReviewSubmit = async () => {
    if (!reviewForm.comment.trim()) {
      toast.error("রিভিউ লিখুন।");
      return;
    }
    setIsSubmittingReview(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.session?.token}`
        },
        body: JSON.stringify({
          bookId: book._id,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("রিভিউ সাবমিট হয়েছে! ✅");
        setReviewForm({ rating: 5, comment: "" });
        router.refresh(); // সার্ভার কম্পোনেন্ট ডাটা রি-ফেচ করবে
      } else {
        toast.error(data.message || "রিভিউ দিতে ব্যর্থ হয়েছেন।");
      }
    } catch {
      toast.error("রিভিউ সাবমিট করতে সমস্যা হয়েছে।");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const [formData, setFormData] = useState({
    title: '', author: '', category: '', price: '', description: '', image: ''
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        category: book.category || '',
        price: book.price || '',
        description: book.description || '',
        image: book.image || ''
      });
    }
  }, [book]);

  if (!book) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg font-bold text-slate-500">Book data not found.</p>
      </div>
    );
  }

  const { _id, title, author, category, description, price, image, userId, status } = book;
  const isLibrarianOwner = session?.user?.id === userId;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const data = await bookDetailsUpdate(_id, formData);
      if (data?.success) {
        toast.success("Book details updated successfully! 🎉");
        setBook(prev => ({ ...prev, ...formData }));
        setIsEditModalOpen(false);
        router.refresh();
      } else {
        toast.error(data?.message || "Failed to update book.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStatusToggle = async () => {
    const isPublished = status === "Published";
    const nextStatus = isPublished ? "Unpublished" : "Published";
    const confirmed = window.confirm(`Are you sure you want to make this book ${nextStatus === "Published" ? "Published" : "Unpublished"}?`);
    if (!confirmed) return;

    setIsProcessing(true);
    const oldStatus = book.status;
    setBook(prev => ({ ...prev, status: nextStatus }));

    try {
      const result = await booksUpdate(_id, nextStatus);
      if (!result?.success) throw new Error(result?.message || "Status update failed");
      toast.success(`Book status updated to ${nextStatus === "Published" ? "Published" : "Unpublished"}! 🎉`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Could not update status. Rolling back...");
      setBook(prev => ({ ...prev, status: oldStatus }));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteBook = async () => {
    const confirmed = window.confirm(`Are you sure you want to permanently delete "${title}"?`);
    if (!confirmed) return;
    setIsProcessing(true);
    try {
      const data = await bookDelete(_id); 
      if (data?.success) {
        toast("Book removed from catalog! 💥");
        router.refresh(); 
        router.push("/dashboard/librarian/inventory");
      } else {
        toast.error(data?.message || "Failed to delete from server.");
      }
    } catch (error) {
      console.error("Delete function error:", error);
      toast.error("Failed to delete.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOrderBook = async () => {
    if (!session) {
      toast.error("অর্ডার করতে দয়া করে প্রথমে লগইন করুন।");
      return;
    }
    setIsProcessing(true);
    try {
      const res = await orderBooks({ bookId: _id, totalPrice: price });
      if (res?.success && res?.url) {
        window.location.href = res.url; 
      } else {
        toast.error(res?.message || "Stripe Checkout সেশন তৈরি করতে ব্যর্থ হয়েছে।");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!session) {
      toast("উইশলিস্টে যুক্ত করতে প্রথমে লগইন করুন।");
      return;
    }
    setIsProcessing(true);
    try {
      const res = await wishlistCreate(_id);
      if (res?.success) {
        toast.success("Added to wishlist! ❤️");
      } else {
        toast.error(res?.message || "Could not add to wishlist.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding to wishlist.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="w-full bg-white px-6 py-12 lg:px-8 relative">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 items-start">
          
          <div className="md:col-span-5 flex flex-col items-center bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <div className="relative w-full max-w-[320px] aspect-[3/4] shadow-2xl rounded-lg overflow-hidden">
              <img src={image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600"} alt={title} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">{category}</span>
            <h1 className="mt-2 text-3xl font-black text-[#0F172A] tracking-tight sm:text-4xl">{title}</h1>
            <p className="mt-2 text-lg font-medium text-slate-600">by <span className="font-bold text-[#0F172A]">{author}</span></p>

            <div className="mt-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-[#0F172A]">${parseFloat(price || 0).toFixed(2)}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${status === 'Published' || status === 'Available' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                  {status}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed bg-slate-50/60 border border-slate-100 p-4 rounded-xl">{description}</p>
            </div>

            {isLibrarianOwner ? (
              <div className="mt-6 p-4 border border-amber-200 bg-amber-50/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#775a19]">⚙️ Librarian Management Panel</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <button onClick={() => setIsEditModalOpen(true)} className="flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-lg py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
                    <FaPenToSquare className="text-blue-500" /> Edit Catalog
                  </button>
                  <StatusToggleButton status={status} onStatusToggle={handleStatusToggle} isProcessing={isProcessing} />
                  <button onClick={handleDeleteBook} disabled={isProcessing} className="flex items-center justify-center gap-2 bg-rose-50 border border-rose-100 rounded-lg py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-100 transition shadow-sm">
                    <FaTrashCan /> Delete Item
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button onClick={handleOrderBook} disabled={(status !== "Published" && status !== "Available") || isProcessing} className="flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white py-3.5 rounded-xl font-bold text-sm transition shadow-sm disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed">
                  <FaTruckMoving /> {(status === "Published" || status === "Available") ? "Borrow / Order Now" : "Not Available"}
                </button>
                <button onClick={handleAddToWishlist} disabled={isProcessing} className="flex items-center justify-center gap-2 bg-transparent hover:bg-slate-50 border-2 border-slate-200 text-slate-700 py-3.5 rounded-xl font-bold text-sm transition">
                  <FaHeart className="text-rose-500" /> Add to Wishlist
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 💬 রিভিউ সেকশন */}
        <div className="mt-16 max-w-4xl border-t border-slate-100 pt-10">
          <h2 className="text-xl font-black text-[#0F172A] tracking-tight flex items-center gap-2">
            <FaRegCommentDots className="text-lg text-slate-400" /> Reader Reviews ({reviewsList?.length || 0})
          </h2>

          {session && hasPurchased && !isLibrarianOwner && (
            <div className="mt-6 p-5 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wider text-amber-800 mb-3">✍️ আপনার রিভিউ লিখুন</p>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <button type="button" key={star} onClick={() => setReviewForm(p => ({ ...p, rating: star }))}>
                    <FaStar className={star <= reviewForm.rating ? "text-amber-500 fill-current text-xl" : "text-slate-200 text-xl"} />
                  </button>
                ))}
              </div>
              <textarea value={reviewForm.comment} onChange={e => setReviewForm(p => ({ ...p, comment: e.target.value }))} placeholder="আপনার মতামত লিখুন..." className="w-full border border-slate-200 bg-white rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300" rows={3} />
              <button onClick={handleReviewSubmit} disabled={isSubmittingReview} className="mt-2 bg-[#0F172A] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1E293B] transition disabled:opacity-50">
                {isSubmittingReview ? "সাবমিট হচ্ছে..." : "রিভিউ দিন"}
              </button>
            </div>
          )}

          {session && !hasPurchased && !isLibrarianOwner && (
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center">
              <p className="text-sm text-slate-500 font-medium">🔒 শুধুমাত্র এই বইয়ের ভেরিফাইড ক্রেতারাই রিভিউ দিতে পারবেন।</p>
            </div>
          )}

          {session && isLibrarianOwner && (
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center">
              <p className="text-sm text-slate-500 font-medium">🔒 এটি আপনার আপলোড করা বই। ওনাররা নিজের বইতে রিভিউ দিতে পারবেন না।</p>
            </div>
          )}

          {!session && (
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center">
              <p className="text-sm text-slate-500 font-medium">🔒 রিভিউ বা কমেন্ট করতে দয়া করে প্রথমে লগইন করুন।</p>
            </div>
          )}

          {/* রিভিউজ ম্যাপ লুপ */}
          <div className="mt-8 space-y-6">
            {isLoadingReviews ? (
              <p className="text-sm font-bold text-slate-400 animate-pulse">Loading reviews...</p>
            ) : reviewsList && reviewsList.length > 0 ? (
              reviewsList.map((review, idx) => (
                <div key={review._id || idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100/80 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800">{review.userName || review.user?.name || "Anonymous Reader"}</span>
                    <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < (review.rating || 5) ? "fill-current" : "text-slate-200"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Recent Review"}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-sm font-bold text-slate-500">এই বইটিতে এখনো কোনো রিভিউ দেওয়া হয়নি।</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* এডিট মডাল */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-black text-slate-900">Update Book</h3>
              <button onClick={() => setIsEditModalOpen(false)}><FaXmark className="text-xl" /></button>
            </div>
            <form onSubmit={handleUpdateSubmit} className="space-y-4 py-4">
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full border p-2.5 rounded-xl" placeholder="Title" required />
              <input type="text" name="author" value={formData.author} onChange={handleInputChange} className="w-full border p-2.5 rounded-xl" placeholder="Author" required />
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full border p-2.5 rounded-xl" placeholder="Price" required />
              <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full border p-2.5 rounded-xl" placeholder="Description" required />
              <button type="submit" disabled={isProcessing} className="w-full bg-[#0F172A] text-white py-3 rounded-xl font-bold">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}