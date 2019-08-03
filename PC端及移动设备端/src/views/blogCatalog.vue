<template>
  <div>
    <el-card class="catalog">
      <div class="header" slot="header">
        <span>博客目录</span>
      </div>
      <div class="catalogArea" v-html="catalog"></div>
    </el-card>
  </div>
</template>

<script src="../controller/blogCatalog.js"></script>

