<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JS 继承方式](#js-%E7%BB%A7%E6%89%BF%E6%96%B9%E5%BC%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-08-17 16:50:01
 * @LastEditors: mrzou
 * @LastEditTime: 2021-08-17 16:50:30
 * @Description: file content
-->

# JS 继承方式
```js
// 普通会员构造函数
function User(username, password) {
  this.username = username;
  this.password = password;
}

User.prototype.playFreeVideo = function() {
 console.log('观看免费视频，带广告');
};
// Vip会员构造函数
function VipUser(username, password, expires) {
  User.call(this, username, password);
  this.expires = expires
}
VipUser.prototype = Object.create(User.prototype);
VipUser.prototype.constructor = VipUser;

VipUser.prototype.playPayVideo = function() {
  console.log('观看付费视频');
}

var vipUser = new VipUser('汤猫', '123456', '2021-08-17');
vipUser.playFreeVideo();
```

```js
// 普通会员构造函数
function User(username, password) {
  this.username = username;
  this.password = password;
}

User.prototype.playFreeVideo = function(...args) {
 console.log('观看免费视频，带广告', ...args);
};
// Vip会员构造函数
function VipUser(username, password, expires) {
  User.call(this, username, password);
  this.expires = expires
}
// 完成原型上的变化
Object.setPrototypeOf(VipUser.prototype, User.prototype);

VipUser.prototype.playPayVideo = function() {
  console.log('观看付费视频');
}

const userPlayFreeVideo = VipUser.prototype.playFreeVideo
VipUser.prototype.playFreeVideo = function(...args) {
  userPlayFreeVideo(...args)
  console.log('vip用户观看免费视频，去除广告');
}


var vipUser = new VipUser('汤猫', '123456', '2021-08-17');
vipUser.playFreeVideo();
```
