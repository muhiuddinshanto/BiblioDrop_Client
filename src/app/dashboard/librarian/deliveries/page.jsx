import { MdLocalShipping, MdLayersClear } from "react-icons/md";

import { getUserSession } from "@/lib/core/session";
import ManageDeliveriesClient from "@/components/Deashboard/librarian/ManageDeliveriesClient";
import { orderByAuthorId } from "@/lib/api/order";

export default async function ManageDeliveriesPage() {
  // ১. সার্ভার সাইড থেকে কারেন্ট ইউজার সেশন রিকোয়েস্ট করা হচ্ছে
  const user = await getUserSession();
  
  // ২. ডাটাবেজ থেকে অর্ডার ফেচ করা হচ্ছে
  let fetchedDeliveries = [];
  if (user?.id) {
    fetchedDeliveries = await orderByAuthorId(user?.id);
    console.log("Fetched Deliveries:", fetchedDeliveries);
  }

  // ডাটাবেজ থেকে ডাটা এসেছে কিনা এবং সেটি অ্যারে কিনা তা নিশ্চিত করা
  const hasDeliveries = Array.isArray(fetchedDeliveries) && fetchedDeliveries.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      {/* হেডার সেকশন */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#040d1b] tracking-tight mb-1 flex items-center gap-2">
          <MdLocalShipping className="text-[#775a19]" /> Logistics & Deliveries
        </h1>
        <p className="text-[#45474c] text-xs">
          Monitor user rental dispatch cycles, control parcel logistics, and verify final destinations.
        </p>
      </div>

      {/* 🚀 কন্ডিশনাল রেন্ডারিং: ডাটা থাকলে টেবিল দেখাবে, না থাকলে সুন্দর Empty UI দেখাবে */}
      {hasDeliveries ? (
        <ManageDeliveriesClient initialDeliveries={fetchedDeliveries} />
      ) : (
        <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50/60 flex items-center justify-center text-[#775a19] mb-4 border border-amber-100">
            <MdLayersClear className="text-3xl" />
          </div>
          <h3 className="text-lg font-bold text-[#040d1b] font-serif">No Active Shipment Requests</h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
            There are currently no active book rentals or logistics dispatches logged under your archival domain.
          </p>
        </div>
      )}

    </div>
  );
}