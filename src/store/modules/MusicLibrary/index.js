import { request } from '@/services'

export default {
  namespaced: true,
  state() {
    return {
      userMusicLibrary: [],
    }
  },
  mutations: {
    changeUserMusicLibrary(state, data) {
      state.userMusicLibrary = data
    },
  },
  actions: {
    async getUserMusicLibrary({ commit }, uid) {
      const res = await request(`/user/playlist?uid=${uid}`)
      commit('changeUserMusicLibrary', res.data.playlist)
    },
  },
}
