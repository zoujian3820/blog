<template>
  <div class="page">
    <h2 class="header">AntV之G2Plot统计图表使用</h2>
    <div class="content">
      <p style="text-align: center;">
        <a target="_blank" :href="G2Link.doc_url">{{ G2Link.doc_url }}</a>
      </p>
      <div ref="g2charRef" id="g2-chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, onMounted } from 'vue';
import { Line } from '@antv/g2plot';

const G2Link = toRaw(reactive({
  doc_url: 'https://g2plot.antv.antgroup.com/manual/getting-started',
  js_url: 'https://unpkg.com/@antv/g2plot@latest/dist/g2plot.min.js'
}))
// import { importJs } from '@/utils';


const g2charRef = ref()
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];


// importJs(G2Link.js_url).then(() => {
// console.log('g2plot加载成功')
// https://g2plot.antv.antgroup.com/api/plots/line
// const plot = new G2Plot.Line(g2charRef.value, {
onMounted(() => {
  const plot = new Line(g2charRef.value, {
    width: 600,
    height: 400,
    autoFit: false,
    data,
    xField: 'year',
    yField: 'value',
    color: '#FE740C',
    point: {
      size: 5,
      color: 'white',
      style: {
        stroke: '#FE740C',
        lineWidth: 2,
        fillOpacity: 0.6,
      }
    },
    label: {
      formatter: (v: any) => {
        return v.value + 'k';
      }
    },
    yAxis: {
      label: {
        formatter: (v: string) => {
          return v + 'k';
        }
      }
    },
    xAxis: {
      label: {
        formatter: (v: string) => {
          return v + '年';
        }
      }
    }
  });
  plot.render();
})
// })



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
