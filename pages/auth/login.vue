<template>
  <v-app class="font-display">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs8 sm6 md4 lg4 xl4>
            <v-card class="elevation-12">
              <v-layout align-center justify-center>
                <img src="~/assets/img/Logo.png" alt="logo" class="logo">
              </v-layout>
              <v-card-text>
                <form ref="form" @submit.prevent="login()">
                  <v-text-field v-model="username" name="username" label="Username" type="text" placeholder="username"
                    required></v-text-field>
                  <v-text-field v-model="password" name="password" label="Password" type="password"
                    placeholder="password" required></v-text-field>
                  <v-btn block type="submit" class="mt-8 mb-4" color="primary" value="log in">Login</v-btn>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <v-overlay :value="isLoading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import { STORE_LOGIN_INFO } from '~/utils/constants'
import moment from 'moment-timezone'

export default {
  layout: 'empty',
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
    }
  },
  methods: {
    ...mapActions('authentications', [STORE_LOGIN_INFO]),
    async login() {
      this.isLoading = true;
      const loginData = await this.$login({
        username: this.username,
        password: this.password,
      })
      this.isLoading = false;
      if (loginData) {
        await this[STORE_LOGIN_INFO](loginData)
        this.$router.push('/')
      }
    }
  },
  async mounted() {
    if(!process.client) return;
    const loginData = localStorage.getItem("loginInfo");
    if(loginData){
      if (moment().isAfter(moment(loginData.time).add(loginData.expiresIn, 'seconds'))) {
        localStorage.removeItem("loginInfo");
        this.$router.push('/auth/login')
      }
      await this[STORE_LOGIN_INFO](JSON.parse(loginData));
    }
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
  },
}
</script>

<style>

.font-display {
  font-family: 'Inter', sans-serif;
}

</style>