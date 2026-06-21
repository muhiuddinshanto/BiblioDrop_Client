"use client";

import React, { useState } from "react";

import { updateBookStatus, hardDeleteBook, adminBookUdateStatus, bookDelete } from "@/lib/actions/books"; // আপনার প্রজেক্টের সার্ভার অ্যাকশন বা API হেল্পার
import AllBooksTable from "./AllBooksTable";
import toast from "react-hot-toast";

export default function AllBooksClientWrapper({ initialBooks }) {
  const [books, setBooks] = useState(initialBooks);
  const [loading, setLoading] = useState(false);

  // 🔄 গ্লোবাল পাবলিশ/আনপাবলিশ স্ট্যাটাস টগল করার হ্যান্ডেলার
  const handleTogglePublish = async (id, currentPublishState) => {
    try {
      const targetStatus = currentPublishState ? "Unpublished" : "Published";
      console.log(`Setting status of book ${id} to: ${targetStatus}`);
      
      // আপনার রিয়াল সার্ভার অ্যাকশন বা API ইন্টিগ্রেশন:
      // const res = await updateBookStatus(id, { status: targetStatus });
      const res = await adminBookUdateStatus(id, { status: targetStatus });
      console.log("Response from server:", res);
      
      // ক্লায়েন্ট সাইড স্টেট আপডেট (ইনস্ট্যান্ট রেসপন্স)
      setBooks(prev => prev.map(book => 
        (book._id || book.id) === id 
          ? { ...book, status: targetStatus, isPublished: !currentPublishState } 
          : book
      ));
      
      toast.success(`Book has been successfully ${targetStatus.toLowerCase()}!`);
    } catch (error) {
      console.error("Failed to alter system publication status:", error);
    }
  };

  // ❌ ডেটাবেজ থেকে বই চিরতরে মুছে ফেলার আলটিমেট কন্ট্রোল হ্যান্ডেলার
  const handleHardDelete = async (id) => {
    if (confirm("CRITICAL WARNING: Are you sure you want to COMPLETELY WIPE this book from the system? This deletes all files and records forever.")) {
      try {
        console.log("Purging book from entire platform database:", id);
        const bookDeleted = await bookDelete(id, { status: "Deleted" });
        if(bookDeleted?.success) toast.success("Book deleted successfully!");
        console.log("Deleted Book:", bookDeleted);
        
        // আপনার রিয়াল ডিলিট অ্যাকশন:
        // await hardDeleteBook(id);
        
        setBooks(prev => prev.filter(book => (book._id || book.id) !== id));
        toast.success("The catalog item was entirely purged from the system.");
      } catch (error) {
        console.error("Critical error during database wipe:", error);
      }
    }
  };

  return (
    <AllBooksTable 
      books={books} 
      isLoading={loading} 
      onTogglePublish={handleTogglePublish} 
      onDelete={handleHardDelete} 
    />
  );
}