import { request } from '@/services'

export default {
  namespaced: true,
  state() {
    return {
      LeaderBoardList: [],
    }
  },
  mutations: {
    changeLeaderBoardList(state, data) {
      state.LeaderBoardList = data
    },
  },
  actions: {
    async getAllLeaderBoardList({ commit }) {
      const res = await request('/toplist')
      commit('changeLeaderBoardList', res.data.list)
    },
  },
}
