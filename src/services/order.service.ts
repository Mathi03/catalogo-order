import { AxiosRequestConfig,  AxiosResponse } from "axios";
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

class OrderService {
  createOrder(body: BodyCreate, config: AxiosRequestConfig): Promise<any> {
    return orderRequests.post("", body, config);
  }
}

export default new OrderService();
