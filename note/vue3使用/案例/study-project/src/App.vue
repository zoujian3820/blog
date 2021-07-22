<!--
 * @Author: mrzou
 * @Date: 2021-07-20 12:37:45
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-22 13:09:12
 * @Description: file content
-->
<template>
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <HelloWorld msg="vite vue" />
    <TeleportModal>彪彪彪彪彪彪彪彪</TeleportModal>
    <button class="mt" @click="$message({ msg: 'hahahahha' })">
      插件$message
    </button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import TeleportModal from "./components/TeleportModal.vue";
import { onMounted, getCurrentInstance } from "vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    TeleportModal,
  },
  setup() {
    onMounted(() => {
      // const instance = getCurrentInstance();
      // 在 Composition API 实例中获取全局方法
      // instance.appContext.config.globalProperties.$message(null);
    });
  },
  mounted() {
    // 在 mounted 等vue2的options Api中使用 方式不变 仍用 this.$xxxxx
    // this.$message({msg: 'aaaa'});
  },
};
</script>
<style scoped>
.mt {
  margin-top: 15px;
}
</style>
