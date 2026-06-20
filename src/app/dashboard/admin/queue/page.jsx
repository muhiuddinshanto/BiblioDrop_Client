
import { MdRateReview } from "react-icons/md";
import { getBooksByStatus } from "@/lib/api/books"; // আপনার রিয়েল API ফাংশন
import QueueClientWrapper from "@/components/Deashboard/admin/QueueClientWrapper";


// এই ফাংশনটি সার্ভার সাইডেই ডেটা তুলে নিয়ে আসবে
async function fetchPendingBooks() {
  try {
    // real api ব্যবহার করতে চাইলে নিচের লাইনটি আনকমেন্ট করুন:
    const res = await getBooksByStatus("Pending Approval");
    console.log(res, "res data from server");
    // return res.data || [];

    // আপাতত আপনার টেস্টিং এর জন্য ডামি সার্ভার রেসপন্স:
    return res || [];
  } catch (error) {
    console.error("Failed to load server data:", error);
    return [];
  }
}

export default async function BookApprovalQueuePage() {
  // সার্ভার সাইড ডেটা ফেচিং
  const initialBooks = await fetchPendingBooks();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* হেডার সেকশন */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold font-serif text-[#040d1b] tracking-tight mb-1 flex items-center gap-2">
          <MdRateReview className="text-[#775a19]" /> Book Approval Queue
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Review and verify catalog submissions prior to global deployment.
        </p>
      </div>

      {/* ক্লায়েন্ট ইন্টারঅ্যাকশন হ্যান্ডেলার র‍্যাপার */}
      <QueueClientWrapper initialBooks={initialBooks} />
    </div>
  );
}