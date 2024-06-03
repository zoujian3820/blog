<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [与 vue2 的差异](#%E4%B8%8E-vue2-%E7%9A%84%E5%B7%AE%E5%BC%82)
  - [生命周期](#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
    - [options 方式](#options-%E6%96%B9%E5%BC%8F)
    - [composition 方式](#composition-%E6%96%B9%E5%BC%8F)
  - [api 使用](#api-%E4%BD%BF%E7%94%A8)
    - [vue2 方式中的差异](#vue2-%E6%96%B9%E5%BC%8F%E4%B8%AD%E7%9A%84%E5%B7%AE%E5%BC%82)
      - [emit 自定义事件](#emit-%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6)
      - [双向绑定 v-model](#%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A-v-model)
      - [混入 mixin](#%E6%B7%B7%E5%85%A5-mixin)
      - [⾃定义指令 directive](#%E2%BE%83%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4-directive)
      - [Teleport 传送门](#teleport-%E4%BC%A0%E9%80%81%E9%97%A8)
      - [渲染函数 render](#%E6%B8%B2%E6%9F%93%E5%87%BD%E6%95%B0-render)
    - [插件 plugin](#%E6%8F%92%E4%BB%B6-plugin)
    - [vue3 Composition API](#vue3-composition-api)
      - [setup ⼊⼝点](#setup-%E2%BC%8A%E2%BC%9D%E7%82%B9)
      - [Reactivity 响应式 API](#reactivity-%E5%93%8D%E5%BA%94%E5%BC%8F-api)
      - [⽣命周期钩⼦](#%E2%BD%A3%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E2%BC%A6)
      - [依赖注⼊](#%E4%BE%9D%E8%B5%96%E6%B3%A8%E2%BC%8A)
      - [模板引⽤ ref](#%E6%A8%A1%E6%9D%BF%E5%BC%95%E2%BD%A4-ref)

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
|       -         |  beforeCreate |
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

onRenderTracked  状态跟踪   它会跟踪页面上所有响应式变量和方法的状态，也就是我们用return返回去的值，它都会跟踪

onRenderTriggered  状态触   它不会跟踪每一个值，而是给你变化值的信息，并且新值和旧值都会给你明确的展示出来
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

##### 混入 mixin

mixin 是 vue2 就有的功能，存在来源不明、命名冲突等问题
vue3 中使⽤ composition-api 复⽤逻辑是更好的解决⽅案

```js
// 定义⼀个混⼊对象
const myMixin = {
  created() {
    console.log("hello from mixin!");
  },
};
// 局部混入
const app = Vue.createApp({
  // 使⽤混⼊
  mixins: [myMixin],
  // 混⼊对象的选项会和组件本身的选项合并
  created() {
    console.log("hello from app!");
  },
});
// 全局混⼊
app.mixin({
  created() {}
});
app.mount("#demo"); // 'hello from app!' 'hello from mixin!'
```

##### ⾃定义指令 directive

需要对普通 DOM 元素进⾏底层操作，会⽤到⾃定义指令。

```js
const app = Vue.createApp({});
// 全局注册指令 `v-focus`
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});

// 局部注册指令 `v-focus`
Vue.createApp({
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      },
    },
  },
});
```

- 指令钩⼦函数：钩⼦函数和 vue2 相较有⼀些变化，现在和组件钩⼦⼀致：
  - beforeMount ：当指令第⼀次绑定到元素并且在挂载⽗组件之前调⽤，这⾥可以做⼀次性初始化设置。
  - mounted ：在挂载绑定元素到⽗组件时调⽤。
  - beforeUpdate ：在更新包含组件的 VNode 之前调⽤。
  - updated ：在包含组件的 VNode 及其⼦组件的 VNode 更新后调⽤。
  - beforeUnmount ：在卸载绑定元素的⽗组件之前调⽤
  - unmounted ：当指令与元素解除绑定且⽗组件已卸载时，只调⽤⼀次。

##### Teleport 传送门

能将模板移动到 Vue app 之外的其他 DOM 的位置，⽐如⼀个弹窗内容、消息通知等 移动到 body 下面

```jsx
// 注册一个全局组件 并挂载到 body 下
app.component("modal-button", {
  template: `
    <button @click="modalOpen = true">打开弹窗</button>
    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          <slot></slot>
          <button @click="modalOpen = false">关闭</button>
        </div>
      </div>
    </teleport>
  `,
  data() {
    return { modalOpen: false };
  },
});
// 使用这个组件
<modal-button>
 <template v-slot>弹窗内容。。。</template>
</model-button>
```

##### 渲染函数 render

渲染函数给我们提供完全 JS 编程能⼒，可以解决更复杂的模板需求。

```js
const app = Vue.createApp({});
app.component("x-heading", {
  render() {
    return Vue.h(
      "h" + this.level, // tag name
      {}, // props/attributes
      this.$slots.default() // array of children 默认的插槽 vue3中均为函数调用
      // this.$slots.xxx() // 命名的插槽 vue3中均为函数调用
    );
  },
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
});
```

渲染函数中⽤ if / else 和 map() 来替代 v-if 和 v-for

```js
app.component("xxx-tt", {
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
  render() {
    if (this.items.length) {
      return Vue.h(
        "ul",
        this.items.map((item) => {
          return Vue.h("li", item.name);
        })
      );
    } else {
      return Vue.h("p", "No items found.");
    }
  },
});
```

v-model 指令展开为 modelValue 和 onUpdate:modelValue ，要实现同等功能必须提供这些 prop：

```js
app.component("xxx-tt", {
  props: ["modelValue"],
  render() {
    return Vue.h(SomeComponent, {
      modelValue: this.modelValue,
      "onUpdate:modelValue": (value) => this.$emit("update:modelValue", value),
    });
  },
});
```

事件处理需要提供⼀个正确的 prop 名称，例如，要处理 click 事件，prop 名称应该是 onClick 。

```js
render() {
 return Vue.h('div', {
    onClick: $event => console.log('clicked', $event.target)
  })
}
```

对于 .passive 、 .capture 和 .once 事件修饰符，Vue 提供了专属的对象语法：
对于所有其它的修饰符，需要在事件处理函数中⼿动使⽤事件⽅法

```js
render() {
  return Vue.h('input', {
    onClick: {
      handler: this.doThisOnceInCapturingMode,
      once: true,
      capture: true
    },
  })
}
```

通过 this.$slots 访问静态插槽的内容，每个插槽都是⼀个 VNode 数组：

```js
render() {
  // `<div><slot></slot></div>`
  return Vue.h('div', {}, this.$slots.default())
}
```

如果要将插槽传递给⼦组件：

```js
render() {
  // `<child v-slot="props"><span>{{ props.text }}</span></child>`
  return Vue.h('div', [
    Vue.h('child', {},
      {
        // 传递⼀个对象作为children
        // 形如 { name: props => VNode | Array<VNode> }
        default: (props) => Vue.h('span', props.text)
      }
    )
  ])
}
```

#### 插件 plugin

插件是⾃包含的代码，通常给 Vue 添加全局功能。插件可以是包含 install() ⽅法的 object ，也可以是 function

```js
export default {
  install: (app, options) => {
    // 插件接收应⽤实例和插件选项
  },
};
```

**插件常⻅任务**

添加指令/组件/过渡等全局资源

```js
export default {
  install: (app, options) => {
    app.component("comp", {});
  },
};
```

全局混⼊⼀些组件选项

```js
export default {
  install: (app, options) => {
    app.mixin({});
    // or
    app.provide("xx", {});
  },
};
```

添加实例⽅法

```js
export default {
  install: (app, options) => {
    app.config.globalProperties.xx = xx;
  },
};
```

**使⽤插件**
实例挂载之前调⽤ use()注册插件

```js
app.use(plugin);
```

范例：实现⼀个 Message 插件

```jsx
import { createApp, h, render } from "Vue";
const MessagePlugin = function (app) {
  const MyMessage = {
    props: {
      msg: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        default: 1000,
      },
    },
    template: `
      <div class="message-box">
        <p>{{msg}}</p>
      </div>
    `,
    mounted() {
      setTimeout(() => {
        app.config.globalProperties.$message(null);
      }, this.duration);
    },
  };

  const container = document.createElement("div");
  document.body.appendChild(container);
  app.config.globalProperties.$message = function (props) {
    if (props) {
      render(h(MyMessage, props), container);
    } else {
      render(null, container);
    }
  };
};

// index.html
/*
<div id="app">
  <p>{{title}}</p>
  <button @click="$message({msg: 'hahaha'})">显示message组件</button>
</div>
*/
createApp({
  data() {
    return {
      title: "vue插件",
    };
  },
})
  .use(MessagePlugin)
  .mount("#app");
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

- toRef 用于创建一个指向源对象某个属性的 ref 对象。这个函数可以用于将对象的某个属性转换为响应式数据，方便在组件中使用。
  ```js
  import { ref, toRef } from 'vue';
  
  const myObject = {
    firstName: 'John',
    lastName: 'Doe'
  };
  
  // 使用 toRef 将对象属性转为 ref 对象
  const firstNameRef = toRef(myObject, 'firstName');
  
  // 创建一个独立的 ref
  const age = ref(25);
  
  console.log(firstNameRef.value); // 输出: John
  
  // 修改原始对象的属性，会触发 ref 更新
  myObject.firstName = 'Jane';
  
  console.log(firstNameRef.value); // 输出: Jane
  
  // 修改 ref 对象的值，不会影响原始对象
  firstNameRef.value = 'Alice';
  console.log(myObject.firstName); // 输出: Jane
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

- isRef 是 Vue 3 提供的一个辅助函数，用于检查一个值是否为 ref 对象。这在编程时可能是有用的，特别是当你需要确定一个值是否已经被包装成响应式对象。
  ```js
  import { ref, isRef } from 'vue';
  
  const normalValue = 'Hello, Vue!';
  const myRef = ref(normalValue);
  
  console.log(isRef(normalValue)); // 输出: false
  console.log(isRef(myRef));       // 输出: true
  ```

- unref 也是 Vue 3 提供的一个辅助函数，用于获取 ref 对象的原始值。通常，在模板中使用 ref 对象时，Vue 3 会自动解包，但在某些情况下，你可能需要显式地获取 ref 对象的原始值。

  其实它就是一个语法糖
  ```js
  val = isRef(val) ? val.value : val;
  ```
  示例
  ```js
  import { ref, unref } from 'vue';
  
  const myRef = ref('Hello, Vue!');
  
  // 在模板中，Vue 3 会自动解包 ref 对象
  console.log(myRef.value); // 输出: Hello, Vue!
  
  // 使用 unref 获取 ref 对象的原始值
  const originalValue = unref(myRef);
  
  console.log(originalValue); // 输出: Hello, Vue!
  ```

- shallowRef 用于创建一个 ref 对象，但与普通的 ref 不同，shallowRef 会对对象进行浅层的响应式处理。这意味着只有对象的第一层属性会变成响应式，而嵌套对象内部的属性不会成为响应式。
  ```js
  <template>
      <div>
          {{ shallowObj.a }}
          <button @click="addCount"> +1</button>
      </div>
  </template>
  
  <script lang='ts' setup>
  import { shallowRef } from "vue"
  
  const shallowObj = shallowRef({
      a: 1
  })
  const addCount = () => {
      //不会触发页面更新
      shallowObj.value.a++
  }
  </script>
  
  ```
  但是如果我们将 addCount 改为修改整个.value 就会触发响应式了
  ```js
  const addCount = () => {
    let temp = shallowObj.value.a;
    temp++;
    shallowObj.value = {
      a: temp,
    };
  };
  ```
  
- triggerRef 它可以让浅层的 ref 即 shallowRef 深层属性发生改变的时候强制触发更改,比如上面触发不了响应式的代码示例加入triggerRef后

  ```js
  <template>
      <div>
          {{ shallowObj.a }}
          <button @click="addCount"> +1</button>
      </div>
  </template>
  
  <script lang='ts' setup>
  import { shallowRef, triggerRef } from "vue"
  
  const shallowObj = shallowRef({
      a: 1
  })
  
  const addCount = () => {
      shallowObj.value.a++
      //加入triggerRef强制触发更改
      triggerRef(shallowObj)
  }
  </script>
  ```

- customRef 是 Vue 3 提供的一个函数，用于创建一个自定义的 ref 对象。通过 customRef，你可以定义自己的获取器和设置器来实现对 ref 对象的完全自定义控制。
  ```js
  import { customRef } from 'vue';
  
  // 创建一个自定义的 ref 对象
  const myCustomRef = customRef((track, trigger) => {
    let value = 'Hello, Vue!';
  
    return {
      get() {
        // 告诉 Vue 哪些依赖被追踪
        track();
        return value;
      },
      set(newValue) {
        // 更新值，并触发更新
        value = newValue;
        trigger();
      }
    };
  });
  
  console.log(myCustomRef.value); // 输出: Hello, Vue!
  
  myCustomRef.value = 'Updated Value';
  console.log(myCustomRef.value); // 输出: Updated Value
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
