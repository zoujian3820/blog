import {useRef} from "react";

// 定义一个store
class FormStore {
  constructor() {
    this.store = {}; // 状态管理库 key: value
    this.fieldEntities = []; // field实例
    this.callbacks = {};
  }

  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  // 注册
  // 注册与取消注册 监听有取消监听 都是要成对出现的
  registerField = (field) => {
    this.fieldEntities.push(field);

    return () => {
      // 取消注册
      this.fieldEntities = this.fieldEntities.filter((_f) => _f !== field);
      delete this.store[field.props.name];
    };
  };

  // 操作状态管理库
  getFieldValue = (name) => {
    return this.store[name];
  };

  getFieldsValue = () => {
    return {...this.store};
  };

  setFieldsValue = (newStore) => {
    // 1. update store
    this.store = {
      ...this.store,
      ...newStore,
    };
    // update Field
    this.fieldEntities.forEach((field) => {
      Object.keys(newStore).forEach((k) => {
        if (k === field.props.name) {
          field.onStoreChange();
        }
      });
    });
  };

  validate = () => {
    let err = [];
    // todo 检验
    return err;
  };

  submit = () => {
    let err = this.validate();
    if (err.length > 0) {
      // 校验失败  onFinishFailed
      this.callbacks.onFinishFailed(err, this.getFieldsValue());
    } else {
      // 校验通过 onFinish
      this.callbacks.onFinish(this.getFieldsValue());
    }
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerField: this.registerField,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
    };
  };
}

export default function useForm(form) {
  const formRef = useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}
// 如何更新react组件
// 1、 ReactDOM.render
// 2、setState
// 3、forceU
// 4、父组件更新，子组件接收了父组件的props，那么这个时候子组件也跟着父组件更新
