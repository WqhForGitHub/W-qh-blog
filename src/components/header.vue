<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item index="/home/listItem">我的博客</el-menu-item>
    <el-menu-item index="/home/myBlog">博客管理</el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="2">
      <template #title><el-avatar :size="50"
          src="https://img1.baidu.com/it/u=110021325,3211326711&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" /></template>
      <el-menu-item index="/personInfo">个人信息</el-menu-item>
      <el-menu-item index="2-2" @click="out">退出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
  
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter()
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {




  console.log(key, keyPath)
  router.push(`${key}`)
}



// 退出登录
const out = async () => {
  router.push({
    path: '/login'
  })
}
</script>
  
<style scoped lang="scss">
.flex-grow {
  flex-grow: 1;
}

.el-menu {
  height: 70px;
  border-bottom: transparent;
}

.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid var(--el-menu-active-color);
  color: #fff !important;
  font-size: 16px;
  background-color: var(--el-menu-active-color);
}
</style>
  