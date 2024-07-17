<template>
  <div class="page">
    <div class="content">
      <!-- Echars报表页面 -->
      <TopView />
      <SalesView />
      <BottomView />
      <MapView />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopView from './baobiao-components/top-view.vue'
import SalesView from './baobiao-components/sales-view.vue'
import BottomView from './baobiao-components/bottom-view.vue'
import MapView from './baobiao-components/map-view.vue'
// import * as echarts from 'echarts';

</script>

<style>
html body #app {
  max-width: 100%;
}
</style>
<style lang="scss" scoped>
.page {
  background-color: #ffffff;
  font-size: 16px;
  height: 100vh;

  .content {
    width: 100%;
    height: 100%;
    min-height: auto !important;
    background-color: #eee;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
