"use client";

import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import { FaStar, FaRegCommentDots, FaBook, FaTrashCan, FaPenToSquare, FaCheck, FaXmark } from 'react-icons/fa6';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { reviewsByUserId } from '@/lib/api/reviews';
import { reviewDelete, reviewUpdate } from '@/lib/actions/reviews';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export default function UserReviewsPage() {
  const { data: session } = authClient.useSession();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!session?.user) return;

    const fetchMyReviews = async () => {
      try {
       
        const data = await reviewsByUserId(session.user.id);
        setReviews(data?.data || []);
      } catch {
        setReviews([]);
        toast.error("Failed to load your reviews."); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyReviews();
  }, [session]);

  //  DELETE REVIEW HANDLER 
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    
    const loadingToast = toast.loading("Deleting your review...");

    try {
      const res = await reviewDelete(reviewId,{ status: "Deleted" });

      if (res.ok) {
        setReviews(prev => prev.filter(item => item._id !== reviewId));
        toast.success("Review deleted successfully!", { id: loadingToast }); 
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Failed to delete review.", { id: loadingToast }); 
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Network error. Please try again.", { id: loadingToast });
    }
  };

 
  const startEdit = (review) => {
    setEditingId(review._id);
    setEditComment(review.comment);
    setEditRating(review.rating || 5);
  };

  
  const handleUpdate = async (reviewId) => {
    if (!editComment.trim()) return;
    setIsUpdating(true);
    const loadingToast = toast.loading("Saving changes...");

    try {
      const res = await reviewUpdate(reviewId, { comment: editComment, rating: editRating });

      if (res.ok) {
        setReviews(prev => prev.map(item => 
          item._id === reviewId 
            ? { ...item, comment: editComment, rating: editRating } 
            : item
        ));
        setEditingId(null);
        toast.success("Review updated successfully!", { id: loadingToast }); // âœ… à¦¸à¦¾à¦•à¦¸à§‡à¦¸ à¦Ÿà§‹à¦¸à§à¦Ÿ
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Failed to update review.", { id: loadingToast }); // âœ… à¦«à§‡à¦‡à¦² à¦Ÿà§‹à¦¸à§à¦Ÿ
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Network error. Could not update.", { id: loadingToast });
    } finally {
      setIsUpdating(false);
    }
  };

  // â”€â”€â”€ Loading Skeleton â”€â”€â”€
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-2xl bg-slate-100 animate-pulse h-32 dark:bg-slate-900" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      
      {/* ðŸ‘‘ à¦Ÿà§‹à¦¸à§à¦Ÿ à¦•à¦¨à§à¦Ÿà§‡à¦‡à¦¨à¦¾à¦° à¦•à¦®à§à¦ªà§‹à¦¨à§‡à¦¨à§à¦Ÿ */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* â”€â”€â”€ Header â”€â”€â”€ */}
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest text-[#C5A059] mb-1">
          Your Analytics
        </p>
        <h1 className="text-2xl font-black text-[#1A2332] dark:text-slate-100 tracking-tight flex items-center gap-2">
          <FaRegCommentDots className="text-slate-300" />
          My Reviews
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          You have shared feedback for <span className="font-bold text-[#1A2332] dark:text-slate-200">{reviews.length}</span> books so far.
        </p>
      </div>

      {/* â”€â”€â”€ Empty State â”€â”€â”€ */}
      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 dark:bg-slate-900">
          <FaBook className="text-4xl text-slate-200 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">No reviews compiled yet.</p>
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
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative group dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Book Meta & Action Buttons */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <Link
                      href={`/books/${review.bookId}`}
                      className="text-sm font-black text-[#1A2332] dark:text-slate-100 hover:text-[#C5A059] transition-colors line-clamp-1"
                    >
                      {review.bookTitle || "Archived Manuscript"}
                    </Link>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric'
                          })
                        : "â€”"}
                    </span>
                  </div>

                  {/* Action Buttons Panel */}
                  {!isEditing && (
                    <div className="flex items-center gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(review)}
                        className="p-2 bg-slate-50 hover:bg-amber-50 text-slate-500 dark:text-slate-400 hover:text-amber-600 rounded-xl transition-colors border border-transparent hover:border-amber-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-amber-900/60 dark:hover:bg-amber-950/30"
                        title="Edit Review"
                      >
                        <FaPenToSquare className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-500 dark:text-slate-400 hover:text-rose-600 rounded-xl transition-colors border border-transparent hover:border-rose-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-rose-900/60 dark:hover:bg-rose-950/30"
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
                    <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800 dark:bg-slate-950">
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
                      <span className="ml-1 text-[11px] font-black text-slate-500 dark:text-slate-400">{editRating}/5</span>
                    </div>
                  ) : (
                    <>
                      {[1, 2, 3, 4, 5].map(star => (
                        <FaStar
                          key={star}
                          className={star <= (review.rating || 5) ? "text-amber-400 text-xs" : "text-slate-200 text-xs"}
                        />
                      ))}
                      <span className="ml-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
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
                      className="w-full text-sm text-slate-700 bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 outline-none focus:border-[#C5A059] transition-colors resize-none h-24 font-medium dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      placeholder="Modify your feedback summary..."
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        disabled={isUpdating}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
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
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/70 rounded-xl px-4 py-3 border border-slate-100 font-medium dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300">
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
