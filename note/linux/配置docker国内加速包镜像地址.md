<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [国内加速包镜像地址](#%E5%9B%BD%E5%86%85%E5%8A%A0%E9%80%9F%E5%8C%85%E9%95%9C%E5%83%8F%E5%9C%B0%E5%9D%80)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 国内加速包镜像地址
> https://www.cnblogs.com/reasonzzy/p/11127359.html

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
```

创建文件夹

```
sudo mkdir -p /etc/docker
```

编辑/etc/docker/daemon.json文件，并输入国内镜像源地址

```
sudo vi /etc/docker/daemon.json
```

```
输入 i 转为编辑状态INSERT

复制粘贴以下你要加入的加速配置
  如:
    {
      "registry-mirrors": ["http://hub-mirror.c.163.com"]
    }


按esp键 再按shift + ;键输入 :

然后再输入 wq 保存并退出

如果中途保存退出失败有异常，会生成.daemon.json.swp文件

使用 rm .daemon.json.swp 删除
```

修改完地址后，重新加载配置文件，重启docker服务

```
sudo systemctl daemon-reload
sudo systemctl restart docker
```

```
Docker中国官方镜像加速
{
   "registry-mirrors": ["http://hub-mirror.c.163.com"]
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
