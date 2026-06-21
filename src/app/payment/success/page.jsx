"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link"; 
import { authClient } from "@/lib/auth-client";
import { MdCheckCircle, MdReceiptLong, MdArrowForward, MdHome } from "react-icons/md";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { data: session } = authClient.useSession();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) { setLoading(false); return; }
    if (!session) return;

    const fetchSession = async () => {
      try {
        const token = session?.session?.token;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout-session/${sessionId}`,
          { headers: { authorization: `Bearer ${token}` } }
        );

        // ✅ HTML response এলে যেন ফ্রন্টএন্ড crash না করে, তার জন্য কন্টেন্ট-টাইপ চেক
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
  }, [sessionId, session]);

  // এপিআই ডাটা লোড হওয়ার আগে বা ফেইল করলে ফলব্যাক ডাটা অবজেক্ট
  const transactionDetails = details || {
    orderId: "Processing...",
    amount: "—",
    paymentMethod: "Stripe / Card",
    title: "—",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 px-4">

      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-center space-y-6">

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
          <h1 className="text-2xl font-bold font-serif text-[#040d1b] tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Thank you for your order. Your transaction has been securely processed and your catalog access is now live.
          </p>
        </div>

        {/* অর্ডার সামারি কার্ড */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-3">
          <div className="flex items-center gap-1.5 border-b border-slate-200/60 pb-2 text-[#040d1b] font-bold text-xs uppercase tracking-wider">
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
                <span className="text-[#040d1b] font-mono font-bold">{transactionDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Book</span>
                <span className="text-[#45474c] text-right max-w-[60%] truncate">{transactionDetails.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date</span>
                <span className="text-[#45474c]">{transactionDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Method</span>
                <span className="text-[#45474c]">{transactionDetails.paymentMethod}</span>
              </div>
              
              <div className="border-t border-dashed border-slate-200 my-1"></div>
              
              <div className="flex justify-between items-center pt-1 text-sm">
                <span className="font-bold text-[#040d1b]">Amount Paid</span>
                <span className="text-base font-extrabold text-emerald-600">{transactionDetails.amount}</span>
              </div>
            </div>
          )}
        </div>

        {/* নেভিগেশন বাটন গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/dashboard/user"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#040d1b] hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            Go to Dashboard <MdArrowForward className="text-sm" />
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-slate-200 text-[#45474c] hover:bg-slate-50 hover:text-[#040d1b] rounded-xl text-xs font-bold transition-all active:scale-95"
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