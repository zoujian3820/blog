/*
 * @Author: mrzou
 * @Date: 2021-07-07 20:15:49
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-10 20:30:27
 * @Description: file content
 */
import React, { Component } from "react";
import { connect } from "dva";
import { Table } from "antd";

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "住址",
    dataIndex: "city",
    key: "city"
  }
];

// @connect(({ example }) => ({ example }), {
// connect 实现原理 参考 /note/react/react-redux/src目录代码demo/hooks版redux使用.md
@connect(
  state => {
    return { example: state.example, user: state.user };
  },
  {
    getProductData: payload => ({ type: "example/getProductData", payload }),
    productData: payload => ({ type: "example/productData", payload })
  }
)
class ExamplePage extends Component {
  dataSearch = () => {
    // 异步获取数据
    this.props.getProductData();
  };
  productData = () => {
    // 此处为同步直接 dispatch { type: "example/productData", payload }
    var obj = { "status": "ok", "data": [{ "id": 0, "name": "名字0", "age": 0, "city": "城市0" }, { "id": 1, "name": "名字1", "age": 1, "city": "城市1" }, { "id": 2, "name": "名字2", "age": 2, "city": "城市2" }, { "id": 3, "name": "名字3", "age": 3, "city": "城市3" }, { "id": 4, "name": "名字4", "age": 4, "city": "城市4" }, { "id": 5, "name": "名字5", "age": 5, "city": "城市5" }, { "id": 6, "name": "名字6", "age": 6, "city": "城市6" }, { "id": 7, "name": "名字7", "age": 7, "city": "城市7" }, { "id": 8, "name": "名字8", "age": 8, "city": "城市8" }, { "id": 9, "name": "名字9", "age": 9, "city": "城市9" }], "total": 101 }
    this.props.productData({ data: obj.data })
  }
  render() {
    console.log("example props", this.props); //sy-log
    const { data } = this.props.example;
    return (
      <div>
        <h3>ExamplePage</h3>
        <button onClick={this.dataSearch}>search</button>
        <button onClick={this.productData}>productData</button>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    );
  }
}
export default ExamplePage;
