"use client";

import React, { useState } from 'react';
import WishlistCard from "./WishlistCard";

export default function WishlistClientContainer({ initialItems }) {
  // উইশলিস্ট আইটেমগুলোকে স্টেটে রাখা, যাতে ডিলিট করলে ইনস্ট্যান্ট স্ক্রিন থেকে হাওয়া হয়ে যায়!
  const [items, setItems] = useState(initialItems);

  const handleAddToCart = (book) => {
    console.log("Adding to Cart:", book);
    // এখানে আপনার কার্ট কন্টেক্সট বা রিডাক্সের অ্যাকশন ট্রিগার করুন
    alert(`${book.title} added to cart!`);
  };

  const handleDelete = async (id) => {
    console.log("Deleting Item ID:", id);
    
    // UI থেকে সাথে সাথে সরানোর জন্য (Optimistic UI update)
    setItems(prevItems => prevItems.filter(item => (item._id?.$oid || item._id) !== id));
    
    try {
      // এখানে আপনার ব্যাকএন্ড ডিলিট API কল করুন:
      // await fetch(`/api/wishlist/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error("Failed to delete item from wishlist", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <WishlistCard 
          key={item._id?.$oid || item._id} 
          item={item}
          onAddToCart={handleAddToCart}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}