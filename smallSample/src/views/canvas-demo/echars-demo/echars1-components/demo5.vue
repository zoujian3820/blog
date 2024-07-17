<template>
  <div class="echar_1" ref="echartRef"></div>
</template>

<script setup lang="ts">
// npm install echarts
import { ref, onMounted } from 'vue';
const echartRef = ref<HTMLDivElement>();
import * as echarts from 'echarts';

/*********** 多坐标系 ***********************************************************************/
onMounted(async () => {
  const { default: darkTheme } = await import('../theme/dark2.json')
  echarts.registerTheme('dark', darkTheme)

  const myChar = echarts.init(echartRef.value as HTMLDivElement, 'dark', { renderer: 'canvas' })
  myChar.setOption({
    title: { text: 'Echars 多坐标系' },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [
      { type: 'category', gridIndex: 0 },
      { type: 'category', gridIndex: 1 },
    ],
    yAxis: [
      { min: 0, max: 100, gridIndex: 0 },
      {
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        // axisLabel: { show: false },
        splitArea: { show: true },
        gridIndex: 0
      },
      { min: 0, max: 150, gridIndex: 1 },
    ],
    grid: [
      { bottom: '55%', left: 34, right: 34, top: '12%' },
      { bottom: '10%', left: 34, right: 34, top: '55%' }
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
        xAxisIndex: 0,
        yAxisIndex: 0
      },
      {
        type: 'line',
        seriesLayoutBy: 'row',
        xAxisIndex: 0,
        yAxisIndex: 1
      },
      {
        type: 'bar',
        seriesLayoutBy: 'row',
        xAxisIndex: 1,
        yAxisIndex: 2
      }
    ]
  })
})
</script>
<style lang="scss" scoped>
@import './style/index.scss'
</style>
