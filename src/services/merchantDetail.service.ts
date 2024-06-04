import { stat } from "fs";
import request from "./request.service";

async function merchant_info(
  offset: number = 1,
  limit: number = 10,
  mc_code: string = "",
  name: string = "",
  registration_number: string = "",
  status: number
) {
  try {
    const data: {
      mc_code: string;
      name: string;
      registration_number: string;
      limit: number;
      type: number;
      page: number;
      status?: number;
    } = {
      mc_code: mc_code,
      name: name,
      registration_number: registration_number,
      type: 1,
      limit: limit,
      page: offset,
    };

    if ((status && status !== 100) || status === 0) {
      data["status"] = status;
    }
    const response = await request("/api/search/merchant", "POST", data);
    return response.data;
  } catch (err) {
    throw err;
  }
}
async function branch_address(branch_id: String) {
  try {
    const response = await request(
      `/api/merchant-info/address/${branch_id}`,
      "GET",
      {}
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function merchant_detail(merchant_id: String) {
  try {
    const response = await request(`/api/merchant/${merchant_id}`, "GET", {});
    return response.data;
  } catch (err) {
    throw err;
  }
}
async function create_merchant(data: any) {
  try {
    const response = await request("/api/merchant/create", "POST", data);
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function update_merchant(merchant_id: any, data: any) {
  try {
    const payload = {
      name: data.name,
      registration_number: data.registration_number,
      type: 1,
      status: data.status,
      contract_type: data.contract_type,
      contract_detail: data.contract_detail,
      // owner_type: data.owner_type,
      owner_info: data.owner_info,
    };
    console.log("asdfasdf", "payload", payload);
    // {name: "itgel test", registration_number: "qwerty1", type: 1, status: 2, contract_type: 2,…}

    const response = await request(
      `/api/merchant/${merchant_id}`,
      "PUT",
      payload
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

export const merchantService = {
  update_merchant,
  merchant_info,
  branch_address,
  merchant_detail,
  create_merchant,
};
