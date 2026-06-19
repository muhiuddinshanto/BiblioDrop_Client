"use client";

import EditBookModal from "@/components/Deashboard/librarian/EditBookModal";
import InventoryTable from "@/components/Deashboard/librarian/InventoryTable";
import React, { useState } from "react";


import { MdInventory } from "react-icons/md";

const DUMMY_INVENTORY = [
  {
    _id: "6a3522bbbd84aadb80dc33b0",
    title: "Echoes of Renaissance",
    author: "Julian Fairchild",
    category: "History",
    deliveryFee: 4.50,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=500",
    status: "Pending Approval",
    description: "An archival take on cultural shifts."
  },
  {
    _id: "6a3522bbbd84aadb80dc33b1",
    title: "The Silent Alchemist",
    author: "Sarah Jenkins",
    category: "Fiction",
    deliveryFee: 5.00,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600",
    status: "Published",
    description: "A thrilling tale of chemistry and magic."
  }
];

export default function ManageInventoryPage() {
  const [books, setBooks] = useState(DUMMY_INVENTORY);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // 💡 HeroUI এর হুক বাদ দিয়ে রিয়েক্টের স্ট্রেটফরোয়ার্ড স্টেট ব্যবহার করা হলো
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // ১. টেবিলে এডিট বাটনে চাপ দিলে এই ফাংশন ফায়ার হবে
  const handleEditClick = (book) => {
    setSelectedBook(book); 
    setIsModalOpen(true); // মডাল ওপেন হবে
  };

  // ২. মডাল ফর্ম থেকে এডিটেড ডাটা রিসিভ ও ব্যাকএন্ডে পাঠানোর ফাংশন
  const handleBookUpdate = async (updatedBookData) => {
    setIsUpdating(true);
    console.log("Pushing Updated Book to Server Actions:", updatedBookData);

    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === updatedBookData._id ? { ...book, ...updatedBookData } : book
      )
    );

    try {
      // 🚀 আপনার সার্ভার অ্যাকশন কল করুন:
      // await updateBookAction(updatedBookData);
      
      setIsModalOpen(false); // কাজ সফল হলে মডাল ক্লোজ
      alert("Archival data synced and updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusToggle = (id, nextStatus) => {
    setBooks((prev) => prev.map((b) => b._id === id ? { ...b, status: nextStatus } : b));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete book?")) {
      setBooks((prev) => prev.filter((b) => b._id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#040d1b] tracking-tight mb-1 flex items-center gap-2">
          <MdInventory className="text-[#775a19]" /> Manage Book Inventory
        </h1>
      </div>

      {/* ইনভেন্টরি টেবিল */}
      <InventoryTable 
        books={books}
        onEdit={handleEditClick} 
        onDelete={handleDelete}
        onStatusToggle={handleStatusToggle}
        isUpdating={isUpdating}
      />

      {/* 💡 ডাইনামিক এডিট মডাল */}
      <EditBookModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen} // রিয়েক্টের নরমাল সেট-স্টেট ফাংশন পাস করে দেওয়া হলো
        bookData={selectedBook}
        onUpdate={handleBookUpdate}
        isUpdating={isUpdating}
      />

    </div>
  );
}