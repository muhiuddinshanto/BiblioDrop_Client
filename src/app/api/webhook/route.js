import Stripe from "stripe";
import { db } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const ordersCollection = db.collection("orders");

export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Stripe webhook signature error:", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      if (!session.metadata) {
        throw new Error("Missing checkout metadata");
      }

      // 🛑 ডুপ্লিকেট আটকানোর চাবিকাঠি: আগে চেক করুন এই stripeSessionId অলরেডি আছে কিনা
      const existingOrder = await ordersCollection.findOne({ stripeSessionId: session.id });
      
      if (existingOrder) {
        console.log("⚠️ This order already processed. Skipping duplicate insert.");
        return Response.json({ received: true, message: "Duplicate skipped" });
      }

      const orderData = {
        BookId: session.metadata.bookid || "",
        title: session.metadata.title || "Unknown Title",
        author: session.metadata.author || "Unknown Author",
        category: session.metadata.category || "General",
        price: Number.parseFloat(session.metadata.price || "0"),
        image: session.metadata.image || "",
        userId: session.metadata.userid || "",
        PaymentStatus: "completed",
        authorId: session.metadata.authorid || "",
        stripeSessionId: session.id,
        status: "pending", // 🎯 স্কিমা ঠিক থাকলে এটি আসবেই
        date: new Date(),
      };

      // ফ্রেশ ইনসার্ট
      await ordersCollection.insertOne(orderData);
      console.log("✅ Order successfully saved to database with status!");

    } catch (error) {
      console.error("Webhook order save failed:", error);
      // এখানেও এরর হলে স্ট্রাইপকে রেসপন্স দিন যেন সে বারবার রিকোয়েস্ট না পাঠায়
      return Response.json({ received: false, error: error.message }, { status: 500 });
    }
  }

  // স্ট্রাইপকে জানান যে আপনার এপিআই সফলভাবে ডাটা রিসিভ করেছে
  return Response.json({ received: true });
}