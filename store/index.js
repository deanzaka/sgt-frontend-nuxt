import {
  START_LOADING,
  SET_LOADING_TEXT,
  STOP_LOADING,
  SET_ALERT_NOTIFICATION,
  SHOW_ALERT_NOTIFICATION,
} from '~/utils/constants'

export const state = () => ({
  appLoading: false,
  appLoadingText: 'loading...',
  alertNotificationText: null,
  showAlertNotification: false,
})

export const mutations = {
  [START_LOADING](state) {
    state.appLoading = true
  },

  [STOP_LOADING](state) {
    state.appLoading = false
  },

  [SET_LOADING_TEXT](state, payload) {
    state.appLoadingText = payload
  },

  [SET_ALERT_NOTIFICATION](state, payload) {
    state.alertNotificationText = payload
  },

  [SHOW_ALERT_NOTIFICATION](state, payload) {
    state.showAlertNotification = payload
  },
}

export const getters = {
  appLoading(state) {
    return state.appLoading
  },
  appLoadingText(state) {
    return state.appLoadingText
  },
  alertNotificationText(state) {
    return state.alertNotificationText
  },
  showAlertNotification(state) {
    return state.showAlertNotification
  },
}
