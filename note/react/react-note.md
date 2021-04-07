<!--
 * @Author: mrzou
 * @Date: 2021-04-07 17:30:01
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-07 18:04:59
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
