require("../viewstyle/blogContent.scss");
import marked from "marked";
export default {
  props: ["blogItem"],
  data() {
    return {};
  },
  methods: {
    showBlogItem() {
      this.$emit("showBlogItem");
    }
  },
  created() {
    console.log(this.blogItem);
    this.blogItem.blogcontent = marked(this.blogItem.blogcontent);
  }
};
