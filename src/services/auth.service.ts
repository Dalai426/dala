import axios from "axios";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const baseUrl = "http://10.10.10.244:4040";
const login = async (data: any) => {
  try {
    const response = await axios({
      url: baseUrl + "/api/auth/login",
      method: "POST",
      data: data,
      headers: {},
    });
    console.log("login response", response);
    if (response.data.message == "Login success") {
      setCookie("token", response.data.token);
      setCookie("username", data.username);
      setCookie("password", data.password);
      setCookie("role", response.data.role);
      return response.data.message;
    } else {
      throw Error(response?.data?.message);
    }
  } catch (err: any) {
    console.log("login error", err);
    toast.error("Хэрэглэгчийн нэр эсвэл нууц үр буруу байна.", {
      hideProgressBar: true,
    });
  }
};

export const authService = {
  login,
};
