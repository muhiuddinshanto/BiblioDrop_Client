import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const librarianPage = async () => {

    const user = await getUserSession();
        const librarian = user?.role === "librarian";
    
       
        if(librarian){
            redirect('/dashboard/librarian/overview');
        }
    
    return (
        <div>
            LibrarianPage
        </div>
    );
};

export default librarianPage   ;
