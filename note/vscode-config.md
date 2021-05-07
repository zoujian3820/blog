<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [使用 Settings Sync 插件，把 vscode 插件等配置保存在 GitHub 上](#%E4%BD%BF%E7%94%A8-settings-sync-%E6%8F%92%E4%BB%B6%E6%8A%8A-vscode-%E6%8F%92%E4%BB%B6%E7%AD%89%E9%85%8D%E7%BD%AE%E4%BF%9D%E5%AD%98%E5%9C%A8-github-%E4%B8%8A)
- [插件推荐](#%E6%8F%92%E4%BB%B6%E6%8E%A8%E8%8D%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: your name
 * @Date: 2021-04-02 10:59:23
 * @LastEditTime: 2021-04-02 15:22:53
 * @LastEditors: mrzou
 * @Description: In User Settings Edit
 * @FilePath: \blog\note\vscode-config.md
-->
## 使用 Settings Sync 插件，把 vscode 插件等配置保存在 GitHub 上
- 参考资料 https://blog.csdn.net/mrsyf/article/details/106184967
- vscode 中搜索 Settings Sync 并下载安装
- gitHub 设置里找到开发者设置

  ```mermaid
  graph TB
    my[我的]
    sets[Settings]
    devSet[Developer settings]
    perAc[Personal access tokens]
    genNewToken[Generate new token]
    noteName[Note:取个名字]
    rdioGist[勾选 gist]
    genToken[Generate token]

    my --> sets --> devSet --> perAc --> genNewToken --> noteName --> rdioGist --> genToken

  ```

- 1 记下 刚生成的 GitHub token
- 2 ctrl（Mac 是 command） + shift + p
- 3 输入 Sync: Advanced Options

  ![token](../images/vscode/SyncAdvancedOptions.png)
- 4 Sync:编辑扩展本地配置

  ![token](../images/vscode/SyncAdvancedOptionsJson.png)
- 5 找到配置文件中 token 字段，并填写成记下的 token

  ![token](../images/vscode/sync-setting-token.png)
- 6 ctrl + shift + p 选择 Sync: Upload / Update Settings (上传本地的配置)
- 7 记下生成的 gist id
- 8 忘记了 gist id 可以在 GitHub gist 这里查看

  ```mermaid
  graph TB
  my[我的]
  yourGists[Your gists]
  allGists[See all of your gists]
  openFile[打开settings.json文件]
  gtoken[找到sync.gist字段]
  my --> yourGists --> allGists --> openFile --> gtoken

  ```

- 其他电脑要下载本配置时
  - 安装 Settings Sync 插件，并重启
  - 重复第 4 到 5 步, 配置 token
  - 配置gist id

    ![gist id](../images/vscode/sync-setting-gist-id.png)
  - 重复第 2 步
  - 输入 sync，点击 Sync: Download Settings（下载配置到 vscode）
  - 没登录关联 github，会打开提示页面，点登录
    - 输入 sync，点击 Sync: Download Settings（下载配置到 vscode）
    - 开始下载配置，完成
  - 已登录过 - 开始下载配置，完成

## 插件推荐

- 参考资料https://www.imooc.com/article/39349
- 自动添加header信息插件koroFileHeader
  - 创建新文件时，会在顶部自动生成一些信息，如Author Date LastEditTime
- 非常好用的图片压缩插件tinyPng
  - 官网地址注册地址https://tinypng.com/developers
  - 需配置api key才使用
  
    ![gist id](../images/vscode/tinypng.png)
  - 使用方法
    - 压缩一个文件夹的图片

      ![压缩一个文件夹的图片](../images/vscode/tinypng-compress-images.png)
    - 压缩单个的图片

      ![压缩单个的图片](../images/vscode/tinypng-compress-file.png)
