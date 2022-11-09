import { STORE_LOGIN_INFO, LOGIN_INFO } from '~/utils/constants'

export const state = () => ({
  loginInfo: process.server ? '' : localStorage.getItem('loginInfo'),
})

export const getters = {
  loginInfo(state) {
    return state.loginInfo
  }
}

export const mutations = {
  [LOGIN_INFO](state, payload) {
    state.loginInfo = payload
  },
}

export const actions = {
  async [STORE_LOGIN_INFO]({ commit }, payload) {
    try {
      commit(LOGIN_INFO, payload)
    } catch (error) {
      console.log(error)
    }
  }
}