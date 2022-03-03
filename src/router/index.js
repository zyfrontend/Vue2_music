import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend',
  },
  {
    path: '/recommend',
    name: 'Recommend',
    show: true,
    component: () => import('@/views/Recommend/index'),
    meta: { title: '推荐', icon: 'el-icon-orange' },
    children: [],
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    show: true,
    component: () => import('@/views/Leaderboard/index'),
    meta: { title: '排行榜', icon: 'el-icon-s-flag' },
  },
  {
    path: '/musiclibrary',
    name: 'MusicLibrary',
    show: true,
    component: () => import('@/views/MusicLibrary/index'),
    meta: { title: '个人乐库', icon: 'el-icon-film', needLogin: true },
  },
  {
    path: '/singerlist',
    name: 'SingerList',
    show: true,
    component: () => import('@/views/SingerList/index'),
    meta: { title: '歌手列表', icon: 'el-icon-bangzhu' },
  },
  {
    path: '/playlistdetail/:id',
    name: 'PlaylistDetail',
    show: false,
    component: () => import('@/views/PlaylistDetail'),
  },
  {
    path: '/musicdetail',
    name: 'MusicDetail',
    show: false,
    component: () => import('@/views/MusicDetail'),
  },
]

const router = new VueRouter({
  routes,
})

// 路由守卫
router.beforeEach((to, form, next) => {
  const islogin = store.state.Login.isLogin
  console.log(islogin)
  if (islogin) {
    next()
  } else {
    if (to.name === 'MusicLibrary') {
      Message({
        message: '请先登录',
        type: 'error',
      })
      return next({ path: '/' })
    } else {
      return next()
    }
  }
})

export default router

/*
*
* beforeEnter: (to, form, next) => {
      if (!to.meta.needLogin && !store.state.Login.userInfo.name) {
        Message({
          message: '请先登录',
          type: 'error',
        })
        next({
          path: '/',
        })
      } else {
        next()
      }
    },
* */
