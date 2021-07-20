<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [redux 基本实现](#redux-%E5%9F%BA%E6%9C%AC%E5%AE%9E%E7%8E%B0)
- [实现 redux 中间件](#%E5%AE%9E%E7%8E%B0-redux-%E4%B8%AD%E9%97%B4%E4%BB%B6)
- [实现合并多个 reducer的combineReducers方法](#%E5%AE%9E%E7%8E%B0%E5%90%88%E5%B9%B6%E5%A4%9A%E4%B8%AA-reducer%E7%9A%84combinereducers%E6%96%B9%E6%B3%95)
- [使用redux 及中间件的创建、使用 和多个reducer的使用](#%E4%BD%BF%E7%94%A8redux-%E5%8F%8A%E4%B8%AD%E9%97%B4%E4%BB%B6%E7%9A%84%E5%88%9B%E5%BB%BA%E4%BD%BF%E7%94%A8-%E5%92%8C%E5%A4%9A%E4%B8%AAreducer%E7%9A%84%E4%BD%BF%E7%94%A8)
- [在页面中应用 我们实现的redux](#%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%AD%E5%BA%94%E7%94%A8-%E6%88%91%E4%BB%AC%E5%AE%9E%E7%8E%B0%E7%9A%84redux)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-07-01 23:33:14
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-03 19:12:04
 * @Description: file content
-->

## redux 基本实现
```js
export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // 加强下store.dispatch
    return enhancer(createStore)(reducer);
  }
  let currentState; //状态值
  let currentListeners = [];
  // get
  function getState() {
    return currentState;
  }

  // set
  function dispatch(action) {
    currentState = reducer(currentState, action);
    // state改变，执行订阅的函数
    currentListeners.forEach((listener) => listener());
  }

  // 订阅和取消订阅必须要成对出现
  function subscribe(listener) {
    currentListeners.push(listener);
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  dispatch({type: "REFXZVVVVVV"});

  return {
    getState,
    dispatch,
    subscribe,
  };
}
```
## 实现 redux 中间件
```js
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    // 最土的dispatch就是store.dispatch，接收的参数就是plain objects的action
    let dispatch = store.dispatch;

    // todo 加强dispatch
    // super dispatch
    // 执行一次dispatch 相当于 所有中间件函数依次执行和store.dispatch执行

    // midapi是访问状态管理库的工具对象
    const midapi = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    };
    // chain就是中间件函数的返回值数组，这个数组里每个函数都能访问到状态管理库
    // middleware 中间件函数式wrapper Function 闭包
    const chain = middlewares.map((middleware) => middleware(midapi));

    dispatch = compose(...chain)(store.dispatch);

    return {...store, dispatch};
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```

## 实现合并多个 reducer的combineReducers方法
```js
export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let nextState = {}
    let hasChanged = false
    for(let key in reducers) {
      const reducer = reducers[key]
      nextState[key] = reducer(state[key], action)
      hasChanged = hasChanged || nextState[key] !== state[key]
    }
    return nextState ? nextState : state
  }
}
```

## 使用redux 及中间件的创建、使用 和多个reducer的使用

```js
// import {applyMiddleware, combineReducers, createStore} from "redux";
// import {createStore, applyMiddleware} from "../kredux/";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import promise from "redux-promise";
import isPromise from "is-promise"; // is-promise 是一个库判断是否是promise

// 定义修改规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - action.payload || 1;
    default:
      return state;
  }
}
// store.getState()
// 子state key value
// {user:{}, prroduct:{}}

// 创建一个数据仓库
const store = createStore(
  // countReducer,
  combineReducers({count: countReducer}),
  applyMiddleware(promise, thunk, logger)
);

export default store;

// 中间件logger
function logger({dispatch, getState}) {
  return (next) => (action) => {
    console.log("logger next", next); //sy-log
    console.log("---------------------------------"); //sy-log
    console.log(action.type + "执行啦"); //sy-log
    const prevState = getState();
    console.log("prev state", prevState); //sy-log

    const returnValue = next(action);
    const nextState = getState();

    console.log("next state", nextState); //sy-log
    console.log("---------------------------------"); //sy-log
    return returnValue;
  };
}

// thunk 判断action，如果是函数，就执行函数
function thunk({dispatch, getState}) {
  return (next) => (action) => {
    console.log("thunk next", next); //sy-log

    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

function promise({dispatch, getState}) {
  return (next) => (action) => {
    if (isPromise(action)) {
      return action.then(dispatch);
    }
    return next(action);
  };
}
```

## 在页面中应用 我们实现的redux
```js
import React, {Component} from "react";
import store from "../store/";

export default class ReduxPage extends Component {
  componentDidMount() {
    // store发生变化之后，执行subscribe的监听函数
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  add = () => {
    // 修改状态 set
    store.dispatch({type: "ADD"});
  };

  asyAdd = () => {
    // ajax
    // setTimeout(() => {
    //   store.dispatch({type: "ADD", payload: 1});
    // }, 1000);

    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        // console.log("now ", getState()); //sy-log
        dispatch({type: "ADD", payload: 1});
      }, 1000);
    });
  };

  promiseMinus = () => {
    store.dispatch(
      Promise.resolve({
        type: "MINUS",
        payload: 100,
      })
    );
  };

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState().count}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.promiseMinus}>promiseAdd</button>
      </div>
    );
  }
}
```
