
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

## css in js(css模块化)
- css文件命名规则, 需带上module
  - index.module.css
  ```javascript
  import Hello from './index.module.css'
  // index.module.css
  .title{
    color: #333;
  }
  
  // jsx
  render(){
    return <div className={Hello.title}>hello</div>
  }
  ```

## 快捷键生成jsx代码片段
- rcc
- rfc

## 配合订阅与发布实现在兄弟组件之前的通讯
- 之前兄弟组件之间通讯，可能都是通过父组件, 并采用prop的方式

- 父组件把数据传给需要使用的子组件，然后再传一个修改数据的函数方法（方法里直接把子组件传来的值，赋值给当前父组件），给需要修改数据的子组件

- 这样当修改数据的子组件，修改了数据后，另外一个子组件也就得到了更新

- **以上方法虽然可以实现通讯，但这样会导致父组件需要做很多额外的事情，变得很庞大**

  - 使用订阅与发布 pubsub-js  能把事情分离出来给需要的子组件自己管理

  - 兄弟组件之前可以直接通讯了，并且不用经过父组件，使用上也简洁明了

  - github地址：https://github.com/mroderick/PubSubJS

    ```javascript
    // web中使用
    import PubSub from 'pubsub-js'
    
    // nodejs 中这样使用
    const PubSub = require('pubsub-js');
    
    // 订阅 mySub 并返回一个当前订阅的token
    const Token = PubSub.subscribe('mySub', (msg, data) => {  
        // 你要做的处理 
        // msg: 'mySub'   msg的设计是多余的，但格式如此，可以用_代替
        // data: 为publish时传过来的数据
    });
    
    // 发布（派发）mySub 这个订阅，并传递数据
    PubSub.publish('mySub', {name: 'mrz', age: 18});
    
    // 取消订阅，参数为需要取消的订阅的token
    PubSub.unsubscribe(Token);
    ```

## react-router-dom页面路由
- 路由器，路由放在路由器中才能正常使用
- 路由器有两种
  - BrowserRouter  为history模式
  - HashRouter  为hash模式
  ```jsx
  // 入口文件 index.js

  //引入react核心库
  import React from 'react'
  //引入ReactDOM
  import ReactDOM from 'react-dom'
  //
  import {BrowserRouter, HashRouter} from 'react-router-dom'
  //引入App
  import App from './App'

  // 因为所有的路由都要放在路由器 BrowserRouter 中才能工作
  // 所以此处直接在 app的根文件上添加 BrowserRouter
  // 这样项目中的所有路由都在路由器的包裹中
  ReactDOM.render(
    <BrowserRouter> // HashRouter
      <App/>
    </BrowserRouter>,
    document.getElementById('root')
  )
  ```
    
- 路由注册 Route  与 路由跳转 Link / NavLink
- Link / NavLink 编绎出来就是a标签
  ```jsx
  // App.jsx
  import React, { Component } from 'react'
  import {Link, NavLink, Route, Switch} from 'react-router-dom'
  import Home from './components/Home'
  import About from './components/About'

  export default class App extends Component {
    render() {
      return (
        <div>
          <div className="list-group">
            {/* 原生html中，靠<a>跳转不同的页面 */}
            {/* <a className="list-group-item" href="./about.html">About</a>
            <a className="list-group-item active" href="./home.html">Home</a> */}

            {/* 在React中靠路由链接实现切换组件--编写路由链接 */}
            <Link className="list-group-item" to="/about">About</Link>
            <Link className="list-group-item" to="/home">Home</Link>
            {/* 
              Link与NavLink区别： 
                NavLink在点击后，默认会自动给自己加active类名className 
                使用activeClassName="xxx" 可以设置使用其他的className 
                不再使用默认的active 
            */}
            <NavLink className="list-group-item" to="/home">Home</NavLink>

          </div>
          <div className="panel-body">
            {/* 注册路由 */}
            <Route path="/about" component={About}/>
            <Route path="/home" component={Home}/>
            {/*
              使用 Switch 组件可以终止路由的向下匹配
              匹配到第一个后，就不再向下匹配
              这样效率比上面不用Switch的写法要高，就像find方法一样，找到第一个就停止并返回
            */}
            <Switch>
              <Route path="/about" component={About}/>
              <Route path="/home" component={Home}/>
            </Switch>
          </div>
        </div>
      )
    }
  }
  ```
- 路由组件与一般组件
  ```jsx
  // 路由组件 props 自动会把当前路由信息传入
  // 当前路由组件 props的值如下, 使用: console.log(this.props.match.path)
  this.props = {
    history: {
      go(){},
      goBack(){},
      goForward(){},
      push(){},
      replace(){},
      listen(){},
      length: 2
    },
    location: {
      pathname: '/about',
      search: '',
      state: ''
    },
    match: {
      params: {},
      path: '/about',
      url: '/about'
    }
  }
  
  // 一般组件 需要父组件传递prop
  // 一般组件中的props 默认有一个属性children 代表的是子节点内容
  // 可写在组件标签中间，也可和其他属性一个写在标签上
  <About data={data}> children子节点 </About>
  <Home data={data} children={'children子节点'}/>
  // 通过 this.props.children 可获取到
  ```
