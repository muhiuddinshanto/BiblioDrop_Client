"use client";

import React, { useState, useEffect } from "react";
import DeliveryTable from "@/components/Deashboard/librarian/DeliveryTable";
import { orderBooksStatus } from "@/lib/actions/order";


export default function ManageDeliveriesClient({ initialDeliveries = [] }) {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (initialDeliveries) {
      setDeliveries(initialDeliveries);
    }
  }, [initialDeliveries]);

  // 💡 ডাইনামিক ডেলিভারি স্ট্যাটাস চেঞ্জার হ্যান্ডলার
  const handleDeliveryStatusChange = async (id, newStatus) => {
    setIsUpdating(true);
    console.log(`Shipment ID: ${id} updated to state: ${newStatus}`);

    // ১. ব্যাকআপ রাখা (যদি এপিআই ফেইল করে তবে আগের স্টেটে ফেরত যাওয়ার জন্য)
    const previousDeliveries = [...deliveries];

    // ২. UI-তে ইনস্ট্যান্ট স্টেট আপডেট (Optimistic Update)
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((item) =>
        item._id === id ? { ...item, status: newStatus } : item
      )
    );

    try {
      // 🚀 ব্যাকএন্ড এপিআই এন্ডপয়েন্ট ট্রিগার করা হলো
      const response = await orderBooksStatus(id, newStatus);
      
      if (!response.success) {
        throw new Error(response.message || "Failed to update");
      }
      
      console.log("Server synced successfully:", response.message);

    } catch (error) {
      console.error("Failed to sync delivery status with server:", error);
      alert("Could not update shipment status. Please try again.");
      
      // 🔄 এপিআই এরর খাইলো, তাই UI-তে আগের ডাটা ফিরিয়ে আনা (Rollback)
      setDeliveries(previousDeliveries);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DeliveryTable
      deliveries={deliveries}
      onStatusChange={handleDeliveryStatusChange}
      isUpdating={isUpdating}
    />
  );
}