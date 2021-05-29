<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [状态管理 Vuex](#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86-vuex)
  - [安装](#%E5%AE%89%E8%A3%85)
  - [快速起始](#%E5%BF%AB%E9%80%9F%E8%B5%B7%E5%A7%8B)
  - [核⼼⽤法](#%E6%A0%B8%E2%BC%BC%E2%BD%A4%E6%B3%95)
  - [模块化 - Modules](#%E6%A8%A1%E5%9D%97%E5%8C%96---modules)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-05-30 00:12:13
 * @LastEditors: mrzou
 * @LastEditTime: 2021-05-30 00:36:51
 * @Description: file content
-->

## 状态管理 Vuex

vuex 是⼀个 vue 应⽤状态管理库，它⽤于统⼀状态存储，并保证状态变更的可预测性。
Vuex4 ⽤于和 vue3 搭配使⽤

### 安装

```bash
# npm
npm install vuex@next --save
# yarn
yarn add vuex@next --save
```

### 快速起始

创建 store 实例并使⽤它

```js
import { createApp } from "vue";
import { createStore } from "vuex";
// 1.创建store实例
const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    inc(state) {
      state.count++;
    },
  },
});
const app = createApp({
  /* your root component */
});
// 2.使⽤store
app.use(store);
```

在视图中使⽤

```html
<p>{{$store.state.count}}</p>
```

修改状态

```js
methods: {
  increment() {
    this.$store.commit('inc')
    console.log(this.$store.state.count)
  }
}
```

### 核⼼⽤法

状态 - State
通常⼀个应⽤只有⼀棵单状态树，这样定位某个状态⽚段更加快速直接，
调试时更容易获取当前 app 状态快照

state 常⽤⼿法

- 计算属性

  ```js
  computed: {
    count () {
      return this.$store.state.count
    }
  }
  ```

- helper ⽅法：mapState
  数组⽅式：最简单直接的⽅式

  ```js
  import { mapState } from "vuex";
  export default {
    computed: mapState(["count"]),
  };
  ```

  对象⽅式：更加灵活强⼤

  ```js
  import { mapState } from "vuex";
  export default {
    computed: mapState({
      // 箭头函数⽅式⽐较简洁
      count: (state) => state.count,
      // 传递字符串等效于上⾯⽤法
      countAlias: "count",
      // 需要通过this访问组件内部状态时必须使⽤普通函数⽅式
      countPlusLocalState(state) {
        return state.count + this.localCount;
      },
    }),
  };
  ```

- 展开 mapState 返回对象，⽤于和其他 computed 属性共存

  ```js
  computed: {
    localComputed() {},
    ...mapState({})
  }
  ```

**派⽣状态 - Getters**

可以利⽤ Getters ⽅式将 store 状态派⽣出新的状态

定义 getters

```js
getters: {
  // ⽅式1：Property-Style，最简单常⽤的⽅式
  doubleCount(state) {
    return state.count * 2
  }
  // ⽅式2：Method-Style，可以传参的⽅式
  nCount(state) {
    return (n) => {
      return state.count * n
    }
  }
}
```

使⽤ getters

```html
<p>{{$store.getters.doubleCount}}</p>
<p>{{$store.getters.nCount(3)}}</p>
```

使⽤计算属性简化

```js
computed: {
  doubleCount() {
    return this.$store.getters.doubleCount
  }
},
methods: {
  // nCount适合⽤method映射
  nCount(n) {
    return this.$store.getter.nCount(n)
  }
}
```

使⽤ mapGetters 简化

```js
computed: {
  ...mapGetters(['doubleCount'])
}
```

**变更 - Mutations**

Mutations 是唯⼀改变状态的⽅式

定义 mutations

```js
mutations: {
  inc (state) {
    state.count++
  },
  incBy (state, n) {
    state.count += n
  }
}
```

使⽤常量定义 mutations type 也⽐较常⻅

```js
// mutation-types.js
export const COUNT_INC = "COUNT_INC";

// store.js
import { COUNT_INC } from './mutation-types'
const store = createStore({
  state: { ... },
  mutations: {
    // 利⽤计算属性定义type
    [COUNT_INC] (state) {}
  }
})
```

提交 mutation

```js
this.$store.commit("inc"); // 不带参数
this.$store.commit("incBy", 2); // 携带参数
```

对象⻛格的 commit，type 是必须的

```js
this.$store.commit({ type: "incBy", num: 2 }); // 对象⽤法
```

mutation 通过载荷 payload 获取参数

```js
incBy (state, payload) {
  state.count += payload.num
}
```

利⽤ mapMutations 简化调⽤

```js
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["inc", "incBy"]),
  },
};
```

模板中调⽤

```html
<p @click="inc">{{count}}</p>
```

**动作 - Actions**

动作类似于 mutations，它们主要⽤于：

- 实现复杂业务逻辑
- 处理异步操作

定义 actions

```js
actions: {
  inc (context) {
    setTimeout(() => {
      context.commit('inc')
    }, 1000)
  }
}
```

解构上下⽂简化写法

```js
actions: {
  inc ({commit}) {
    setTimeout(() => {
      commit('inc')
    }, 1000)
  }
}
```

上下⽂中还包含 state、dispatch、getters 等，可⽤于负责业务组合

```js
actions: {
  inc ({ commit, dispatch, getters }) {}
}
```

派发 action

```js
store.dispatch("inc");
store.dispatch("incBy", 10); // 带参数
```

使⽤ mapActions 简化

```js
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["inc", "incBy"]),
  },
};
```

处理 action 结果
action 返回⼀个 Promise，调⽤者可以⽤来处理异步结果。

```js
actions: {
  inc ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('inc')
        resolve()
      }, 1000)
    })
  }
}
```

### 模块化 - Modules

可以利⽤模块化拆分 store 定义避免状态树过⼤时难以维护。

**常⽤⼿法**

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}
const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> `moduleA`'s state
store.state.b // -> `moduleB`'s state
```

**范例：将 count 提取为模块**

```js
// count.js，可以将之前配置原封不动移过来
import { COUNT_INC } from "./mutation-types";
export default {
  state() {},
  getters: {
    doubleCount(state) {},
    nCount(state) {},
  },
  mutations: {
    inc(state) {},
    [COUNT_INC](state) {},
    incBy(state, n) {},
  },
  actions: {
    inc({ commit }) {},
  },
};
```

**注册模块**
试⼀下发现，除了 count3 之外都正常，这⾥通过 store.state.count
获取的是整个 count 模块的 state 对象，想要获取⾥⾯的值，
应该⽤ store.state.count.count

```js
// store/index.js
import count from "./count";
const store = createStore({
  modules: {
    count,
  },
});
```

store.state.count.count 容易引起歧义，模块名或者模块内部的属性修改⼀下会更好

```js
state() {
  return {
    // 这⾥把之前的count改为value，注意其他引⽤的地⽅也要改
     value: 0
  };
}
```

使⽤时就可以像下⾯这样

```js
...mapState({
  count1: state => state.count.value,
})
```

**命名空间**
上⾯的模块化划分，仅仅将 state 隔离，actions/mutations 依然注册在全局命名空间，意味着多个模块会同时响应相同的 action/mutation 类型，同时 getters 也注册在全局命名空间，在编写模块的 getters 时要⼩⼼不能出现重名，否则会报错。

为了保证更加隔离和重⽤效果，最好给模块加上命名空间选项： namespaced: true ，这样所有 actions/mutations/getters 都将注册在独⽴的命名空间中。

范例：修改模块为独⽴命名空间

```js
export default {
  namespaced: true,
};
```

App 中引⽤将会报错
为了正常使⽤，需要在映射时添加模块名作为帮助⽅法的参数 1：

```js
...mapGetters("count", ["doubleCount"]),
...mapMutations("count", ["inc", "incBy"]),
...mapActions("count", { incAsync: "inc" }),


nCount(n) {
  // 代码⾥访问时使⽤path
  return this.$store.getters["count/nCount"](n);
},
```

在命名空间模块内访问全局资源

```js
getters: {
  // 参数3/4⽤于访问全局状态/派⽣状态
  someGetter (state, getters, rootState, rootGetters) {
    rootState.foo // 根状态'foo'
    rootState['bar/foo'] // bar模块状态'foo'
  },
},
actions: {
  // 解构rootState, rootGetters访问全局状态/派⽣状态
  someAction ({ dispatch, commit, getters, rootState, rootGetters }) {
    rootState.foo // 根状态'foo'
    rootState['bar/foo'] // bar模块状态'foo'
    // 派发全局注册的action
    dispatch('someOtherAction', null, { root: true })
    // 派发bar模块中的action
    dispatch('bar/someOtherAction', null, { root: true })

    // 提交全局注册的mutation
    commit('someMutation', null, { root: true })
    // 提交bar模块中的mutation
    commit('bar/someMutation', null, { root: true })
  },
}
```
