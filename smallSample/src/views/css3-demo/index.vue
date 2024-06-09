<template>
  <div class="page">
    <h2 class="header">css3使用demo</h2>
    <div class="content">
      <div class="transtion_avatar">
        <div class="image">
          <img src="@/assets/images/t1.png" alt="">
        </div>
      </div>
      <div class="shangxiatiaodong">
        <div class="ball"></div>
      </div>
      <div class="yanci-shandong">
        <i class="dot" :class="`dot${i}`" v-for="i in 5" :key="i" />
      </div>
      <div class="diaozhui">
        <img src="@/assets/images/diaozhui.png" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
.page {
  background-color: #fff;
  font-size: 16px;

  .content {
    height: calc(100vh - 0.8rem);
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    // 执行document.querySelector('.content').scrollTop = 0时，让滚动更加丝滑，以动画的方式滚动
    scroll-behavior: smooth;
    overflow: scroll;
  }
}

.transtion_avatar {
  padding-left: 20px;

  .image {
    width: 100px;
    border-radius: 50%;
    overflow: hidden;
    // transition: 过渡属性(只针对数值属性值有效) 持续时间 过渡函数 过渡延迟时间
    // js可以监听 document.querySelector('.image').addEventListener('transitionend', function() {})
    // transitionstart 事件 当过渡效果开始时触发
    // transitionend 事件：当过渡效果完成时触发
    // transitioncancel 事件：当过渡效果被取消时触发
    transition: all 0.3s ease-in-out 0.2s;

    &:hover {
      transform: rotate(360deg);
    }

    img {
      display: block;
      width: 100%;
    }
  }
}

.shangxiatiaodong {
  width: 100px;
  height: 90px;
  // background-color: #ccc;
  display: flex;
  justify-content: center;

  .ball {
    width: 30px;
    height: 30px;
    background-color: #00a0dc;
    border-radius: 50%;
    // animation: 规则名 持续时间 重复次数 过渡函数 动画方向 延迟时间;
    // 重复次数为 infinite 表示无限重复，无限循环
    // 动画方向：alternate 先从from到to，再从to到from，循环
    // js可以监听 document.querySelector('.ball').addEventListener('animationend', function() {})
    // animationend 事件：当动画效果完成时触发
    animation: shangxiatiaodong 0.3s infinite ease-in-out alternate 0.2s;
  }

  @keyframes shangxiatiaodong {
    from {
      transform: translateY(0);
      box-shadow: 0 0 2px 5px #fff;
    }

    to {
      transform: translateY(50px);
      box-shadow: 0 0 2px 5px #fff, 0 0 10px 10px #00a0dc;
    }
  }
}

.yanci-shandong {
  // background-color: #ccc;
  width: 80px;
  height: 40px;

  padding: 10px 0 0 8px;
  gap: 6px;
  display: flex;

  .dot {
    display: inline-block;
    width: 8px;
    height: 20px;
    border-radius: 2px;
    background: #00a0dc;
    animation: yancishandong 0.3s ease-in-out infinite alternate;

    @for $i from 1 through 5 {
      &.dot#{$i} {
        animation-delay: ($i - 1) / 10 + s;
      }
    }
  }

  @keyframes yancishandong {
    0% {
      transform: scaleY(1);
    }

    100% {
      transform: scaleY(2);
      background: #00a0dc99;
    }
  }
}

.diaozhui {
  width: 200px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  img {
    display: block;
    width: 35%;
    transform-origin: center top;
    animation: diaozhui 0.8s infinite ease-in-out alternate;
  }

  @keyframes diaozhui {
    0% {
      transform: rotate(-50deg);
    }

    100% {
      transform: rotate(50deg);
    }
  }
}
</style>
