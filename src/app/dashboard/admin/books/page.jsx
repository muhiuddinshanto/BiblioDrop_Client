import React from "react";
import { MdImportContacts, MdMenuBook, MdCloudOff, MdCheckCircle } from "react-icons/md";

import AllBooksClientWrapper from "@/components/Deashboard/admin/AllBooksClientWrapper";
import { getBooks } from "@/lib/api/books";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";


async function fetchPlatformCatalog() {
  try {
    // ডাটাবেজ বা ব্যাকএন্ড থেকে সব বই নিয়ে আসার কোড:
    const res = await getBooks();
    return res || [];
  } catch (error) {
    console.error("Failed to fetch global catalog on server:", error);
    return [];
  }
}

export default async function ManageAllBooksPage() {

  const user = await getUserSession();
      const admin = user?.role === "admin";
  
      if(!admin){
       redirect('/unauthorized');
      }
  // সার্ভার সাইডেই ডেটা একবারে রেন্ডার হয়ে আসবে
  const platformBooks = await fetchPlatformCatalog();

  // 📊 অ্যাডমিন ড্যাশবোর্ডের জন্য কুইক কাউন্টার স্ট্যাটস
  const totalBooks = platformBooks.length;
  const liveBooks = platformBooks.filter(b => b.status?.toLowerCase() === "published" || b.isPublished === true).length;
  const unpublishedBooks = totalBooks - liveBooks;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* হেডার সেকশন */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#040d1b] dark:text-slate-100 tracking-tight mb-1 flex items-center gap-2">
          <MdImportContacts className="text-[#775a19]" /> Manage All Books
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Master administrative override. Control global status metrics, forcefully unpublish listings, or permanently drop entities from the centralized architecture.
        </p>
      </div>

      {/* 📊 বুকস স্ট্যাটস কুইক ওভারভিউ মিনি-কার্ডস */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Catalog Size</p>
            <p className="text-xl font-bold text-[#040d1b] dark:text-slate-100 mt-0.5">{totalBooks} Items</p>
          </div>
          <MdMenuBook className="text-xl text-slate-400" />
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-500">Live / Active</p>
            <p className="text-xl font-bold text-emerald-700 mt-0.5">{liveBooks} Books</p>
          </div>
          <MdCheckCircle className="text-xl text-emerald-400" />
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-rose-500">Forcibly Hidden</p>
            <p className="text-xl font-bold text-rose-700 mt-0.5">{unpublishedBooks} Books</p>
          </div>
          <MdCloudOff className="text-xl text-rose-400" />
        </div>
      </div>

      {/* ক্লায়েন্ট র‍্যাপার ও মূল ডেটা টেবিল */}
      <div className="pt-2">
        <AllBooksClientWrapper initialBooks={platformBooks} />
      </div>

    </div>
  );
}
