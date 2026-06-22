import React from "react";
import { MdReceiptLong, MdLayersClear, MdAlternateEmail, MdAttachMoney, MdCalendarToday } from "react-icons/md";

export default function TransactionsTable({ 
  transactions = [], 
  isLoading = false 
}) {
  
  // ⏳ লোডিং স্টেট হ্যান্ডেলার
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-10 h-10 border-4 border-[#775a19] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm text-slate-400 font-medium">Loading platform financial logs...</p>
      </div>
    );
  }

  // 📭 ফাঁকা ডেটা স্টেট হ্যান্ডেলার
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-slate-50 border border-dashed border-slate-200 rounded-full flex items-center justify-center mb-4">
          <MdLayersClear className="text-3xl text-slate-300" />
        </div>
        <h3 className="text-base font-bold text-[#040d1b] dark:text-slate-100 mb-1">No Transactions Found</h3>
        <p className="text-xs text-slate-400 max-w-xs">There are no financial records or processing logs available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* টেবিল হেডার */}
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-[#45474c] dark:text-slate-300 uppercase tracking-wider">
            <tr>
              <th className="p-4 pl-6">Transaction & Book Info</th>
              <th className="p-4">User (Buyer)</th>
              <th className="p-4">Librarian (Seller)</th>
              <th className="p-4">Amount</th>
              <th className="p-4 pr-6">Date</th>
            </tr>
          </thead>
          
          {/* টেবিল বডি */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
            {transactions.map((tx) => {
              const txId = tx.transactionId || tx._id;
              
              // আইএসও ডেট ফরম্যাট করার সুন্দর লজিক
              const formattedDate = tx.date 
                ? new Date(tx.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "N/A";

              return (
                <tr key={txId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  
                  {/* ট্রানজেকশন আইডি ও বইয়ের টাইটেল */}
                  <td className="p-4 pl-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 mt-0.5">
                        <MdReceiptLong className="text-lg" />
                      </div>
                      <div className="max-w-[220px] sm:max-w-xs">
                        <p className="font-mono text-[11px] font-bold text-[#775a19] dark:text-amber-500 tracking-tight bg-amber-50/60 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800/50 px-1.5 py-0.5 rounded inline-block">
                          ID: {txId}
                        </p>
                        <p className="font-bold text-[#040d1b] dark:text-slate-100 leading-tight mt-1 truncate" title={tx.title}>
                          {tx.title || "Unknown Catalog Item"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ইউজারের ইমেইল */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-[#45474c] dark:text-slate-300">
                      <MdAlternateEmail className="text-slate-400 text-xs shrink-0" />
                      <span className="font-medium truncate max-w-[160px]" title={tx.userEmail}>
                        {tx.userEmail}
                      </span>
                    </div>
                  </td>

                  {/* লাইব্রেরিয়ানের ইমেইল */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-[#45474c] dark:text-slate-300">
                      <MdAlternateEmail className="text-slate-400 text-xs shrink-0" />
                      <span className="font-medium truncate max-w-[160px]" title={tx.librarianEmail}>
                        {tx.librarianEmail}
                      </span>
                    </div>
                  </td>

                  {/* অ্যামাউন্ট (টাকা/ডলার) */}
                  <td className="p-4">
                    <span className="inline-flex items-center text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2.5 py-1 rounded-xl">
                      <MdAttachMoney className="text-sm -mr-0.5" />
                      {Number(tx.amount || 0).toFixed(2)}
                    </span>
                  </td>

                  {/* লেনদেনের তারিখ */}
                  <td className="p-4 pr-6">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <MdCalendarToday className="text-sm shrink-0" />
                      <span>{formattedDate}</span>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
