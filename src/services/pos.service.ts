import request from "./request.service";

async function create_pos(data: any) {
  try {
    const response = await request("/api/pos/create", "POST", data);
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function batch_create_pos(data: any) {
  try {
    const response = await request("/api/pos/batch-create", "POST", data);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export const posService = {
  create_pos,
  batch_create_pos,
};
