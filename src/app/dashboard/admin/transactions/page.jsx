// app/dashboard/admin/transactions/page.jsx
import TransactionsTable from "@/components/Deashboard/admin/TransactionsTable";
import { transactionsList } from "@/lib/api/order";
import React from "react";

import { MdMonetizationOn } from "react-icons/md";

export default async function TransactionsPage() {
  // আপনার রিয়াল API বা ডাটাবেজ থেকে ডাটা ফোল্ডার স্ট্রাকচার তুলে আনুন
  // const data = await getAllTransactions(); 
  const dummyTransactions = [
    {
      _id: "6a37a56b8768e366ea8ec21a",
      title: "Beyond the Mind: A Modern Insight",
      status: "pending",
      date: "2026-06-21T08:48:43.767Z",
      transactionId: "6a37a56b8768e366ea8ec21a",
      userEmail: "dmxxtremet20@gmail.com",
      librarianEmail: "meherin.sultana@gmail.com",
      amount: 28
    }
  ];


  const trtransactionsData = await transactionsList();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#040d1b] tracking-tight mb-1 flex items-center gap-2">
          <MdMonetizationOn className="text-[#775a19]" /> Global Audit Logs
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Real-time statement of all transactions processed between Users and Librarians platform-wide.
        </p>
      </div>

      {/* রিইউজেবল টেবিল কম্পোনেন্ট কল */}
      <TransactionsTable transactions={trtransactionsData} isLoading={false} />
    </div>
  );
}