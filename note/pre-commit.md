# commitlint+husky规范commit 日志

> windows 系统下, commitlint/cli 和 commitlint/config-conventional 需要全局安装, 才能正常响应 commitlint.
```
yarn add --save-dev @commitlint/config-conventional @commitlint/cli -g
yarn add --dev husky
```
## 一 需要手动创建commitlint.config.js
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat','fix','style','docs','test','refactor', 'chore', 'revert'
    ]]
  }
};
```
## 二 创建 .huskyrc
```
"hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
}
```

  **commit message的格式: 包括三个字段：type（必需）、scope（可选）和subject（必需）**
 - type: 注意冒号后面要留空格,
 - scope: 可以省略；用于说明 commit 的影响范围，比如数据层、控制层、视图层等等，视项目不同而不同
 - subject：subject 是 commit 目的的简短描述，不超过50个字符, 不能以大写字母开头，以动词开头，使用第一人称现在时，比如change，而不是changed或changes第一个字母小写，结尾不加句号（.）
    - 如：git commit -m "feat(): 添加commitlint"
   * 有一种比较特殊的情况： revert, 如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header
    - 如：revert: feat(pencil): add 'graphiteWidth' option

 **自定义规范**

 **每个规则配置分为三个主要部分: <规则名>: [{Level}, {Applicable}, {Value}].**
 * Level:
    * 0 表示不启用;
    * 1 表示启用但是会提示警告信息而不中断提交;
    * 2 表示启用并以错误信息提示, 中断提交过程
 * Applicable: always | never
 * Value: 值

| 规则名{Level} |    Applicable   |    Value    |
| :----------: | :-------------: | :---------: |
|  0 / 1 / 2   |  always / never | 值Array:如下 |

    feat: 新特性 (feature)
    fix: bug 修复
    style: 格式 (不影响代码运行的变动)
    docs: 文档
    test: 测试用例新增
    refactor: 重构
    chore：构建过程或辅助工具的变动
    revert: 回滚到上一个版本