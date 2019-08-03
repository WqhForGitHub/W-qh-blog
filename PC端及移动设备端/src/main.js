import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { Icon, Tag } from "iview";
import "iview/dist/styles/iview.css";
import "github-markdown-css";
import hljs from "highlight.js";
import "highlight.js/styles/atelier-dune-dark.css"; //样式文件
Vue.directive("highlight", function(el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
});
Vue.component("Icon", Icon);
Vue.component("Tag", Tag);

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App)
}).$mount("#app");
