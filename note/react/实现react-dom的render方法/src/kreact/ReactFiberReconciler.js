/*
 * @Author: mrzou
 * @Date: 2021-07-10 19:33:00
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-11 20:53:43
 * @Description: file content
 */
import { isArray, isStringOrNumber, updateNode } from "./utils";
import createFiber from "./createFiber";

export function updateHostComponent(wip) {
  // 初次渲染 创建dom节点, 除了根节点，初始化有stateNode 其他的节点都没有
  // 更新 不创建dom节点
  if (!wip.stateNode) {
    console.log(wip.stateNode, 'g--g', wip)

    wip.stateNode = document.createElement(wip.type);
    // 更新当前节点属性
    updateNode(wip.stateNode, wip.props);
  }

  // 协调子节点 react-dom中fiberRoot配置了 props: {children: vnode}  通过 props.children 可以获取到
  reconcileChildren(wip, wip.props.children);
}

export function updateFunctionComponent(wip) {
  // 此时的函数组件 在jsx 通过React.createElement函数 转换成虚拟dom后
  // 对象树上已经包含有 type 和 props 且props中的值已经被解析出来
  // type 就是 函数组件本身，执行返回 子节点
  // 所以 此时把 props 当参数传入
  const { type, props } = wip;
  const children = type(props);
  reconcileChildren(wip, children);
}

export function updateFragmentComponent(wip) {
  const { props } = wip;
  reconcileChildren(wip, props.children);
}
// 1. 更新自己
// 2. 协调子节点

function reconcileChildren(returnFiber, children) {
  // 如果子节点是文本（字符串或数字） 则不往下走 不创建filber
  if (isStringOrNumber(children)) {
    return;
  }

  const newChildren = isArray(children) ? children : [children];

  // 保存当前的 filber节点，方便后面挂载 下一个兄弟节点
  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    // 遍历获取到的子节点
    const newChild = newChildren[i];
    // 给获取到的子节点 创建 filber节点 传入当前节点  和 父filber节点
    const newFiber = createFiber(newChild, returnFiber);
    // previousNewFiber为null 则表示是第一个子节点
    if (previousNewFiber === null) {
      // 然后在其 父filber 节点上放一个child属性 存放第一个子 filber节点
      returnFiber.child = newFiber;
    } else {
      // previousNewFiber不为null时 则是下一个兄弟节点了 
      // 则在给上一个 filber 放一个 sibling 属性 用来存放下一个兄弟filber节点
      previousNewFiber.sibling = newFiber;
    }
    // 赋值当前的filerBer节点给 previousNewFiber
    // 更新后的 previousNewFiber 节点方便 下次遍历时，给上一步 更新 sibling
    previousNewFiber = newFiber;
  }
}
