<template>
  <div>
    <header>
      <menuList></menuList>
    </header>
    <section style="background: #f0f0f0;height: 100%">
      <div class="container">
        <div class="contentArea">
          <blogList
          :page="page"
            @showBlogContent="showBlogContent"
            v-show="!showCatalog"
            class="blogList"
          ></blogList>
          <blogContent
            :blogItem="blogItem"
            @showBlogItem="showBlogItem"
            class="blogContent"
            v-if="showCatalog"
          ></blogContent>
        </div>
        <div class="right">
          <personalInfo class="personalCard"></personalInfo>
          <catalog
            :blogToc="blogToc"
            v-if="showCatalog"
            class="catalogCard"
          ></catalog>
        </div>
      </div>
      <el-pagination
        @current-change="getCurrentPage"
        v-if="!showCatalog"
        class="page"
        background
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import menuList from "./menu";
import blogList from "./blogList";
import personalInfo from "./PersonalInfo";
import catalog from "./blogCatalog";
import blogContent from "./blogContent";
require("../viewstyle/blog.scss");
export default {
  components: {
    menuList,
    blogList,
    personalInfo,
    catalog,
    blogContent
  },
  data() {
    return {
      showCatalog: false,
      blogItem: {},
      blogToc: "",
      page: 1,
    };
  },
  methods: {
    // 显示博客内容和目录
    showBlogContent(item) {
      this.showCatalog = true;
      this.blogItem = item;
      this.blogToc = this.blogItem.blogToc;
    },
    showBlogItem() {
      this.showCatalog = false;
    },
    // 获得当前页
    getCurrentPage(currentPage) {
      this.page = currentPage
    }
  }
};
</script>
