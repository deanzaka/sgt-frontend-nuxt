import { GET_ALL_DEVICES, START_LOADING, STOP_LOADING } from "~/utils/constants"

export const state = () => ({
  devices: []
})

export const getters = {
}

export const mutations = {
  async [GET_ALL_DEVICES]({ commit }) {
    try {
      commit(START_LOADING, true, { root: true })
      const data = await this.$getAllDevices()
      commit(GET_ALL_DEVICES, data)
    } catch (error) {
    } finally {
      commit(STOP_LOADING, false, { root: true })
    }
  },
}