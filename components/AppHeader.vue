<template>
  <v-card>
    <v-app-bar color="white">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ dashboardType }} Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-show="loginInfo.isAdmin" data-app icon v-bind="attrs" v-on="on" @click="switchRole()">
            <v-icon>mdi-account-switch</v-icon>
          </v-btn>
        </template>
        <span>Switch role</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn data-app icon v-bind="attrs" v-on="on" @click="logout()">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
      app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Devices</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Accounts</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Payments</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { STORE_LOGIN_INFO } from '~/utils/constants'
import moment from 'moment-timezone'

export default {
  data: () => ({
    drawer: false,
    group: null,
    dashboardType: 'User',
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
  computed: {
    ...mapGetters('authentications', ['isUserDashboard', 'loginInfo']),
  },
  methods: {
    ...mapActions('authentications', [STORE_LOGIN_INFO]),
    async logout() {
      localStorage.removeItem('loginInfo')
      await this[STORE_LOGIN_INFO]({})
      this.$router.push('/auth/login')
    },
    async switchRole() {
      if (this.isUserDashboard) {
        this.$router.push('/admin')
        this.dashboardType = 'User'
      } else {
        this.$router.push('/')
        this.dashboardType = 'Admin'
      }
    }
  },
  async mounted() {
    if (this.isUserDashboard) { this.dashboardType = 'User' } else { this.dashboardType = 'Admin' }
    if (!this.loginInfo) {
      if (!process.client) return;
      const loginData = localStorage.getItem("loginInfo");
      if (loginData) {
        if (moment().isAfter(moment(loginData.time).add(loginData.expiresIn, 'seconds'))) {
          localStorage.removeItem("loginInfo");
          await this[STORE_LOGIN_INFO]({});
          this.$router.push('/auth/login')
        }
        await this[STORE_LOGIN_INFO](JSON.parse(loginData));
      }
    } 
  },
}
</script>

<style>

</style>