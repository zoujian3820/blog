<template>
  <div class="page">
    <h2 class="header">都是一些测试的例子</h2>
    <div class="content">
      <p><router-link to="/rem-demo">rem换算demo</router-link></p>
      <p><router-link to="/css3-demo">css3使用demo</router-link></p>
      <p><router-link to="/sass-demo">样式预处理器sass使用demo</router-link></p>
      <p><router-link to="/shop-ball-demo">购物车加车小球抛物线动画</router-link></p>
      <p><router-link to="/slide-captcha-demo2">滑动验证码, 只支持pc电脑端</router-link></p>
      <p><router-link to="/slide-captcha-demo">滑动验证码，支持电脑和移动端</router-link></p>
      <p><router-link to="/slide-captcha-demo3">滑动验证码，支持电脑和移动端，后台校验</router-link></p>
      <p><router-link :to="{ name: 'canvasApi' }">canvas api练习</router-link></p>
      <p><router-link :to="{ name: 'canvasCompressDemo' }">canvas画布图片压缩</router-link></p>
      <p><router-link :to="{ name: 'antvG2' }">AntV之G2Plot统计图表使用</router-link></p>
      <p><router-link :to="{ name: 'antvG6' }">AntV之G6图可视化引擎-矢量图绘制</router-link></p>
      <p><router-link :to="{ name: 'antvL7' }">AntV之L7地理空间数据可视分析引擎</router-link></p>
      <p><router-link :to="{ name: 'echars1' }">Echars入门之Echars多系列图</router-link></p>
      <p><router-link :to="{ name: 'echarBaobiaoPage' }">Echars报表页面</router-link></p>


    </div>
  </div>
</template>

<script setup lang="ts">

</script>
<style lang="scss" scoped>
.page {
  background-color: #fff;

  .content {
    padding: 0 0.2rem;
    font-size: 0.2rem;

    p {
      line-height: 0.4rem;
      text-align: center;
    }
  }
}
</style>
