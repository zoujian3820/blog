<!--
 * @Author: mrzou
 * @Date: 2021-07-20 13:07:56
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-22 13:20:56
 * @Description: file content
-->
<template>
  <div class="message-box">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { onMounted, defineComponent, getCurrentInstance } from "vue";

// @click="$message({msg: 'hahah'})"
export default defineComponent({
  props: {
    duration: {
      type: Number,
      default: 100,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  setup(props, { attrs, emit, slots, expose }) {
    onMounted(() => {
      const instance = getCurrentInstance();
      // instance.proxy就是vue2中的this
      console.log(instance.proxy);

      setTimeout(() => {
        // 传入null 用于删除
        attrs.hideMessage();

        // 派发事件
        emit("sonclick", "子组件传递给父组件");

        // 插槽
        console.log("slots", slots);
      }, props.duration);
    });
  },
  mounted() {
    // console.log(this.$attrs.hideMessage);
  },
});
</script>

<style lang="scss" scoped></style>
