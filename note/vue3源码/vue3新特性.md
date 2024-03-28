<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [vue3地址 https://github.com/vuejs/vue-next](#vue3%E5%9C%B0%E5%9D%80-httpsgithubcomvuejsvue-next)
- [vue3体验](#vue3%E4%BD%93%E9%AA%8C)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## vue3地址 https://github.com/vuejs/vue-next
## vue3体验
- options写法：

onRenderTracked  状态跟踪   它会跟踪页面上所有响应式变量和方法的状态，也就是我们用return返回去的值，它都会跟踪

onRenderTriggered  状态触发   它不会跟踪每一个值，而是给你变化值的信息，并且新值和旧值都会给你明确的展示出来  

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

  ```html
  <div id="app">
    <h3>{{title}}</h3>
  </div> 
  <script src="http://unpkg.com/vue@next"></script> 
  <script>
    const app = Vue.createApp({
      data() {
        return {
          title: 'vue3 demo 11'
        }
      }
    })
    app.mount('#app')
  </script>
  ```

- composition写法：
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

- https://v3.cn.vuejs.org/guide/composition-api-introduction.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%BB%84%E5%90%88%E5%BC%8F-api

  ```html
  <div id="app">
    <h3>{{state.title}}</h3>
  </div> 
  <script src="http://unpkg.com/vue@next"></script> 
  <script>
    const {createApp, reactive, h, toRefs, ref, computed, watchEffect, watch} = Vue
    effect
    const app = createApp({
      setup(props, {attrs, slots, emit}) {
        const count = ref(0);
        const setCount = (v) => {
          count.value = v
        }
        const data2 = reactive({ a: 2, b: 9, t: 9 })
        const doubleCount = computed(() => count.value * 2);

        watchEffect(() => {
          // 立即执行， 并打印出 0
          console.log(count.value);
        });
        setTimeout(() => {
          // 1s后 触发更新，上面打印出 1
          count.value++;
        }, 100);

        watch(count, (count, prevCount) => {
          // to do...
        });
        return {
          state: reactive({ title: 'vue3 demo 22' }),
          count,
          setCount
          doubleCount
          ...toRefs(data2)
        }
      },
      /*
      render() {
        return h('a', {href: 'xxxx'})
      }
      */
    })
    app.mount('#app')
  </script>
  ```
  ### composition 新写法的优点
  - 函数式编程，类型⽀持（ts）更友好
    - 函数式编程有两个最基本的运算：合成和柯里化。
    http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html
    ```js
    // 合成
    const compose = function (f, g) {
      return function (x) {
        return f(g(x));
      };
    }
    const A = compose((x)=> x+2, (x)=> x+1)
    A(1) // 4
    
    const compose2 = (...[first,...other]) => (...args) => {
      let ret = first(...args)
      other.forEach(fn => {
          ret = fn(ret)
      })
      return ret
    }
    
    const A2 = compose2((x)=> x+2, (x)=> x+1)
    A2(1) // 4
    
    // 柯里化之前
    function add(x, y) {
      return x + y;
    }
    
    add(1, 2) // 3
    
    // 柯里化之后
    function addX(y) {
      return function (x) {
        return x + y;
      };
    }
    
    addX(2)(1) // 3
    ```
  - 利于tree-shaking（静态方法移除，改为实例方法）
  
  - API简化、⼀致性：render函数，sync修饰符，指令定义钩子一致等
    - vue2指令：https://cn.vuejs.org/v2/guide/custom-directive.html
    - vue3指令: https://v3.cn.vuejs.org/api/application-api.html#directive
  
    - vue2 render函数: https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0
  
  - 复⽤性：composition api
  - 性能优化：响应式、编译优化
  ```js
  // 1.对象响应化：遍历每个key，定义getter、setter
  function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
      return
    }
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      defineReactive(obj, key, obj[key])
    }
  }
  function defineReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
      get() {
        return val
      },
      set(newVal) {
        if (newVal !== val) {
          observe(newVal)
          val = newVal
          dep.notify()
        }
      }
    })
  }
  
  // 数组响应化：覆盖数组原型⽅法，额外增加通知逻辑
  const originalProto = Array.prototype
  const arrayProto = Object.create(originalProto)
  ;['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'].forEach(
    method => {
        arrayProto[method] = function() {
        originalProto[method].apply(this, arguments)
        dep.notify()
      }
    }
  )
  // 新增或删除属性⽆法监听，需要使⽤特殊api
  Vue.set(obj, 'foo', 'bar')
  Vue.delete(obj, 'foo')
  ```
  vue3
  ```js
  // vue3中利⽤es6 proxy实现数据响应式，很好的解决了以上问题
  function reactive(obj) {
    if (typeof obj !== 'object' && obj != null) {
      return obj
    }
    // Proxy相当于在对象外层加拦截
    // http://es6.ruanyifeng.com/#docs/proxy
    const observed = new Proxy(obj, {
      get(target, key, receiver) {
        // Reflect⽤于执⾏对象默认操作，更规范、更友好
        // Proxy和Object的⽅法Reflect都有对应
        // http://es6.ruanyifeng.com/#docs/reflect
        const res = Reflect.get(target, key, receiver)
        console.log(`获取${key}:${res}`)
        return res
      },
      set(target, key, value, receiver) {
        const res = Reflect.set(target, key, value, receiver)
        console.log(`设置${key}:${value}`)
        return res
      },
      deleteProperty(target, key) {
        const res = Reflect.deleteProperty(target, key)
        console.log(`删除${key}:${res}`)
        return res
      }
    })
    return observed
  }
  
  // 测试
  const state = reactive({ foo: 'foo' })
  
  // 获取
  state.foo 
  // 设置已存在属性
  state.foo = 'lala' 
  // 设置不存在属性
  state.mc = 'mmm' 
  // 删除属性
  delete state.mc
  ```
  - 编译优化  dev-compiler
    - 静态节点提升
    - 补丁标记和动态属性记录 (patchFlag dynamicProps)
    - 缓存事件处理程序
    - 块 block (dynamicChildren)

