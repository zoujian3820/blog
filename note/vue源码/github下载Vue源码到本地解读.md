## 搭建调试环境
- 获取地址：https://github.com/vuejs/vue
- 安装依赖：npm i
    - 报错：phantomjs-prebuilt@2.1.16 install: `node install.js`
        - 解决办法
            ```bash
            npm install phantomjs-prebuilt@2.1.16 --ignore-scripts
            ```
    - phantomjs（端到端测试）也可不装，安装到这里时，可以直接(ctrl+c)终止        
- 安装rollup: npm i -g rollup
- 修改dev脚本：添加 --sourcemap
    - 为了后面方便代码与文件之间的连系，开启vue打包时的sourcemap
    - 在package.json第17行rollup -w -c scripts/config.js后面添加 --sourcemap
- 执行dev的脚本: npm run dev    

## 调试技巧
- 浏览器打开指定文件 ctrl + p    
- 断点
- 单步执行 F10 进入函数 F11
- 查看调用栈 Call Stack
- 定位源文件所在位置
    - 在当前断点执行所在的代码文件中 - 鼠标右键 - 点击 Reveal in sidebar
    - 点击可在左侧文件目录中定位到源码文件所在目录及位置