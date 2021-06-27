import React from "react";

// 1、创建一个context对象
const FieldContext = React.createContext();

export default FieldContext;

// context传递值
// 三步走
// 1、创建一个context对象
// 2、通过Provider进行值的传递
// 3、子组件消费value
// 1) contextType 只能用在类组件中，并且只能接收单一的context来源
// 2）useContext 只能用在函数组件
// 3）Consumer 没有限制，就是用法麻烦
