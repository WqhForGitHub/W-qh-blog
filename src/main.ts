import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import piniaPersist from "pinia-plugin-persist";

import "./assets/iconfont/download/font/iconfont.js";
let pinia: any = createPinia();

pinia.use(piniaPersist);
createApp(App).use(router).use(pinia).mount("#app");
