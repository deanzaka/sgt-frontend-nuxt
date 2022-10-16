<template>
  <v-container>
    test
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dummies: [
        {
          id: 1,
          name: 'dummy1'
        },
        {
          id: 2,
          name: 'dummy2'
        },
        {
          id: 3,
          name: 'dummy3'
        }
      ]
    }
  },
  created() {
    console.log('created')
  },
  head() {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'login',
          name: 'login',
          content: 'Login page'
        }
      ]
    }
  }
}
</script>

<style>

</style>