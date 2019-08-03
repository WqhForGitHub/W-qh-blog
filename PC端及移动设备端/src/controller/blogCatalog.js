require("../viewstyle/catalog.scss");
import marked from "marked";
export default {
  props: ["blogToc"],
  data() {
    return {
      catalog: ""
    };
  },
  created() {
    this.catalog = marked(this.blogToc);
  }
};
