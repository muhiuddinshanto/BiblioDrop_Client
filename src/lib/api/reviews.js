import { protectedFetch } from "../core/server";

export const reviewsByUserId = async (bookId) => {
    return protectedFetch(`/api/reviews/${bookId}`);
};