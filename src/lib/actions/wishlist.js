'use server';

import { serverMuatation } from "../core/server";


export const wishlistCreate = async(wishlistBooks)=>{
    return serverMuatation('/api/wishlist', wishlistBooks);
}