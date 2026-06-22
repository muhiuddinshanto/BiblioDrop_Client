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

      const orderData = {
        BookId: session.metadata.bookid,
        title: session.metadata.title,
        author: session.metadata.author,
        category: session.metadata.category,
        price: Number.parseFloat(session.metadata.price || "0"),
        image: session.metadata.image,
        userId: session.metadata.userid,
        PaymentStatus: "completed",
        status: "Pending",
        authorId: session.metadata.authorid,
        stripeSessionId: session.id,
        date: new Date(),
      };

      await ordersCollection.updateOne(
        { stripeSessionId: session.id },
        { $setOnInsert: orderData },
        { upsert: true }
      );
    } catch (error) {
      console.error("Webhook order save failed:", error);
      return Response.json({ received: false, error: error.message }, { status: 500 });
    }
  }

  return Response.json({ received: true });
}