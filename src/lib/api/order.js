import { serverFetch } from "../core/server";

export const orderById = async (userId) => {
    return serverFetch(`/api/orders/${userId}`);
};

