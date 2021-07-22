/*
 * @Author: mrzou
 * @Date: 2021-07-10 19:33:00
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-13 14:21:30
 * @Description: file content
 */
// import React, {Component} from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "./kreact/react-dom";
// import Component from "./kreact/Component";
import "./index.css";

function FunctionComponent(props) {
  return (
    <div className="border">
      <p>{props.name}</p>
    </div>
  );
}

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.kaikeba.com/">kkb</a>
    <FunctionComponent name="function" />

    <>
      <h1>omg</h1>
      <h2>omg</h2>
    </>
  </div>
);
console.log("jsx****", jsx);
// 此处jsx 已经被转换成了 对象树 即虚拟dom
// 如上面的
ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log

// 原生标签
// 文本节点
// 函数组件
// 类组件
// Fragment
