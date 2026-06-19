
import OverviewContent from '@/components/Deashboard/OverviewContent';
import { orderById } from '@/lib/api/order';
import { wishlistById } from '@/lib/api/wishlist';
import { getUserSession } from '@/lib/core/session';

export default async function UserOverviewPage() {
  const user = await getUserSession();
  
  // একই API ডাটা দিয়ে ওভারভিউ জেনারেট হবে!
  const orders = user?.id ? await orderById(user.id) : [];
    const wishlist = user?.id ? await wishlistById(user.id) : [];
    const safeWishlist = wishlist ?? [];

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#faf9fa]">
      <OverviewContent orders={orders}  safeWishlist={safeWishlist}/>
    </div>
  );
}