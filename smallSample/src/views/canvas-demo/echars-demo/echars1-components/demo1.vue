<template>
   <div class="echar_1" ref="echartRef" id="echart_1"></div>
</template>

<script setup lang="ts">
// npm install echarts
import { ref, onMounted, onUnmounted } from 'vue';
const echartRef = ref<HTMLDivElement>();
// import { importJs } from '@/utils';
import * as echarts from 'echarts';
// import './theme/dark.js'

onMounted(async () => {
  // const { default: darkTheme } = await import('./theme/dark.json')
  // 更换定制的颜色主题 https://echarts.apache.org/zh/theme-builder.html
  const { default: darkTheme } = await import('../theme/dark2.json')
  // console.log(darkTheme)
  echarts.registerTheme('dark', darkTheme)

  const myChar = echarts.init(echartRef.value as HTMLDivElement,
  'dark',  // light
   { renderer: 'svg' } // 默认 canvas
  )
  myChar.setOption({
    title: { text: 'Echars多系列图' },
    animationDuration: 5000, // 动画时长
    tooltip: {
      trigger: 'axis',
      // 结果展示 降序 升序
      order: 'valueDesc', // valueDesc valueAsc
    },
    xAxis: {
      type: 'category',
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      data: ['食品', '数码', '家电', '服饰', '其他']
    },
    yAxis: { type: 'value' },
    series: [
      {
        // 对应X轴xAxis中data的数据
        data: [120, 200, 150, 80, 70],
        type: 'bar', // line bar pie
        // color: 'yellow', // #50a0ff
        // showBackground: true,
        // backgroundStyle: {
        //   color: '#eeeeee22' // rgba(180, 180, 180, 0.2)
        // }
      },
      {
        type: 'pie',
        // 饼图中心位置坐标
        center: ['75%', 73],
        radius: 40,
        data: [
          {value: 120, name: '分类1'},
          {value: 200, name: '分类2'},
          {value: 150, name: '分类3'},
          {value: 80, name: '分类4'},
          {value: 70, name: '分类5'}
        ],
        label: {
          fontSize: 16,
          color: 'yellow',
          fontWeight: 'bold'
        }
      },
      {
        type: 'line',
        data: [0, 200, 150, 80, 70],
      },
      {
        // 散点图
        type: 'scatter',
        data: [100, 150, 130, 60, 50],
        itemStyle: {
          color: 'red'
        }
      }
    ]
  })
})
</script>
<style lang="scss" scoped>
@import './style/index.scss'
</style>
