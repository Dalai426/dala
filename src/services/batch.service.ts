import request from "./request.service";

const create_batch = async (data: any) => {
  try {
    console.log("data", data);
    const response = await request("/api/batch", "POST", data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const batchService = { create_batch };
