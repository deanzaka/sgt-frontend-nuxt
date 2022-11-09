export default ($axios) => {
  return {
    getAllAccounts: async () => {
      const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
      const token = `Bearer ${loginInfo.token}` 
      const { data } = await $axios.$get('/accounts', {
        headers: {
          'Authorization': token,
        }
      });
      return data;
    }
  }
}