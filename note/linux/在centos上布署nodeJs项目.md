<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [部署Node.js环境](#%E9%83%A8%E7%BD%B2nodejs%E7%8E%AF%E5%A2%83)
  - [1. 下载安装包：](#1-%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85%E5%8C%85)
  - [2. 解压文件：](#2-%E8%A7%A3%E5%8E%8B%E6%96%87%E4%BB%B6)
  - [3. 创建软链接，您就可以在任意目录下直接使用node和npm命令](#3-%E5%88%9B%E5%BB%BA%E8%BD%AF%E9%93%BE%E6%8E%A5%E6%82%A8%E5%B0%B1%E5%8F%AF%E4%BB%A5%E5%9C%A8%E4%BB%BB%E6%84%8F%E7%9B%AE%E5%BD%95%E4%B8%8B%E7%9B%B4%E6%8E%A5%E4%BD%BF%E7%94%A8node%E5%92%8Cnpm%E5%91%BD%E4%BB%A4)
  - [4. 查看node、npm版本](#4-%E6%9F%A5%E7%9C%8Bnodenpm%E7%89%88%E6%9C%AC)
  - [5. 安装 git](#5-%E5%AE%89%E8%A3%85-git)
  - [6. 安装 nvm 管理node 版本](#6-%E5%AE%89%E8%A3%85-nvm-%E7%AE%A1%E7%90%86node-%E7%89%88%E6%9C%AC)
  - [7. 安装 nrm](#7-%E5%AE%89%E8%A3%85-nrm)
  - [8. 安装pm2](#8-%E5%AE%89%E8%A3%85pm2)
  - [9. 安装vim编辑器](#9-%E5%AE%89%E8%A3%85vim%E7%BC%96%E8%BE%91%E5%99%A8)
  - [10. 安装nginx](#10-%E5%AE%89%E8%A3%85nginx)
  - [11. 通过Filezilla实现本地Windows上传文件到Linux服务器/从Linux服务器下载文件](#11-%E9%80%9A%E8%BF%87filezilla%E5%AE%9E%E7%8E%B0%E6%9C%AC%E5%9C%B0windows%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6%E5%88%B0linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%BB%8Elinux%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8B%E8%BD%BD%E6%96%87%E4%BB%B6)
  - [12. 用nginx跑一个web静态项目](#12-%E7%94%A8nginx%E8%B7%91%E4%B8%80%E4%B8%AAweb%E9%9D%99%E6%80%81%E9%A1%B9%E7%9B%AE)
  - [添加自定义的nginx配置 xxx.conf](#%E6%B7%BB%E5%8A%A0%E8%87%AA%E5%AE%9A%E4%B9%89%E7%9A%84nginx%E9%85%8D%E7%BD%AE-xxxconf)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 部署Node.js环境
参考资料： https://segmentfault.com/a/1190000009393665

### 1. 下载安装包：

```
cd /usr/local
wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-x64.tar.xz
```
- wget: 提示未找到命令

    ```
    // 安装 wget

    yum -y install wget
    ```

### 2. 解压文件：

```
tar xvf node-v10.15.3-linux-x64.tar.xz
```

- 重命名解压的文件夹名称为nodejs

    ```
    mv node-v10.15.3-linux-x64 nodejs
    ```

### 3. 创建软链接，您就可以在任意目录下直接使用node和npm命令

```
回到根目录
cd / 

创建软链接
ln -s /usr/local/nodejs/bin/node /usr/local/bin/node
ln -s /usr/local/nodejs/bin/npm /usr/local/bin/npm
```

### 4. 查看node、npm版本

```
node -v
npm -v
```

### 5. 安装 git

```
yum install git
```

### 6. 安装 nvm 管理node 版本

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

nvm重启终端node版本被重置解决办法

```
nvm alias default v10.20.0
```

### 7. 安装 nrm 

```
npm install -g nrm

// 创建软链接, 全局访问（相当于windows添加到环境变量path中）
// 找到其安装时显示的存放目录，去添加软链接

ln -s /usr/local/nodejs/bin/nrm /usr/local/bin/nrm

nrm ls
nrm use taobao
```

### 8. 安装pm2

[pm2安装与使用文档](pm2安装与使用文档.md)

```
npm install -g pm2
```

### 9. 安装vim编辑器

```
yum install vim

cd /
cd usr/src
mkdir www/demo
echo demo.js

// 使用vim, 编辑一个文件
vim demo.js

// 输入 i 进入编辑模式
```

复制粘贴，输入以下代码

```
const http = require('http');
const hostname = '0.0.0.0';
const port = 3000;
const server = http.createServer((req, res) => { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
}); 

server.listen(port, hostname, () => { 
    console.log(`Server running at http://${hostname}:${port}/`);
});

// 输入 :wq 保存退出
```

跑起项目来，并监听3000端口

```
node demo.js
```

需在防火墙，转发放行demo.js监听的3000端口

```
firewall-cmd --zone=public --add-port=3000/tcp --permanent
```

成功后更新防火墙规则

```
firewall-cmd --reload
```

现在可以在浏览器中输入你的主机ip + 3000端口去查看项目

```
// 页面中将展示 res.end('Hello World\n') 的结果

Hello World
```

### 10. [安装nginx](安装nginx.md)

### 11. 通过Filezilla实现本地Windows上传文件到Linux服务器/从Linux服务器下载文件
下载地址： https://www.filezilla.cn/download/client

### 12. 用nginx跑一个web静态项目

先在centos根目录新建一个 **www** 文件夹存放项目

用Filezilla上传本地build编绎完的项目代码（vue项目在dist文件夹中）到www中

```
www
├─dist
│  ├─_nuxt
│  ├─lib
│  ├─demo
│  ├─patient-order-detail
│  ├─40x.html
│  ├─50x.html
│  └─README.md
```

### 添加自定义的nginx配置 xxx.conf
[添加自定义的nginx配置](安装nginx.md)

完了后，在浏览器中输入你的地址查看你的网页 http://192.168.2.195/demo/

