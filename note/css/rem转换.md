## rem的转换实现
使用纯css实现rem的转换
```css
html {
  /* 
  540px屏幕参照 
  100vw / 540px = 0.18518518518518517vw / 每px
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
```
使用js实现rem的转换
```js
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
```

