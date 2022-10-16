import { GET_ALL_ACCOUNTS, START_LOADING, STOP_LOADING } from "~/utils/constants"

export const state = () => ({
  accounts: []
})

export const getters = {
}

export const mutations = {
  async [GET_ALL_ACCOUNTS]({ commit }) {
    try {
      commit(START_LOADING, true, { root: true })
      const data = await this.$getAllAccounts()
      commit(GET_ALL_ACCOUNTS, data)
    } catch (error) {
    } finally {
      commit(STOP_LOADING, false, { root: true })
    }
  },
}