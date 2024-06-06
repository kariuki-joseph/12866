import axios from "axios";
import baseUrl from "./baseUrl.ts";

const weteachApi = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

weteachApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

weteachApi.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    console.log({ error });

    if (error.response.data.code === "token_not_valid") {
      console.log("called");
      window.location.replace("/login");
      return error;
    }
    return error;
  }
);

export default weteachApi;
