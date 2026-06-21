import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const UserDeshboard = async () => {
  const users = await getUserSession();
    const user = users?.role === "user";

   
    if(user){
        redirect('/dashboard/user/overview');
    }
  return (
    <div>
      UserDeshboard
    </div>
  );
};

export default UserDeshboard;