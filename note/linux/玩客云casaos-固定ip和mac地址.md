## 玩客云casaos固定ip地址和mac地址

- 第一：关于家里的路由器有DHCP服务器，会动态分配ip处理方案

  进入路由器后台 `192.168.0.1` 后

  找到DHCP服务器设置界面，找到以下设置项

  |  |  |
  |----------|----------|
  | 地址池开始地址    | `192.168.0.100` |
  | 地址池结束地址    | `192.168.0.197` |

  把结束地址改小一点，我的Tplink路由器，默认为192.168.0.199

  然后我改小为 192.168.0.197 空出来的 192.168.0.198 就是留给玩客云的

  这样路由在动态分配ip地址时，会避开192.168.0.197以上的地址，避免和玩客云冲突

  `至此确定`192.168.0.198`为玩客云的固定ip地址`

- 第二：查看本机的ip地址和Mac地址

  输入命令  `ifconfig`
  ```
  eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.0.105  netmask 255.255.255.0  broadcast 192.168.0.255
        inet6 fe80::abdb:df42:e2ad:cc87  prefixlen 64  scopeid 0x20<link>
        ether 72:d2:38:f8:1e:95  txqueuelen 1000  (Ethernet)
        RX packets 4932527  bytes 2943461869 (2.7 GiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 813662  bytes 87770341 (83.7 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        device interrupt 42  
  ```
  `从上面得到mac地址为 72:d2:38:f8:1e:95`

  ip地址为`192.168.0.105`但我们要改为`192.168.0.198`


- 第三：配置固定ip地址和mac地址

  输入入命令  `nano /etc/network/interfaces`

  ```
  # Network is managed by Network manager

  # 以下两个是没改前默认开启的
  # auto lo
  # iface lo inet loopback


  # 以下是我后期为了固定mac地址和ip后期加上去的配置，并把上面没动前的配置注释关闭掉了
  # allow-hotplug eth0
  # no-auto-down eth0
  auto eth0
  iface eth0 inet static
  # 更改为你的玩客云 固定mac地址
  hwaddress 72:d2:38:f8:1e:95
  # pre-up ifconfig eth0 hw ether 72:d2:38:f8:1e:95
  # 更改为你的玩客云 固定的ip地址
  address 192.168.0.198
  netmask 255.255.255.0
  # 更改为你家的路由 网关
  gateway 192.168.0.1
  # 更改为你家的路由 网关 后面加个 8.8.8.8 地址备用
  dns-nameservers 192.168.0.1 8.8.8.8
  # pre-up /sbin/ifconfig eth0 mtu 3838
  ```

- 第三步保存

填入以上内容修改完后按`Ctrl+O`保存，再按`Ctrl+X`退出

当你重启玩客云后，再去查看ip地址，发现ip为`192.168.0.198`时就成功了


