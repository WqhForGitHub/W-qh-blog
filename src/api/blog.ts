import HttpClient from "../utils/axios";
import type { ListParams, addBlogModel, ListModel } from "./model/list-item";

export const getList = (params: ListParams) => {
  return HttpClient.get<ListModel>("/blog", { params });
};

// 添加博客
export const AddBlog = (params: addBlogModel) => {
  return HttpClient.post<addBlogModel>("/blog", params);
};
