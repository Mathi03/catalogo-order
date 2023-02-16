import { AxiosRequestConfig, AxiosResponse } from "axios";
import http from "../http-common";

const responseBody = (response: AxiosResponse) => response.data;

const orderRequests = {
  post: (url: string, body: any, config: AxiosRequestConfig) =>
    http.post<any>(url, body, config).then(responseBody),
};

const createOrder = (
  body: any,
): Promise<any> => {
  return orderRequests.post("", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default {
  createOrder,
};
