<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [centOs7.6云服务器上搭项目](#centos76%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E6%90%AD%E9%A1%B9%E7%9B%AE)
  - [1. 在win/mac本地电脑上安装前端脚手架包vue/cli](#1-%E5%9C%A8winmac%E6%9C%AC%E5%9C%B0%E7%94%B5%E8%84%91%E4%B8%8A%E5%AE%89%E8%A3%85%E5%89%8D%E7%AB%AF%E8%84%9A%E6%89%8B%E6%9E%B6%E5%8C%85vuecli)
  - [2. 登录云服务器](#2-%E7%99%BB%E5%BD%95%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%99%A8)
  - [3. 安装docker](#3-%E5%AE%89%E8%A3%85docker)
  - [4. 安装 mongodb](#4-%E5%AE%89%E8%A3%85-mongodb)
    - [找到搜索结果第一个mongo, 点开使用提示的命令拉取到mongo镜像](#%E6%89%BE%E5%88%B0%E6%90%9C%E7%B4%A2%E7%BB%93%E6%9E%9C%E7%AC%AC%E4%B8%80%E4%B8%AAmongo-%E7%82%B9%E5%BC%80%E4%BD%BF%E7%94%A8%E6%8F%90%E7%A4%BA%E7%9A%84%E5%91%BD%E4%BB%A4%E6%8B%89%E5%8F%96%E5%88%B0mongo%E9%95%9C%E5%83%8F)
  - [5. 运行mongo](#5-%E8%BF%90%E8%A1%8Cmongo)
  - [6. 下载远程登录mongo管理工具 Robo 3T](#6-%E4%B8%8B%E8%BD%BD%E8%BF%9C%E7%A8%8B%E7%99%BB%E5%BD%95mongo%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7-robo-3t)
    - [1. Robo 3T 1.3.1 点击左上角电脑标识 -> create](#1-robo-3t-131-%E7%82%B9%E5%87%BB%E5%B7%A6%E4%B8%8A%E8%A7%92%E7%94%B5%E8%84%91%E6%A0%87%E8%AF%86---create)
    - [2. Studio 3T 点击左上角圆柱Connect标识 -> New Connection](#2-studio-3t-%E7%82%B9%E5%87%BB%E5%B7%A6%E4%B8%8A%E8%A7%92%E5%9C%86%E6%9F%B1connect%E6%A0%87%E8%AF%86---new-connection)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# centOs7.6云服务器上搭项目
> 练习的全栈项目，实现开发的全套自动化管理

## 1. 在win/mac本地电脑上安装前端脚手架包vue/cli

```bash
yarn global add @vue/cli
yarn global add @vue/cli-service-global

// 检查vue/cli安装是否成功
vue --version
```

## 2. 登录云服务器
```
ssh root@119.xx.xx.xx (你的云服务器公网ip, root是你的用户名，默认root)
提示password: 输入你的云服务器密码（密码输入时是看不到的）

// 安装redhat-lsb可查看linux版本信息
yum install -y redhat-lsb
// 安装成功后查看所有信息
lsb_release -a
```

## 3. 安装docker
> github网址[https://github.com/docker/docker-install](https://github.com/docker/docker-install)

1. Docker 运行在 CentOS-6.5 或更高的版本的 CentOS 上，要求系统为64位、系统内核版本为 2.6.32-431 或者更高版本。

2. Docker 运行在CentOS 7 上，要求系统为64位、系统内核版本为 3.10 以上。

3. 通过uname -r 命令查看你当前的内核版本
    ```
    [root@VM-16-15-centos ~]# uname -r
    3.10.0-1062.18.1.el7.x86_64
    ```

4. 更新yum
    ```
    // 更新为最新的yum
    sudo yum update
    // 更新过程中有提示，输入“y”
    Is this ok [y/d/n]: y
    ```

5. 更新完成，执行docker安装脚本
    ```
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh

    // 安装完了后 检查一下docker版本
    [root@VM-16-15-centos ~]# docker --version
    Docker version 19.03.12, build 48a66213fe

    // 启动docker
    service docker start
    // 重启docker
    service docker restart
    // 关闭docker
    service docker stop
    ```
    > [忘记启动docker无法拉取镜像，及开机自启动docker配置](https://segmentfault.com/q/1010000005040763)

    * su root                   // 先切换到root用户, 再执行以下命令
    * systemctl enable docker   // 开机自动启动docker 
    * systemctl start docker    // 启动docker
    * systemctl stop docker     // 关闭docker
    * systemctl restart docker  // 重启dokcer

6. 安装docker集合工具docker-compose
    > docker-compose工具install网址 https://docs.docker.com/compose/install/ 选择Linux

    ```
    // 安装命令
    sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    ```
    ### [sudo chmod +x 命令作用，给文件加执行权限](https://blog.csdn.net/u012106306/article/details/80436911)
    ```
    // 对docker-compose脚本增加执行权限
    sudo chmod +x /usr/local/bin/docker-compose

    // 测试安装结果
    docker-compose --version
    或 docker-compose -v
    ```

## 4. 安装 mongodb
1. 在hub.docker上搜索mongo镜像 https://hub.docker.com/search?q=mongo&type=image

- 国内加速包镜像地址
https://www.cnblogs.com/reasonzzy/p/11127359.html

    ```
    Docker中国官方镜像加速

    --registry-mirror=https://registry.docker-cn.com

    网易163镜像加速

    --registry-mirror=http://hub-mirror.c.163.com

    中科大镜像加速

    --registry-mirror=https://docker.mirrors.ustc.edu.cn

    阿里云镜像加速

    --registry-mirror=https://{your_id}.mirror.aliyuncs.com

    daocloud镜像加速

    --registry-mirror=http://{your_id}.m.daocloud.io

    

    创建文件夹
    sudo mkdir -p /etc/docker

    编辑/etc/docker/daemon.json文件，并输入国内镜像源地址
    sudo vi /etc/docker/daemon.json
    输入 i 转为编辑状态INSERT
    复制粘贴以下你要加入的加速配置
    按esp键 再按shift + ;键输入 :
    然后再输入 wq 保存并退出
    如果中途保存退出失败有异常，会生成.daemon.json.swp文件
    使用 rm .daemon.json.swp 删除

    修改完地址后，重新加载配置文件，重启docker服务
    sudo systemctl daemon-reload
    sudo systemctl restart docker

    Docker中国官方镜像加速
    {
    "registry-mirrors": ["https://registry.docker-cn.com"]
    }

    网易163镜像加速
    {
    "registry-mirrors": ["http://hub-mirror.c.163.com"]
    }

    中科大镜像加速
    {
        "registry-mirrors": ["https://docker.mirrors.ustc.edu.cn"]     
    }

    也可以直接下载站点镜像：
    docker pull hub.c.163.com/library/tomcat:latest  //复制站点链接用 pull 下来
    阿里云跟daocloud镜像加速需要注册账号
    ```

   ### 找到搜索结果第一个mongo, 点开使用提示的命令拉取到mongo镜像
    ```
    1. 拉取前先确保开启docker，否则报错（Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?）

    2. 拉取前转换为国内镜像源地址
    编辑生成 daemon.json 文件
    sudo vi /etc/docker/daemon.json
    通vi输入镜像地址，步骤参考上面介绍

    // 拉取最新的版本
    docker pull mongo

    // 拉取指定的mongo版本(:后写标签或版本号)
    docker pull mongo:4
    ```

## 5. 运行mongo
1. 使用 docker images 命令查看当前下载了哪些镜像
2. 执行命令运行mongo
    ```
    docker run -d --name some-mongo -p 10050:27017 mongo:latest
    ```

|  -d  | --name |  -p  | mongo:latest |
| :--: | :----: | :--: | :-:
| 表示在后台运行指令 | 给运行程序取的名字 | 给容器内程序服务端口印射到宿主机端口 | 执行的程序名 + 标签(TAG) |

3. 在宿主机上放行10050端口
    > 两种方法
    - 第一种 关闭防火墙
    - 第二种 把10050端口添加到放行规则中去
      - 执行以下放行命令
        ```
        Ubuntu使用 
        ufw allow Port端口号

        CentOs使用, --permanent表示永久放行
        firewall-cmd --zone=public --add-port=10050/tcp --permanent
        成功了会提示 success
        ```
        - 如果失败报FirewallD is not running(防火墙没打开)

            **[打开/关闭防火墙](firewall-cmd.md)**
            ```
            // 打开防火墙
            systemctl start firewalld
            ```

        - 成功后更新防火墙规则
            ```
            firewall-cmd --reload
            // 成功提示 success
            ```
        - 查看运行状态
            ```
            firewall-cmd --state
            // 运行中提示running
            ```    


## 6. 下载远程登录mongo管理工具 Robo 3T
> https://robomongo.org/download 点击download下载
>安装解压后的两个软件Robo 3T 1.3.1 和 Studio 3T

### 1. Robo 3T 1.3.1 点击左上角电脑标识 -> create

**conection选项**

|name|address|address右侧端口|
|:--:|:-----:|:------------:|
|给连接的数据库取个名称|云服务器ip地址/localhost|服务器端口/27017|
|DEV|119.XX.XXX.X|10050(主机上给docker mongodb放行的端口)|

**SSH选项**
> 选中打开 Use SSH tunnel

|SSH Address|SSH Address右侧端口|SSH User Name|SSH Auth Method|User Password|
|:---------:|:---:|:-----------:|:-------------:|:-----------:|
|云服务器公网ip地址|云服务器公网ip端口|云主机用户名(linux默认root)|SSH授权方式/选Password|云主机登录密码|
|119.xx.xxx.x|22|root|Password|xxxxxxx@xx.com|

### 2. Studio 3T 点击左上角圆柱Connect标识 -> New Connection
> 安装时会让添加软件打开的密码，输两次

**Server选项**

|Server|Port|
|:--:|:-----:|
|云服务器公网ip地址|10050(主机上给docker mongodb放行的端口)|
|119.xx.xxx.x|10050|

**SSH选项**
> 选中打开 Use SSH tunnel

|SSH Address|Port|SSH User Name|SSH Auth Method|User Password|
|:---------:|:---:|:-----------:|:-------------:|:-----------:|
|云服务器公网ip地址|云服务器公网ip端口|云主机用户名(linux默认root)|SSH授权方式/选Password|云主机登录密码|
|119.xx.xxx.x|22|root|Password|xxxxxxx@xx.com|