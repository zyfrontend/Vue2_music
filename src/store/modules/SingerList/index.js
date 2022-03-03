import { request } from '@/services'
export default {
  namespaced: true,
  state() {
    return {
      singerList: [],
      area: -1,
      type: -1,
      initial: -1,
      // 当前所在页数
      singerCurrentPage: 1,
      // 是否存在更多数据
      isMore: false,
    }
  },
  mutations: {
    changeSingerList(state, data) {
      state.singerList = data
    },
    changeSingerArea(state, data) {
      state.area = data
    },
    changeSingerCurrentPage(state, data) {
      state.singerCurrentPage = data
    },
    changeSingerType(state, data) {
      state.type = data
    },
    changeSingerInitial(state, data) {
      state.initial = data
    },
  },
  actions: {
    // 请求歌手列表
    async getSingerList({ commit, state }) {
      let res = await request('/artist/list', {
        type: state.type,
        area: state.area,
        initial: state.initial,
        offset: (state.singerCurrentPage - 1) * 30,
      })
      console.log(res)
      commit('changeSingerList', res.data.artists)
    },
  },
}
