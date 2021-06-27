/*
 * @Author: mrzou
 * @Date: 2021-06-27 23:28:33
 * @LastEditors: mrzou
 * @LastEditTime: 2021-06-27 23:54:23
 * @Description: file content
 */
import React from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

// 2、通过Provider进行值的传递
export default function Form({ children, form, onFinish, onFinishFailed }, ref) {
  // 如果是类组件 from为空 则useForm中将走 new FormStore
  const [formInstance] = useForm(form);

  React.useImperativeHandle(ref, () => formInstance);

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  return (
    // 放一个真实form元素 绑定 onsubmit 提交事件
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
