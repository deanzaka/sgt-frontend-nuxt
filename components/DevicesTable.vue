<template>
  <v-card>
    <v-data-table 
      :class="['devices-table' ]"
      :headers="headers" 
      :items="items" 
      :loading="isLoading" 
      loading-text="LOADING DATA" 
      item-key="imei"
      :search="search" 
      :item-class="itemRowBackground" 
      @click:row="rowClick">
      <template v-slot:body.prepend>
        <tr>
          <td></td>
          <td></td>
          <td>
            <v-text-field v-model="account" type="text" label="Account"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="vehicleNumber" type="text" label="Vehicle Number"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="status" type="text" label="Status"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="sim" type="text" label="SIM"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="imei" type="text" label="IMEI"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="type" type="text" label="Type"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="remark" type="text" label="Remark"></v-text-field>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" scrollable max-width="80%">
      <v-card>
        <v-card-title>Device: {{ accountData }} - {{ imeiData }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text height="200px">Expiration Date: {{ expirationData }}</v-card-text>


      </v-card>
    </v-dialog>
    
    <v-overlay :value="isLoading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment-timezone';

export default {
  computed: {
    ...mapGetters('authentications', ['loginInfo', 'isUserDashboard']),
  },
  methods: {
    async getDevices() {
      try {
        let account = ''
        if (this.isUserDashboard) account = this.loginInfo.account;

        const res = await this.$getAllDevices(account);
        if (res) {
          this.items = res;
        }
      } catch (error) {
        console.log(error)
      }
    },
    itemRowBackground(item) {
      const expiration = moment(item.expiration);

      if (expiration.isBefore(moment().add(7, 'days'))) {
        return 'red-background';
      } else if (expiration.isBefore(moment().add(30, 'days'))) {
        return 'yellow-background';
      }
    },
    rowClick(item) {
      this.dialog = !this.dialog
      this.expirationData = item.expiration
      this.accountData = item.account
      this.imeiData = item.imei
    },
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
        { value: 'account', text: 'Account', filter: f => { return (f + '').toLowerCase().includes(this['account'].toLowerCase()) } },
        { value: 'vehicleNumber', text: 'Vehicle Number', filter: f => { return (f + '').toLowerCase().includes(this['vehicleNumber'].toLowerCase()) } },
        { value: 'status', text: 'Status', filter: f => { return (f + '').toLowerCase().includes(this['status'].toLowerCase()) } },
        { value: 'sim', text: 'SIM', filter: f => { return (f + '').toLowerCase().includes(this['sim'].toLowerCase()) } },
        { value: 'imei', text: 'IMEI', filter: f => { return (f + '').toLowerCase().includes(this['imei'].toLowerCase()) } },
        { value: 'vehicleIcon', text: 'Type', filter: f => { return (f + '').toLowerCase().includes(this['type'].toLowerCase()) } },
        { value: 'reMark', text: 'Remarks', filter: f => { return (f + '').toLowerCase().includes(this['remark'].toLowerCase()) } },
      ],
      dialog: false,
      items: [],
      isLoading: true,
      search: '',
      account: '',
      vehicleNumber: '',
      status: '',
      sim: '',
      imei: '',
      type: '',
      remark: '',
      expirationData: '',
      accountData: '',
      imeiData: '',
    }
  },
}
</script>

<style>
.devices-table {
  margin-top: 48px;
}
.red-background {
  background-color: rgb(177, 95, 78)
}

.yellow-background {
  background-color: rgba(208, 208, 96, 0.846)
}
</style>

