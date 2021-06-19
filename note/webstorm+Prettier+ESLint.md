<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [webstorm+Prettier+ESLint实现保存格式化代码](#webstormprettiereslint%E5%AE%9E%E7%8E%B0%E4%BF%9D%E5%AD%98%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%BB%A3%E7%A0%81)
  - [.prettierrc 根目录配置文件](#prettierrc-%E6%A0%B9%E7%9B%AE%E5%BD%95%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
  - [.eslintrc.js 根目录配置文件](#eslintrcjs-%E6%A0%B9%E7%9B%AE%E5%BD%95%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
  - [.editorconfig编辑器代码风格统一配置文件](#editorconfig%E7%BC%96%E8%BE%91%E5%99%A8%E4%BB%A3%E7%A0%81%E9%A3%8E%E6%A0%BC%E7%BB%9F%E4%B8%80%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
    - [webstorm+Prettier+ESLint参考资料](#webstormprettiereslint%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99)
    - [editorconfig参考资料](#editorconfig%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# webstorm+Prettier+ESLint实现保存格式化代码
1. 安装依赖

  ```
  npm install prettier eslint --save-dev
  or
  yarn add prettier eslint
  ```

2. 添加webstorm File Watchers

	- File” >> "Settings" >> "Tools" >> "File Watchers" >> 新建的Prettier 
    
    **填写项填入以下配置**

    ```
    Prettier
    Any
    All Places
    $ProjectFileDir$\node_modules\.bin\prettier.cmd
    --write $FilePathRelativeToProjectRoot$
    $FilePathRelativeToProjectRoot$
    $ProjectFileDir$
    ```
    
	- File” >> "Settings" >> "Tools" >> "File Watchers" >> 新建的ESLint
    
    **填写项填入以下配置**
    
    ```
    Any
    All Places
    $ProjectFileDir$\node_modules\.bin\eslint.cmd
    --fix $FilePathRelativeToProjectRoot$
    $FilePathRelativeToProjectRoot$
    $ProjectFileDir$
    ```
    
3. 关闭webstorm自动监听文件内容变化引发自动格式化保存的问题

	-	File” >> "Settings" >> "Appearance & Behavior" >> "system settings"中，取消勾掉synchronization下面的除第一个外三个选项
	```
    // 下面这行是要保留的第一个选项
    // 用来监听文件变动（比如git pull | merge后的更新），并直接更新，取消后编辑器右上角将提示reload
    // 需手动点击才会更新文件
    Synchronize files on frame or editor tab activation
    ```
    
    - Prettier 与 ESlnt在webstorm中File Watchers的配置，关闭自动监听内容变化自动保存处理
    ```
    关闭的重点地方是这个
    File” >> "Settings" >> "Tools" >> "File Watchers" >> Prettier
    
    取消勾掉：Auto-save edited files to trigger the watcher

    ESLint也是一致
    
     File” >> "Settings" >> "Tools" >> "File Watchers" >>  ESLint
    
    取消勾掉：Auto-save edited files to trigger the watcher
    ```

## .prettierrc 根目录配置文件

```
{
  "semi": false,
  "arrowParens": "always",
  "singleQuote": true
}

```

## .eslintrc.js 根目录配置文件

```
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off'
  }
}

```

## .editorconfig编辑器代码风格统一配置文件
> Webstorm 2017.1 版本之后都是自动安装这个插件的。Vscode需安装 Editorconfig 插件

###	webstorm+Prettier+ESLint参考资料
- [简书：参考资料](https://juejin.im/post/5b5dd3715188251af2570f8e)

### editorconfig参考资料
- [alloyteam：参考资料](http://www.alloyteam.com/2014/12/editor-config/)
- [简书：参考资料](https://www.jianshu.com/p/fac7dde906cc)

