import LibrarianOverview from "@/components/Deashboard/librarian/LibrarianOverview";
import { orderByOwnerId } from "@/lib/api/order";
import { getUserSession } from "@/lib/core/session";


const LibrarianDashboardPage = async () => {
    const user = await getUserSession();
    const orders = await orderByOwnerId(user?.id);
    console.log(orders, "🚀 ~ file: page.jsx:8 ~ LibrarianDashboardPage ~ orders");
    // 💡 পরবর্তীতে আপনি এখানে ডাটা ফেচ করতে পারবেন:
    // const statsData = await getLibrarianStats();
    // const chartsData = await getEarningCharts();
    // const topBooks = await getTopRequested();
    const stats = orders?.stats || { totalBooks: 0, totalEarnings: 0, pendingRequests: 0 };
    const earningTrends = orders?.earningTrends || [];
    const topRequestedBooks = orders?.topRequestedBooks || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
          
              <LibrarianOverview stats={stats} earningTrends={earningTrends} topRequestedBooks={topRequestedBooks} /> 
           
            {/* <LibrarianOverview /> */}
        </div>
    );
};

export default LibrarianDashboardPage;