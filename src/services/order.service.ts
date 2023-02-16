import { AxiosRequestConfig, AxiosResponse } from "axios";
import http from "../http-common";

const responseBody = (response: AxiosResponse) => response.data;

interface BodyCreate {
  fechaCierre: string;
  xmlDetalle: string;
  personaIns: string;
  socioId: string;
}

const orderRequests = {
  post: (url: string, body: BodyCreate, config: AxiosRequestConfig) =>
    http.post<any>(url, body, config).then(responseBody),
};

const createOrder = (
  body: BodyCreate,
): Promise<any> => {
  return orderRequests.post("", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default {
  createOrder,
};
