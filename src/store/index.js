import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import Discover from '@/store/modules/Discover'
import PlaylistDetail from '@/store/modules/PlayListDetail'
import PlayBar from '@/store/modules/PlayBar'
import Login from '@/store/modules/Login'
import LeaderBoard from '@/store/modules/LeaderBoard'
import MusicLibrary from '@/store/modules/MusicLibrary'
import SingerList from '@/store/modules/SingerList'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { Discover, PlaylistDetail, PlayBar, Login, LeaderBoard, MusicLibrary, SingerList },
  getters,
})
