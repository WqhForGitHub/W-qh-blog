import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import HelloWorld from "@/components/HelloWorld.vue";

// @ts-ignore
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("@/components/login.vue"),
  },
  {
    path: "/personInfo",
    component: () => import("@/components/personal-card.vue"),
  },
  {
    path: "/home",
    component: () => import("@/components/home.vue"),
    children: [
      {
        path: "/home/listItem",
        component: () => import("@/components/list-item.vue"),
      },
      {
        path: "/home/myBlog",
        component: () => import("@/components/my-blog.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(""),
  routes,
  //   scrollBehavior(to, from, savedPosition) {
  //     return {
  //       el: '#app',
  //       top: 0,
  //       behavior: 'smooth'
  //     };
  //   }
});

export default router;
