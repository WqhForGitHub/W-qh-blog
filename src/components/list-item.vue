<template>
  <div class="container">
    <div class="left">
      <div class="kind" @click="clickTag">
        <div class="kind-item">
          <div class="icon">
            <img src="../assets/iconfont/total-black.png" />
          </div>
          <div class="text">综合</div>
        </div>
        <div class="kind-item">
          <div class="icon">
            <img src="../assets/iconfont/front-end-black.png" />
          </div>
          <div class="text">前端</div>
        </div>
        <div class="kind-item">
          <div class="icon">
            <img src="../assets/iconfont/back-end-black.png" />
          </div>
          <div class="text">后端</div>
        </div>
        <div class="kind-item">
          <div class="icon">
            <img src="../assets/iconfont/bigData-black.png" />
          </div>
          <div class="text">大数据</div>
        </div>
        <div class="kind-item">
          <div class="icon">

          </div>
          <div class="text">ios</div>
        </div>
        <div class="kind-item">
          <div class="icon">
            <img src="../assets/iconfont/machine.png" />
          </div>
          <div class="text">开发工具</div>
        </div>
      </div>
    </div>

    <div class="right">
      <el-card shadow="never" class="person-card">
        <div class="avatar">
          <el-avatar src="https://img1.baidu.com/it/u=110021325,3211326711&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" />
        </div>

        <div class="name">W-qh</div>
        <div class="About">
          <div class="fabu">
            <div>发布</div>
            <div>46534</div>
          </div>
          <div class="dianzan">
            <div>点赞</div>
            <div>0</div>
          </div>

          <div class="comment">
            <div>评论</div>
            <div>125</div>
          </div>
        </div>

        <div class="icons-group"></div>
      </el-card>
    </div>

    <div class="main">
      <div class="parent-node" v-show="!blogShow">
        <div class="blog-list" v-for="(item, index) in blogList" :key="index" @click="showBlog(item)">
          <div class="content">
            <div class="title">
              <div class="blogName">{{ item.blogTitle }}</div>
              <div class="abstract">{{ item.blogMotto }}</div>

              <div class="info">
                王启豪 | {{ item.tagName }}
              </div>
            </div>

            <div class="picture"></div>
          </div>
        </div>

        <div class="blog-pagination" v-show="!blogShow">
          <myPagination :total="total" :pageSize="pageSize" @changePage="changePage" @changeSize="changeSize">
          </myPagination>
        </div>
      </div>
    </div>

  </div>



  <el-card class="markdown-show" v-if="blogShow">
    <h1 style="text-align: center;">{{ htmlBlogContent.blogTitle }}</h1>
    <div class="kind" style="text-align: center;">前端和后端</div>
    <div class="content" v-html="aff">
    </div>

  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getList } from '../api/blog'
import { getTags } from '../api/tag'
import type { addBlogModel } from '../api/model/list-item'
import myPagination from './pagenation.vue'
import { marked } from "marked";
import useMain from '../store/home'
import { storeToRefs } from 'pinia';

// Using ES6 import syntax
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

let rendererMD = new marked.Renderer();

const main = useMain();

marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  breaks: false,
  pedantic: false,
});//基本设置
let aff: any = ref('')

// 博客列表
let blogList: any = ref([])
let blogShow = ref(false)

// 标签列表
let tagList: any = ref([]);


// 总数
let total = ref(0)
let pageNum = ref(0)
let pageSize = ref(0)

let htmlBlogContent: any = ref('')

total.value = 0
pageSize.value = 0

// 展示博客内容HTML
const showBlog = (item: addBlogModel) => {
  htmlBlogContent.value = item

  aff.value = marked(htmlBlogContent.value.blogMarkDownContent)

  hljs.highlight(
    `${aff.value}`,
    { language: 'html' }
  ).value

  blogShow.value = true
}


// 获取博客列表
const getBlogs = (value: any | undefined) => {
  getList({
    id: 1,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    tagValue: value
  }).then((res) => {
    if (res.data.code === 0) {
      blogList.value = res.data.data
      total.value = res.data.total
      pageSize.value = 5
      console.log(tagList.value);
      for (let i = 0; i < blogList.value.length; i++) {
        for (let j = 0; j < tagList.value.length; j++) {
          if (blogList.value[i].tag === tagList.value[j]["字典值"]) {
            blogList.value[i].tagName = tagList.value[j]["名称"]
          }
        }
      }
    }
  })
}

const getTags1 = () => {
  getTags().then((res) => {
    console.log('res: ', res);

    if (res.data.code === 0) {
      tagList.value = res.data.data;

      let { tagLists } = storeToRefs(main)
      tagLists.value = tagList.value
    }
  })
}

// 添加事件代理
const clickTag = (e: any) => {
  let tagObject: any = ref({
    "前端": 0,
    "ios": 5,
    "后端": 1,
    "综合": undefined,
    "大数据": 4,
    "开发工具": 3
  })
  console.log('e: ', e.target.innerHTML);

  let value: any = tagObject.value[e.target.innerHTML];
  getBlogs(value)
}



// onMounted(() => {
//   getBlogs()
// })
async function a() {
  await getTags1()
  pageNum.value = 1;
  pageSize.value = 5
  await getBlogs(undefined)
}

a()


const changeSize = (val: number) => {
  pageSize.value = val
  getBlogs(undefined)
}

const changePage = (val: number) => {
  pageNum.value = val
  getBlogs(undefined)
}

</script>

<style scoped lang="scss">
.container {
  padding: 0;
  margin: 0;
}

.left {
  width: 22%;
  height: calc(100vh - 70px);
  top: 70px;
  left: 0;
  padding: 0;
  margin: 0;
  position: absolute;

  .kind {
    width: 200px;
    height: 400px;
    margin-top: 20px;
    float: right;
    background: #fff;

    &-item {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      cursor: pointer;

      .icon {
        width: 50px;
        height: 20px;
        text-align: right;
        margin-right: 9px;

        img {
          width: 18px;
          height: 18px;

        }
      }

      .text {}
    }
  }
}

.right {
  width: 22%;
  height: calc(100vh - 70px);
  top: 70px;
  right: 0;
  padding: 0;
  margin: 0;
  position: absolute;
}

.main {
  width: calc(100vw - 48%);
  margin: 0;
  min-height: 20px;
  height: auto;
  margin-left: 24%;
  margin-right: 24%;
  margin-top: 20px;
  padding: 0;
}


.el-card {
  width: 90%;
  margin-top: 20px;
}

.person-card {
  height: 15vw;

  .avatar {
    width: 4vw;
    height: 4vw;
    border-radius: 50%;
    margin: 0 auto;

    .el-avatar {
      width: 100%;
      height: 100%;
    }

  }

  .name {
    text-align: center;
    margin-top: 10px;
  }

  .About {
    display: flex;
    margin-top: 20px;

    .fabu {
      flex: 1;
      text-align: center;
      border-right: 1px solid lightgray;
    }

    .dianzan {
      flex: 1;
      text-align: center;
      border-right: 1px solid lightgray;
    }

    .comment {
      flex: 1;
      text-align: center;
    }
  }
}

.parent-node {

  .blog-list {
    min-height: 1px;
    height: auto;
    background: #fff;

    .content {
      min-height: 70px;
      height: auto;
      margin-left: 20px;
      margin-right: 20px;
      padding-top: 17px;
      padding-bottom: 17px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;

      .title {
        width: 85%;

        .blogName {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }

      .picture {
        flex: 1;
      }

      .abstract {
        margin-top: 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .info {
        margin-top: 13px;
        font-size: 13px;
      }
    }
  }

  .blog-pagination {
    margin-top: 60px;
  }
}

.markdown-show {
  width: 45vw;
  min-height: 80vh;
  height: auto;
  margin: 0 auto;
  padding: 30px;
  word-break: break-all;

  .content {
    margin-top: 30px;
  }

  .kind {
    font-size: 25px;
  }
}
</style>