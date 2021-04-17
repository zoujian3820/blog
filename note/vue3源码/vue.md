## vue3源码解析

### 依赖安装 

```
yarn --ignore-scripts
```

### 准备调试

- 添加 --sourcemap
  ```
  "dev": "node scripts/dev.js --sourcemap",
  ```
- 执行 yarn dev

### 入口文件

- 从执行命令npm run dev开始
  ```javascript
  // "dev": "node scripts/dev.js --sourcemap"
  // 找到 scripts/dev.js 发现 TARGET 默认为 vue
  ```
  
- 从rollup打包配置文件rollup.config.js中入手
	
	```javascript
	// 打包的入口文件
	// 我们这次看的是浏览器的版本，所以是src/index.ts
	// runtime webpack运行时的版本
	const entryFile = /runtime$/.test(format) ? `src/runtime.ts` : `src/index.ts`
	
	// packages/
	const packagesDir = path.resolve(__dirname, 'packages')
	// 默认的packages/vue
	const packageDir = path.resolve(packagesDir, process.env.TARGET)
	const name = path.basename(packageDir)
	const resolve = p => path.resolve(packageDir, p)
	
	// 入口文件配置
	// input: resolve(entryFile),
	// 由此找到入口文件是 packages/vue/src/index.ts
	```

- src/index.ts文件最后导出  runtime-dom 中的所有方法其中包含有 createApp

  ```
  export * from '@vue/runtime-dom'
  ```

### createApp方法

```javascript
// runtime-dom.ts
export const createApp = ((...args) => {
   // 首先获取一个渲染器
   // 实际上createApp方法是由渲染器提供的
   const app = ensureRenderer().createApp(...args)
   // ...此处省略部分代码
   return app
}
```

 - 此时createApp中调用了ensureRenderer 方法

   ```javascript
   import {
     createRenderer,
   } from '@vue/runtime-core'
   function ensureRenderer() {
     // 渲染器
     // 单例模式
     // 存在就返回，不存在就创建
     return renderer || (renderer = createRenderer<Node, Element>(rendererOptions))
   }
   ```

-  ensureRenderer 方法中又调用了createRenderer

   - 打开@vue/runtime-core/index.ts

   - createRenderer来自./renderer.ts

     ```javascript
     // @vue/runtime-core/index.ts
     export { createRenderer } from './renderer'
     ```

     ```typescript
     // ./renderer.ts
     export function createRenderer<
       HostNode = RendererNode,
       HostElement = RendererElement
     >(options: RendererOptions<HostNode, HostElement>) {
       return baseCreateRenderer<HostNode, HostElement>(options)
     }
     /*
     export function createRenderer(options) {
       return baseCreateRenderer(options)
     }
     */
     ```

   - 大块头来了，baseCreateRenderer函数比较大将近2000行的代码量（渲染器的工厂函数）

   - 看到后折磨了我好久，最后放弃，决定从最底部的return返回值入手

   - 所以其他代码先略过

     ```typescript
     function baseCreateRenderer(
       options: RendererOptions,
       createHydrationFns?: typeof createHydrationFunctions
     ): any {
     
       // .....这里省略2000行代码    
           
       // 此处返回的对像，就是渲染器
       // 有三个方法
       return {
         // 渲染方法, 把虚拟dom转换为真实dom追加到容器container中 render(vnode, container)
         render,
         // 注水，服务器渲染用到
         hydrate,
         // 创建应用程序实例的方法
         createApp: createAppAPI(render, hydrate)
       }
     }
     ```

   - 接着发现 createApp 是createAppAPI方法返回的

     - 以下这些方法都反回了app实例，所以可以链式调用

     - 对比Vue2以下方法由静态方法转为了实例方法

       ```javascript
       // 为何要调整为实例方法？
         // 1. 避免实例之间的污染
         // 2. 语义上更好理解
         // 3. 摇树优化 tree-shake
            // 摇树优化:
                 // 如 app.use({install(){}})初始化了一个插件
                 // 但是在代码中，实际没有使用到这个插件
                 // 所代码在打包时，这个插件是不会被打包进去
       ```

       

       - 好开心终于看到好多老朋友

         ```javascript
         // import { createAppAPI, CreateAppFunction } from './apiCreateApp'
         // packages\runtime-core\src\apiCreateApp.ts
         export function createAppAPI<HostElement>(
           render: RootRenderFunction,
           hydrate?: RootHydrateFunction
         ): CreateAppFunction<HostElement> {
           // 外面返回的方法
           return function createApp(rootComponent, rootProps = null) {
             if (rootProps != null && !isObject(rootProps)) {
               rootProps = null
             }
         
             const context = createAppContext()
             const installedPlugins = new Set()
         
             let isMounted = false
         
             // 应用程序实例
             const app: App = (context.app = {
               _uid: uid++,
               _component: rootComponent as ConcreteComponent,
               _props: rootProps,
               _container: null,
               _context: context,
         
               version,
         
               get config() {
                 return context.config
               },
         
               set config(v) {/*...*/},
               // 插件使用方法初始化
               // 传进去的第一个参数是app实例
               // vue2中传入的第一个参数为Vue本身（构造函数）
               use(plugin: Plugin, ...options: any[]) {
            		if (plugin && isFunction(plugin.install)) {
                   installedPlugins.add(plugin)
                   plugin.install(app, ...options)
                 } else if (isFunction(plugin)) {
                   installedPlugins.add(plugin)
                   plugin(app, ...options)
                 }
                 return app
               },
               // 混入方法初始化
               mixin(mixin: ComponentOptions) {
                 if (__FEATURE_OPTIONS_API__) {
                   if (!context.mixins.includes(mixin)) {
                     context.mixins.push(mixin)
                     // global mixin with props/emits de-optimizes props/emits
                     // normalization caching.
                     if (mixin.props || mixin.emits) {
                       context.deopt = true
                     }
                   }
                 }
                 return app
               },
               // 初始化组件方法  
               component(name: string, component?: Component): any {
                 if (!component) {
                   return context.components[name]
                 }
                 context.components[name] = component
                 return app
               },
         	 // 初始化指令方法
               directive(name: string, directive?: Directive) {
                 if (!directive) {
                   return context.directives[name] as any
                 }
                 context.directives[name] = directive
                 return app
               },
               // 挂载初始化走这里
               mount(
                 rootContainer: HostElement,
                 isHydrate?: boolean,
                 isSVG?: boolean
               ): any {
                 if (!isMounted) {
                   // 初始化的虚拟dom树
                   const vnode = createVNode(
                     rootComponent as ConcreteComponent,
                     rootProps
                   )
                   // store app context on the root VNode.
                   // this will be set on the root instance on initial mount.
                   vnode.appContext = context
                     
                   if (isHydrate && hydrate) {
                     hydrate(vnode as VNode<Node, Element>, rootContainer as any)
                   } else {
                     // 不是服务端渲染，客户端渲染默认走这里
                     render(vnode, rootContainer, isSVG)
                   }
                   isMounted = true
                   app._container = rootContainer
                   // for devtools and telemetry
                   ;(rootContainer as any).__vue_app__ = app
         
                   return vnode.component!.proxy
                 }
               },
              // 卸载初始化
               unmount() {
                 if (isMounted) {
                   render(null, app._container)
                   delete app._container.__vue_app__
                 }
               },
               // 依赖注入 多层次嵌套通信  
               provide(key, value) {
                 // TypeScript doesn't allow symbols as index type
                 // https://github.com/Microsoft/TypeScript/issues/24587
                 context.provides[key as string] = value
                 return app
               }
             })
             return app
           }
         }
         ```

         

     

### 承接上面，执行挂载操作mount

- mount内部最终执行了render函数

  ```javascript
  // mount内部实现
  // 不是服务端渲染，客户端渲染默认走这里
  render(vnode, rootContainer, isSVG)
  ```

- render函数中执行了patch

  ```javascript
  // 初始化走这里，这里就类似vue2
  // 参数1存在则走更新
  // 参数1一不存在则走挂载流程
  const render: RootRenderFunction = (vnode, container, isSVG) => {
      // ... 省略部分代码
      patch(container._vnode || null, vnode, container, null, null, null, isSVG)
      // ... 省略部分代码
  }
  
  // pacth内部区分了 文本  注释 静态节点(不会变的节点)  
  //     Fragment 抽象的虚拟节点(父容器)，解决vue2单根节点问题，Vue3可以多根节点
  // 	   element元素节点  组件 等
  
  case Text:
          processText(n1, n2, container, anchor)
  case Comment:
          processCommentNode(n1, n2, container, anchor)
  // ... 省略部分代码
  default:
  	// ... 省略部分代码
  	else if (shapeFlag & ShapeFlags.COMPONENT) {
          // 初始化走这里
          // 因为初始化执行mount时, 做了以下处理
          /*
              把createApp({})中的传参当成了一个vnode组件处理 类型为一个对象
              const vnode = createVNode(
                  rootComponent as ConcreteComponent,
                  rootProps
              )
  
              // 不是服务端渲染，客户端渲染默认走这里
              render(vnode, rootContainer, isSVG)
            */
          processComponent(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              isSVG,
              slotScopeIds,
              optimized
          )
      }
  	// ... 省略部分代码
  ```

- 接着初始化线路  processComponent

  - 由于n1(旧的vnode)不存在  所以执行了 mountComponent 方法
  - 在vue2中mountComponent声明了updateComponent函数new 了一个渲染Watcher干了组件粒度的依赖收集这件事
    - 以及Vnode的patch操作 vm._update(vm._render(), hydrating) ，生成真实节点最终执行根节点的替换操作，nodeOps.insertBefore到页面上
    - 以及callHook(vm, 'beforeMount ')与 callHook(vm, 'mounted') 一前一后两个钩子的触发
  - 那么显然Vue3中的套路也包含了这些，主要干的事情把vnode转成真实dom，以及更新，setupComponent 组件的安装

  ```javascript
  const processComponent = (
      n1: VNode | null, // 旧vnode
      n2: VNode,  // 新vnode
      container: RendererElement,
      anchor: RendererNode | null,
      parentComponent: ComponentInternalInstance | null,
      parentSuspense: SuspenseBoundary | null,
      isSVG: boolean,
      slotScopeIds: string[] | null,
      optimized: boolean
    ) => {
      n2.slotScopeIds = slotScopeIds
      // 初始化时为null  因为 container 为#app 调用mount时传入的id
      // 所以没有旧的vnode
      if (n1 == null) {
         // 是否为keep-alive缓存组件
         // 初始化时n2为createApp的options转换的vnode 非 缓存组件 
        if (n2.shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {
          ;(parentComponent!.ctx as KeepAliveContext).activate(
            n2,
            container,
            anchor,
            isSVG,
            optimized
          )
        } else {
          // 所以初始化走这，即初始的挂载就在这里处理了
          mountComponent(
            n2, // 新vnode
            container, // #app
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            optimized
          )
        }
      } else {
        // 再次验证有旧vnode走更新，没有走挂载 mountComponent
        updateComponent(n1, n2, optimized)
      }
    }
  ```

- 接着上面的初始化 mountComponent

  - 创建组件实例
  - 增加渲染函数副作用

  ```typescript
  const mountComponent: MountComponentFn = (
    initialVNode,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    optimized
  ) => {
    // 1. 创建组件实例
    const instance: ComponentInternalInstance = (initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    ))

    // inject renderer internals for keepAlive
    if (isKeepAlive(initialVNode)) {
      ;(instance.ctx as KeepAliveContext).renderer = internals
  }
  
    // setupComponent 组件的安装： 类似vue2的new Vue()时vue2构造器中执行的 this._init(options) 做初始化
    // 回想vue2中new Vue时做了哪些操作呢
    //  1. 做了用户配置选项和系统配置选项的合并
  //  2. 实例相关的属性进了初始化 如: $parent $root $children $refs
    //  3. 监听自己的自定义事件
    //  4. 解析自己的插槽
    //  5. 同时会把自己内部的一些数据进行响应式的处理 如: props(属性) methosds(方法) data computed watch
      
  // 这里其实做的也是这些操作  
    setupComponent(instance)
  
    // setup() is async. This component relies on async logic to be resolved
    // before proceeding
    if (__FEATURE_SUSPENSE__ && instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect)
  
      // Give it a placeholder if this is not hydration
      // TODO handle self-defined fallback
      if (!initialVNode.el) {
      const placeholder = (instance.subTree = createVNode(Comment))
        processCommentNode(null, placeholder, container!, anchor)
      }
      return
    }
    
    // 增加渲染函数副作用
    // 里面执行的是渲染函数，然后让当前的渲染函数重新获得虚拟dom
    // 当前组件重新更新，然后重新patch
    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    )
  }
  ```
  
  - 承接上面的流程 setupComponent 组件的安装
  
    ```typescript
  export function setupComponent(
      instance: ComponentInternalInstance,
      isSSR = false
    ) {
      isInSSRComponentSetup = isSSR
    
      const { props, children } = instance.vnode
    const isStateful = isStatefulComponent(instance)
      // 处理props
      initProps(instance, props, isStateful, isSSR)
      // 处理插槽
      initSlots(instance, children)
    
      const setupResult = isStateful
        //  数据响应式处理
        ? setupStatefulComponent(instance, isSSR)
        : undefined
      isInSSRComponentSetup = false
      return setupResult
    }
    ```
  
    - setupStatefulComponent 数据响应式处理
  
      ```typescript
      function setupStatefulComponent(
        instance: ComponentInternalInstance,
        isSSR: boolean
      ) {
        // 由于初始化时，传进来的是一个配置obj转换的vnode,
        // 所以这里type 就是根组件配置对象
        // createApp({
        //    data() {
        //      return { aa: 'haha' }
        //    },
            
        //  setup选项和data(){return {}}可同时存在，但setup优先级更高
        //    setup() {
        //       const aa = ref('haha')
        //       return { aa }
        //    }
        // })
        const Component = instance.type as ComponentOptions
      
        // 0. create render proxy property access cache
        instance.accessCache = Object.create(null)
      
        // 给根组件配置对象 做了代理操作 即渲染函数的上下文，数据响应式代理
        // 渲染函数中将来访问的响应式数据都在proxy这里拿
        // 通过 const instance = getCurrentInstance(); 可以在 setup(){}中获取
        // const { ctx, proxy } = instance
        // PublicInstanceProxyHandlers中会先从setup中去查找属性，如果没有才会去data中查找    
        instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers)
      
        // call setup()
        // 处理setup选项
        // setup选项和data(){return {}}可同时存在，但setup优先级更高
        // PublicInstanceProxyHandlers中会先从setup中去查找属性，如果没有才会去data中查找    
        const { setup } = Component
        if (setup) {
          const setupContext = (instance.setupContext =
            setup.length > 1 ? createSetupContext(instance) : null)
      
          currentInstance = instance
          pauseTracking()
          const setupResult = callWithErrorHandling(
            setup,
            instance,
            ErrorCodes.SETUP_FUNCTION,
            [__DEV__ ? shallowReadonly(instance.props) : instance.props, setupContext]
          )
          resetTracking()
          currentInstance = null
      
          if (isPromise(setupResult)) {
            if (isSSR) {
              // return the promise so server-renderer can wait on it
              return setupResult
                .then((resolvedResult: unknown) => {
                  handleSetupResult(instance, resolvedResult, isSSR)
                })
                .catch(e => {
                  handleError(e, instance, ErrorCodes.SETUP_FUNCTION)
                })
            } else if (__FEATURE_SUSPENSE__) {
              // async setup returned Promise.
              // bail here and wait for re-entry.
              instance.asyncDep = setupResult
            }
          } else {
            // handleSetupResult 方法内部最终也调用了  
            // finishComponentSetup(instance, isSSR)  
            handleSetupResult(instance, setupResult, isSSR)
          }
        } else {
         // createApp配置项中没有setup 则走这里
          finishComponentSetup(instance, isSSR)
        }
      }
      ```
  
    - 接着 看 finishComponentSetup函数
  
      - 内部又调用了 applyOptions(instance, Component)，兼容vue2.0处理
  
        ```javascript
        const {
            // composition
            mixins,
            extends: extendsOptions,
            // state
            data: dataOptions,
            computed: computedOptions,
            methods,
            watch: watchOptions,
            provide: provideOptions,
            inject: injectOptions,
            // assets
            components,
            directives,
            // lifecycle
            beforeMount,
            mounted,
            beforeUpdate,
            updated,
            activated,
            deactivated,
            beforeDestroy,
            beforeUnmount,
            destroyed,
            unmounted,
            render,
            renderTracked,
            renderTriggered,
            errorCaptured,
            // public API
            expose
          } = options
        ```
  
        



### 注册全局方法

- Vue2中可用原型，但是Vue3中不能使用了

  - provide / inject 使用依赖注入(官方推荐)

    - https://vue3js.cn/docs/zh/api/composition-api.html#provide-inject

      ```javascript
      // provide 和 inject 启用依赖注入。只有在使用当前活动实例的 setup() 期间才能调用这两者。
      import { ref, provide } from 'vue'
      setup() {
          let title = ref('这个要传的值')
          // provide的第一个为名称，第二个值为所需要传的参数
          provide('title', title); 
          let setTitle = () => {
               // 点击后都会有响应式哦！
              title.value = '点击后，title会变成这个';
          }
          return {
              title,
              setTitle
          }
      }
      
      // 子组件
      import { inject } from 'vue'
      setup() {
          // inject的参数为provide过来的名称
      	let title = inject('title'); 
      }
      
      ```

      

  - app.config.globalProperties 需在app挂载前使用

  ```javascript
  const app = createApp(App)
  app.config.globalProperties.http = () => {}
  app.mount('#app')
  
  import { ref, computed, watch, getCurrentInstance, onMounted } from "vue";
  export default {
    components: {
  	TestComp
    },
    setup( ) {
      // 获取上下文实例，ctx相当于vue2的this  
      // 但是ctx不是响应式的  
      // proxy 是响应式的  
      const { ctx, proxy } = getCurrentInstance(); 
  
      onMounted(() => {
        // 这样在本地环境可以， 但是线上环境会报错  
        console.log(ctx, "ctx")
        ctx.http()
        
        // 下面这种才能正常使用  
        const instance = getCurrentInstance()
        instance.appContext.config.globalProperties.http()
      });
    },
  };
  ```

  

### xxxx

### xxxx

