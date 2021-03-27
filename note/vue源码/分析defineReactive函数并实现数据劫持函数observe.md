## 分析defineReactive函数 并实现数据劫持函数observe
- 核心使用 defineProperty 实现数据的获取与修改监听 (get/set)， Vue3使用了Proxy
- 使用闭包原理 把形参 val 转换成了内部私有变量， 便于set(修改)后，get(获取)能拿到最新修改的值
- 而数据本身可能会有多个属性，为了使用上不至于每次都手动调用 defineReactive 故封装了observe函数
- observe函数通过遍历，可以自动的将每个属性做劫持处理，并添加了非对象情况的过滤处理
- 数据本身可能存在多层级结构，所以defineReactive函数每次在调用时，都做了一次observe递归，以便子层级数据能被劫持到
- Vue.set  this.$set 实现就更简单了，添加额外的属性时，只需按defineReactive的格式手动添加即可，Vue便于使用封装了set函数，并挂载到了Vue原型上

- 对象数据
  ```javascript
  // Object.defineProperty()
  // 将传入的obj，动态设置一个key，它的值val
  function defineReactive(obj, key, val) {
    // 递归
    observe(val)
    
    Object.defineProperty(obj, key, {
      get() {
        console.log('get', key);
        return val
      },
      set(v) {
        if (val !== v) {
          console.log('set', key);
          // 传入新值v可能还是对象, 所以再做一次检测并劫持
          observe(v)
          
          // 由于是闭包，所以val字段已经成为内部私有变量
          // 所以此处赋值后，get里面能拿到更新的值
          // 相当于在函数顶部 val = val
          val = v
        }
      },
    })
  }
  
  // 递归遍历obj，动态拦截obj的所有key
  function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
      return obj
    }
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
  
  // this.$set() 的实现
  // Vue.set() 的实现
  function set(obj, key, val) {
    // 由于用户可能添加，未在原对象中声明的新属性
    // 所以要做到劫持，必需使用此方式添加新属性
    defineReactive(obj, key, val)
  }
  
  const obj = {
    foo: 'foo',
    bar: 'bar',
    baz: {
      a: 1
    }
  }
  // defineReactive(obj, 'foo', 'foo')
  observe(obj)
  
  // obj.foo
  // obj.foo = 'fooooooo'
  // obj.baz.a
  // obj.baz = { a: 10 }
  // obj.baz.a
  // obj.dong = 'dong'
  // obj.dong
  // set(obj, 'dong', 'dong')
  // obj.dong
  ```
- 兼容数组数据并实现响应式
  ```javascript
  // xxxx
  ```
