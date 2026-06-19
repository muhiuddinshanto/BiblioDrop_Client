import { serverFetch } from "../core/server";

export const wishlistById = async (userId) => {
    return serverFetch(`/api/wishlist/${userId}`);
};
