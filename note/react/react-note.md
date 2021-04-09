<!--
 * @Author: mrzou
 * @Date: 2021-04-07 17:30:01
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-10 00:40:12
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
    showData2 = ()=>{
      const {input1} = this
      // ref获取到的dom input1
      // 这里用的是调用函数的方式，更新时不会触发两次
      alert(input1.value)
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
