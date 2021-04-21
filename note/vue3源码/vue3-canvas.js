/*
 * @Author: mrzou
 * @Date: 2021-04-22 00:20:14
 * @LastEditors: mrzou
 * @LastEditTime: 2021-04-22 00:20:15
 * @Description: file content
 */
const { createApp, createRenderer } = Vue;

// 参数就是对画布的操作
const renderer = createRenderer({
  nextSibling(child) {
    draw(child);
  },
  parentNode() {
    return {};
  },
  createElement(tag) {
    // 创建元素时，由于没有需要创建的dom元素，只需返回元素数据对象
    return { tag };
  },
  insert(child, parent) {
    // 我们重写了insert逻辑，因为我们canvasApp中不存在实际 dom插入操作
    // 这里面只需要将元素之间的父子关系保存一下即可
    // child.parent = parent
    // if(!parent.childs) {
    //     parent.childs = [child]
    // } else {
    //     parent.childs.push(child)
    // }
    // 只有canvas有nodeType 这里就是开始绘制内容到canvas
    if (parent.nodeType === 1) {
      draw(child);
    }
  },
  // 属性更新
  patchProp(el, key, prevValue, nextValue) {
    // 往数据对象上追加属性
    // el就是上面createElement返回的对象
    el[key] = nextValue;
  },
});

const draw = (el, noClear) => {
  if (!noClear) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  if (el.tag == "bar-chart") {
    const { data } = el;
    const barWidth = canvas.width / 10;
    const gap = 20;
    const paddingLeft = (data.length * barWidth + (data.length - 1) * gap) / 2;
    const paddingBottom = 10;

    // x轴
    // 柱状图
    data.forEach(({ title, count, color }, index) => {
      const x = paddingLeft + index * (barWidth + gap);
      const y = canvas.height - paddingBottom - count;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth, count);
      // text
    });
    // 递归绘制子节点
    el.childs &&
      el.childs.forEach((child) => {
        return draw(child, true);
      });
  }
};

//保存画布和上下文
let ctx = null;
let canvas = null;
// 扩展mount， 首先创建一个画元素
function createCanvasApp(App) {
  // 默认app创建
  const app = renderer.createApp(App);
  // 额外创建一个画布
  const mount = app.mount;
  app.mount = function (sel) {
    // 画布创建
    canvas = document.createElement("canvas");
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    document.querySelector(sel).appendChild(canvas);
    ctx = canvas.getContext("2d");
    // 默认挂载行为
    mount(canvas);
  };
  return app;
}
// 创建app实例
createCanvasApp({
  template: '<bar-chart :data="charData"></bar-chart>',
  data() {
    return {
      charData: [
        { title: "青铜", count: 200, color: "brown" },
        { title: "钻石", count: 300, color: "skyblue" },
        { title: "星耀", count: 100, color: "purple" },
        { title: "王者", count: 50, color: "gold" },
      ],
    };
  },
  mounted() {
    const setTime = () => {
      setTimeout(() => {
        const count =
          Math.random() * 100 + Math.random() * 200 + Math.random() * 300 + 50;
        const Random = Math.floor(
          (Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)) / 2
        );
        const title = [
          "王者",
          "五八",
          "王炸",
          "天下",
          "混元",
          "洒呀",
          "摩卡",
          "瑞信",
          "欧巴",
          "灭霸",
        ][Random];
        const color = [
          "red",
          "blue",
          "yellow",
          "gray",
          "green",
          "black",
          "#470b0b",
          "#1b30a6",
          "#ffeb3b",
          "#00bcd4",
        ][Random];
        console.log(Random);
        this.charData.pop();
        this.charData.push({ title, count, color });
        setTime();
      }, 2000); // Math.random() * 3000 + 2000);
    };
    setTime();
  },
}).mount("#app");
