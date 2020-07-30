<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [nginx 服务器命令](#nginx-%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%91%BD%E4%BB%A4)
- [安装nginx](#%E5%AE%89%E8%A3%85nginx)
  - [安装失败：并报错如下](#%E5%AE%89%E8%A3%85%E5%A4%B1%E8%B4%A5%E5%B9%B6%E6%8A%A5%E9%94%99%E5%A6%82%E4%B8%8B)
  - [安装成功](#%E5%AE%89%E8%A3%85%E6%88%90%E5%8A%9F)
  - [开放nginx端口](#%E5%BC%80%E6%94%BEnginx%E7%AB%AF%E5%8F%A3)
  - [查看nginx配置文件目录](#%E6%9F%A5%E7%9C%8Bnginx%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E7%9B%AE%E5%BD%95)
  - [添加自定义的nginx配置 xxx.conf](#%E6%B7%BB%E5%8A%A0%E8%87%AA%E5%AE%9A%E4%B9%89%E7%9A%84nginx%E9%85%8D%E7%BD%AE-xxxconf)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


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

### 安装失败：并报错如下
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

### 安装成功
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

### 开放nginx端口
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

### 查看nginx配置文件目录
- 查看nginx配置文件目录

    ```
    nginx -t
  
    [root@localhost /]# nginx -t
    nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
    nginx: configuration file /etc/nginx/nginx.conf test is successful
    ```

### 添加自定义的nginx配置 xxx.conf
添加自定义的nginx配置 xxx.conf

  1. 查看nginx默认配置完整的代码
      
      ```
      cat /etc/nginx/nginx.conf
      ```
      ```
      [root@localhost ~]# cat /etc/nginx/nginx.conf
      # For more information on configuration, see:
      #   * Official English Documentation: http://nginx.org/en/docs/
      #   * Official Russian Documentation: http://nginx.org/ru/docs/
      
      user nginx;
      worker_processes auto;
      error_log /var/log/nginx/error.log;
      pid /run/nginx.pid;
      
      # Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
      include /usr/share/nginx/modules/*.conf;
      
      events {
          worker_connections 1024;
      }
      
      http {
          log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                            '$status $body_bytes_sent "$http_referer" '
                            '"$http_user_agent" "$http_x_forwarded_for"';
      
          access_log  /var/log/nginx/access.log  main;
      
          sendfile            on;
          tcp_nopush          on;
          tcp_nodelay         on;
          keepalive_timeout   65;
          types_hash_max_size 2048;
      
          include             /etc/nginx/mime.types;
          default_type        application/octet-stream;
      
          # Load modular configuration files from the /etc/nginx/conf.d directory.
          # See http://nginx.org/en/docs/ngx_core_module.html#include
          # for more information.
          include /etc/nginx/conf.d/*.conf;
      
          server {
              listen       80 default_server;
              listen       [::]:80 default_server;
     
              # //server_name _表示匹配所有域名，当自定义域名的nginx配置时 
              # // 这里要做修改，要不然会匹配到这里，可改为 server_name  localhost  
              server_name  _;
              root         /usr/share/nginx/html;
      
              # Load configuration files for the default server block.
              include /etc/nginx/default.d/*.conf;
      
              location / {
              }
      
              error_page 404 /404.html;
                  location = /40x.html {
              }
      
              error_page 500 502 503 504 /50x.html;
                  location = /50x.html {
              }
          }
      
      # Settings for a TLS enabled server.
      #
      #    server {
      #        listen       443 ssl http2 default_server;
      #        listen       [::]:443 ssl http2 default_server;
      #        server_name  _;
      #        root         /usr/share/nginx/html;
      #
      #        ssl_certificate "/etc/pki/nginx/server.crt";
      #        ssl_certificate_key "/etc/pki/nginx/private/server.key";
      #        ssl_session_cache shared:SSL:1m;
      #        ssl_session_timeout  10m;
      #        ssl_ciphers HIGH:!aNULL:!MD5;
      #        ssl_prefer_server_ciphers on;
      #
      #        # Load configuration files for the default server block.
      #        include /etc/nginx/default.d/*.conf;
      #
      #        location / {
      #        }
      #
      #        error_page 404 /404.html;
      #            location = /40x.html {
      #        }
      #
      #        error_page 500 502 503 504 /50x.html;
      #            location = /50x.html {
      #        }
      #    }
      
      }
      ```
  
  2. 找到添加配置文件的引用代码
      ```
      // 意思是引用所有conf.d/文件夹下的
      // 以.conf结尾的配置文件

      include /etc/nginx/conf.d/*.conf;
      ```
      ```
      所以 你就可以在
           
      /etc/nginx/conf.d/  
           
      文件夹中新建你要添加的域名nginx配置
           
      如： badu.com.conf  localhost.conf  192.168.xxx.conf
      ```

  3. 新建一个名叫 localhost.conf 的配置文件
        ```
        // 跳到conf.d 文件夹目录下
        cd /etc/nginx/conf.d/
     
        // 在当前目录下  新建一个localhost.conf
        echo > localhost.conf
        ```
        然后输入配置，先用vim/vi打开这个文件
        ```
        vim localhost.conf
        ```
        输入 i 进入编辑模式，然后粘贴进去下面代码
        ```
        server {
            listen       80;   // 你网站运行时监听的端口
            server_name  192.168.2.195;  // 表示你网站在浏览器中打开时输入的ip（云服务器公网ip, 虚拟机则用ifconfig查看本地ip）  有域名的填域名, 如(tangmaomao.top)
        
            location / {
                root   /www/payment/dist; // 配置你项目地址的路径，从根目录开始（我的www目录在/根目录下， 在cd / 中）
                index  index.html index.htm; // 配置默认打开的文件名 如index.php index.html 等
            }
        
            error_page 404 /40x.html;        // 表示当报404错时，都重定向到40x.html
            location = /40x.html {           // 当404报错重定向到40x.html时（即当前location地址等于/40x.html）,做拦截
                root   /www/payment/dist/;   // 重新配置页面的根目录，即40x.html的根目录在哪
            }
     
            error_page 500 502 503 504  /50x.html;  // 表示当报500 502 503 504错时，都重定向到50x.html
            location = /50x.html {                    // 当500 502 503 504报错重定向到50x.html时（即当前location地址等于/50x.html），做拦截
                root   /www/payment/dist/;            // 重新配置页面的根目录，即50x.html的根目录在哪
            }
        }
        ```
        按 Esc 键 退出编辑
 
        再输入 :wq 保存并退出
        
  4. 重启nginx
        ```
        service nginx restart
        ```
        完了后，在浏览器中输入你的地址查看你的网页 http://192.168.2.195/demo/
        
  5. 上面这步如果失败并进入 403 forbidden 报错页面
  
     参考资料 https://www.linuxprobe.com/nginx-403-forbidden.html
     
     - 一、由于启动用户和nginx工作用户不一致所致
     
         ```
         ps aux | grep "nginx: worker process" | awk'{print $1}'
         ```
         查看nginx的启动用户，发现是nobody或者其它用户, 如nginx, 而启动用户是root启动的
         
         **解决办法，将nginx.config的user改为和启动用户一致(root)**
         
         ```
         vim conf/nginx.conf
       
         找到 user nginx;  或者  user nobody;
         
         改为  user root;
         ```
       
     - 二、缺少index.html或者index.php文件，就是配置文件中index index.html index.htm这行中的指定的文件。   
        ```
       server {
                   listen       80;   // 你网站运行时监听的端口
                   server_name  192.168.2.195;  // 表示你网站在浏览器中打开时输入的ip（云服务器公网ip, 虚拟机则用ifconfig查看本地ip）  有域名的填域名, 如(tangmaomao.top)
               
                   location / {
                       root   /www/payment/dist; // 配置你项目地址的路径，从根目录开始（我的www目录在/根目录下， 在cd / 中）
                       index  index.html index.htm; // 配置默认打开的文件名 如index.php index.html 等
                   }
               }
       
       // 如果在/www/payment/dist下面没有 index.php 或 index.html的文件  会报403 forbidden
        ```
        
     - 三、权限问题，如果nginx没有web目录的操作权限，也会出现403错误
     
         ```
         解决办法：修改web目录的读写权限，或者是把nginx的启动用户改成目录的所属用户，重启Nginx即可解决
            
         chmod -R 777 /www
         chmod -R 777 /www/payment
         chmod -R 777 /www/payment/dist/
         ```
     
     - 四、SELinux设置为开启状态（enabled）的原因。
     
        查看当前selinux的状态。
        ```
        /usr/sbin/sestatus
        ```
        或者
        ```
        [root@localhost /]# sestatus
        SELinux status:                 enforcing
        ```

        将SELINUX=enforcing 修改为 SELINUX=disabled 状态
        ```
        vim /etc/selinux/config
       
        #SELINUX=enforcing
        SELINUX=disabled
        ```

        重启生效  reboot
        ```
        输入命令
        reboot
        ```
       
  6. reboot重启后nginx会关闭，开启nginx
  ```
    service nginx restart
  ```
  完了后，在浏览器中输入你的地址查看你的网页 http://192.168.2.195/demo/

