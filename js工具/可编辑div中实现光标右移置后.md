<!--
 * @Author: mrzou
 * @Date: 2021-08-18 11:05:39
 * @LastEditors: mrzou
 * @LastEditTime: 2021-08-18 11:08:54
 * @Description: file content
-->

```html
<style>
  .box {
    width: 200px;
    border: 1px solid red;
    height: 30px;
    outline: none;
  }
</style>
<div class="box" contenteditable="true"></div>

<script>
  document.querySelector(".box").addEventListener("input", (e) => {
    const val = e.target.textContent;
    // 模似限制 最多输入 5个字符
    if (val.length > 5) {
      e.target.textContent = "";
      e.target.textContent = val.slice(0, 5);
    }
    cursorBack(e.target);
  });

  function cursorBack(obj) {
    if (window.getSelection) {
      //ie11 10 9 ff safari
      obj.focus(); //解决ff不获取焦点无法定位问题
      var range = window.getSelection(); //创建range
      range.selectAllChildren(obj); //range 选择obj下所有子内容
      range.collapseToEnd(); //光标移至最后
    } else if (document.selection) {
      //ie10 9 8 7 6 5
      var range = document.selection.createRange(); //创建选择对象
      //var range = document.body.createTextRange();
      range.moveToElementText(obj); //range定位到obj
      range.collapse(false); //光标移至最后
      range.select();
    }
  }
</script>
```
