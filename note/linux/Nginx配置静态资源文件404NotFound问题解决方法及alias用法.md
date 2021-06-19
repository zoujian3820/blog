<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Nginx配置静态资源文件404 Not Found问题解决方法](#nginx%E9%85%8D%E7%BD%AE%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%E6%96%87%E4%BB%B6404-not-found%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Nginx配置静态资源文件404 Not Found问题解决方法
> 在使用nginx做静态资源服务器时，配置完成后通过浏览器访问一直报404 Not Found错误，本人nginx配置信息如下：

```
location /images/ {  
     root /mnt/upload/files;  
}
```
所有文件存放在/mnt/upload/files

分析：

发现是配置的问题，配置静态路径有两种方式，之前配置的是直接在URL里写根目录，而现在配置是一个有前缀的URL，所以报404 Not Found错误了。

root配置会在配置的目录后跟上URL，组成对应的文件路径，即想访问的地址是：

```
https://blog.yoodb.com/images/a.png
```
nginx根据配置走的文件路径是

```
/mnt/upload/files/images/a.png
```
而我需要的是
```
/mnt/upload/files/a.png
```
而Nginx提供了另外一个静态路径配置： **alias** 配置

**官方root配置**
```
location /i/ {
    root /data/w3;
}
```
**官方alias配置**
```
location /i/ {
    alias /data/w3/images/;
}
```
当访问/i/top.gif时，root是去/data/w3/i/top.gif请求文件，alias是去/data/w3/images/top.gif请求,也就是说

root响应的路径：配置的路径+完整访问路径（完整的location配置路径+静态文件）

alias响应的路径：配置路径+静态文件（去除location中配置的路径）

**解决办法：**
```
location /images/ {  
     alias /mnt/upload/files/;  
}
```
注意：使用alias时目录名后面一定要加“/”；一般情况下，在location/中配置root，在location /*中配置alias。

