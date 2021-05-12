<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [React的 Fragment Context PureComponent renderProps ErrorBoundary 使用方法](#react%E7%9A%84-fragment-context-purecomponent-renderprops-errorboundary-%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
  - [Fragment 代码碎片](#fragment-%E4%BB%A3%E7%A0%81%E7%A2%8E%E7%89%87)
  - [Context 实现 袓组件与后代组件 通讯 (类似Vue中的 provide inject 依赖注入)](#context-%E5%AE%9E%E7%8E%B0-%E8%A2%93%E7%BB%84%E4%BB%B6%E4%B8%8E%E5%90%8E%E4%BB%A3%E7%BB%84%E4%BB%B6-%E9%80%9A%E8%AE%AF-%E7%B1%BB%E4%BC%BCvue%E4%B8%AD%E7%9A%84-provide-inject-%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-05-11 13:01:39
 * @LastEditors: mrzou
 * @LastEditTime: 2021-05-12 13:12:00
 * @Description: file content
-->
### React的 Fragment Context PureComponent renderProps ErrorBoundary 使用方法

#### Fragment 代码碎片
  - 用来替代无用的根标签，也可使用空标签( <> </> )替代
  - 但如果当前的根标签 要遍历 要传key值 则只能用 Fragment 且Fragment只能传一个key属性，其他名称会报错
  ```jsx
    import React, { Component, Fragment } from 'react'
    export default class Demo extends Component{
      render(){
        return(
          <Fragment key={1}>
           <div>test test</>
           <div>dong dong</>
          </Fragment>
        )
      }
    }
  ```

#### Context 实现 袓组件与后代组件 通讯 (类似Vue中的 provide inject 依赖注入)

- 使用类组件 Context 实现 袓组件与后代组件 通讯
  ```jsx
  import React, { Component } from 'react'

  // 创建context对象
  const MyContext = React.createContext()
  // const { Provide } = MyContext

  export class A extends Component {
    state = {username: 'mz', age: 18}
    render() {
      const { username, age } = this.state
      return (
        <div className="parent">
          <h3>我是A组件</h3>
          <div>我的用户名是：{ username }</div>
          // 用 context的Provide组件包裹 B 组件 给其传递参数
          // 这样 B组件本身和他内部所有的子组件 都可以 通过声明接收 context 来获取到 username 这个值 
          // 且 属性名必须为 value 其他名称无效
          <MyContext.Provide value={{ username, age }}>
            <B/>
          </MyContext.Provide>
        </div>
      )
    }
  }

  export class B extends Component {
    // 声明 contextType 静态属性   值为你要接收的 Context 名称
    static contextType = MyContext

    render() {
      // 获取传过来的 Context 值
      const { age } = this.context
      return (
        <div className="child">
          <h3>我是B组件</h3>
          <div>我接收到的A组件的年龄为： { age }</div>
          <C/>
        </div>
      )
    }
  }

  export class C extends Component {
    // 子组件要使用 袓组件 Context 传下来的数据就必须
    // 声明 contextType 静态属性   值为你要接收的 Context 名称
    static contextType = MyContext
    
    render() {
      // 获取传过来的 Context 值的方式为  this.context
      const { username } = this.context

      return (
        <div className="child">
          <h3>我是C组件</h3>
          <div>我接收到的A组件的名字为： {username}</div>
        </div>
      )
    }
  }
  ```
- 使用函数式组件 Context 实现 袓组件与后代组件 通讯
  - 父组件 通过Context传值 和上面是一样的写法  只有接收上有所不同  下面就是接收的demo 
  - 使用 Consumer 类组件与函数组件都可以用  但Provide 只有类组件可用
  ```jsx
  export function C() {
    return (
      return (
        <div className="child">
          <h3>我是C组件</h3>
          <div>我接收到的A组件的名字为： 
            <MyContext.Consumer>
              {
                (value) => {
                  return `${value.username}，年龄是：${value.age}`
                }
              }
            </MyContext.Consumer>
          </div>
        </div>
      )
    )
  }
  ```
