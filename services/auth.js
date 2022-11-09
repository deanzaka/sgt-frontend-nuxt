export default ($axios) => {
  return {
    login: async (payload) => {
      const { data } = await $axios.$post('/auth/login', payload);
      return data;
    }
  }
}