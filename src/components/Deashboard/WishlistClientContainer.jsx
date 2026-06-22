"use client";

import React, { useState } from 'react';
import WishlistCard from "./WishlistCard";
import toast from 'react-hot-toast';
import { wishlistDelete } from '@/lib/actions/wishlist';
import { useRouter } from 'next/navigation';

export default function WishlistClientContainer({ initialItems }) {

  const router = useRouter();
  // উইশলিস্ট আইটেমগুলোকে স্টেটে রাখা, যাতে ডিলিট করলে ইনস্ট্যান্ট স্ক্রিন থেকে হাওয়া হয়ে যায়!
  const [items, setItems] = useState(initialItems);

 const handleViewBookDetails = (book) => {
  // এখানে আপনি নেভিগেট করে সরাসরি বইটির ডিটেইল পেজে নিয়ে যেতে পারেন
  console.log("Book added to cart:", book);
  router.push(`/books/${book.bookId}`);
};  

 const handleDelete = async (id) => {
  console.log("Deleting Item ID:", id);
  
  // UI থেকে সাথে সাথে সরিয়ে দেওয়া (Optimistic UI)
  const previousItems = [...items];
  setItems(prevItems => prevItems.filter(item => (item._id?.$oid || item._id) !== id));
  
  try {
    const data = await wishlistDelete(id, {bookId: id});
    if (data.success) {
      toast.success("Removed from wishlist!");
    } else {
      throw new Error("Failed to delete");
    }
  } catch (error) {
    console.error("Failed to delete item from wishlist", error);
    toast.error("Could not remove item. Rolling back...");
    setItems(previousItems); // কোনো কারণে সার্ভারে ফেইল করলে আগের অবস্থায় ব্যাক করবে
  }
};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <WishlistCard 
          key={item._id?.$oid || item._id} 
          item={item}
          onViewBookDetails={handleViewBookDetails}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
