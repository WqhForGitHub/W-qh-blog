<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <p>文章目录</p>
      </div>
      <div class="markdown-body" v-html="$store.state.blogcontent.blogToc">
      </div>
    </el-card>
  </div>
</template>

<script>


export default {
  data() {
    return {

    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  .clearfix {
    p {
      text-align: center;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .markdown-body {
    box-sizing: border-box;
		margin: 0 auto;
    padding: 1px;
    color:#000;
  }
}
</style>