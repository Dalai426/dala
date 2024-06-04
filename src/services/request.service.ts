import axios from "axios";
import { getCookie } from "cookies-next";
const baseUrl = "http://10.10.10.244:4040";
export default async function request(url: String, method: any, body: any) {
  try {
    let headers = {
      Authorization: `Bearer ${getCookie("token")}`,
    };
    let response = await axios({
      url: baseUrl + url,
      method: method,
      data: body,
      headers: headers,
    });
    console.log("wtf", response);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
