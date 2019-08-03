import axios from "axios";
import baseUrl from "./config";
import qs from 'qs'

export function getblogList() {
  return axios({
    url: baseUrl + "/find",
    method: "get"
  });
}

export function currentPage(params) {
  return axios({
    url: baseUrl,
    method: 'post',
    data: qs.stringify(params)
  })
}

// export function addObj(obj) {
//   return request({
//     url: '/admin/dict/',
//     method: 'post',
//     data: obj
//   })
// }
