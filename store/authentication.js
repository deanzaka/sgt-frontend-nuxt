import { LOGIN } from '~/utils/constants'

export const state = () => ({
  auth: {}
})

export const getters = {
}

export const mutations = {
  [LOGIN](state, payload) {
    state.auth = payload
  }
}

export const actions = {
  async [LOGIN]({ commit }, payload) {
    try {
      commit(START_LOADING, true, { root: true })
      const data = await this.$login(payload)
      commit(LOGIN, data)
    } catch (error) {
    } finally {
      commit(STOP_LOADING, false, { root: true })
    }
  }
}