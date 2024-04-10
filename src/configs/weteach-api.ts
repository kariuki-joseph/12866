import axios from "axios";

const weteachApi = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

weteachApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzMjg3NzY3LCJpYXQiOjE3MTI2ODI5NjcsImp0aSI6ImQ2MTE3ZmMwNjQyMzRlMjNiNjAyYTk4ODRkMWE5ZDBlIiwidXNlcl9pZCI6MX0.MGh0gV1iOsF76VIWhHk-EHFSC_8VNGtdc7FJvoud2oU`;

  return config;
});

export default weteachApi;
