import { protectedFetch } from "../core/server";

export const reviewsByUserId = async (userId) => {
    return protectedFetch(`/api/reviews/user/${userId}`);
};