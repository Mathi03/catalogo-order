import { AxiosRequestConfig, AxiosResponse } from "axios";
import http from "../http-common";

const responseBody = (response: AxiosResponse) => response.data;

const productRequests = {
  get: (url: string, config?: AxiosRequestConfig) =>
    http.get(url, config).then(responseBody),
};

class ProductService {
  getSingleProduct(isbn: string): Promise<string[]> {
    return productRequests.get("", {
      params: {
        sku: isbn,
        isPromoter: true,
      },
    });
  }
  getByModelOrSku(isbn: string): Promise<Array<string[]>> {
    // return productRequests.get("?model=" + isbn + "&isList=true");
    return productRequests.get("", {
      params: {
        model: isbn,
        isList: true,
      },
    });
  }
}

export default new ProductService();
