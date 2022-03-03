import { request } from '@/services'
import { getStorage, setStorage } from '@/utils'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state() {
    return {
      userInfo: getStorage('userInfo') ? getStorage('userInfo') : {},
      cookie: '',
      isLogin: false,
    }
  },
  mutations: {
    changeUserInfo(state, data) {
      setStorage('userInfo', data)
      state.userInfo = data
    },
    changeCookie(state, data) {
      setStorage('cookie', data)
      state.cookie = data
    },
    changeIsLogin(state, data) {
      setStorage('isLogin', data)
      state.isLogin = data
    },
  },
  actions: {
    // 手机登录
    async userloginByCellphone({ commit }, account) {
      const { phone, password } = account
      const res = await request('/login/cellphone', {
        phone: phone,
        password: password,
      })

      // 是否登录成功
      const { code } = (res && res.data) || ''
      if (code === 200) {
        Message({
          message: '登录成功',
          type: 'success',
        })
        commit('changeUserInfo', res.data.profile)
        commit('changeCookie', res.data.cookie)
        commit('changeIsLogin', true)
      } else if (code === 502) {
        commit('changeIsLogin', false)
        Message({
          message: res.data.message,
          type: 'error',
        })
      } else {
        commit('changeIsLogin', false)
        Message({
          message: '登录失败请重试',
          type: 'error',
        })
      }
    },
    // 退出登录
    async userLogout({ commit }) {
      const res = await request('/logout')
      if (res.data.code === 200) {
        commit('changeIsLogin', false)
        window.sessionStorage.removeItem('userInfo')
        window.sessionStorage.removeItem('cookie')
        location.reload()
        this.$router.go(0)
        Message({
          message: '退出成功',
          type: 'success',
        })
      }
    },
  },
}
