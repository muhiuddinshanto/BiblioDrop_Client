"use server";
import { redirect } from "next/navigation"; // ✅ এই import missing ছিল
import { authHeader } from "./session";

export const serverFetch = async (path) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
        console.log("Fetching:", `${baseUrl}`);
        const response = await fetch(`${baseUrl}${path}`);
        if (!response.ok) {
            console.error(`Fetch error: ${response.status} - ${response.statusText}`);
            return null;
        }
        return response.json();
    } catch (error) {
        console.error(`Server fetch failed for ${path}:`, error.message);
        return null;
    }
};

export const protectedFetch = async (path) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
            headers: await authHeader()
        });

        // ✅ আগে status check, তারপর json() return
        if (response.status === 401) {
            redirect('/unauthorized');
        }
        if (response.status === 403) {
            redirect('/forbidden');
        }
        if (!response.ok) {
            console.error(`Fetch error: ${response.status} - ${response.statusText}`);
            return null;
        }

        return response.json(); // ✅ এখন properly return হবে
    } catch (error) {
        // Next.js redirect internally throws — সেটা rethrow করতে হবে
        if (error?.message === 'NEXT_REDIRECT') throw error;
        console.error(`Server fetch failed for ${path}:`, error.message);
        return null;
    }
};

export const serverMuatation = async (path, data, method = "POST") => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...(await authHeader()), // ✅ auth token add করা হলো
        },
        body: JSON.stringify(data),
    });

    // ✅ HTML response এলে crash না করে error দেখাবে
    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
        console.error(`Non-JSON response for ${path}:`, res.status, res.statusText);
        return null;
    }

    return res.json();
};