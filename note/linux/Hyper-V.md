<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [安装 Hyper-V](#%E5%AE%89%E8%A3%85-hyper-v)
  - [1. 右击新建一个txt文本文档，然后复制粘贴以下内容](#1-%E5%8F%B3%E5%87%BB%E6%96%B0%E5%BB%BA%E4%B8%80%E4%B8%AAtxt%E6%96%87%E6%9C%AC%E6%96%87%E6%A1%A3%E7%84%B6%E5%90%8E%E5%A4%8D%E5%88%B6%E7%B2%98%E8%B4%B4%E4%BB%A5%E4%B8%8B%E5%86%85%E5%AE%B9)
  - [2. 填写入以上内容后，点击左上角 文件 -> 另存为，并命名为 **Hyper-V.cmd** 编码选择uft-8](#2-%E5%A1%AB%E5%86%99%E5%85%A5%E4%BB%A5%E4%B8%8A%E5%86%85%E5%AE%B9%E5%90%8E%E7%82%B9%E5%87%BB%E5%B7%A6%E4%B8%8A%E8%A7%92-%E6%96%87%E4%BB%B6---%E5%8F%A6%E5%AD%98%E4%B8%BA%E5%B9%B6%E5%91%BD%E5%90%8D%E4%B8%BA-hyper-vcmd-%E7%BC%96%E7%A0%81%E9%80%89%E6%8B%A9uft-8)
  - [3. 左下角搜索并打开控制面版 -> 程序 -> 程序和功能 -> 启用或关闭windows功能 -> Hyper-V 勾选上](#3-%E5%B7%A6%E4%B8%8B%E8%A7%92%E6%90%9C%E7%B4%A2%E5%B9%B6%E6%89%93%E5%BC%80%E6%8E%A7%E5%88%B6%E9%9D%A2%E7%89%88---%E7%A8%8B%E5%BA%8F---%E7%A8%8B%E5%BA%8F%E5%92%8C%E5%8A%9F%E8%83%BD---%E5%90%AF%E7%94%A8%E6%88%96%E5%85%B3%E9%97%ADwindows%E5%8A%9F%E8%83%BD---hyper-v-%E5%8B%BE%E9%80%89%E4%B8%8A)
  - [4. 在windows管理工具或直接搜索 Hyper-V 再点击打开](#4-%E5%9C%A8windows%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7%E6%88%96%E7%9B%B4%E6%8E%A5%E6%90%9C%E7%B4%A2-hyper-v-%E5%86%8D%E7%82%B9%E5%87%BB%E6%89%93%E5%BC%80)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 安装 Hyper-V

### 1. 右击新建一个txt文本文档，然后复制粘贴以下内容

    ```
    pushd "%~dp0"

    dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt

    for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"

    del hyper-v.txt

    Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
    ```
### 2. 填写入以上内容后，点击左上角 文件 -> 另存为，并命名为 **Hyper-V.cmd** 编码选择uft-8
    > 保存存后，右击 -> 以管理员身份运行 -> 跑命令过程中提示 输入 y 重启电脑

### 3. 左下角搜索并打开控制面版 -> 程序 -> 程序和功能 -> 启用或关闭windows功能 -> Hyper-V 勾选上

### 4. 在windows管理工具或直接搜索 Hyper-V 再点击打开

#### 1.点击打开右侧 **虚拟交换机管理器**

#### 2.点击 **新建虚拟网络交换机**，选 **外部** -> 点击 **创建虚拟交换机**

#### 3.填名称 -> 说明 -> 勾选 **外部网络** -> 选择网卡 -> 勾选 **允许管理操作系统共享此网络适配器(M)** -> 点击 **应用** -> 点击 **确定**

#### 4.更改新建的 Hyper-V 适配器 IP

```
从
    控制面板\网络和 Internet\网络和共享中心\更改适配器设置
打开，或从
    控制面板\网络和 Internet\网络连接 
找到新建的 Hyper-V 适配器
右击 -> 属性 -> 网络 -> 勾选 Internet 协议版本 4 (TCP/IPv4) 并双击打开，可配置ip
```

#### 5.新建虚拟机

```
打开 Hyper-V 管理器
点击右侧 新建 -> 虚拟机
按提示 设置下一步 (选第一代) 到 配置网络 这一步时，选择刚新建的 Hyper-V适配器
配完了后，可以再去调整配置，及安装 镜像
```

#### 6.虚拟机安装centos后的注意事项

> 刚安装虚拟机会无法连接网络, 并报以下错误

[解决办法，参考资料](https://www.cnblogs.com/mrgavin/p/11237149.html)

```
Could not resolve host: mirrorlist.centos.org; Unknown error
```

- 步骤1：在终端输入以下命令，查看安装在本机的网卡：

    ```
    nmcli d
    
    // ens160   处于disconnected状态；
    ```

- 步骤2：在终端中输入以下命令，打开网络管理员：

    ```
    nmtui
  
    //  选择“Edit a connection”后按回车键（使用TAB键进行选择的选项）
    ```

- 步骤3：现在可以看到所有的网络接口，选择一个（我的是ens160），然后键盘上下左右键选择到“Edit”并Enter确认进入:

- 步骤4：进行动态配置：

　　（1）在IPv4 CONFIGURATION配置选择<Automatic>；

　　（2）按空格键选择“Automatically connetc”复选框；

　　（3）点击OK键，退出网络管理器；

　　（4）依次Back Exit，返回终端界面；

　　（5）输入命令重新启动网络服务：systemctl restart network


#### 7.使用ssh登录Hyper-V centos

- 开启SSH

    > 开启ssh需要root权限如果当前不是root的话

    > sudo -i 切换到root用户
    
    ```
    // 检查有没有安装ssh服务
    rpm -qa | grep openssh-server
    ```

    ```
      // 这里是安装过  
      [root@localhost /]# rpm -qa | grep openssh-server
      openssh-server-7.4p1-21.el7.x86_64
      [root@VM-16-15-centos ~]# 
    ```
  
    **没安装过的, 安装一下**
    
    ```
    yum install openssh-server
    ```

   **然后修改下配置文件**
   
   ```
   vi /etc/ssh/sshd_config
   ```
  
   ```
   Port 22              把端口号注释 # 去掉
   PermitRootLogin Yes  把注释 # 去掉  需要用root用户连接就选yes，否则输入no
  
   然后输入 :wq  保存退出
   ``` 
 
   **修改完成之后输入下面的命令开开启服务** 
   
   ```
   systemctl start sshd.service
   ```
  
   **没有回显则正常。然后检查下服务有没有开启**
   
   ```
   ps -e | grep sshd
   ```
  
   ```
    [root@localhost /]# ps -e | grep sshd
     1017 ?        00:00:00 sshd             // 开启了sshd
   ```

   **然后将ssh服务添加的自启动列表中** 
   
   ```
   systemctl enable sshd.service
   ```
  
   **查看本机的Ip地址**
   
   ```
   ifconfig -a
   ```
   
   [如果没安装该命令ifconfig的包，则报ifconfig command not found，点击查看安装方法](安装查看ip命令ifconfig的包net-tools.md)

   ```
   // 查看到ip   inet 192.168.2.195
         
   [root@localhost sbin]# ifconfig
   eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
           inet 192.168.2.195  netmask 255.255.255.0  broadcast 192.168.2.255
           inet6 fe80::a01a:d13a:a19:359a  prefixlen 64  scopeid 0x20<link>
           ether 00:15:5d:02:73:00  txqueuelen 1000  (Ethernet)
           RX packets 106701  bytes 18489623 (17.6 MiB)
           RX errors 0  dropped 0  overruns 0  frame 0
           TX packets 564  bytes 54466 (53.1 KiB)
           TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
           
   lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
           inet 127.0.0.1  netmask 255.0.0.0
           inet6 ::1  prefixlen 128  scopeid 0x10<host>
           loop  txqueuelen 1000  (Local Loopback)
           RX packets 0  bytes 0 (0.0 B)
           RX errors 0  dropped 0  overruns 0  frame 0
           TX packets 0  bytes 0 (0.0 B)
           TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
   ```

- 在window 中打开 cmd 窗口， 使用ssh登录

    ```
    ssh root@192.168.2.195
    ```
    
    ```
    C:\Users\admin>ssh root@192.168.2.195
    root@192.168.2.195's password:
    Last login: Mon Jul 27 16:42:24 2020 from 192.168.2.115
    [root@localhost ~]#
    ```
