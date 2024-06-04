import { parse } from "path";
import request from "./request.service";
import { delivery_types } from "@/components/constants/types";

const getCare = async (data: any) => {
  try {
    const payload: {
      page: number;
      limit: number;
      branch_name: string;
      ua_code: string;
      pos_type: number;
      care_user: string;
      care_type?: number;
      care_date_start?: string;
      care_date_end?: string;
      delivery_type?: number;
    } = {
      page: data.page,
      limit: data.limit,
      pos_type: data.pos_type,
      branch_name: data.branch_name,
      ua_code: data.ua_code,
      care_user: data.care_user,
    };
    if (data.care_date_start && data.care_date_start !== "") {
      payload.care_date_start = data.care_date_start + "T00:00:00.000Z";
    }
    if (data.care_date_end && data.care_date_start !== "") {
      payload.care_date_end = data.care_date_end + "T00:00:00.000Z";
    }
    if (parseInt(data.care_type) !== 0) {
      payload.care_type = parseInt(data.care_type);
    }
    if (parseInt(data.delivery_type) !== 100) {
      payload.delivery_type = data.delivery_type;
    }
    const response = await request("/api/search/care", "POST", payload);
    return response.data;
    // return res;
  } catch {
    console.log("error");
  }
};
const createCare = async (data: any) => {
  try {
    const response = await request("/api/care/create", "POST", data);
    return response.data;
  } catch {
    console.log("error");
  }
};

const careDetail = async (care_id: string) => {
  try {
    const response = await request("/api/care/" + care_id, "GET", {});
    return response.data;
  } catch {
    console.log("error");
  }
};
const updateCare = async (data: any) => {
  try {
    console.log("update care", data);
    const response = await request("/api/care/", "PUT", data);
    return response.data;
  } catch {
    console.log("error");
  }
};

export const careService = {
  getCare,
  createCare,
  careDetail,
  updateCare,
};
