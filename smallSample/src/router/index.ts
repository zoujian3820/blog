import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const homeDemo = () => import('@/views/home/index.vue')
const remDemo = () => import('@/views/rem-demo/index.vue')
const sassDemo = () => import('@/views/sass-demo/index.vue')
const css3Demo = () => import('@/views/css3-demo/index.vue')
const shopBallDemo = () => import('@/views/shop-ball-demo/index.vue')
const slideCaptchaDemo = () => import('@/views/slide-captcha-demo/index.vue')
const slideCaptchaDemo2 = () => import('@/views/slide-captcha-demo/index2.vue')
const slideCaptchaDemoHoutai = () => import('@/views/slide-captcha-demo/houtai.vue')
const canvasApi = () => import('@/views/canvas-demo/canvas-api.vue')
const canvasCompressDemo = () => import('@/views/canvas-demo/canvas-compress.vue')
const antvG2 = () => import('@/views/canvas-demo/antv-demo/G2.vue')
const antvG6 = () => import('@/views/canvas-demo/antv-demo/G6.vue')
const antvL7 = () => import('@/views/canvas-demo/antv-demo/L7.vue')
const echars1 = () =>
  import(
    /* webpackChunkName: "echars_demo_1" */ '@/views/canvas-demo/echars-demo/echars1.vue'
  )
const echarBaobiaoPage = () =>
  import(
    /* webpackChunkName: "echar_baobiao_page" */ '@/views/canvas-demo/echars-demo/baobiao-page.vue'
  )

const routes: RouteRecordRaw[] = [
  { name: 'homeDemo', path: '/home', component: homeDemo },
  {
    name: 'default',
    path: '/',
    /* redirect: '/home'*/
    component: homeDemo
  },
  {
    name: 'slideCaptchaDemo',
    path: '/slide-captcha-demo',
    component: slideCaptchaDemo
  },
  {
    name: 'slideCaptchaDemo2',
    path: '/slide-captcha-demo2',
    component: slideCaptchaDemo2
  },
  {
    name: 'slideCaptchaDemoHoutai',
    path: '/slide-captcha-demo3',
    component: slideCaptchaDemoHoutai
  },
  { name: 'remDemo', path: '/rem-demo', component: remDemo },
  { name: 'css3Demo', path: '/css3-demo', component: css3Demo },
  { name: 'sassDemo', path: '/sass-demo', component: sassDemo },
  { name: 'shopBallDemo', path: '/shop-ball-demo', component: shopBallDemo },
  { name: 'canvasApi', path: '/canvas-api', component: canvasApi },
  {
    name: 'canvasCompressDemo',
    path: '/canvas-compress-demo',
    component: canvasCompressDemo
  },
  { name: 'antvG2', path: '/antv-g2-demo', component: antvG2 },
  { name: 'antvG6', path: '/antv-g6-demo', component: antvG6 },
  { name: 'antvL7', path: '/antv-l7-demo', component: antvL7 },
  { name: 'echars1', path: '/echars1-demo', component: echars1 },
  {
    name: 'echarBaobiaoPage',
    path: '/echar-baobiao-page',
    component: echarBaobiaoPage
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('access_token') || 1
  if (token) {
    next()
  } else {
    // next({
    //   path: '/login',
    //   query: {
    //     redirect: encodeURIComponent(to.fullPath),
    //     isRouteIntercep: 1
    //   }
    // })
  }
})

export default router
