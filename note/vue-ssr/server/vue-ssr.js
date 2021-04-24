/*
 * @Author: mrzou
 * @Date: 2021-04-24 18:07:31
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-24 19:07:36
 * @Description: file content
 */
const Vue = require("vue");
const express = require("express");
// 获取渲染器实例
const { createRenderer } = require("vue-server-renderer");
const renderer = createRenderer();
const server = express();

server.get("/ssr", async (req, res) => {
  const app = new Vue({
    template: `
      <div>
        <div>性名：{{name}}</div>
        <div>年龄：{{age}}</div>
      </div>
    `,
    data() {
      return {
        name: "mrrrr",
        age: "18",
      };
    },
  });

  // #region
  // renderer
  //   .renderToString(app)
  //   .then((html) => {
  //     // 把获取到的html字符串返回，html已经过Vue的数据填充
  //     res.send(html);
  //   })
  //   .catch((err) => {
  //     res.status(500);
  //     res.send("server error 500");
  //     console.log(err);
  //   });
  // #endregion

  try {
    const html = await renderer.renderToString(app);
    res.send(html);
  } catch (err) {
    console.log(err);
    res.status(500).send("服务器内部错误500");
  }
});

server.listen(80, () => {
  console.log("server runing...");
});
