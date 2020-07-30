<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [linux命令](#linux%E5%91%BD%E4%BB%A4)
  - [**sudo** 以管理员身份(root)来执行 命令](#sudo-%E4%BB%A5%E7%AE%A1%E7%90%86%E5%91%98%E8%BA%AB%E4%BB%BDroot%E6%9D%A5%E6%89%A7%E8%A1%8C-%E5%91%BD%E4%BB%A4)
  - [**df** 检查文件系统的磁盘占用情况](#df-%E6%A3%80%E6%9F%A5%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%9A%84%E7%A3%81%E7%9B%98%E5%8D%A0%E7%94%A8%E6%83%85%E5%86%B5)
  - [处理目录的常用命令](#%E5%A4%84%E7%90%86%E7%9B%AE%E5%BD%95%E7%9A%84%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4)
  - [**cd /** 进根目录](#cd--%E8%BF%9B%E6%A0%B9%E7%9B%AE%E5%BD%95)
  - [**rm**   删除文件](#rm---%E5%88%A0%E9%99%A4%E6%96%87%E4%BB%B6)
  - [**rm -rf**  删除目录](#rm--rf--%E5%88%A0%E9%99%A4%E7%9B%AE%E5%BD%95)
  - [**mv node-v10.15.3-linux-x64 nodejs**   重命名](#mv-node-v10153-linux-x64-nodejs---%E9%87%8D%E5%91%BD%E5%90%8D)
  - [**ls** 查看当前目录结构](#ls-%E6%9F%A5%E7%9C%8B%E5%BD%93%E5%89%8D%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)
  - [文件内容查看的命令](#%E6%96%87%E4%BB%B6%E5%86%85%E5%AE%B9%E6%9F%A5%E7%9C%8B%E7%9A%84%E5%91%BD%E4%BB%A4)
  - [yum常用命令](#yum%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4)
  - [nginx 服务器命令](#nginx-%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%91%BD%E4%BB%A4)
  - [**top** 查看 cpu/内存/进程 使用情况](#top-%E6%9F%A5%E7%9C%8B-cpu%E5%86%85%E5%AD%98%E8%BF%9B%E7%A8%8B-%E4%BD%BF%E7%94%A8%E6%83%85%E5%86%B5)
  - [**nmcli d** 查看安装在本机的网卡](#nmcli-d-%E6%9F%A5%E7%9C%8B%E5%AE%89%E8%A3%85%E5%9C%A8%E6%9C%AC%E6%9C%BA%E7%9A%84%E7%BD%91%E5%8D%A1)
  - [**nmtui** 打开网络管理员](#nmtui-%E6%89%93%E5%BC%80%E7%BD%91%E7%BB%9C%E7%AE%A1%E7%90%86%E5%91%98)
  - [**systemctl restart network** 重启网络服务](#systemctl-restart-network-%E9%87%8D%E5%90%AF%E7%BD%91%E7%BB%9C%E6%9C%8D%E5%8A%A1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## linux命令

### **sudo** 以管理员身份(root)来执行 命令

### **df** 检查文件系统的磁盘占用情况

```
df      用KB来做单位显示使用情况
df -TH  用M来做单位显示使用情况
```

### 处理目录的常用命令
|处理目录的常用命令 |注释|
|:----|:-------|
|ls|        列出目录|
|cd|        切换目录| 
|pwd|       显示目前的目录| 
|mkdir|     创建一个新的目录| 
|rmdir|     删除一个空的目录| 
|cp|        复制文件或目录| 
|rm|        移除文件或目录| 
|注意点|     可以使用 man [命令] 来查看各个命令的使用文档,如 :man cp|

### **cd /** 进根目录

### **rm**   删除文件

### **rm -rf**  删除目录

### **mv node-v10.15.3-linux-x64 nodejs**   重命名

### **ls** 查看当前目录结构
```
ls -a   列出所有文件和目录,包含隐藏文件
ls -la  详细列出所有目录结构,包含隐藏文件
```

### 文件内容查看的命令
|文件内容查看的命令 |注释|
|:----|:-------|
|cat|    由第一行开始显示文件内容| 
|tac|    从最后一行开始显示,可以看出tac 是 cat 的倒著写!| 
|nl|     显示的时候,顺道输出行号!| 
|more|   一页一页的显示文件内容| 
|less|   与 more 类似,但是比 more 更好的是,他可以往前翻页!| 
|head|   只看头几行| 
|tail|   只看尾巴几行|


### yum常用命令 
- 列出所有可更新的软件清单命令    yum check-update 
- 更新所有软件命令               yum update 
- 仅安装指定的软件命令            yum install <package name> 
- 仅更新指定的软件命令            yum update <package name> 
- 列出所有可安裝的软件清单命令     yum list 
- 删除软件包命令                 yum remove <package name> 
- 查找软件包 命令                yum search <keyword> 
- 清除缓存命令: 
    - yum clean packages       清除缓存目录下的软件包 
    - yum clean headers        清除缓存目录下的 headers 
    - yum clean oldheaders     清除缓存目录下旧的 headers 
    - yum clean, yum clean all (= yum clean packages; yum clean oldheaders)  清除缓存目录下的软件包及旧的headers


### nginx 服务器命令 
|nginx服务器命令 |注释|
|:----|:-------|
|启动nginx|               service nginx start| 
|访问(nginx默认是80端口)|  curl 127.0.0.1| 
|nginx配置文件目录|        nginx -t| 
|重启nginx|               service nginx restart| 
|停用nginx|               service nginx stop|

### **top** 查看 cpu/内存/进程 使用情况
- 按 m 键 看使用百分比
- Ctrl + c 退出 top 命令

### **nmcli d** 查看安装在本机的网卡

### **nmtui** 打开网络管理员

### **systemctl restart network** 重启网络服务
