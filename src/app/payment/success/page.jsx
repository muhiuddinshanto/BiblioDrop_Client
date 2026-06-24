"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link"; 
import { authClient } from "@/lib/auth-client";
import { MdCheckCircle, MdReceiptLong, MdArrowForward, MdHome } from "react-icons/md";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // সেশন অথবা সেশন আইডি যেকোনো একটা মিসিং থাকলে রিকোয়েস্ট আটকাবে
    if (!sessionId || !session?.session?.token) {
      // যদি সেশন লোড হওয়া শেষ হয়ে যায় কিন্তু তাও টোকেন না থাকে, তখন লোডিং ফলস হবে
      if (!isSessionLoading && !session) {
        setLoading(false);
      }
      return;
    }

    const fetchSession = async () => {
      try {
        setLoading(true);
        const token = session.session.token;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout-session/${sessionId}`,
          { headers: { authorization: `Bearer ${token}` } }
        );

        // রেসপন্স টাইপ চেক (JSON কিনা)
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          console.error("Non-JSON response received:", res.status);
          return;
        }

        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Error fetching session details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, session, isSessionLoading]);

  // ফলব্যাক ডাটা অবজেক্ট
  const transactionDetails = details || {
    orderId: "Processing...",
    amount: "—",
    paymentMethod: "Stripe / Card",
    title: "—",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 px-4 dark:bg-slate-950">

      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 rounded-3xl p-8 shadow-sm text-center space-y-6">

        {/* সাকসেস চেক আইকন */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-100 rounded-full scale-125 animate-ping opacity-20"></div>
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center text-4xl shadow-sm relative z-10">
              <MdCheckCircle />
            </div>
          </div>
        </div>

        {/* হেডিং ও সাবটাইটেল */}
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold font-serif text-[#040d1b] dark:text-slate-100 tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Thank you for your order. Your transaction has been securely processed and your catalog access is now live.
          </p>
        </div>

        {/* অর্ডার সামারি কার্ড */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-3 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-1.5 border-b border-slate-200/60 pb-2 text-[#040d1b] dark:text-slate-100 font-bold text-xs uppercase tracking-wider">
            <MdReceiptLong className="text-base text-slate-400" />
            <span>Order Summary</span>
          </div>

          {loading ? (
            <div className="py-4 text-center text-xs text-slate-400 animate-pulse">
              Loading order details...
            </div>
          ) : (
            <div className="space-y-2 text-xs font-medium">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID</span>
                <span className="text-[#040d1b] dark:text-slate-100 font-mono font-bold">{transactionDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Book</span>
                <span className="text-[#45474c] text-right max-w-[60%] truncate dark:text-slate-300">{transactionDetails.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date</span>
                <span className="text-[#45474c] dark:text-slate-300">{transactionDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Method</span>
                <span className="text-[#45474c] dark:text-slate-300">{transactionDetails.paymentMethod}</span>
              </div>
              
              <div className="border-t border-dashed border-slate-200 my-1"></div>
              
              <div className="flex justify-between items-center pt-1 text-sm">
                <span className="font-bold text-[#040d1b] dark:text-slate-100">Amount Paid</span>
                <span className="text-base font-extrabold text-emerald-600">{transactionDetails.amount}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/dashboard/user"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#040d1b] hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            Go to Dashboard <MdArrowForward className="text-sm" />
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-slate-200 text-[#45474c] hover:bg-slate-50 hover:text-[#040d1b] dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-white rounded-xl text-xs font-bold transition-all active:scale-95"
          >
            <MdHome className="text-sm" /> Back to Home
          </Link>
        </div>

      </div>

      {/* ফুটার সাপোর্ট টেক্সট */}
      <p className="text-[11px] text-slate-400 mt-6">
        Having trouble? Contact our support at{" "}
        <span className="text-[#775a19] font-semibold underline cursor-pointer">
          support@library.com
        </span>
      </p>

    </div>
  );
}