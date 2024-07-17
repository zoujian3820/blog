<template>
  <div class="echar_1" ref="echartRef"></div>
</template>

<script setup lang="ts">
// npm install echarts
import { ref, onMounted } from 'vue';
const echartRef = ref<HTMLDivElement>();
import * as echarts from 'echarts';

/***********添加legend图例,toolbox和dataZoom组件 grid坐标 ***********************************************************************/
onMounted(() => {
  const myChar = echarts.init(echartRef.value as HTMLDivElement, 'dark', { renderer: 'canvas' })
  myChar.setOption({
    title: { text: 'Echars多系列图', subtext: '副标题, 哈哈哈' },
    animationDuration: 6000, // 动画时长
    tooltip: {
      trigger: 'axis',
      // formatter: (a) => {
      //   console.log(a)
      //   return 'zzz'
      // }
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
      data: ['食品', '数码', '家电', '服饰', '其他']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}万'
      }
    },
    // 使用正上方图例组件
    legend: {
      data: [{
        name: '柱状图',
        icon: 'circle',
        textStyle: {
          color: 'red'
        }
      }, '分类', '折线图'],
      // left: 150
    },
    // 使用右上角工具组件
    toolbox: {
      feature: {
        saveAsImage: {
          title: '保存为图片'
        },
        restore: {
          title: '还原'
        },
        dataView: {
          title: '数据视图',
          // icon: 'image://https://www.baidu.com/img/flexible/logo/pc/result.png'
        },
        dataZoom: {
          yAxisIndex: false,
          title: {
            zoom: '区域缩放',
            back: '区域缩放还原'
          }
        },
        magicType: {
          type: ['line', 'bar'],
          title: {
            line: '切换为折线图',
            bar: '切换为柱状图',
            stack: '切换为堆叠',
            tiled: '切换为平铺'
          }
        }
      }
    },
    // 使用底部拖动过滤组件
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 100
      }
    ],
    // 更改坐标
    grid: {
      left: '20%',
      right: 130,
      // bottom: 100,
      top: 70,
      height: '40%'
    },
    series: [
      {
        name: '柱状图',
        // 对应X轴xAxis中data的数据
        encode: { x: 0, y: 1 },
        type: 'bar',
      },
      {
        name: '分类',
        type: 'pie',
        // 饼图中心位置坐标
        center: ['75%', 73],
        label: {
          position: 'inside', // 'outer',
          // formatter: '{b}:{c}',
          color: '#000'
        },
        radius: 40,
        encode: { itemName: 3, value: 4 }
      },
      {
        name: '折线图',
        type: 'line',
        encode: { x: 0, y: 2 }
      }
    ]
  })
})
</script>
<style lang="scss" scoped>
@import './style/index.scss'
</style>
