import { protectedFetch, serverFetch } from "../core/server";

export const orderById = async (userId) => {
    return protectedFetch(`/api/orders/${userId}`);
};

export const orderByOwnerId = async (userId) => {
    return protectedFetch(`/api/librarian/stats/${userId}`);
};


export const orderByAuthorId = async (userId) => {
    return protectedFetch(`/api/orders/user/${userId}`);
};

export const DeliveryRequestChecker = async (bookId) => {
    return protectedFetch(`/api/orders/check/${bookId}`);
};



export const transactionsList = async () => {
    return protectedFetch('/api/admin/transactions');
};


export const checkDeliveryRequest = async (bookId) => {
    return protectedFetch(`/api/orders/check/${bookId}`);
};







export const adminStats = async () => {
    return protectedFetch('/api/admin/stats');
};
