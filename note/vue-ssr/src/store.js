/*
 * @Author: mrzou
 * @Date: 2021-04-24 23:09:50
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-25 00:29:55
 * @Description: file content
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      init(state, count) {
        state.count = count;
      },
      add(state) {
        state.count += 1;
      }
    },
    actions: {
      // 加一个异步请求count的action
      getCount({ commit }) {
        return new Promise(resolve => {
          setTimeout(() => {
            commit("init", Math.random() * 100);
            resolve();
          }, 1000);
        });
      }
    }
  });
}
