"use client";

import BookForm from "@/components/Deashboard/librarian/BookForm";
import { createBooks } from "@/lib/actions/books";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { MdBookmarkAdd } from "react-icons/md";

export default function AddBookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

   const { data: session } = authClient.useSession();
    const { user } = session || {};
    console.log("User Data:", user);

  // এই ফাংশনটি চাইল্ড ফর্ম থেকে সম্পূর্ণ রেডি ডাটা (imgBB লিঙ্কসহ) রিসিভ করবে
  const handleBookSubmit = async (bookData) => {
    setIsSubmitting(true);

   const finalBookData = {
      ...bookData,
      userId: user?.id,
    };
    
    console.log("Verified Final Book Data:", finalBookData);

    

    /* 
       💡 bookData-এর ভেতর এখন যা যা আছে:
       {
         title: "...",
         author: "...",
         description: "...",
         deliveryFee: 12.50,
         category: "Fiction",
         image: "https://i.ibb.co/xxxxx/image.jpg", // imgBB Hosted Link
         status: "Pending Approval" // ফিক্সড কন্ডিশন
       }
    */

    try {
       const newBooks = createBooks(finalBookData);
       if(newBooks.insertedId){
        toast.success("Book submitted successfully! Status set to 'Pending Approval'.");
       }
      toast.success("Book submitted successfully! Status set to 'Pending Approval'.");
      
    } catch (error) {
      console.error("Database submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* হেডার */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#040d1b] tracking-tight mb-1 flex items-center gap-2">
          <MdBookmarkAdd className="text-[#775a19]" /> Catalog New Acquisition
        </h1>
        <p className="text-[#45474c] text-xs">
          Register new volumes into the database repository for administrative auditing.
        </p>
      </div>

      {/* রিইউজেবল ফর্ম রেন্ডার */}
      <BookForm onSubmit={handleBookSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}