## e.target与e.currentTarget的区别
  1. target是指当前点击到的实际元素对象
  2. currentTarget是指当前事件处理函数绑定的对象，
  <br/>而在log里看到的是null，是因为这个event是一个引用，在log的时候里面的一些属性被重置了
  <br/>这是因为currentTarget 只能用于事件正在处理过程中，当回调结束，会被重新赋值
  <br/>在log中打印要直接获值才不会被重置, 使用上也是

  ```javascript
  // 模似： 事件正在处理过程中， 故函数中能获取到值
  function clickFun(e) {
    console.log(e) // 因为引用类型原故，currentTarget为null
    console.log(e.currentTarget) // 打印出元素

    // 模似： 事件函数执行结束，currentTarget赋值为null
    e.currentTarget=null
  }

  clickFun({
    currentTarget: 55555,
    target: 6666
  })
  // 结果：
  // { currentTarget: null target: 6666 }
  // 55555
  ```

  3. 当要判断当前点击元素是否与绑定事件元素一致时，可用以下处理

  ```javascript
  function clickFun(e) {
    if(e.target === e.currentTarget){
      // to do...
    }
  }
  ```

