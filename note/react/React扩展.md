<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [1. setState](#1-setstate)
  - [setState 更新状态的 2 种写法](#setstate-%E6%9B%B4%E6%96%B0%E7%8A%B6%E6%80%81%E7%9A%84-2-%E7%A7%8D%E5%86%99%E6%B3%95)
- [2. lazyLoad](#2-lazyload)
  - [路由组件的 lazyLoad](#%E8%B7%AF%E7%94%B1%E7%BB%84%E4%BB%B6%E7%9A%84-lazyload)
- [3. Hooks](#3-hooks)
    - [1. React Hook/Hooks 是什么?](#1-react-hookhooks-%E6%98%AF%E4%BB%80%E4%B9%88)
    - [2. 三个常用的 Hook](#2-%E4%B8%89%E4%B8%AA%E5%B8%B8%E7%94%A8%E7%9A%84-hook)
    - [3. State Hook](#3-state-hook)
    - [4. Effect Hook](#4-effect-hook)
    - [5. Ref Hook](#5-ref-hook)
- [4. Fragment](#4-fragment)
  - [使用](#%E4%BD%BF%E7%94%A8)
  - [作用](#%E4%BD%9C%E7%94%A8)
- [5. Context](#5-context)
  - [理解](#%E7%90%86%E8%A7%A3)
  - [使用](#%E4%BD%BF%E7%94%A8-1)
  - [注意](#%E6%B3%A8%E6%84%8F)
- [6. 组件优化](#6-%E7%BB%84%E4%BB%B6%E4%BC%98%E5%8C%96)
  - [Component 的 2 个问题](#component-%E7%9A%84-2-%E4%B8%AA%E9%97%AE%E9%A2%98)
  - [效率高的做法](#%E6%95%88%E7%8E%87%E9%AB%98%E7%9A%84%E5%81%9A%E6%B3%95)
  - [原因](#%E5%8E%9F%E5%9B%A0)
  - [解决](#%E8%A7%A3%E5%86%B3)
- [7. render props](#7-render-props)
  - [如何向组件内部动态传入带内容的结构(标签)?](#%E5%A6%82%E4%BD%95%E5%90%91%E7%BB%84%E4%BB%B6%E5%86%85%E9%83%A8%E5%8A%A8%E6%80%81%E4%BC%A0%E5%85%A5%E5%B8%A6%E5%86%85%E5%AE%B9%E7%9A%84%E7%BB%93%E6%9E%84%E6%A0%87%E7%AD%BE)
  - [children props](#children-props)
  - [render props](#render-props)
- [8. 错误边界](#8-%E9%94%99%E8%AF%AF%E8%BE%B9%E7%95%8C)
    - [理解：](#%E7%90%86%E8%A7%A3)
    - [特点：](#%E7%89%B9%E7%82%B9)
      - [使用方式：](#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)
- [9. 组件通信方式总结](#9-%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1%E6%96%B9%E5%BC%8F%E6%80%BB%E7%BB%93)
    - [组件间的关系：](#%E7%BB%84%E4%BB%B6%E9%97%B4%E7%9A%84%E5%85%B3%E7%B3%BB)
    - [几种通信方式：](#%E5%87%A0%E7%A7%8D%E9%80%9A%E4%BF%A1%E6%96%B9%E5%BC%8F)
    - [比较好的搭配方式：](#%E6%AF%94%E8%BE%83%E5%A5%BD%E7%9A%84%E6%90%AD%E9%85%8D%E6%96%B9%E5%BC%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1. setState

### setState 更新状态的 2 种写法

```
	(1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
            this.setState({xxx: 666}, () => {})

	(2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
            this.setState((state, props) => ({xxx: state.count + 1}), () => {})
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
				(1).如果新状态不依赖于原状态 ===> 使用对象方式
				(2).如果新状态依赖于原状态 ===> 使用函数方式
				(3).如果需要在setState()执行后获取最新的状态数据,
					要在第二个callback函数中读取
```

---

## 2. lazyLoad

### 路由组件的 lazyLoad

```js
  import React, { Component, lazy, Suspense } from 'react'
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))

	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```

---

## 3. Hooks

#### 1. React Hook/Hooks 是什么?

```
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

#### 2. 三个常用的 Hook

```
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

#### 3. State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

#### 4. Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明:
        useEffect(() => {
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行

(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount()
```

#### 5. Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```

---

## 4. Fragment

### 使用

    <Fragment><Fragment>
    <></>

### 作用

> 可以不用必须有一个真实的 DOM 根标签了

<hr/>

## 5. Context

### 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

### 使用

```js
1) 创建Context容器对象：
	const XxxContext = React.createContext()

2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>

3) 后代组件读取数据：

	//第一种方式:仅适用于类组件
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据

	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

### 注意

    在应用开发中一般不用context, 一般都用它的封装react插件

<hr/>

## 6. 组件优化

### Component 的 2 个问题

> 1. 只要执行 setState(),即使不改变状态数据, 组件也会重新 render() ==> 效率低
>
> 2. 只当前组件重新 render(), 就会自动重新 render 子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

### 效率高的做法

> 只有当组件的 state 或 props 数据发生改变时才重新 render()

### 原因

> Component 中的 shouldComponentUpdate()总是返回 true

### 解决

    办法1:
    	重写shouldComponentUpdate()方法
    	比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
    办法2:
    	使用PureComponent
    	PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
    	注意:
    		只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false
    		不要直接修改state数据, 而是要产生新数据
    项目中一般使用PureComponent来优化

<hr/>

## 7. render props

### 如何向组件内部动态传入带内容的结构(标签)?

    Vue中:
    	使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
    React中:
    	使用children props: 通过组件标签体传入结构
    	使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性

### children props

    <A>
      <B>xxxx</B>
    </A>
    {this.props.children}
    问题: 如果B组件需要A组件内的数据, ==> 做不到

### render props

    <A render={(data) => <C data={data}></C>}></A>
    A组件: {this.props.render(内部state数据)}
    C组件: 读取A组件传入的数据显示 {this.props.data}

<hr/>

## 8. 错误边界

#### 理解：

错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面

#### 特点：

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

##### 使用方式：

getDerivedStateFromError 配合 componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

## 9. 组件通信方式总结

#### 组件间的关系：

- 父子组件
- 兄弟组件（非嵌套组件）
- 祖孙组件（跨级组件）

#### 几种通信方式：

    	1.props：
    		(1).children props
    		(2).render props
    	2.消息订阅-发布：
    		pubs-sub、event等等
    	3.集中式管理：
    		redux、dva等等
    	4.conText:
    		生产者-消费者模式

#### 比较好的搭配方式：

    	父子组件：props
    	兄弟组件：消息订阅-发布、集中式管理
    	祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)
