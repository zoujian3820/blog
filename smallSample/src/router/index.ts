import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const homeDemo = () => import('@/views/home/index.vue')
const remDemo = () => import('@/views/rem-demo/index.vue')
const sassDemo = () => import('@/views/sass-demo/index.vue')
const shopBallDemo = () => import('@/views/shop-ball-demo/index.vue')

const routes: RouteRecordRaw[] = [
  { name: 'homeDemo', path: '/home', component: homeDemo },
  {
    name: 'default',
    path: '/',
    /* redirect: '/home'*/
    component: homeDemo
  },
  { name: 'remDemo', path: '/rem-demo', component: remDemo },
  { name: 'sassDemo', path: '/sass-demo', component: sassDemo },
  { name: 'shopBallDemo', path: '/shop-ball-demo', component: shopBallDemo }
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
