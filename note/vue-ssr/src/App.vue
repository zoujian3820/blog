<!--
 * @Author: mrzou
 * @Date: 2021-04-24 19:20:51
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-24 20:54:05
 * @Description: file content
-->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <keep-alive>
      <router-view class="main-body"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
