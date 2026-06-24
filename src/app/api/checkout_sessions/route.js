import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const body = await req.json();

        const product = body.product || {};
        const userId = body.userId;
        const BookId = body.BookId;

        const baseUrl = process.env.NODE_ENV === 'production' 
            ? "https://bibliodrop.vercel.app" 
            : "http://localhost:3000";

        // 💡 ডেসক্রিপশন খালি স্ট্রিং হওয়া আটকাতে লজিক
        const productDescription = product.description && product.description.trim() !== ""
            ? product.description
            : "No description available"; // খালি হলে স্ট্রাইপকে এই ডিফল্ট টেক্সট দেবে

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: "usd",
                        unit_amount: Math.round((product.price || 0) * 100),
                        product_data: {
                            name: product.title || "Book",
                            description: productDescription, 
                            images: product.image ? [product.image] : [],
                        },
                    },
                },
            ],

            // 🎯 মেটাডাটা ম্যাপিং
            metadata: {
                userid: userId ? userId.toString() : "",
                bookid: BookId ? BookId.toString() : "",
                title: product.title || "Unknown Title",
                author: product.author || "Unknown Author",
                category: product.category || "General",
                price: (product.price || 0).toString(),
                image: product.image || "",
                authorid: product.userId ? product.userId.toString() : "",
                status: "Pending",  
            },

            success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/cancel`,
        });

        return Response.json({ url: session.url });
    } catch (error) {
        console.error("❌ Checkout Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}