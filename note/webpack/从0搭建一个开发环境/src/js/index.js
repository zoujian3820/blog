/*
 * @Author: mrzou
 * @Date: 2021-07-31 20:10:08
 * @LastEditors: mrzou
 * @LastEditTime: 2021-08-01 20:16:22
 * @Description: file content
 */
// 引入 iconfont 样式文件
import '../font/iconfont.css'
import '../css/less.less'
import '../css/scss.scss'
import(/* webpackChunkName: "dashboard" */ "../test/index.js").then((a) => {
  console.log(a);
});

const aa = function aa(s, x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(s + x)
    }, 1000)
  })
}

aa(6, 60).then((res) => {
  // 下一行eslint所有规则都失效（下一行不进行eslint检查）
  // eslint-disable-next-line
  console.log(res)
});

(async () => {
  const qqq = await aa(99, 100)
  // eslint-disable-next-line
  console.log(qqq);

  const objzz = {}
  // eslint-disable-next-line
  console.log("可选链操作符测试", objzz?.zzz?.sdfsdf?.ccc)
})()

function myFunction() {
  const node = document.createElement('li')
  const textnode = document.createTextNode('绿水青山')
  node.appendChild(textnode)
  document.getElementById('app').appendChild(node)
}

myFunction()
