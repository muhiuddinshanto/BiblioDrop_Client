import { serverFetch } from "../core/server";

export const topLibrarians = async () => {
    return serverFetch("/api/top-librarians");
};