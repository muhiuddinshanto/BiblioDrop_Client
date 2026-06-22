
import Sidebar from '@/components/Deashboard/Sidebar';
import React from 'react';


const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen w-full flex-col bg-slate-50 dark:bg-slate-950 lg:flex-row">
            <Sidebar />
            <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
            
        </div>
    );
};

export default DashboardLayout;
