<!--
 * @Author: mrzou
 * @Date: 2021-04-07 17:30:01
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-15 12:49:34
 * @Description: file content
-->
## jsx规则
- 1.定议虚拟DOM时，不要写引号
- 2.标签中混入js表达式时要用{}
- 3.样式的类名指定不要用calss，要用className
- 4.内联样式，要用style={{key: value}}的形式去写
- 5.只有一个根标签
- 6.标签必须闭合
- 7.标签首字母
    - 若小写字母开头，则将改标签转为html中同名元素，若html中无该标签对应的同名元素，则报错
    - 若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错
- 8.一定注意区分：【js语句(代码)】与【js表达式】
  - 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
    - 下面这些都是表达式：
      (1). a
      (2). a+b
      (3). demo(1)
      (4). arr.map() 
      (5). function test () {}
  - 语句(代码)：
    - 下面这些都是语句(代码)：
      (1).if(){}
      (2).for(){}
      (3).switch(){case:xxxx}

## 实例组件
- 需继承React.Component
  
  - class Weather extends React.Component{}
- 不用写构造器constructor，写了就必须写super(props)并传值
  - 写了构造器不写super会报错
  - 写了super不传值 props 实例中将获取不到props  
- 类中定义原型方法与实例方法与实例属性加简写与props类型限制
  ```javascript
  class Weather extends React.Component{
    constructor(props){
      super(props)
      // 在构造器中声明的实例属性
      // this.state = {isHot:false,wind:'微风'}
    }

    // 简写的实例属性 - 推荐写法
    state = {isHot:false, wind:'微风'}

    // 放在原型链上的方法
    say(){
      console.log(this.state.wind);
    }

    // 实例方法————要用赋值语句的形式+箭头函数
    // 箭头函数无this所以还是指向实例
    // --- 推荐写法
    changeWeather = ()=>{
      console.log(this.state, this.props)
    }

    //对标签属性prop进行类型、必要性的限制
    static propTypes = {
      name:PropTypes.string.isRequired, //限制name必传，且为字符串
      sex:PropTypes.string,//限制sex为字符串
      age:PropTypes.number,//限制age为数值
    }

    //指定默认标签属性prop值
    static defaultProps = {
      sex:'男',//sex默认值为男
      age:18 //age默认值为18
    }
  }
  ReactDOM.render(<Weather name="kk"/>,document.getElementById('test'))
  ```
## 函数式组件
- 只有props属性可用，因为函数可以传参
- state与refs都不能用
- props类型限制
  ```javascript
  function Person (props){
    const {name,age,sex} = props
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
      </ul>
    )
  }
  
  Person.propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
  }

  //指定默认标签属性值
  Person.defaultProps = {
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
  }

  // 传递props的简写，两种组件都支持
  const obj = {sex: '男', age: '20'}

  ReactDOM.render(<Person {...obj} name="jerry"/>,document.getElementById('test1'))
  ```
## ref的使用
- 字符串ref 和Vue中用法一样（官方已经不推荐，后面新版本可能会删除）
- 回调函数ref
  ```javascript
  class Demo extends React.Component{
    showData = ()=>{
      const {input1} = this
      // ref获取到的dom input1
      // 使用内联函数，在组件更新时，会调用两次
      // 第一次传一个null  第二次才传真实节点，官方上说没什么问题
      // 此方式工作中使用居多
      alert(input1.value)
    }
    showData2 = (c)=>{
			this.input2 = c;
      // ref获取到的dom input1
      // 这里用的是调用函数的方式，更新时不会触发两次
    }
    render(){
      return(
        <div>
          <input ref={c => this.input1 = c } type="text" />
          <input ref={this.showData2} type="text" />
        </div>
      )
    }
  }
  ```
- 使用createRef的ref 及 事件触发和绑定
```javascript
//创建组件
class Demo extends React.Component{
  /* 
    React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
    */
  myRef = React.createRef()
  showData = ()=>{
    // 获取ref  myRef实际dom  this.myRef.current
    // 并获取input的值value
    alert(this.myRef.current.value);
  }
  onblur = (e)=>{
    // 事件触发时会把当前dom传回来 
    // 通过event.target得到发生事件的DOM元素对象 — 不要过度使用ref
    // 事件绑定时，事件名要首字母大写 如  onBlur
    // 使用自定义(合成)事件, 而不是原生DOM事件 —— 为了更好的兼容性
    // 事件是通过事件委托处理的(委托给组件最外层的元素) ——为高效
    alert(e.target.value);
  }
  render(){
    return(
      <div>
        <input ref={this.myRef} type="text" />
        <button onClick={this.showData}>点我提示左侧的数据</button>
        <input onBlur={this.onblur} type="text"/>
      </div>
    )
  }
}
```

## react组件生命周期
  - 新版本废弃了三Will个钩子，新增了两个钩子
  - 旧版本（17版本之前）的生命周期
    ![旧的生命周期](./images/2_react生命周期(旧).png)

  - 新版本（17 版本及以上）的生命周期
    ![](./images/3_react生命周期(新).png)
  - 初始化第一执行 constructor 构造器
  - 组件将要挂载的钩子
    - 此钩子将来可能废弃
    ```javascript
    // 旧版写法
    componentWillMount(){
      console.log('组件将要挂载');
    }

    // 新版写法
    UNSAFE_componentWillMount(){
      console.log('组件将要挂载');
    }
    ```
  - 组件挂载完毕 执行的钩子函数
    ```javascript
    componentDidMount(){
      console.log('组件挂载完毕');
    }
    ```
    - 手动卸载组件
      ```javascript
      // 找到当前组件的容器 dom 然后调用 ReactDOM.unmountComponentAtNode
      // 且是顶级容器
      ReactDOM.unmountComponentAtNode(document.getElementById('test'))
      ```
      
  - 控制组件更新的“阀门”
    ```javascript
    shouldComponentUpdate(){
      console.log('控制组件是否更新');
      // 返回一个布尔值  表示是否更新
      // return true  表示更新  不写shouldComponentUpdate默认就是 true
      // return false 表示不更新
    }
    ```
  - 组件将要更新的钩子
    - 此钩子将来可能废弃
    ```javascript
    // 旧版写法
    componentWillUpdate(){
      console.log('组件将要开始更新了');
    }

     // 新版写法
    UNSAFE_componentWillUpdate(){
      console.log('组件将要开始更新了');
    }
    ```
  - 组件更新完毕的钩子
    ```javascript
    componentDidUpdate(preProps, preState, snapshotValue){
      console.log('组件已经更新完了');
      // preProps        更新前的 props
      // preState        更新前的 state
      // snapshotValue   更新前获取的快照信息，由getSnapshotBeforeUpdate钩子返回
      // 快照信息可以获取，更新前的一些信息，如滚动条位置，节点高度等等
    }
    ```  

  - 组件将要到接收  父组件新的props  时触发的钩子
    - 此钩子将来可能废弃
    ```javascript
    // 只有父组件传给子组件的props值发生改变时，子组件才会触发这个钩子
    // 且第一次初始化时，传的props是不会触发的，一定是新的值才触发

    // 旧版写法
    componentWillReceiveProps(props){
      console.log('B---componentWillReceiveProps',props);
    }

    // 新版写法
    UNSAFE_componentWillReceiveProps(props){
      console.log('B---componentWillReceiveProps',props);
    }
    ``` 

  - 组件将要卸载 执行的钩子函数 react设计上无componentDidUnmount 因为卸载后再操作无意义
    ```javascript
    componentWillUnmount(){
      console.log('组件将要卸载');
    }
    ```  
  - 初始化渲染 或 状态更新之后 执行的钩子函数
    ```javascript
    render(){
      console.log('初始化渲染 或 状态更新之后 执行');
      return(
        <div>
          <div>{this.name}</div>
        </div>
      )
    }
    ```
  - 无数据更改的视图强制更新 forceUpdate 方法
    ```javascript
    force = ()=>{
      this.forceUpdate()
    }
    ```

  - 新版新增的两个生命周期钩子
    - getDerivedStateFromProps
      ```javascript
      // 若state的值在任何时候都取决于props，那么可以使用getDerivedStateFromProps
      // 且是一个静态方法 必须加 static 声明
      // 且须返回值 null 或者 一个数据对象
      // 数据对象中如果包含了state中相同的 key 则初始化和后面的数据更新，将以数据对象为准
      static getDerivedStateFromProps(props,state){
        console.log('getDerivedStateFromProps',props,state);
        return null // 则数据不受影响, 不加此钩子 默认为 null
        /*
        return {count: 100}
          如果 state 中含有 count 这个key 则count这个字段不会更新 始终为100
          初始化时 count也为 100
        */

        /*
         return props
          钩子中能获取父组件传过来的props 和 当前组 state
          如果这个组件的数据，要从父组件传过来使用，则直接反回 props
          可以用来替代state，两个数据互不关扰，只会被替代
          如在修改state时，不影响此数据
        */
      }
      ```
    - getSnapshotBeforeUpdate
      - 在更新钩子前执行
      ```javascript
      //在更新之前获取快照
      getSnapshotBeforeUpdate(){
        console.log('getSnapshotBeforeUpdate');
        // 必须要有返回值，可反回null
        // return null
        return {
          scrollTop: 100
        }

        // 更新前获取的快照信息，返回给 componentDidUpdate 钩子当第三个参数调用
        // 快照信息可以获取，更新前的一些信息，如滚动条位置，节点高度等等
      }
      ```  

## create-react-app 脚手架
- 入口html文件  public/index.html
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <!-- %PUBLIC_URL%代表public文件夹的路径 -->
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <!-- 开启理想视口，用于做移动端网页的适配 -->
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <!-- 用于配置浏览器页签+地址栏的颜色(仅支持安卓手机浏览器) -->
      <meta name="theme-color" content="red" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      <!-- 用于指定网页添加到手机主屏幕后的图标 -->
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <!-- 应用加壳时的配置文件 -->
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      <title>React App</title>
    </head>
    <body>
      <!-- 若llq不支持js则展示标签中的内容 -->
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </body>
  </html>
  ```
## 脚手架配置代理
- 单个代理 使用package.json 中的 proxy 字段
  ```json
  "proxy": "http://localhost:5000"
  ```
  说明：
  1. 优点：配置简单，前端请求资源时可以不加任何前缀。
  2. 缺点：不能配置多个代理。
  3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

- 多个代理 新建setupProxy.js文件 需使用cjs规范，是给node环境调用的
  - 在src下创建配置文件：src/setupProxy.js
  - 编写setupProxy.js配置具体代理规则：
  ```javascript
  const proxy = require('http-proxy-middleware')
  module.exports = function(app) {
    app.use(
      proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
        target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
        changeOrigin: true, //控制服务器接收到的请求头中host字段的值
        /*
          changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
          changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
          changeOrigin默认值为false，但我们一般将changeOrigin值设为true
        */
        pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
      }),
      proxy('/api2', { 
        target: 'http://localhost:5001',
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      })
    )
  }
  ```
  说明：
  1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
  2. 缺点：配置繁琐，前端请求资源时必须加前缀。
