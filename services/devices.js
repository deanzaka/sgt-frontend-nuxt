export default ($axios) => {
  return {
    getAllDevices: async (account) => {
      const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
      const token = `Bearer ${loginInfo.token}`
      let options = {
        headers: {
          'Authorization': token,
        }
      }
      if (account) options.params = { account }
      const { data } = await $axios.$get('/devices', options);
      return data;
    }
  }
}