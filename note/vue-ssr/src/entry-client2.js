/*
 * @Author: mrzou
 * @Date: 2021-04-24 21:08:23
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-24 21:44:39
 * @Description: file content
 */
import createApp from "./main";

// 客户端激活
const { app, router } = createApp();

// 还原state
// if (window.__INITIAL_STATE__) {
//   store.replaceState(window.__INITIAL_STATE__);
// }

router.onReady(() => {
  // 挂载激活
  //第二个参数注水  hydrating true
  // 由于在index.html中有约定，加了注释  <!--vue-ssr-outlet-->
  // 就会自动启用，所以此处不用传
  app.$mount("#app");
});
