"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa6";

export default function BookCard({ book }) {
  const { title, author, category, price, image, rating, reviews, badge } = book;


  const fallbackImage = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=500";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900"
    >
      {/* === ইমেজ কন্টেইনার === */}
      {/* h-[280px] বা h-[300px] ফিক্সড করে দিলে সব কার্ডের সাইজ সমান থাকবে */}
      <div className="relative h-[300px] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={image || fallbackImage}
          alt={title}
          // object-cover ব্যবহারের ফলে ছবি যেভাবে ইচ্ছা আসুক, তা ফ্রেমের সাথে সুন্দরভাবে ফিট হয়ে যাবে
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = fallbackImage; // ইমেজ লোড ফেল করলে ব্যাকআপ ইমেজ শো করবে
          }}
        />
        
        {/* ডাইনামিক ব্যাজ */}
        {badge && (
          <span className={`absolute top-4 right-4 rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-sm
            ${badge.type === "new" ? "bg-[#0F172A]" : "bg-[#D4AF37]"}`}
          >
            {badge.text}
          </span>
        )}
      </div>

      {/* === বইয়ের তথ্যাদি === */}
      <div className="flex flex-1 flex-col p-5">
        {/* ক্যাটাগরি */}
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
          {category}
        </span>

        {/* টাইটেল: line-clamp-2 দেওয়ার সুবিধা হলো টাইটেল ২ লাইনের হলেও নিচের ডিজাইন ভাঙবে না */}
        <h3 className="mt-1.5 line-clamp-2 text-base font-bold text-[#0F172A] group-hover:text-[#D4AF37] transition-colors duration-200 min-h-[3rem] dark:text-slate-100">
          {title}
        </h3>

        {/* লেখক */}
        <p className="mt-0.5 line-clamp-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          {author}
        </p>

        {/* রেটিং এবং প্রাইস সেকশন */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          {/* রেটিং */}
          <div className="flex items-center gap-1">
            <div className="flex items-center text-xs text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={i < Math.floor(rating || 5) ? "text-[#D4AF37]" : "text-gray-200 dark:text-slate-700"}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              ({reviews || 0})
            </span>
          </div>

          {/* মূল্য */}
          <span className="text-base font-black text-[#0F172A] dark:text-slate-100">
            ${typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
