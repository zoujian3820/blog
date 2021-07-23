<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [grid 布局](#grid-%E5%B8%83%E5%B1%80)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: mrzou
 * @Date: 2021-06-01 22:08:07
 * @LastEditors: mrzou
 * @LastEditTime: 2021-06-01 22:23:06
 * @Description: file content
-->

### grid 布局

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      .container {
        width: 320px;
        margin: 0 auto;
      }
      .table {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        row-gap: 5px;
        column-gap: 5px;
        grid-template-rows: 48px minmax(48px, auto) 80px;
        border: 5px solid green;
        background: blue;
        margin-top: 10px;
        font-size: 16px;
      }
      .table > div {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
      }
      .table .span5 {
        grid-column-start: 5 span;
        justify-content: flex-end;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="table">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
        <div class="item">6</div>
        <div class="item">7</div>
        <div class="item">8</div>
        <div class="item">9</div>
        <div class="item">10</div>
        <div class="span5">高80px</div>
      </div>
    </div>
  </body>
</html>
```
