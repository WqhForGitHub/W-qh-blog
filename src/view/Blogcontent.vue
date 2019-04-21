<template>
  <div class="Blogcontent">
    <el-card class="box-card">
      <div class="title"><p>{{$store.state.blogcontent.blogtitle}}</p></div>
        <div class="iconset">
          <!--时间-->
          <div class="time">
            <div class="timeicon">
              <img src="/static/shijian.png" />
            </div>
            <p class="timenum">{{$store.state.blogcontent.publishTime}}</p>
          </div>
          <!--观看数-->
          <div class="watch">
            <div class="watchicon">
            <img src="/static/yanjing.png" />
            </div>
            <p class="watchnum">{{$store.state.blogcontent.watchnum}}</p>
          </div>
          <!--标签-->
          <div class="label">
            <div class="labelicon">
            <img src="/static/biaoqian.png" />
            </div>
          </div>
          <!--你要放入的标签-->
          <div class="insertlabel" v-for="(item, index) in $store.state.blogcontent.tagList" :key="index">
            <Tag class="atag" :color="item.color">{{item.tagname}}</Tag>
          </div>
          <div class="form">
            <div class="formicon">
              <img src="/static/wenjianjia.png" />
            </div>
          </div>
          <div class="insertform" v-for="(item, index) in $store.state.blogcontent.selectedkind" :key="index">
            <Tag class="formtag" :color="item.color">{{item.name}}</Tag>
          </div>
        </div>
        <!--关闭按钮-->
        <div class="close" @click="close">
          <img src="/static/close.png" />
        </div>
        <!--简介-->
        <div class="BlogbriefInfo">
          <p>{{$store.state.blogcontent.briefcontent}}</p>
        </div>
        <!--博客具体内容-->
        <div class="markdown-body"  v-html="$store.state.blogcontent.blogcontent" v-highlight>
          {{$store.state.blogcontent.blogcontent}}
        </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      Closeicon:true,
      imgarray:[{}]
    }
  },
  methods:{
    close() {
      let flag = false
      this.$emit('close',flag)
    }
  }
}
</script>

<style scoped lang="less">
.Blogcontent {
  .box-card {
    width:820px;
    min-height:921px;
    height:auto;
    margin-top:2%;
    margin-left:-1%;
    .title {
      width:100%;
      height:55px;
      text-align: center;
      p {
        font-size:25px;
        font-family: 'PingFang SC';
      }
    }
    .close {
      width:35px;
      height:35px;
      float:right;
      color:gray;
      margin-top:-12%;
      img {
        width:100%;
        height:100%;
      }
    }
    .iconset {
      width:78%;
      height:23px;
      display: flex;
      flex-wrap: wrap;
      margin:0 auto;
      .time {
        width:80px;
        height:100%;
        display: flex;
        .timeicon {
          width:28px;
          height:20px;
          img {
            width:100%;
            height:100%;
          }
        }
        .timenum {
          width:100%;
          margin-left:5%;
          line-height:20px;
        }
      }
      .watch {
        width:60px;
        height:100%;
        margin-left:5%;
        display: flex;
        .watchicon {
          width:20px;
          height:81%;
          img {
            width:100%;
            height:100%; 
          }
        }
        .watchnum {
          margin-left:10%;
          line-height:20px; 
        }
      }
      .label {
        width:30px;
        width:auto;
        height:100%;
        display: flex;
        margin-left:4%;
        .labelicon {
          width:20px;
          height:20px; 
          img {
            width:100%;
            height:100%;
          }
        }    
      }
      .insertlabel {
        min-width:35px;
        width:auto;
        height:20px;
        margin-top:-0.2%;
        // margin-left:2%;
        text-align: center;
        padding-right:6px;
        padding-left:6px;
        .atag {
          width:100%;
          height:100%;
          line-height: 20px;
          border-radius:5px;
          padding-right:10px;
          padding-left:10px;
        }
      } 
      .form {
        width:25px;
        height:100%;
        margin-left:6%;
        display: flex;
        .formicon {
          width:25px;
          height:23px;
          img {
            width:100%;
            height:100%;
          } 
        }   
      }
      .insertform {
        min-width:80px;
        width:auto;
        height:20px;
        margin-top:0.1%;
        margin-left:1%;
        text-align: center;
        line-height:20px;
        border-radius:5px;
        .formtag {
          width:100%;
          height:100%;
        }
      }
    }
    .BlogbriefInfo {
      width:98%;
      min-height:40px;
      height:auto;
      font-size:16px;
      margin:3.2% auto;
      font-family: 'PingFang SC';
    }
    .markdown-body {
      // width:98%;
      // min-height:400px;
      // height:auto;
      // font-size:17px;
      // line-height:33px;
      // margin:3% auto;
      box-sizing: border-box;
      min-width: 200px;
      max-width: 980px;
      margin: 0 auto;
      padding: 0px;
    }
  }
}
</style>