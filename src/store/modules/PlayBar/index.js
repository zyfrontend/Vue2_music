import { request } from '@/services'
// 当前 vuex 数据存放到 sessionStorage 里面 关闭页面自动清空数据

import { setStorage, getStorage, parseLyric } from '@/utils'
export default {
  namespaced: true,
  state() {
    return {
      currentMusicId: getStorage('currentMusicId') ? getStorage('currentMusicId') : '', // 当前播放音乐id
      currentMusicIndex: null, // 当前播放音乐在列表的索引值
      currentMusicDetail: getStorage('currentMusicDetail') ? getStorage('currentMusicDetail') : {}, // 当前播放音乐的详情
      playlist: getStorage('playlist') ? getStorage('playlist') : [], // 播放列表
      currentPlaybackState: false, // 当前播放状态 true 播放 false暂停
      currentMusicTotalDuration: '00:00', // 当前播放音乐的总时长
      currentDuration: '00:00', // 当前播放音乐的时间已经到哪了
      currentMusicLyric: [], // 当前歌曲的歌词
    }
  },
  mutations: {
    // 当前播放音乐id
    changeCurrentMusicId(state, data) {
      setStorage('currentMusicId', data)
      state.currentMusicId = data
    },
    // 当前播放列表
    changePlayList(state, data) {
      setStorage('playlist', data)
      state.playlist = data
    },
    // 当前播放音乐索引值
    changeCurrentMusicIndex(state, data) {
      state.currentMusicIndex = data
    },
    // 当前播放音乐详情
    changeCurrentMusicDetail(state, data) {
      setStorage('currentMusicDetail', data)
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
    // 当前歌曲的歌词
    changeCurrentMusicLyric(state, data) {
      state.currentMusicLyric = data
    },
  },
  actions: {
    getCurrentMusicDetail({ commit, state }, id) {
      let index = state.playlist.findIndex(item => item.id === id)
      if (index != -1) {
        commit('changeCurrentMusicDetail', state.playlist[index])
      }
    },
    async getCurrentMusicLyric({ commit }, id) {
      let res = await request(`/lyric?id=${id}`)

      // 歌词截取
      const lyric = parseLyric(res.data.lrc.lyric)
      commit('changeCurrentMusicLyric', lyric)
    },
  },
}
