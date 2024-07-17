<template>
  <div class="echar_1" ref="echartRef"></div>
</template>

<script setup lang="ts">
// npm install echarts
import { ref, onMounted } from 'vue';
const echartRef = ref<HTMLDivElement>();
import * as echarts from 'echarts';

/*********** 双坐标系 ***********************************************************************/
onMounted(() => {
  const myChar = echarts.init(echartRef.value as HTMLDivElement, 'dark', { renderer: 'canvas' })
  myChar.setOption({
    title: { text: 'Echars 双坐标系' },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: [
      { min: 0, max: 100 },
      {
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        // axisLabel: { show: false },
        splitArea: { show: true }
      }
    ],
    // 使用dataset, 集中管理数据
    dataset: {
      source: [
        ['product', '2012', '2013', '2014', '2015'],
        ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
        ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
      ]
    },
    series: [
      {
        type: 'bar',
        seriesLayoutBy: 'row',
        yAxisIndex: 0
        // encode: { x: 0, y: 1 },
      },
      {
        type: 'line',
        seriesLayoutBy: 'row',
        yAxisIndex: 1
      }
    ]
  })
})
</script>
<style lang="scss" scoped>
@import './style/index.scss'
</style>
