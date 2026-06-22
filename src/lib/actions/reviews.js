import { serverMuatation } from "../core/server";


export const reviewDelete = async (reviewId, data) => {
    return serverMuatation(`/api/reviews/${reviewId}`, data, "DELETE");
};

export const reviewUpdate = async (reviewId, data) => {
    return serverMuatation(`/api/reviews/${reviewId}`, data, "PATCH");
};


export const reviewSubmit = async (reviewPayload) => {
    return serverMuatation("/api/reviews", reviewPayload, "POST");
};