<!--
 * @Author: mrzou
 * @Date: 2021-07-20 12:46:08
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-22 13:06:19
 * @Description: file content
-->
<template>
  <!-- vue3中处会自动用 Fragment 替代下面这个 div 当根节点，但此本地没装相应的插件，识别不了，故写了一个外层 div -->
  <div>
    <button @click="modalOpen = true">打开弹窗</button>
    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          <slot></slot>
          <button @click="modalOpen = false">关闭</button>
          <div @click="cc">ddd</div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
export default {
  setup() {
    const modalOpen = ref(false);
    const instance = getCurrentInstance();

    const cc = () => {
      instance.appContext.config.globalProperties.$message({ msg: "vvvvv" });
    };
    return { modalOpen, cc };
  },
};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
