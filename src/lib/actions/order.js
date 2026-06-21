'use server';

import { db } from "../auth";
import { serverMuatation } from "../core/server";


export const orderBooks = async ({ bookId, totalPrice }) => {
  try {
    const res = await serverMuatation('/api/create-checkout-session', {
      bookId,
      totalPrice,
    });

    if (res?.url) return { success: true, url: res.url };
    return { success: false, message: "Checkout session failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// export const orderBooks = async(orderBooks)=>{
//     return serverMuatation('/api/orders', orderBooks);
// }



// ✅ এখানে আমরা নিশ্চিত করছি যে ডাটাটি অবজেক্ট আকারেই পাস হচ্ছে
export const orderBooksStatus = async (bookId, status) => {
    const payload = { status: status };
    
    console.log("Sending payload to express:", payload); // সার্ভার কনসোলে চেক করার জন্য
    
    // এক্সপ্রেস ব্যাকএন্ডে PATCH রিকোয়েস্ট পাঠানো হচ্ছে
    return serverMuatation(`/api/orders/${bookId}`, payload, "PATCH");
};