import { request } from '@/services'
import { formatMinuteSecond } from '@/utils'
export default {
  namespaced: true,
  state() {
    return {
      currentListId: '',
      playListDetail: [],
    }
  },
  mutations: {
    changeCurrentListId(state, data) {
      state.currentListId = data
    },
    changePlayListDetail(state, data) {
      state.playListDetail = data
    },
  },
  actions: {
    async getPlayListDetailAction({ commit }, id) {
      const res = await request('/playlist/detail', { id })
      commit('changePlayListDetail', res.data.playlist)
      commit('changeCurrentListId', res.data.playlist.id)

      res.data.playlist.tracks.map(item => {
        item.dt = formatMinuteSecond(item.dt)
      })

      console.log(res.data.playlist)
    },
  },
}
