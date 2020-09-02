<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [安装docker-ce的多种方式](#%E5%AE%89%E8%A3%85docker-ce%E7%9A%84%E5%A4%9A%E7%A7%8D%E6%96%B9%E5%BC%8F)
  - [更新为最新的yum](#%E6%9B%B4%E6%96%B0%E4%B8%BA%E6%9C%80%E6%96%B0%E7%9A%84yum)
  - [安装前先卸载旧版本](#%E5%AE%89%E8%A3%85%E5%89%8D%E5%85%88%E5%8D%B8%E8%BD%BD%E6%97%A7%E7%89%88%E6%9C%AC)
  - [快捷安装方式](#%E5%BF%AB%E6%8D%B7%E5%AE%89%E8%A3%85%E6%96%B9%E5%BC%8F)
  - [使用仓库安装（推荐的方式）](#%E4%BD%BF%E7%94%A8%E4%BB%93%E5%BA%93%E5%AE%89%E8%A3%85%E6%8E%A8%E8%8D%90%E7%9A%84%E6%96%B9%E5%BC%8F)
    - [(1). 安装必须的依赖](#1-%E5%AE%89%E8%A3%85%E5%BF%85%E9%A1%BB%E7%9A%84%E4%BE%9D%E8%B5%96)
    - [(2). 添加stable的Docker-ce源](#2-%E6%B7%BB%E5%8A%A0stable%E7%9A%84docker-ce%E6%BA%90)
    - [(3). 安装最新版docker-ce](#3-%E5%AE%89%E8%A3%85%E6%9C%80%E6%96%B0%E7%89%88docker-ce)
    - [(4). 安装指定版本docker-ce](#4-%E5%AE%89%E8%A3%85%E6%8C%87%E5%AE%9A%E7%89%88%E6%9C%ACdocker-ce)
    - [(5). 配置docker国内加速包镜像地址](#5-%E9%85%8D%E7%BD%AEdocker%E5%9B%BD%E5%86%85%E5%8A%A0%E9%80%9F%E5%8C%85%E9%95%9C%E5%83%8F%E5%9C%B0%E5%9D%80)
    - [(6). 下载并运行一个包(mysql)](#6-%E4%B8%8B%E8%BD%BD%E5%B9%B6%E8%BF%90%E8%A1%8C%E4%B8%80%E4%B8%AA%E5%8C%85mysql)
    - [(7). 安装docker集合工具docker-compose](#7-%E5%AE%89%E8%A3%85docker%E9%9B%86%E5%90%88%E5%B7%A5%E5%85%B7docker-compose)
  - [sudo chmod +x 命令作用，给文件加执行权限](#sudo-chmod-x-%E5%91%BD%E4%BB%A4%E4%BD%9C%E7%94%A8%E7%BB%99%E6%96%87%E4%BB%B6%E5%8A%A0%E6%89%A7%E8%A1%8C%E6%9D%83%E9%99%90)
  - [docker命令](#docker%E5%91%BD%E4%BB%A4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 安装docker-ce的多种方式
> 参考资料 https://www.cnblogs.com/cobcmw/p/12514444.html
1. Docker 运行在 CentOS-6.5 或更高的版本的 CentOS 上，要求系统为64位、系统内核版本为 2.6.32-431 或者更高版本。

2. Docker 运行在CentOS 7 上，要求系统为64位、系统内核版本为 3.10 以上。

3. 通过uname -r 命令查看你当前的内核版本
    ```
    [root@VM-16-15-centos ~]# uname -r
    3.10.0-1062.18.1.el7.x86_64
    ```

### 更新为最新的yum

```
// 更新为最新的yum
sudo yum update
// 更新过程中有提示，输入“y”
Is this ok [y/d/n]: y
```

### 安装前先卸载旧版本

```
安装前先卸载旧版本
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```

### 快捷安装方式

```
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### 使用仓库安装（推荐的方式）

> 先改为国内阿里源[解决yum安装下载慢的问题](解决yum安装下载慢的问题.md)

#### (1). 安装必须的依赖

```
sudo yum install -y yum-utils \
device-mapper-persistent-data \
lvm2
```

#### (2). 添加stable的Docker-ce源

```
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

或者使用阿里云镜像

```
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

#### (3). 安装最新版docker-ce

```
sudo yum install docker-ce docker-ce-cli containerd.io

systemctl enable docker   // 安装完开启   开机自动启动docker 
```

#### (4). 安装指定版本docker-ce

```
yum list docker-ce --showduplicates | sort -r
sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
```

#### (5). 配置docker国内加速包镜像地址 

- [配置docker国内加速包镜像地址](配置docker国内加速包镜像地址.md)


#### (6). 下载并运行一个包(mysql)
> 运行docker run 会检测docker本地有没有下载过要运行的包
> 有则直接运行跳过 docker pull ，无则先从远程下载下来，然后再运行

```
// mysql
docker run --name study-mysql -e MYSQL_ROOT_PASSWORD=123456 -p 28001:3306 -d mysql
```


#### (7). 安装docker集合工具docker-compose

> docker-compose工具install网址 https://docs.docker.com/compose/install/ 选择Linux

- 官方安装命令
    ```
    sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    ```

- 使用国内加速源安装
    ```
    curl -L https://get.daocloud.io/docker/compose/releases/download/1.24.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
    ```

### [sudo chmod +x 命令作用，给文件加执行权限](https://blog.csdn.net/u012106306/article/details/80436911)
```
// 对docker-compose脚本增加执行权限
sudo chmod +x /usr/local/bin/docker-compose

// 测试安装结果
docker-compose --version
或 docker-compose -v
```


### docker命令

```
service docker start    // 启动docker
service docker restart  // 重启docker
service docker stop     // 关闭docker

su root                   // 先切换到root用户, 再执行以下命令
systemctl enable docker   // 开机自动启动docker 
systemctl start docker    // 启动docker
systemctl stop docker     // 关闭docker
systemctl restart docker  // 重启dokcer
systemctl status docker   // 查看dokcer运行状态

docker ps      // 查看当前运行的容器   
docker ps -a   // 查看当前所有容器，包含停止的

// 运行docker run 会检测docker本地有没有下载过要运行的包
// 有则直接运行跳过 docker pull ，无则先从远程下载下来，然后再运行
docker run 容器名
docker start 容器名
docker restart 容器名
docker stop 容器名
// 删除容器，只能删除停止的容器，运行中的要先 stop， 再删除
docker rm (填写docker ps -a查看到的容器的 NAMES 或者 CONTAINER ID)
```
