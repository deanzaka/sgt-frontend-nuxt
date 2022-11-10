<template>
  <v-data-table :headers="headers" :items="items" :loading="isLoading" loading-text="LOADING DATA" item-key="imei" :search="search"
    class="elevation-1">
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
        { value: 'expiration', text: 'Expiration'},
        { value: 'activationTime', text: 'Activation' },
        { value: 'account', text: 'Account', filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'account' ].toLowerCase() ) }  },
        { value: 'vehicleNumber', text: 'Vehicle Number', filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'vehicleNumber' ].toLowerCase() ) }  },
        { value: 'status', text: 'Status', filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'status' ].toLowerCase() ) }  },
        { value: 'sim', text: 'SIM', filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'sim' ].toLowerCase() ) }  },
        { value: 'imei', text: 'IMEI', filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'imei' ].toLowerCase() ) }  },
        { value: 'vehicleIcon', text: 'Type', filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'type' ].toLowerCase() ) }  },
        { value: 'reMark', text: 'Remarks', filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'remark' ].toLowerCase() ) }  },
      ],
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
    }
  },
}
</script>

