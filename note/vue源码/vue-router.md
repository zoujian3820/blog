<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [vue-router实现思路](#vue-router%E5%AE%9E%E7%8E%B0%E6%80%9D%E8%B7%AF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## vue-router实现思路
- 插件insatll
    - Vue.prototype.$router
    - 声明全局组件router-view router-link
        - router-view: this.$router.current => component => h(component)
        - router-link: h('a', {attrs: {href:'#'+this.to}, this.$slots.default})
- VuerRouter逻辑
    - url监听: 
        - window.addEventListener("hashchange", this.onHashChange.bind(this));
        - window.addEventListener("onload", this.onHashChange.bind(this));
    - current: Vue.util.defineReactive(this, "current", window.location.hash.slice(1) || "/");    

- vue-router 嵌套路由的解决方式
    - router-view 深度标记 depth
    - 路由匹配时获取代表深度的matched数组
    
- 代码块    
    ```javascript
    // 1.插件
    // 2.两个组件
    
    // vue插件：
    // function
    // 要求必须有一个install，将来会被Vue.use调用
    let Vue; // 保存Vue构造函数，插件中要使用，不导入还能用
    class VueRouter {
      constructor(options) {
        this.$options = options;
        // this.current = window.location.hash.slice(1) || '/'
        // const initial = window.location.hash.slice(1) || "/";
        // Vue.util.defineReactive(this, "current", initial);
        this.current = window.location.hash.slice(1) || "/";
        // defineReactive 内部有依赖收集能把数据转为响应式
        Vue.util.defineReactive(this, "matched", []);
        // match方可以递归遍历路由表，获得匹配关系数组
        this.match();
    
        // this.routeMap = {};
        // options.routes.forEach(route => {
        //   this.routeMap[route.path] = route.component;
        // });
    
        window.addEventListener("hashchange", this.onHashChange.bind(this));
        window.addEventListener("onload", this.onHashChange.bind(this));
      }
      onHashChange() {
        this.current = window.location.hash.slice(1) || "/";
        this.matched = [];
        this.match();
      }
      match(routes) {
        routes = routes || this.$options.routes;
        // 遍历递归
        for (const route of routes) {
          if (route.path === "/" && this.current === "/") {
            this.matched.push(route);
            return;
          }
          // /about/info
          if (route.path !== "/" && this.current.includes(route.path)) {
            this.matched.push(route);
            if (route.children && route.children.length) {
              this.match(route.children);
            }
            return;
          }
        }
      }
    }
    // 参数1是Vue.use调用时传入的
    VueRouter.install = function(_Vue) {
      Vue = _Vue;
      // console.log(this)
      // 1.挂载$router属性
      // this.$router.push()
      // 全局混入目的：延迟下面逻辑到router创建完毕并且附加到选项上时才执行
      Vue.mixin({
        beforeCreate() {
          // 次钩子在每个组件创建实例时都会调用
          // 根实例才有该选项
          if (this.$options.router) {
            Vue.prototype.$router = this.$options.router;
          }
        }
      });
    
      // 2.注册实现两个组件router-view,router-link
      Vue.component("router-link", {
        props: {
          to: {
            type: String,
            required: true
          }
        },
        render(h) {
          // return <a href={'#'+this.to}>{this.$slots.default}</a>
          return h("a", { attrs: { href: `#${this.to}` } }, this.$slots.default);
        }
      });
      Vue.component("router-view", {
        render(h) {
          // let component = null;
          // const route = this.$router.$options.routes.find(
          //   route => route.path === this.$router.current
          // );
          // console.log(route, this.$router.routeMap, this.$router.current);
    
          // if (route) {
          //   component = route.component;
          // }
          // console.log(this.$router.current);
    
          // 标记当前router-view深度
          this.$vnode.data.routerView = true;
          let depth = 0;
          let parent = this.$parent;
          while (parent) {
            const vnodeData = parent.$vnode ? parent.$vnode.data : {};
            if (vnodeData.routerView) {
              // 说明当前parent是一个router-view
              depth++;
            }
            parent = parent.$parent;
          }
          // 获取path相应的组件
          // const component = this.$router.routeMap[this.$router.current];
          let component = null;
          const route = this.$router.matched[depth];
          if (route) {
            component = route.component;
          }
          return h(component);
        }
      });
    };
    
    export default VueRouter;
    
    ```

