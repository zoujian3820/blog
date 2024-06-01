module.exports = {
  plugins: {
    // 针对插件的兼容配置
    autoprefixer: {
      //css兼容前缀
      overrideBrowserslist: [
        "Android 4.1",
        "ios 7.1",
        "Chrome >31",
        "not ie <=11", //不考虑IE浏览器
        "ff >= 30", //仅新版本用'ff >= 30
        ">1%", //全球统计有超过1%的使用了使用'> 1%'
        "last 2 version", //所有主流浏览器最近2个版本
      ],
      grid: true, //开启grid布局的兼容（浏览器IE除外其它都能兼容grid，可以关闭开启）
    },
  },
};
