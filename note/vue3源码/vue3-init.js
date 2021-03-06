/*
 * @Author: mrzou
 * @Date: 2021-04-21 20:29:55
 * @LastEditors: mrzou
 * @LastEditTime: 2021-06-23 00:31:15
 * @Description: file content
 */

// createAppApi
const createAppApi = (render) => {
  return function createApp(rootComponent) {
    const app = {
      mount(rootContainer) {
        // 1. vnode
        const vnode = {
          tag: rootComponent
        }
        // 2. render
        render(vnode, rootContainer)
      }
    }
    return app
  }
}

// 创建 renderer
const createRenderer = ({ querySelector, createElement, insert }) => {
  const render = (vnode, container) => {
    patch(container._vnode || null, vnode, container)
    container._vnode = vnode
  }
  const patch = (n1, n2, container) => {
    // 根组件配置
    const rootComponent = n2.tag
    const ctx = rootComponent.data()
    const vnode = rootComponent.render.call(ctx)

    // vnode => dom
    const parent = querySelector(container)
    const child = createElement(vnode.tag)
    //  children
    if (typeof vnode.children === 'string') {
      child.textContent = vnode.children
    } else {
      // todo
    }
    insert(child, parent)
  }
  return {
    render,
    createApp: createAppApi(render)
  }
}

// render
const renderer = createRenderer({
  querySelector(sel) {
    return document.querySelector(sel)
  },
  createElement(tag) {
    return document.createElement(tag)
  },
  insert(child, parent) {
    parent.appendChild(child)
  }
})

const Vue = {
  createApp(options) {
    return renderer.createApp(options)
  }
}

Vue.createApp({
  data() {
    return {
      counter: 0
    }
  },
  render() {
    return {
      tag: 'p',
      children: this.counter + ''
    }
  }
}).mount('#app')

