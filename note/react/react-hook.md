<!--
 * @Author: mrzou
 * @Date: 2021-05-07 12:53:20
 * @LastEditors: mrzou
 * @LastEditTime: 2021-05-07 13:04:38
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
  