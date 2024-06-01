import { ref, Ref, onMounted, onUnmounted } from 'vue'

type BALL = {
  show: boolean
  clickEl?: HTMLBodyElement
}

function createBalls(BALL_LEN: number) {
  const balls = []
  for (let i = 0; i < BALL_LEN; i++) {
    balls.push({ show: false })
  }
  return balls
}

type useBallParams = {
  ballLen?: number
  innerCls?: string
  ballWidth?: number
  ballHeight?: number
  ballLeft?: number
  ballBottom?: number
  // 可传入一个css选择器，或者一个元素ref
  ballEle?: string | Ref<Element>
}

export default function useBall(args: useBallParams = {}) {
  const ballLen = args.ballLen || 10
  const innerCls = args.innerCls || 'inner-hook'
  let ballWidth = args.ballWidth || 0
  let ballHeight = args.ballHeight || 0
  let ballLeft = args.ballLeft || 0
  let ballBottom = args.ballBottom || 0

  function getBallInfo() {
    if (args.ballEle) {
      if (typeof args.ballEle === 'string') {
        const ballEle = document.querySelector(args.ballEle) as HTMLBodyElement
        if (ballEle) {
          const rect = ballEle.getBoundingClientRect()
          ballWidth = rect.width
          ballHeight = rect.height
          ballLeft = rect.left
          ballBottom = window.innerHeight - rect.bottom
        }
      } else if (args.ballEle.value instanceof Element) {
        const rect = args.ballEle.value.getBoundingClientRect()
        ballWidth = rect.width
        ballHeight = rect.height
        ballLeft = rect.left
        ballBottom = window.innerHeight - rect.bottom
      }
    }
  }

  onMounted(() => {
    getBallInfo()
    window.addEventListener('resize', getBallInfo)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', getBallInfo)
  })

  const dropBalls: BALL[] = []
  const balls = ref<BALL[]>(createBalls(ballLen))

  const drop = (clickEl: Element) => {
    const clickEl_ = clickEl as HTMLBodyElement
    for (let i = 0; i < balls.value.length; i++) {
      const ball = balls.value[i]
      if (!ball.show) {
        ball.show = true
        ball.clickEl = clickEl_
        dropBalls.push(ball)
        return
      }
    }
  }
  const beforeDrop = (el: Element) => {
    console.log('aaaaa')
    const curBallEl = el as HTMLBodyElement
    const ball = dropBalls[dropBalls.length - 1]
    const clickElRect = ball.clickEl!.getBoundingClientRect()

    const diffX = clickElRect.width / 2 - ballWidth / 2
    const diffY = clickElRect.height / 2 - ballHeight / 2
    const x = clickElRect.left - ballLeft + diffX
    const y = -(window.innerHeight - clickElRect.top - ballBottom + diffY)

    curBallEl.style.display = ''
    curBallEl.style.transform =
      curBallEl.style.webkitTransform = `translate3d(0,${y}px,0)`

    const inner = curBallEl.getElementsByClassName(innerCls)[0] as HTMLBodyElement
    inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
  }
  const dropping = (el: Element, done: (...arg: any) => void) => {
    const curBallEl = el as HTMLBodyElement
    document.body.offsetHeight // reflow

    const trs3d = 'translate3d(0,0,0)'
    const inner = el.getElementsByClassName(innerCls)[0] as HTMLBodyElement

    curBallEl.style.transform = curBallEl.style.webkitTransform = trs3d
    inner.style.transform = inner.style.webkitTransform = trs3d
    curBallEl.addEventListener('transitionend', done)
  }
  const afterDrop = (el: Element) => {
    const curBallEl = el as HTMLBodyElement
    const ball = dropBalls.shift()
    if (ball) {
      ball.show = false
      curBallEl.style.display = 'none'
    }
  }

  return {
    balls,
    drop,
    beforeDrop,
    dropping,
    afterDrop
  }
}
