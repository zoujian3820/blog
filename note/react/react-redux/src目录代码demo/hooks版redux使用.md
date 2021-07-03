<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [hooks版redux使用](#hooks%E7%89%88redux%E4%BD%BF%E7%94%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## hooks版redux使用
```jsx
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";

// context 跨层级数据传递
// * 1. 创建一个context对象
const Context = React.createContext();

// *2. Provider传递value
export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// *3 子组件要消费value
// consumer
// contextType
// useContext
export const connect = (mapStateToProps, mapDispatchToProps) => (
  WrappedComponent
) => (props) => {
  const store = useContext(Context);
  const stateProps = mapStateToProps(store.getState());
  let dispatchProps = { dispatch: store.dispatch };
  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(store.dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
  }
  // const [state, forceUpdate] = useState({});
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // forceUpdate
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, [store]);
  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};


function useForceUpdate() {
  // const [state, setState] = useState(0);
  const [, setState] = useReducer((x) => x + 1, 0);
  const update = useCallback(() => {
    // setState((prev) => prev + 1);
    setState();
  }, []);
  return update;
}


function bindActionCreator(creator, dispatch) {
  return (...arg) => dispatch(creator(...arg));
}
export function bindActionCreators(creators, dispatch) {
  let obj = {};
  // todo
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}


// 自定义hook
export function useDispatch() {
  const store = useContext(Context);
  return store.dispatch;
}

export function useSelector(selecor) {
  const store = useContext(Context);
  const selectedState = selecor(store.getState());
  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // forceUpdate
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, [store]);

  return selectedState;
}


// import {useDispatch, useSelector} from "react-redux";
// import React from "react";
// import { useDispatch, useSelector } from "../kReactRedux";
// 使用hooks的页面
export function ReactReduxHooksPage(props) {
  const dispatch = useDispatch();
  const add = React.useCallback(() => {
    dispatch({ type: "ADD" });
  }, []);
  const count = useSelector(({ count }) => count);
  return (
    <div>
      <h3>ReactReduxHooksPage</h3>
      <button onClick={add}>{count}</button>
    </div>
  );
}


// 初始化store
import { createStore, combineReducers } from "redux";
// 定义修改规则
export const countReducer = (state = 0, { type, payload = 1 }) => {
  switch (type) {
    case "ADD":
      return state + payload;
    case "MINUS":
      return state - payload;
    default:
      return state;
  }
};
// {count, user, product}
// 创建一个数据仓库
export const store = createStore(combineReducers({ count: countReducer }));


// import ReactReduxHooksPage from "./pages/ReactReduxHooksPage";
// import HooksPage from "./pages/HooksPage";
// import ReactReduxPage from "./pages/ReactReduxPage";
// 入口的App.js
export function App(props) {
  const [state, setState] = useState(1);
  return (
    <div>
      <button onClick={() => setState(state + 1)}>{state}</button>
      {/* <ReactReduxPage title="hahha " count={state} /> */}
      {/* {state % 2 && <HooksPage />} */}
      <ReactReduxHooksPage />
      {/* <HooksPage /> */}
    </div>
  );
}

// 入口的index.js 引用了根组件 App.js
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```
