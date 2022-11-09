import authService from '~/services/auth';
import accountService from '~/services/accounts'
import deviceService from '~/services/devices'

export default ({ $axios }, inject) => {
  const services = {
    ...authService($axios),
    ...accountService($axios),
    ...deviceService($axios),
  }
  for (const [key, value] of Object.entries(services)) {
    inject(key, value)
  }
}
