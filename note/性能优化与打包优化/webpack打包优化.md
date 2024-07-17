## webpack打包优化
webpack-bundle-analyzer可生成依赖分析

dllPlugin缓存第三方依赖打包，避免重复打包

使用cache-loader缓存已加载的模块

配置externals使用cdn替换第三方依赖

resolve.alias加快查找数度

使用import导入加/* chunkName: xxx, webpackPrefetch：true */魔法注释，实现组件、模块按需懒加载，配合link标签prefetch做组件预加载
```js
async function getComponent(){
    const { default: _} = await import(/* webpackChunkName: "lodash", webpackPrefetch: true */ 'lodash')
    const element = document.createElement('div')
    element.innerHTML = _.join(['a','b'],'-')
    return element
}
// 正常情况触发点击时，才去加载 lodash 模块, 但设置了 webpackPrefetch: true，会在网络空闲的时候先去加载
document.addEventListener('click', ()=>{
    getComponent().then(element => {
        document.body.appendChild(element)
    })

    handleClick()
})

function handleClick() {
  //使用魔法注释/*webpackPrefetch:true*/，可以在网络空闲的时候去加载click.js，而不是必须要等调用handleClick的时候才去加载
  return import(/*webpackPrefetch:true*/'./click.js').then((clickJs) => {
    console.log('click.js loaded', clickJs)
  })
}

// 怎么查看代码利用率
// mac: command+shift+p 
// win: ctrl+shift+p  快捷键 打开命令行，输入coverage，可以看到各个文件的代码利用率。
```

使用thread-loader开启多进程打包

uglify插件在做代码压缩时可以开启多进程

去除非必要的loader，减少文件的处理操作

exclude/include配置loader要处理哪些文件，排除哪些文件

如非必须，关闭source-map

如果开发和提交的代码都做过ts的tsc检查，可以考虑在build时关闭检查，加快打包速度

使用splitChunks拆分依赖包

webpack的sideEffects设为false开启tree-shaking优化

配置noParse避免模块被webpack打解析，而直接接打包
```js
module.exports = {
module: { noParse: /jquery|lodash/ }
};
```
