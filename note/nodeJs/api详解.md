<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [NodeJs 常用api用法详解](#nodejs-%E5%B8%B8%E7%94%A8api%E7%94%A8%E6%B3%95%E8%AF%A6%E8%A7%A3)
  - [promisify 工具函数把node的api调用，包装加工成promise风格返回](#promisify-%E5%B7%A5%E5%85%B7%E5%87%BD%E6%95%B0%E6%8A%8Anode%E7%9A%84api%E8%B0%83%E7%94%A8%E5%8C%85%E8%A3%85%E5%8A%A0%E5%B7%A5%E6%88%90promise%E9%A3%8E%E6%A0%BC%E8%BF%94%E5%9B%9E)
  - [异步fs.readFile 、同步fs.readFileSync 以buffer形式读取文件](#%E5%BC%82%E6%AD%A5fsreadfile-%E5%90%8C%E6%AD%A5fsreadfilesync-%E4%BB%A5buffer%E5%BD%A2%E5%BC%8F%E8%AF%BB%E5%8F%96%E6%96%87%E4%BB%B6)
  - [读取fs.createReadStream  写入fs.createWriteStream 以数据流的方式读取写入文件](#%E8%AF%BB%E5%8F%96fscreatereadstream--%E5%86%99%E5%85%A5fscreatewritestream-%E4%BB%A5%E6%95%B0%E6%8D%AE%E6%B5%81%E7%9A%84%E6%96%B9%E5%BC%8F%E8%AF%BB%E5%8F%96%E5%86%99%E5%85%A5%E6%96%87%E4%BB%B6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-07-18 21:36:38
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-18 23:21:24
 * @Description: file content
-->
## NodeJs 常用api用法详解

### promisify 工具函数把node的api调用，包装加工成promise风格返回
```js
(async () => {
  const { promisify } = require('util')
  const fs = require('fs')
  const readFile = promisify(fs.readFile)

  try {
    const data = await readFile('./conf.js')
    console.log('data', data.toString())
  } catch (err) {
    console.log(err)
  }
})()
```
promisify源码解析
```js
module.export = function promisify(fn) {
  return function(...args) {
    return new Promise(function(resolve, reject) {
      args.push(function (err, ....arg) {
        if(err) {
          reject(err)
        } else {
          relolve(...arg)
        }
      })
      
      fn.apply(null, args)
    })
  }
}
```
### 异步fs.readFile 、同步fs.readFileSync 以buffer形式读取文件
此方法会占用大量内存，如果读取的文件和并发较多，应该采用 createReadStream 用流的方式读取
```js
const fs = require('fs');
// 异步
fs.readFile('content.txt', 'utf-8', function(err, data){
  if(err) {
    console.log(err);
  } else {
    // 用toString方法把 二进制数据 转为字符串
    console.log(data.toString());
  }
})

// 同步
const data = fs.readFileSync('content.txt', 'utf-8');
console.log(data.toString());
```
### 读取fs.createReadStream  写入fs.createWriteStream 以数据流的方式读取写入文件
- 流的方式读取文件 不用像 readFile 需要把整个文件读完了后（等于把文件都读取到了内存中，非常占用内存），才做下一步操作
- 而createReadStream它可以像小水管流水一样慢慢流过去，一次读一点 往复不间断读取， 通过 pipe 导管方法 引入到接收的地方
- 这样服务器只需 花一小部分流转时的内存 就可以完成超大文件的读取传输
```js
// 以下代码通过流的方式 复制一张大图
const fs = require('fs')
const rs = fs.createReadStream('./1.png')
const ws = fs.createWriteStream('./2.png')
rs.pipe(ws)

// 建一个web服务时 读取图片
const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
  // response.end('hello ...')
  const { url, method ,headers} = request
  if (url === '/' && method === 'GET') {
    // 静态页面服务
    fs.readFile('index.html',(err,data) => {
      response.statusCode = 200
      response.setHeader('Content-Type','text/html')
      response.end(data)
    })
  } else if(url === '/users' && method === 'GET') {
    // Ajax服务
    response.writeHead(200,{
      'Content-Type': 'application/json'
    })
    response.end(JSON.stringify({
      name : 'laowang'
    }))
  } else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1){
    // 图片文件服务
    fs.createReadStream('./'+url).pipe(response)
  }
})
server.listen(3000)
```
