
## nginx 服务器命令 
|nginx服务器命令 |注释|
|:----|:-------|
|启动nginx|               service nginx start| 
|访问(nginx默认是80端口)|  curl 127.0.0.1| 
|查看nginx配置文件目录|        nginx -t| 
|重启nginx|               service nginx restart| 
|停用nginx|               service nginx stop|

## 安装nginx

```
yum install -y nginx
```

- 安装失败：并报错如下
    ```
    [root@localhost /]# yum install -y nginx
    已加载插件：fastestmirror
    Loading mirror speeds from cached hostfile
     * base: mirrors.aliyun.com
     * extras: mirrors.ustc.edu.cn
     * updates: mirrors.aliyun.com
    没有可用软件包 nginx。
    错误：无须任何处理
    ```
    原因是nginx位于第三方的yum源里面，而不在centos官方yum源里面
    
    解决方法：
    ```
    sudo yum install epel-release
    
    // 更新（更新时间稍微长一些，耐心等待）
    yum update
    
    // 完了后，再试一次
    yum install -y nginx
    ```

- 安装成功
    
    启动nginx服务
    ```
    service nginx start
    ```
    测试nginx服务
    ```
    wget http://127.0.0.1
    ```
    若结果如下，则说明nginx服务正常
    ```
    [root@localhost /]# service nginx start
    Redirecting to /bin/systemctl start nginx.service
    [root@localhost /]# wget http://127.0.0.1
    --2020-07-28 06:43:26--  http://127.0.0.1/
    正在连接 127.0.0.1:80... 已连接。
    已发出 HTTP 请求，正在等待回应... 200 OK
    长度：4833 (4.7K) [text/html]
    正在保存至: “index.html”
    
    100%[=================================================================>] 4,833       --.-K/s 用时 0s      
    
    2020-07-28 06:43:26 (886 MB/s) - 已保存 “index.html” [4833/4833])
    ```

- 开放nginx端口

    查看nginx是否在运行
    ```
    ps aux|grep nginx
    ```
  
    查看nginx运行的端口
    ```
    netstat -ntlp
    ```
    
    ```
    // 查看nginx是否在运行

    [root@localhost /]# ps aux|grep nginx
    root     27072  0.0  0.0 120900  2100 ?        Ss   07:07   0:00 nginx: master process /usr/sbin/nginx
    nginx    27073  0.0  0.0 121296  3260 ?        S    07:07   0:00 nginx: worker process
    nginx    27074  0.0  0.0 121296  3064 ?        S    07:07   0:00 nginx: worker process
    root     27076  0.0  0.0 112824   980 pts/0    S+   07:09   0:00 grep --color=auto nginx
    

    // 查看nginx运行的端口，得知跑在 80 端口
  
    [root@localhost /]# netstat -ntlp
    Active Internet connections (only servers)
    Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
    tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      27072/nginx: master 
    tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1017/sshd           
    tcp        0      0 0.0.0.0:3000            0.0.0.0:*               LISTEN      26270/node /usr/src 
    tcp        0      0 127.0.0.1:25            0.0.0.0:*               LISTEN      1568/master         
    tcp6       0      0 :::80                   :::*                    LISTEN      27072/nginx: master 
    tcp6       0      0 :::22                   :::*                    LISTEN      1017/sshd           
    tcp6       0      0 ::1:25                  :::*                    LISTEN      1568/master         
    tcp6       0      0 :::10050                :::*                    LISTEN      10258/docker-proxy  
    ```
  
    防火墙开放80端口
    ```
    firewall-cmd --zone=public --add-port=80/tcp --permanent
    ```
    
    更新防火墙规则
    ```
    firewall-cmd --reload
    ```

- 配置nginx

    查看nginx配置文件目录
    ```
    nginx -t
  
    [root@localhost /]# nginx -t
    nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
    nginx: configuration file /etc/nginx/nginx.conf test is successful
    ```
