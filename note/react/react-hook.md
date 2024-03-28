<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [setState 更新状态的 2 种写法](#setstate-%E6%9B%B4%E6%96%B0%E7%8A%B6%E6%80%81%E7%9A%84-2-%E7%A7%8D%E5%86%99%E6%B3%95)
- [路由组件的 lazy 懒加载](#%E8%B7%AF%E7%94%B1%E7%BB%84%E4%BB%B6%E7%9A%84-lazy-%E6%87%92%E5%8A%A0%E8%BD%BD)
- [React Hook/Hooks 是什么?](#react-hookhooks-%E6%98%AF%E4%BB%80%E4%B9%88)
- [自定义 hook](#%E8%87%AA%E5%AE%9A%E4%B9%89-hook)
- [常用的 React Hooks](#%E5%B8%B8%E7%94%A8%E7%9A%84-react-hooks)
  - [useState 在函数组件中 模似类组件的 setState](#usestate-%E5%9C%A8%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E4%B8%AD-%E6%A8%A1%E4%BC%BC%E7%B1%BB%E7%BB%84%E4%BB%B6%E7%9A%84-setstate)
  - [useReducer](#usereducer)
  - [useEffect 可以在函数组件中 模似类组件的生命周期](#useeffect-%E5%8F%AF%E4%BB%A5%E5%9C%A8%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E4%B8%AD-%E6%A8%A1%E4%BC%BC%E7%B1%BB%E7%BB%84%E4%BB%B6%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
  - [useLayoutEffect 特性 与 useEffect 相同，但它会在所有的 DOM 变更之后 同步执行回调 比 useEffect 更早](#uselayouteffect-%E7%89%B9%E6%80%A7-%E4%B8%8E-useeffect-%E7%9B%B8%E5%90%8C%E4%BD%86%E5%AE%83%E4%BC%9A%E5%9C%A8%E6%89%80%E6%9C%89%E7%9A%84-dom-%E5%8F%98%E6%9B%B4%E4%B9%8B%E5%90%8E-%E5%90%8C%E6%AD%A5%E6%89%A7%E8%A1%8C%E5%9B%9E%E8%B0%83-%E6%AF%94-useeffect-%E6%9B%B4%E6%97%A9)
  - [useRef 可以在函数组件中 模似类组件的 ref 功能与 React.createRef()一样](#useref-%E5%8F%AF%E4%BB%A5%E5%9C%A8%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E4%B8%AD-%E6%A8%A1%E4%BC%BC%E7%B1%BB%E7%BB%84%E4%BB%B6%E7%9A%84-ref-%E5%8A%9F%E8%83%BD%E4%B8%8E-reactcreateref%E4%B8%80%E6%A0%B7)
  - [React.useContext](#reactusecontext)
  - [React.useCallback](#reactusecallback)
  - [React.useMemo](#reactusememo)
  - [React.memo 相当于函数组件的 PureComponent](#reactmemo-%E7%9B%B8%E5%BD%93%E4%BA%8E%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E7%9A%84-purecomponent)
  - [函数组件中实现 forceUpdate()](#%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E4%B8%AD%E5%AE%9E%E7%8E%B0-forceupdate)
- [常用的 react-redux Hooks](#%E5%B8%B8%E7%94%A8%E7%9A%84-react-redux-hooks)
- [常用的 react-router / react-router-dom Hooks](#%E5%B8%B8%E7%94%A8%E7%9A%84-react-router--react-router-dom-hooks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-05-07 12:53:20
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-12 00:23:37
 * @Description: file content
-->

### setState 更新状态的 2 种写法

- setState(stateChange, [callback])对象式的 setState
  - stateChange 为状态改变对象(该对象可以体现出状态的更改)
  - callback 是可选的回调函数, 它在状态更新完毕、界面也更新后(render 调用后)才被调用
    ```jsx
    this.setState({ xxx: 666 }, () => {});
    ```
- setState(updater, [callback])函数式的 setState
  - updater 为返回 stateChange 对象的函数。
  - updater 可以接收到 state 和 props。
  - callback 是可选的回调函数, 它在状态更新、界面也更新后(render 调用后)才被调用。
    ```jsx
    this.setState(
      (state, props) => ({ xxx: state.count + 1 }),
      () => {}
    );
    ```

### 路由组件的 lazy 懒加载

```tsx
  import React, { Component, lazy, Suspense } from 'react'
	// 1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))

	// 2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
    <Switch>
      <Route path="/xxx" component={Xxxx}/>
      <Redirect to="/login"/>
    </Switch>
  </Suspense>
```

### React Hook/Hooks 是什么?

- Hook 是 React 16.8.0 版本增加的新特性/新语法
- 可以让你在函数组件中使用 state 以及其他的 React 特性

### 自定义 hook

- hook 就是 js 函数 自定义一个 hook 命名要以 use 开头，函数内部可以调用其他 hook
- 只能在*函数最外层*调用 hook 不要在循环、条件判断或者子函数中调用
- 只能在*React 的函数组件*中调用 Hook 不要在其他 js 函数中调用
- 还有一个地方可以调用 Hook 就是在自定义的 Hook 中

```jsx
export function useClock() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return date;
}

// 在组件中使用自定义的useClock
export function Comp(props) {
  return <div>时钟：{useClock().toLocaleTimeString()}</div>;
}
```

### 常用的 React Hooks

- React.useState()
- React.useReducer()
- React.useEffect()
- React.useLayoutEffect()
- React.useRef()
- React.useContext
- React.useCallback
- React.useMemo
- React.memo 相当于函数组件的 PureComponent
- 函数组件中实现 forceUpdate()

#### useState 在函数组件中 模似类组件的 setState

- React.useState

  ```jsx
  import React from "react";
  export function Demo() {
    // React.useState(0) 返回值是一个2个元素的数组（2元素为：当前值和更改值的方法），传入的参数0为初始值
    // const [当前值, 更改值的方法] = React.useState(0)
    // React.useState 在第一次调用时React内部就给值，做了缓存处理，当组件更新再调时不会走初始化，所以值不会重新改为0
    const [count, setCount] = React.useState(0);
    const [name, setName] = React.useState("mzou");

    function add() {
      // setCount(count + 1)
      // 第二种写法, 传入一个函数，函数参数返回当前值，再return 你修改的值
      setCount((count) => count + 1);
      // setCount({}) 此种写法 因为 {} !== {} 所以每次都会触发更新
    }

    function chageName() {
      setName("汤哥");
    }

    return (
      <div>
        <h2>当前求和为: {count}</h2>
        <h2>我的名字为: {name}</h2>
        <button onClick={add}>点我加1</button>
        <button onClick={chageName}>点我改名</button>
      </div>
    );
  }
  ```

#### useReducer

> useState 的替代⽅案。它接收⼀个形如 (state, action) => newState 的 reducer

> 并返回当前的 state 以及与其配套的 dispatch ⽅法。（如果你熟悉 Redux 的话，就已经知道它如何⼯作了。）

```jsx
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

const init = (initArg) => {
  // 确保返回的是数字
  // return Number(initArg)

  // 返回 乘 2 的数据
  return initArg * 2;
};
export default function HooksPage(props) {
  const [state, dispatch] = useReducer(
    countReducer, // 传入的reducer状态机
    "0", // 传给 reducer中的默认值
    init // 给第二个参数（上面的0） 做二次处理的函数，并把第二参当其参数传入 反回一个新值 (非必填 不填不做处理)
  );
  return (
    <div>
      <h3>HooksPage</h3>
      <p>{state}</p>
      <button onClick={() => dispatch({ type: "ADD", payload: 2 })}>add</button>
    </div>
  );
}
```

#### useEffect 可以在函数组件中 模似类组件的生命周期

- 即使不填第二参数 内部执行也晚于外面的执行
- 回调函数会在组件渲染到屏幕之后延迟执⾏
- 当组件更新时，都会先执行组件上次 return 出去的 函数(卸载前的生命周期函数)
- 当组件卸载时 如 flag 为 false (flag && <Comp />) 都会执行内部 return 出去的 函数 当卸载前的生命周期函数
- React.useEffect

  - 模似三个生命周期
    - componentDidMount
    - componentDidUpdate
    - componentWillUnmount

  ```jsx
  import React from "react";
  export function Demo() {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      // 即使不填第二参数 内部执行也晚于外面的执行
      console.log("后执行");
    });
    console.log("比上面 log 先执行");

    // React.useEffect 有两参数
    // 第一个为回调
    // 第二个为一个数组, 元素为需要监听的数据名称key(可多个) 只要当前监听的数据变更，就执行回调（相当于componentDidUpdate）
    // 不传第二个参数，则监听所有数据的变更并执行回调
    // 第二参如传空数组，则不监听数据变更，只在组件挂载时执行一次（相当于componentDidMount）
    React.useEffect(() => {
      const timer = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => {
        // return 的函数 相当于 componentWillUnmount
        // 可以做一些收尾工作 如清除定时器等
        // 组件每次更新时，都先执行组件上次 return出去的这个函数
        clearInterval(timer);
      };
    }, ["count"]);

    return (
      <div>
        <h2>当前求和为: {count}</h2>
      </div>
    );
  }
  ```

#### useLayoutEffect 特性 与 useEffect 相同，但它会在所有的 DOM 变更之后 同步执行回调 比 useEffect 更早

> 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后 同步执行回调 比 useEffect 更早

> 可以使⽤它来读取 DOM 布局并同步触发重渲染。在浏览器执⾏绘制之前， useLayoutEffect 内部的更新计划将被同步刷新。

> 尽可能使⽤标准的 useEffect 以避免阻塞视觉更新

#### useRef 可以在函数组件中 模似类组件的 ref 功能与 React.createRef()一样

- React.useRef

  ```jsx
  import React from "react";
  export function Demo() {
    const [count, setCount] = React.useState(0);

    const myRef = React.useRef();

    function show() {
      alert(myRef.current.value);
    }

    return (
      <div>
        <input type="text" ref={myRef} />
        <h2>当前求和为: {count}</h2>
        <button onClick={show}>点我提示数据</button>
      </div>
    );
  }
  ```

#### React.useContext

接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider value={data}></MyContext.Provider> 的 value prop 值决定。
只能用在 function 组件中 或 自定义 hook 中

当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重新渲染，并使用最新传递给 MyContext provider 的 context value 值。即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染。

别忘记 useContext 的参数必须是 context 对象本身 useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>{value => /_ 基于 context 值进行渲染_/}</MyContext.Consumer>。

```jsx
import React, { useContext, Component } from "react";
export const ThemeContext = React.createContext({ themeColor: "pink" });
export const UserContext = React.createContext();

export function UseContextPage(props) {
  const themeContext = useContext(ThemeContext);
  const { themeColor } = themeContext;
  const userContext = useContext(UserContext);

  // userContext 可以使用多个 Context 只需把相当应的 Context名称传入即可
  // 然后在祖、父级调用MyContext.Provider组件传参
  console.log(themeColor, "xxxx", userContext.name);
  return (
    <div className="border">
      <h3 className={themeColor}>UseContextPage {themeColor}</h3>
      <p>{userContext.name}</p>
    </div>
  );
}

export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: "red33",
      },
      user: {
        name: "xiaoming",
      },
    };
  }

  changeColor = () => {
    const { themeColor } = this.state.theme;
    this.setState({
      theme: {
        themeColor: themeColor === "red" ? "green" : "red",
      },
    });
  };

  render() {
    const { theme, user } = this.state;
    return (
      <>
        <UserContext.Provider value={user}>
          <ThemeContext.Provider value={theme}>
            <UseContextPage />
          </ThemeContext.Provider>
        </UserContext.Provider>
        <button onClick={this.changeColor}>change color</button>
      </>
    );
  }
}
```

#### React.useCallback

把内联回调函数及依赖项数组作为参数传⼊ useCallback ，它将返回该回调函数的 memoized 版本，
该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使⽤引⽤相等性去避
免⾮必要渲染（例如 shouldComponentUpdate ）的⼦组件时，它将⾮常有⽤。

```jsx
import React, { useState, useCallback, PureComponent } from "react";
export default function UseCallbackPage(props) {
  const [count, setCount] = useState(0);
  // 使用useCallback缓存函数
  const addClick = useCallback(() => {
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
  }, [count]);
  const [value, setValue] = useState("");
  return (
    <div>
      <h3>UseCallbackPage</h3>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <input value={value} onChange={(event) => setValue(event.target.value)} />
      <Child addClick={addClick} />
    </div>
  );
}
class Child extends PureComponent {
  render() {
    console.log("child render");
    const { addClick } = this.props;
    return (
      <div>
        <h3>Child</h3>
        <button onClick={() => console.log(addClick())}>add</button>
      </div>
    );
  }
}
```

#### React.useMemo

把“创建”函数和依赖项数组作为参数传⼊ useMemo ，它仅会在某个依赖项改变时才重新计算
memoized 值。这种优化有助于避免在每次渲染时都进⾏⾼开销的计算。

```jsx
import React, { useState, useMemo } from "react";
export default function UseMemoPage(props) {
  const [count, setCount] = useState(0);
  const expensive = useMemo(() => {
    console.log("compute");
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
    //只有count变化，这⾥才重新执⾏
  }, [count]);
  const [value, setValue] = useState("");
  return (
    <div>
      <h3>UseMemoPage</h3>
      {/* 不使用useMemo时，直接执行函数 <p>expensive:{expensive()}</p> */}
      <p>expensive:{expensive}</p>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <input value={value} onChange={(event) => setValue(event.target.value)} />
    </div>
  );
}
```

#### React.memo 相当于函数组件的 PureComponent

```jsx
const Funcomponent = () => {
  return <div>Hiya!! I am a Funtional component</div>;
};
const MemodFuncComponent = React.memo(FunComponent);
```

#### 函数组件中实现 forceUpdate()

```js
function useForceUpdate() {
  // const [state, setState] = React.useState(0);
  const [_, setState] = React.useReducer((x) => x + 1, 0);
  // 使用useCallback缓存函数，由于 没有依赖
  // 使其每次反回的 都是第一次调用时的地址引用
  const update = React.useCallback(() => {
    // setState((prev) => prev + 1);
    // setState({});
    setState();
  }, []);

  return update;
}

const forceUpdate = useForceUpdate();
```

### 常用的 react-redux Hooks

- useDispatch
- useSelector

```jsx
// 配合 redux的Provide组件
// 在 Provide的子组件中可使用 useSelector获取数据
import React, { useCallback } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
/*
<Provider store={store}>
  <ChildComponentUseReactRedux />
</Provider>
*/

export default function UseSelectorPage() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const add = useCallback(() => {
    dispatch({ type: "ADD" });
  }, []);
  return (
    <div>
      <h3>UseSelectorPage</h3>
      <p>{count}</p>
      <button onClick={add}></button>
    </div>
  );
}

// 源码实现 useDispatch
// 自定义hook
export function useDispatch() {
  const store = useContext(Context);
  return store.dispatch;
}
// 源码实现 useSelector
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
```

- useStore

### 常用的 react-router / react-router-dom Hooks

使用高阶函数 withRouter 能获取完整的路由信息

- useHistory
- useLocation
- useParams
- useRouteMatch
