<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [redux](#redux)
  - [项目入口](#%E9%A1%B9%E7%9B%AE%E5%85%A5%E5%8F%A3)
    - [App.jsx](#appjsx)
    - [index.js](#indexjs)
  - [redux配置](#redux%E9%85%8D%E7%BD%AE)
    - [store.js](#storejs)
    - [constant.js](#constantjs)
    - [reducer.js](#reducerjs)
    - [action.js](#actionjs)
  - [组件内部使用](#%E7%BB%84%E4%BB%B6%E5%86%85%E9%83%A8%E4%BD%BF%E7%94%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-04-28 13:39:22
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-28 14:16:39
 * @Description: file content
-->

## redux

### 项目入口

  ####  App.jsx
  ```jsx
  // App.jsx
  import React, { Component } from 'react'
  import Count from './components/Count'

  export default class App extends Component {
    render() {
      return (
        <div>
          <Count/>
        </div>
      )
    }
  }
  ```

  #### index.js
  
  ```jsx
  // index.js
  import React from 'react'
  import ReactDOM from 'react-dom'
  import App from './App'
  import store from './redux/store'

  ReactDOM.render(<App/>,document.getElementById('root'))

  store.subscribe(()=>{
    // 如果在组件内部，要使当前组件更新，则直接赋值一个空对象(无数据更改) 
    // this.setState({})，触发更新 

    // 把根组件的 ReactDOM.render 放到subscribe订阅回调中
    // 当redux更新后，会立马执行render更新界面, 这样整个项目所有组件都会更新
    // 因为有diff算法，所以只会更新部分，有数据变更的组件
    ReactDOM.render(<App/>,document.getElementById('root'))
  })
  ```

### redux配置

  #### store.js  
  
  ```jsx
  // 该文件专门用于暴露一个store对象，整个应用只有一个store对象

  //引入createStore，专门用于创建redux中最为核心的store对象
  import {createStore,applyMiddleware} from 'redux'
  //引入为Count组件服务的reducer
  import countReducer from './count_reducer'
  //引入redux-thunk，用于支持异步action
  import thunk from 'redux-thunk'
  //使用异步 暴露store
  export default createStore(countReducer,applyMiddleware(thunk))

  // 不使用异步 暴露store
  // export default createStore(countReducer)

  // 异步非必须，可在自己的异步处理中调用 dispatch
  ```
  #### constant.js

  ```jsx
  // 该模块是用于定义action对象中type类型的常量值，目的只有一个：便于管理的同时防止程序员单词写错
  
  export const INCREMENT = 'increment'
  export const DECREMENT = 'decrement'

  ```

  #### reducer.js

  ```jsx
  // 1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
  // 2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)

  import {INCREMENT,DECREMENT} from './constant'

  const initState = 0 //初始化状态
  export default function countReducer(preState=initState,action){
    // console.log(preState);
    //从action对象中获取：type、data
    const {type,data} = action
    //根据type决定如何加工数据
    switch (type) {
      case INCREMENT: //如果是加
        return preState + data
      case DECREMENT: //若果是减
        return preState - data
      default:
        return preState
    }
  }
  ```
  #### action.js
  ```jsx
  // 该文件专门为Count组件生成action对象
  
  import {INCREMENT,DECREMENT} from './constant'

  //同步action，就是指action的值为Object类型的一般对象
  export const createIncrementAction = data => ({type:INCREMENT,data})
  export const createDecrementAction = data => ({type:DECREMENT,data})

  //异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
  export const createIncrementAsyncAction = (data,time) => {
    return (dispatch)=>{
      setTimeout(()=>{
        dispatch(createIncrementAction(data))
      },time)
    }
  }
  ```

### 组件内部使用

```jsx
import React, { Component } from 'react'
//引入store，用于获取redux中保存状态
import store from '../../redux/store'
//引入actionCreator，专门用于创建action对象
import {
	createIncrementAction,
	createDecrementAction,
	createIncrementAsyncAction
} from '../../redux/count_action'

export default class Count extends Component {

	state = {carName:'奔驰c63'}

	/* componentDidMount(){
		//检测redux中状态的变化，只要变化，就调用render
		store.subscribe(()=>{
			this.setState({})
		})
	} */

	//加法
	increment = ()=>{
		const {value} = this.selectNumber
		store.dispatch(createIncrementAction(value*1))
	}
	//减法
	decrement = ()=>{
		const {value} = this.selectNumber
		store.dispatch(createDecrementAction(value*1))
	}
	//异步加
	incrementAsync = ()=>{
		const {value} = this.selectNumber
		// setTimeout(()=>{
			store.dispatch(createIncrementAsyncAction(value*1, 500))
		// },500)
	}

	render() {
		return (
			<div>
				<h1>当前求和为：{store.getState()}</h1>
				<select ref={c => this.selectNumber = c}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>加</button>&nbsp;
				<button onClick={this.decrement}>减</button>&nbsp;
				<button onClick={this.incrementAsync}>异步加</button>&nbsp;
			</div>
		)
	}
}

```
