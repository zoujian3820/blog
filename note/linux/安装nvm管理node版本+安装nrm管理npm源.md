## 安装nvm管理node版本


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
echo -e "\nexport NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node" >> ~/.bashrc

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

### 安装 nrm 

```
npm config set registry https://registry.npm.taobao.org
npm install -g nrm

// 创建软链接, 全局访问（相当于windows添加到环境变量path中）
// 找到其安装时显示的存放目录，去添加软链接

ln -s /usr/local/nodejs/bin/nrm /usr/local/bin/nrm

nrm ls
nrm use taobao
```
