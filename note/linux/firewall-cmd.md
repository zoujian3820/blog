
## centos出现“FirewallD is not running”怎么办
```
docker run -d --name some-mongo -p 10050:27017 mongo:latest
firewall-cmd --zone=public --add-port=10050/tcp --permanent
```
### [防火墙文档](fanghuoqiang-doc.md)

> 云服务器centos上安装了mongodb数据库，默认是不开启远端访问功能，需要设置一下防火墙，在开放默认端口号 27017时提示FirewallD is not running，经过排查发现是防火墙就没打开造成的，出于安装考虑还是把防火墙开上吧，以下步骤仅供参考啦。

1. 执行命令
    ```
    [root@VM-16-15-centos /]# firewall-cmd --zone=public --add-port=10050/tcp --permanent
    FirewallD is not running
    ```

2. 通过systemctl status firewalld查看firewalld状态，发现当前是dead状态，即防火墙未开启。
    ```
    [root@VM-16-15-centos /]# systemctl status firewalld
    ● firewalld.service - firewalld - dynamic firewall daemon
        Loaded: loaded (/usr/lib/systemd/system/firewalld.service; disabled; vendor preset: enabled)
        Active: inactive (dead)
            Docs: man:firewalld(1)
    ```

3. 通过systemctl start firewalld开启防火墙，没有任何提示即开启成功。
    ```
    [root@VM-16-15-centos /]# systemctl start firewalld
    [root@VM-16-15-centos /]# 
    ```

4. 再次通过systemctl status firewalld查看firewalld状态，显示running即已开启了。
    ```
    [root@VM-16-15-centos /]# systemctl status firewalld
    ● firewalld.service - firewalld - dynamic firewall daemon
        Loaded: loaded (/usr/lib/systemd/system/firewalld.service; disabled; vendor preset: enabled)
        Active: active (running) since Sat 2020-07-25 17:17:12 CST; 1min 5s ago
            Docs: man:firewalld(1)
    Main PID: 10426 (firewalld)
            Tasks: 2
        Memory: 24.0M
        CGroup: /system.slice/firewalld.service
                └─10426 /usr/bin/python2 -Es /usr/sbin/firewalld --nofork --nopid

        Jul 25 17:17:12 VM-16-15-centos systemd[1]: Starting firewalld - dynamic firewall daemon...
        Jul 25 17:17:12 VM-16-15-centos systemd[1]: Started firewalld - dynamic firewall daemon.
        Jul 25 17:17:12 VM-16-15-centos firewalld[10426]: WARNING: AllowZoneDrifting is enabled. This is considered an insecure configuration opt...it now.
        Hint: Some lines were ellipsized, use -l to show in full.
        [root@VM-16-15-centos /]# 
    ```

5. 如果要关闭防火墙设置，可能通过systemctl stop firewalld这条指令来关闭该功能。
    ```
    systemctl stop firewalld
    ```

6. 再次执行执行firewall-cmd --zone=public --add-port=10050/tcp --permanent，提示success，表示设置成功，这样就可以继续后面的设置了。
    ```
    firewall-cmd --zone=public --add-port=10050/tcp --permanent
    ```
