<template>
  <v-card>
    <v-data-table :headers="headers" :items="items" :loading="isLoading" loading-text="LOADING DATA" item-key="imei"
      :search="search" :item-class="itemRowBackground" elevation="1">
      <template v-slot:[`body.prepend`]>
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
          <td>
            <v-text-field v-model="packageMonth" type="text" label="Package (Month)"></v-text-field>
          </td>
        </tr>
      </template>
      <template v-slot:[`item.expiration`]="{ item }">
        <span>{{ new Date(item.expiration).toLocaleString() }}</span>
      </template>
      <template v-slot:[`item.activationTime`]="{ item }">
        <span>{{ new Date(item.activationTime).toLocaleString() }}</span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu offset-y :min-width="200">
          <template v-slot:[`activator`]="{ on: onMenu }">
            <v-btn outlined class="text-capitalize" v-on="onMenu">More<v-icon small>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(actItem, index) in actionItems" :key="index" :disabled="actItem.disabled" link>
              <v-list-item-content>
                <v-list-item-title @click="action(actItem.value, item)">
                  <v-icon class="pr-3">{{ actItem.icon }}</v-icon> {{ actItem.text }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
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

      if (expiration.isBefore(moment())) {
        return 'red-background';
      } else if (expiration.isBefore(moment().add(7, 'days'))) {
        return 'orange-background';
      } else if (expiration.isBefore(moment().add(30, 'days'))) {
        return 'yellow-background';
      }
    },
  },
  async mounted() {
    if (this.isUserDashboard) {
      this.headers = this.headers.filter(header => header.value !== 'actions');
    }
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
        { value: 'packageMonth', text: 'Package (Month)', filter: f => { return (f + '').toLowerCase().includes(this['packageMonth'].toLowerCase()) } },
        { value: 'actions', text: 'Actions', sortable: false },
      ],
      dialog: false,
      items: [],
      actionItems: [
        {
          text: 'Send Invoice',
          value: 'sendInvoice',
          icon: 'mdi-email-fast-outline',
          disabled: false,
        }
      ],
      isLoading: true,
      search: '',
      account: '',
      vehicleNumber: '',
      status: '',
      sim: '',
      imei: '',
      type: '',
      remark: '',
      packageMonth: '',
      expirationData: '',
      accountData: '',
      imeiData: '',
    }
  },
}
</script>

<style>
.red-background {
  background-color: rgb(177, 95, 78)
}

.orange-background {
  background-color: rgb(255, 165, 0)
}

.yellow-background {
  background-color: rgba(223, 223, 31, 0.846)
}
</style>

