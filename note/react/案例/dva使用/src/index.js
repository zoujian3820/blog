/*
 * @Author: mrzou
 * @Date: 2021-07-13 09:22:23
 * @LastEditors: mrzou
 * @LastEditTime: 2021-08-18 09:58:15
 * @Description: file content
 */
import dva from "dva";
import "./index.css";

// 1. Initialize
const createHistory = require("history").createBrowserHistory;

export const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model 注册model
// example 页面的 model为一进来就加载，此种方式，如果页面很多，一次性都加载
// 会影响首屏加载及性能，且多余，有的角色可能都没权限访问这些个页面
app.model(require("./models/example").default);
// user页面的组件 和 model我要做成动态 按需载入（访问这个页面时，才加载），所以放入了 dynamic 中
// 并将 Route 的component 换成 dynamic 包装 过的 UserPageDynamic
// app.model(require("./models/user").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");

console.log("app", app); //sy-log
