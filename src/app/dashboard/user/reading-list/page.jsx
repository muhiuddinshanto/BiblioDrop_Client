
import ReadingListContent from '@/components/Deashboard/ReadingListContent';
import { orderById } from '@/lib/api/order';
import { getUserSession } from '@/lib/core/session';

export default async function ReadingListPage() {
  const user = await getUserSession();
  
  // একই এপিআই ডাটা রিয়ুজ করা হচ্ছে
  const orders = user?.id ? await orderById(user.id) : [];

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#faf9fa] dark:bg-slate-900">
      <ReadingListContent orders={orders} />
    </div>
  );
}
