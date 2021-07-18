<!--
 * @Author: mrzou
 * @Date: 2021-07-18 23:37:39
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-18 23:48:57
 * @Description: file content
-->
## 步骤
```bash
npm init -y
npm i commander download-git-repo ora handlebars figlet clear chalk open -s

# npm link用来在本地项目和本地npm模块之间建立连接，可以在本地进行模块测试
# 具体用法：
  # 1. 项目和模块在同一个目录下，可以使用相对路径
    # npm link ../module
  # 2. 项目和模块不在同一个目录下
    # cd到模块目录，npm link，进行全局link
    # cd到项目目录，npm link 模块名(package.json中的name)
  # 3. 解除link
    # 解除项目和模块link，项目目录下，npm unlink 模块名
    # 解除模块全局link，模块目录下，npm unlink 模块名
npm link
```

