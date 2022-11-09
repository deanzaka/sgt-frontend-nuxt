// main store
export const START_LOADING = 'startLoading'
export const STOP_LOADING = 'stopLoading'
export const SET_LOADING_TEXT = 'setLoadingText'
export const LOADING_TEXT = 'Loading...'

// notification alert
export const GET_ALERT_NOTIFICATION = 'getAlertNotification'
export const SET_ALERT_NOTIFICATION = 'setAlertNotification'
export const SHOW_ALERT_NOTIFICATION = 'showAlertNotification'
export const DEFAULT_ERROR_MESSAGE = {
  401: `Not Authenticated: Sorry, you have to be logged in to access the app.`,
  403: `Not Authorized: Sorry, you are not allowed to access this functionality`,
  404: `Not Found: We couldn't find what you're looking for.`,
  422: 'Validation Error',
  500: 'Server Error: Please contact the support team.',
}

// auth module store
export const LOGIN = 'login'

// accounts module store
export const GET_ALL_ACCOUNTS = 'getAllAccounts'

// devices module store
export const GET_ALL_DEVICES = 'getAllDevices'
