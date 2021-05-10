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
 * @LastEditTime: 2021-05-10 13:17:13
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

  #### State Hook
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
