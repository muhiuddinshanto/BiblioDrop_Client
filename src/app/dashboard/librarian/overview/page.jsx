import LibrarianOverview from "@/components/Deashboard/librarian/LibrarianOverview";


const LibrarianDashboardPage = async () => {
    // 💡 পরবর্তীতে আপনি এখানে ডাটা ফেচ করতে পারবেন:
    // const statsData = await getLibrarianStats();
    // const chartsData = await getEarningCharts();
    // const topBooks = await getTopRequested();

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* ভবিষ্যতে ফেচ করা ডাটা এভাবে পাস করবেন:
              <LibrarianOverview stats={statsData} earningTrends={chartsData} topRequestedBooks={topBooks} /> 
            */}
            <LibrarianOverview />
        </div>
    );
};

export default LibrarianDashboardPage;