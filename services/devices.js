export default ($axios) => {
  return {
    getAllDevices: async () => {
      // TODO: this is temporary
      const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBLZXkiOiI4RkIzNDVCODY5M0NDRDAwQTIwNTEzMzQ4MjNBOTcwMCIsImFjY291bnQiOiJyZW5keWthIiwiYWNjZXNzVG9rZW4iOiJhNTg3NTBmZWNmZjM3ODEwZDQ4ODc1ZTUyMTA4ZmQ1ZCIsInJlZnJlc2hUb2tlbiI6IjI4OWUwODE3OTY0MDNmMWE5Y2QwOTgwOWVmOGMwY2QzIiwiZXhwaXJlc0luIjo3MjAwLCJ0aW1lIjoiMjAyMi0xMS0wNSAxOToxNDo1MCIsImVuY3J5cHRlZFBhc3MiOiIkMmEkMDgkck9BaUZWYXcyNndFV3pHV2N4UGFKZXFwc1hQbU8uTGJwemkxekxFbDhhRnNVWkdGZHBJV2UiLCIkc2V0T25JbnNlcnQiOnsiX192IjowfSwiaWF0IjoxNjY3Njc5Mjk4LCJleHAiOjE2Njc2ODY0OTh9.N7WMFzu5eG6_ZtJtlaryJXTUoGATM-O0VOqHFzqofrY` 
      const { data } = await $axios.$get('/devices', {
        headers: {
          'Authorization': token,
        }
      });
      return data;
    }
  }
}