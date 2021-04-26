<!--
 * @Author: mrzou
 * @Date: 2021-04-12 12:45:22
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-26 13:49:51
 * @Description: file content
-->

## 模块引用
- 分别暴露引用
  ```javascript
  // module.js
  const React = {a:1, b:2}
  export class Component {
    state = {xxx: 22}
  }

  React.Component = Component

  export default React

  // 引用module文件 的 app.js
  const React, {Component} from 'react'
  ```

## 解构
- 解构 - 加默认赋值
  ```javascript
  const obj = { a:55, b: 63 }
  // obj中可能没有 xx 这个属性，所以添加默认值 12
  const { a, b, xx = 12 } = obj
  ```

- 解构 - 替代值
  ```javascript
  const obj = { a:55, b: 63, c: {name : 'mr', age: 18, addr: '广州天河', nick: '小A'}, d: 63, e: 21}
  const { a: val1, b: val2, xx: val3, c: {name, age, ...eOther}, ...others } = obj
  // 结果如下：
    // val1: 55                 // a这个key 怕与其他重名，所以用val1替代
    // val2: 63                 // b 和 a一样
    // val3: undefined          // 因为没有 xx这个属性，所以为 undefined
    // name: mr  age: 18  eOther: {addr: '广州天河', nick: '小A'}
    // others: {c: 63, d: 21}   // ...解构运算符，所其他所有值 赋值给了others 这个变量
  ```
