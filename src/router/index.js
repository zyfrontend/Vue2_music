import Vue from 'vue'
import VueRouter from 'vue-router'

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
    path: '/musiclist',
    name: 'MusicList',
    show: true,
    component: () => import('@/views/MusicList/index'),
    meta: { title: '乐库', icon: 'el-icon-film' },
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
]

const router = new VueRouter({
  routes,
})

export default router
