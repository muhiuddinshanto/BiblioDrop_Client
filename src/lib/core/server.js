"use server";

import { redirect } from "next/navigation";
import { authHeader } from "./session";

const getBaseUrl = () => process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const serverFetch = async (path) => {
  try {
    const response = await fetch(`${getBaseUrl()}${path}`);

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
    const response = await fetch(`${getBaseUrl()}${path}`, {
      headers: await authHeader(),
    });

    if (response.status === 401) {
      redirect("/unauthorized");
    }

    if (response.status === 403) {
      redirect("/forbidden");
    }

    if (!response.ok) {
      console.error(`Fetch error: ${response.status} - ${response.statusText}`);
      return null;
    }

    return response.json();
  } catch (error) {
    if (error?.message === "NEXT_REDIRECT") throw error;
    console.error(`Server fetch failed for ${path}:`, error.message);
    return null;
  }
};

export const serverMuatation = async (path, data, method = "POST") => {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });

  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    console.error(`Non-JSON response for ${path}:`, response.status, response.statusText);
    return null;
  }

  return response.json();
};