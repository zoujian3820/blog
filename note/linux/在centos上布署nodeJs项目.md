## 部署Node.js环境

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

### 3. 创建软链接，您就可以在任意目录下直接使用node和npm命令

```
回到根目录
cd / 

创建软链接
ln -s /usr/local/node-v10.15.3-linux-x64/bin/node /usr/local/bin/node
ln -s /usr/local/node-v10.15.3-linux-x64/bin/npm /usr/local/bin/npm
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
nvm list-remote
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

### 7. 安装vim编辑器

```
yum install vim

// 使用vim, 编辑一个文件
vim example.js
```
