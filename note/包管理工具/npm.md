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
