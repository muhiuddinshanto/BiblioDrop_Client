"use client";

import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import { FaStar, FaRegCommentDots, FaBook, FaTrashCan, FaPenToSquare, FaCheck, FaXmark } from 'react-icons/fa6';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast'; // ✅ টোস্ট ইমপোর্ট করা হয়েছে

export default function UserReviewsPage() {
  const { data: session } = authClient.useSession();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // এডিট স্টেটস ট্র্যাক করার জন্য
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!session?.user) return;

    const fetchMyReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/reviews/user/${session.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${session.session?.token}`
            }
          }
        );
        const data = await res.json();
        setReviews(data?.data || []);
      } catch {
        setReviews([]);
        toast.error("Failed to load your reviews."); // ✅ এরর টোস্ট
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyReviews();
  }, [session]);

  // ─── 🗑️ DELETE REVIEW HANDLER ───
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    // টোস্ট লোডিং স্টেট
    const loadingToast = toast.loading("Deleting your review...");

    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.session?.token}`
        }
      });

      if (res.ok) {
        setReviews(prev => prev.filter(item => item._id !== reviewId));
        toast.success("Review deleted successfully!", { id: loadingToast }); // ✅ সাকসেস টোস্ট
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Failed to delete review.", { id: loadingToast }); // ✅ ফেইল টোস্ট
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Network error. Please try again.", { id: loadingToast });
    }
  };

  // ─── 📝 START EDIT MODE ───
  const startEdit = (review) => {
    setEditingId(review._id);
    setEditComment(review.comment);
    setEditRating(review.rating || 5);
  };

  // ─── 💾 SAVE/UPDATE REVIEW HANDLER ───
  const handleUpdate = async (reviewId) => {
    if (!editComment.trim()) return;
    setIsUpdating(true);
    const loadingToast = toast.loading("Saving changes...");

    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.session?.token}`
        },
        body: JSON.stringify({
          comment: editComment,
          rating: editRating
        })
      });

      if (res.ok) {
        setReviews(prev => prev.map(item => 
          item._id === reviewId 
            ? { ...item, comment: editComment, rating: editRating } 
            : item
        ));
        setEditingId(null);
        toast.success("Review updated successfully!", { id: loadingToast }); // ✅ সাকসেস টোস্ট
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Failed to update review.", { id: loadingToast }); // ✅ ফেইল টোস্ট
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Network error. Could not update.", { id: loadingToast });
    } finally {
      setIsUpdating(false);
    }
  };

  // ─── Loading Skeleton ───
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-2xl bg-slate-100 animate-pulse h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      
      {/* 👑 টোস্ট কন্টেইনার কম্পোনেন্ট */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* ─── Header ─── */}
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest text-[#C5A059] mb-1">
          Your Analytics
        </p>
        <h1 className="text-2xl font-black text-[#1A2332] tracking-tight flex items-center gap-2">
          <FaRegCommentDots className="text-slate-300" />
          My Reviews
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          You have shared feedback for <span className="font-bold text-[#1A2332]">{reviews.length}</span> books so far.
        </p>
      </div>

      {/* ─── Empty State ─── */}
      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <FaBook className="text-4xl text-slate-200 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-500">No reviews compiled yet.</p>
          <p className="text-xs text-slate-400 mt-1">Acquire literature masterpieces to unlock review curation.</p>
          <Link
            href="/books"
            className="mt-4 inline-block bg-[#1A2332] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-black transition shadow-sm"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, idx) => {
            const isEditing = editingId === review._id;

            return (
              <div
                key={review._id || idx}
                className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative group"
              >
                {/* Book Meta & Action Buttons */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <Link
                      href={`/books/${review.bookId}`}
                      className="text-sm font-black text-[#1A2332] hover:text-[#C5A059] transition-colors line-clamp-1"
                    >
                      {review.bookTitle || "Archived Manuscript"}
                    </Link>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric'
                          })
                        : "—"}
                    </span>
                  </div>

                  {/* Action Buttons Panel */}
                  {!isEditing && (
                    <div className="flex items-center gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(review)}
                        className="p-2 bg-slate-50 hover:bg-amber-50 text-slate-500 hover:text-amber-600 rounded-xl transition-colors border border-transparent hover:border-amber-100"
                        title="Edit Review"
                      >
                        <FaPenToSquare className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-xl transition-colors border border-transparent hover:border-rose-100"
                        title="Delete Review"
                      >
                        <FaTrashCan className="text-xs" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Star Rating Section */}
                <div className="flex items-center gap-0.5 mb-3">
                  {isEditing ? (
                    <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditRating(star)}
                          className="hover:scale-110 transition-transform"
                        >
                          <FaStar className={star <= editRating ? "text-amber-400 text-sm" : "text-slate-200 text-sm"} />
                        </button>
                      ))}
                      <span className="ml-1 text-[11px] font-black text-slate-500">{editRating}/5</span>
                    </div>
                  ) : (
                    <>
                      {[1, 2, 3, 4, 5].map(star => (
                        <FaStar
                          key={star}
                          className={star <= (review.rating || 5) ? "text-amber-400 text-xs" : "text-slate-200 text-xs"}
                        />
                      ))}
                      <span className="ml-1.5 text-[11px] font-bold text-slate-500">
                        {review.rating || 5}/5
                      </span>
                    </>
                  )}
                </div>

                {/* Comment Body & Editable Input */}
                {isEditing ? (
                  <div className="space-y-3 mt-2">
                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="w-full text-sm text-slate-700 bg-white rounded-xl p-3 border border-slate-200 outline-none focus:border-[#C5A059] transition-colors resize-none h-24 font-medium"
                      placeholder="Modify your feedback summary..."
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        disabled={isUpdating}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <FaXmark className="text-sm" /> Cancel
                      </button>
                      <button
                        onClick={() => handleUpdate(review._id)}
                        disabled={isUpdating || !editComment.trim()}
                        className="px-3 py-1.5 bg-[#1A2332] hover:bg-black text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors disabled:opacity-50"
                      >
                        <FaCheck className="text-xs text-[#C5A059]" /> {isUpdating ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/70 rounded-xl px-4 py-3 border border-slate-100 font-medium">
                    {review.comment}
                  </p>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}