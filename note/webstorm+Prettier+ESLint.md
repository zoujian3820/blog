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

	-	File” >> "Settings" >> "Appearance & Behavior" >> "system settings"中，取消勾掉synchronization下面的四个选项
    
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

###	[参考资料](https://juejin.im/post/5b5dd3715188251af2570f8e)