"use client";

import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import { FaStar, FaRegCommentDots, FaBook } from 'react-icons/fa6';
import Link from 'next/link';

export default function UserReviewsPage() {
  const { data: session } = authClient.useSession();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyReviews();
  }, [session]);

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

      {/* ─── Header ─── */}
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest text-amber-500 mb-1">
          Your opinion
        </p>
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight flex items-center gap-2">
          <FaRegCommentDots className="text-slate-300" />
          My Reviews
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          You have reviewed <span className="font-bold text-[#0F172A]">{reviews.length}</span> books so far.
        </p>
      </div>

      {/* ─── Empty State ─── */}
      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <FaBook className="text-4xl text-slate-200 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-500">No reviews yet.</p>
          <p className="text-xs text-slate-400 mt-1">Buy the book and share your opinion.</p>
          <Link
            href="/books"
            className="mt-4 inline-block bg-[#0F172A] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#1E293B] transition"
          >
            View book
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, idx) => (
            <div
              key={review._id || idx}
              className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* বইয়ের নাম ও লিংক */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <Link
                  href={`/books/${review.bookId}`}
                  className="text-sm font-black text-[#0F172A] hover:text-amber-600 transition-colors line-clamp-1"
                >
                  {review.bookTitle || "বইয়ের নাম"}
                </Link>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString('bn-BD', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })
                    : "—"}
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <FaStar
                    key={star}
                    className={star <= (review.rating || 5)
                      ? "text-amber-400 text-sm"
                      : "text-slate-200 text-sm"}
                  />
                ))}
                <span className="ml-2 text-xs font-bold text-slate-500">
                  {review.rating}/5
                </span>
              </div>

              {/* Comment */}
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}