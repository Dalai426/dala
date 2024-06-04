import request from "./request.service";

async function branch_list(
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
    const response = await request("/api/download/branch", "POST", payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export const downloadService = {
  branch_list,
};
