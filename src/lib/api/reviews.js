import { protectedFetch, serverFetch } from "../core/server";

export const reviewsByUserId = async (userId) => {
    return protectedFetch(`/api/reviews/user/${userId}`);
};



export const reviewsByBookId = async (bookId) => {
    return serverFetch(`/api/reviews/book/${bookId}`);
}