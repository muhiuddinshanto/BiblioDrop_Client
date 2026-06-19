
import Sidebar from '@/components/Deashboard/Sidebar';
import React from 'react';


const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen gap-6">
            <Sidebar />
            <div className="flex-1">{children} </div>
            
        </div>
    );
};

export default DashboardLayout;