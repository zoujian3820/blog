/*
 * @Author: mrzou
 * @Date: 2021-07-07 20:15:49
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-10 19:57:48
 * @Description: file content
 */
import { getProductData } from "../services/product";

// {
//  _namespace : {//具体的model}
// }
export default {
  namespace: "example",

  // 子state
  state: {
    data: [],
    pageSize: 10,
    current: 1,
    total: 0
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      console.log("example subscriptions "); //sy-log
    }
  },

  effects: {
    // *fetch({ payload }, { call, put }) {
    //   // eslint-disable-line
    //   yield put({ type: "save" });
    // },
    *getProductData({ payload }, { call, put }) {
      //
      const res = yield call(getProductData, payload);
      yield put({ type: "productData", payload: res.data });
    }
  },

  // 定义了修改规则
  reducers: {
    // save(state, action) {
    //   return { ...state, ...action.payload };
    // }
    productData(state, action) {
      console.log(action)
      return { ...state, data: action.payload.data };
    }
  }
};
