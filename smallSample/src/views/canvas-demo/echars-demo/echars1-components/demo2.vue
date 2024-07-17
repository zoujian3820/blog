<template>
  <div class="echar_1" ref="echartRef"></div>
</template>

<script setup lang="ts">
// npm install echarts
import { ref, onMounted } from 'vue';
const echartRef = ref<HTMLDivElement>();
import * as echarts from 'echarts';

/***********使用dataset, 集中管理数据***********************************************************************/
onMounted(() => {
  const myChar = echarts.init(echartRef.value as HTMLDivElement, 'dark', { renderer: 'canvas' })
  myChar.setOption({
    title: { text: 'Echars多系列图' },
    tooltip: {
      trigger: 'axis'
    },
    // 使用dataset, 集中管理数据
    dataset: {
      source: [
        ['食品', 120, 0, '分类1', 73],
        ['数码', 200, 200, '分类2', 200],
        ['家电', 150, 150, '分类3', 150],
        ['服饰', 80, 80, '分类4', 80],
        ['其他', 70, 70, '分类5', 70]
      ]
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
        // data: [120, 200, 150, 80, 70],
        encode: { x: 0, y: 1 }, // 对应dataset.source中的数据 第1列和第2列
        // itemStyle: {
        //   color: '#50a0ff'
        // },
        type: 'bar', // line bar pie scatter heatmap
        color: 'yellow', // #50a0ff
        showBackground: true,
        backgroundStyle: {
          color: '#eeeeee22' // rgba(180, 180, 180, 0.2)
        }
      },
      {
        type: 'pie',
        // 饼图中心位置坐标
        center: ['75%', 73],
        radius: 40,
        encode: { itemName: 3, value: 4 } //对应dataset.source中的数据 第4列和第5列
        // data: [
        //   {value: 120, name: '分类1'},
        //   {value: 200, name: '分类2'},
        //   {value: 150, name: '分类3'},
        //   {value: 80, name: '分类4'},
        //   {value: 70, name: '分类5'}
        // ]
      },
      {
        type: 'line',
        // data: [0, 200, 150, 80, 70],
        encode: { x: 0, y: 2 } //对应dataset.source中的数据 第1列和第3列
      }
    ]
  })
})
</script>
<style lang="scss" scoped>
@import './style/index.scss'
</style>
