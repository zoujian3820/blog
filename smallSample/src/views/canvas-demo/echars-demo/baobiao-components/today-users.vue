<template>
  <common-card title="今日交易用户数" value="81,427">
    <template v-slot:default>
      <div class="my_chart" ref="chartRef" style="width:100%;height:100%"></div>
    </template>
     <!-- 具名插槽名 -->
     <template #footer>
      <div>
        <span>退货率</span>
        <span class="emphasis">5.14%</span>
      </div>
    </template>
  </common-card>
</template>

<script setup lang="ts">
import CommonCard from './common-card.vue'
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
const chartRef = ref<HTMLDivElement | null>(null);
const myChart: { instance: echarts.EChartsType | null } = { instance: null }

defineExpose({ myChart })

onMounted(() => {
  myChart.instance = echarts.init(chartRef.value!)
  myChart.instance.setOption({
    // color: ['red'],
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      show: false,
      // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00']
      // boundaryGap: false,
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        type: 'bar',
        smooth: true,
        symbol: 'none',
        itemStyle: {
          color: '#1170ba'
        },
        data: [410, 82, 200, 334, 390, 330, 220, 150, 82, 200, 134, 290, 330, 150],
        barWidth: '60%'
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  });
});
</script>
<style lang="scss" scoped></style>
