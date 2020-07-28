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
