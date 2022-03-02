// import { request } from '@/services'
// 当前 vuex 数据存放到 sessionStorage 里面 关闭页面自动清空数据

export default {
  namespaced: true,
  state() {
    return {
      currentMusicId: '', // 当前播放音乐id
      currentMusicIndex: '', // 当前播放音乐在列表的索引值
      currentMusicDetail: {}, // 当前播放音乐的详情
      currentPlaybackState: false, // 当前播放状态 true 播放 false暂停
      currentMusicTotalDuration: '00:00', // 当前播放音乐的总时长
      currentDuration: '00:00', // 当前播放音乐的时间已经到哪了
      playOrder: 0, // 播放顺序 0 顺序 1 循环 2 无序
      playlist: [], // 播放列表
    }
  },
  mutations: {
    // 当前播放音乐id
    changeCurrentMusicId(state, data) {
      state.currentMusicId = data
    },
    // 当前播放列表
    changePlayList(state, data) {
      state.playlist = data
    },
    // 当前播放音乐索引值
    changeCurrentMusicIndex(state, data) {
      state.currentMusicIndex = data
    },
    // 当前播放音乐详情
    changeCurrentMusicDetail(state, data) {
      state.currentMusicDetail = data
    },
    // 当前播放音乐时长
    changeCurrentDuration(state, data) {
      state.currentDuration = data
    },
    // 当前播放音乐总时长
    changeCurrentMusicTotalDuration(state, data) {
      state.currentMusicTotalDuration = data
    },
    // 播放状态
    changeCurrentPlaybackState(state, data) {
      state.currentPlaybackState = data
    },
  },
  actions: {
    getCurrentMusicDetail({ commit, state }, id) {
      let index = state.playlist.findIndex(item => item.id === id)
      if (index != -1) {
        commit('changeCurrentMusicDetail', state.playlist[index])
      }
    },
  },
}
