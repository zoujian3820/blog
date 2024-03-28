<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [安装nvm管理node版本](#%E5%AE%89%E8%A3%85nvm%E7%AE%A1%E7%90%86node%E7%89%88%E6%9C%AC)
  - [window装nvm](#window%E8%A3%85nvm)
  - [linux安装nvm](#linux%E5%AE%89%E8%A3%85nvm)
- [npm查找配置文件地址](#npm%E6%9F%A5%E6%89%BE%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%9C%B0%E5%9D%80)
- [安装 nrm](#%E5%AE%89%E8%A3%85-nrm)
  - [window安装nrm](#window%E5%AE%89%E8%A3%85nrm)
  - [linux安装nrm](#linux%E5%AE%89%E8%A3%85nrm)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 安装nvm管理node版本

### window装nvm
  - 找到安装目录下的settings.txt文件
    ```
    nvm root
    ```
  - 打开文件在后面添加如下配置，使用淘宝镜像
    ```
    node_mirror: https://npmmirror.com/mirrors/node/
    npm_mirror: https://npmmirror.com/mirrors/npm/
    ```
  - 列出Node.js的所有版本
    ```
    nvm list available
    ```


### linux安装nvm

使用git将源码克隆到本地的~/.nvm目录下，并检查最新版本
```
git clone https://github.com/cnpm/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
```

激活NVM
```
echo ". ~/.nvm/nvm.sh" >> /etc/profile

source /etc/profile
```

列出Node.js的所有版本
```
nvm list-remote node
```

nvm使用taobao镜像
```
echo -e "\nexport NVM_NODEJS_ORG_MIRROR=http://npmmirror.com/mirrors/node" >> ~/.bashrc

source ~/.bashrc
```

配置环境变量

```
# 编辑 .bashrc 文件
vi ~/.bashrc

# 复制以下配置  到  .bashrc  配置文件中
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# 更新配置使其生效
source ~/.bashrc

# 注意点************************************
每个用户都有其.bashrc文件（~/.bashrc）
所以切换用户后，由于没配 .bashrc 所以 nvm 会找不到命令
这种情况直接重复上面步骤，为这个用户 配置环境变量   
或者使用命令切换回你配置过的用户  

su 用户名   如   su root

```


安装多个Node.js版本
```
nvm install v8.9.0
nvm install v10.20.0
nvm install v12.18.0
nvm install v14.0.0
```

查看本地安装的版本和当前使用的版本
```
nvm ls
```

使用某个版本
```
nvm use v10.20.0
```

终端重启后nvm使用的node版本被重置解决办法

```
nvm alias default v10.20.0
```

## npm查找配置文件地址
  ```
  npm config get userconfig
  // npm 查找最新包版本
  npm search vue
  ```

## 安装 nrm 

### window安装nrm

- window近期新版本 nrm安装完成运行会报错， 如下
  ```
  internal/validators.js:124
    throw new ERR_INVALID_ARG_TYPE(name, 'string', value);
    ^

  [TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined
    at validateString (internal/validators.js:124:11)
    at Object.join (path.js:375:7)
    at Object.<anonymous> (D:\nvm\v14.15.4\node_modules\nrm\cli.js:17:20)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
  ] {
    code: 'ERR_INVALID_ARG_TYPE'
  }
  ```
- 解决办法
  - 找到nvm文件夹安装位置，打开cli.js 第17行修改成
    ```
    // 找到此行代码 并注释掉 换成下面代码 const NRMRC = path.join(process.env.HOME, '.nrmrc');
    const NRMRC = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.nrmrc');
    ```
  - 关闭窗口  再次打开cmd并运行nrm --- 成功  

### linux安装nrm

```
npm config set registry https://registry.npmmirror.com
npm install -g nrm

// 创建软链接, 全局访问（相当于windows添加到环境变量path中）
// 找到其安装时显示的存放目录，去添加软链接

ln -s /usr/local/nodejs/bin/nrm /usr/local/bin/nrm

nrm ls
nrm use taobao
```
