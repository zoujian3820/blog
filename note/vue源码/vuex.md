<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [vuex 实现思路](#vuex-%E5%AE%9E%E7%8E%B0%E6%80%9D%E8%B7%AF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## vuex 实现思路
- store
    - 保存选项: mutations actions getters
    - 响应式状态: new Vue({data: {$$state: options.state}})
    - get state()/set state()
    - commit(): entry => entry(this.state)
    - dispatch(): entry => entry(this)
- install
    - Vue.prototype.$store    
    
- 代码块
    ```javascript
    // 1.插件：挂载$store
    // 2.实现Store
    
    let Vue;
    
    class Store {
      constructor(options) {
        // data响应式处理
        // this.$store.state.xx
    
        this._mutations = options.mutations;
        this._actions = options.actions;
    
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    
        this.getters = {};
    
        // 最后还能利用vue计算属性做缓存
        const computed = {};
        const store = this;
        for (const key in options.getters) {
          const fn = options.getters[key];
          computed[key] = function() {
            return fn(store.state);
          };
    
          Object.defineProperty(this.getters, key, {
            get() {
              // return options.getters[key](store.state);
              return store._vm[key];
            }
          });
        }
    
        this._vm = new Vue({
          data: {
            $$state: options.state
          },
          computed
        });
      }
    
      get state() {
        return this._vm._data.$$state;
      }
    
      set state(v) {
        console.error("please use replaceState to reset state");
      }
    
      commit(type, payload) {
        const entry = this._mutations[type];
        if (!entry) {
          console.error("unkown mutation type");
        }
    
        entry(this.state, payload);
      }
    
      dispatch(type, payload) {
        const entry = this._actions[type];
        if (!entry) {
          console.error("unkown action type");
        }
    
        entry(this, payload);
      }
    }
    
    // Vue.use
    // install.apply(this, [this,...])
    function install(_Vue) {
      Vue = _Vue;
    
      Vue.mixin({
        beforeCreate() {
          if (this.$options.store) {
            Vue.prototype.$store = this.$options.store;
          }
        }
      });
    }
    
    export default { Store, install };
    
    ```    
    

