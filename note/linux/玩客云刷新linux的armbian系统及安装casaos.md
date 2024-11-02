## 玩客云刷新linux的armbian系统及安装casaos

[参考bilibili视频](https://www.bilibili.com/video/BV19c411679K/?uid=42563139633431313637394B&vd_source=53a301bd6bb35fdbcea1a52265e4cf51)

刷机包都在这里

百度网盘链接: https://pan.baidu.com/s/1G55jGcc7si6xjabGOiQ4hQ?pwd=sxkn 提取码: sxkn

`刷机工具Amlogic_USB_Burning_Tool_v2.1.3`

`插线直刷包Armbian_23.05.0_需要解压一下`

`写入U盘包Armbian_23.05.0_需要解压一下`


先在window上安装刷机工具, 安装好后，用管理员身份打开运行，然后导入Armbian镜像包以.img结尾的镜像文件，上面提供的是压缩文件要先解压出来

我的是买的二手，已刷过机的，所以不用去做主板短接了，

直接用usb双公线一头接入电脑，一头接入玩客云靠近hdmi接口的那个usb

然后先用针 按压住玩客云上的reset键（电源和网口之间的小孔），再接入玩客云的电源线通电，

等玩客云的指示灯开始闪烁，松开reset键

然后看电脑上的刷机工具（烧录软件）界面上，是否出现新识别的设备，

如果出现，则说明识别成功，直接点击  开始  刷机

刷完机后，拔掉usb，拔掉电源线

先去插上网线后，再通电

然后去路由器后台，找到 onecloud 设备的 ip地址

然后用工具登录，这里推荐用 Xshell6破解免安装版 安装包也在上面的 [百度网盘链接](https://pan.baidu.com/s/1G55jGcc7si6xjabGOiQ4hQ?pwd=sxkn) 中

登录用路由上的局域网 ip地址，端口是22

初始用户及密码是  `root 和 1234`

armbian系统刚刷完时，会叫你设置root密码及新增一个用户

armbian系统修改密码
```bash
# root用户改密码
passwd root    #然后按提示输入新的密码两次

# 非root用户改密码
passwd 用户名  #然后按提示输入新的密码两次

```


安装casaos速度会很慢，可以翻个墙
```bash
# 在安装Armbian时，选择地区为亚洲-中国，时区为-北京（选了又会变为上海了，没关系都可以），
# 然后在执行以下命令时，会自动按地区时区选择国内的地址安装
wget -qO- https://get.casaos.io | sudo bash
# 或
curl -fsSL https://get.casaos.io | sudo bash

# 上面官方地址安装不了的可以试下这个
curl -fsSL https://get.icewhale.io | sudo bash
这个包比较老，可能安装不了了，优先用最上面官方的
curl -fsSL cn-get.casaos.io | bash
```
安装修改文件参考
- https://github.com/bfkjz/casaos

卸载casaos
```
casaos-uninstall
```
