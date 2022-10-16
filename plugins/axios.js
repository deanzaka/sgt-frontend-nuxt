import {
  DEFAULT_ERROR_MESSAGE,
  SHOW_ALERT_NOTIFICATION,
  SET_ALERT_NOTIFICATION,
} from '~/utils/constants'

export default ({ $axios, store, redirect }) => {
  $axios.onError((error) => {
    store.commit(
      SET_ALERT_NOTIFICATION,
      DEFAULT_ERROR_MESSAGE[error.response.status] ||
        'There is an error in the server.'
    )
    store.commit(SHOW_ALERT_NOTIFICATION, true)
    if (error.response.status === 401) {
      setTimeout(() => {
        store.commit(SHOW_ALERT_NOTIFICATION, false)
        redirect('/auth/login')
      }, 2000)
    }
    setTimeout(() => store.commit(SHOW_ALERT_NOTIFICATION, false), 2000)
  })

  $axios.setHeader('Content-Type', 'application/json')
}
