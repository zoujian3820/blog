<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [promise 调用测试用例](#promise-%E8%B0%83%E7%94%A8%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B)
- [promise 源码实现](#promise-%E6%BA%90%E7%A0%81%E5%AE%9E%E7%8E%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-06-16 01:42:33
 * @LastEditors: mrzou
 * @LastEditTime: 2021-06-16 01:46:31
 * @Description: file content
-->

## promise 调用测试用例

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("OK");
    // reject("Eror");
  });
});

p1.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.warn(reason);
  }
);

console.log(Promise.resolve("OK"));
```

## promise 源码实现

```js
class Promise {
  //构造方法
  constructor(executor) {
    //添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    //声明属性
    this.callbacks = [];
    //保存实例对象的 this 的值
    const self = this; // self _this that
    //resolve 函数
    function resolve(data) {
      //判断状态
      if (self.PromiseState !== "pending") return;
      //1. 修改对象的状态 (promiseState)
      self.PromiseState = "fulfilled"; // resolved
      //2. 设置对象结果值 (promiseResult)
      self.PromiseResult = data;
      //调用成功的回调函数
      setTimeout(() => {
        self.callbacks.forEach((item) => {
          item.onResolved(data);
        });
      });
    }
    //reject 函数
    function reject(data) {
      //判断状态
      if (self.PromiseState !== "pending") return;
      //1. 修改对象的状态 (promiseState)
      self.PromiseState = "rejected"; //
      //2. 设置对象结果值 (promiseResult)
      self.PromiseResult = data;
      //执行失败的回调
      setTimeout(() => {
        self.callbacks.forEach((item) => {
          item.onRejected(data);
        });
      });
    }
    try {
      //同步调用『执行器函数』
      executor(resolve, reject);
    } catch (e) {
      //修改 promise 对象状态为『失败』
      reject(e);
    }
  }

  //then 方法封装
  then(onResolved, onRejected) {
    const self = this;
    //判断回调函数参数
    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw reason;
      };
    }
    if (typeof onResolved !== "function") {
      onResolved = (value) => value;
      //value => { return value};
    }
    return new Promise((resolve, reject) => {
      //封装函数
      function callback(type) {
        try {
          //获取回调函数的执行结果
          let result = type(self.PromiseResult);
          //判断
          if (result instanceof Promise) {
            //如果是 Promise 类型的对象
            result.then(
              (v) => {
                resolve(v);
              },
              (r) => {
                reject(r);
              }
            );
          } else {
            //结果的对象状态为『成功』
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      }
      //调用回调函数  PromiseState
      if (this.PromiseState === "fulfilled") {
        setTimeout(() => {
          callback(onResolved);
        });
      }
      if (this.PromiseState === "rejected") {
        setTimeout(() => {
          callback(onRejected);
        });
      }
      //判断 pending 状态
      if (this.PromiseState === "pending") {
        //保存回调函数
        this.callbacks.push({
          onResolved: function () {
            callback(onResolved);
          },
          onRejected: function () {
            callback(onRejected);
          },
        });
      }
    });
  }

  //catch 方法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  //添加 resolve 方法
  static resolve(value) {
    //返回promise对象
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(
          (v) => {
            resolve(v);
          },
          (r) => {
            reject(r);
          }
        );
      } else {
        //状态设置为成功
        resolve(value);
      }
    });
  }

  //添加 reject 方法
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  //添加 all 方法
  static all(promises) {
    //返回结果为promise对象
    return new Promise((resolve, reject) => {
      //声明变量
      let count = 0;
      let arr = [];
      //遍历
      for (let i = 0; i < promises.length; i++) {
        //
        promises[i].then(
          (v) => {
            //得知对象的状态是成功
            //每个promise对象 都成功
            count++;
            //将当前promise对象成功的结果 存入到数组中
            arr[i] = v;
            //判断
            if (count === promises.length) {
              //修改状态
              resolve(arr);
            }
          },
          (r) => {
            reject(r);
          }
        );
      }
    });
  }

  //添加 race 方法
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (v) => {
            //修改返回对象的状态为 『成功』
            resolve(v);
          },
          (r) => {
            //修改返回对象的状态为 『失败』
            reject(r);
          }
        );
      }
    });
  }
}
```
