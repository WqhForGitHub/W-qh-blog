//定义请求参数
export interface ListParams {
  id: number; //用户id
  pageNum?: any; // 当前页
  pageSize?: any; // 一页多少数据
  tagValue?: any;
}

export interface RowItem {
  id: number; //文件id
  fileName: string; //文件名
}

// 定义接口返回数据
export interface ListModel {
  page?: 1;
  pageNum?: 10;
  code: number;
  allBlogs: any;
  total: number;
  tagValue?: any;
  data: {
    allBlogs: any;
    tagValue?: any;
  };
}

// 添加博客
export interface addBlogModel {
  blogContent?: any;
  blogName?: string;
  abstract?: string;
  author?: string;
  markdownContent?: string;
  HTMLContent?: string | undefined;

  blogTitle?: any;
  motto?: any;
  tag?: any;
  isMarked?: any;
  code?: any
}

export interface tagModel {}
