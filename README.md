# 博客前台

项目地址: [https://github.com/WqhForGitHub/W-qh-blog](https://github.com/WqhForGitHub/W-qh-blog)

如果你觉得项目不错的话，欢迎点击右上角的'star'鼓励支持下，万分感谢。(๑*◡*๑)   

## 前言

以前我们是用hexo + next来搭建自己的博客，但最近学习了Vue之后，我被它的数据驱动和组件化思想所吸引。所以就用了Vue搭建了一个自己的个人博客。Vue实际上对应着MVVM模式下的View图层，要搭建一个完整的应用仅仅只有Vue是不够的，我们还需要结合数据状态管理vuex、路由vue-router等等

## 技术栈

### 前端

* vue
* axios: 异步请求库
* vuex：管理这个应用数据
* vue-router：前端路由
* Element/Iview：桌面端组件库   

### 后端

* koa

  博客的后端是使用Node.js开发的，基于koa的Web框架，完美实现前后端的分离，后端只需要负责提供接口数据，而路由的跳转、数据渲染都是由前端实现的。

  项目地址:[https://github.com/WqhForGitHub/W-qh-server](https://github.com/WqhForGitHub/W-qh-server)

### 实现的功能

- [x] 博客首页列表展示
- [x] 博客内容markdown格式
- [x] 博客的分类和标签
- [x] 返回顶部
- [x] 响应式设计

### TODO

- [ ] 分类页面
- [ ] 标签页面
- [ ] markdown编辑器
- [ ] 界面的优化

## 博客预览

**首页**

![博客首页](https://w-qh-1257950569.cos.ap-guangzhou.myqcloud.com/Blog/Home.png)

**标题**
![标题](https://w-qh-1257950569.cos.ap-guangzhou.myqcloud.com/Blog/title.png)

**内容**
![内容](https://w-qh-1257950569.cos.ap-guangzhou.myqcloud.com/Blog/content.png)

**结论**
![结论](https://w-qh-1257950569.cos.ap-guangzhou.myqcloud.com/Blog/conclusion.png)

## 项目总结

接下来我大致介绍下我在做博客项目时的一些经历和体会。

#### 前端路由

前端发展可谓是很快的，以前用express搭建后台服务的时候，我们知道有后端路由的概念。根据请求路径的不用我们就返回不同的页面数据。而我们学习并使用了前端路由的时候我们发现其实原理是相类似的，就是当页面刷新的时候，不会发起URL的请求，它只是根据不同URL去渲染不同的组件。

```vue
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
```

上面的代码就是所使用的前端路由vue-router，它是根据不同的路由来渲染不同的组件。

#### 如何管理应用数据

虽然bus已经很好的帮你解决了跨组件需求，但是它在数据管理、维护、架构设计上还只是个简单的组件，而`Vuex`却能更优雅和高效地完成状态管理。

```vue
const store = new Vuex.Store({
  state: {
    bloglist: [],
    blogcontent: {}
  },
  mutations: {
    setbloglist (state, params) {
      state.bloglist = params.bloglists
    },
    setblogcontent (state, params) {
      state.blogcontent = params.blogcontent
    }
  }
})
```

`store`包含了应用的数据（状态）和操作过程。Vuex的数据都是响应式的，任何组件使用同一`store`的时候，只要`store`发生变化，对应的组件就会立即更新。

在组件内，来自`store`的数据只能读取，不能手动改变，改变`store`中的数据的唯一途径就是显式地提交`mutations`







