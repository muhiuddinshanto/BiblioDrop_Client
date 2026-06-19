import { serverFetch } from "../core/server";

export const getBooks = async () => {
    return serverFetch('/api/books');
};


export const getBooksById = async (booksId) => {
    return serverFetch(`/api/books/${booksId}`);
};

export const getBooksByUserId = async (userId) => {
    return serverFetch(`/api/books/user/${userId}`);
};



