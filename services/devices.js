export default ($axios) => {
  return {
    getAllDevices: async () => {
      // TODO: this is temporary
      const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBLZXkiOiI4RkIzNDVCODY5M0NDRDAwQTIwNTEzMzQ4MjNBOTcwMCIsImFjY291bnQiOiJyZW5keWthIiwiYWNjZXNzVG9rZW4iOiIwYmIxMGViMjY5YjM3YTY3NWYzNWRjMzIxODhiNjNkMyIsInJlZnJlc2hUb2tlbiI6ImUyODU2ODhiZmM4N2RlZTk2OWE5MDJiY2I4MGJlN2ZlIiwiZXhwaXJlc0luIjo3MjAwLCJ0aW1lIjoiMjAyMi0xMC0xNiAxMjo1MToyMCIsImVuY3J5cHRlZFBhc3MiOiIkMmEkMDgkYUdqU0lpOWI1clVNRTZteWl6NmJvLmtRb3o5dHVEQ1NqLmw1clRNZGtFb2NzZWMyVWJTV2UiLCIkc2V0T25JbnNlcnQiOnsiX192IjowfSwiaWF0IjoxNjY1OTI0NjgxLCJleHAiOjE2NjU5MzE4ODF9.IjUFi9MxCOjMQCXa40EO7A5VLJgbkqPVzNB7dKw-Q4A` 
      const { data } = await $axios.$get('/devices', {
        headers: {
          'Authorization': token,
        }
      });
      return data;
    }
  }
}