<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [升级package.json中所有依赖的版本](#%E5%8D%87%E7%BA%A7packagejson%E4%B8%AD%E6%89%80%E6%9C%89%E4%BE%9D%E8%B5%96%E7%9A%84%E7%89%88%E6%9C%AC)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### 升级package.json中所有依赖的版本
- 安装 ncu
  ```bash
  npm install -g npm-check-updates
  ```
- 检查是否安装成功
  ```bash
  ncu -V
  ```
- 检查项目依赖的最新版本
  ```bash
  npm-check-updates 或用简写 ncu
  ```
- 一键更新package.json中所有依赖到最新版本
  ```bash
  ncu -u
  ```
