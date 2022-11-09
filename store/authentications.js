import { STORE_LOGIN_INFO, TOGGLE_DASHBOARD } from '~/utils/constants'

export const state = () => ({
  loginInfo: process.server ? '' : localStorage.getItem('loginInfo'),
  isUserDasboard: true
})

export const getters = {
  loginInfo(state) {
    return state.loginInfo
  },
  isUserDashboard(state) {
    return state.isUserDasboard
  }
}

export const mutations = {
  [STORE_LOGIN_INFO](state, payload) {
    state.loginInfo = payload
  },
  [TOGGLE_DASHBOARD](state, payload) {
    state.isUserDasboard = payload
  }
}

export const actions = {
  async [STORE_LOGIN_INFO]({ commit }, payload) {
    try {
      commit(STORE_LOGIN_INFO, payload)
    } catch (error) {
      console.log(error)
    }
  },
  async [TOGGLE_DASHBOARD]({ commit }, payload) {
    try {
      commit(TOGGLE_DASHBOARD, payload)
    } catch (error) {
      console.log(error)
    }
  }
}