



'use server';
import { serverMuatation } from "../core/server";

export const createBooks = async (data) => {
  const result = await serverMuatation('/api/books', data);
  console.log("createBooks result:", result); // ✅ add করুন
  return result;
}

// স্ট্যাটাস টগলের জন্য (Published / Unpublished)
export const booksUpdate = async (bookId, status) => {
    const payload = { status };
    console.log("Sending status payload:", payload);
    return serverMuatation(`/api/books/${bookId}`, payload, "PATCH");
};

// বইয়ের details এডিটের জন্য (title, author, price ইত্যাদি)
export const bookDetailsUpdate = async (bookId, fields) => {
    console.log("Sending details payload:", fields);
    return serverMuatation(`/api/books/${bookId}`, fields, "PATCH");
};



export const bookApprove = async (bookId, fields) => {
    console.log("Sending details payload:", fields);
    return serverMuatation(`/api/books/approve/${bookId}`, fields, "PATCH");
};


export const bookDelete = async (bookId, fields) => {
    console.log("Sending details payload:", fields);
    return serverMuatation(`/api/books/${bookId}`, fields, "DELETE");
};



export const adminBookUdateStatus = async (bookId, status) => {
    console.log("Sending details payload:", status);
    return serverMuatation(`/api/books/admin/${bookId}`, status, "PATCH");
};