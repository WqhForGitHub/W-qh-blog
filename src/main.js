import Vue from 'vue'
import App from './App'
import router from './router'
import hljs from 'highlight.js'
import ElementUI from 'element-ui'
import iview from 'iview'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'
import '../iconfont/iconfont'
import 'lib-flexible'
import 'element-ui/lib/theme-chalk/display.css'
import 'github-markdown-css'
import 'highlight.js/styles/googlecode.css'
import './highlight/styles/github.css'
import { BackTop } from 'ant-design-vue'

Vue.use(BackTop)

Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.use(iview)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

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

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
