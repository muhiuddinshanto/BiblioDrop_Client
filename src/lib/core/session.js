// lib/core/session.js
import { auth } from "../auth";
import { headers } from "next/headers";

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