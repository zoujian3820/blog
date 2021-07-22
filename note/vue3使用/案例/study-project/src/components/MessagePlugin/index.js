/*
 * @Author: mrzou
 * @Date: 2021-07-20 18:25:51
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-22 12:52:05
 * @Description: file content
 */
import { render, h } from "vue";
import Message from "./Message.vue";

// 声明一个插件
export default function Plugin(app) {
  // 组件添加
  const container = document.createElement("div");
  document.body.appendChild(container);
  // 注册全局的实例方法 $message

  // 在其他组件中可使用 下面方法获取 $message 但在 Message组件中，则获取不到，需使用下面的 hideMessage
  // const instance = getCurrentInstance();
  // instance.appContext.config.globalProperties.$message(null);
  app.config.globalProperties.$message = function (props) {
    if (props) {
      render(
        h(Message, {
          ...props,
          // 给 Message.vue组件内部调用 此方法没在 Message 组件中声明 props
          // 所以此方法 被放入到了 attrs 中  调用方法 可卸载 Message组件
          hideMessage: () => render(null, container),
        }),
        container
      );
    } else {
      render(null, container);
    }
  };
}
