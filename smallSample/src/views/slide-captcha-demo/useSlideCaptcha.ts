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
  let mousedownOffsetX = 0
  const { getEle, btnCssLeft: btnleft } = prams
  const btnCssLeft = btnleft || '0px'

  function useMousedown() {
    let callbackFn: (offsetX: number) => void = () => {}
    const callback = (fn: (...args: any[]) => void) => {
      callbackFn = fn
    }
    function onmousedown(e: MouseEvent | TouchEvent) {
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

  function onmousemove(e: MouseEvent | TouchEvent) {
    if (mousedownOffsetX) {
      const { imgbox, imgblock, button } = getEle()
      const { width: imgboxWidth } = imgbox.getBoundingClientRect()
      const { width: imgblockWidth } = imgblock.getBoundingClientRect()
      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
      let moveX = clientX - mousedownOffsetX
      // 边界判断
      if (moveX < parseInt(unref(btnCssLeft))) {
        moveX = parseInt(unref(btnCssLeft))
      } else if (moveX > imgboxWidth - imgblockWidth) {
        moveX = imgboxWidth - imgblockWidth
      }

      setImgblockTransformX(moveX < 0 ? 0 : moveX)
      button.style.transform = `translate3d(${moveX}px, 0, 0)`
    }
  }

  function useMouseup() {
    let callbackFn: (status: boolean) => void = () => {}
    function callback(fn: (...args: any[]) => void) {
      callbackFn = fn
    }
    function onmouseup() {
      if (mousedownOffsetX) {
        const { imgblock, imggap } = getEle()
        const { left: imgboxLeft } = imgblock.getBoundingClientRect()
        const { left: imggapLeft } = imggap.getBoundingClientRect()

        mousedownOffsetX = 0
        // 校验拖动的图片，是否刚好和需要填补的图片缺口重合
        const diffLeft = imggapLeft - imgboxLeft
        if (diffLeft < 5 && diffLeft > -5) {
          // 校验通过
          callbackFn(true)
        } else {
          // 校验失败
          setImgblockTransformX(0)
          callbackFn(false)
        }
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
