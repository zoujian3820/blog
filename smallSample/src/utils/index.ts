// 动态导入js
export function importJs(url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url

    // 清理函数
    // const cleanup = () => {
    //   script.onload = null
    //   script.onerror = null
    //   document.head.removeChild(script)
    // }

    // 设置onload和onerror事件处理器
    script.onload = (e) => {
      resolve(e)
    }
    script.onerror = (error) => {
      reject(error)
    }

    // 将script添加到head中
    document.head.appendChild(script)
  })
}
