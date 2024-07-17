<template>
  <div class="page">
    <h2 class="header">AntV之G6图可视化引擎-矢量图绘制</h2>
    <div class="content">
      <div ref="g6chartRef" id="g6-chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Graph } from '@antv/g6';
const g6chartRef = ref<HTMLDivElement>();
const data = {
  nodes: [ // 点集
    {
      id: 'node1',
      data: { label: '起始点' },
      // labelCfg: {           // 标签配置属性
      //   position: 'center',// 标签的属性，标签在元素中的位置
      //   style: {            // 包裹标签样式属性的字段 style 与标签其他属性在数据结构上并行
      //     fontSize: 12,     // 标签的文字大小
      //     fill: '#ffffff',  // 标签的文字颜色
      //   }
      // },
      style: {              // 包裹样式属性的字段 style 与其他属性在数据结构上并行
        size: 70,
        x: 100,
        y: 200,
        fill: 'yellow',    // 样式属性，元素的填充色
        stroke: '#000',     // 样式属性，元素的描边色
        lineWidth: 2,       // 节点描边粗细
      }
    },
    {
      id: 'node2',
      data: { label: '中间点2' },
      style: {              // 包裹样式属性的字段 style 与其他属性在数据结构上并行
        size: 85, // 元素的尺寸
        x: 350,
        y: 200,
        fill: '#eee',    // 样式属性，元素的填充色
        stroke: '#ccc',     // 样式属性，元素的描边色
        lineWidth: 2,       // 节点描边粗细
      }
    },
    {
      id: 'node3',
      data: { label: '终点3' },
      style: {              // 包裹样式属性的字段 style 与其他属性在数据结构上并行
        size: 100, // 元素的尺寸
        x: 600,
        y: 300,
        fill: 'green',    // 样式属性，元素的填充色
        stroke: 'red',     // 样式属性，元素的描边色
        lineWidth: 2,       // 节点描边粗细
        labelFill: 'red'
      }
    }
  ],
  edges: [ // 线集
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      label: '连接线1' // 边的文本
    },
    {
      id: 'edge2',
      source: 'node2',
      target: 'node3',
      label: '连接线2', // 边的文本
      style: {
        labelFill: 'red'
      }
    }
  ]
}
onMounted(() => {
  const graph = new Graph({
    container: g6chartRef.value,
    width: 800,
    height: 500,
    data,
    node: {
      type: 'circle', // 节点类型，支持 circle、rect、image
      style: {
        labelText: (d: any) => d.data.label,
        labelPlacement: 'center',
        labelFontSize: 16,
        labelWordWrap: true, // enable label ellipsis
        labelMaxWidth: '90%',

        // labelFill: '#000',
        labelFontWeight: 'bold',
        labelBackground: true,
        labelBackgroundFillOpacity: 0.5,
        labelBackgroundRadius: 4,
        labelBackgroundFill: 'linear-gradient(blue, red)'
      }
    },
    edge: {
      style: {
        // labelText: 'This label is too long to be displayed',
        labelText: (d: any) => d.label,
        labelOffsetY: -6,
        labelTextBaseline: 'bottom',
        labelWordWrap: true,
        labelFontSize: 20,
        labelMaxWidth: '80%',

        labelFontWeight: 'bold',
        // labelFill: 'green',
        labelBackground: true,
        // labelBackgroundFill: 'red',
        labelBackgroundFill: 'linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
        labelBackgroundStroke: '#9ec9ff',
        labelBackgroundFillOpacity: 0.6,
        labelBackgroundRadius: 4
      },
    },
    behaviors: ['drag-element'], // 元素可拖拽
  })
  // graph.addData(data)
  graph.render(); // 渲染图
})
</script>
<style lang="scss" scoped>
.page {
  background-color: #fff;
  font-size: 16px;

  .content {
    height: calc(100vh - 0.8rem);
    padding-top: 20px;
    overflow: hidden;
  }
}
</style>
