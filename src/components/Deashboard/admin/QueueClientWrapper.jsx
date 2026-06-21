"use client";

import React, { useState } from "react";
import ApprovalQueueTable from "./ApprovalQueueTable";
import { bookApprove, bookDelete } from "@/lib/actions/books";
import toast from "react-hot-toast";


export default function QueueClientWrapper({ initialBooks }) {
  const [books, setBooks] = useState(initialBooks);
  const [loading, setLoading] = useState(false); // সার্ভার থেকে ডাটা অলরেডি এসে গেছে তাই false

  // ✅ অ্যাপ্রুভ হ্যান্ডেলার (Server Action বা API Route ট্রিগার করার জন্য)
  const handleApprove = async (id) => {
    try {

      const approvedBook = await bookApprove(id, { status: "Approved" });

      if(approvedBook?.success) {
        toast.success("Book approved successfully!");
      }
     console.log("Approved Book:", approvedBook);
      console.log("Approving book with ID:", id);
      // এখানে আপনার এপিআই কল বা সার্ভার অ্যাকশন দিতে পারেন:
      // await axios.put(`/api/books/approve/${id}`);
      
      // UI থেকে ইনস্ট্যান্ট রিমুভ করা
      setBooks(prev => prev.filter(b => (b._id || b.id) !== id));
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  // ❌ ডিলিট হ্যান্ডেলার
  const handleCancel = async (id) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      try {
        console.log("Deleting book with ID:", id);
        // await axios.delete(`/api/books/${id}`);

        const deletedBook = await bookDelete(id, { status: "Rejected" });
        console.log("Deleted Book:", deletedBook);

        if(deletedBook.success){
          toast.success("Book deleted successfully!");
        }
        
        setBooks(prev => prev.filter(b => (b._id || b.id) !== id));
      } catch (error) {
        console.error("Deletion failed:", error);
      }
    }
  };

  return (
    <ApprovalQueueTable 
      books={books} 
      isLoading={loading} 
      onApprove={handleApprove} 
      onDelete={handleCancel} 
    />
  );
}