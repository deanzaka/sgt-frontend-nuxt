<template>
  <v-app-bar color="white">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>{{ dashboardType }} Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn data-app icon v-bind="attrs" v-on="on" @click="logout()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { STORE_LOGIN_INFO } from '~/utils/constants'

export default {
  data: () => ({
    dashboardType: 'User',
  }),
  computed: {
    ...mapGetters('authentications', ['isUserDashboard', 'loginInfo']),
  },
  methods: {
    ...mapActions('authentications', ['STORE_LOGIN_INFO']),
    async logout() {
      localStorage.removeItem('loginInfo')
      await this[STORE_LOGIN_INFO]({})
      this.$router.push('/auth/login')
    },
  },
  mounted() {
    if (this.isUserDashboard) { this.dashboardType = 'User' } else { this.dashboardType = 'Admin' }
    console.log(this.loginInfo)
  },
}
</script>

<style>

</style>