<template>
  <common-card title="累计订单量" value="2,192,54">
    <template #default>
      <div class="my_chart" ref="chartRef" style="width:100%;height:100%"></div>
    </template>
    <!-- 具名插槽名 -->
    <template v-slot:footer>
      <div>
        <span>昨日订单量</span>
        <span class="emphasis">2,000,000</span>
      </div>
    </template>
  </common-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import CommonCard from './common-card.vue'
import * as echarts from 'echarts';
// defineProps<{ title: string, value: string }>()
const chartRef = ref<HTMLElement | null>(null)
// const myChart = ref<echarts.EChartsType>()
const myChart: { instance: echarts.EChartsType | null } = { instance: null }

defineExpose({ myChart })

// const watchData = ref(0)
// watchEffect(() => {
//   if(watchData.value && myChart.instance) {
//     const _options = myChart.instance.getOption()
//     myChart.instance.clear()
//     myChart.instance.setOption(_options)
//   }
// })

// let timer: NodeJS.Timeout
// onUnmounted(()=>{
//   timer && clearInterval(timer)
// })

onMounted(()=>{
  // timer = setInterval(()=> watchData.value++ , 2000)

  myChart.instance = echarts.init(chartRef.value!)
  myChart.instance.setOption({
    // tooltip: {
    //   trigger: 'axis'
    // },
    xAxis: {
      type: 'category',
      show: false,
      boundaryGap: false
    },
    yAxis: {
      show: false
    },
    series: [
      {
        type: 'line',
        data: [620, 432, 220, 534, 790, 430, 220, 320, 532, 320, 834, 690, 530, 220, 620],
        areaStyle: {
          color: 'purple'
        },
        lineStyle: {
          width: 2
        },
        itemStyle: {
          opacity: 0,
          // color: 'red'
        },
        smooth: true
      }
    ],
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  })
})
</script>
<style lang="scss" scoped></style>
