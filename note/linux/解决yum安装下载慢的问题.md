<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [解决yum安装下载慢的问题](#%E8%A7%A3%E5%86%B3yum%E5%AE%89%E8%A3%85%E4%B8%8B%E8%BD%BD%E6%85%A2%E7%9A%84%E9%97%AE%E9%A2%98)
  - [清楚缓存](#%E6%B8%85%E6%A5%9A%E7%BC%93%E5%AD%98)
  - [备份(可选)](#%E5%A4%87%E4%BB%BD%E5%8F%AF%E9%80%89)
  - [下载新的CentOS-Base.repo 到/etc/yum.repos.d/](#%E4%B8%8B%E8%BD%BD%E6%96%B0%E7%9A%84centos-baserepo-%E5%88%B0etcyumreposd)
  - [运行yum makecache生成缓存](#%E8%BF%90%E8%A1%8Cyum-makecache%E7%94%9F%E6%88%90%E7%BC%93%E5%AD%98)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 解决yum安装下载慢的问题

### 清楚缓存
```
yum clean all
```

### 备份(可选)
```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

### 下载新的CentOS-Base.repo 到/etc/yum.repos.d/
 
CentOS 5

```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-5.repo
```

CentOS 6

```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
```
 
CentOS 7

```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

### 运行yum makecache生成缓存

```
yum makecache
```

更新
```
yum update
```
