import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import Discover from '@/store/modules/Discover'
import PlaylistDetail from '@/store/modules/PlayListDetail'
import PlayBar from '@/store/modules/PlayBar'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { Discover, PlaylistDetail, PlayBar },
  getters,
})
