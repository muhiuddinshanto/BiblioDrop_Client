'use server';
import { serverMuatation } from "../core/server";

export const userRoleUpdate = async (userId, role) => {
    return serverMuatation(`/api/users/${userId}`, {role}, "PATCH");
};




export const userDelete = async (userId, role) => {
    return serverMuatation(`/api/users/${userId}`, {role}, "DELETE");
};