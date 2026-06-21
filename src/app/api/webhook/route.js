app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log("💰 PAYMENT SUCCESS, processing order...");

    try {
      if (!session.metadata) throw new Error("Missing metadata");

      // ✅ আপনার চাওয়া অবিকল ফরম্যাট অনুযায়ী মঙ্গোডিবি অবজেক্ট রেডি
      const orderData = {
        BookId: session.metadata.bookid,
        title: session.metadata.title,
        author: session.metadata.author,
        category: session.metadata.category,
        price: parseFloat(session.metadata.price || 0), // স্ট্রিং প্রাইসকে নাম্বারে কনভার্ট করা হলো
        image: session.metadata.image,
        userId: session.metadata.userid,
        PaymentStatus: "completed", // আগের ফরম্যাট অনুযায়ী "status"
        authorId: session.metadata.authorid,
        date: new Date(),
      };

      const result = await orderCollection.insertOne(orderData);
      console.log("🎉 Order saved to MongoDB successfully! ID:", result.insertedId);

    } catch (error) {
      console.error("❌ Database Insert Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  res.json({ received: true });
});