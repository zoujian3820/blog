/*
 * @Author: mrzou
 * @Date: 2021-07-20 12:37:45
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-20 18:32:07
 * @Description: file content
 */
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

// 引入我们写的 MessagePlugin 插件
import MessagePlugin from "./components/MessagePlugin";

// 并在挂载前，使用它
createApp(App).use(MessagePlugin).mount("#app");
