"use client";

import { orderBooks } from '@/lib/actions/order';
import { wishlistCreate } from '@/lib/actions/wishlist';
import { booksUpdate, bookDetailsUpdate } from '@/lib/actions/books'; // ⚙️ দুটো অ্যাকশনই আনা হলো
import { authClient } from '@/lib/auth-client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { 
  FaStar, FaTruckMoving, FaHeart, FaRegCommentDots, 
  FaCircleUser, FaPenToSquare, FaTrashCan, FaEyeSlash, FaXmark 
} from 'react-icons/fa6';
import toast from 'react-hot-toast';

export default function BookDetailsContent({ book: initialBook, reviewsData = [], isLoadingReviews = false }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  
  // 🔄 বইয়ের লাইভ রিয়েল-টাইম স্টেট (যাতে আপডেট সাবমিট করলেই স্ক্রিন চেঞ্জ হয়)
  const [book, setBook] = useState(initialBook);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // 📋 মডাল ও এডিট ফর্ম স্টেট
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    price: '',
    description: '',
    image: ''
  });

  // ডাটাবেজ বা ইনিশিয়াল ডাটা লোড হলে স্টেট সিঙ্ক
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

  const { 
    _id, title, author, category, description, price, 
    image, rating, reviews, badge, userId, status, date 
  } = book;
  
  const fallbackImage = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600";
  const isLibrarianOwner = session?.user?.id === userId;
  const isDeliveryDisabled = status === "Checked Out" || isLibrarianOwner || isProcessing;
  const deliveryFee = 15.00; 

  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    const parsedDate = dateInput.$date ? new Date(dateInput.$date) : new Date(dateInput);
    return parsedDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }));
  };

  // 💾 ১. বইয়ের ডিটেইলস আপডেট মেথড (যেমনটা ড্যাশবোর্ডে করেছ)
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // অপটিমিস্টিক রোলব্যাকের জন্য কারেন্ট স্টেট কপি
    const oldBook = { ...book };

    try {
      // এডিটেবল ফিল্ডগুলো আলাদা করা হলো (ID, UserID, Status বাদ দিয়ে)
      const { title, author, category, price, description, image } = formData;
      const editableFields = { title, author, category, price, description, image };

      // ড্যাশবোর্ডের মতো bookDetailsUpdate অ্যাকশন দিয়ে আপডেট
      const result = await bookDetailsUpdate(_id, editableFields);

      if (result?.success) {
        toast.success("Book metadata updated successfully! 📚");
        
        // রিঅ্যাক্টিভলি স্ক্রিনের মেইন স্টেট আপডেট করা হলো
        setBook(prev => ({
          ...prev,
          ...editableFields
        }));
        
        setIsEditModalOpen(false);
        router.refresh();
      } else {
        throw new Error(result?.message || "Update request failed");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error.message || "Failed to update. Rolling back changes...");
    } finally {
      setIsProcessing(false);
    }
  };

  // 🔄 ২. স্ট্যাটাস আনপাবলিশ করার মেথড
  const handleUnpublishBook = async () => {
    const confirmed = window.confirm("Are you sure you want to unpublish this book?");
    if (!confirmed) return;

    setIsProcessing(true);
    try {
      const nextStatus = "Pending Approval";
      const result = await booksUpdate(_id, nextStatus);

      if (result?.success) {
        toast.success("Book has been unpublished!");
        setBook(prev => ({ ...prev, status: nextStatus }));
        router.refresh();
      } else {
        toast.error("Failed to unpublish book catalog.");
      }
    } catch (error) {
      console.error("Could not update status:", error);
      toast.error("Could not update status.");
    } finally {
      setIsProcessing(false);
    }
  };

  // 🚚 ৩. ডেলিভারি রিকোয়েস্ট মেথড
  const handleDelivery = async () => {
    if (!session?.user?.id) {
      toast.error("Please login first");
      return;
    }
    setIsProcessing(true);
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: { title, price: price || deliveryFee, image, author, category, userId },
          userId: session?.user?.id, 
          BookId: _id,                        
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else toast.error("Payment failed");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ❤️ ৪. উইশলিস্ট মেথড
  const handleWishlist = async () => {
    if (!session?.user?.id) {
      toast.error("Please login first!");
      router.push(`/login?redirect=/books/${_id}`);
      return;
    }
    try {
      const res = await wishlistCreate({ BookId: _id, title, author, category, price, image, userId: session?.user?.id });
      if (res?.insertedId) toast.success("Successfully added to Wishlist! ❤️");
      else toast.error("Already exists or something went wrong.");
    } catch (error) {
      toast.error("Failed to connect to the server.");
    }
  };

  // 🗑️ ৫. পার্মানেন্ট ডিলিট মেথড
  const handleDeleteBook = async () => {
    const confirmed = window.confirm(`Are you sure you want to permanently delete "${title}"?`);
    if (!confirmed) return;
    setIsProcessing(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/books/${_id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Book removed from catalog!");
        router.push("/dashboard/librarian/manage-inventory");
      }
    } catch (error) {
      toast.error("Failed to delete.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="w-full bg-white px-6 py-12 lg:px-8 relative">
      <div className="mx-auto max-w-6xl">
        
        {/* === প্রথম পার্ট: বইয়ের বিবরণ এবং মেইন ইনফো === */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 items-start">
          
          {/* === বাম পাশ: বইয়ের কভার ইমেজ === */}
          <div className="md:col-span-5 flex flex-col items-center bg-slate-50 rounded-2xl p-8 border border-slate-100">
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
            
            <div className="w-full max-w-[320px] mt-6 space-y-2 border-t border-slate-200/60 pt-4 text-xs font-medium text-slate-500">
              <div className="flex justify-between">
                <span>Status:</span> 
                <span className={`font-bold ${status === "Available" ? "text-emerald-600" : "text-amber-600"}`}>
                  {status || "Available"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date Added:</span> 
                <span className="font-semibold text-slate-700">{formatDate(date)}</span>
              </div>
            </div>
          </div>

          {/* === ডান পাশ: বইয়ের বিবরণ ও অ্যাকশন বাটন === */}
          <div className="md:col-span-7 flex flex-col h-full justify-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
              {category}
            </span>

            <h1 className="mt-2 text-3xl font-black text-[#0F172A] tracking-tight sm:text-4xl">
              {title}
            </h1>

            <p className="mt-2 text-lg font-medium text-slate-600">
              by <span className="font-bold text-[#0F172A]">{author}</span>
            </p>

            <div className="mt-4 flex items-center gap-3 border-b border-slate-100 pb-6">
              <div className="flex items-center text-sm text-[#D4AF37] gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(rating || 5) ? "text-[#D4AF37]" : "text-gray-200"} />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-500">
                {rating || 5}.0 ({reviews || 0} customer reviews)
              </span>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-black text-[#0F172A]">
                  ${typeof price === 'number' ? price.toFixed(2) : parseFloat(price || 0).toFixed(2)}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  + ${deliveryFee.toFixed(2)} Estimated Delivery Fee
                </span>
              </div>
              
              <p className="mt-3 text-sm text-slate-600 leading-relaxed bg-slate-50/60 border border-slate-100 p-4 rounded-xl">
                {description || "No description provided for this premium scholarly volume."}
              </p>
            </div>

            {/* === অ্যাকশন বাটনসমূহ === */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                className={`flex-1 flex items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm font-bold text-white transition-all shadow-sm
                  ${isDeliveryDisabled 
                    ? "bg-slate-300 cursor-not-allowed text-slate-500 shadow-none" 
                    : "bg-[#0F172A] hover:bg-[#1E293B] active:scale-[0.98]"}`}
                onClick={handleDelivery}
                disabled={isDeliveryDisabled}
              >
                <FaTruckMoving className={`text-lg ${isDeliveryDisabled ? "text-slate-400" : "text-[#D4AF37]"}`} />
                {status === "Checked Out" ? "Currently Checked Out" : isLibrarianOwner ? "Delivery Disabled (Your Book)" : "Request Delivery"}
              </button>

              <button 
                className="flex items-center justify-center gap-3 rounded-xl border-2 border-slate-200 bg-transparent px-6 py-4 text-sm font-bold text-[#0F172A] hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all"
                onClick={handleWishlist}
              >
                <FaHeart className="text-base text-rose-500" /> Add to Wishlist
              </button>
            </div>

            {/* 🛠️ ─── LIBRARIAN CONTROLS PANEL ─── */}
            {isLibrarianOwner && (
              <div className="mt-6 p-4 border border-amber-200 bg-amber-50/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#775a19] flex items-center gap-1.5">
                    ⚙️ Librarian Management Panel
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">Owner View</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-lg py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-sm"
                  >
                    <FaPenToSquare className="text-blue-500" /> Edit Catalog
                  </button>
                  <button 
                    onClick={handleUnpublishBook}
                    className="flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-lg py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-amber-700 transition shadow-sm"
                  >
                    <FaEyeSlash className="text-amber-500" /> Unpublish
                  </button>
                  <button 
                    onClick={handleDeleteBook}
                    className="flex items-center justify-center gap-2 bg-rose-50 border border-rose-100 rounded-lg py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-100 transition shadow-sm"
                  >
                    <FaTrashCan /> Delete Item
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* === রিভিউ সেকশন === */}
        <div className="mt-16 border-t border-slate-100 pt-10">
          {/* আপনার রিভিউ সেকশনের আগের কোড এখানে থাকবে */}
        </div>

      </div>

      {/* 📋 ─── DYNAMIC EDIT MODAL BACKDROP & BODY ─── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
            
            {/* মডাল হেডার */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900">Update Book Catalog</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <FaXmark className="text-xl" />
              </button>
            </div>

            {/* মডাল ফর্ম বডি */}
            <form onSubmit={handleUpdateSubmit} className="space-y-4 py-4 overflow-y-auto pr-1 flex-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Book Title</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleInputChange} required
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Author</label>
                  <input 
                    type="text" name="author" value={formData.author} onChange={handleInputChange} required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Price ($)</label>
                  <input 
                    type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Category</label>
                <input 
                  type="text" name="category" value={formData.category} onChange={handleInputChange} required
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Cover Image URL</label>
                <input 
                  type="url" name="image" value={formData.image} onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Description</label>
                <textarea 
                  name="description" rows="4" value={formData.description} onChange={handleInputChange} required
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-slate-900 focus:outline-none resize-none"
                ></textarea>
              </div>

              {/* ফুটার অ্যাকশন বাটনসমূহ */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" disabled={isProcessing}
                  className="flex-1 rounded-xl bg-[#0F172A] py-3 text-sm font-bold text-white hover:bg-slate-800 transition disabled:bg-slate-400"
                >
                  {isProcessing ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </section>
  );
}