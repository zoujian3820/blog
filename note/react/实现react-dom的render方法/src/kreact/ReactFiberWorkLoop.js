/*
 * @Author: mrzou
 * @Date: 2021-07-10 19:33:00
 * @LastEditors: mrzou
 * @LastEditTime: 2021-07-11 20:56:02
 * @Description: file content
 */
import {
  updateFunctionComponent,
  updateHostComponent,
  updateFragmentComponent,
} from "./ReactFiberReconciler";
import { isFn, isStr } from "./utils";

// work in progress 正在工作当中的
let wipRoot = null;
// 下一个要更新的任务
let nextUnitOfWork = null;
// 更新vnode
export function scheduleUpdateOnFiber(fiber) {
  wipRoot = fiber;
  wipRoot.sibling = null;
  nextUnitOfWork = wipRoot;
  console.log(wipRoot, '根节点：wipRoot')
}

function performUnitOfWork(wip) {
  // 1. 更新自己
  // 组件类型 原生标签 函数组件 类组件 等
  const { type } = wip;
  if (isStr(type)) {
    // 如果type是字符串  则是原生标签节点
    updateHostComponent(wip);
  } else if (isFn(type)) {
    // 如果是函数 则是组件 （类组件和函数组件都是 函数）
    updateFunctionComponent(wip);
  } else {
    // 否则是Fragment分片 虚拟根节点
    updateFragmentComponent(wip);
  }

  // todo
  // 2. 返回下一个任务
  // 深度优先 同层比较
  if (wip.child) {
    // 有子节点 优先返回子节点 此处的子节点 为第一个子节点
    // 再往后的子节点 通过 sibling 找第一个子节点的 兄弟节点
    return wip.child;
  }

  while (wip) {
    // 上面要是没有子节点  则找兄弟节点 并反回兄弟节点
    if (wip.sibling) {
      return wip.sibling;
    }
    // 如果兄弟节点也没有，则反回父节点，并通过父节点找叔辈节点
    // 最后找完到祖节点
    wip = wip.return;
  }
  // 如没有节点了，则反回null
  return null;
}

function workLoop(IdleDeadline) {
  // 有待更新的任务 并且浏览器目前有空闲时间 即时间大于0
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
    // 更新当前fiber节点 并获取下一个节点  如果还有节点，则继续返回执行下去
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 最后没有要更新的任务了，并且根节点还在 则提交
  if (!nextUnitOfWork && wipRoot) {
    // commit
    commitRoot();
  }
}

// 使用了浏览器的任务调度，当浏览器空闲时，才执行
requestIdleCallback(workLoop);

// commit vnode 也就是同步vnode到node
function commitRoot() {
  console.log(wipRoot.child, 'vv')
  commitWorker(wipRoot.child);
}

function commitWorker(wip) {
  // 节点不存在就中断
  if (!wip) {
    return;
  }
  // 1. commit自己
  // todo
  // node->container
  const { stateNode } = wip;
  // parentNode //父dom节点
  let parentNode = getParentNode(wip); //wip.return.stateNode;
  // stateNode： 
  // 如果是原生标签，就是dom节点
  // 如果是类组件 就是实例
  // 函数组件 null

  // 此时我们 只写了原生标签和函数组件，没考虑类组件 
  // 所以此时 stateNode 为dom 直接找到父节点 直接 appendChild就行
  if (stateNode) {
    parentNode.appendChild(stateNode);
  }
  // 2. 接着递归 commit孩子 第一个子 filber节点
  commitWorker(wip.child);
  // 2. 递归commit兄弟
  commitWorker(wip.sibling);
}

function getParentNode(wip) {
  let parent = wip.return;
  while (parent) {
    if (parent.stateNode) {
      return parent.stateNode;
    }
    // 函数组件stateNode为nul
    // 而在更新到页面中时，函数组件内部的子节点dom的真实父节点
    // 应该为函数组件有真实dom的父级
    // 如下 FunctionComponent 内部的元素的父级应该为 div
    // 所要递归往上找，直到找到 有 stateNode 值的父节点 或祖父节点

    // <div className="border">
    //   <h1>全栈</h1>
    //   <a href="https://www.kaikeba.com/">kkb</a>
    //   <FunctionComponent name="function" />
    // </div>
    parent = parent.return;
  }
}
