import { start } from "repl";
import request from "./request.service";
import { delivery_types } from "@/components/constants/types";
async function create_branch(data: any) {
  try {
    const branch = {
      name: data.name,
      pos_type: data.pos_type,
      possession_type: data.possession_type,
      status: data.status,
      mc_code: data.mc_code,
      address: {
        country: data.address.country,
        province: data.address.province,
        district: data.address.district,
        sector: data.address.sector,
        street: data.address.street,
        address_string: data.address.address_string,
        position: {
          type: data.address.position.type,
          coordinates: data.address.position.coordinates,
        },
      },
    };
    const response = await request("/api/branch/create", "POST", branch);
    return response.data;
  } catch (err) {
    throw err;
  }
}
async function branch_list(
  limit = 1,
  offset = 10,
  ua_code = "",
  name = "",
  registration_number = "",
  status: number, // nullable
  start_date: string,
  end_date: string,
  pos_type: number,
  delivery_type: number
  // type = 1,
  // pos_status = 1,
  // pos_type = 1
) {
  try {
    const payload: {
      mc_code: string;
      ua_code: string;
      name: string;
      registration_number: string;
      status?: number;
      type?: number;
      // pos_status: number,
      pos_type?: number;
      start_date?: string;
      end_date?: string;
      page: number;
      limit: number;
      delivery_type?: number;
    } = {
      mc_code: "",
      ua_code: ua_code,
      name: name,
      registration_number: registration_number,
      // status: status,
      type: 1,
      // pos_status: 0,
      // pos_type: 0,
      page: offset,
      limit: limit,
    };
    if (status !== 100) {
      payload.status = status;
    }
    if (delivery_type !== 100) {
      payload.delivery_type = delivery_type;
    }
    if (start_date !== "") {
      payload.start_date = start_date + "T00:00:00.000Z";
    }
    if (end_date !== "") {
      payload.end_date = end_date + "T00:00:00.000Z";
    }

    if (pos_type !== 0) {
      payload.pos_type = pos_type;
    }
    console.log(payload);
    const response = await request("/api/search/branch", "POST", payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}
async function branch_detail(branch_id: string) {
  try {
    const response = await request(`/api/branch/${branch_id}`, "GET", {});
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function update_branch(branch_id: any, data: any) {
  try {
    const branch = {
      name: data.name,
      pos_type: parseInt(data.pos_type.toString()),
      delivery_type: parseInt(data.delivery_type.toString()),
      possession_type: parseInt(data.possession_type),
      status: parseInt(data.status),
      type: 1,
    };
    const response = await request(
      `/api/branch/${data.ua_code}`,
      "PUT",
      branch
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}
export const branchService = {
  create_branch,
  branch_list,
  branch_detail,
  update_branch,
};
