import OverviewContent from '@/components/Deashboard/OverviewContent';
import { orderById } from '@/lib/api/order';
import { getUsersStats } from '@/lib/api/users';
import { wishlistById } from '@/lib/api/wishlist';
import { getUserSession } from '@/lib/core/session';

export default async function UserOverviewPage() {
  const user = await getUserSession();
  
  // ইউজার আইডি থাকলে ডাটা ফেচ হবে, না থাকলে ফলব্যাক ব্ল্যাঙ্ক অ্যারে
  const orders = user?.id ? await orderById(user.id) : [];
  const wishlist = user?.id ? await wishlistById(user.id) : [];
  const safeWishlist = wishlist ?? [];
  
  // ব্যাকএন্ড থেকে আসা অ্যানালিটিক্স ডাটা (যা আমরা আগের স্টেপে তৈরি করেছি)
  const userState = user?.id ? await getUsersStats(user.id) : null;
  console.log(userState, "🚀 ~ file: page.jsx:12 ~ UserOverviewPage ~ userState");

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#faf9fa] dark:bg-slate-900">
      {/* এপিআই থেকে প্রাপ্ত রিয়েল চার্ট ডাটা প্রপস আকারে পাস করা হলো */}
      <OverviewContent 
        orders={orders}  
        safeWishlist={safeWishlist}
        serverStats={userState?.stats}
        serverTrendData={userState?.trendChartData}
        serverPieData={userState?.pieChartData}
      />
    </div>
  );
}
