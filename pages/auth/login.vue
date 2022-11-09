<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs8 sm6 md4 lg4 xl4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
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
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import { LOGIN } from '~/utils/constants'
export default {
  layout: 'empty',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    ...mapActions('auth', [LOGIN]),
    async login() {
      const auth = await this.$login({
        username: this.username,
        password: this.password,
      })
      console.log(auth);
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
  }
}
</script>

<style>

</style>