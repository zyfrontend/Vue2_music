import { request } from '@/services'

export default {
  namespaced: true,
  state() {
    return {
      banners: [],
      recommendMusicList: [],
    }
  },
  mutations: {
    changeStateBanners(state, data) {
      state.banners = data
    },
    changeStateRecommendMusicList(state, data) {
      state.recommendMusicList = data
    },
  },
  actions: {
    // 获取轮播图数据
    async getDiscoverBannerBannerAction({ commit }) {
      const res = await request('/banner')
      commit('changeStateBanners', res.data.banners)
    },
    // 推荐歌单
    async getRecommendMusicListAction({ commit }) {
      const res = await request('/personalized', { limit: 12 })
      commit('changeStateRecommendMusicList', res.data.result)
    },
  },
}
