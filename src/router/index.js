import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: (resolve) => require(['../view/Blog.vue'], resolve)
    },
    {
      path: '/Blogcontent',
      component: (resolve) => require(['../view/Blogcontent.vue'], resolve)
    },
    {
      path: '/Blogcatalog',
      component: (resolve) => require(['../view/Blogcatalog.vue'], resolve)
    }
  ]
})
