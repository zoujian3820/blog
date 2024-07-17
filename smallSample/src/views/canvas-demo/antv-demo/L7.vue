<template>
  <div class="page">
    <h2 class="header">AntV之L7地理空间数据可视分析引擎</h2>
    <div class="content">
      <div class="L7" ref="l7chartRef" i="l7-chart"></div>
      <div class="L7" ref="l7chart2Ref" i="l7-chart2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PointLayer, Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
const l7chartRef = ref<HTMLDivElement>();
const l7chart2Ref = ref<HTMLDivElement>();



import { importJs } from '@/utils';

onMounted(async () => {
  const JsonData = await import('./quan_qiu_dian_zhan.json')

  // console.log(JsonData)
  // (window as any)._AMapSecurityConfig = {
  window._AMapSecurityConfig = {
    //   // 高德官方key对应的安全密钥, 以下是用明文的方式，不安全
    //   // 推荐使用 安全密钥通过nginx代理服务器转发 https://lbs.amap.com/api/javascript-api-v2/guide/abc/jscode
    //   securityJsCode: 'xffffff'

    //   // 要先在高德后台配置域名白名单，配了后只能在这个域名下访问才有效
    //   // serviceHost: 'http://xxx.xxx.xxx.xxx/_AMapService',
    //   // 高德地图查看密钥和token地址 https://console.amap.com/dev/key/app
  }
  const scene = new Scene({
    id: l7chartRef.value as HTMLDivElement,
    map: new GaodeMap({
      style: 'dark', // light
      center: [120.19382669582967, 30.258134],
      zoom: 6,
      pitch: 0,
      maxZoom: 10,
      // '高德官方key对应的token'
      token: 'e8653883477c1e38d190463340771816',
    }),
    logoVisible: false,
    stencil: true
  });
  scene.on('loaded', () => {
    const pointLayer = new PointLayer({})
      .source({
        ...JsonData,
        features: JsonData.features.filter((item: any) => item.properties.capacity > 800)
      })
      .shape('circle')
      .size('capacity', [0, 16])
      .color('capacity', ['#34B6B7', '#4AC5AF', '#5FD3A6', '#7BE39E', '#A1EDB8', '#CEF8D6'])
      .active(true)
      .style({
        opacity: 0.5,
        strokeWidth: 0,
      });

    scene.addLayer(pointLayer);
  });

  await importJs('https://unpkg.com/@antv/l7')
  const l7scene = new window.L7.Scene({
    id: l7chart2Ref.value as HTMLDivElement,
    map: new window.L7.GaodeMap({
      style: 'dark', // 样式URL
      center: [120.19382669582967, 30.258134],
      pitch: 60,
      zoom: 6,
      token: 'e8653883477c1e38d190463340771816'
    }),
  });

  l7scene.on('loaded', () => {
    fetch(
      'https://gw.alipayobjects.com/os/basement_prod/337ddbb7-aa3f-4679-ab60-d64359241955.json'
    )
      .then(res => res.json())
      .then(data => {
        data.features = data.features.filter((item: any) => item.properties.capacity > 800);
        const pointLayer = new window.L7.PointLayer({})
          .source(data)
          .shape('circle')
          .size('capacity', [0, 16])
          .color('capacity', [
            '#34B6B7',
            '#4AC5AF',
            '#5FD3A6',
            '#7BE39E',
            '#A1EDB8',
            '#CEF8D6'
          ])
          .active(true)
          .style({
            opacity: 0.5,
            strokeWidth: 0
          });

        l7scene.addLayer(pointLayer);
      });
  });
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

    .L7 {
      justify-content: center;
      position: relative;
      height: 43vh;
      width: 100%;
      margin-bottom: 1vh
    }
  }
}
</style>
