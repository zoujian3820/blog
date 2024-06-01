<template>
  <div class="page sass-demo-page">
    <h2 class="header">样式预处理器sass使用demo</h2>
    <div class="content">
      <h3 class="demo-name">用sass的@for循环颜色, 实现按钮多样式</h3>
      <div class="sass-btns">
        <button v-for="i in 5" :key="i" :class="`btn type-${i}`">按钮{{ i }}</button>
      </div>
      <h3 class="demo-name">用sass的@each循环实现文字替换，改变页面宽度看到效果</h3>
      <div class="demo-each-after-text"></div>
      <h3 class="demo-name">sass之混入(mixin)和继承(extend)</h3>
      <div>
        <div class="demo-clamp">sass之混入(mixin)换行换行换行换行换行换行换行换行换</div>
        <div class="demo-tip-1">sass之继承(extend)1111</div>
        <div class="demo-tip-2">sass之继承(extend)2222</div>
      </div>
      <h3 class="demo-name">sass的map结构+mixin+@each+函数+全局变量：实现主题定义</h3>
      <div class="demo-theme-item">sass的map结构+mixin+@each+函数+全局变量：实现主题定义</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'red');
});
</script>
<style lang="scss" scoped>
.sass-demo-page {
  background-color: #f2f2f2;
  padding: 0 0.2rem;
  box-sizing: border-box;

  // 用sass的@for循环颜色, 实现按钮多样式
  .sass-btns {
    $btnColors: #409eff, #67c23a, #909399, #e6a23c, #f56c6c;

    .btn {
      font-size: 0.16rem;
      line-height: 0.4rem;
      text-align: center;
      padding: 0.03rem 0.21rem;
      border: none;
      border-radius: 0.05rem;
      margin-right: 0.15rem;
      cursor: pointer;
    }

    @for $i from 1 through length($btnColors) {
      .type-#{$i} {
        $color: nth($btnColors, $i);
        background: $color;
        color: #fff;

        &:hover {
          // background: lighten($color: $color, $amount: 10%);
          background: lighten($color, 10%);
        }

        &:active {
          background: darken($color, 10%);
        }

        &:disabled {
          background: lighten($color, 20%);
        }
      }
    }

  }

  // 用sass的@each循环实现文字替换
  .demo-each-after-text {
    $words: 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqr', 'stu', 'vwx', 'yz', 'mooe', 'kmll', 'opwwe', 'yyds', 'cpijj';
    $max: 1920px;
    $d100: 100px;

    &::after {
      content: 'tang yun mao';
      font-size: 0.2rem;
      color: #409eff;
      font-weight: bolder;
      text-transform: uppercase;

      @each $word in $words {
        @media screen and (min-width: $max) and (max-width: ($max + $d100)) {
          font-size: 0.5rem;
          content: $word;
        }

        $max: $max - $d100;
      }
    }
  }

  // sass之mixin混入函数，缺点会造成很多重复css代码
  /*
以下编绎结果：
每个引用了 @include mixin-clamp的代码中，都会重复mixin-clamp中的代码
.demo-clamp[data-v-bbb71fc6] {
    width: 2rem;
    background-color: #cccccc;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
*/
  @mixin mixin-clamp($lines: 2) {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
  }

  .demo-clamp {
    width: 2rem;
    background-color: lighten($color: #999, $amount: 20%);
    @include mixin-clamp(2);
  }

  // sass继承--与mixin混入相比, 不会造成代码重复，缺点：不能像mixin那样传参，不能像mixin那样嵌套调用
  /*
以下编绎结果：
没使用 % 定义的样式生成如下
.demo-tip, .demo-tip-1, .demo-tip-1 {
使用了 % 定义的样式生成如下，类名demo-tip将不会出现在编绎代码中
.demo-tip-1, .demo-tip-1 {
  font-size: 0.16rem;
  line-height: 0.4rem;
  text-align: left;
  cursor: pointer;
}
.demo-tip-1 { color: red; }
.demo-tip-2 { color: blue; }
*/

  // 使用%定义的样式，不会被编译到css文件中
  %demo-tip {
    // .demo-tip {
    font-size: 0.16rem;
    line-height: 0.4rem;
    text-align: left;
    cursor: pointer;
  }

  .demo-tip-1 {
    @extend %demo-tip;
    // @extend .demo-tip;
    color: red;
  }

  .demo-tip {
    font-size: 0.16rem;
    line-height: 0.4rem;
    text-align: left;
    cursor: pointer;
  }

  .demo-tip-2 {
    @extend %demo-tip;
    // @extend .demo-tip;
    color: blue;
  }
}

// sass的map结构+mixin+@each+函数+全局变量：实现主题定义
/*
实现效果如下：此时只要在 html 中添加 data-theme="dark"属性，那么.demo-theme-item元素就会变成红色主题
html[data-theme="red"] .demo-theme-item {
  color: #000;
  background-color: #fff;
}
*/

// 定义多主题配置的 map结构数据
$themes: (
  red: (textColor: #06f90a, bgColor: red),
  light: (textColor: #fff, bgColor: #000),
  dark: (textColor: #000, bgColor: #fff)
);
// 定义全局变量：用于保存每次循环后，获取到的$value值
$themeMap: (
);

@mixin useTheme() {
  @each $key, $value in $themes {
    // 赋值给全局变量$themeMap 后加个 !global 表示为全局变量，不加就是局部变量
    // 注意：这里不能用$value，因为$value是局部变量，赋值给全局变量后，$value就无效了
    $themeMap: $value !global;

    // 此处编绎结果为 html[data-theme="dark"] .demo-theme-item
    // #{$key} 就是引用变量 $key 也就是$themes的key值light/dark
    // & 就是引用当前选择器，哪个选择器中调用useTheme那么&就表示哪个选择器名,也就是.demo-theme-item
    html[data-theme="#{$key}"] & {
      // 类似vue中的默认插槽，调用@include useThem{}后，花括号{}内部的代码，会替换在此处
      @content;
    }
  }
}

// 定义一个函数，通过key获取map对象$themeMap中的value值
@function getVar($name) {
  @return map-get($themeMap, $name);
}

.demo-theme-item {
  font-size: 0.16rem;

  @include useTheme {
    color: getVar('textColor');
    background: getVar('bgColor');
  }
}
</style>
