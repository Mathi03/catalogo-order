import { AxiosRequestConfig, AxiosResponse } from "axios";
import http from "../http-common";

const responseBody = (response: AxiosResponse) => response.data;

const productRequests = {
  get: (url: string, config?: AxiosRequestConfig) =>
    http.get(url, config).then(responseBody),
};

const getSingleProduct = (isbn: string): Promise<string[]> => {
  return productRequests.get("", {
    params: {
      sku: isbn,
      isPromoter: true,
    },
  });
};
const getByModelOrSku = (isbn: string): Promise<Array<string[]>> => {
  // return productRequests.get("?model=" + isbn + "&isList=true");
  return productRequests.get("", {
    params: {
      model: isbn,
      isList: true,
    },
  });
};

export default {
  getSingleProduct,
  getByModelOrSku,
};
