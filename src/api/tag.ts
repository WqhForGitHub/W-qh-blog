import HttpClient from "../utils/axios";
import type { ListParams, addBlogModel, ListModel } from "./model/list-item";

// 获取所有标签
export const getTags = () => {
  return HttpClient.get<ListModel>("/tag");
};
