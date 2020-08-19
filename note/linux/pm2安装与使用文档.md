<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [pm2安装与使用](#pm2%E5%AE%89%E8%A3%85%E4%B8%8E%E4%BD%BF%E7%94%A8)
- [deepin安装新版的webstorm    商店中的版本很老还是2017版](#deepin%E5%AE%89%E8%A3%85%E6%96%B0%E7%89%88%E7%9A%84webstorm----%E5%95%86%E5%BA%97%E4%B8%AD%E7%9A%84%E7%89%88%E6%9C%AC%E5%BE%88%E8%80%81%E8%BF%98%E6%98%AF2017%E7%89%88)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## pm2安装与使用

安装
```
npm install -g pm2
```

使用
```
$ pm2 start app.js -i 4 #后台运行pm2，启动4个app.js 
                                # 也可以把'max' 参数传递给 start
                                # 正确的进程数目依赖于Cpu的核心数目
$ pm2 start app.js --name my-api # 命名进程
$ pm2 list               # 显示所有进程状态
$ pm2 monit              # 监视所有进程
$ pm2 logs               #  显示所有进程日志
$ pm2 stop all           # 停止所有进程
$ pm2 restart all        # 重启所有进程
$ pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0             # 停止指定的进程
$ pm2 restart 0          # 重启指定的进程
$ pm2 startup            # 产生 init 脚本 保持进程活着
$ pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
$ pm2 delete 0           # 杀死指定的进程
$ pm2 delete all         # 杀死全部进程

运行进程的不同方式：

$ pm2 start app.js -i max  # 根据有效CPU数目启动最大进程数目
$ pm2 start app.js -i 3      # 启动3个进程
$ pm2 start app.js -x        #用fork模式启动 app.js 而不是使用 cluster
$ pm2 start app.js -x -- -a 23   # 用fork模式启动 app.js 并且传递参数 (-a 23)
$ pm2 start app.js --name serverone  # 启动一个进程并把它命名为 serverone
$ pm2 stop serverone       # 停止 serverone 进程
$ pm2 start app.json        # 启动进程, 在 app.json里设置选项
$ pm2 start app.js -i max -- -a 23                   #在--之后给 app.js 传递参数
$ pm2 start app.js -i max -e err.log -o out.log  # 启动 并 生成一个配置文件
你也可以执行用其他语言编写的app  ( fork 模式):
$ pm2 start my-bash-script.sh    -x --interpreter bash
$ pm2 start my-python-script.py -x --interpreter python
```



## deepin安装新版的webstorm    商店中的版本很老还是2017版

- linux版下载地址 webstorm 2019.1

  链接：https://pan.baidu.com/s/1YUpFYruc1JgkRHVSjWDN_w 
  提取码：3820

- 安装方法参考 https://www.jianshu.com/p/898f3de8266b

1. 下载完成后，得到包  linux.webstorm.2019.1.gz

   ```
   # 解压包
   gzip -d linux.webstorm.2019.1.gz
   
   # 解压后得到文件夹 linux.webstorm.2019.1
   ```

2. 复制文件到你想放置的目录，这里放在/usr/share/webstorm下

   ```
   # 使用sudo提升权限为root用户
   # 复制 linux.webstorm.2019.1 下所有文件  ->  到/usr/share/webstorm下
   # webstorm文件夹会自动创建
   
   sudo cp -r linux.webstorm.2019.1/ /usr/share/webstorm
   ```

3. #### 将`webstorm`图标锁定在启动器，相当于加入到windows的开始菜单栏中

   - 用可执行文件   打开软件， 此种方式只做演示原理，应该没人喜欢这种方式

   ```
   cd /usr/share/webstorm
   ls -la
   cd bin
   
   # 在bin中有一个webstorm.sh  双击选择  运行/终端运行 就可打开webstorm 编辑器
   
   # 查看当前路径  /usr/share/webstorm/bin
   pwd
   ```

   - 加入启动器

   ```
   # 创建一个文件 webstorm.desktop
   
   sudo vim /usr/share/applications/webstorm.desktop
   
   # 编辑 webstorm.desktop -> 输入  i 转编辑模式  ->  然后 录入 以下内容
   
   [Desktop Entry]
   Name = WebStorm
   Comment= WebStorm
   Exec=上面复制文件时放入的路径/webstorm.sh  # /usr/share/webstorm/bin/webstorm.sh
   Icon=上面复制文件时放入的路径/webstorm.png  # /usr/share/webstorm/bin/webstorm.png
   Terminal=false
   Type=Application
   ```

   - 保存退出

     ```
     :wq
     
     # 保存退出后  在启动器底部就能看到webstorm了
     ```

     