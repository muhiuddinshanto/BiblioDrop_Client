import { protectedFetch, serverFetch } from "../core/server";

export const getBooks = async (params) => {
    return serverFetch(`/api/books?${params}`);
};


export const getBooksById = async (booksId) => {
    return protectedFetch(`/api/books/${booksId}`);
};

export const getBooksByUserId = async (userId) => {
    return protectedFetch(`/api/books/user/${userId}`);
};


export const getBooksByStatus = async () => {
    return protectedFetch(`/api/books?status=${encodeURIComponent('Pending Approval')}`);
};

