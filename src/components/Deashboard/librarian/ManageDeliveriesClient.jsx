"use client";

import React, { useState } from "react";
import DeliveryTable from "@/components/Deashboard/librarian/DeliveryTable";
import { orderBooksStatus } from "@/lib/actions/order";
import toast from "react-hot-toast";


export default function ManageDeliveriesClient({ initialDeliveries = [] }) {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [isUpdating, setIsUpdating] = useState(false);

  
  const handleDeliveryStatusChange = async (id, newStatus) => {
    setIsUpdating(true);
    console.log(`Shipment ID: ${id} updated to state: ${newStatus}`);

    
    const previousDeliveries = [...deliveries];

    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((item) =>
        item._id === id ? { ...item, status: newStatus } : item
      )
    );

    try {
      
      const response = await orderBooksStatus(id, newStatus);

      if(response.success){
        toast.success("Shipment status updated successfully.");
      }
      
      if (!response.success) {
        throw new Error(response.message || "Failed to update");
      }
      
      console.log("Server synced successfully:", response.message);

    } catch (error) {
      console.error("Failed to sync delivery status with server:", error);
      toast.error("Could not update shipment status. Please try again.");
      
      // ðŸ”„ à¦à¦ªà¦¿à¦†à¦‡ à¦à¦°à¦° à¦–à¦¾à¦‡à¦²à§‹, à¦¤à¦¾à¦‡ UI-à¦¤à§‡ à¦†à¦—à§‡à¦° à¦¡à¦¾à¦Ÿà¦¾ à¦«à¦¿à¦°à¦¿à§Ÿà§‡ à¦†à¦¨à¦¾ (Rollback)
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


