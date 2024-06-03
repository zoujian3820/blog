<template>
  <div class="page">
    <h2 class="header">滑动验证码</h2>
    <div class="container">
      <p class="changeImg" ref="changeimgRef">图片不好看？换一张吧</p>
      <div class="imgContainer">
        <h3 ref="titleRef">请完成图片验证</h3>
        <!-- 图片区域 -->
        <div class="imgBox" ref="imgboxRef">
          <!-- 可以拖动的图片块 -->
          <div class="imgBlock" ref="imgblockRef"></div>
          <!-- 需要填补的图片缺口 -->
          <div class="imgGap" ref="imggapRef"></div>
        </div>
        <!-- 滑动块 -->
        <div class="slider" ref="siderRef">
          <button type="button" ref="buttonRef" :style="{ '--btnCssTop': btnCssTop }"></button>
          <span ref="spanRef">拖动滑块完成拼图</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const btnCssLeft = ref('-2px')
const btnCssTop = ref('-5px')
// buttonRef.value!.style.setProperty('--btnCssTop', btnCssTop.value)

const titleRef = ref<HTMLBodyElement>() // 标题
const imgboxRef = ref<HTMLBodyElement>() // 图片区域
const siderRef = ref<HTMLBodyElement>() // 滑动块
const imgblockRef = ref<HTMLBodyElement>()
const imggapRef = ref<HTMLBodyElement>()
const buttonRef = ref<HTMLBodyElement>()
const spanRef = ref<HTMLBodyElement>()
const changeimgRef = ref<HTMLBodyElement>()

function getEle() {
  const slider = siderRef.value!
  const imgbox = imgboxRef.value!
  const imgblock = imgblockRef.value!
  const imggap = imggapRef.value!
  const title = titleRef.value!
  const button = buttonRef.value!
  const span = spanRef.value!
  const changeimg = changeimgRef.value!

  return {
    slider,
    imgbox,
    imgblock,
    imggap,
    title,
    button,
    span,
    changeimg
  }
}

function getRandomImg() {
  const imgArr = ['t1.png', 't2.png', 't3.png']
  const randomImg = Math.floor(Math.random() * imgArr.length)
  return new URL(`/src/assets/images/${imgArr[randomImg]}`, import.meta.url).href; //本地文件路径
}

function changePicture() {
  const { imgbox, imgblock, imggap, title } = getEle()
  const imgboxRect = imgbox.getBoundingClientRect()
  const imgbblockRect = imgblock.getBoundingClientRect()

  const imgUrl = getRandomImg()
  imgbox.style.backgroundImage = `url(${imgUrl})`
  imgblock.style.backgroundImage = `url(${imgUrl})`

  const heigthRange = imgboxRect.height - imgbblockRect.height
  const widthRange = imgboxRect.width / 2 - imgbblockRect.width
  const top = Math.random() * heigthRange
  const left = Math.random() * widthRange + imgboxRect.width / 2

  title.textContent = '请完成图片验证'
  title.style.color = '#000'

  imggap.style.transform = `translate3d(${left}px, ${top}px, 0)`
  imgblock.style.transform = `translate3d(0, ${top}px, 0)`

  imgblock.style.backgroundPositionX = `-${left}px`
  imgblock.style.backgroundPositionY = `-${top}px`
}

let mousedownOffsetX = 0
function useMousedown() {
  let callbackFn: (offsetX: number) => void = () => { }
  const callback = (fn: (...args: any[]) => void) => {
    callbackFn = fn
  }
  function onmousedown(e: MouseEvent) {
    mousedownOffsetX = e.offsetX
    callbackFn(e.offsetX)
  }
  return {
    onmousedown,
    callback
  }
}

function setImgblockTransformX(moveX: number) {
  const { imgblock } = getEle()
  const oldTransform = imgblock.style.transform ? imgblock.style.transform.split('translateX')[0] : ''
  imgblock.style.transform = `${oldTransform} translateX(${moveX}px)`
}

function onmousemove(e: MouseEvent) {
  const { imgbox, imgblock, slider, button } = getEle()
  const { width: imgboxWidth } = imgbox.getBoundingClientRect()
  const { width: imgblockWidth } = imgblock.getBoundingClientRect()

  const sliderLeft = slider.getBoundingClientRect().left
  let moveX = e.clientX - sliderLeft - mousedownOffsetX
  // 边界判断
  if (moveX < parseInt(btnCssLeft.value)) {
    moveX = parseInt(btnCssLeft.value)
  } else if (moveX > imgboxWidth - imgblockWidth) {
    moveX = imgboxWidth - imgblockWidth
  }

  setImgblockTransformX(moveX < 0 ? 0 : moveX)
  button.style.transform = `translate3d(${moveX}px, 0, 0)`
}

function useMouseup() {
  let callbackFn: (status: boolean) => void = () => { }
  function callback(fn: (...args: any[]) => void) {
    callbackFn = fn
  }
  function onmouseup(e: MouseEvent) {
    if (mousedownOffsetX) {
      const { imgblock, imggap } = getEle()
      const { left: imgboxLeft } = imgblock.getBoundingClientRect()
      const { left: imggapLeft } = imggap.getBoundingClientRect()

      mousedownOffsetX = 0
      // 校验拖动的图片，是否刚好和需要填补的图片缺口重合
      const diffLeft = imggapLeft - imgboxLeft
      if (diffLeft < 5 && diffLeft > -5) {
        // 校验通过
        callbackFn(true)
      } else {
        // 校验失败
        setImgblockTransformX(0)
        callbackFn(false)
      }
    }
  }
  return {
    onmouseup,
    callback
  }
}

const { onmousedown, callback: downCallback } = useMousedown()
const { onmouseup, callback: upCallback } = useMouseup()
onMounted(() => {
  const { slider, button, changeimg, title, imgblock, imggap, span } = getEle()
  changePicture()
  changeimg.addEventListener('click', changePicture)

  downCallback(() => {
    slider.addEventListener('mousemove', onmousemove)

    imgblock.style.opacity = '1'
    imgblock.style.transition = 'none'
    button.style.transition = 'none'
    title.textContent = '拖动图片完成验证'
    title.style.color = '#000'
    span.style.opacity = '0'
  })
  upCallback((status: boolean) => {
    if (status) {
      // 校验通过
      button.removeEventListener('mousedown', onmousedown)
      slider.removeEventListener('mousemove', onmousemove)
      changeimg.removeEventListener('click', changePicture)
      document.removeEventListener('mouseup', onmouseup)

      title.style.color = 'green'
      title.textContent = '验证成功'
      imgblock.style.opacity = '0'
      imggap.style.opacity = '0'
    } else {
      // 校验失败
      slider.removeEventListener('mousemove', onmousemove)

      title.textContent = '验证失败'
      title.style.color = '#f00'
      imgblock.style.transition = 'all 0.5s'
      imgblock.style.opacity = '0'
      // setImgblockTransformX(0)
      button.style.transition = 'all 0.5s'
      button.style.transform = `translate3d(${btnCssLeft.value}, 0, 0)`
      span.style.opacity = '1'
    }
  })

  button.addEventListener('mousedown', onmousedown)
  document.addEventListener('mouseup', onmouseup)
})
onBeforeUnmount(() => {
  const { slider, button, changeimg } = getEle()
  button.removeEventListener('mousedown', onmousedown)
  slider.removeEventListener('mousemove', onmousemove)
  changeimg.removeEventListener('click', changePicture)
  document.removeEventListener('mouseup', onmouseup)
})
</script>
<style lang="scss" scoped>
$imgWidth: 248px;
$imgHeight: 200px;

.page {
  font-size: 16px;
  background-color: #fff;

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
