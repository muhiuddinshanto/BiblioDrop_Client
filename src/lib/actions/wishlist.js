'use server';

import { serverMuatation } from "../core/server";


export const wishlistCreate = async(id, book)=>{
    return serverMuatation(`/api/wishlist/${id}`, book, "POST");
}

export const wishlistDelete = async(id, data)=>{
    return serverMuatation(`/api/wishlist/${id}`, data, "DELETE");
}