import { AxiosResponse } from "axios";
import http from "../http-common";
import Product from "../types/Product.type";

const responseBody = (response: AxiosResponse) => response.data;

const productRequests = {
  get: (url: string) => http.get<string[]>(url).then(responseBody),
};

class ProductService {
  getSingleProduct(isbn: string): Promise<string[]> {
    return productRequests.get("?sku=" + isbn + "&isPromoter=true");
  }
  getByModelOrSku(isbn: string): Promise<Array<string[]>> {
    return productRequests.get("?model=" + isbn + "&isList=true");
  }
}

export default new ProductService();
