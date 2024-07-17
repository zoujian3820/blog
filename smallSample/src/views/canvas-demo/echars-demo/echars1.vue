 <template>
  <div class="page">
    <h2 class="header">Echars入门之Echars多系列图</h2>
    <div class="content">
      <demo1/>
      <!-- 使用dataset, 集中管理数据* -->
      <demo2/>
      <!-- 添加legend图例,toolbox和dataZoom组件 grid坐标 -->
      <demo3/>
      <!-- 双坐标系 -->
      <demo4/>
      <demo5/>
    </div>
  </div>
</template>

<script setup lang="ts">
import demo1 from './echars1-components/demo1.vue'
import demo2 from './echars1-components/demo2.vue'
import demo3 from './echars1-components/demo3.vue'
import demo4 from './echars1-components/demo4.vue'
import demo5 from './echars1-components/demo5.vue'


</script>
<style>
html body #app {
  max-width: 100%;
}
</style>
<style lang="scss" scoped>
// ::v-deep #app {
//   max-width: 100%;
// }
.page {
  background-color: #ffffff;
  font-size: 16px;

  .content {
    height: auto;
    min-height: auto !important;
    // overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
}
</style>
