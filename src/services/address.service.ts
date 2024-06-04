import request from "./request.service";

async function address_info() {
  try {
    const response = await request("/api/address/info", "GET", {});
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function update_address(data: any, branch_id: string) {
  try {
    console.log("data", data);
    const payload = {
      address: {
        country: parseInt(data.country),
        province: parseInt(data.province),
        district: parseInt(data.district),
        sector: parseInt(data.sector),
        address_string: data.address_string ? data.address_string : "",
        street: data.street ? data.street : "",
        position: {
          type: "Point",
          coordinates: data.position.coordinates?.map((x: any) =>
            parseFloat(x)
          ),
        },
      },
    };
    console.log("payload", payload);
    const response = await request(
      "/api/address/branch/" + branch_id,
      "PUT",
      payload
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}
async function newfunc() {}
export const addressService = {
  address_info,
  update_address,
};
