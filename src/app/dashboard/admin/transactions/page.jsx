// app/dashboard/admin/transactions/page.jsx
import TransactionsTable from "@/components/Deashboard/admin/TransactionsTable";
import { transactionsList } from "@/lib/api/order";
import React from "react";

import { MdMonetizationOn } from "react-icons/md";

export default async function TransactionsPage() {
  


  const trtransactionsData = await transactionsList();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#040d1b] dark:text-slate-100 tracking-tight mb-1 flex items-center gap-2">
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
