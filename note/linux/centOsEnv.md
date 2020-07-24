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
    ```

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

    ```
    // 找到搜索结果第一个mongo, 点开使用提示的命令拉取到mongo镜像

    // 拉取最新的版本
    docker pull mongo

    // 拉取指定的mongo版本(:后写标签或版本号)
    docker pull mongo:4
    ```