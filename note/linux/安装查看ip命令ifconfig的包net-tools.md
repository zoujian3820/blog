
## 如果没安装该命令ifconfig的包，则报ifconfig command not found

### 查看是否真的没有设置IP地址
        
```
ip addr
```
        
```
// 192.168.2.195/24 若看到有ip地址，则说明已设置正常
      
[root@localhost /]# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 00:15:5d:02:73:00 brd ff:ff:ff:ff:ff:ff
    inet 192.168.2.195/24 brd 192.168.2.255 scope global noprefixroute dynamic eth0
       valid_lft 25279sec preferred_lft 25279sec
    inet6 fe80::a01a:d13a:a19:359a/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
[root@localhost /]#
```
   
### 确认sbin目录是否存在
        
```
cd /sbin
```
  
### 确认是否安装ifconfig命令
> 在sbin目录中输入ls | grep ifconfig，没有则说明没有安装
            
```
ls | grep ifconfig
```

### 确认没安装， 则安装net-tools，因为该包中包含ifconfig命令
        
```
sudo yum installnet-tools
            
// 安装过程中询问是否安装，输入  y  并回车即可
```

再次在命令行中输入  ifconfig  查看到ip则安装成功

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
