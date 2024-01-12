<template>
  <div>
    <el-pagination v-model:current-page="currentPage2" :pageSize="pageSize" background layout="prev, pager, next"
      :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'

export default {
  props: ['total', 'pageSize'],
  emits: ['changePage', 'changeSize'],
  setup(props, { emit }) {
    // 当前页
    let currentPage2 = ref(1)
    // 当前数量
    let pageSize = ref(0)
    // 总数
    let total = ref(0)


    // 当前数量变化
    const handleSizeChange = (val: number) => {
      console.log('val: ', val);
      emit('changeSize', val)
    }

    // 当前页变化
    const handleCurrentChange = (val: number) => {
      console.log('val: ', val);
      emit('changePage', val)
    }

    watch(() => props.total, (val) => {
      total.value = val
    })

    watch(() => props.pageSize, (val) => {
      console.log('val: ', val);
      pageSize.value = val
    })

    return {
      currentPage2,
      pageSize,
      total,
      emit,
      handleSizeChange,
      handleCurrentChange
    }
  }
}




</script>


<style lang="scss" scoped></style>