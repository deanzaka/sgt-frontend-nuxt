<template>
  <v-container>This is a start</v-container>
</template>

<script>
import moment from 'moment-timezone'
import { mapActions } from 'vuex'
import { STORE_LOGIN_INFO } from '~/utils/constants'

export default {
  name: "IndexPage",
  methods: {
    ...mapActions('authentications', [STORE_LOGIN_INFO])
  },
  async mounted() {
    if (!process.client) return;
    const loginData = localStorage.getItem("loginInfo");
    if (loginData) {
      if (moment().isAfter(moment(loginData.time).add(loginData.expiresIn, 'seconds'))) {
        localStorage.removeItem("loginInfo");
        await this[STORE_LOGIN_INFO](JSON.parse({}));
        return this.$router.push('/auth/login');
      }
      await this[STORE_LOGIN_INFO](JSON.parse(loginData));
    } else {
      localStorage.removeItem("loginInfo");
      await this[STORE_LOGIN_INFO](JSON.parse({}));
      return this.$router.push('/auth/login')
    }
  },
}
</script>
