<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [填坑大集合](#%E5%A1%AB%E5%9D%91%E5%A4%A7%E9%9B%86%E5%90%88)
- [1. 微信项目在使用jssdk时，spa单页项目在ios上invalid signature天坑](#1-%E5%BE%AE%E4%BF%A1%E9%A1%B9%E7%9B%AE%E5%9C%A8%E4%BD%BF%E7%94%A8jssdk%E6%97%B6spa%E5%8D%95%E9%A1%B5%E9%A1%B9%E7%9B%AE%E5%9C%A8ios%E4%B8%8Ainvalid-signature%E5%A4%A9%E5%9D%91)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# 填坑大集合
> 工作久了总会遇到各种各样的巨坑，时间长了总会有遗忘的时候，故此开始慢慢收集平时所遇的难题和解决办法

# 1. 微信项目在使用jssdk时，spa单页项目在ios上invalid signature天坑

- IOS：微信IOS版，微信安卓版，每次切换路由，SPA的url是不会变的，发起签名请求的url参数必须是当前页面的url就是最初进入页面时的url

- Android：微信安卓版，每次切换路由，SPA的url是会变的，发起签名请求的url参数必须是当前页面的url(不是最初进入页面时的)

- **解决方案：**
- 全局存储进入SPA的url（window.entryUrl），Android不变，依旧是获取当前页面的url，IOS就使用window.entryUrl，然后签名，done！
  ```javascript
  // 记录进入app的url，后面微信sdk
  if (window.entryUrl === '') {
    window.entryUrl = location.href.split('#')[0]
  }
  // 进行签名的时候
  url: isAndroid() ? location.href.split('#')[0] : window.entryUrl
  ```
  - [参考资料](https://juejin.im/post/5a3cc5ae5188252103347221)