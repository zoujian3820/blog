<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [安装docker-ce的多种方式](#%E5%AE%89%E8%A3%85docker-ce%E7%9A%84%E5%A4%9A%E7%A7%8D%E6%96%B9%E5%BC%8F)
  - [更新为最新的yum](#%E6%9B%B4%E6%96%B0%E4%B8%BA%E6%9C%80%E6%96%B0%E7%9A%84yum)
  - [安装前先卸载旧版本](#%E5%AE%89%E8%A3%85%E5%89%8D%E5%85%88%E5%8D%B8%E8%BD%BD%E6%97%A7%E7%89%88%E6%9C%AC)
  - [快捷安装方式](#%E5%BF%AB%E6%8D%B7%E5%AE%89%E8%A3%85%E6%96%B9%E5%BC%8F)
  - [使用仓库安装（推荐的方式）](#%E4%BD%BF%E7%94%A8%E4%BB%93%E5%BA%93%E5%AE%89%E8%A3%85%E6%8E%A8%E8%8D%90%E7%9A%84%E6%96%B9%E5%BC%8F)
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

1. 安装必须的依赖

    ```
    sudo yum install -y yum-utils \
    device-mapper-persistent-data \
    lvm2
    ```

2. 添加stable的Docker-ce源

    ```
    sudo yum-config-manager \
        --add-repo \
        https://download.docker.com/linux/centos/docker-ce.repo
    ```

    或者使用阿里云镜像

    ```
    sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    ```

3. 安装最新版docker-ce

    ```
    sudo yum install docker-ce docker-ce-cli containerd.io
    ```

4. 安装指定版本docker-ce

    ```
    yum list docker-ce --showduplicates | sort -r
    sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
    ```




5. 配置docker国内加速包镜像地址 

[配置docker国内加速包镜像地址](配置docker国内加速包镜像地址.md)


6. 下载并运行一个包(mysql)
> 运行docker run 会检测docker本地有没有下载过要运行的包
> 有则直接运行跳过 docker pull ，无则先从远程下载下来，然后再运行

```
// mysql
docker run --name study-mysql -e MYSQL_ROOT_PASSWORD=123456 -p 28001:3306 -d mysql
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
