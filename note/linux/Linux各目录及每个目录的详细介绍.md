<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Linux各目录及每个目录的详细介绍](#linux%E5%90%84%E7%9B%AE%E5%BD%95%E5%8F%8A%E6%AF%8F%E4%B8%AA%E7%9B%AE%E5%BD%95%E7%9A%84%E8%AF%A6%E7%BB%86%E4%BB%8B%E7%BB%8D)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Linux各目录及每个目录的详细介绍
> 参考资料 https://www.cnblogs.com/zhuchenglin/p/8686924.html

|   目录   |  注释  |
|:-------- |:------|
|/bin| 存放二进制可执行文件(ls,cat,mkdir等)，常用命令一般都在这里。|
|/etc| 存放系统管理和配置文件 |
|/home| 存放所有用户文件的根目录，是用户主目录的基点，比如用户user的主目录就是/home/user，可以用~user表示 |
|/usr| 用于存放系统应用程序，比较重要的目录/usr/local 本地系统管理员软件安装目录（安装系统级的应用）。这是最庞大的目录，要用到的应用程序和文件几乎都在这个目录。|
|/usr/x11r6| 存放x window的目录 |
|/usr/bin| 众多的应用程序 |
|/usr/sbin| 超级用户的一些管理程序  |
|/usr/doc| linux文档 |
|/usr/include| linux下开发和编译应用程序所需要的头文件 |  
|/usr/lib| 常用的动态链接库和软件包的配置文件 |  
|/usr/man| 帮助文档 |  
|/usr/src| 源代码，linux内核的源代码就放在/usr/src/linux里 |  
|/usr/local/bin| 本地增加的命令 |  
|/usr/local/lib| 本地增加的库 |
|/opt| 额外安装的可选应用程序包所放置的位置。一般情况下，我们可以把tomcat等都安装到这里。|
|/proc| 虚拟文件系统目录，是系统内存的映射。可直接访问这个目录来获取系统信息。|
|/root| 超级用户（系统管理员）的主目录（特权阶级^o^）|
|/sbin| 存放二进制可执行文件，只有root才能访问。这里存放的是系统管理员使用的系统级别的管理命令和程序。如ifconfig等。|
|/dev| 用于存放设备文件。|
|/mnt| 系统管理员安装临时文件系统的安装点，系统提供这个目录是让用户临时挂载其他的文件系统。|
|/boot| 存放用于系统引导时使用的各种文件|
|/lib| 存放跟文件系统中的程序运行所需要的共享库及内核模块。共享库又叫动态链接共享库，作用类似windows里的.dll文件，存放了根文件系统程序运行所需的共享文件。|
|/tmp| 用于存放各种临时文件，是公用的临时文件存储点。|
|/var| 用于存放运行时需要改变数据的文件，也是某些大文件的溢出区，比方说各种服务的日志文件（系统启动日志等。）等。|
|/lost+found| 这个目录平时是空的，系统非正常关机而留下“无家可归”的文件（windows下叫什么.chk）就在这里|
