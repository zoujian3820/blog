<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [vue-cli](#vue-cli)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-04-10 22:22:12
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-10 22:50:58
 * @Description: file content
-->

## vue-cli
- vue-cli中 vue inspect 命令
    - 直接vue inspect 可查看webapck最终合成的所有配置
    - 如要只查看所有规则rules的loader配置
      - vue inspect --rules
      - 如果只想看 rules（规则）中对svg的loader配置
      - 除了显示配置详情，还有使用链式调用的查找语句提示，用注释/**/标注的那个就是
      - 通过以上方法  --  这样我们就能参考其配置方法进行扩展
- vue.config.js
  - 可以自定义扩展webapck配置，最终会合并merge到当前webapck配置中
  - configureWebpack
  - chainWebpack
    ```javascript
    const port = 7070
    const path = require('path')
    const resolve = dir => path.join(__dirname, dir)
    module.exports = {
      publicPath: '/best-practice',
      devServer: {
        port
      },
      // 基础webpack配置
      // configureWebpack: {
      //   name: 'vue项目最佳实践', 
      //   resolve: {
      //     alias: {
      //       comps: path.join(__dirname, 'src/components')
      //     }
      //   }
      // }

      // 用函数方式，配置webapck配置
      configureWebpack(config) {
        // config中包含了当前所有的webapck配置
        config.resolve.alias.comps = path.join(__dirname, 'src/components')
        if (process.env.NODE_ENV === 'development') {
          config.name = 'vue最佳实践'
          } else {
          config.name = 'vue best practice'
        }
      },
      // chainWebpack 和 configureWebpack 对比
      // 支持链式调用
      chainWebpack(config) {
        // 默认还有一个负责svg的loader要排除icons目录
        config.module.rule('svg')
          .exclude.add(resolve('src/icons'))
        // 自己的图表只负责加载icons中的svg
        config.module.rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/icons')).end() // 使用了include链式调用丢失，使用end回退到链式
          .use('svg-sprite-loader') // 设置use选项
          .loader('svg-sprite-loader')
          .options({symbolId: 'icon-[name]'})
      }
    }
    ```
  - 环境变量配置
    - package.json中scripts默认有两个环境 serve 、build
      ```json
      "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
      }
      ```
    - 配置以上默认两种环境变量文件
      - serve 默认对应 .env.development 文件
      - build 默认对应 .env.production 文件
    - 配置自定义环境变量文件
      - 先在 scripts 中配置自定义的执行命令
      - 以 --mode xxx(生产模式) 配置当前环境生产模式
        ```json
        "scripts": {
          "dev": "vue-cli-service serve --mode dev"
        }
        ```
        - 如上配置了 dev 生产模式
        - 则 dev 对应的就是  .env.dev 文件
    - 环境变量文件规则
      - 如果配置需要在客户端使用，则要VUE_APP为前缀
        ```bash
        # .env.development文件内容

        # node 运行时 node 环境可获取
        foo=bar
        
        # 如果配置需要在客户端使用，则要VUE_APP为前缀
        # 项目运行时  客户端可获取
        VUE_APP_DUANG=duang

        # 使用方法
        process.env.foo
        process.env.VUE_APP_DUANG
        ```    

- require.context
  ```javascript
  // 自动导入
  // context()会返回一个函数，该函数去指定的上下文目录中加载资源
  const req = require.context('./svg', false, /\.svg$/)
  console.log(req.keys());
  // 遍历所有svg目录下的svg文件，并使用req去加载引入
  // req.keys().map(req)

  req.keys().map((path)=>{
    req(path)
  })
  ```
