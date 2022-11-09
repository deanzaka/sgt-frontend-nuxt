<template>
  <v-data-table :headers="headers" :items="items" :loading="isLoading" loading-text="LOADING DATA" item-key="imei"
    class="elevation-1">
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('authentications', ['loginInfo', 'isUserDashboard']),
  },
  methods: {
    async getDevices() {
      try {
        let account = ''
        if(this.isUserDashboard) account = this.loginInfo.account;

        const res = await this.$getAllDevices(account);
        if (res) {
          this.items = res;
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    await this.getDevices();
    this.isLoading = false;
  },
  data() {
    return {
      headers: [
        { value: 'expiration', text: 'Expiration' },
        { value: 'activationTime', text: 'Activation' },
        { value: 'account', text: 'Account' },
        { value: 'vehicleNumber', text: 'Vehicle Number' },
        { value: 'status', text: 'Status' },
        { value: 'sim', text: 'SIM' },
        { value: 'imei', text: 'IMEI' },
        { value: 'vehicleIcon', text: 'Type' },
        { value: 'reMark', text: 'Remarks' },
      ],
      items: [],
      isLoading: true,
    }
  },
}
</script>

