## 如何在vue中做性能优化
1，通过import导入实现路由组件懒加载，再配合魔法注释webpackPrefetch：true实现组件预加载

2，给列表添加唯一的key使vue更新更加高效

3，需要频繁显示隐藏的组件或元素使用v-show来控制，还可增加动画优化体验

4，使用keep-alive组件缓存页面，避免页面重复加载

5，使用函数式组件functional，无状态没实例只依赖外部props只做展示组件，渲染开销小

6，对不需要做响应式的数据做冻结处理，Object.freeze

7, 使用nuxt做服务端渲染，解决首屏加载慢白屏等问题，也更利于seo优化

8，遇到计算取值转换等操作，不要直接用method方法，改用computed带缓存功能

9，组件不要过份拆分，拆的越细，组件更新越耗时间

10，使用vue-lazyload做图片懒加载，也可以做组件懒加载(InterSectionObserver)

11, 如果有在页面中绑定一些事件或开启了定时器，在页面卸载时在beforeDestroy中做解绑和清除操作

12，使用teleport挂载组件到外部，防止组件之间嵌套，样式和层级关系也更简单

13，vue3中如果读取一个属性值，不想触发proxy代理的getter时，可以用toRaw方法包一下响应式对象。如果一个对象，想使它永远不会被代理，可以用markRaw包一下原始对象

14，vue3使用Suspense加载异步组件
