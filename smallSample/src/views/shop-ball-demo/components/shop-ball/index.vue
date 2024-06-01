<template>
  <!-- 小球动画 -->
  <div class="ball-container">
    <div class="ball hidden" ref="ballEleRef">
      <div class="inner"></div>
    </div>
    <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop" v-for="(ball, index) in balls"
      :key="index">
      <div class="ball" v-show="ball.show">
        <div class="inner inner-hook"></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
// import { Required } from 'utility-types';
import { ref, Ref, defineExpose } from 'vue';
import useBall from './useBall';
const ballEleRef = ref<Element>() as Ref<Element>;

const { balls, drop, beforeDrop, dropping, afterDrop } = useBall({ ballEle: ballEleRef, innerCls: 'inner-hook' });
// 把 drop 方法暴露出去，供父组件调用，暴露出去的函数，父组件可以通过 ref 获取到
defineExpose({ drop });
</script>
<style lang="scss" scoped>
// 小球动画相关的样式
.ball-container {

  .ball {
    position: absolute;
    left: 42px;
    bottom: 27px;
    z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

    .inner {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #00a0dc;
      transition: all 0.4s linear;
    }

    &.hidden {
      // visibility: hidden;
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
