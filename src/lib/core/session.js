// lib/core/session.js
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";




export const authHeader = async () => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {}
    return header;
}



export const getUserSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    return session?.user || null;
  } catch (error) {
    
    console.error("Session error:", error.message);
    return null;
  }
}



export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers() 
    })
    console.log(session);
    return session?.session?.token || null;
}


export const requireRole = async (role) => {
    const user = await getUserSession()
    if(!user) {
        return redirect('/login')
    }
    if (user.role?.toLowerCase() !== role?.toLowerCase()) {
        return redirect('/unauthorized')
    }
    return user;
}




