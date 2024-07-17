<template>
  <div class="top-view">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(comp, index) of comps" :key="index">
        <el-card shadow="hover">
          <component :is="comp" :ref="(el: any) => cartRefs[index] = el" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import TotalSales from './total-sales.vue'
import TotalOrders from './total-orders.vue'
import TodayUsers from './today-users.vue'
import TotalUsers from './total-users.vue'
import { ref, onMounted, onUnmounted, watchEffect, ComponentInstance } from 'vue';

type CompInstanceType = InstanceType<typeof TotalSales> | InstanceType<typeof TotalOrders> | InstanceType<typeof TodayUsers> |InstanceType<typeof TotalUsers>

const cartRefs = ref<CompInstanceType[]>([])
const comps = [TotalSales, TotalOrders, TodayUsers, TotalUsers]

function onResize() {
  cartRefs.value.forEach((item: CompInstanceType) => {
    const charts = item.myChart.instance
    if(charts) {
      charts.resize()
    }
  });
}

const watchData = ref(0)
watchEffect(() => {
  if(watchData.value) {
    cartRefs.value.forEach((item: CompInstanceType) => {
      const charts = item.myChart.instance
      if(charts) {
        const _options = charts.getOption()
        charts.clear()
        charts.setOption(_options)
      }
    });
  }
})

let timer: NodeJS.Timeout
onMounted(() => {
  timer = setInterval(() => {
    watchData.value++
  }, 6000)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  timer && clearInterval(timer)
  window.removeEventListener('resize', onResize)
})
</script>
<style lang="scss" scoped></style>
