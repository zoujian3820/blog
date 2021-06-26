<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [setState更新状态的2种写法](#setstate%E6%9B%B4%E6%96%B0%E7%8A%B6%E6%80%81%E7%9A%842%E7%A7%8D%E5%86%99%E6%B3%95)
- [路由组件的lazy懒加载](#%E8%B7%AF%E7%94%B1%E7%BB%84%E4%BB%B6%E7%9A%84lazy%E6%87%92%E5%8A%A0%E8%BD%BD)
- [React Hook/Hooks是什么?](#react-hookhooks%E6%98%AF%E4%BB%80%E4%B9%88)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-05-07 12:53:20
 * @LastEditors: mrzou
 * @LastEditTime: 2021-06-27 00:46:10
 * @Description: file content
-->
### setState更新状态的2种写法
- setState(stateChange, [callback])对象式的setState
  - stateChange为状态改变对象(该对象可以体现出状态的更改)
  - callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
    ```jsx
    this.setState({xxx: 666}, () => {})
    ```
- setState(updater, [callback])函数式的setState
  - updater为返回stateChange对象的函数。
  - updater可以接收到state和props。
  - callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
    ```jsx
    this.setState((state, props) => ({xxx: state.count + 1}), () => {})
    ```

### 路由组件的lazy懒加载
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

### React Hook/Hooks是什么?
- Hook是React 16.8.0版本增加的新特性/新语法
- 可以让你在函数组件中使用 state 以及其他的 React 特性

  #### 三个常用的Hook
  - State Hook: React.useState()
  - Effect Hook: React.useEffect()
  - Ref Hook: React.useRef()
  - React.useContext

  #### State Hook 在函数组件中 模似类组件的 setState
  - React.useState
    ```jsx
      import React from 'react'
      export function Demo() {
        // React.useState(0) 返回值是一个2个元素的数组（2元素为：当前值和更改值的方法），传入的参数0为初始值 
        // const [当前值, 更改值的方法] = React.useState(0)
        // React.useState 在第一次调用时React内部就给值，做了缓存处理，当组件更新再调时不会走初始化，所以值不会重新改为0
        const [count, setCount] = React.useState(0)
        const [name, setName] = React.useState('mzou')
        
        function add() {
          // setCount(count + 1)
          // 第二种写法, 传入一个函数，函数参数返回当前值，再return 你修改的值
          setCount(count => count + 1)
        }
        
        function chageName() {
          setName('汤哥')
        }

        return (
          <div>
            <h2>当前求和为: {count}</h2>
            <h2>我的名字为: {name}</h2>
            <button onClick={add}>点我加1</button>
            <button onClick={chageName}>点我改名</button>
          </div>
        )
      }
    ```

  #### Effect Hook 可以在函数组件中 模似类组件的生命周期
  - React.useEffect
    - 模似三个生命周期
      - componentDidMount
      - componentDidUpdate
      - componentWillUnmount
    ```jsx
      import React from 'react'
      export function Demo() {
        const [count, setCount] = React.useState(0)

        // React.useEffect 有两参数
          // 第一个为回调
          // 第二个为一个数组, 元素为需要监听的数据名称key(可多个) 只要当前监听的数据变更，就执行回调（相当于componentDidUpdate）
          // 不传第二个参数，则监听所有数据的变更并执行回调
          // 第二参如传空数组，则不监听数据变更，只在组件挂载时执行一次（相当于componentDidMount）
        React.useEffect(() => {
          const timer = setInterval(() => {
            setCount(count+1)
          }, 1000)
          return () => {
            // return 的函数 相当于 componentWillUnmount
            // 可以做一些收尾工作 如清除定时器等
            clearInterval(timer)
          }
        }, ['count'])

        return (
          <div>
            <h2>当前求和为: {count}</h2>
          </div>
        )
      }
    ```

  #### Ref Hook 可以在函数组件中 模似类组件的ref  功能与React.createRef()一样
  - React.useRef
    ```jsx
      import React from 'react'
      export function Demo() {
        const [count, setCount] = React.useState(0)

        const myRef = React.useRef()

        function show() {
          alert(myRef.current.value)
        }

        return (
          <div>
            <input type="text" ref={myRef} />
            <h2>当前求和为: {count}</h2>
            <button onClick={show}>点我提示数据</button>
          </div>
        )
      }
    ```

  #### React.useContext
    接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider value={data}></MyContext.Provider> 的 value prop值决定。只能用在 function 组件中。

    当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重新渲染，并使用最新传递给 MyContext provider 的 context value 值。即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染。

    别忘记 useContext 的参数必须是 context 对象本身useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>{value => /* 基于 context 值进行渲染*/}</MyContext.Consumer>。  

    ```jsx
    import React, { useContext, Component } from "react";
    export const ThemeContext = React.createContext({themeColor: 'pink'});
    export const UserContext = React.createContext();

    export function UseContextPage(props) {
      const themeContext = useContext(ThemeContext);
      const {themeColor} = themeContext;
      const userContext = useContext(UserContext);

      // userContext 可以使用多个 Context 只需把相当应的 Context名称传入即可
      // 然后在祖、父级调用MyContext.Provider组件传参
      console.log(themeColor, 'xxxx', userContext.name)
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
            themeColor: "red33"
          },
          user: {
            name: "xiaoming"
          }
        };
      }

      changeColor = () => {
        const {themeColor} = this.state.theme;
        this.setState({
          theme: {
            themeColor: themeColor === "red" ? "green" : "red"
          }
        });
      };

      render() {
        const {theme, user} = this.state;
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
