<template>
  <div class="page">
    <h2 class="header">购物车加车小球抛物线动画</h2>
    <div class="content">
      <div class="list">
        <div>测试的商品{{ food.count }}</div>
        <cartControl @add="drop" :food="food" />
      </div>
    </div>
    <div class="shop-ball">
      <div class="ball-wrapper">
        <i class="iconfont icon-gouwucheman" />
      </div>

      <!-- 小球动画 -->
      <shopBall ref="ball" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import cartControl from './components/cart-control.vue';
import shopBall from './components/shop-ball/index.vue';
const food = reactive({ count: 0 })
const ball = ref<typeof shopBall>()
const drop = (el: Element) => ball.value?.drop(el)
</script>
<style lang="scss" scoped>
.page {
  font-size: 16px;
  background-color: #fff;
  position: relative;

  .list {
    padding: 65px 15px 0;
    height: 105px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .shop-ball {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #07111b;
    height: 56px;
    display: flex;
    padding: 0 15px;
    box-sizing: border-box;

    .ball-wrapper {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background-color: #00a0dc;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 6px solid #07111b;
      top: -12px;
      color: #fff;

      .iconfont {
        font-size: 22px;
      }
    }

    .ball-wrapper-active {
      background-color: #00b43c;

      .iconfont {
        font-size: 20px;
      }
    }
  }
}
</style>
