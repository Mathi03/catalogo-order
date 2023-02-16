import { AxiosRequestConfig, AxiosResponse } from "axios";
import http from "../http-common";

const responseBody = (response: AxiosResponse) => response.data;

const partnerRequests = {
  get: (url: string, config?: AxiosRequestConfig) =>
    http.get(url, config).then(responseBody),
};

const getPartners = (isbn: string): Promise<Array<string[]>> => {
  // return partnerRequests.get("?personaId=" + isbn + "&isDirector=true");
  return partnerRequests.get("", {
    params: {
      personaId: isbn,
      isDirector: true,
    },
  });
};

export default {
  getPartners,
};
