import HttpClient from "../utils/axios";
import type {
  login,
  register as typeResigter,
  loginOut as Out,
} from "./model/login";

// 获取publicKey
export const getPublicKey = () => {
  return HttpClient.get("/getPublicKey");
};

// 登录
export const loginIn = (params: login) => {
  return HttpClient.post<login>("/login", params);
};

// 注册
export const register = (params: typeResigter) => {
  return HttpClient.post<typeResigter>("/addUser", params );
};

// 退出登录
export const loginOut = (params: Out) => {
  return HttpClient.post<Out>("/loginOut", params);
};
