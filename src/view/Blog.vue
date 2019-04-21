<template>
  <div class="Blog">
    <!--菜单栏-->
    <header>
      <el-menu id="menu" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="0" style class="menuFirstitem">
          <i id="Homeiconfont" class="iconfont icon-shouye_xuanzhong"></i>
          <span class="Hometext" style>首页</span>
        </el-menu-item>
        <el-menu-item index="1" class="menuSeconditem">
          <i class="iconfont icon-fenlei" id="kindiconfont"></i>
          <span style="font-size:16px;margin-left:5px;" class="Kindtext">分类</span>
        </el-menu-item>
        <el-menu-item index="2" class="menuThirditem">
          <i id="labeliconfont" class="iconfont icon-biaoqian"></i>
          <span style="font-size:16px;margin-left:5px;" class="labeltext">标签</span>
        </el-menu-item>
        <el-menu-item index="3" class="menuForthitem">
          <i class="iconfont icon-renwu-username" id="Abouticonfont"></i>
          <span style="font-size:16px;margin-left:5px;" class="Abouttext">关于</span>
        </el-menu-item>
      </el-menu>
    </header>

    <div class="generationlayout">
      <!--博客内容详情-->
      <Blogcontent
        @close="closeBlogcontent"
        class="BlogDetailcontent"
        v-show="flagBlogDetailcontent === true"
      ></Blogcontent>
      <div class="Blogcontent" v-if="flagBlogcontent === true">
        <!--博客内容列表-->
        <el-card
          v-for="(item,index) in $store.state.bloglist"
          class="box-card"
          id="BlogItem"
          :key="index"
        >
          <div @click="showBlogDetail(index)">
            <!--标题-->
            <p class="Blogtitle">
              <strong>{{item.blogtitle}}</strong>
            </p>
            <!--博客简要介绍-->
            <p class="BlogbriefInfo">{{item.briefcontent}}</p>
            <!--图标集合-->
            <div class="iconset">
              <!--时间-->
              <div class="time">
                <div class="timeicon">
                  <img src="/static/shijian.png">
                </div>
                <p class="timenum">{{item.publishTime}}</p>
              </div>
              <!--观看数-->
              <div class="watch">
                <div class="watchicon">
                  <img src="/static/yanjing.png">
                </div>
                <p class="watchnum">{{item.watchnum}}</p>
              </div>
              <!--标签-->
              <div class="label">
                <div class="labelicon">
                  <img src="/static/biaoqian.png">
                </div>
              </div>
              <!--你要放入的标签-->
              <div class="insertlabel" v-for="(itemone, indexone) in item.tagList" :key="indexone">
                <Tag class="atag" :color="itemone.color">{{itemone.tagname}}</Tag>
              </div>
              <!--所属类型-->
              <div class="form">
                <div class="formicon">
                  <img src="/static/wenjianjia.png">
                </div>
              </div>
              <div
                class="insertform"
                v-for="(itemtwo, indextwo) in item.selectedkind"
                :key="indextwo"
              >
                <Tag class="atag" :color="itemtwo.color">{{itemtwo.name}}</Tag>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <!--博客个人信息部分-->
      <el-card class="box-card" id="BlogPersonalInfo">
        <!--个人头像重叠扩充边框部分-->
        <div class="Blogprotraitborder"></div>
        <!--博客个人头像-->
        <el-tooltip
          class="item"
          effect="dark"
          content="博客管理"
          placement="right"
          style="cursor: pointer"
        >
          <div class="Blogprotrait"></div>
        </el-tooltip>
        <span class="Nametext">W-qh</span>
        <span class="motto">Keep&emsp;focus</span>
        <!--日志数、分类数、标签数-->
        <div class="Totalamount">
          <!--日志数-->
          <div class="LogData">
            <span class="LogDataNumber">{{personalInfo.blognum}}</span>
            <span class="Logtext">日志</span>
          </div>
          <!--分类数-->
          <div class="Kind">
            <span class="kindNumber">{{personalInfo.kindnum}}</span>
            <span class="KindText">分类</span>
          </div>
          <!--标签数-->
          <div class="Tag">
            <span class="TagNumber">{{personalInfo.tagnum}}</span>
            <span class="TagText">标签</span>
          </div>
        </div>
        <!--分享图标-->
        <div class="Shareicon">
          <i class="iconfont icon-GitHub"></i>
          <i class="iconfont icon-weibo"></i>
          <i class="iconfont icon-wap_toolbar_csdn"></i>
        </div>
      </el-card>
      <!--博客目录-->
    <Blogcatalog class="Blogcatalog" v-show="flagBlogDetailcontent === true"></Blogcatalog>
    </div>
    <!--分页-->
    <div class="page">
      <el-pagination
        @current-change="getcurrent"
        :small="true"
        background
        layout="prev, pager, next"
        :page-size="5"
        :page-count="pageCount"
      ></el-pagination>
    </div>
    <!-- 回到顶部 -->
    <a-back-top />
  </div>
</template>

<script>
import Blogcontent from "./Blogcontent.vue";
import Blogcatalog from "./Blogcatalog.vue";
import {
  getPersonalInfo,
  changePage,
  getbloglist,
  modifyblog
} from "../api/index";
import { statusCode } from "../api/api.cfg";

export default {
  components: {
    Blogcontent,
    Blogcatalog
  },
  data() {
    return {
      pageCount: 0,
      activeIndex: 0,
      flagBlogcontent: true,
      flagBlogDetailcontent: false,
      flagBlogcatalog: false,
      imgarray: [{}, {}, {}],
      personalInfo: {}
    };
  },
  methods: {
    // 获取所有博客
    async getbloglist() {
      const res = await getbloglist();
      if (res.status == statusCode.OK) {
        console.log(res.data);
        let blog = res.data;
        this.$store.commit({
          type: "setbloglist",
          bloglists: blog
        });
      }
    },
    // 页面改变重新获取博客列表
    async getcurrent(index) {
      console.log(index);
      const res = await changePage({
        methods: "listblog",
        page: index,
        pageSize: 5
      });
      console.log(res);
      window.scrollTo(0, 0); // 回到顶部
      this.getbloglist();
    },
    // 获取个人信息
    async getpersonalinfoone() {
      const res = await getPersonalInfo();
      if (res.status == statusCode.OK) {
        console.log(res.data);
        this.personalInfo = res.data[0];
        this.pageCount = parseInt(this.personalInfo.blognum / 5) + 1;
      }
    },
    // 更改浏览数
    async updatewatchnum(index) {
      let modifyitem;
      this.$store.state.bloglist.forEach((item, indexone) => {
        if (index == indexone) {
          item.watchnum++;
          modifyitem = item;
        }
      });
      // 提交到数据库
      const res = await modifyblog({
        methods: "update",
        id: modifyitem._id,
        watchnum: modifyitem.watchnum
      });
    },
    // 查看博客具体详情
    showBlogDetail(index) {
      let blogcontent;
      this.$store.state.bloglist.forEach((item, indexone) => {
        if (index == indexone) {
          blogcontent = item;
        }
      });
      console.log("博客内容是:");
      console.log(blogcontent);
      this.$store.commit({
        type: "setblogcontent",
        blogcontent: blogcontent
      });
      this.flagBlogDetailcontent = !this.flagBlogDetailcontent;
      // 更改浏览数
      this.updatewatchnum(index);
      window.scrollTo(0, 0); // 回到顶部
    },
    // 关闭博客详情
    closeBlogcontent(close) {
      this.flagBlogDetailcontent = close;
    }
  },
  mounted() {
    this.getpersonalinfoone();
    this.getcurrent(1);
    this.getbloglist();
  }
};
</script>

<style lang="less" scoped>
@import "../../iconfont/Blogiconfont/iconfont.css";
#menu :nth-child(1):hover {
  background-color: lightblue;
}
#menu :nth-child(2):hover {
  background-color: lightblue;
}
#menu :nth-child(3):hover {
  background-color: lightblue;
}
#menu :nth-child(4):hover {
  background-color: lightblue;
}
.generationlayout {
  width: 100%;
  max-height: 100%;
  margin: 0 auto;
  display: flex;
  .Blogcatalog {
    width: 269px;
    min-height: 300px;
    right: 68px;
    height: auto;
    margin-top:400px;
    position: absolute;
  }
}
.Blog {
  width: 100%;
  min-height: 1500px;
  height: auto;
  background-color: #f9f9f9;
}
.BlogDetailcontent {
  z-index: 100;
  position: absolute;
}
/* 博客个人信息 */
#BlogPersonalInfo {
  width: 270px;
  height: 350px;
  margin-top: 27px;
  margin-left: -15%;
  .Shareicon {
    width: 150px;
    height: 50px;
    display: flex;
    margin-top: -159px;
    justify-content: flex-start;
    margin-left: 60px;
    i {
      margin-left: 13px;
    }
  }
}
// 媒体查询(个人信息)
@media screen and (max-width: 1100px) {
  #BlogPersonalInfo {
    display: none;
  }
}
@media screen and (min-width: 1100px) and (max-width: 1300px) {
  #BlogPersonalInfo {
    margin-left: -18%;
  }
}

.Blogcontent {
  width: 70%;
  min-height: 570px;
  height: auto;
  margin: auto 10%;
  /* 博客列表项 */
  #BlogItem {
    width: 760px;
    min-height: 25%;
    height: auto;
    margin-left: 40px;
    margin-top: 25px;
    font-family: "PingFang SC";
    position: relative;
    .Blogtitle {
      width: 100%;
      height: 20%;
      font-size: 20px;
    }
    .BlogbriefInfo {
      display: -webkit-box;
      width: 100%;
      height: 70px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 15px;
      color: gray;
      margin-top: 1%;
    }
    .iconset {
      width: 100%;
      height: 18%;
      margin-top: 2%;
      display: flex;
      .time {
        width: 17%;
        height: 20px;
        display: flex;
        .timeicon {
          width: 19%;
          height: 100%;
          margin-top: 1.1%;
          img {
            width: 80%;
            height: 85%;
          }
        }
        .timenum {
          width: 60%;
          height: 20px;
          line-height: 20px;
          margin-left: 1.2px;
          font-size: 12px;
        }
      }
      .watch {
        width: 9.5%;
        height: 20px;
        display: flex;
        .watchicon {
          width: 33%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .watchnum {
          width: 40%;
          height: 20px;
          text-align: center;
          line-height: 20px;
          margin-left: 3px;
          font-size: 12px;
        }
      }
      .label {
        width: 22px;
        height: 20px;
        display: flex;
        margin-left: 3%;
        margin-top: 0.1%;
        .labelicon {
          width: 21px;
          height: 21px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .insertlabel {
        min-width: 2px;
        width: auto;
        height: 23px;
        margin-left: 1%;
        margin-top: -0.2%;
        text-align: center;
        border-radius: 5px;
        .atag {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          padding-right: 12px;
          padding-left: 12px;
          line-height: 23px;
          font-size: 12px;
        }
      }
      .form {
        width: 28px;
        height: 20px;
        display: flex;
        margin-left: 4%;
        margin-top: 0.1%;
        .formicon {
          width: 22px;
          height: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .insertform {
        min-width: 80px;
        width: auto;
        height: 23px;
        margin-left: 1%;
        margin-top: -0.4%;
        text-align: center;
        // border:1px solid lightgray;
        border-radius: 5px;
        .atag {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          padding-right: 12px;
          padding-left: 12px;
          line-height: 23px;
          font-size: 12px;
        }
        // padding-right:12px;
        // padding-left:12px;
        // p {
        //   line-height:20px;
        // }
      }
    }
    // (媒体查询)博客图标分类
    @media screen and (max-width: 700px) {
      .BlogbriefInfo {
        width: 100%;
        min-height: 13%;
        height: auto;
        font-size: 15px;
        color: gray;
        margin-top: 3%;
        word-break: normal;
      }
      .iconset {
        width: 100vw;
        display: flex;
        flex-wrap: wrap;
        margin-top: 5%;
        .time {
          width: 30%;
          .timeicon {
            width: 22px;
            height: 100%;
            img {
              width: 83%;
              height: 85%;
            }
          }
          .timenum {
            width: 80%;
            height: 20px;
            line-height: 20px;
            margin-left: 5px;
            font-size: 12px;
          }
        }
        .watch {
          width: 15%;
          height: 20px;
          display: flex;
          .watchicon {
            width: 34%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .watchnum {
            width: 40%;
            height: 20px;
            text-align: center;
            line-height: 21px;
            font-size: 12px;
            margin-left: 6%;
          }
        }
        .label {
          width: 22px;
          height: 20px;
          display: flex;
          margin-left: 4%;
          margin-top: 0.4%;
          .labelicon {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .insertlabel {
          min-width: 50px;
          width: auto;
          height: 20px;
        }
        .form {
          width: 22px;
          height: 20px;
          display: flex;
          margin-top: 0.4%;
          .formicon {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .insertform {
          min-width: 20px;
          width: auto;
          height: 20px;
        }
      }
    } // BlogIstem
  }
  // (媒体查询)博客图标分类
  @media screen and (max-width: 1020px) {
    #BlogItem {
      width: 95vw;
      margin-left: -11%;
    }
  }
  .page {
    width: 50%;
    height: 40px;
    margin: 4% auto;
  }
} //Blogcontent
/* 菜单栏 */
#menu {
  width: 100vw;
  border-top: 2px solid blue;
  display: flex;
}
.menuFirstitem {
  margin-left: 13vw;
  .Hometext {
    font-size: 16px;
    margin-left: 5px;
  }
}
// 媒体查询(菜单栏)
@media screen and (max-width: 760px) {
  #menu :nth-child(1) {
    width: 23vw;
    margin-left: 1vw;
    #Homeiconfont {
      margin-left: -10%;
      font-size: 19px;
    }
    .Hometext {
      font-size: 16px;
      margin-left: 5px;
      line-height: 15px;
    }
  }
  #menu :nth-child(2) {
    width: 23vw;
    #kindiconfont {
      margin-left: -6%;
    }
    .Kindtext {
      margin-left: 2%;
    }
  }
  #menu :nth-child(3) {
    width: 23vw;
  }
  #menu :nth-child(4) {
    width: 23vw;
  }
}
/* 触碰时菜单栏项的变化 */
.Home {
  background-color: deepskyblue;
  color: white;
}
/* 首页图标样式 */
#Homeiconfont {
  font-size: 20px;
  color: black;
}
/* 博客个人头像 */
.Blogprotrait {
  width: 130px;
  height: 130px;
  margin-left: 57px;
  margin-top: 15px;
  float: left;
  background-image: url(../../static/pig.jpg);
  background-size: 130px 130px;
  background-repeat: no-repeat;
  position: absolute;
}
/* 个人边框阴影部分 */
.Blogprotraitborder {
  width: 138px;
  height: 137px;
  margin-left: 53px;
  margin-top: 12px;
  border: 0.3px solid lightgray;
  position: absolute;
}
/* 博客昵称 */
.Nametext {
  width: 240px;
  margin-top: 150px;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  position: absolute;
}
/* 座右铭 */
.motto {
  width: 140px;
  height: 45px;
  margin-top: 175px;
  margin-left: 50px;
  font-size: 14px;
  text-align: center;
  color: gray;
  word-break: break-all;
  position: absolute;
}
.Totalamount {
  width: 400px;
  height: 10px;
  margin: 222px 52px;
  display: flex;
  .LogData {
    width: 45px;
    height: 45px;
    border-right: 2px solid gray;
    .LogDataNumber {
      width: 34px;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
      position: absolute;
    }
    .Logtext {
      display: block;
      text-align: center;
      width: 34px;
      font-size: 15px;
      color: gray;
      margin-top: 24px;
    }
  }
  .Kind {
    width: 45px;
    height: 45px;
    margin-left: 5px;
    border-right: 2px solid gray;
    .kindNumber {
      width: 34px;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
      position: absolute;
    }
    .KindText {
      display: block;
      text-align: center;
      width: 34px;
      font-size: 15px;
      color: gray;
      margin-top: 25px;
    }
  }
  .Tag {
    width: 45px;
    height: 45px;
    margin-left: 5px;
    .TagNumber {
      width: 34px;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
      position: absolute;
    }
    .TagText {
      display: block;
      text-align: center;
      width: 34px;
      font-size: 15px;
      margin-top: 24px;
      color: gray;
    }
  }
}

.page {
  width: 50%;
  height: 50px;
  display: block;
  margin: 25px auto;
  position: relative;
}
</style>
