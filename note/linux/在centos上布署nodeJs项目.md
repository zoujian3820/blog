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
