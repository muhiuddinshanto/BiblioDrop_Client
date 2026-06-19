
import OrdersContent from '@/components/Deashboard/OrdersContent';
import { orderById } from '@/lib/api/order';
import { getUserSession } from '@/lib/core/session';

export default async function MyOrdersPage() {
  const user = await getUserSession();
  
  // ইউজারের আইডি অনুযায়ী সব অর্ডার সার্ভার থেকে নিয়ে আসা
  const orders = user?.id ? await orderById(user.id) : [];

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#faf9fa]">
      <OrdersContent orders={orders} />
    </div>
  );
}