"use server";



export const serverFetch = async (path) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`);
        
        if (!response.ok) {
            console.error(`Fetch error: ${response.status} - ${response.statusText}`);
            return null;
        }
        
        return response.json();
    } catch (error) {
        console.error(`Server fetch failed for ${path}:`, error.message);
        return null; // crash না করে null রিটার্ন করবে
    }
};




export const serverMuatation = async (path, data) => {
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
});

return res.json();
};
