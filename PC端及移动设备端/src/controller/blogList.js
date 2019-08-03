import { getblogList, currentPage } from "../api/blogList";
import qs from 'qs'
require("../viewstyle/blogList.scss");
export default {
  props: ['page'],
  data() {
    return {
      tableData: []
    };
  },
  watch: {
    page() {
      this.currentChange()
    }
  },
  methods: {
    // 显示博客内容
    showBlogContent(item) {
      this.$emit("showBlogContent", item);
    },
    // 展示博客列表信息
    showBlogList() {
      getblogList()
        .then((response) => {
          if (response.data.code == 0) {
            this.tableData = response.data.blogList;
          } else {
            this.$notify.error({
              title: "错误",
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    },
    // 当前页的改变
    currentChange() {
      let obj = {
        methods: "listblog",
        page: this.page,
        pageSize: 5
        }
      currentPage(obj).then((response) => {

      }).catch((error) => {
          this.$notify.error({
            title: "错误",
            message: error
          });
      })
    }
  },
  mounted() {
    this.showBlogList();
  }
};
