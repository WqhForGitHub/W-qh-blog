import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import vue from "@vitejs/plugin-vue";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/index.scss";',
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  // 开启代理服务器
  server: {
    host: "0.0.0.0",
    port: 8080,
    open: true,
    https: false,
    proxy: {
      "/api": {
        target: "http://192.168.0.10:3000",
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
});
