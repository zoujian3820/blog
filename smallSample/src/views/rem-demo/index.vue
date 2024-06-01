<template>
  <div class="page">
    <h2 class="header">rem换算demo</h2>
    <div class="content">
      <p class="indent">本项目rem配置文件src/assets/viewwindow.css 用的纯css方案</p>
      <h4 class="indent">纯css实现rem转换</h4>
      <pre ref="cssPre">
        <code>
    html {
      /*
      540px屏幕参照
      100vw / 540px = 0.18518518518518517
      以上这段代码作用为：
        将屏幕宽100vw等分为540份，每份为0.18518518518518517vw
        而 rem 单位是按列来计算的，如把屏幕宽分成10列，1rem就是一列的宽，
        而设置 html 根元素的font-size就是设置 rem的基准值，一列的宽度
        所以，按上述得 1px的列宽为 0.18518518518518517vw
        为了计算方便 设置 100px 的列宽 为 rem的基准值 18.518518518518517vw
        所以再往后，计算时，设计稿上16px写到页面上换成rem 就是  16/100 = 0.16rem
      */
      font-size: 18.518518518518517vw;
    }
    body {
      font-size: 0.16rem;
    }
        </code>
      </pre>
      <h4 class="indent">js实现rem转换</h4>
      <pre v-html="hljsCode" :class="hljsClassName" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

const cssPre = ref<HTMLBodyElement>()
const hljsCode = ref<string>('')
const hljsClassName = ref<string>('')

onMounted(() => {
  hljs.highlightElement(cssPre.value!);
})

const hljsObj = hljs.highlight(`
    // 以上为纯css实现rem转换，如果换成js计算的话也差不多
    const calcRemSize = () => {
      const html = document.documentElement
      const width = html.clientWidth
      // 屏幕宽 width = 540px 拆分成 54 列 每例宽就是 10px
      // 相当于 1rem = 10px
      const rem = width / 54
      // 所以设置html根元素的font-size 就相当于设置 1rem = 10px
      html.style.fontSize = rem + "px"
      // 那设计稿上16px写到页面上换成rem 就是  16/10 = 1.6rem
    }
    window.onresize = calcRemSize
    calcRemSize()
  `, { language: 'javascript' })

hljsCode.value = hljsObj.value
hljsClassName.value = `hljs language-${hljsObj.language!}`

</script>
<style lang="scss" scoped>
.page {
  background-color: #d8d8d8;

  .indent {
    text-indent: 0.16rem;
  }
}
</style>
