<template>
  <div class="page">
    <h2 class="header">纯前端滑动验证码，只支持电脑端</h2>
    <img class="tu_jie" src="./tu_jie.png" alt="">
    <div class="container">
      <p class="changeImg" @click="changePicture">图片不好看？换一张吧</p>
      <div class="imgContainer">
        <h3 ref="refTitle">请完成图片验证</h3>
        <!-- 图片区域 -->
        <div class="imgBox" ref="refImgBox">
          <!-- 可以拖动的图片块 -->
          <div class="imgBlock" ref="refImgBlock"></div>
          <!-- 需要填补的图片缺口 -->
          <div class="imgGap" ref="refImgGap"></div>
        </div>
        <!-- 滑动块 -->
        <div class="slider" ref="refSlider">
          <button type="button" ref="refButton" :style="{ '--btnCssTop': btnCssTop }"></button>
          <span ref="refSpan">拖动滑块完成拼图</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const btnCssLeft = ref('-2px')
const btnCssTop = ref('-5px')
// refButton.value!.style.setProperty('--btnCssTop', btnCssTop.value)

const refTitle = ref<HTMLBodyElement>() // 标题
const refImgBox = ref<HTMLBodyElement>() // 图片区域
const refSlider = ref<HTMLBodyElement>() // 滑动块
const refImgBlock = ref<HTMLBodyElement>()
const refImgGap = ref<HTMLBodyElement>()
const refButton = ref<HTMLBodyElement>()
const refSpan = ref<HTMLBodyElement>()

let mousedownOffsetX = 0

function changePicture() {
  const imgArr = ['t1.png', 't2.png', 't3.png']
  const randomImg = Math.floor(Math.random() * (imgArr.length || 0))

  const imgUrl = new URL(`/src/assets/images/${imgArr[randomImg]}`, import.meta.url).href; //本地文件路径
  refImgBox.value!.style.backgroundImage = `url(${imgUrl})`
  refImgBlock.value!.style.backgroundImage = `url(${imgUrl})`

  const heigthRange = refImgBox.value!.offsetHeight - refImgBlock.value!.offsetHeight
  const widthRange = refImgBox.value!.offsetWidth / 2 - refImgBlock.value!.offsetWidth
  const top = Math.random() * heigthRange
  const left = Math.random() * widthRange + refImgBox.value!.offsetWidth / 2

  refImgGap.value!.style.top = `${top}px`
  refImgGap.value!.style.left = `${left}px`

  refImgBlock.value!.style.top = `${top}px`
  refImgBlock.value!.style.left = '0px'
  refImgBlock.value!.style.backgroundPositionY = `-${top}px`
  refImgBlock.value!.style.backgroundPositionX = `-${left}px`
}

function onmousemove(e: MouseEvent) {
  let moveX = e.clientX - refSlider.value!.offsetLeft - mousedownOffsetX
  // 边界判断
  if (moveX < parseInt(btnCssLeft.value)) {
    moveX = parseInt(btnCssLeft.value)
  } else if (moveX > refImgBox.value!.offsetWidth - refImgBlock.value!.offsetWidth) {
    moveX = refImgBox.value!.offsetWidth - refImgBlock.value!.offsetWidth
  }
  refButton.value!.style.left = `${moveX}px`
  refImgBlock.value!.style.left = `${moveX < 0 ? 0 : moveX}px`
}

function onmousedown(e: MouseEvent) {
  mousedownOffsetX = e.offsetX
  refImgBlock.value!.style.opacity = '1'
  refImgBlock.value!.style.transition = 'none'
  refButton.value!.style.transition = 'none'
  refTitle.value!.textContent = '拖动图片完成验证'
  refTitle.value!.style.color = '#000'
  refSpan.value!.style.opacity = '0'
  refSlider.value!.addEventListener('mousemove', onmousemove)
}

function onmouseup() {
  if (mousedownOffsetX) {
    mousedownOffsetX = 0
    // 校验拖动的图片，是否刚好和需要填补的图片缺口重合
    const diffLeft = refImgGap.value!.offsetLeft - refImgBlock.value!.offsetLeft
    if (diffLeft < 5 && diffLeft > -5) {
      refTitle.value!.style.color = 'green'
      refTitle.value!.textContent = '验证成功'
      refImgBlock.value!.style.opacity = '0'
      refImgGap.value!.style.opacity = '0'

      refButton.value!.removeEventListener('mousedown', onmousedown)
      document.removeEventListener('mouseup', onmousemove)
    } else {
      refTitle.value!.textContent = '验证失败'
      refTitle.value!.style.color = '#f00'
      refImgBlock.value!.style.transition = 'all 0.5s'
      refImgBlock.value!.style.left = '0px'
      refImgBlock.value!.style.opacity = '0'
      refButton.value!.style.transition = 'all 0.5s'
      refButton.value!.style.left = btnCssLeft.value
      refSpan.value!.style.opacity = '1'
    }
    refSlider.value!.removeEventListener('mousemove', onmousemove)
  }
}

onMounted(() => {
  changePicture()
  refButton.value!.addEventListener('mousedown', onmousedown)
  document.addEventListener('mouseup', onmouseup)
})
onBeforeUnmount(() => {
  refSlider.value!.removeEventListener('mousemove', onmousemove)
  refButton.value!.removeEventListener('mousedown', onmousedown)
  document.removeEventListener('mouseup', onmouseup)
})
</script>
<style lang="scss" scoped>
$imgWidth: 248px;
$imgHeight: 200px;

.page {
  font-size: 16px;
  background-color: #fff;

  // 图解图片的样式
  .tu_jie {
    width: 600px;
    display: block;
    margin: 0 auto;

    @media screen and (max-width: 600px) {
      display: none;
    }
  }

  // 例子的样式
  .container {
    width: 280px;
    height: 400px;
    margin: 100px auto;

    .changeImg {
      text-align: center;
      position: relative;
      color: rgb(126, 57, 200);
      font-weight: bolder;
      cursor: pointer;
      user-select: none;
      margin-bottom: 10px;

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 10%;
        top: calc(50% - 13px);
        width: 26px;
        height: 26px;
        background: url('@/assets/images/qiehuang.png') center center no-repeat;
        background-size: contain;
      }
    }

    .imgContainer {
      height: 320px;
      box-sizing: border-box;
      padding: 15px;
      border: 1px solid #adadad;
      box-shadow: 0 0 2px #adadad;
      border-radius: 15px;

      h3 {
        text-align: center;
        margin: 0;
        margin-bottom: 10px;
      }

      .imgBox {
        width: $imgWidth;
        height: $imgHeight;
        background-repeat: no-repeat;
        background-size: 100%;
        position: relative;

        .imgBlock {
          width: 50px;
          height: 50px;
          position: absolute;
          z-index: 10;
          background-size: $imgWidth;
          opacity: 0;
        }

        .imgGap {
          width: 50px;
          height: 50px;
          position: absolute;
          background-color: #fff;
          box-shadow: 0 0 3px #adadad;
        }
      }

      .slider {
        width: 100%;
        height: 30px;
        margin: auto;
        margin-top: 15px;
        background-color: #ddd;
        border-radius: 10px;
        position: relative;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        font-weight: 200;

        button {
          position: absolute;
          top: var(--btnCssTop);
          left: v-bind(btnCssLeft);
          background: #fff url('@/assets/images/tuo.png') center center no-repeat;
          background-size: 70%;
          border-radius: 50%;
          border: 0;
          width: 40px;
          height: 40px;
          cursor: pointer;
          z-index: 20;
          box-shadow: 0 0 3px #adadad;
        }

        span {
          display: inline-block;
          transition: all 0.5s;
        }

        button:hover+span {
          transform: translate3d(30px, 0, 0);
          opacity: 0;
        }
      }
    }
  }
}
</style>
