<template>
  <div class="container">
    <el-form label-width="200px">
      <el-form-item label="博客标题">
        <el-input v-model="dataObject.blogTitle" />
      </el-form-item>
      <el-form-item label="博客简介">
        <el-input v-model="dataObject.motto" />
      </el-form-item>
      <el-form-item label="博客类型">
        <el-select v-model="dataObject.tag" placeholder="please select your zone">
          <el-option v-for="(item, index) in tagLists" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否markedDown">
        <el-radio v-model="dataObject.isMarked" label="0" value="0">是</el-radio>
        <el-radio v-model="dataObject.isMarked" label="1" value="1">否</el-radio>
      </el-form-item>
      <el-form-item label="博客内容">
        <el-input type="textarea" :rows="20" style="width: 900px;" v-model="dataObject.blogContent"> </el-input>
      </el-form-item>

      <el-button type="primary" @click="confirmAdd()">确认</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useMain from '../store/home'
import { AddBlog } from '../api/blog'
import { storeToRefs } from 'pinia';

const main = useMain();

let { tagLists }: any = storeToRefs(main)

let a = tagLists.value
a.forEach((item: any) => {
  item.value = item['字典值']
  item.label = item['名称']
})
console.log('tagLists.value: ', tagLists.value);


let dataObject = ref({
  blogTitle: '',
  motto: '',
  tag: '0',
  isMarked: true,
  blogContent: ''
})


// 确认添加
const confirmAdd = () => {
  AddBlog({ ...dataObject.value }).then((res) => {
    if (res.data.code === 0) {
      dataObject.value = {
        blogTitle: '',
        motto: '',
        tag: '0',
        isMarked: true,
        blogContent: ''
      }
    }
  })
}
</script>


<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #fff;

  .el-form {
    margin-top: 100px;
    margin-left: 400px;
    position: absolute;
  }
}
</style>