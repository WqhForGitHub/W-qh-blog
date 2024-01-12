<script setup lang="ts">
// import listItem from "./list-item.vue";
// import personalCard from "./personal-card.vue";

import Header from "./header.vue";
</script>

<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>


<style scoped lang="scss">
.el-container {
  width: 100vw;
  height: 100vh;

  .el-header {
    --el-header-padding: 0 0px !important;
    width: 100%;
    height: 70px;
  }

  .el-aside {
    width: 20%;
  }

  .el-main {
    --el-main-padding: 0px !important;

    .list-item-container {}
  }
}
</style>