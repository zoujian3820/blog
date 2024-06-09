## 页面可见性api
常用的api有
- `document.hidden`
- `document.visibilityState`
- `visibilitychange`事件

使用情景 
- 页面不可见时，可以暂停动画或停止播放声音, 可见时，可以恢复动画或继续播放声音
- 网站有图片轮播效果，只有在用户观看轮播的时候，才会自动展示下一张幻灯片
- 应用程序不希望在页面不可见时轮询服务器进行更新。
- 切换tab时立即更新最新数据，间接处理tab间通信
 


### document.hidden
`document.hidden` 属性返回一个布尔值，表示页面是否可见。如果页面被最小化或浏览器最小化，则返回 true。

### visibilityState
`document.visibilityState` 属性返回一个字符串，表示页面当前的可见状态。该属性可以取以下值。

- `"visible"`：页面可见。
- `"hidden"`：页面不可见，但可预览。比如用户切换到其他标签页。
- `"prerender"`：页面正在加载，尚未可见。
- `"unloaded"`：页面即将卸载，但仍然可见。

### visibilitychange事件
`visibilitychange` 事件在页面可见性的属性发生变化时触发。

```js
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // 页面不可见
     audio.pause();
  } else {
    // 页面可见
     audio.play();
  }

  // 页面可见时
  if (document.visibilityState === 'visible') {
    // location.reload();
     document.title = '页面可见了';
  }
  // 页面不可见，切到其他tab了
  if (document.visibilityState === 'hidden') {
    document.title = '页面不可见了';
  }

  // 页面不可见时，可以暂停动画或停止播放声音
  if (document.hidden) {
    // 暂停动画或停止播放声音
  }

  // 页面可见时，可以恢复动画或继续播放声音
  if (document.visibilityState === 'visible') {
    // 恢复动画或继续播放声音
  }
});
```

### pageVisibility
`pageVisibility` 是一个第三方库，用于检测页面的可见性。

```js
import pageVisibility from 'page-visibility';

pageVisibility.visibilityChange(function() {
  if (pageVisibility.isHidden()) {
    // 页面不可见
  } else {
    // 页面可见
  }
});
```

 