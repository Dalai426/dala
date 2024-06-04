import { parse } from "path";
import request from "./request.service";

const getDashboard = async (data: {
  status?: number;
  pos_type?: number;
  pos_status: number;
  address: string;
  delivery_type: number;
  care_num: number;
  start_date: string;
  end_date: string;
}) => {
  const payload: {
    status?: number;
    pos_type?: number;
    pos_status?: number;
    address?: string;
    delivery_type?: number;
    care_num?: number;
    start_date?: string;
    end_date?: string;
  } = {};
  if (data.start_date && data.start_date !== "") {
    payload.start_date = data.start_date + "T00:00:00.000Z";
  }
  if (data.end_date && data.end_date !== "") {
    payload.end_date = data.end_date + "T00:00:00.000Z";
  }
  if (data.address && data.address !== "" && data.address !== "Бүгд") {
    payload.address = data.address;
  }
  if (data.status !== 100) {
    payload.status = data.status;
  }
  if (data.pos_type !== 100 && data.pos_type) {
    payload.pos_type = data.pos_type;
  }
  if (data.delivery_type !== 100) {
    payload.delivery_type = data.delivery_type;
  }
  if (data.pos_status !== 100 && data.pos_status) {
    payload.pos_status = data.pos_status;
  }
  if (data.care_num !== 0) {
    payload.care_num = data.care_num;
  }
  const response = await request("/api/dashboard", "POST", payload);
  return response;
};

export const dashboardService = {
  getDashboard,
};
