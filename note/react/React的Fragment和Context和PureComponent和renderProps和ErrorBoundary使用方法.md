<!--
 * @Author: mrzou
 * @Date: 2021-05-11 13:01:39
 * @LastEditors: mrzou
 * @LastEditTime: 2021-05-11 13:15:21
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
