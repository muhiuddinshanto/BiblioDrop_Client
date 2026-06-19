'use server';

import { serverMuatation } from "../core/server";


export const orderBooks = async(orderBooks)=>{
    return serverMuatation('/api/orders', orderBooks);
}