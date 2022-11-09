<template>
  <DevicesTable />
</template>

<script>
import moment from 'moment-timezone'
import { mapActions } from 'vuex'
import { STORE_LOGIN_INFO } from '~/utils/constants'
import DevicesTable from '~/components/DevicesTable.vue'

export default {
  name: "IndexPage",
  components: {
    DevicesTable
  },
  methods: {
    ...mapActions('authentications', [STORE_LOGIN_INFO])
  },
  async mounted() {
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
