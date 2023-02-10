import { AxiosResponse } from "axios";
import http from "../http-common";

const responseBody = (response: AxiosResponse) => response.data;

const partnerRequests = {
  get: (url: string) => http.get<string[]>(url).then(responseBody),
};

class PartnerService {
  getPartners(isbn: string): Promise<Array<string[]>> {
    return partnerRequests.get("?personaId=" + isbn + "&isDirector=true");
  }
}

export default new PartnerService();
