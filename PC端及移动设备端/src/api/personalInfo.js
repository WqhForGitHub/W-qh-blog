import axios from "axios";
import baseUrl from "./config";

export function getPersonalInfo() {
  return axios({
    url: baseUrl + "/PerosnalInfo",
    method: "get"
  });
}
