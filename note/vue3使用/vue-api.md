<!--
 * @Author: mrzou
 * @Date: 2021-05-18 23:29:42
 * @LastEditors: mrzou
 * @LastEditTime: 2021-05-24 01:13:22
 * @Description: file content
-->

## 与 vue2 的差异

### 生命周期

|      vue3       |     vue2      |
| :-------------: | :-----------: |
|     created     |    created    |
|   beforeMount   |  beforeMount  |
|     mounted     |    mounted    |
|  beforeUpdate   | beforeUpdate  |
|     update      |    update     |
|  beforeUnmount  | beforeDestroy |
|     unmount     |   destroyed   |
|  errorCaptured  | errorCaptured |
|  renderTracked  |       -       |
| renderTriggered |       -       |

### api 使用

有两种方式：一种是 vue2 的方式，一种是 Composition API

#### vue2 方式中的差异

- **emit 自定义事件**
  需要在子组件内部声明 emits: 你要发出的哪些事件。
  如果使⽤对象语法定义发出的事件，则可以验证它。
  事件名大小写不敏感。

  ```javascript
  app.component("custom-comp", {
    props: {
      name: {
        type: String,
        default: "",
      },
    },
    emits: ["some-event", "someEvent"],
  });

  // 监听some-event
  <custom-comp @some-event="dosomething" />
  // 监听someEvent 事件名大小写不敏感
  <custom-comp @someevent="dosomething" />
  ```

- **双向绑定 v-model**
  vue3 中没有 sync 修饰符 v-model 转换结果和它⾏为相同

  ```jsx
  <custom-input v-model="searchText" />
  // 等价于
  <custom-input
    :model-value="searchText"
    @update:model-value="searchText = $event"
  />

  // costom-input组件
  app.component('custom-input', {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    template: `
      <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      >
    `
  })
  ```

  v-model 参数
  默认情况下，组件上的 v-model 使⽤ modelValue 作为 prop 和 update:modelValue 作为事件。
  我们可以通过向 v-model 传递参数来修改这些名称：

  ```jsx
  <my-component v-model:foo="bar" />;
  // 组件中就需要⼀个foo属性并发出update:foo事件

  // 这和vue2中sync修饰符⾏为相同，并完全替代了sync
  app.component("my-component", {
    props: ["foo"],
    template: `
      <input
      type="text"
      :value="foo"
      @input="$emit('update:foo', $event.target.value)">
    `,
  });
  ```

  多个 v-model 绑定
  现在可以在单个组件实例上创建多个 v-model 绑定。每个 v-model 将同步到不同的 prop，⽽不需要在
  组件中添加额外的选项：

  ```jsx
  <user-name
    v-model:first-name="firstName"
    v-model:last-name="lastName"
  ></user-name>
  ```
