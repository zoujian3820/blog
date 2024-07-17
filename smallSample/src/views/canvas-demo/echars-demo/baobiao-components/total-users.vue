<template>
  <common-card title="累计用户数" value="92,622,014">
    <template v-slot:default>
      <div class="my_chart" ref="chartRef" style="width:100%;height:100%"></div>
    </template>
     <!-- 具名插槽名 -->
     <template #footer>
      <div class="total-users-footer">
        <span>日同比</span>
        <span class="emphasis">9.14%</span>
        <div class="increase" />
        <span style="margin-left:10px;">月同比</span>
        <span class="emphasis">35.97%</span>
        <div class="decrease" />
      </div>
    </template>
  </common-card>
</template>

<script setup lang="ts">
import CommonCard from './common-card.vue'
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
const chartRef = ref<HTMLDivElement | null>(null)
const myChart: { instance: echarts.EChartsType | null } = { instance: null }

defineExpose({ myChart })

onMounted(() => {
  // myChart.instance = echarts.init(chartRef.value)
  // myChart.instance.setOption({
  //   xAxis: [
  //     { type: 'value', show: false, gridIndex: 0, min: 0, max: 300 },
  //     { type: 'value', show: false, gridIndex: 1, min: 0, max: 300 },
  //   ],
  //   yAxis: [
  //     { type: 'category',  show: false, gridIndex: 0 },
  //     { type: 'category',  show: false, gridIndex: 1 },
  //   ],
  //   series: [
  //     {
  //       type: 'bar',
  //       // stack: '总量',
  //       data: [300],
  //       barWidth: 10,
  //       itemStyle: { color: '#eee'},
  //       xAxisIndex: 1,
  //       yAxisIndex: 1
  //     },
  //     {
  //       type: 'bar',
  //       stack: '总量',
  //       data: [210],
  //       barWidth: 10,
  //       itemStyle: { color: '#45c946'},
  //       xAxisIndex: 0,
  //       yAxisIndex: 0
  //     },
  //   ],
  //   grid: [
  //     { bottom: 0, left: 0, right: 0, top: 0 },
  //     { bottom: 0, left: 0, right: 0, top: 0 }
  //   ],
  // })
})


onMounted(() => {
  myChart.instance = echarts.init(chartRef.value)
  myChart.instance.setOption({
    color: ['#1170ba'],
    xAxis: {
      type: 'value',
      show: false,
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        barGap: '-100%',
        // stack: '总量',
        data: [300],
        barWidth: 10,
        itemStyle: { color: '#eee'},
      },
      {
        type: 'bar',
        stack: '总量',
        barGap: '-100%',
        data: [230],
        barWidth: 10,
        itemStyle: { color: '#45c946'},
      },
      {
        type: 'custom',
        stack: '总量',
        data: [230],
        renderItem: ((params: echarts.CustomSeriesRenderItemParams, api: echarts.CustomSeriesRenderItemAPI) => {
          const value = api.value(0)
          const endPoint = api.coord([value, 0])
          return {
            type: 'group',
            position: endPoint,
            children: [
              {
                type: 'path',
                shape: {
                  // svg内容
                  d: 'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
                  // svg的坐标宽高半径
                  x: -5,
                  y: -20,
                  width: 10,
                  height: 10,
                  layout: 'cover'
                },
                style: {
                  fill: '#45c946'
                },
              },
              {
                type: 'path',
                shape: {
                  // svg内容
                  d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
                  // svg的坐标宽高半径
                  x: -5,
                  y: 10,
                  width: 10,
                  height: 10,
                  layout: 'cover'
                },
                style: {
                  fill: '#45c946'
                },
              }
            ]
          }
        }) as echarts.CustomSeriesRenderItem
      }
    ],
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
  })
})

</script>
<style lang="scss" scoped>
.total-users-footer{
  display: flex;
  align-items:center;
}
</style>
