import { Ref, unref } from 'vue'

export type GetEleObj = {
  // slider: HTMLBodyElement
  imgbox: HTMLBodyElement
  imgblock: HTMLBodyElement
  imggap: HTMLBodyElement
  button: HTMLBodyElement
}

export default function useSlideCaptcha(prams: {
  getEle: () => GetEleObj
  btnCssLeft?: Ref<string> | string
}) {
  let startTime = 0
  let mousedownOffsetX = 0
  const { getEle, btnCssLeft: btnleft } = prams
  const btnCssLeft = btnleft || '0px'

  function useMousedown() {
    let callbackFn: (offsetX: number) => void = () => {}
    const callback = (fn: (...args: any[]) => void) => {
      callbackFn = fn
    }
    function onmousedown(e: MouseEvent | TouchEvent) {
      // 记录鼠标按下时的时间
      startTime = Date.now()
      // 记录鼠标按下时的位置
      mousedownOffsetX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
      callbackFn(mousedownOffsetX)
    }
    return {
      onmousedown,
      callback
    }
  }

  function setImgblockTransformX(moveX: number) {
    const { imgblock } = getEle()
    const oldTransform = imgblock.style.transform
      ? imgblock.style.transform.split('translateX')[0]
      : ''
    imgblock.style.transform = `${oldTransform} translateX(${moveX}px)`
  }

  function handlerMove(e: MouseEvent | TouchEvent, isEnd: boolean = false) {
    const { imgbox, imgblock, button } = getEle()
    const { width: imgboxWidth } = imgbox.getBoundingClientRect()
    const { width: imgblockWidth } = imgblock.getBoundingClientRect()
    const clientX =
      e instanceof MouseEvent
        ? e.clientX
        : isEnd
        ? e.changedTouches[0].clientX
        : e.touches[0].clientX
    let moveX = clientX - mousedownOffsetX
    // 边界判断
    if (moveX < parseInt(unref(btnCssLeft))) {
      moveX = parseInt(unref(btnCssLeft))
    } else if (moveX > imgboxWidth - imgblockWidth) {
      moveX = imgboxWidth - imgblockWidth
    }
    const imgMoveX = moveX < 0 ? 0 : moveX
    setImgblockTransformX(imgMoveX)
    button.style.transform = `translate3d(${moveX}px, 0, 0)`

    return imgMoveX
  }

  function onmousemove(e: MouseEvent | TouchEvent) {
    if (mousedownOffsetX) {
      handlerMove(e)
    }
  }

  function useMouseup() {
    let callbackFn: (moveX: number, diffTime: number) => Promise<boolean> = () =>
      Promise.resolve(false)
    function callback(fn: (...args: any[]) => Promise<boolean>) {
      callbackFn = fn
    }
    async function onmouseup(e: MouseEvent | TouchEvent) {
      if (mousedownOffsetX) {
        const moveX = handlerMove(e, true)
        // 传数据给后台，校验拖动的图片，是否刚好和需要填补的图片缺口重合，滑动速度是否正常
        // 参数 1、滑动图片X轴的距离，2、滑动速度(或者直接把差异时间传给后台，后台计算速度)
        const diffTime = Date.now() - startTime
        // const speed = imgblockX / diffTime // 计算滑动速度, px/ms
        startTime = 0
        mousedownOffsetX = 0
        !(await callbackFn(moveX, diffTime)) && setImgblockTransformX(0) // 校验失败，则把拖动图片X轴回归到0
      }
    }
    return {
      onmouseup,
      callback
    }
  }

  return {
    onmousemove,
    useMouseup,
    useMousedown
  }
}
