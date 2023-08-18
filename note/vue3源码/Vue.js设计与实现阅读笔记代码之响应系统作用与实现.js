// 存储副作用函数的桶
const bucket = new WeakMap()
// 用一个全局变量存储当前激活的 effect 函数
let activeEffect
// effect 栈
const effectStack = [] // 新增


function track(target, key) {
  // 没有 activeEffect，直接 return
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  // 把当前激活的副作用函数添加到依赖集合 deps 中
  deps.add(activeEffect)
  // deps 就是一个与当前副作用函数存在联系的依赖集合
  // 将其添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps) // 新增
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)

  const effectsToRun = new Set() // 新增
  effects && effects.forEach(effectFn => {
    // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
    if (effectFn !== activeEffect) { // 新增
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn => {
    // 如果一个副作用函数存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) { // 新增
      effectFn.options.scheduler(effectFn) // 新增
    } else {
      // 否则直接执行副作用函数（之前的默认行为）
      effectFn() // 新增
    }
  })
  // effects && effects.forEach(effectFn => effectFn()) // 删除
}

const data = {bar: 2, foo: 1}
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key, receiver) {
    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
    track(target, key)
    // 返回属性值
    // return target[key]
    // 使用 Reflect.get 返回读取到的属性值 receiver，它代表谁在读取属性
    return Reflect.get(target, key, receiver)
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // 设置属性值
    target[key] = newVal
    // 把副作用函数从桶里取出并执行
    trigger(target, key)
  }
})

function cleanup(effectFn) {
  // 遍历 effectFn.deps 数组
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i]
    // 将 effectFn 从依赖集合中移除
    deps.delete(effectFn)
  }
  // 最后需要重置 effectFn.deps 数组
  effectFn.deps.length = 0
}

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
    activeEffect = effectFn
    // 在调用副作用函数之前将当前副作用函数压入栈中
    effectStack.push(effectFn)

    // 将 fn 的执行结果存储到 res 中
    const res = fn() // 新增

    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把activeEffect 还原为之前的值
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]

    // 将 res 作为 effectFn 的返回值
    return res // 新增
  }
  // 将 options 挂载到 effectFn 上
  effectFn.options = options
  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合
  effectFn.deps = []
  // 执行副作用函数
  // effectFn()

  // 只有非 lazy 的时候，才执行
  if (!options.lazy) { // 新增
    // 执行副作用函数
    effectFn()
  }
  // 将副作用函数作为返回值返回
  return effectFn // 新增

}


// 定义一个任务队列，Set本身具有去重，同一个effectFn只会增加一次
const jobQueue = new Set()
// 使用 Promise.resolve() 创建一个 promise 实例，我们用它将一个任务添加到微任务队列
const p = Promise.resolve()
// 一个标志代表是否正在刷新队列
let isFlushing = false

function flushJob() {
  // 如果队列正在刷新，则什么都不做
  if (isFlushing) return
  // 设置为 true，代表正在刷新
  isFlushing = true
  // 在微任务队列中刷新 jobQueue 队列
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    // 结束后重置 isFlushing
    isFlushing = false
  })
}


// effect(() => {
//   // console.log(obj.foo, 'zzzz', +new Date())
//   // obj.foo++
//   // console.log(obj.foo, 'qqqq', +new Date())
//   console.log(obj.foo)
// }, {
//   scheduler(fn) {
//     // setTimeout(fn)
//
//     // fn() 不用以下队列处理 直接执行，会log三次分别为 1 2 3
//     // 每次调度时，将副作用函数添加到 jobQueue 队列中
//     jobQueue.add(fn)
//     // 调用 flushJob 刷新队列，执行出的结果，只log两次 1 3 也就是Vue中连续多次修改响应式数据但只会触发一次更新
//     flushJob()
//   }
// })
//
// obj.foo++
// obj.foo++
// // console.log('结束了')


// function computed(getter) {
//   // 把 getter 作为副作用函数，创建一个 lazy 的 effect
//   const effectFn = effect(getter, {
//     lazy: true
//   })
//   const obj = {
//     // 当读取 value 时才执行 effectFn
//     get value() {
//       return effectFn()
//     }
//   }
//   return obj
// }
function computed(getter) {
  // value 用来缓存上一次计算的值
  let value
  // dirty 标志，用来标识是否需要重新计算值，为 true 则意味着“脏”，需要计算
  let dirty = true
  const effectFn = effect(getter, {
    lazy: true,
    // 添加调度器，在调度器中将 dirty 重置为 true
    scheduler() {
      dirty = true
      // 当计算属性依赖的响应式数据变化时，手动调用 trigger 函数触发响应
      trigger(obj, 'value')
    }
  })
  const obj = {
    get value() {
      // 只有“脏”时才计算值，并将得到的值缓存到 value 中
      if (dirty) {
        value = effectFn()
        // 将 dirty 设置为 false，下一次访问直接使用缓存到 value 中的值
        dirty = false
      }
      // 当读取 value 时，手动调用 track 函数进行追踪
      // 此时computed内的effectFn已执行完，
      // activeEffect为上一个effectFn（调取computed值之前的effectFn）并追踪此时的activeEffect
      track(obj, 'value')
      return value
    }
  }
  return obj
}

// const sumRes = computed(() => obj.foo + obj.bar)

// console.log(sumRes.value) // 3
// obj.foo++
// console.log(sumRes.value) // 4


// effect(() => {
//   // 在该副作用函数中读取 sumRes.value
//   console.log('computed:', sumRes.value)
// })
// obj.foo++


function traverse(value, seen = new Set()) {
  // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
  if (typeof value !== 'object' || value === null ||
    seen.has(value)) return
  // 将数据添加到 seen 中，代表遍历地读取过了，避免循环引用引起的死循环
  seen.add(value)
  // 暂时不考虑数组等其他结构
  // 假设 value 就是一个对象，使用 for...in 读取对象的每一个值，并递归地调用 traverse 进行处理
  for (const k in value) {
    traverse(value[k], seen)
  }
  return value
}


function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }

  let oldValue, newValue
  // cleanup 用来存储用户注册的过期回调
  let cleanup

  // 定义 onInvalidate 函数
  function onInvalidate(fn) {
    // 将过期回调存储到 cleanup 中
    cleanup = fn
  }

  const job = () => {
    newValue = effectFn()
    // 在调用回调函数 cb 之前，先调用过期回调
    if (cleanup) {
      cleanup()
    }
    // 将 onInvalidate 作为回调函数的第三个参数，以便用户
    cb(newValue, oldValue, onInvalidate)
    oldValue = newValue
  }

  const effectFn = effect(
    // 执行 getter
    () => getter(),
    {
      lazy: true,
      scheduler: () => {
        // 'sync' 的实现机制，即同步执行
        // 对于 options.flush 的值为 'pre' 的情况我们暂时还没有办法模拟
        // 因为这涉及组件的更新时机，其中 'pre' 和 'post' 原本的语义指的就是组件更新前和更新后，
        // 在调度函数中判断 flush 是否为 'post'，如果是，将其放到微任务队列中执行
        if (options.flush === 'post') {
          const p = Promise.resolve()
          p.then(job)
        } else {
          job()
        }
      }
    }
  )

  if (options.immediate) {
    job()
  } else {
    oldValue = effectFn()
  }
}

// watch(obj, () => {
//   console.log('变化了')
// }, {
//   // 回调函数会在 watch 创建时立即执行一次
//   flush: 'post' // 还可以指定为 'pre' | 'sync'
// })
//
// obj.foo++


function sleep(t = 200) {
  return new Promise((resolve) => setTimeout(() => resolve({ success: true, list: [] }), t))
}

let finalData
watch(obj, async (newValue, oldValue, onInvalidate) => {
  // 定义一个标志，代表当前副作用函数是否过期，默认为 false，代表没有过期
  let expired = false
  // 调用 onInvalidate() 函数注册一个过期回调
  onInvalidate(() => {
    // 当过期时，将 expired 设置为 true
    expired = true
  })

  // 发送网络请求
  // const res = await fetch('/path/to/request')
  const res = await sleep()

  console.log('expired', expired, expired ? '副作用过期了，数据不是最新的，不可用' : '副作用未过期，数据是最新的，可用', res)
  // 只有当该副作用函数的执行没有过期时，才会执行后续操作。
  if (!expired) {
    finalData = res
  }
})

obj.foo++
obj.foo++
