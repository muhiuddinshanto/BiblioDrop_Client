"use server";



export const serverFetch = async (path) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
        
        // ডিবাগের জন্য — সমস্যা fix হলে সরিয়ে দাও
        console.log("Fetching:", `${baseUrl}${path}`);
        
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



export const serverMuatation = async (path, data, method = "POST") => {
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`,{
    method: method,
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
});

return res.json();
};
