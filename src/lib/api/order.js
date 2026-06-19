import { serverFetch } from "../core/server";

export const orderById = async (userId) => {
    return serverFetch(`/api/orders/${userId}`);
};

export const orderByOwnerId = async (userId) => {
    return serverFetch(`/api/librarian/stats/${userId}`);
};


export const orderByAuthorId = async (userId) => {
    return serverFetch(`/api/orders/user/${userId}`);
};
