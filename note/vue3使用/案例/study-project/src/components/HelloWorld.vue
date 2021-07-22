<!--
 * @Author: mrzou
 * @Date: 2021-07-20 12:37:45
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-20 12:40:07
 * @Description: file content
-->
<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
};
</script>
