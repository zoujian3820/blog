<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [与 vue2 的差异](#%E4%B8%8E-vue2-%E7%9A%84%E5%B7%AE%E5%BC%82)
  - [生命周期](#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
  - [api 使用](#api-%E4%BD%BF%E7%94%A8)
    - [vue2 方式中的差异](#vue2-%E6%96%B9%E5%BC%8F%E4%B8%AD%E7%9A%84%E5%B7%AE%E5%BC%82)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-05-18 23:29:42
 * @LastEditors: mrzou
 * @LastEditTime: 2021-05-24 23:28:41
 * @Description: file content
-->

## 与 vue2 的差异

### 生命周期

#### options 方式

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

#### composition 方式

|       vue3        |     vue2      |
| :---------------: | :-----------: |
|       setup       | beforeCreate  |
|       setup       |    created    |
|   onBeforeMount   |  beforeMount  |
|     onMounted     |    mounted    |
|  onBeforeUpdate   | beforeUpdate  |
|     onUpdate      |    update     |
|  onBeforeUnmount  | beforeDestroy |
|     onUnmount     |   destroyed   |
|  onErrorCaptured  | errorCaptured |
|  onRenderTracked  |       -       |
| onRenderTriggered |       -       |

### api 使用

有两种方式：一种是 vue2 的方式，一种是 Composition API

#### vue2 方式中的差异

##### emit 自定义事件

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
  setup(prop, context){
    const methods = {
      handlerSomeEvt(){
        context.emit("some-event")
        context.emit("someEvent")
      }
    }
    return {
      ...methods
    }
  }
});

// 监听some-event
<custom-comp @some-event="dosomething" />
// 监听someEvent 事件名大小写不敏感
<custom-comp @someevent="dosomething" />
```

##### 双向绑定 v-model

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

#### vue3 Composition API

##### setup ⼊⼝点

> setup 函数是⼀个新的组件选项。作为在组件内使⽤ Composition API 的⼊⼝点。
> 1、 **setup 参数： setup(props, {attrs, slots, emit})**
> 2、 **props 是响应式的，但是不能解构，否则将失去响应能⼒**

如果 setup 返回⼀个对象，则对象的属性将被合并到组件的渲染函数上下⽂：

```vue
<template>
  <div>{{ state.foo }}</div>
</template>
<script>
import { reactive } from "vue";
export default {
  setup() {
    const state = reactive({ foo: "bar" });
    // 暴露给模板
    return {
      state,
    };
  },
};
</script>
```

setup 也可以返回⼀个函数，该函数会作为组件渲染函数：

```js
import { h, reactive } from "vue";
export default {
  setup() {
    const state = reactive({ foo: "bar" }); // 返回⼀个函数作为渲染函数
    return () => h("div", state.foo);
  },
};
```

setup() 中获取组件实例

```js
const instance = getCurrentInstance();
console.log(instance);
```

##### Reactivity 响应式 API

- reactive ：对象响应式
  接收⼀个普通对象然后返回该普通对象的响应式代理。等同于 vue 2.x 的 Vue.observable()
  ```js
  const obj = reactive({ count: 0 });
  ```
- ref ：单值响应式
  接受⼀个参数值并返回⼀个响应式 Ref 对象。Ref 对象拥有⼀个指向内部值的单⼀属性 value 。
  如果传⼊ ref 的是⼀个对象，将调⽤ reactive ⽅法进⾏深层响应转换。
  ```js
  const count = ref(0);
  console.log(count.value); // 0
  count.value++;
  console.log(count.value); // 1
  ```
  模板中访问：Ref 对象在模板中使⽤时会⾃动解套，⽆需额外书写 .value ：
  ```html
  <div>{{ count }}</div>
  ```
  Ref 对象作为 reactive 对象的属性被访问或修改时，也将⾃动解套 value 值：
  ```js
  const count = ref(0);
  const state = reactive({
    count,
  });
  console.log(state.count); // 0
  state.count = 1;
  console.log(count.value); // 1
  ```
- toRefs 把⼀个响应式对象转换成普通对象，该普通对象的每个属性都是⼀个 Ref。

  ```js
  import { reactive, toRefs } from "vue";
  const state = reactive({
    foo: 1,
    bar: 2,
  });
  const stateAsRefs = toRefs(state);
  /* stateAsRefs 的类型如下: {
  foo: Ref<number>,
  bar: Ref<number>
  }
  */
  // return { ...Vue.toRefs(state) };
  return { ...stateAsRefs };
  ```

- computed ：计算属性
  传⼊⼀个 getter 函数，返回⼀个不可⼿动修改的 Ref 对象
  ```js
  import { ref, computed } from "vue";
  const count = ref(1);
  const doubleCount = computed(() => count.value * 2);
  console.log(doubleCount.value); // 2
  doubleCount.value++; // 错误
  ```
  传⼊⼀个拥有 get 和 set 函数的对象，创建⼀个可⼿动修改的计算状态。
  ```js
  import { ref, computed } from "vue";
  const count = ref(1);
  const doubleCount = computed({
    get: () => count.value * 2,
    set: (val) => {
      count.value = val / 2;
    },
  });
  doubleCount.value = 4;
  console.log(count.value); // 2
  ```
- watchEffect ：副作⽤侦听器
  ⽴即执⾏传⼊的⼀个函数，并收集响应式的依赖，当依赖变更时重新运⾏该函数

  ```js
  import { ref, watchEffect } from "vue";
  const count = ref(0);
  watchEffect(() => {
    // 立即执行， 并打印出 0
    console.log(count.value);
  });
  setTimeout(() => {
    // 1s后 触发更新，上面打印出 1
    count.value++;
  }, 100);
  ```

- watch ：侦听器
  watch 侦听特定数据源，并在回调函数中执⾏副作⽤。
  侦听单个数据源：数据源可以是⼀个拥有返回值的 getter 函数，也可以是 ref：

  ```js
  // 侦听⼀个 getter
  const state = reactive({ count: 0 });
  watch(
    () => state.count,
    (count, prevCount) => {
      // to do...
    }
  );
  // 直接侦听⼀个 ref
  const count = ref(0);
  watch(count, (count, prevCount) => {
    // to do...
  });
  ```

  watch 完全等效于 vue2 中的 this.$watch（包括选项）

  ```js
  const state = Vue.reactive({
    courses: [1, 2, 3],
  });
  Vue.watch(
    () => state.courses,
    () => {
      // to do ...
    },
    {
      deep: true,
      immediate: false,
    }
  );
  ```

  watch 也可以使⽤数组来同时侦听多个源：

  ```js
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {});
  ```

  - 对⽐ watchEffect 和 watch ：
    watch 懒执⾏副作⽤；
    watch 需明确哪些状态改变触发重新执⾏副作⽤；
    watch 可访问侦听状态变化前后的值。

##### ⽣命周期钩⼦

⽣命周期钩⼦可以通过 onXXX 形式导⼊并在 setup 内部注册：

```js
// 注意：这些⽣命周期钩⼦注册函数只能在 setup() 使⽤。
import { onMounted, onUpdated, onUnmounted } from "vue";
const MyComponent = {
  setup() {
    onMounted(() => {
      console.log("mounted!");
    });
    onUpdated(() => {
      console.log("updated!");
    });
    onUnmounted(() => {
      console.log("unmounted!");
    });
  },
};
```

可以多次注册，按顺序执⾏

```js
setup() {
 onMounted(() => {
 console.log('mounted1')
 })
 onMounted(() => {
 console.log('mounted2')
 })
}
```

妙⽤：可以⽤在其他可复⽤的逻辑中

```js
function useCounter() {
  const counter = ref(0)
  let timer
  onMounted(() => {
    timer = setInterval(() => counter.value++, 1000)
  })
  onUnmounted(() => {
    clearInterval(timer)
  })
  return counter
}
setup() {
  const counter = useCounter()
  return { counter }
}
```

##### 依赖注⼊

在 setup 中依赖注⼊使⽤ provide 和 inject

```js
import { provide, inject } from "vue";
// 祖组件
const RootParent = {
  setup() {
    provide("colorTheme", "dark");
  },
};
// 孙组件
const Child = {
  setup() {
    const theme = inject("colorTheme");
    return {
      theme,
    };
  },
};
```

注⼊值的响应性
如果注⼊⼀个响应式对象，则它的状态变化也可以被侦听。

```js
// 提供者响应式数据
const themeRef = ref("dark");
provide("colorTheme", themeRef);
// 使⽤者响应式数据
const theme = inject("colorTheme");
watchEffect(() => {
  console.log(`theme set to: ${theme.value}`);
});
```

##### 模板引⽤ ref

当使⽤组合式 API 时，reactive refs 和 template refs 的概念已经是统⼀的。为了获得对模板内元素或组
件实例的引⽤，我们可以像往常⼀样在 setup() 中声明⼀个 ref 并返回它：

```vue
<template>
  <div ref="root"></div>
</template>
<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const root = ref(null);
    onMounted(() => {
      // 挂载后, dom会被赋值给root这个ref对象
      console.log(root.value); // <div/>
    });
    return {
      root,
    };
  },
};
</script>
```
