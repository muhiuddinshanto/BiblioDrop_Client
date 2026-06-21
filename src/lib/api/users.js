import { protectedFetch } from "../core/server";

export const getUsers = async () => {
    return protectedFetch('/api/users');
};


export const getUsersStats = async (userId) => {
    return protectedFetch(`/api/user/stats/${userId}`);
};