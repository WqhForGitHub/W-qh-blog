import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: (resolve) => require(['../Blog/Blog.vue'], resolve)
    },
    {
      path: '/Blogcontent',
      component: (resolve) => require(['../Blogcontent/Blogcontent.vue'], resolve)
    },
    {
      path: '/Blogcatalog',
      component: (resolve) => require(['../Blogcatalog/Blogcatalog.vue'], resolve)
    }
  ]
})
