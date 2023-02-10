import axios from "axios";
import { setupInterceptorsTo } from "./Interceptors";

let url: string = window.setting.url;
var URLActual = window.location.hostname;
if (URLActual === "localhost" || URLActual === "127.0.0.1") {
  url = "http://localhost:4000/api.php";
}

const http = axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
  },
});

setupInterceptorsTo(http);

export default http;
