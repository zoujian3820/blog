## pyenv 管理本地多个版本的python包 （类似于node的nvm）

### 其他系统版本 (Linux/MacOs)
  https://github.com/pyenv/pyenv  

### window版本
  https://github.com/pyenv-win/pyenv-win

- 点击[安装](https://github.com/pyenv-win/pyenv-win#installation)跳转到安装文档
- Download link: **pyenv-win** 在此找到下载链接
- 下载完解压文件，并把触压出来的文件放到一个合适地方
  - D:\exe\pyenv-win-master
- 配置环境变量
  - 配置pyenv环境变量
    - 找到pyenv的bin目录 D:\exe\pyenv-win-master\pyenv-win\bin 并配入环境变量中
    - 配置完 cmd 输入 pyenv 发现已生效
  - 配置python环境变量
    - 地址为 D:\exe\pyenv-win-master\pyenv-win\shims
- 使用命令
  - 列出所有可下载的python版本 pyenv install -l
  - 安装一个python v3.7.1 的包  pyenv install 3.7.1
  - 查看当前本地安装了哪些版本 pyenv versions  
  - 当前使用版本 pyenv versions
  - 设置全局使用的python版本 pyenv global 3.7.1
  - 设置当前文件夹中的python版本  pyenv local 3.7.1
 