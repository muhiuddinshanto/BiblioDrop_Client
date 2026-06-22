import { serverMuatation } from "../core/server";


export const reviewDelete = async (reviewId, data) => {
    return serverMuatation(`/api/reviews/${reviewId}`, data, "DELETE");
};

export const reviewUpdate = async (id, payload) => {
  return serverMuatation(`/api/reviews/${id}`, payload, "PATCH");
};

export const reviewSubmit = async (reviewPayload) => {
    return serverMuatation("/api/reviews", reviewPayload, "POST");
};