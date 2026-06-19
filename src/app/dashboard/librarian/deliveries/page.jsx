"use client";

import DeliveryTable from "@/components/Deashboard/librarian/DeliveryTable";
import React, { useState } from "react";

import { MdLocalShipping } from "react-icons/md";

// লজিস্টিকস ট্র্যাকিং করার জন্য কিছু ডামি ডাটা
const DUMMY_DELIVERIES = [
  {
    _id: "del_01",
    clientName: "Mohiuddin Shanto",
    clientEmail: "shanto@example.com",
    bookTitle: "The Silent Alchemist",
    date: "Jun 15, 2026",
    status: "Pending",
  },
  {
    _id: "del_02",
    clientName: "Ahsan Habib",
    clientEmail: "habib@example.com",
    bookTitle: "Echoes of Renaissance",
    date: "Jun 12, 2026",
    status: "Dispatched",
  },
  {
    _id: "del_03",
    clientName: "Anika Rahman",
    clientEmail: "anika@example.com",
    bookTitle: "Midnight in Kyoto",
    date: "Jun 10, 2026",
    status: "Delivered",
  }
];

export default function ManageDeliveriesPage() {
  const [deliveries, setDeliveries] = useState(DUMMY_DELIVERIES);
  const [isUpdating, setIsUpdating] = useState(false);

  // 💡 ডাইনামিক ডেলিভারি স্ট্যাটাস চেঞ্জার হ্যান্ডলার
  const handleDeliveryStatusChange = async (id, newStatus) => {
    setIsUpdating(true);
    console.log(`Shipment ID: ${id} updated to state: ${newStatus}`);

    // UI-তে ইনস্ট্যান্ট স্টেট আপডেট (Optimistic Update)
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((item) =>
        item._id === id ? { ...item, status: newStatus } : item
      )
    );

    try {
      // 🚀 এখানে আপনার সার্ভার অ্যাকশন বা ব্যাকএন্ড এপিআই এন্ডপয়েন্ট কল করবেন:
      // const res = await updateDeliveryStatusAction(id, newStatus);
      
      // ইচ্ছে হলে সফল আপডেটে নোটিফিকেশন টোস্ট দেখাতে পারেন
    } catch (error) {
      console.error("Failed to sync delivery status with server:", error);
      alert("Could not update shipment status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

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

      {/* রিইউজেবল টেবিল রেন্ডারিং */}
      <DeliveryTable 
        deliveries={deliveries} 
        onStatusChange={handleDeliveryStatusChange} 
        isUpdating={isUpdating}
      />

    </div>
  );
}