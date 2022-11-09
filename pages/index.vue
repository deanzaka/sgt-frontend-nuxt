<template>
  <DevicesTable />
</template>

<script>
import moment from 'moment-timezone'
import { mapActions } from 'vuex'
import { STORE_LOGIN_INFO, TOGGLE_DASHBOARD } from '~/utils/constants'
import DevicesTable from '~/components/DevicesTable.vue'

export default {
  name: "IndexPage",
  components: {
    DevicesTable
  },
  methods: {
    ...mapActions('authentications', [STORE_LOGIN_INFO, TOGGLE_DASHBOARD])
  },
  async mounted() {
    await this[TOGGLE_DASHBOARD](true)
    if (!process.client) return;
    const loginData = localStorage.getItem("loginInfo");
    if (loginData) {
      if (moment().isAfter(moment(loginData.time).add(loginData.expiresIn, 'seconds'))) {
        localStorage.removeItem("loginInfo");
        await this[STORE_LOGIN_INFO]({});
        return this.$router.push('/auth/login');
      }
      await this[STORE_LOGIN_INFO](JSON.parse(loginData));
    } else {
      localStorage.removeItem("loginInfo");
      await this[STORE_LOGIN_INFO]({});
      return this.$router.push('/auth/login')
    }
  },
}
</script>
