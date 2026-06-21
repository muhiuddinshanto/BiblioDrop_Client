import { protectedFetch } from "../core/server";

export const wishlistById = async (userId) => {
    return protectedFetch(`/api/wishlist/${userId}`);
};
