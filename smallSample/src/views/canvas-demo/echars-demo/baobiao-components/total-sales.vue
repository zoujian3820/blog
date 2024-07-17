<template>
  <common-card title="累计销售额" value="¥ 32,192,654">
    <!-- 默认插槽 -->
    <template #default>
      <div class="compare-wrapper">
        <div class="compare">
          <span>日同比</span>
          <span class="emphasis">7.33%</span>
          <div class="increase"></div>
        </div>
        <div class="compare">
          <span>月同比</span>
          <span class="emphasis">7.33%</span>
          <div class="decrease"></div>
        </div>
      </div>
    </template>
    <!-- 动态插槽名 -->
    <template v-slot:[dynamicSlotName]>
      <div>
        <span>昨日售销额</span>
        <span class="emphasis">¥ 30,000,000</span>
      </div>
    </template>
  </common-card>
</template>

<!-- <script>
import { defineComponent } from 'vue'
import commonCardMixin from '../mixins/commonCardMixin';
export default defineComponent({
  name: 'TotalSales',
  mixins: [commonCardMixin],
})
</script> -->
<script setup lang="ts">
import { ref } from 'vue';
import CommonCard from './common-card.vue'
// defineProps<{ title: string, value: string }>()

const dynamicSlotName = ref('footer')


defineExpose({
  myChart: {
    instance: null
  }
})

</script>
<style lang="scss" scoped>
.compare-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .compare {
    font-size: 12px;
    // height: 50%;
    margin-top: 3px;
    color: #666;
    display: flex;
    align-items: center;
  }
}
</style>
