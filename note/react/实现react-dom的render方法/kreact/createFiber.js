import {Placement} from "./utils";

export default function createFiber(vnode, returnFiber) {
  // js对象

  const fiber = {
    // 节点类型
    // 原生标签 string
    // 函数组件  函数
    // 类组件 class
    type: vnode.type,
    // id 定义当前层级下的唯一性
    key: vnode.key,
    // 属性值
    props: vnode.props,
    // 第一个子节点 fiber
    child: null,
    // 下一个兄弟节点 fiber
    sibling: null,
    // 父节点
    return: returnFiber,
    // 当前层级下的下标，记录位置
    index: 0,
    // 如果是原生标签，就是dom节点
    // 如果是类组件 就是实例
    // 函数组件 null
    stateNode: null,
    // 标记fiber节点的任务类型，比如插入、更新、删除
    flags: Placement,
  };

  return fiber;
}
