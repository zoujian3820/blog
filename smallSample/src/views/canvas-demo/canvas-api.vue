<template>
  <div class="page">
    <h2 class="header">Canvas Api练习</h2>
    <div class="content">
      <canvas width="500" height="500" ref="canvasRef1"></canvas>
      <!-- <canvas width="500" height="500" ref="canvasRef2"></canvas> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref  } from 'vue';
const canvasRef1 = ref<HTMLCanvasElement>()
onMounted(()=>{
  const ctx = canvasRef1.value!.getContext('2d')!
  ctx.fillStyle = 'red'
  ctx?.fillRect(0, 0, 100, 100)

  ctx.beginPath()
  ctx.lineWidth = 5
  ctx.strokeStyle = 'blue'
  ctx.moveTo(150, 80)
  ctx.lineTo(300, 40)
  ctx.stroke()

  ctx.beginPath()
  ctx.lineWidth = 10
  ctx.strokeStyle = 'green'
  ctx.moveTo(300, 40)
  ctx.lineTo(450, 50)
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 6
  ctx.fillStyle = 'green'
  ctx.arc(70, 200, 60, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  ;(()=>{
    let radio = 0
  const timer = setInterval(()=>{
    if(radio > 2 * Math.PI){
      clearInterval(timer)
      return
    }
    radio += 0.1
    // ctx.clearRect(0, 0, 500, 500)
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 4
    ctx.fillStyle = 'transparent'
    ctx.arc(260, 200, 50, 0, radio)
    ctx.fill()
    ctx.stroke()
  }, 20)
  })()


  ;(()=>{
    let radio = 0
    const renterCanvas = () => {
      window.requestAnimationFrame(()=>{
        if(radio > 2 * Math.PI){
          return
        }
        // ctx.clearRect(0, 0, 500, 500)
        radio += 0.1
        ctx.beginPath()
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 4
        ctx.fillStyle = 'transparent'
        ctx.arc(260, 350, 50, 0, radio)
        ctx.fill()
        ctx.stroke()
        renterCanvas()
      })
    }
    renterCanvas()
  })()



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
    padding: 20px;
    canvas {
      background-color: #f5f5f5;
    }
  }
}
</style>
