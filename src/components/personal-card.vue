<template>
   <div>
      {{ userInfo.name }}
      {{ userInfo.age }}
      {{ userInfo.sex }}
      {{ userInfo.likeNum }}
      {{ userInfo.publishNum }}
      {{ userInfo.createTime }}
   </div>
</template>

<script setup lang="ts">
import useMain from '../store/home'
import { storeToRefs } from 'pinia';

const main = useMain();

let { userInfo }: any = storeToRefs(main)
</script>

