## frp内网穿透
https://gofrp.org/zh-cn/docs/
### 1. 下载
从中选取适合自己的一个版本，arch命令查看系统架构
https://github.com/fatedier/frp/releases
```
# 华为云服务器CentOs7.6 它的架构是x86_64 所以frps选 amd64版本
[xxx@xxx system]# arch
x86_64

# 玩客云当客户端CasaOs 它的架构是arm 32位的 所以选 arm版本
root@onecloud:~# arch
armv7l

```

x86_64: https://github.com/fatedier/frp/releases/download/v0.58.0/frp_0.58.0_linux_amd64.tar.gz

arm64: https://github.com/fatedier/frp/releases/download/v0.58.0/frp_0.58.0_linux_arm64.tar.gz

arm: https://github.com/fatedier/frp/releases/download/v0.58.0/frp_0.58.0_linux_arm.tar.gz


若以上链接失效，可用备份在本项目中的地址

[frp_0.58.0_linux_amd64.tar.gz](./source/frp_0.58.0_linux_amd64.tar.gz)

[frp_0.58.0_linux_arm64.tar.gz](./source/frp_0.58.0_linux_arm64.tar.gz)

[frp_0.58.0_linux_arm.tar.gz](./source/frp_0.58.0_linux_arm.tar.gz)

### 安装服务端frps
```shell
cd /opt
wget https://github.com/fatedier/frp/releases/download/v0.58.0/frp_0.58.0_linux_amd64.tar.gz
```

#### 解压服务端包

```shell
cd /opt
tar -xvf frp_0.58.0_linux_amd64.tar.gz -C ./

# 解压后得到如下文件
frpc  # 客户端用的执行程序
frpc.toml  # 客户端的配置文件

frps  # 服务端用的执行程序
frps.toml  # 服务端的配置文件
```
由于服务端和客户端，可能不是同一架构

不是同一系统，如还可能是window系统，这里都是linux系统

所以，服务端和客户端，可能要用两种包，本例客户端用的arm版服务端用的amd64版

服务端用frp_0.58.0_linux_amd64.tar.gz包中的 frps 和 frps.toml

客户端用frp_0.58.0_linux_arm.tar.gz包中的 frpc 和 frpc.toml

#### 配置服务端
```bash
cd /opt/frp_0.58.0_linux_amd64
vim frps.toml
```
粘入以下配置
```bash
bindPort = 7000   #服务端监听端口
auth.method = "token"   #服务端连接身份认证，默认token
auth.token = "token_xxx"   #服务端token密码，自己定义，客户端配置要用到

# http反向代理端口，可自定义，通过服务器ip/域名访问家里电脑时，就是通过这个端口访问
# 如80端口被nginx等占用，可改用其他端口
vhostHTTPPort = 80
# https反向代理端口，可自定义，通过服务器访问家里电脑时，就是通过这个端口访问
vhostHTTPSPort = 443

transport.tls.force = false   #是否只接受启用了TLS的客户端连接

#transport.maxPortsPerClient = 20   #每个客户端可以创建多少隧道
#transport.maxPoolCount = 50   #每条隧道可以有多少IP连接
#allowPorts = [
#    { start = 10000, end = 15000 },   #端口范围设置为10000-15000可用
#    { start = 30000, end = 40000 },   #同理，可设置多个端口范围开放
#    { single = 25565 },   #单端口设置，指定25565端口可用
#    { single = 25566 }    #同理，可以设置多个单端口开放
#]


# 服务端Web界面配置
webServer.addr = "0.0.0.0" # 默认为 127.0.0.1，如果需要公网访问，需要修改为 0.0.0.0
webServer.port = 7001   #Web页面端口号
webServer.user = "你的帐号名：admin"   #Web页面账号
webServer.password = "你的密码：123456"   #Web页面密码

```
配置好后，保存退出

#### 启动服务端，看能否正常启动
```bash
cd /opt/frp_0.58.0_linux_amd64
./frps -c frps.toml

#启动后，没报错，且能打开服务端web页面，就算成功了
浏览器访问：http://云服务器ip地址:7001
登录帐号 admin 密码 123456
```
#### 能正常启动后，配置服务端开机自启后台运行
```bash
# 配置软链接
ln -s /opt/frp_0.58.0_linux_amd64/frps /usr/local/bin

# 新建文件夹 frps
mkdir /etc/frps

# 复制配置文件到 /etc/frps中
cp /opt/frp_0.58.0_linux_amd64/frps.toml /etc/frps/

# 配置开机自启
vim /etc/systemd/system/frps.service

# 粘入以下配置
[Unit]
Description=Frps Server
After=network.target

[Service]
Type=simple
User=root
Restart=on-failure
RestartSec=5s
ExecStart=/usr/local/bin/frps -c /etc/frps/frps.toml

[Install]
WantedBy=multi-user.target

```
配置完后, 刷新服务
```bash
systemctl daemon-reload
```
启动frps
```bash
systemctl start frps
```
开机启动
```bash
systemctl enable frps
```



### 安装客户端frpc
```shell
cd /opt
wget https://github.com/fatedier/frp/releases/download/v0.58.0/frp_0.58.0_linux_arm.tar.gz
```

#### 解压客户端包

```shell
cd /opt
tar -xvf frp_0.58.0_linux_arm.tar.gz -C ./
```

#### 配置客户端
```bash
cd /opt/frp_0.58.0_linux_arm
vim frpc.toml
```
粘入以下配置
```bash
serverAddr = "xxx.xxx.xxx.xxx" # 云服务器ip地址
serverPort = 7000 # 服务端监听端口，和服务端配置保持一致
auth.method = "token"   #服务端连接身份认证，默认token
auth.token = "token_xxx"   #服务端token密码，密码不正确将无法连接服务器
transport.tls.enable = false   #是否和服务端之间启用TLS连接
transport.tls.disableCustomTLSFirstByte = false
#默认为true，当配置为true时，无法和vhostHTTPSPort端口复用

[[proxies]]
name = "wankeyun-ssh"
type = "tcp" #隧道类型，可填tcp, http, https ...  tcp类型的项目可以直接配多个，因为可以指定服务端监听的端口
localIP = "127.0.0.1" #本地IP地址，如果是本机就127.0.0.1
localPort = 22 #本地端口，本地ssh登录，用的是22端口
remotePort = 6000 #服务端映射到外网的端口，外网ssh登录时，用这个端口访问
transport.useEncryption = true   #传输加密，加密算法采用 aes-128-cfb
transport.useCompression = true   #传输压缩，压缩算法采用 snappy

[[proxies]]
name = "wankeyun-alist-web"   #隧道名称，可自定义，不能重复
type = "http"  #隧道类型，可填http, https
localIP = "127.0.0.1"   #本地IP地址，如果是本机就127.0.0.1
localPort = 5244   #本地端口，本地Web服务端口，我这里跑的是 alist端口监听的是5244

#绑定域名 可设置自己的域名 没有就填云服务器ip 后面通用ip+端口访问
#由于服务端是配配有vhostHTTPPort端口的，如果想配置多个http的web项目
#需要用域名配置customDomains，可用二级域名扩展项目，一个域名对应一个http的web项目
# 如 www.tangmaomao.top  二级域名 m.tangmaomao.top

# 或者新增多个tcp来访问web项目，也可行，和上面的配置一样
customDomains = ["xxx.xxx.xxx.xxx"]

transport.useEncryption = true   #传输加密，加密算法采用 aes-128-cfb
transport.useCompression = true   #传输压缩，压缩算法采用 snappy

```
配置好后，保存退出


#### 启动客户端，看能否正常启动
```bash
cd /opt/frp_0.58.0_linux_arm
./frps -c frpc.toml

#启动后，没报错，且能打开服务端web页面，就算成功了
浏览器访问：http://云服务器ip地址:服务端vhostHTTPPort端口
如果能正常看到你客户端（家里电脑上）跑的项目时，客户端安装就成功了
```

#### 能正常启动后，配置客户端开机自启后台运行
```bash
# 配置软链接
ln -s /opt/frp_0.58.0_linux_arm/frpc /usr/local/bin

# 新建文件夹 frpc
mkdir /etc/frpc

# 复制配置文件到 /etc/frps中
cp /opt/frp_0.58.0_linux_arm/frpc.toml /etc/frpc/

# 配置开机自启
vim /etc/systemd/system/frpc.service

# 粘入以下配置
[Unit]
Description=Frpc Server
After=network.target

[Service]
Type=simple
User=root
Restart=on-failure
RestartSec=5s
ExecStart=/usr/local/bin/frpc -c /etc/frpc/frpc.toml

[Install]
WantedBy=multi-user.target

```
配置完后, 刷新服务
```bash
systemctl daemon-reload
```
启动frps
```bash
systemctl start frpc
```
查看frps执行状态
```bash
systemctl status frpc
```
开机启动
```bash
systemctl enable frpc
```

查看frpc进程
```bash
#查看进程
netstat -tunlp | grep frpc
#杀死进程
killall -9 frpc
```
