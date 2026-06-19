'use server';

import { serverMuatation } from "../core/server";


export const createBooks = async(orderBooks)=>{
    return serverMuatation('/api/books', orderBooks);
}